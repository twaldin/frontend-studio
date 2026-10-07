import { STEPS } from "@/tree/steps";
import type { Choices, StepId } from "@/tree/types";

/** How settled a step is. Unset means open: not reached yet, or not judged. */
export type Status = "decided" | "revisit";

/**
 * What the user said beyond the picks: a note and a status per step, and copy
 * edits keyed by content path (`app.page.title`).
 */
export interface DecisionRecord {
  notes: Partial<Record<StepId, string>>;
  status: Partial<Record<StepId, Status>>;
  copy: Record<string, string>;
}

/** `.studio/state.json`: the walk so far. The agent and `bun run export` read it. */
export interface SavedState extends DecisionRecord {
  choices: Choices;
  savedAt?: string;
}

const STEP_IDS: Record<string, true> = Object.fromEntries(STEPS.map((s) => [s.id, true]));
const isObject = (v: unknown): v is Record<string, unknown> => !!v && typeof v === "object" && !Array.isArray(v);

/** Reads a saved state, dropping unknown steps, unknown options and malformed values. */
export function parseSaved(raw: unknown): SavedState {
  const src = isObject(raw) ? raw : {};
  const choices: Choices = {};
  const notes: DecisionRecord["notes"] = {};
  const status: DecisionRecord["status"] = {};
  const copy: Record<string, string> = {};
  if (isObject(src.choices)) {
    for (const s of STEPS) {
      const v = src.choices[s.id];
      if (typeof v === "string" && s.options.some((o) => o.id === v)) choices[s.id] = v;
    }
  }
  if (isObject(src.notes)) {
    for (const [k, v] of Object.entries(src.notes)) if (STEP_IDS[k] && typeof v === "string" && v.trim()) notes[k as StepId] = v;
  }
  if (isObject(src.status)) {
    for (const [k, v] of Object.entries(src.status)) if (STEP_IDS[k] && (v === "decided" || v === "revisit")) status[k as StepId] = v;
  }
  if (isObject(src.copy)) {
    for (const [k, v] of Object.entries(src.copy)) if (typeof v === "string") copy[k] = v;
  }
  return { choices, notes, status, copy, ...(typeof src.savedAt === "string" ? { savedAt: src.savedAt } : {}) };
}
