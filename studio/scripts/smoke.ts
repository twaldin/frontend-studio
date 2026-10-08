#!/usr/bin/env bun
/**
 * Saved-walk, builder and pattern regression smokes against a running dev studio.
 * Run: bun run smoke --url http://127.0.0.1:5199/
 * Uses one page (a second only to check resume), restores the saved walk, and
 * reviews DOM/state contracts. Use capture and live replay for visual judgment.
 */
import { readdir } from "node:fs/promises";
import { CONTENT_BY_ARCHETYPE } from "../src/content/default";
import { STEPS, PRESETS, defaultsFor, resolveChoices } from "../src/tree/steps";
import type { Archetype, Choices, StepId } from "../src/tree/types";
import { componentsJson, decisionsMarkdown, studioNotesMarkdown } from "../src/studio/Export";
import { parseSaved } from "../src/studio/saved";
import { resolveTokens, themeCss } from "../src/tokens/resolve";
import { INTERACTION_RUNTIME } from "../src/tokens/runtime";
import { launchChromium } from "./playwright";

const argv = Bun.argv.slice(2);
if (argv.includes("--help")) {
  console.log("Usage: bun run smoke [--url <running dev studio URL>]");
  process.exit(0);
}
if (argv.length && (argv.length !== 2 || argv[0] !== "--url")) throw new Error("Usage: bun run smoke [--url <running dev studio URL>]");
const base = new URL(argv[1] ?? "http://127.0.0.1:5199/");
const stateUrl = new URL("/__studio/state", base);
const originalResponse = await fetch(stateUrl);
if (!originalResponse.ok || !originalResponse.headers.get("content-type")?.includes("json")) throw new Error("Smoke requires the dev server's state endpoint");
const original = await originalResponse.text();
const setSaved = async (body: string) => {
  const r = await fetch(stateUrl, { method: "PUT", headers: { "content-type": "application/json" }, body });
  if (!r.ok) throw new Error(`Could not save smoke state (HTTP ${r.status})`);
};
const saved = async () => parseSaved(await (await fetch(stateUrl)).json());
let checks = 0;
const failures: string[] = [];
const check = (name: string, ok: boolean, detail = "") => {
  checks += 1;
  if (!ok) failures.push(`${name}${detail ? `: ${detail}` : ""}`);
};
const index = (id: StepId) => STEPS.findIndex((s) => s.id === id);
const link = (choices: Choices, id: StepId, capture = false, mode = "light") => {
  const url = new URL(base);
  if (capture) url.searchParams.set("capture", "1");
  url.hash = new URLSearchParams({ ...choices, step: String(index(id)), mode }).toString();
  return url.toString();
};

// The public catalog must remain complete and navigable independently of the UI.
const patternDir = new URL("../../references/patterns/", import.meta.url);
const recordFiles = (await readdir(patternDir)).filter((name) => name.endsWith(".md") && name !== "README.md");
const catalog = await Bun.file(new URL("README.md", patternDir)).text();
const requiredSections = ["Problem and outcome", "When to use / When not to use", "Structure and slots", "Variants", "States and transitions", "Data and copy contract", "Accessibility", "Responsive", "Motion", "Looks", "References", "Code you can use"];
check("catalog contains 34 records", recordFiles.length === 34, String(recordFiles.length));
for (const file of recordFiles) {
  const text = await Bun.file(new URL(file, patternDir)).text();
  check(`catalog indexes ${file}`, catalog.includes(`](${file})`));
  for (const heading of requiredSections) check(`record section ${file}/${heading}`, text.includes(`## ${heading}\n`));
  const variants = text.split("## Variants\n")[1]?.split("\n## ")[0] ?? "";
  const variantLines = variants.split("\n");
  const tableRows = variantLines.filter((line) => line.startsWith("|") && !line.startsWith("| ---") && !line.startsWith("| Variant"));
  const variantCount = tableRows.length || variantLines.filter((line) => line.startsWith("- **")).length;
  check(`record variants ${file}`, variantCount >= 2 && variantCount <= 4, String(variantCount));
  const references = text.split("## References\n")[1]?.split("\n## ")[0] ?? "";
  const citations = references.split("\n").filter((line) => line.startsWith("- ") && line.includes("https://"));
  check(`dated references ${file}`, citations.length > 0 && citations.every((line) => /\b\d{4}-\d{2}-\d{2}\b/.test(line)));
  for (const match of text.matchAll(/\]\(([^)#]+\.md)(?:#[^)]*)?\)/g)) {
    check(`record link ${file}/${match[1]}`, await Bun.file(new URL(match[1]!, new URL(file, patternDir))).exists());
  }
}

// Every preset and derived default must resolve to a real option at every step.
for (const reference of Object.keys(PRESETS)) {
  const resolved = resolveChoices({ reference });
  for (const step of STEPS) check(`default ${reference}/${step.id}`, step.options.some((o) => o.id === resolved[step.id]));
}
const expectedArrival: Record<string, string> = { still: "cut", snappy: "fade", anchored: "anchored", tactile: "rise", material: "reveal" };
for (const language of STEPS.find((s) => s.id === "motion")!.options) {
  const derived = defaultsFor({ motion: language.id });
  check(`motion choice ${language.id}`, resolveChoices({ motion: language.id }).motion === language.id);
  check(`language sets arrival ${language.id}`, derived.layerArrival === expectedArrival[language.id]);
  check(`explicit axis survives ${language.id}`, resolveChoices({ motion: language.id, layerArrival: "cut" }).layerArrival === "cut");
}
const exportChoices: Choices = { archetype: "feed", look: "brutalist", motion: "material", feedLayout: "digest", controlResponse: "sink" };
const resolved = resolveChoices(exportChoices);
const decisions = decisionsMarkdown(resolved, exportChoices);
const css = themeCss(resolveTokens(resolved));
check("export names archetype and look", decisions.includes("Archetype: **Feed**") && decisions.includes("**Brutalist**"));
for (const step of STEPS.filter((s) => s.pattern && s.branch === "surfaces")) check(`export contract ${step.id}`, decisions.includes(`references/patterns/${step.pattern}.md`) && decisions.includes(step.options.find((o) => o.id === resolved[step.id])!.label));
check("export motion and reduced-motion CSS", css.includes("--duration-press") && css.includes("--duration-route") && css.includes("prefers-reduced-motion"));
check("export look tokens", css.includes("--button-edge") && css.includes("--heading-weight"));
check("component config is JSON", JSON.parse(componentsJson(resolved)).$schema?.includes("shadcn"));
check("notes export includes revisit", studioNotesMarkdown(resolved, { choices: exportChoices, notes: { feedLayout: "Compare the digest on a phone." }, status: { feedLayout: "revisit" }, copy: {} }).includes("Compare the digest on a phone."));

const { browser, close } = await launchChromium();
let context;
try {
  await setSaved("{}");
  context = await browser.newContext({ viewport: { width: 1600, height: 1000 }, reducedMotion: "reduce" });
  const page = await context.newPage();
  const errors: string[] = [];
  const observe = (p: {
    on(event: "pageerror", listener: (error: Error) => void): void;
    on(event: "console", listener: (message: { type(): string; text(): string }) => void): void;
  }) => {
    p.on("pageerror", (e: Error) => errors.push(e.message));
    p.on("console", (m: { type(): string; text(): string }) => {
      if (m.type() === "error" && !m.text().startsWith("Failed to load resource")) errors.push(m.text());
    });
  };
  observe(page);
  const persist = async () => {
    await page.waitForTimeout(700);
    return saved();
  };
  const settle = async () => page.evaluate(async () => {
    await document.fonts.ready;
    await new Promise<void>((resolve) => requestAnimationFrame(() => requestAnimationFrame(() => resolve())));
  });

  await page.goto(link({ archetype: "workspace" }, "accent"), { waitUntil: "load" });
  await page.waitForTimeout(700);
  check("footer confirms persistence", (await page.locator("footer").innerText()).includes("saved to .studio/state.json"));
  await page.keyboard.press("3");
  await page.getByRole("radio", { name: "Revisit" }).click();
  await page.getByLabel("Note", { exact: true }).fill("Check the accent with the selected neutral.");
  const walk = await persist();
  check("keyboard choice saved", walk.choices?.accent === STEPS[index("accent")]!.options[2]!.id);
  check("status saved", walk.status?.accent === "revisit");
  check("note saved", walk.notes?.accent === "Check the accent with the selected neutral.");
  await page.getByRole("button", { name: "Copy", exact: true }).click();
  await page.getByLabel("app.page.title", { exact: true }).fill("Smoke edited heading");
  check("edited copy renders", (await page.locator("main").innerText()).includes("Smoke edited heading"));
  check("copy saved", (await persist()).copy?.["app.page.title"] === "Smoke edited heading");
  await page.getByRole("button", { name: "Export", exact: true }).click();
  const exportText = await page.locator("main").innerText();
  check("export shows revisit", exportText.includes("### Revisit") && exportText.includes("Check the accent"));
  check("export shows edited content", exportText.includes("Smoke edited heading"));
  // Hash-only navigation preserves the current panel; return through the public control.
  await page.getByRole("button", { name: "Gallery", exact: true }).click();

  const resume = await context.newPage();
  observe(resume);
  await resume.goto(base.toString(), { waitUntil: "load" });
  await resume.waitForTimeout(700);
  check("bare URL resumes choices", (await resume.evaluate(() => location.hash)).includes(`accent=${walk.choices.accent}`));
  await resume.goto(link({ archetype: "workspace" }, "accent"));
  await resume.waitForTimeout(500);
  check("note resumes", (await resume.getByLabel("Note", { exact: true }).inputValue()) === "Check the accent with the selected neutral.");
  await resume.close();

  // Reset and reference ordering use the same selectors as the original builder smoke.
  await page.goto(link({ archetype: "feed" }, "reference"));
  await page.waitForTimeout(500);
  const first = await page.locator("aside ol li").first().innerText();
  check("fitting references come first", first.includes("Community") && first.includes("fits feed"));
  await page.locator("aside ol li").nth(5).hover();
  check("hover keeps reference order", (await page.locator("aside ol li").first().innerText()) === first);
  await page.mouse.move(1500, 900);
  await page.goto(link({ archetype: "feed", look: "brutalist" }, "look"));
  await page.waitForTimeout(500);
  check("feed sample renders", (await page.locator("main").innerText()).includes(CONTENT_BY_ARCHETYPE.feed.product.name));
  const brutal = await page.locator(".gallery").first().evaluate((root: HTMLElement) => ({ look: root.dataset.look, weight: getComputedStyle(root).getPropertyValue("--heading-weight").trim() }));
  check("look tokens apply", brutal.look === "brutalist" && brutal.weight === "700");
  await page.getByRole("heading", { name: STEPS[index("look")]!.question, exact: true }).click();
  await page.keyboard.press("r");
  const reset = await persist();
  check("reset preserves archetype", reset.choices?.archetype === "feed" && reset.choices?.look === undefined);
  await page.goto(link({ archetype: "feed", accent: "amber" }, "accent"));
  await page.waitForTimeout(500);
  const foreground = await page.locator(".gallery").first().evaluate((root: HTMLElement) => getComputedStyle(root).getPropertyValue("--primary-foreground").trim());
  check("amber fill has dark text", foreground === "#000000");
  await persist();
  const before = JSON.stringify(await saved());

  await page.goto(link({ archetype: "workspace" }, "feedLayout", true));
  await settle();
  check("capture removes walk controls", await page.locator("aside ol li").count() === 0);
  const reducedUpdates = await page.evaluate(async (source: string) => {
    const url = URL.createObjectURL(new Blob([source], { type: "text/javascript" }));
    try {
      // Exercise the emitted module boundary at its runtime-created Blob URL.
      const { transitionStudio } = await import(url);
      let updates = 0;
      for (const kind of ["content", "route", "theme"]) await transitionStudio(kind, () => { updates += 1; });
      return { updates, clean: document.documentElement.dataset.studioTransition === undefined };
    } finally { URL.revokeObjectURL(url); }
  }, INTERACTION_RUNTIME);
  check("runtime reduced-motion updates are immediate", reducedUpdates.updates === 3 && reducedUpdates.clean);
  await page.emulateMedia({ reducedMotion: "no-preference" });
  const nativeUpdates = await page.evaluate(async ({ source, css }: { source: string; css: string }) => {
    const url = URL.createObjectURL(new Blob([source], { type: "text/javascript" }));
    const style = document.createElement("style");
    style.textContent = css;
    document.head.append(style);
    const marker = document.createElement("p");
    document.body.append(marker);
    try {
      // A static source import would not test the exported ES-module artifact.
      const { transitionStudio } = await import(url);
      await transitionStudio("content", () => { marker.textContent = "Content committed"; }, { instant: true });
      const instant = marker.textContent === "Content committed";
      await Promise.all([
        transitionStudio("route", () => { marker.textContent = "First route committed"; }),
        transitionStudio("theme", () => { marker.textContent = "Latest theme committed"; }, { x: 30, y: 30 }),
      ]);
      return { instant, latest: marker.textContent, clean: document.documentElement.dataset.studioTransition === undefined, native: typeof document.startViewTransition === "function" };
    } finally {
      marker.remove();
      style.remove();
      URL.revokeObjectURL(url);
    }
  }, { source: INTERACTION_RUNTIME, css });
  check("runtime instant path commits", nativeUpdates.instant);
  check("runtime interruption keeps latest real update", nativeUpdates.latest === "Latest theme committed" && nativeUpdates.clean);
  console.log(`Native view transitions available: ${nativeUpdates.native}`);
  await page.emulateMedia({ reducedMotion: "reduce" });
  const surfaceSteps = STEPS.filter((s) => s.branch === "surfaces");
  const archetypes = STEPS.find((s) => s.id === "archetype")!.options;
  const looks = STEPS.find((s) => s.id === "look")!.options;
  let surfaces = 0;
  for (const archetype of archetypes) {
    const content = CONTENT_BY_ARCHETYPE[archetype.id as Archetype];
    for (const look of looks) {
      for (const step of surfaceSteps) {
        for (const option of step.options) {
          const hash = new URL(link({ archetype: archetype.id, look: look.id, [step.id]: option.id }, step.id, true)).hash;
          await page.evaluate((value: string) => { location.hash = value; }, hash);
          await settle();
          const text = await page.locator(".gallery").innerText();
          const key = step.id.replace("Layout", "") as keyof typeof content.surfaces;
          const actualLook = await page.locator(".gallery").getAttribute("data-look");
          check(`surface ${archetype.id}/${look.id}/${step.id}/${option.id}`, actualLook === look.id && text.includes(content.surfaces[key].title) && text.includes("Empty and loading") && text.includes(option.label));
          surfaces += 1;
        }
      }
    }
  }
  console.log(`Surface matrix: ${surfaces} renders (${archetypes.length} archetypes × ${looks.length} looks × ${surfaceSteps.reduce((n, s) => n + s.options.length, 0)} options)`);
  let interactions = 0;
  for (const step of STEPS.filter((s) => s.branch === "interaction")) {
    for (const option of step.options) {
      const hash = new URL(link({ archetype: "workspace", [step.id]: option.id }, step.id, true)).hash;
      await page.evaluate((value: string) => { location.hash = value; }, hash);
      await settle();
      const text = await page.locator(".gallery").innerText();
      check(`interaction ${step.id}/${option.id}`, text.includes("Specimen") && text.includes(option.label));
      interactions += 1;
    }
  }
  console.log(`Interaction matrix: ${interactions} options`);
  check("capture leaves saved walk untouched", JSON.stringify(await saved()) === before);
  check("no runtime or console errors", errors.length === 0, errors.join(" | ").slice(0, 1500));
} finally {
  try {
    if (context) await context.close();
  } finally {
    try { await close(); } finally { await setSaved(original); }
  }
}
for (const failure of failures) console.error(`FAIL ${failure}`);
console.log(`${checks - failures.length}/${checks} smoke checks passed`);
if (failures.length) process.exit(1);
