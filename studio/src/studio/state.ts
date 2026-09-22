import { useCallback, useEffect, useMemo, useState } from "react";
import { STEPS, resolveChoices } from "@/tree/steps";
import type { Choices, ResolvedChoices, Step, StepId } from "@/tree/types";
import { resolveTokens, type Resolved } from "@/tokens/resolve";

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
}

export function useStudio(): Studio {
  const [state, setState] = useState<StudioState>(parseHash);
  const [preview, setPreview] = useState<Preview | null>(null);
  const [pins, setPins] = useState<{ a: Choices | null; b: Choices | null }>({ a: null, b: null });
  const [compare, setCompare] = useState<"a" | "b" | null>(null);

  useEffect(() => writeHash(state), [state]);
  useEffect(() => {
    const onHash = () => setState(parseHash());
    window.addEventListener("hashchange", onHash);
    return () => window.removeEventListener("hashchange", onHash);
  }, []);

  const choose = useCallback((step: StepId, option: string) => {
    setState((s) => ({ ...s, choices: { ...s.choices, [step]: option } }));
  }, []);
  const go = useCallback((step: number) => setState((s) => ({ ...s, step: Math.min(Math.max(step, 0), STEPS.length - 1) })), []);
  const setMode = useCallback((mode: Mode) => setState((s) => ({ ...s, mode })), []);
  const reset = useCallback(() => setState((s) => ({ ...s, choices: { reference: s.choices.reference } })), []);

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
  };
}
