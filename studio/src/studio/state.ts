import { useCallback, useEffect, useMemo, useRef, useState } from "react";
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

/**
 * `persist: false` keeps the state file untouched, e.g. while `bun run capture` drives the studio.
 * `contentSource` is saved with the walk so `bun run export` reads the same content.
 */
export function useStudio({ persist, contentSource }: { persist: boolean; contentSource: string }): Studio {
  const [state, setState] = useState<StudioState>(parseHash);
  // Read once: a link that opened the studio with choices wins over the saved walk.
  const [linkHasChoices] = useState(() => Object.keys(parseHash().choices).length > 0);
  const [record, setRecord] = useState<DecisionRecord>({ notes: {}, status: {}, copy: {} });
  const [persistence, setPersistence] = useState<Persistence>(persist ? "loading" : "off");
  const saving = useRef<Promise<void>>(Promise.resolve());
  // Keys (`notes:accent`, `choices:radius`) changed while the saved walk loads. The file never
  // overrides them, so a note cleared or a step reset before the load stays cleared. null once loaded.
  const touched = useRef<Set<string> | null>(persist ? new Set() : null);
  const [preview, setPreview] = useState<Preview | null>(null);
  const [pins, setPins] = useState<{ a: Choices | null; b: Choices | null }>({ a: null, b: null });
  const [compare, setCompare] = useState<"a" | "b" | null>(null);

  useEffect(() => writeHash(state), [state]);
  useEffect(() => {
    // A hash that only moves the step or mode (`#step=5`) keeps the walk's choices.
    const onHash = () => {
      const next = parseHash();
      const replaces = Object.keys(next.choices).length > 0;
      if (replaces) for (const s of STEPS) touched.current?.add(`choices:${s.id}`);
      setState((s) => (replaces ? next : { ...next, choices: s.choices }));
    };
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);

  // Resume the saved walk, except for whatever was changed while it loaded.
  useEffect(() => {
    if (!persist) return;
    let cancelled = false;
    const load = async () => {
      try {
        const r = await fetch(STATE_ROUTE, { cache: "no-store" });
        if (!r.ok || !r.headers.get("content-type")?.includes("json")) throw new Error("no state endpoint");
        const saved = parseSaved(await r.json());
        if (cancelled) return;
        const local = touched.current ?? new Set<string>();
        touched.current = null;
        const untouched = <V,>(kind: string, map: Partial<Record<string, V>>) =>
          Object.fromEntries(Object.entries(map).filter(([key]) => !local.has(`${kind}:${key}`))) as Partial<Record<string, V>>;
        setRecord((r) => ({
          notes: { ...untouched("notes", saved.notes), ...r.notes },
          status: { ...untouched("status", saved.status), ...r.status },
          copy: { ...(untouched("copy", saved.copy) as Record<string, string>), ...r.copy },
        }));
        if (!linkHasChoices) setState((s) => ({ ...s, choices: { ...untouched("choices", saved.choices), ...s.choices } }));
        setPersistence("file");
      } catch {
        if (cancelled) return;
        touched.current = null;
        setPersistence("off");
      }
    };
    void load();
    return () => {
      cancelled = true;
    };
  }, [persist, linkHasChoices]);

  // Saves go out one at a time, in order, so an older snapshot never lands after a newer one.
  useEffect(() => {
    if (persistence !== "file") return;
    const timer = setTimeout(() => {
      const body: SavedState = { choices: state.choices, ...record, contentSource, savedAt: new Date().toISOString() };
      saving.current = saving.current.then(() =>
        fetch(STATE_ROUTE, { method: "PUT", headers: { "content-type": "application/json" }, body: JSON.stringify(body) })
          .then((r) => {
            if (!r.ok) setPersistence("off");
          })
          .catch(() => setPersistence("off")),
      );
    }, 300);
    return () => clearTimeout(timer);
  }, [persistence, state.choices, record, contentSource]);

  const choose = useCallback((step: StepId, option: string) => {
    touched.current?.add(`choices:${step}`);
    setState((s) => ({ ...s, choices: { ...s.choices, [step]: option } }));
  }, []);
  const go = useCallback((step: number) => setState((s) => ({ ...s, step: Math.min(Math.max(step, 0), STEPS.length - 1) })), []);
  const setMode = useCallback((mode: Mode) => setState((s) => ({ ...s, mode })), []);
  // Reset drops every deviation; the archetype and reference set the defaults, so they stay.
  const reset = useCallback(() => {
    for (const s of STEPS) if (s.id !== "archetype" && s.id !== "reference") touched.current?.add(`choices:${s.id}`);
    setState((s) => {
      const { archetype, reference } = s.choices;
      return { ...s, choices: { ...(archetype && { archetype }), ...(reference && { reference }) } };
    });
  }, []);
  const setNote = useCallback((step: StepId, text: string) => {
    touched.current?.add(`notes:${step}`);
    setRecord((r) => ({ ...r, notes: withKey(r.notes, step, text.trim() ? text : undefined) }));
  }, []);
  const setStatus = useCallback((step: StepId, status: Status | undefined) => {
    touched.current?.add(`status:${step}`);
    setRecord((r) => ({ ...r, status: withKey(r.status, step, status) }));
  }, []);
  const setCopy = useCallback((path: string, text: string | undefined) => {
    touched.current?.add(`copy:${path}`);
    setRecord((r) => ({ ...r, copy: withKey(r.copy, path, text) as Record<string, string> }));
  }, []);

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
