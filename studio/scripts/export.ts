/**
 * Headless export: the artifacts of the studio's Export panel.
 *
 *   bun run export                                  # the saved walk in .studio/state.json
 *   bun run export -- reference=linear accent=teal  # choices given as step=option
 *
 * From the saved walk it also writes studio-notes.md (notes, revisit list,
 * open steps) and content.json (the copy with the studio's edits applied).
 */
import { existsSync } from "node:fs";
import { resolveChoices, STEP_BY_ID } from "../src/tree/steps";
import type { Archetype, Choices, StepId } from "../src/tree/types";
import { resolveTokens, themeCss } from "../src/tokens/resolve";
import { componentsJson, decisionsMarkdown, studioNotesMarkdown } from "../src/studio/Export";
import { parseSaved, type SavedState } from "../src/studio/saved";
import { CONTENT_BY_ARCHETYPE } from "../src/content/default";
import { applyCopy, mergeContent } from "../src/content/copy";

const argv = process.argv.slice(2);
const statePath = new URL("../.studio/state.json", import.meta.url);
let saved: SavedState | undefined;
let choices: Choices = {};

if (argv.length === 0) {
  if (!existsSync(statePath)) {
    console.error("No saved walk at studio/.studio/state.json. Walk the studio with `bun run dev`, or pass step=option arguments.");
    process.exit(1);
  }
  saved = parseSaved(await Bun.file(statePath).json());
  choices = saved.choices;
} else {
  for (const arg of argv) {
    const [k, v] = arg.split("=");
    const step = STEP_BY_ID[k as StepId];
    if (!step || !v || !step.options.some((o) => o.id === v)) {
      console.error(`unknown choice: ${arg}`);
      process.exit(1);
    }
    choices[step.id] = v;
  }
}

const resolved = resolveChoices(choices);
const tokens = resolveTokens(resolved);
const dir = new URL("../export/", import.meta.url);
const written = ["theme.css", "design-decisions.md", "components.json"];
await Bun.write(new URL("theme.css", dir), themeCss(tokens));
await Bun.write(new URL("design-decisions.md", dir), decisionsMarkdown(resolved, choices));
await Bun.write(new URL("components.json", dir), componentsJson(resolved));
if (saved) {
  await Bun.write(new URL("studio-notes.md", dir), studioNotesMarkdown(resolved, saved));
  written.push("studio-notes.md");
  // The same content the browser showed: the default, a file in public/, or a `?content=` URL.
  const source = saved.contentSource ?? "/content.json";
  let project: unknown = {};
  if (/^https?:\/\//.test(source)) {
    const r = await fetch(source);
    // A dev server answers a missing file with its HTML fallback and a 200.
    if (!r.ok || !r.headers.get("content-type")?.includes("json")) {
      console.error(`${source} didn't return JSON (HTTP ${r.status}); content.json not written.`);
      process.exit(1);
    }
    project = await r.json();
  } else if (source !== "default") {
    const publicDir = new URL("../public/", import.meta.url);
    const file = new URL(`.${source}`, publicDir);
    if (!source.startsWith("/") || source.startsWith("//") || !file.pathname.startsWith(publicDir.pathname)) {
      console.error(`The walk's content source ${source} is neither a path in studio/public/ nor an http(s) URL; content.json not written.`);
      process.exit(1);
    }
    if (existsSync(file)) project = await Bun.file(file).json();
    else if (saved.contentSource) {
      console.error(`The walk's content came from ${file.pathname}, which no longer exists; content.json not written.`);
      process.exit(1);
    }
  }
  const content = mergeContent(CONTENT_BY_ARCHETYPE[resolved.archetype as Archetype], project);
  await Bun.write(new URL("content.json", dir), `${JSON.stringify(applyCopy(content, saved.copy), null, 2)}\n`);
  written.push("content.json");
}
console.log(`wrote ${dir.pathname}{${written.join(",")}}`);
