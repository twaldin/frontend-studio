import { readdir, readFile } from "node:fs/promises";
import { join } from "node:path";
import { z } from "zod";
import { STEPS } from "../tree/steps";

export interface PatternRecord {
  id: string;
  scale: "flow" | "surface" | "component" | "interaction" | "motion";
  studio: string | null;
  slots: { required: string[]; optional: string[] };
  variants: { id: string; label: string }[];
  states: string[];
  /** Every family is required; a copy key must contain it as a dot-separated segment. */
  copy: string[];
  events: string[];
  renderer: "variants" | "schematic";
  sharesVariants?: string;
}

export type PatternCatalog = Record<string, PatternRecord>;

type YamlParser = { parse(source: string): unknown };
const recordId = z.string().regex(/^[a-z][a-z0-9]*(?:-[a-z0-9]+)*(?![\s\S])/, "must be a kebab-case record id");
const camelId = z.string().regex(/^[a-z][a-zA-Z0-9]*(?![\s\S])/, "must be a camelCase id");
const label = z.string().min(1).refine((value) => value === value.trim(), "must not have surrounding whitespace");
const headerSchema: z.ZodType<PatternRecord> = z.strictObject({
  id: recordId,
  scale: z.enum(["flow", "surface", "component", "interaction", "motion"]),
  studio: camelId.nullable(),
  slots: z.strictObject({ required: z.array(camelId), optional: z.array(camelId) }),
  variants: z.array(z.strictObject({ id: camelId, label })).min(1),
  states: z.array(camelId),
  copy: z.array(camelId),
  events: z.array(camelId),
  renderer: z.enum(["variants", "schematic"]),
  sharesVariants: recordId.optional(),
});
const studioSteps = Object.fromEntries(STEPS.map((step) => [step.id, step]));

function duplicates(values: readonly string[]): string[] {
  const seen = new Set<string>();
  const repeated = new Set<string>();
  for (const value of values) {
    if (seen.has(value)) repeated.add(value);
    seen.add(value);
  }
  return [...repeated];
}

function proseVariants(prose: string): string[] | undefined {
  const heading = /^## Variants[ \t]*\r?\n/m.exec(prose);
  if (!heading) return undefined;
  const section = prose.slice(heading.index + heading[0].length).split(/^## /m, 1)[0]!;
  const labels: string[] = [];
  for (const line of section.split(/\r?\n/)) {
    const bullet = /^- \*\*([^*]+)\*\*/.exec(line)?.[1];
    const baseline = /^\*\*([^*]+) — universal baseline:\*\*/.exec(line)?.[1];
    const cell = /^\|\s*([^|]+?)\s*\|/.exec(line)?.[1]?.trim();
    if (bullet) labels.push(bullet.replace(/:$/, ""));
    else if (baseline) labels.push(baseline);
    else if (cell && cell !== "Variant" && !/^:?-+:?$/.test(cell)) labels.push(cell);
  }
  return labels;
}

/** Read Markdown headers as the source of truth, checking their prose and studio references. */
export async function readPatternCatalog(directory: string): Promise<PatternCatalog> {
  // Keep Bun's YAML parser behind a narrow type: the frontend tsconfig does not include Bun globals.
  const yaml = (globalThis as typeof globalThis & { Bun?: { YAML?: YamlParser } }).Bun?.YAML;
  if (!yaml) throw new Error("Pattern catalog requires Bun with YAML.parse support.");

  const files = (await readdir(directory, { withFileTypes: true }))
    .filter((entry) => entry.isFile() && entry.name.endsWith(".md") && entry.name !== "README.md")
    .map((entry) => entry.name)
    .sort();
  if (files.length === 0) throw new Error("Pattern catalog contains no Markdown records.");

  const catalog: PatternCatalog = Object.create(null);
  const errors: string[] = [];
  for (const file of files) {
    const source = await readFile(join(directory, file), "utf8");
    const frontmatter = /^---\r?\n([\s\S]*?)\r?\n---(?:\r?\n|$)/.exec(source);
    if (!frontmatter) {
      errors.push(`${file}: add a YAML front matter header delimited by ---`);
      continue;
    }
    let raw: unknown;
    try {
      raw = yaml.parse(frontmatter[1]!);
    } catch (error) {
      errors.push(`${file}: invalid YAML header: ${error instanceof Error ? error.message : String(error)}`);
      continue;
    }
    const parsed = headerSchema.safeParse(raw);
    if (!parsed.success) {
      for (const issue of parsed.error.issues) errors.push(`${file}: ${issue.path.join(".") || "header"}: ${issue.message}`);
      continue;
    }
    const record = parsed.data;
    if (record.id !== file.slice(0, -3)) errors.push(`${file}: id must match filename (${file.slice(0, -3)})`);
    if (catalog[record.id]) errors.push(`${file}: duplicate record id ${record.id}`);
    else catalog[record.id] = record;

    const lists: [string, string[]][] = [
      ["slots", [...record.slots.required, ...record.slots.optional]],
      ["variants.id", record.variants.map((variant) => variant.id)],
      ["variants.label", record.variants.map((variant) => variant.label)],
      ["states", record.states], ["copy", record.copy], ["events", record.events],
    ];
    for (const [field, values] of lists) {
      for (const duplicate of duplicates(values)) errors.push(`${file}: ${field} contains duplicate ${JSON.stringify(duplicate)}`);
    }
    const proseLabels = proseVariants(source.slice(frontmatter[0].length));
    if (proseLabels === undefined) errors.push(`${file}: add a ## Variants prose section`);
    else {
      const headerLabels = record.variants.map((variant) => variant.label);
      for (const duplicate of duplicates(proseLabels)) errors.push(`${file}: Variants prose repeats label ${JSON.stringify(duplicate)}`);
      for (const variant of headerLabels) {
        if (!proseLabels.includes(variant)) errors.push(`${file}: header variant label ${JSON.stringify(variant)} must appear exactly in Variants prose (including universal baselines)`);
      }
      for (const variant of proseLabels) {
        if (!headerLabels.includes(variant)) errors.push(`${file}: prose variant label ${JSON.stringify(variant)} is missing from the header`);
      }
    }
    if (record.studio !== null) {
      const step = Object.hasOwn(studioSteps, record.studio) ? studioSteps[record.studio] : undefined;
      if (!step) errors.push(`${file}: studio references unknown step ${JSON.stringify(record.studio)}`);
      else {
        for (const option of step.options) {
          if (!record.variants.some((variant) => variant.id === option.id && variant.label === option.label)) {
            errors.push(`${file}: studio ${record.studio} requires variant ${option.id} with exact label ${JSON.stringify(option.label)}`);
          }
        }
        for (const variant of record.variants) {
          if (!step.options.some((option) => option.id === variant.id && option.label === variant.label)) {
            errors.push(`${file}: variant ${variant.id} / ${JSON.stringify(variant.label)} is not an option of studio ${record.studio}`);
          }
        }
        if (!step.pattern || (step.pattern !== record.id && step.pattern !== record.sharesVariants)) {
          errors.push(`${file}: studio ${record.studio} belongs to ${step.pattern ?? "a non-pattern step"}; use null or declare its shared surface variants`);
        }
      }
    }
  }
  for (const record of Object.values(catalog)) {
    if (!record.sharesVariants) continue;
    const file = `${record.id}.md`;
    const target = catalog[record.sharesVariants];
    if (!target) errors.push(`${file}: sharesVariants references missing record ${record.sharesVariants}`);
    else {
      if (record.scale !== "flow" || target.scale !== "surface") errors.push(`${file}: sharesVariants must connect a flow record to a surface record`);
      if (record.variants.length !== target.variants.length || record.variants.some((variant) => !target.variants.some((other) => other.id === variant.id && other.label === variant.label))) {
        errors.push(`${file}: sharesVariants must use exactly the variant ids and labels of ${target.id}`);
      }
    }
  }
  if (errors.length) throw new Error(`Pattern catalog errors:\n${errors.join("\n")}`);
  return catalog;
}
