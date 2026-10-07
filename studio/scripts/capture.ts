#!/usr/bin/env bun
/**
 * Shoots every option of every step from a running studio and flags options
 * that render like another option of the same step. An identical pair is a
 * capture gap (the gallery never shows what the option changes) or a dead
 * option; a near-identical pair is a candidate twinge. Both go to review
 * before the user walks the tree.
 *
 * Start the studio (bun run dev), then:
 *   bun run capture [--url http://127.0.0.1:5199/] [--out capture] [--step accent,radius] [--mode light,dark] [--near 0.001]
 *
 * Writes <out>/<step>/<option>.<mode>.png, <out>/report.json and <out>/index.html.
 * Exits 1 when the studio logged errors while capturing.
 */
import { createHash } from "node:crypto";
import { mkdir, rm, writeFile } from "node:fs/promises";
import { relative, resolve } from "node:path";
import { STEPS } from "../src/tree/steps";
import { launchChromium } from "./playwright";

const USAGE = "Usage: bun run capture [--url <studio url>] [--out <dir>] [--step <id,id>] [--mode light,dark] [--near <fraction>]";

const args: Record<string, string> = {};
const argv = Bun.argv.slice(2);
for (let i = 0; i < argv.length; i += 1) {
  const arg = argv[i]!;
  if (arg === "--help" || arg === "-h") {
    console.log(USAGE);
    process.exit(0);
  }
  const value = argv[i + 1];
  if (!arg.startsWith("--") || value === undefined) throw new Error(USAGE);
  args[arg.slice(2)] = value;
  i += 1;
}

const url = new URL(args.url ?? "http://127.0.0.1:5199/");
url.searchParams.set("capture", "1");
const outDir = resolve(args.out ?? resolve(import.meta.dir, "../capture"));
const modes = (args.mode ?? "light,dark").split(",").map((m) => m.trim());
for (const m of modes) if (m !== "light" && m !== "dark") throw new Error(`--mode takes light and/or dark, not "${m}"`);
/** Share of pixels that may differ before two shots stop counting as near-identical. */
const near = Number(args.near ?? "0.001");
const wanted = args.step?.split(",").map((s) => s.trim());
for (const id of wanted ?? []) if (!STEPS.some((s) => s.id === id)) throw new Error(`Unknown step "${id}"`);
const steps = STEPS.filter((s) => !wanted || wanted.includes(s.id));

interface Shot {
  option: string;
  mode: string;
  file: string;
  sha: string;
  errors: string[];
}
interface Pair {
  a: string;
  b: string;
  mode: string;
  /** Share of compared pixels that differ; 0 for identical files. */
  diff: number;
}
interface StepReport {
  step: string;
  index: number;
  question: string;
  shots: Shot[];
  identical: Pair[];
  near: Pair[];
}

const { browser, close } = await launchChromium();
const report: StepReport[] = [];
let errorCount = 0;
try {
  const context = await browser.newContext({ viewport: { width: 1600, height: 1000 }, deviceScaleFactor: 1, reducedMotion: "reduce" });
  const page = await context.newPage();
  let pending: string[] = [];
  page.on("pageerror", (e: Error) => pending.push(e.message));
  // Resource 404s (favicon, a project without content.json) aren't studio errors.
  page.on("console", (m: { type(): string; text(): string }) => {
    if (m.type() === "error" && !m.text().startsWith("Failed to load resource")) pending.push(m.text());
  });

  // Fonts and two frames, then a beat for transitions to finish.
  const settle = async () => {
    await page.evaluate(async () => {
      await document.fonts.ready;
      const { promise, resolve } = Promise.withResolvers<void>();
      requestAnimationFrame(() => requestAnimationFrame(() => resolve()));
      await promise;
    });
    await page.waitForTimeout(400);
  };

  /** Identical files, then a pixel comparison (in the page, downscaled) for the rest. */
  const comparePairs = async (shots: Shot[], pngs: Map<string, Buffer>) => {
    const identical: Pair[] = [];
    const nearPairs: Pair[] = [];
    for (const mode of modes) {
      const inMode = shots.filter((s) => s.mode === mode);
      const images = inMode.map((s) => `data:image/png;base64,${pngs.get(`${s.option}.${mode}`)!.toString("base64")}`);
      const diffs: number[][] = await page.evaluate(async (sources: string[]) => {
        const width = 800;
        const pixels = await Promise.all(
          sources.map(async (src) => {
            const bitmap = await createImageBitmap(await (await fetch(src)).blob());
            const height = Math.max(1, Math.round((bitmap.height * width) / bitmap.width));
            const canvas = new OffscreenCanvas(width, height);
            const ctx = canvas.getContext("2d")!;
            ctx.drawImage(bitmap, 0, 0, width, height);
            return ctx.getImageData(0, 0, width, height).data;
          }),
        );
        return pixels.map((a, i) =>
          pixels.map((b, j) => {
            if (j <= i) return 0;
            if (a.length !== b.length) return 1;
            let differing = 0;
            for (let p = 0; p < a.length; p += 4) {
              if (Math.abs(a[p]! - b[p]!) + Math.abs(a[p + 1]! - b[p + 1]!) + Math.abs(a[p + 2]! - b[p + 2]!) > 24) differing += 1;
            }
            return differing / (a.length / 4);
          }),
        );
      }, images);
      for (let i = 0; i < inMode.length; i += 1) {
        for (let j = i + 1; j < inMode.length; j += 1) {
          const a = inMode[i]!;
          const b = inMode[j]!;
          const diff = diffs[i]![j]!;
          if (a.sha === b.sha) identical.push({ a: a.option, b: b.option, mode, diff: 0 });
          else if (diff <= near) nearPairs.push({ a: a.option, b: b.option, mode, diff });
        }
      }
    }
    return { identical, near: nearPairs };
  };

  await page.goto(url.toString(), { waitUntil: "load", timeout: 45_000 });
  await page.waitForTimeout(1000);

  for (const step of steps) {
    const index = STEPS.indexOf(step);
    await rm(resolve(outDir, step.id), { recursive: true, force: true });
    await mkdir(resolve(outDir, step.id), { recursive: true });
    const shots: Shot[] = [];
    const pngs = new Map<string, Buffer>();
    for (const mode of modes) {
      for (const option of step.options) {
        const hash = new URLSearchParams({ [step.id]: option.id, step: String(index), mode });
        await page.goto(`${url}#${hash}`);
        await settle();
        const png: Buffer = await page.screenshot({ fullPage: true, animations: "disabled" });
        const file = resolve(outDir, step.id, `${option.id}.${mode}.png`);
        await writeFile(file, png);
        shots.push({ option: option.id, mode, file: relative(outDir, file), sha: createHash("sha256").update(png).digest("hex"), errors: pending });
        errorCount += pending.length;
        pending = [];
        pngs.set(`${option.id}.${mode}`, png);
      }
    }
    const result: StepReport = { step: step.id, index: index + 1, question: step.question, shots, ...(await comparePairs(shots, pngs)) };
    report.push(result);
    const flags = [
      ...result.identical.map((p) => `${p.a} = ${p.b} (${p.mode})`),
      ...result.near.map((p) => `${p.a} ≈ ${p.b} (${p.mode}, ${(p.diff * 100).toFixed(2)}%)`),
    ];
    console.log(`${String(index + 1).padStart(2)}. ${step.id}: ${shots.length} shots${flags.length ? `; ${flags.join("; ")}` : ""}`);
  }

  await context.close();
} finally {
  await close();
}

const generatedAt = new Date().toISOString();
await writeFile(resolve(outDir, "report.json"), `${JSON.stringify({ url: url.toString(), generatedAt, modes, near, errors: errorCount, steps: report }, null, 2)}\n`);

const ESCAPES: Record<string, string> = { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" };
const escape = (s: string) => s.replace(/[&<>"]/g, (c) => ESCAPES[c]!);
const html = `<!doctype html><meta charset="utf-8"><title>Studio capture</title>
<style>body{font:13px system-ui;margin:24px;background:#111;color:#ddd}h2{font-size:14px;margin:28px 0 6px}p{margin:4px 0;color:#aaa}
.row{display:flex;gap:12px;overflow-x:auto;padding-bottom:8px}figure{margin:0;flex:none;width:280px}img{width:280px;border:2px solid #333;display:block}
figure.flag img{border-color:#e5a50a}figcaption{margin-top:4px;color:#bbb}.bad{color:#e5a50a}</style>
<h1>Studio capture</h1><p>${escape(url.toString())} · ${generatedAt} · near-identical means at most ${(near * 100).toFixed(2)}% of pixels differ.</p>
${report
  .map((r) => {
    const pairs = [...r.identical, ...r.near];
    const rows = modes.map((mode) => {
      const figures = r.shots
        .filter((s) => s.mode === mode)
        .map((s) => {
          const flag = pairs.some((p) => p.mode === mode && (p.a === s.option || p.b === s.option));
          const errors = s.errors.length ? ` · <span class="bad">${s.errors.length} error(s)</span>` : "";
          return `<figure class="${flag ? "flag" : ""}"><a href="${s.file}"><img src="${s.file}" loading="lazy"></a><figcaption>${s.option} · ${mode}${errors}</figcaption></figure>`;
        });
      return `<div class="row">${figures.join("")}</div>`;
    });
    return [
      `<h2>${r.index}. ${escape(r.question)} <code>${r.step}</code></h2>`,
      ...r.identical.map((p) => `<p class="bad">Identical in ${p.mode}: ${p.a} and ${p.b}</p>`),
      ...r.near.map((p) => `<p class="bad">Near-identical in ${p.mode}: ${p.a} and ${p.b} (${(p.diff * 100).toFixed(2)}% differ)</p>`),
      ...rows,
    ].join("\n");
  })
  .join("\n")}`;
await writeFile(resolve(outDir, "index.html"), html);

const identicalCount = report.reduce((n, r) => n + r.identical.length, 0);
const nearCount = report.reduce((n, r) => n + r.near.length, 0);
console.log(`\n${report.reduce((n, r) => n + r.shots.length, 0)} shots, ${identicalCount} identical pair(s), ${nearCount} near-identical pair(s), ${errorCount} error(s).`);
console.log(`Contact sheet: ${resolve(outDir, "index.html")}`);
if (errorCount > 0) process.exit(1);
