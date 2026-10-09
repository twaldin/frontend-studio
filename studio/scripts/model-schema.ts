#!/usr/bin/env bun
import { readFile, writeFile } from "node:fs/promises";
import { z } from "zod";
import { productModelSchema } from "../src/model/schema";

const args = Bun.argv.slice(2);
if (args.includes("--help")) { console.log("Usage: bun run model:schema [--check]"); process.exit(0); }
if (args.length > 1 || (args.length === 1 && args[0] !== "--check")) { console.error("Usage: bun run model:schema [--check]"); process.exit(1); }
const path = new URL("../../references/product-model.schema.json", import.meta.url);
const schema = z.toJSONSchema(productModelSchema, { target: "draft-2020-12", reused: "ref" });
const output = `${JSON.stringify(schema, null, 2)}\n`;
if (args[0] === "--check") {
  const current = await readFile(path, "utf8").catch(() => "");
  if (current !== output) { console.error("product-model.schema.json is stale; run bun run model:schema and commit the generated schema."); process.exit(1); }
  console.log("product-model.schema.json matches schema.ts");
} else { await writeFile(path, output); console.log("Wrote references/product-model.schema.json"); }
