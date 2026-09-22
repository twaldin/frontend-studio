/**
 * Renders the decision tree as Markdown for the no-browser fallback.
 * Run: bun run tree:md   (writes ../references/decision-tree.md)
 */
import { STEPS, PRESETS } from "../src/tree/steps";

const refs = Object.keys(PRESETS);
const lines: string[] = [
  "# Visual decision tree",
  "",
  "Generated from `studio/src/tree/steps.ts`; edit there. Ask in this order. Each step lists the options and what every reference product picks, so a text-only run can still say \"Linear's default is X\".",
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
    lines.push(`- **${o.label}** \`${o.id}\` — ${o.note}${picks ? ` _(default for: ${picks})_` : ""}`);
  }
  lines.push("");
}
lines.push(
  "## Export",
  "",
  "The choices resolve to `theme.css` (shadcn variable names, light and dark), `design-decisions.md` (one line per step, defaults marked), and a `components.json` snippet. With a browser: the studio's Export panel. Without: `bun run export -- <stepId>=<optionId> ...` in `studio/`.",
  "",
);
const out = new URL("../../references/decision-tree.md", import.meta.url);
await Bun.write(out, lines.join("\n"));
console.log(`wrote ${out.pathname} (${n} steps)`);
