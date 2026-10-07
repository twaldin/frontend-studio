import { useCallback, useEffect, useMemo, useState } from "react";
import { STEPS, resolveChoices } from "@/tree/steps";
import type { Choices, ResolvedChoices, Step, StepId } from "@/tree/types";
import { resolveTokens, type Resolved } from "@/tokens/resolve";
import { parseSaved, type DecisionRecord, type SavedState, type Status } from "./saved";
import { STATE_ROUTE } from "./route";

export type Mode = "light" | "dark" | "both";

export interface StudioState {
  choices: Choices;
  step: number;
  mode: Mode;
}

const parseHash = (): StudioState => {
  const p = new URLSearchParams(location.hash.slice(1));
  const choices: Choices = {};
  for (const s of STEPS) {
    const v = p.get(s.id);
    if (v && s.options.some((o) => o.id === v)) choices[s.id] = v;
  }
  const step = Math.min(Math.max(Number(p.get("step") ?? 0) || 0, 0), STEPS.length - 1);
  const mode = (p.get("mode") as Mode) || "light";
  return { choices, step, mode: ["light", "dark", "both"].includes(mode) ? mode : "light" };
};

const writeHash = (s: StudioState) => {
  const p = new URLSearchParams();
  for (const [k, v] of Object.entries(s.choices)) if (v) p.set(k, v);
  p.set("step", String(s.step));
  p.set("mode", s.mode);
  history.replaceState(null, "", `#${p.toString()}`);
};

/** A copy of `map` with `key` set, or removed when `value` is undefined. */
function withKey<K extends string, V>(map: Partial<Record<K, V>>, key: K, value: V | undefined): Partial<Record<K, V>> {
  const next = { ...map };
  if (value === undefined) delete next[key];
  else next[key] = value;
  return next;
}

/**
 * `file`: the dev server saves every change to `.studio/state.json`.
 * `off`: no state endpoint (a static build); choices live in the URL only.
 */
export type Persistence = "loading" | "file" | "off";

export interface Preview {
  step: StepId;
  option: string;
}

export interface Studio {
  state: StudioState;
  step: Step;
  resolved: ResolvedChoices;
  tokens: Resolved;
  shown: Choices;
  preview: Preview | null;
  setPreview: (p: Preview | null) => void;
  choose: (step: StepId, option: string) => void;
  go: (step: number) => void;
  setMode: (mode: Mode) => void;
  reset: () => void;
  pins: { a: Choices | null; b: Choices | null };
  pin: (slot: "a" | "b") => void;
  compare: "a" | "b" | null;
  setCompare: (c: "a" | "b" | null) => void;
  record: DecisionRecord;
  setNote: (step: StepId, text: string) => void;
  setStatus: (step: StepId, status: Status | undefined) => void;
  setCopy: (path: string, text: string | undefined) => void;
  persistence: Persistence;
}

/** `persist: false` keeps the state file untouched, e.g. while `bun run capture` drives the studio. */
export function useStudio({ persist }: { persist: boolean }): Studio {
  const [state, setState] = useState<StudioState>(parseHash);
  const [record, setRecord] = useState<DecisionRecord>({ notes: {}, status: {}, copy: {} });
  const [persistence, setPersistence] = useState<Persistence>(persist ? "loading" : "off");
  const [preview, setPreview] = useState<Preview | null>(null);
  const [pins, setPins] = useState<{ a: Choices | null; b: Choices | null }>({ a: null, b: null });
  const [compare, setCompare] = useState<"a" | "b" | null>(null);

  useEffect(() => writeHash(state), [state]);
  useEffect(() => {
    // A hash that only moves the step or mode (`#step=5`) keeps the walk's choices.
    const onHash = () =>
      setState((s) => {
        const next = parseHash();
        return Object.keys(next.choices).length ? next : { ...next, choices: s.choices };
      });
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);

  // Resume the saved walk. A link whose hash carries choices wins over the file.
  useEffect(() => {
    if (!persist) return;
    let cancelled = false;
    const load = async () => {
      try {
        const r = await fetch(STATE_ROUTE, { cache: "no-store" });
        if (!r.ok || !r.headers.get("content-type")?.includes("json")) throw new Error("no state endpoint");
        const saved = parseSaved(await r.json());
        if (cancelled) return;
        setRecord({ notes: saved.notes, status: saved.status, copy: saved.copy });
        if (Object.keys(parseHash().choices).length === 0) setState((s) => ({ ...s, choices: saved.choices }));
        setPersistence("file");
      } catch {
        if (!cancelled) setPersistence("off");
      }
    };
    void load();
    return () => {
      cancelled = true;
    };
  }, [persist]);

  useEffect(() => {
    if (persistence !== "file") return;
    const timer = setTimeout(() => {
      const body: SavedState = { choices: state.choices, ...record, savedAt: new Date().toISOString() };
      fetch(STATE_ROUTE, { method: "PUT", headers: { "content-type": "application/json" }, body: JSON.stringify(body) })
        .then((r) => {
          if (!r.ok) setPersistence("off");
        })
        .catch(() => setPersistence("off"));
    }, 300);
    return () => clearTimeout(timer);
  }, [persistence, state.choices, record]);

  const choose = useCallback((step: StepId, option: string) => {
    setState((s) => ({ ...s, choices: { ...s.choices, [step]: option } }));
  }, []);
  const go = useCallback((step: number) => setState((s) => ({ ...s, step: Math.min(Math.max(step, 0), STEPS.length - 1) })), []);
  const setMode = useCallback((mode: Mode) => setState((s) => ({ ...s, mode })), []);
  const reset = useCallback(() => setState((s) => ({ ...s, choices: { reference: s.choices.reference } })), []);
  const setNote = useCallback(
    (step: StepId, text: string) => setRecord((r) => ({ ...r, notes: withKey(r.notes, step, text.trim() ? text : undefined) })),
    [],
  );
  const setStatus = useCallback(
    (step: StepId, status: Status | undefined) => setRecord((r) => ({ ...r, status: withKey(r.status, step, status) })),
    [],
  );
  const setCopy = useCallback(
    (path: string, text: string | undefined) => setRecord((r) => ({ ...r, copy: withKey(r.copy, path, text) as Record<string, string> })),
    [],
  );

  /** Choices actually rendered: pinned comparison, else hover preview over the committed state. */
  const shown: Choices = useMemo(() => {
    if (compare === "a" && pins.a) return pins.a;
    if (compare === "b" && pins.b) return pins.b;
    return preview ? { ...state.choices, [preview.step]: preview.option } : state.choices;
  }, [state.choices, preview, pins, compare]);

  const resolved = useMemo(() => resolveChoices(shown), [shown]);
  const tokens = useMemo(() => resolveTokens(resolved), [resolved]);

  const pin = useCallback((slot: "a" | "b") => setPins((p) => ({ ...p, [slot]: { ...state.choices } })), [state.choices]);

  return {
    state,
    step: STEPS[state.step]!,
    resolved,
    tokens,
    shown,
    preview,
    setPreview,
    choose,
    go,
    setMode,
    reset,
    pins,
    pin,
    compare,
    setCompare,
    record,
    setNote,
    setStatus,
    setCopy,
    persistence,
  };
}
