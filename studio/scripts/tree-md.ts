/**
 * Renders the decision tree as Markdown for the no-browser fallback.
 * Run: bun run tree:md   (writes ../references/decision-tree.md)
 */
import { ARCHETYPE_DEFAULTS, ARCHETYPE_REFERENCE, LOOK_DEFAULTS, MOTION_DEFAULTS, STEPS, PRESETS, defaultsFor } from "../src/tree/steps";
import type { Archetype } from "../src/tree/types";

const refs = Object.keys(PRESETS);
const defaults = Object.fromEntries(refs.map((r) => [r, defaultsFor({ reference: r })]));
const list = (values: Record<string, string>) => Object.entries(values).map(([k, v]) => `${k} ${v}`).join(", ");
const lines: string[] = [
  "# Visual decision tree",
  "",
  "Generated from `studio/src/tree/steps.ts`; edit there. Ask in this order. Each step lists the options and what every reference picks, so a text-only run can still say \"Linear's default is X\". The archetype picks the reference to start from and the surface layouts; a look other than the reference's own re-defaults the steps it lists, and so does a motion language for the interaction steps. Read each linked pattern record in `references/patterns/` for its variants and contract; Still and Cut are universal baselines beside the motion variants.",
  "",
];
let n = 0;
let branch = "";
for (const s of STEPS) {
  if (s.branch !== branch) {
    branch = s.branch;
    lines.push(`## ${branch[0]!.toUpperCase()}${branch.slice(1)}`, "");
  }
  n += 1;
  lines.push(`### ${n}. ${s.question}`, "", `_${s.why}_`, "");
  if (s.pattern) lines.push(`Pattern: [${s.pattern}](patterns/${s.pattern}.md).`, "");
  for (const o of s.options) {
    const picks = s.id === "reference" ? "" : refs.filter((r) => defaults[r]![s.id] === o.id).join(", ");
    const extra =
      s.id === "archetype"
        ? ` Starts from ${ARCHETYPE_REFERENCE[o.id as Archetype]}; surfaces: ${list(ARCHETYPE_DEFAULTS[o.id as Archetype])}.`
        : s.id === "look"
          ? ` Re-defaults: ${list(LOOK_DEFAULTS[o.id] ?? {})}.`
          : s.id === "motion"
            ? ` Re-defaults: ${list(MOTION_DEFAULTS[o.id] ?? {})}.`
            : "";
    lines.push(`- **${o.label}** \`${o.id}\` — ${o.note}${extra}${picks ? ` _(default for: ${picks})_` : ""}`);
  }
  lines.push("");
}
lines.push(
  "## Export",
  "",
  "The choices resolve to `theme.css` (shadcn variable names, light and dark, motion durations and curves, and interaction CSS), `interaction.js` (a dependency-free DOM helper for content, route and theme transitions around real updates), `design-decisions.md` (one line per decision, defaults marked, pattern contracts and host lifecycle duties), and a `components.json` snippet. A walk in the studio also yields `studio-notes.md` (notes, the revisit list, open steps) and `content.json` (the copy with its edits). With a browser: the studio's Export panel, or `bun run export` in `studio/` for the saved walk. Without one: `bun run export -- <stepId>=<optionId> ...`, and record notes and revisit steps in the conversation.",
  "",
);
const out = new URL("../../references/decision-tree.md", import.meta.url);
await Bun.write(out, lines.join("\n"));
console.log(`wrote ${out.pathname} (${n} steps)`);
