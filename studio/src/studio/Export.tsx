import { useMemo, useState } from "react";
import { STEPS, PRESETS, deviations } from "@/tree/steps";
import type { Choices, ResolvedChoices, Step } from "@/tree/types";
import { DENSITY, RADIUS_PX, SPACING_UNIT, themeCss, type Resolved } from "@/tokens/resolve";
import type { Content } from "@/content/schema";
import { applyCopy } from "@/content/copy";
import type { DecisionRecord } from "./saved";

const label = (stepId: string, optionId: string) =>
  STEPS.find((s) => s.id === stepId)?.options.find((o) => o.id === optionId)?.label ?? optionId;

/** The paragraph that goes into the project brief's Design section. */
export function decisionsMarkdown(c: ResolvedChoices, choices: Choices): string {
  const dev = new Set(deviations(choices));
  const d = DENSITY[c.density]!;
  const line = (ids: keyof ResolvedChoices | (keyof ResolvedChoices)[], text: string) => {
    const deviated = (Array.isArray(ids) ? ids : [ids]).some((id) => dev.has(id));
    return `- ${text}${deviated ? "" : ` _(${label("reference", c.reference)}'s default)_`}`;
  };
  return [
    `## Design decisions`,
    ``,
    `Reference: **${label("reference", c.reference)}**. Chosen in the studio; deviations from the reference are unmarked, defaults are marked.`,
    ``,
    `### Base`,
    line(["typeface", "mono"], `Typeface: ${label("typeface", c.typeface)}; mono: ${label("mono", c.mono)}.`),
    line(["neutral", "contrast"], `Neutral: ${label("neutral", c.neutral)}, ${label("contrast", c.contrast).toLowerCase()} contrast.`),
    line("accent", `Accent: ${label("accent", c.accent)}. Status colours are red/amber/green and sit on text only.`),
    line("radius", `Radius: ${RADIUS_PX[c.radius]}px on controls, cards and menus.`),
    line("depth", `Depth: ${label("depth", c.depth).toLowerCase()}.`),
    line("themes", `Themes: ${label("themes", c.themes).toLowerCase()}.`),
    ``,
    `### App`,
    line(["density", "spacing"], `Density: ${label("density", c.density).toLowerCase()} — chrome ${d.chrome}px, body ${d.body}px, controls ${d.control}px, rows ${d.row}px; spacing unit ${label("spacing", c.spacing).toLowerCase()} (${SPACING_UNIT[c.spacing]}).`),
    line(["shell", "sidebarTone", "sidebarCollapse", "navIcons", "pageTitle"], `Shell: ${label("shell", c.shell).toLowerCase()}; sidebar ${label("sidebarTone", c.sidebarTone).toLowerCase()}, ${label("sidebarCollapse", c.sidebarCollapse).toLowerCase()}, ${label("navIcons", c.navIcons).toLowerCase()}; page title ${label("pageTitle", c.pageTitle).toLowerCase()}.`),
    line(["stats", "trend"], `Key figures: ${label("stats", c.stats).toLowerCase()}; over time: ${label("trend", c.trend).toLowerCase()}.`),
    line(["tables", "rowHover"], `Tables: ${label("tables", c.tables).toLowerCase()}; row hover ${label("rowHover", c.rowHover).toLowerCase()}.`),
    line(["cards", "inputs"], `Cards: ${label("cards", c.cards).toLowerCase()}; inputs ${label("inputs", c.inputs).toLowerCase()}.`),
    line(["buttons", "iconWeight", "menus"], `Buttons: ${label("buttons", c.buttons).toLowerCase()}; icons ${label("iconWeight", c.iconWeight).toLowerCase()}; menus ${label("menus", c.menus).toLowerCase()}.`),
    line("motion", `Motion: ${label("motion", c.motion).toLowerCase()}; none on keyboard-initiated or many-times-a-day paths.`),
    ``,
    `### Landing`,
    line(["register", "display", "displayCase"], `Register: ${label("register", c.register).toLowerCase()}; display type ${label("display", c.display).toLowerCase()}, ${label("displayCase", c.displayCase).toLowerCase()}.`),
    line(["hero", "heroMotion", "background"], `Hero: ${label("hero", c.hero).toLowerCase()}, ${label("heroMotion", c.heroMotion).toLowerCase()} motion, ${label("background", c.background).toLowerCase()} background.`),
    line(["rhythm", "frames", "characters"], `Sections: ${label("rhythm", c.rhythm).toLowerCase()}; product shots ${label("frames", c.frames).toLowerCase()}; pieces: ${label("characters", c.characters).toLowerCase()}.`),
    line(["proof", "cta"], `Proof: ${label("proof", c.proof).toLowerCase()}; CTA: ${label("cta", c.cta).toLowerCase()}.`),
    ``,
    `Tokens: \`theme.css\` from the studio export. Components: shadcn/ui on Base UI, themed by those variables.`,
  ].join("\n");
}

export function componentsJson(c: ResolvedChoices): string {
  return JSON.stringify(
    {
      $schema: "https://ui.shadcn.com/schema.json",
      style: "base",
      tailwind: { css: "src/theme.css", baseColor: "neutral", cssVariables: true },
      aliases: { components: "@/components", utils: "@/lib/utils", ui: "@/components/ui" },
      iconLibrary: "lucide",
      note: `Base color is overridden by theme.css (studio reference: ${c.reference}). Radius ${RADIUS_PX[c.radius]}px.`,
    },
    null,
    2,
  );
}

/**
 * The walk's record for the next round: what to revisit, the user's notes
 * (they become acceptance criteria) and how many steps are still open.
 */
export function studioNotesMarkdown(c: ResolvedChoices, record: DecisionRecord): string {
  const decided = STEPS.filter((s) => record.status[s.id] === "decided").length;
  const revisit = STEPS.filter((s) => record.status[s.id] === "revisit").length;
  const item = (s: Step) => {
    const note = record.notes[s.id]?.trim();
    return `- **${STEPS.indexOf(s) + 1}. ${s.question}** Now: ${label(s.id, c[s.id])}.${note ? ` ${note.replace(/\s*\n\s*/g, " ")}` : ""}`;
  };
  const section = (title: string, steps: Step[]) => (steps.length ? [`### ${title}`, ``, ...steps.map(item), ``] : []);
  const edits = Object.keys(record.copy).length;
  return [
    `## Studio notes`,
    ``,
    `${decided} of ${STEPS.length} steps decided, ${revisit} marked revisit, ${STEPS.length - decided - revisit} still open.`,
    ``,
    ...section("Revisit", STEPS.filter((s) => record.status[s.id] === "revisit")),
    ...section("Notes on decided steps", STEPS.filter((s) => record.status[s.id] === "decided" && record.notes[s.id])),
    ...section("Notes on open steps", STEPS.filter((s) => !record.status[s.id] && record.notes[s.id])),
    ...(edits ? [`### Copy`, ``, `${edits} string${edits === 1 ? "" : "s"} edited in the studio; \`content.json\` holds the result.`, ``] : []),
  ].join("\n");
}

/** Clipboard API where it exists (https or localhost); a selection copy elsewhere, e.g. plain http on a LAN. */
async function copyText(text: string): Promise<boolean> {
  if (window.isSecureContext && navigator.clipboard) {
    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch {
      // Fall through to the selection copy.
    }
  }
  const area = document.createElement("textarea");
  area.value = text;
  area.setAttribute("readonly", "");
  area.style.position = "fixed";
  area.style.opacity = "0";
  document.body.append(area);
  area.select();
  const ok = document.execCommand("copy");
  area.remove();
  return ok;
}

function Artifact({ title, text, file }: { title: string; text: string; file: string }) {
  const [copied, setCopied] = useState<"copied" | "failed" | null>(null);
  const download = () => {
    const a = document.createElement("a");
    a.href = URL.createObjectURL(new Blob([text], { type: "text/plain" }));
    a.download = file;
    a.click();
  };
  return (
    <section className="flex min-h-0 flex-1 flex-col gap-2">
      <header className="flex items-center gap-2">
        <h3 className="text-[13px] font-medium">{title}</h3>
        <span className="font-mono text-[11px] text-[var(--studio-muted)]">{file}</span>
        <span className="ml-auto flex gap-1">
          <button
            className="rounded border border-[var(--studio-line)] px-2 py-0.5 text-[11px] hover:bg-[var(--studio-line)]"
            onClick={() =>
              void copyText(text).then((ok) => {
                setCopied(ok ? "copied" : "failed");
                setTimeout(() => setCopied(null), 1600);
              })
            }
          >
            {copied === "copied" ? "Copied" : copied === "failed" ? "Copy failed: use Download" : "Copy"}
          </button>
          <button className="rounded border border-[var(--studio-line)] px-2 py-0.5 text-[11px] hover:bg-[var(--studio-line)]" onClick={download}>
            Download
          </button>
        </span>
      </header>
      <pre className="min-h-0 flex-1 overflow-auto rounded border border-[var(--studio-line)] bg-black/30 p-3 font-mono text-[11px] leading-[1.5] text-[var(--studio-fg)]">
        {text}
      </pre>
    </section>
  );
}

export function ExportPanel({ tokens, choices, record, content }: { tokens: Resolved; choices: Choices; record: DecisionRecord; content: Content }) {
  const css = useMemo(() => themeCss(tokens), [tokens]);
  const md = useMemo(() => decisionsMarkdown(tokens.choices, choices), [tokens, choices]);
  const notes = useMemo(() => studioNotesMarkdown(tokens.choices, record), [tokens, record]);
  const cj = useMemo(() => componentsJson(tokens.choices), [tokens]);
  const copy = useMemo(() => `${JSON.stringify(applyCopy(content, record.copy), null, 2)}\n`, [content, record.copy]);
  const preset = PRESETS[tokens.choices.reference];
  const dev = deviations(choices);
  return (
    <div className="flex h-full flex-col gap-4 p-4">
      <p className="text-[12px] text-[var(--studio-muted)]">
        {dev.length === 0
          ? `Every step at ${preset ? label("reference", tokens.choices.reference) : "reference"}'s default.`
          : `${dev.length} deviation${dev.length > 1 ? "s" : ""} from ${label("reference", tokens.choices.reference)}: ${dev.map((d) => label(d, tokens.choices[d])).join(", ")}.`}
      </p>
      <Artifact title="Design decisions" text={md} file="design-decisions.md" />
      <Artifact title="Notes and status" text={notes} file="studio-notes.md" />
      <Artifact title="Theme" text={css} file="theme.css" />
      <Artifact title="shadcn config" text={cj} file="components.json" />
      <Artifact title="Copy" text={copy} file="content.json" />
    </div>
  );
}
