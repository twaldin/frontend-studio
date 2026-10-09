#!/usr/bin/env bun
import { readdir } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { resolve } from "node:path";
import { checkModelFile } from "../src/model/load";
import { readPatternCatalog } from "../src/model/patterns";

const args = Bun.argv.slice(2);
const usage = "Usage: bun run model:check <product.json> [--write-shown-when]\n       bun run model:check --samples [--write-shown-when]";
if (args.includes("--help")) { console.log(usage); process.exit(0); }
const writeShownWhen = args.includes("--write-shown-when");
const samples = args.includes("--samples");
const paths = args.filter((a) => !a.startsWith("--"));
if (args.some((a) => a.startsWith("--") && !["--samples", "--write-shown-when"].includes(a)) || (samples ? paths.length !== 0 : paths.length !== 1)) { console.error(usage); process.exit(1); }
try {
  const catalog = await readPatternCatalog(fileURLToPath(new URL("../../references/patterns/", import.meta.url)));
  if (samples) {
    const dir = fileURLToPath(new URL("../samples/", import.meta.url));
    for (const entry of (await readdir(dir, { withFileTypes: true })).sort((a, b) => a.name.localeCompare(b.name))) if (entry.isDirectory()) paths.push(resolve(dir, entry.name, "product.json"));
    if (!paths.length) throw new Error("No sample models found; add samples/<archetype>/product.json.");
  }
  let failed = false;
  for (const path of paths) {
    const result = await checkModelFile(path, catalog, { writeShownWhen });
    const label = samples ? path.split("/").slice(-2).join("/") : path;
    for (const issue of result.errors) console.error(`ERROR ${label} ${issue.path}: ${issue.message}`);
    for (const issue of result.warnings) console.warn(`WARN ${label} ${issue.path}: ${issue.message}`);
    if (result.errors.length) failed = true;
    console.log(`${label}: ${result.errors.length ? "FAIL" : "OK"} (${result.errors.length} errors, ${result.warnings.length} warnings)`);
  }
  if (failed) process.exit(1);
} catch (error) { console.error(`ERROR ${error instanceof Error ? error.message : String(error)}`); process.exit(1); }
