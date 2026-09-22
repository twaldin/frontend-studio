import { STEPS, PRESETS, deviations } from "@/tree/steps";
import type { Branch, Step } from "@/tree/types";
import type { Studio } from "./state";

const BRANCH_LABEL: Record<Branch, string> = { base: "Base", app: "App", landing: "Landing" };

function StepRow({ s, i, studio }: { s: Step; i: number; studio: Studio }) {
  const active = studio.state.step === i;
  const chosen = studio.resolved[s.id];
  const preset = PRESETS[studio.resolved.reference]?.[s.id];
  const deviated = s.id !== "reference" && studio.state.choices[s.id] !== undefined && studio.state.choices[s.id] !== preset;
  const label = s.options.find((o) => o.id === chosen)?.label ?? chosen;
  return (
    <button
      onClick={() => studio.go(i)}
      className={`flex w-full items-center gap-2 rounded px-2 py-1 text-left text-[12px] ${
        active ? "bg-[var(--studio-line)] text-[var(--studio-fg)]" : "text-[var(--studio-muted)] hover:text-[var(--studio-fg)]"
      }`}
    >
      <span className="w-4 text-right tabular-nums opacity-60">{i + 1}</span>
      <span className="flex-1 truncate">{s.question.replace(/\?$/, "")}</span>
      <span className={`truncate text-[11px] ${deviated ? "text-[var(--studio-accent)]" : "opacity-70"}`}>{label}</span>
    </button>
  );
}

export function Stepper({ studio }: { studio: Studio }) {
  const step = studio.step;
  const preset = PRESETS[studio.resolved.reference];
  const refLabel = STEPS[0]!.options.find((o) => o.id === studio.resolved.reference)?.label ?? "reference";
  const branches: Branch[] = ["base", "app", "landing"];
  const dev = deviations(studio.state.choices);

  return (
    <aside className="flex h-full w-[340px] shrink-0 flex-col border-r border-[var(--studio-line)] bg-[var(--studio-panel)]">
      {/* Current decision */}
      <div className="border-b border-[var(--studio-line)] p-4">
        <div className="mb-1 flex items-center gap-2 text-[11px] text-[var(--studio-muted)]">
          <span>{BRANCH_LABEL[step.branch]}</span>
          <span>·</span>
          <span>
            {studio.state.step + 1} of {STEPS.length}
          </span>
        </div>
        <h2 className="text-[15px] font-medium">{step.question}</h2>
        <p className="mt-1 text-[12px] leading-[1.45] text-[var(--studio-muted)]">{step.why}</p>
        <ol className="mt-3 flex flex-col gap-1">
          {step.options.map((o, i) => {
            const chosen = studio.resolved[step.id] === o.id;
            const isDefault = step.id !== "reference" && preset?.[step.id] === o.id;
            return (
              <li key={o.id}>
                <button
                  onMouseEnter={() => studio.setPreview({ step: step.id, option: o.id })}
                  onMouseLeave={() => studio.setPreview(null)}
                  onClick={() => studio.choose(step.id, o.id)}
                  className={`flex w-full items-start gap-2 rounded-md border px-2.5 py-2 text-left transition-colors ${
                    chosen
                      ? "border-[var(--studio-accent)] bg-[color-mix(in_oklab,var(--studio-accent)_12%,transparent)]"
                      : "border-[var(--studio-line)] hover:border-[var(--studio-muted)]"
                  }`}
                >
                  <kbd className="mt-0.5 w-3 shrink-0 text-[10px] text-[var(--studio-muted)]">{i + 1}</kbd>
                  <span className="flex min-w-0 flex-1 flex-col">
                    <span className="flex items-center gap-2 text-[13px]">
                      {o.label}
                      {isDefault ? <span className="rounded bg-[var(--studio-line)] px-1 text-[10px] text-[var(--studio-muted)]">{refLabel}</span> : null}
                    </span>
                    {o.note ? <span className="text-[11px] leading-[1.4] text-[var(--studio-muted)]">{o.note}</span> : null}
                  </span>
                </button>
              </li>
            );
          })}
        </ol>
        <div className="mt-3 flex items-center gap-2">
          <button
            className="rounded border border-[var(--studio-line)] px-2 py-1 text-[12px] hover:bg-[var(--studio-line)] disabled:opacity-40"
            disabled={studio.state.step === 0}
            onClick={() => studio.go(studio.state.step - 1)}
          >
            ← Back
          </button>
          <button
            className="rounded bg-[var(--studio-accent)] px-2.5 py-1 text-[12px] font-medium text-white hover:brightness-110 disabled:opacity-40"
            disabled={studio.state.step === STEPS.length - 1}
            onClick={() => studio.go(studio.state.step + 1)}
          >
            {studio.state.choices[step.id] !== undefined || step.id === "reference" ? "Next →" : `Keep ${refLabel}'s →`}
          </button>
          <span className="ml-auto text-[11px] text-[var(--studio-muted)]">
            {dev.length} deviation{dev.length === 1 ? "" : "s"}
          </span>
        </div>
      </div>

      {/* The whole tree */}
      <nav className="min-h-0 flex-1 overflow-y-auto p-2">
        {branches.map((b) => (
          <div key={b} className="mb-2">
            <div className="px-2 py-1 text-[11px] font-medium text-[var(--studio-muted)]">{BRANCH_LABEL[b]}</div>
            {STEPS.map((s, i) => (s.branch === b ? <StepRow key={s.id} s={s} i={i} studio={studio} /> : null))}
          </div>
        ))}
      </nav>

      <div className="border-t border-[var(--studio-line)] p-3 text-[11px] leading-[1.6] text-[var(--studio-muted)]">
        <div>
          <kbd>1–9</kbd> pick · <kbd>←</kbd> <kbd>→</kbd> step · <kbd>L</kbd> <kbd>D</kbd> <kbd>B</kbd> theme
        </div>
        <div>
          <kbd>A</kbd> <kbd>B</kbd> pin · <kbd>\</kbd> compare · <kbd>E</kbd> export · <kbd>R</kbd> reset
        </div>
      </div>
    </aside>
  );
}
