/**
 * Renders the decision tree as Markdown for the no-browser fallback.
 * Run: bun run tree:md   (writes ../references/decision-tree.md)
 */
import { ARCHETYPE_REFERENCE, LOOK_DEFAULTS, STEPS, PRESETS } from "../src/tree/steps";
import type { Archetype } from "../src/tree/types";

const refs = Object.keys(PRESETS);
const lines: string[] = [
  "# Visual decision tree",
  "",
  "Generated from `studio/src/tree/steps.ts`; edit there. Ask in this order. Each step lists the options and what every reference picks, so a text-only run can still say \"Linear's default is X\". The archetype picks the reference to start from; a look other than the reference's own re-defaults the steps it lists.",
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
  for (const o of s.options) {
    const picks = s.id === "reference" ? "" : refs.filter((r) => PRESETS[r]![s.id] === o.id).join(", ");
    const extra =
      s.id === "archetype"
        ? ` Starts from ${ARCHETYPE_REFERENCE[o.id as Archetype]}.`
        : s.id === "look"
          ? ` Re-defaults: ${Object.entries(LOOK_DEFAULTS[o.id] ?? {}).map(([k, v]) => `${k} ${v}`).join(", ")}.`
          : "";
    lines.push(`- **${o.label}** \`${o.id}\` — ${o.note}${extra}${picks ? ` _(default for: ${picks})_` : ""}`);
  }
  lines.push("");
}
lines.push(
  "## Export",
  "",
  "The choices resolve to `theme.css` (shadcn variable names, light and dark), `design-decisions.md` (one line per step, defaults marked), and a `components.json` snippet. A walk in the studio also yields `studio-notes.md` (notes, the revisit list, open steps) and `content.json` (the copy with its edits). With a browser: the studio's Export panel, or `bun run export` in `studio/` for the saved walk. Without one: `bun run export -- <stepId>=<optionId> ...`, and record notes and revisit steps in the conversation.",
  "",
);
const out = new URL("../../references/decision-tree.md", import.meta.url);
await Bun.write(out, lines.join("\n"));
console.log(`wrote ${out.pathname} (${n} steps)`);
