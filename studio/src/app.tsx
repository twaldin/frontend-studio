import { useEffect, useMemo, useRef, useState, type CSSProperties, type ReactNode } from "react";
import { useStudio, type Mode, type Studio } from "./studio/state";
import { Stepper } from "./studio/Stepper";
import { ExportPanel } from "./studio/Export";
import { CopyPanel } from "./studio/CopyPanel";
import { applyCopy, mergeContent } from "./content/copy";
import { CONTENT_BY_ARCHETYPE } from "./content/default";
import { useContent } from "./content/load";
import { GalleryContext, type GalleryEnv } from "./gallery/context";
import { AppGallery, ShellScene } from "./gallery/app";
import { LandingGallery, LandingHero, LANDING_SPECIMENS, scrollTargetId } from "./gallery/landing";
import { SPECIMENS } from "./gallery/specimens";
import { optionsFor } from "./tree/steps";
import type { Archetype, StepId } from "./tree/types";
import type { Resolved } from "./tokens/resolve";

function GalleryRoot({ tokens, env, children, className = "" }: { tokens: Resolved; env: GalleryEnv; children: ReactNode; className?: string }) {
  const vars = useMemo(
    () => ({ ...tokens.shared, ...(env.mode === "dark" ? tokens.dark : tokens.light) }) as CSSProperties,
    [tokens, env.mode],
  );
  return (
    <GalleryContext.Provider value={env}>
      <div
        className={`gallery ${env.mode === "dark" ? "dark" : ""} ${className}`}
        style={vars}
        data-shell={env.choices.shell}
        data-tables={env.choices.tables}
        data-buttons={env.choices.buttons}
        data-motion={env.choices.motion}
        data-register={env.choices.register}
        data-look={env.choices.look}
      >
        {children}
      </div>
    </GalleryContext.Provider>
  );
}

/** The landing's theme follows its register, not the app's mode. */
function landingMode(register: string, mode: Mode): "light" | "dark" {
  if (register === "dark") return "dark";
  if (register === "editorial" || register === "playful") return "light";
  return mode === "dark" ? "dark" : "light";
}

function Caption({ children }: { children: ReactNode }) {
  return <div className="mb-2 text-[11px] font-medium text-[var(--studio-muted)]">{children}</div>;
}

type Panel = "gallery" | "copy" | "export";

function TopBar({ studio, panel, setPanel }: { studio: Studio; panel: Panel; setPanel: (p: Panel) => void }) {
  const modes: Mode[] = ["light", "dark", "both"];
  const btn = (active: boolean) =>
    `rounded px-2 py-0.5 text-[12px] ${active ? "bg-[var(--studio-line)] text-[var(--studio-fg)]" : "text-[var(--studio-muted)] hover:text-[var(--studio-fg)]"}`;
  return (
    <header className="flex h-10 shrink-0 items-center gap-1 border-b border-[var(--studio-line)] bg-[var(--studio-panel)] px-3">
      <span className="mr-3 text-[13px] font-medium">Frontend studio</span>
      {studio.step.gallery === "app" ? (
        <span className="flex items-center gap-0.5 rounded border border-[var(--studio-line)] p-0.5">
          {modes.map((m) => (
            <button key={m} className={btn(studio.state.mode === m)} onClick={() => studio.setMode(m)}>
              {m === "both" ? "Both" : m === "dark" ? "Dark" : "Light"}
            </button>
          ))}
        </span>
      ) : (
        <span className="text-[12px] text-[var(--studio-muted)]">Landing · {studio.resolved.register} register</span>
      )}
      <span className="ml-3 flex items-center gap-0.5 rounded border border-[var(--studio-line)] p-0.5">
        <button className={btn(false)} onClick={() => studio.pin("a")} title="Pin current choices as A">
          Pin A{studio.pins.a ? " ●" : ""}
        </button>
        <button className={btn(false)} onClick={() => studio.pin("b")} title="Pin current choices as B">
          Pin B{studio.pins.b ? " ●" : ""}
        </button>
        <button
          className={btn(studio.compare !== null)}
          disabled={!studio.pins.a && !studio.pins.b}
          onMouseDown={() => studio.setCompare(studio.pins.a ? "a" : "b")}
          onMouseUp={() => studio.setCompare(null)}
          onMouseLeave={() => studio.setCompare(null)}
          title="Hold to show pin A (or B)"
        >
          Hold to compare
        </button>
      </span>
      <span className="ml-auto flex items-center gap-1">
        <button className={btn(panel === "gallery")} onClick={() => setPanel("gallery")}>
          Gallery
        </button>
        <button className={btn(panel === "export")} onClick={() => setPanel("export")}>
          Export
        </button>
        <button className={btn(panel === "copy")} onClick={() => setPanel(panel === "copy" ? "gallery" : "copy")} title="Edit every string of the content">
          Copy
        </button>
        <button className={btn(false)} onClick={studio.reset} title="Drop every deviation">
          Reset
        </button>
      </span>
    </header>
  );
}

/** Steps that set the defaults show the whole product: the app shell and the landing's first screen. */
const PRODUCT_STEPS: Partial<Record<StepId, true>> = { archetype: true, reference: true, look: true };

/** One theme's view of an app step: the step's specimen, then the shell as context. */
function AppView({ studio, env }: { studio: Studio; env: GalleryEnv }) {
  const step = studio.step.id;
  const Specimen = SPECIMENS[step];
  if (PRODUCT_STEPS[step]) {
    return (
      <div className="flex flex-col gap-6">
        <div>
          <Caption>App shell</Caption>
          <div className="overflow-hidden rounded-lg border border-border">
            <ShellScene />
          </div>
        </div>
        <div>
          <Caption>Landing, first screen</Caption>
          <div className="overflow-hidden rounded-lg border border-border">
            <LandingHero />
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className="flex flex-col gap-6">
      {Specimen ? (
        <div>
          <Caption>Specimen</Caption>
          <Specimen />
        </div>
      ) : null}
      <div>
        <Caption>In context</Caption>
        <AppGallery />
      </div>
    </div>
  );
  void env;
}

export function App() {
  // `?capture`: the gallery alone, in document flow, for scripts/capture.ts. Never writes the state file.
  const capture = useMemo(() => new URLSearchParams(location.search).has("capture"), []);
  const { project, source } = useContent();
  const studio = useStudio({ persist: !capture, contentSource: source });
  // The archetype's sample content, with the project's copy deck over it.
  const loaded = useMemo(() => mergeContent(CONTENT_BY_ARCHETYPE[studio.resolved.archetype as Archetype], project), [studio.resolved.archetype, project]);
  const content = useMemo(() => applyCopy(loaded, studio.record.copy), [loaded, studio.record.copy]);
  const [panel, setPanel] = useState<Panel>("gallery");
  const mainRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (capture) return;
    const onKey = (e: KeyboardEvent) => {
      if ((e.target as HTMLElement | null)?.closest("input, textarea, [contenteditable]")) return;
      const k = e.key;
      if (/^[1-9]$/.test(k)) {
        const o = optionsFor(studio.step, studio.resolved)[Number(k) - 1];
        if (o) studio.choose(studio.step.id, o.id);
      } else if (k === "ArrowRight" || k === "Enter") studio.go(studio.state.step + 1);
      else if (k === "ArrowLeft") studio.go(studio.state.step - 1);
      else if (k === "l") studio.setMode("light");
      else if (k === "d") studio.setMode("dark");
      else if (k === "b") studio.setMode("both");
      else if (k === "a") studio.pin("a");
      else if (k === "B") studio.pin("b");
      else if (k === "\\") studio.setCompare(studio.compare ? null : studio.pins.a ? "a" : studio.pins.b ? "b" : null);
      else if (k === "e") setPanel((p) => (p === "export" ? "gallery" : "export"));
      else if (k === "r") studio.reset();
      else return;
      e.preventDefault();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [studio, capture]);

  // Landing steps scroll the gallery to the part being decided.
  const stepId = studio.step.id;
  useEffect(() => {
    if (panel === "export" || studio.step.gallery !== "landing") return;
    // A step with its own specimen shows that first; otherwise jump to the landing part being decided.
    const id = LANDING_SPECIMENS[stepId] ? null : scrollTargetId(stepId);
    const el = id ? mainRef.current?.querySelector(`#${id}`) : null;
    if (el) el.scrollIntoView({ block: "start" });
    else mainRef.current?.scrollTo({ top: 0 });
  }, [stepId, panel, studio.step.gallery]);

  const base: Omit<GalleryEnv, "mode"> = { content, choices: studio.resolved, density: studio.tokens.density };
  const isLanding = studio.step.gallery === "landing";
  // The themes step shows what ships: both side by side, or the one theme.
  const shipsOne = stepId === "themes" && studio.resolved.themes !== "both";
  const both = !shipsOne && (studio.state.mode === "both" || stepId === "themes");
  const single: "light" | "dark" = shipsOne ? (studio.resolved.themes === "dark" ? "dark" : "light") : studio.state.mode === "dark" ? "dark" : "light";
  const LandingSpecimen = LANDING_SPECIMENS[stepId];

  const gallery = isLanding ? (
    <div className="flex flex-col gap-4 p-6">
      {LandingSpecimen ? (
        <div>
          <Caption>Specimen</Caption>
          <GalleryRoot tokens={studio.tokens} env={{ ...base, mode: landingMode(studio.resolved.register, studio.state.mode) }} className="mx-auto w-[1200px] overflow-hidden rounded-lg border border-[var(--studio-line)]">
            <LandingSpecimen />
          </GalleryRoot>
        </div>
      ) : null}
      <div>
        <Caption>Landing</Caption>
        <GalleryRoot tokens={studio.tokens} env={{ ...base, mode: landingMode(studio.resolved.register, studio.state.mode) }} className="mx-auto w-[1200px] overflow-hidden rounded-lg border border-[var(--studio-line)]">
          <LandingGallery fullHeight={capture} />
        </GalleryRoot>
      </div>
    </div>
  ) : both ? (
    <div className="grid grid-cols-2 gap-4 p-4">
      {(["light", "dark"] as const).map((mode) => (
        <GalleryRoot key={mode} tokens={studio.tokens} env={{ ...base, mode }} className="min-w-0 overflow-hidden rounded-lg border border-[var(--studio-line)] p-5 [zoom:0.58]">
          <AppView studio={studio} env={{ ...base, mode }} />
        </GalleryRoot>
      ))}
    </div>
  ) : (
    <div className="p-6">
      <GalleryRoot tokens={studio.tokens} env={{ ...base, mode: single }} className="mx-auto max-w-[1240px] overflow-hidden rounded-lg border border-[var(--studio-line)] p-6">
        <AppView studio={studio} env={{ ...base, mode: single }} />
      </GalleryRoot>
    </div>
  );

  if (capture) return <div className="w-max min-w-full bg-[var(--studio-bg)]">{gallery}</div>;

  return (
    <div className="flex h-full">
      {panel === "copy" ? <CopyPanel studio={studio} content={loaded} /> : <Stepper studio={studio} />}
      <div className="flex min-w-0 flex-1 flex-col">
        <TopBar studio={studio} panel={panel} setPanel={setPanel} />
        <main ref={mainRef} className="min-h-0 flex-1 overflow-auto bg-[var(--studio-bg)]">
          {panel === "export" ? <ExportPanel tokens={studio.tokens} choices={studio.state.choices} record={studio.record} content={loaded} /> : gallery}
        </main>
        <footer className="flex h-6 shrink-0 items-center gap-3 border-t border-[var(--studio-line)] bg-[var(--studio-panel)] px-3 text-[11px] text-[var(--studio-muted)]">
          <span>content: {source}</span>
          <span>·</span>
          <span>
            {studio.persistence === "file" ? "saved to .studio/state.json" : studio.persistence === "off" ? "not saved: no state endpoint, the URL holds the choices" : "loading saved state"}
          </span>
          <span>·</span>
          <span>{studio.preview ? `previewing ${studio.preview.option}` : studio.compare ? `showing pin ${studio.compare.toUpperCase()}` : "committed"}</span>
          <span className="ml-auto truncate font-mono">{location.hash.slice(0, 120)}</span>
        </footer>
      </div>
    </div>
  );
}
