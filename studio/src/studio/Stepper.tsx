import { STEPS, LOOK_DEFAULTS, PRESETS, defaultsFor, deviations, optionsFor } from "@/tree/steps";
import type { Branch, Step, StepId } from "@/tree/types";
import type { Studio } from "./state";
import type { Status } from "./saved";

const BRANCH_LABEL: Record<Branch, string> = { product: "Product", frame: "Frame", tokens: "Tokens", components: "Components", landing: "Landing" };
const BRANCHES: readonly Branch[] = ["product", "frame", "tokens", "components", "landing"];
const STATUS_MARK: Record<Status, string> = { decided: "✓", revisit: "↻" };

function StepRow({ s, i, studio, deviated }: { s: Step; i: number; studio: Studio; deviated: boolean }) {
  const active = studio.state.step === i;
  const chosen = studio.resolved[s.id];
  const label = s.options.find((o) => o.id === chosen)?.label ?? chosen;
  const status = studio.record.status[s.id];
  return (
    <button
      onClick={() => studio.go(i)}
      className={`flex w-full items-center gap-2 rounded px-2 py-1 text-left text-[12px] ${
        active ? "bg-[var(--studio-line)] text-[var(--studio-fg)]" : "text-[var(--studio-muted)] hover:text-[var(--studio-fg)]"
      }`}
    >
      <span className="w-4 text-right tabular-nums opacity-60">{i + 1}</span>
      <span className="flex-1 truncate">{s.question.replace(/\?$/, "")}</span>
      {studio.record.notes[s.id] ? <span title="Has a note" className="text-[10px] opacity-70">✎</span> : null}
      {status ? (
        <span title={status === "decided" ? "Decided" : "Revisit"} className={status === "revisit" ? "text-amber-400" : "text-[var(--studio-accent)]"}>
          {STATUS_MARK[status]}
        </span>
      ) : null}
      <span className={`truncate text-[11px] ${deviated ? "text-[var(--studio-accent)]" : "opacity-70"}`}>{label}</span>
    </button>
  );
}

/** Open, decided or revisit, plus the user's own words: what the options can't say. */
function StepRecord({ step, studio }: { step: Step; studio: Studio }) {
  const status = studio.record.status[step.id];
  const statuses: { value: Status | undefined; label: string }[] = [
    { value: undefined, label: "Open" },
    { value: "decided", label: "Decided" },
    { value: "revisit", label: "Revisit" },
  ];
  return (
    <div className="mt-3 flex flex-col gap-2">
      <div role="radiogroup" aria-label="Status" className="flex items-center gap-0.5 self-start rounded border border-[var(--studio-line)] p-0.5">
        {statuses.map((s) => (
          <button
            key={s.label}
            role="radio"
            aria-checked={status === s.value}
            onClick={() => studio.setStatus(step.id, s.value)}
            className={`rounded px-2 py-0.5 text-[12px] ${
              status === s.value ? "bg-[var(--studio-line)] text-[var(--studio-fg)]" : "text-[var(--studio-muted)] hover:text-[var(--studio-fg)]"
            }`}
          >
            {s.label}
          </button>
        ))}
      </div>
      <textarea
        aria-label="Note"
        value={studio.record.notes[step.id] ?? ""}
        onChange={(e) => studio.setNote(step.id, e.target.value)}
        placeholder="Note: what you'd change, what no option shows, what you're unsure of"
        rows={3}
        className="w-full resize-y rounded-md border border-[var(--studio-line)] bg-transparent px-2.5 py-2 text-[12px] leading-[1.45] text-[var(--studio-fg)] placeholder:text-[var(--studio-muted)] focus:border-[var(--studio-muted)] focus:outline-none"
      />
    </div>
  );
}

export function Stepper({ studio }: { studio: Studio }) {
  const step = studio.step;
  // Committed choices, not the hover preview: the list must not reorder under the pointer.
  const defaults = defaultsFor(studio.state.choices);
  const label = (id: StepId, option: string) => STEPS.find((s) => s.id === id)?.options.find((o) => o.id === option)?.label ?? option;
  const refLabel = label("reference", defaults.reference);
  // A look picked over the reference's own supplies some defaults; the badge names whichever applies.
  const look = studio.state.choices.look ?? defaults.look;
  const lookDefaults = look !== defaults.look ? LOOK_DEFAULTS[look] : undefined;
  const defaultLabel = lookDefaults?.[step.id] !== undefined ? `${label("look", look)} look` : refLabel;
  const dev = new Set(deviations(studio.state.choices));
  const setsDefaults = step.id === "archetype" || step.id === "reference";

  return (
    <aside className="flex h-full w-[340px] shrink-0 flex-col border-r border-[var(--studio-line)] bg-[var(--studio-panel)]">
      {/* Current decision */}
      <div className="max-h-[65%] min-h-0 shrink-0 overflow-y-auto border-b border-[var(--studio-line)] p-4">
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
          {optionsFor(step, defaults).map((o, i) => {
            const chosen = studio.resolved[step.id] === o.id;
            const isDefault = !setsDefaults && defaults[step.id] === o.id;
            const fits = step.id === "reference" && PRESETS[o.id]?.archetype === defaults.archetype;
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
                      {isDefault ? <span className="rounded bg-[var(--studio-line)] px-1 text-[10px] text-[var(--studio-muted)]">{defaultLabel}</span> : null}
                      {fits ? <span className="rounded bg-[var(--studio-line)] px-1 text-[10px] text-[var(--studio-muted)]">fits {label("archetype", defaults.archetype).toLowerCase()}</span> : null}
                    </span>
                    {o.note ? <span className="text-[11px] leading-[1.4] text-[var(--studio-muted)]">{o.note}</span> : null}
                  </span>
                </button>
              </li>
            );
          })}
        </ol>
        <StepRecord step={step} studio={studio} />
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
            {studio.state.choices[step.id] !== undefined || setsDefaults ? "Next →" : `Keep ${defaultLabel}'s →`}
          </button>
          <span className="ml-auto text-[11px] text-[var(--studio-muted)]">
            {dev.size} deviation{dev.size === 1 ? "" : "s"}
          </span>
        </div>
      </div>

      {/* The whole tree */}
      <nav className="min-h-0 flex-1 overflow-y-auto p-2">
        {BRANCHES.map((b) => (
          <div key={b} className="mb-2">
            <div className="px-2 py-1 text-[11px] font-medium text-[var(--studio-muted)]">{BRANCH_LABEL[b]}</div>
            {STEPS.map((s, i) => (s.branch === b ? <StepRow key={s.id} s={s} i={i} studio={studio} deviated={dev.has(s.id)} /> : null))}
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
