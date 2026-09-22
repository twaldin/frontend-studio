#!/usr/bin/env bun
import { cp, mkdir, mkdtemp, readdir, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { relative, resolve } from "node:path";

interface Frequency {
  value: string;
  count: number;
}

interface SurfaceSample {
  title: string;
  headings: string[];
  navLabels: string[];
  counts: Record<string, Frequency[]>;
}

interface Capture {
  url: string;
  viewport: string;
  width: number;
  height: number;
  screenshot: string;
  sample: SurfaceSample;
}

const argv = Bun.argv.slice(2);
let outArg = "docs/audit";
const urls: string[] = [];
for (let index = 0; index < argv.length; index += 1) {
  const arg = argv[index]!;
  if (arg === "--out") {
    const value = argv[index + 1];
    if (!value) throw new Error("--out requires a directory");
    outArg = value;
    index += 1;
  } else if (arg === "--help" || arg === "-h") {
    console.log("Usage: bun run audit --out <directory> <url> [url ...]");
    process.exit(0);
  } else {
    urls.push(new URL(arg).toString());
  }
}

if (urls.length === 0) throw new Error("Pass at least one live http(s) URL to audit");

const outDir = resolve(outArg);
const screenshotDir = resolve(outDir, "screenshots");
await mkdir(screenshotDir, { recursive: true });

const PLAYWRIGHT_VERSION = "1.49.1";
let playwrightPath: string;
let runtimeDir: string | undefined;
try {
  playwrightPath = Bun.resolveSync("playwright", import.meta.dir);
} catch {
  const install = Bun.spawnSync(["bun", "x", `playwright@${PLAYWRIGHT_VERSION}`, "--version"]);
  if (install.exitCode !== 0) throw new Error(`Could not provision Playwright: ${new TextDecoder().decode(install.stderr)}`);
  const cacheLookup = Bun.spawnSync(["bun", "pm", "cache"]);
  if (cacheLookup.exitCode !== 0) throw new Error("Could not locate Bun's package cache");
  const cacheDir = new TextDecoder().decode(cacheLookup.stdout).trim().split("\n").at(-1)!;
  const cacheEntries = await readdir(cacheDir);
  const packageDir = cacheEntries.find((entry) => entry.startsWith(`playwright@${PLAYWRIGHT_VERSION}`));
  const coreDir = cacheEntries.find((entry) => entry.startsWith(`playwright-core@${PLAYWRIGHT_VERSION}`));
  if (!packageDir || !coreDir) throw new Error(`Playwright ${PLAYWRIGHT_VERSION} was provisioned but not found in Bun's cache`);

  runtimeDir = await mkdtemp(resolve(tmpdir(), "frontend-studio-audit-"));
  const modulesDir = resolve(runtimeDir, "node_modules");
  await mkdir(modulesDir);
  await cp(resolve(cacheDir, packageDir), resolve(modulesDir, "playwright"), { recursive: true });
  await cp(resolve(cacheDir, coreDir), resolve(modulesDir, "playwright-core"), { recursive: true });
  playwrightPath = resolve(modulesDir, "playwright", "index.mjs");
}

// The module may be project-local or provisioned by bunx in a temporary module graph.
const { chromium } = await import(playwrightPath);
let browser;
try {
  browser = await chromium.launch({ headless: true, channel: "chrome" });
} catch {
  browser = await chromium.launch({ headless: true });
}
const viewports = [
  { name: "desktop", width: 1440, height: 1000 },
  { name: "phone", width: 390, height: 844 },
] as const;

function slugFor(url: string, index: number): string {
  const parsed = new URL(url);
  const route = parsed.pathname === "/" ? "home" : parsed.pathname.replace(/^\/+|\/+$/g, "").replace(/[^a-z0-9]+/gi, "-");
  return `${String(index + 1).padStart(2, "0")}-${route || "home"}`.toLowerCase();
}

const captures: Capture[] = [];
try {
  for (const [urlIndex, url] of urls.entries()) {
    for (const viewport of viewports) {
      const context = await browser.newContext({ viewport, deviceScaleFactor: 1, colorScheme: "light" });
      const page = await context.newPage();
      await page.goto(url, { waitUntil: "load", timeout: 45_000 });
      await page.waitForTimeout(500);

      const fileName = `${slugFor(url, urlIndex)}-${viewport.name}.png`;
      const screenshotPath = resolve(screenshotDir, fileName);
      await page.screenshot({ path: screenshotPath, fullPage: true, animations: "disabled" });

      const sample = await page.evaluate((): SurfaceSample => {
        const frequencies: Record<string, Map<string, number>> = {
          fontFamily: new Map(),
          fontSize: new Map(),
          fontWeight: new Map(),
          lineHeight: new Map(),
          textColor: new Map(),
          backgroundColor: new Map(),
          borderColor: new Map(),
          borderRadius: new Map(),
          gap: new Map(),
          padding: new Map(),
          controlHeight: new Map(),
          rowHeight: new Map(),
        };
        const add = (key: string, raw: string) => {
          const value = raw.trim();
          if (!value || value === "normal" || value === "none" || value === "rgba(0, 0, 0, 0)") return;
          const bucket = frequencies[key]!;
          bucket.set(value, (bucket.get(value) ?? 0) + 1);
        };
        const elements = [document.body, ...Array.from(document.body.querySelectorAll<HTMLElement>("*"))]
          .filter((element) => {
            const rect = element.getBoundingClientRect();
            const style = getComputedStyle(element);
            return rect.width > 0 && rect.height > 0 && style.visibility !== "hidden" && style.display !== "none";
          })
          .slice(0, 12_000);

        for (const element of elements) {
          const style = getComputedStyle(element);
          add("fontFamily", style.fontFamily);
          add("fontSize", style.fontSize);
          add("fontWeight", style.fontWeight);
          add("lineHeight", style.lineHeight);
          add("textColor", style.color);
          add("backgroundColor", style.backgroundColor);
          add("borderColor", style.borderTopColor);
          add("borderRadius", style.borderTopLeftRadius);
          add("gap", style.gap);
          add("padding", `${style.paddingTop} ${style.paddingRight} ${style.paddingBottom} ${style.paddingLeft}`);

          const rect = element.getBoundingClientRect();
          if (element.matches("button, input, select, textarea, [role='button'], [role='combobox']")) {
            add("controlHeight", `${Math.round(rect.height)}px`);
          }
          if (element.matches("tr, [role='row'], [role='listitem']")) add("rowHeight", `${Math.round(rect.height)}px`);
        }

        const counts = Object.fromEntries(
          Object.entries(frequencies).map(([key, bucket]) => [
            key,
            [...bucket.entries()]
              .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
              .slice(0, 24)
              .map(([value, count]) => ({ value, count })),
          ]),
        );
        const text = (selector: string) => Array.from(document.querySelectorAll<HTMLElement>(selector))
          .map((element) => element.innerText.trim().replace(/\s+/g, " "))
          .filter(Boolean)
          .slice(0, 24);

        return {
          title: document.title,
          headings: text("h1, h2, h3"),
          navLabels: text("nav a, nav button, aside a, aside button").map((label) => label.slice(0, 100)),
          counts,
        };
      });

      captures.push({
        url,
        viewport: viewport.name,
        width: viewport.width,
        height: viewport.height,
        screenshot: relative(outDir, screenshotPath),
        sample,
      });
      await context.close();
    }
  }
} finally {
  await browser.close();
  if (runtimeDir) await rm(runtimeDir, { recursive: true, force: true });
}

function aggregate(property: string): Frequency[] {
  const totals = new Map<string, number>();
  for (const capture of captures) {
    for (const item of capture.sample.counts[property] ?? []) totals.set(item.value, (totals.get(item.value) ?? 0) + item.count);
  }
  return [...totals.entries()]
    .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
    .slice(0, 32)
    .map(([value, count]) => ({ value, count }));
}

const properties = ["fontFamily", "fontSize", "fontWeight", "lineHeight", "textColor", "backgroundColor", "borderColor", "borderRadius", "gap", "padding", "controlHeight", "rowHeight"];
const frequencies = Object.fromEntries(properties.map((property) => [property, aggregate(property)]));
const report = {
  generatedAt: new Date().toISOString(),
  urls,
  viewports,
  captures,
  frequencies,
};
await writeFile(resolve(outDir, "tokens.json"), `${JSON.stringify(report, null, 2)}\n`);

const top = (property: string, count = 8) => (frequencies[property] ?? []).slice(0, count);
const table = (property: string) => {
  const rows = top(property).map((item) => `| \`${item.value.replaceAll("|", "\\|")}\` | ${item.count} |`).join("\n");
  return `### ${property}\n\n| Computed value | Visible elements |\n| --- | ---: |\n${rows || "| — | 0 |"}`;
};
const uniqueCommon = (property: string, minimum = 3) => (frequencies[property] ?? []).filter((item) => item.count >= minimum).length;
const signals = [
  `${uniqueCommon("fontFamily")} common font families and ${uniqueCommon("fontSize")} common font sizes were observed.`,
  `${uniqueCommon("borderRadius")} common radii and ${uniqueCommon("controlHeight")} common control heights were observed.`,
  `${uniqueCommon("backgroundColor")} common backgrounds and ${uniqueCommon("borderColor")} common border colors were observed.`,
];

const routeEvidence = captures.map((capture) => [
  `### ${capture.viewport}: ${capture.url}`,
  "",
  `- Viewport: ${capture.width} × ${capture.height}`,
  `- Page title: ${capture.sample.title || "(none)"}`,
  `- Screenshot: [${capture.screenshot}](${capture.screenshot})`,
  `- Headings sampled: ${capture.sample.headings.slice(0, 6).join(" · ") || "(none)"}`,
].join("\n")).join("\n\n");

const markdown = `# Frontend audit evidence\n\nGenerated ${report.generatedAt}. This file is measured evidence, not a visual verdict. Interpret it with the product brief and complete the four review sections below before running the visual grill.\n\n## Routes and screenshots\n\n${routeEvidence}\n\n## Automated review signals\n\n${signals.map((signal) => `- ${signal}`).join("\n")}\n\nTreat counts as leads: responsive layouts and chart libraries legitimately add values. Repeated unexplained values across equivalent controls or surfaces are inconsistencies.\n\n## Generic\n\nCompare the dominant typography, neutral palette, card treatment, shell, and landing composition with the product's entities and audience. Name any choice that could belong to an unrelated starter dashboard, citing a screenshot or frequency below.\n\n## Inconsistent\n\nCompare equivalent controls, rows, page headers, cards, and route shells. Record only differences without a product or hierarchy reason, citing their measured values and routes.\n\n## Off-brand\n\nComputed styles cannot determine brand fit. Compare this evidence with the brief's promise, vocabulary, user posture, and chosen reference profile; cite the exact conflict.\n\n## Preserve\n\nName information architecture, copy, interactions, hierarchy, density, or responsive behavior that already serves the user's workflow. Cite the route and screenshot.\n\n## Computed-style frequencies\n\n${properties.map((property) => table(property)).join("\n\n")}\n`;
await writeFile(resolve(outDir, "audit.md"), markdown);

console.log(`Audited ${urls.length} route(s) at ${viewports.length} viewport(s).`);
console.log(`Evidence: ${resolve(outDir, "audit.md")}`);
console.log(`Frequencies: ${resolve(outDir, "tokens.json")}`);
console.log(`Screenshots: ${screenshotDir}`);
