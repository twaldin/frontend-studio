import type { Content } from "./schema";

/** Deep-merges partial project content over the default; arrays replace. */
export function mergeContent<T>(base: T, over: unknown): T {
  if (!over || typeof over !== "object" || Array.isArray(over)) return (over as T) ?? base;
  const out: Record<string, unknown> = { ...(base as Record<string, unknown>) };
  for (const [k, v] of Object.entries(over as Record<string, unknown>)) {
    const b = out[k];
    out[k] = b && typeof b === "object" && !Array.isArray(b) && v && typeof v === "object" && !Array.isArray(v) ? mergeContent(b, v) : v;
  }
  return out as T;
}

/** Keys that hold rendering instructions rather than words. */
const NOT_COPY: Record<string, true> = { kind: true, tone: true };

export interface CopyField {
  /** Dot path into the content, array indices included: `app.nav.0.label`. */
  path: string;
  text: string;
}

/** Every editable string in the content, in document order. */
export function copyFields(value: unknown, prefix = ""): CopyField[] {
  if (typeof value === "string") return prefix ? [{ path: prefix, text: value }] : [];
  if (!value || typeof value !== "object") return [];
  const entries: [string, unknown][] = Array.isArray(value) ? value.map((v, i): [string, unknown] => [String(i), v]) : Object.entries(value);
  return entries.flatMap(([k, v]) => (NOT_COPY[k] ? [] : copyFields(v, prefix ? `${prefix}.${k}` : k)));
}

/** The content with copy edits applied; paths that no longer exist are skipped. */
export function applyCopy(content: Content, edits: Record<string, string>): Content {
  const paths = Object.keys(edits);
  if (paths.length === 0) return content;
  const out = structuredClone(content) as unknown as Record<string, unknown>;
  for (const path of paths) {
    const keys = path.split(".");
    const last = keys.pop()!;
    let node: unknown = out;
    for (const k of keys) node = node && typeof node === "object" ? (node as Record<string, unknown>)[k] : undefined;
    if (node && typeof node === "object" && typeof (node as Record<string, unknown>)[last] === "string") {
      (node as Record<string, unknown>)[last] = edits[path];
    }
  }
  return out as unknown as Content;
}
