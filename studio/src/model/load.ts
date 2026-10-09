import { readFile, writeFile } from "node:fs/promises";
import { basename, dirname, isAbsolute, resolve } from "node:path";
import { checkModel, readCopyDeck, writeShownWhen, type ModelCheckResult } from "./check";
import { productModelSchema } from "./schema";
import type { PatternCatalog } from "./patterns";

export interface ModelFileOptions { writeShownWhen?: boolean }

/** File paths are model-relative, except docs/foo paths in docs/product.json are project-relative. */
export function companionPath(modelPath: string, file: string): string {
  const directory = dirname(resolve(modelPath));
  return resolve(basename(directory) === "docs" && file.startsWith("docs/") ? dirname(directory) : directory, file);
}

function duplicateKeys(json: string): ModelCheckResult["errors"] {
  const errors: ModelCheckResult["errors"] = [];
  const stack: ({ kind: "object"; path: string; keys: Set<string>; key: string; expectingKey: boolean } | { kind: "array"; path: string; index: number })[] = [];
  for (const [token] of json.matchAll(/"(?:\\[\s\S]|[^"\\])*"|[{}\[\],:]/g)) {
    const parent = stack.at(-1);
    if (token === "{" || token === "[") {
      const path = !parent ? "$" : parent.kind === "array" ? `${parent.path}[${parent.index}]` : `${parent.path}${/^[A-Za-z][A-Za-z0-9]*$/.test(parent.key) ? `.${parent.key}` : `[${JSON.stringify(parent.key)}]`}`;
      stack.push(token === "{" ? { kind: "object", path, keys: new Set(), key: "", expectingKey: true } : { kind: "array", path, index: 0 });
    } else if (token === "}" || token === "]") stack.pop();
    else if (token === "," && parent) {
      if (parent.kind === "array") parent.index++;
      else parent.expectingKey = true;
    } else if (token.startsWith('"') && parent?.kind === "object" && parent.expectingKey) {
      const key = JSON.parse(token) as string;
      if (parent.keys.has(key)) errors.push({ path: `${parent.path}[${JSON.stringify(key)}]`, message: `Duplicate JSON key ${JSON.stringify(key)}; keep one declaration instead of silently replacing its value.` });
      parent.keys.add(key);
      parent.key = key;
      parent.expectingKey = false;
    }
  }
  return errors;
}

export async function checkModelFile(modelPath: string, catalog: PatternCatalog, options: ModelFileOptions = {}): Promise<ModelCheckResult> {
  let raw: unknown;
  try {
    const json = await readFile(modelPath, "utf8");
    raw = JSON.parse(json);
    const errors = duplicateKeys(json);
    if (errors.length) return { errors, warnings: [] };
  }
  catch (error) { return { errors: [{ path: "$", message: `Cannot read product JSON: ${error instanceof SyntaxError ? error.message : "file missing or unreadable"}. Supply a readable product.json.` }], warnings: [] }; }
  const parsed = productModelSchema.safeParse(raw);
  if (!parsed.success) return checkModel(raw, { catalog, deck: { entries: {}, errors: [] }, fixtures: {} });
  const model = parsed.data;
  const errors: ModelCheckResult["errors"] = [];
  let copyText = "";
  let fixtures: unknown;
  for (const [kind, file] of Object.entries(model.files)) {
    if (isAbsolute(file)) { errors.push({ path: `$.files.${kind}`, message: "Use a portable path relative to product.json (or docs/ from the project root)." }); continue; }
    try {
      const text = await readFile(companionPath(modelPath, file), "utf8");
      if (kind === "copy") copyText = text; else fixtures = JSON.parse(text);
    } catch (error) { errors.push({ path: `$.files.${kind}`, message: `Cannot ${error instanceof SyntaxError ? "parse fixture JSON" : "read companion file"} ${JSON.stringify(file)}; supply a readable ${kind === "copy" ? "keyed markdown deck" : "JSON fixtures file"}.` }); }
  }
  if (errors.length) return { model, errors, warnings: [] };
  if (options.writeShownWhen) {
    const updated = writeShownWhen(copyText, model);
    const result = checkModel(raw, { catalog, deck: readCopyDeck(updated), fixtures });
    if (result.errors.length) return result;
    if (updated !== copyText) {
      try { await writeFile(companionPath(modelPath, model.files.copy), updated); }
      catch { return { model, errors: [{ path: "$.files.copy", message: "Cannot update the copy deck; make the companion file writable." }], warnings: result.warnings }; }
    }
    return result;
  }
  return checkModel(raw, { catalog, deck: readCopyDeck(copyText), fixtures });
}
