/**
 * Headless export: the same three artifacts the studio's Export panel
 * produces, from choices given as `step=option` arguments.
 * Run: bun run export -- reference=linear accent=teal radius=round
 */
import { resolveChoices, STEP_BY_ID } from "../src/tree/steps";
import type { Choices, StepId } from "../src/tree/types";
import { resolveTokens, themeCss } from "../src/tokens/resolve";
import { componentsJson, decisionsMarkdown } from "../src/studio/Export";

const choices: Choices = {};
for (const arg of process.argv.slice(2)) {
  const [k, v] = arg.split("=");
  const step = STEP_BY_ID[k as StepId];
  if (!step || !v || !step.options.some((o) => o.id === v)) {
    console.error(`unknown choice: ${arg}`);
    process.exit(1);
  }
  choices[step.id] = v;
}

const resolved = resolveChoices(choices);
const tokens = resolveTokens(resolved);
const dir = new URL("../export/", import.meta.url);
await Bun.write(new URL("theme.css", dir), themeCss(tokens));
await Bun.write(new URL("design-decisions.md", dir), decisionsMarkdown(resolved, choices));
await Bun.write(new URL("components.json", dir), componentsJson(resolved));
console.log(`wrote ${dir.pathname}{theme.css,design-decisions.md,components.json}`);
