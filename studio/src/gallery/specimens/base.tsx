import { useLayoutEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";
import * as radix from "@radix-ui/colors";
import { ChevronRight } from "lucide-react";
import { useGallery } from "@/gallery/context";
import { Button, Checkbox, Input, Select, Switch, Tabs, cn } from "@/ui";
import { RADIUS_PX } from "@/tokens/resolve";
import { CellValue, SpecimenFrame, StateLabel, SurfaceStack, iconStroke } from "./shared";

const NEUTRAL_NAMES: Record<string, string> = { cool: "slate", neutral: "gray", warm: "sand", tinted: "mauve" };
const NEUTRAL_ROLES = [
  "App bg",
  "Subtle bg",
  "UI bg",
  "Hover",
  "Active",
  "Border",
  "Strong border",
  "Solid",
  "Solid",
  "Hover",
  "Text",
  "High-contrast",
] as const;

type Scale = Record<string, string>;

function useGalleryColors(names: readonly string[], dependency: unknown) {
  const rootRef = useRef<HTMLDivElement>(null);
  const [colors, setColors] = useState<Record<string, string>>({});

  useLayoutEffect(() => {
    const gallery = rootRef.current?.closest(".gallery");
    if (!gallery) return;
    const style = getComputedStyle(gallery);
    setColors(Object.fromEntries(names.map((name) => [name, style.getPropertyValue(name).trim()])));
  }, [dependency, names.join("|")]);

  return { rootRef, colors };
}

/** `#rgb`, `#rrggbb` or `#rrggbbaa` → channels plus alpha in 0–1. */
function parseHex(value: string): [number, number, number, number] | null {
  const hex = value.trim();
  if (!/^#[0-9a-f]{3}([0-9a-f]{3}([0-9a-f]{2})?)?$/i.test(hex)) return null;
  const full = hex.length === 4 ? hex.slice(1).split("").map((part) => part + part).join("") : hex.slice(1);
  const channel = (i: number) => Number.parseInt(full.slice(i, i + 2), 16);
  return [channel(0), channel(2), channel(4), full.length === 8 ? channel(6) / 255 : 1];
}

/** A translucent color laid over an opaque one. */
function composite(over: string, under: string): [number, number, number] | null {
  const o = parseHex(over);
  const u = parseHex(under);
  if (!o || !u) return null;
  const a = o[3];
  return [o[0] * a + u[0] * (1 - a), o[1] * a + u[1] * (1 - a), o[2] * a + u[2] * (1 - a)];
}

function luminanceOf(rgb: [number, number, number]): number {
  const linear = rgb.map((channel) => {
    const normalized = channel / 255;
    return normalized <= 0.04045 ? normalized / 12.92 : ((normalized + 0.055) / 1.055) ** 2.4;
  });
  return linear[0]! * 0.2126 + linear[1]! * 0.7152 + linear[2]! * 0.0722;
}

/** Contrast of `a` on `b`; `a` may be translucent, `b` is treated as opaque. */
function contrastRatio(a: string, b: string): number {
  const top = composite(a, b);
  const bottom = parseHex(b);
  if (!top || !bottom) return 1;
  const aLum = luminanceOf(top);
  const bLum = luminanceOf([bottom[0], bottom[1], bottom[2]]);
  return (Math.max(aLum, bLum) + 0.05) / (Math.min(aLum, bLum) + 0.05);
}

function ratioMark(ratio: number): string {
  if (ratio >= 7) return "AAA";
  if (ratio >= 4.5) return "AA";
  return "Below AA";
}

export function TypefaceSpecimen() {
  const { content } = useGallery();
  const row = content.app.table.rows[0] ?? [];
  const samples = [
    { label: "Chrome", className: "text-chrome", text: content.app.page.title },
    { label: "Body", className: "text-body", text: content.app.prose.paragraphs[0] ?? content.product.tagline },
    { label: "16px", className: "text-[16px]", text: row.map((cell) => cell.text).join("  ·  ") },
    { label: "22px", className: "text-[22px]", text: content.app.page.title },
    { label: "32px", className: "text-[32px]", text: content.app.prose.title },
    { label: "48px", className: "text-[48px]", text: content.landing.h1 },
  ];

  return (
    <SpecimenFrame caption="Typeface" detail={content.product.name}>
      <div className="space-y-5">
        {samples.map((sample) => (
          <div key={sample.label} className="grid grid-cols-[72px_minmax(0,1fr)] items-baseline gap-4">
            <span className="text-chrome text-muted-foreground">{sample.label}</span>
            <span className={cn("min-w-0 leading-tight", sample.className)}>{sample.text}</span>
          </div>
        ))}
        <div className="grid grid-cols-[72px_minmax(0,1fr)] items-baseline gap-4 border-t border-border pt-5">
          <span className="text-chrome text-muted-foreground">Digits</span>
          <span className="tabular text-[22px]">0123456789 4.81B 1,204h</span>
        </div>
        <div className="grid grid-cols-[72px_minmax(0,1fr)] items-baseline gap-4">
          <span className="text-chrome text-muted-foreground">Mono</span>
          <span className="font-mono text-chrome">{content.app.code.path} · {row[0]?.text ?? content.app.code.lines[0]}</span>
        </div>
      </div>
    </SpecimenFrame>
  );
}

export function MonoSpecimen() {
  const { content } = useGallery();
  const idCell = content.app.table.rows.flat().find((cell) => cell.kind === "mono")?.text ?? content.app.table.rows[0]?.[0]?.text;
  return (
    <SpecimenFrame caption="Mono pairing" detail={content.app.code.path}>
      <pre className="overflow-auto rounded-lg border border-border bg-muted p-5 font-mono text-chrome leading-relaxed text-foreground">
        <code>{content.app.code.lines.join("\n")}</code>
      </pre>
      <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-3 rounded-lg border border-border-card bg-card p-4 text-body">
        <span>{content.app.prose.title}</span>
        <span className="font-mono text-chrome">{content.app.code.path}</span>
        <span className="font-mono text-chrome">{idCell}</span>
        <span className="font-mono text-chrome tabular">2026-09-20 14:02:11</span>
        <span className="text-muted-foreground">{content.product.tagline}</span>
      </div>
    </SpecimenFrame>
  );
}

export function NeutralSpecimen() {
  const { choices, mode, content } = useGallery();
  const name = NEUTRAL_NAMES[choices.neutral] ?? "slate";
  const key = mode === "dark" ? `${name}Dark` : name;
  const ramp = Object.values((radix as unknown as Record<string, Scale>)[key] ?? {}).slice(0, 12);

  return (
    <SpecimenFrame caption="Neutral ramp" detail={`${choices.neutral} · ${mode}`}>
      <div className="grid grid-cols-12 overflow-hidden rounded-lg border border-border">
        {ramp.map((color, index) => (
          <div key={`${color}-${index}`} className="min-w-0">
            <div className="h-24 bg-[var(--swatch)]" style={{ "--swatch": color } as CSSProperties} />
            <div className="min-h-16 border-t border-border bg-background p-2 text-[11px] leading-tight text-muted-foreground">
              <div className="tabular text-foreground">{index + 1}</div>
              <div className="mt-1">{NEUTRAL_ROLES[index]}</div>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-7 grid grid-cols-[1fr_420px] items-start gap-8">
        <SurfaceStack large />
        <div className="space-y-4 text-body text-muted-foreground">
          <p>{content.app.prose.paragraphs[0]}</p>
          <p>{content.app.prose.paragraphs[1]}</p>
        </div>
      </div>
    </SpecimenFrame>
  );
}

const CONTRAST_VARS = ["--foreground", "--background", "--muted-foreground", "--card", "--border"] as const;

export function ContrastSpecimen() {
  const { choices, content, mode } = useGallery();
  const { rootRef, colors } = useGalleryColors(CONTRAST_VARS, `${choices.contrast}-${choices.neutral}-${mode}`);
  const comparisons = [
    ["Foreground / background", "--foreground", "--background"],
    ["Muted foreground / background", "--muted-foreground", "--background"],
    ["Muted foreground / card", "--muted-foreground", "--card"],
    ["Border / background", "--border", "--background"],
  ] as const;

  return (
    <SpecimenFrame rootRef={rootRef} caption="Contrast" detail={`${choices.contrast} · ${mode}`}>
      <div className="grid grid-cols-[minmax(0,1fr)_360px] gap-8">
        <SurfaceStack large />
        <div className="rounded-lg border border-border bg-card p-5 shadow-sm">
          <h2 className="text-[22px] font-medium">{content.app.prose.title}</h2>
          <p className="mt-2 text-body leading-relaxed text-muted-foreground">{content.app.prose.paragraphs[0]}</p>
          <div className="mt-5 divide-y divide-border border-y border-border">
            {comparisons.map(([label, foreground, background]) => {
              const ratio = contrastRatio(colors[foreground] ?? "", colors[background] ?? "");
              return (
                <div key={label} className="flex items-center justify-between gap-4 py-3 text-chrome">
                  <span className="text-muted-foreground">{label}</span>
                  <span className="tabular font-medium text-foreground">{ratio.toFixed(1)}:1 · {ratioMark(ratio)}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </SpecimenFrame>
  );
}

export function AccentSpecimen() {
  const { choices, content } = useGallery();
  const stroke = iconStroke(choices);
  const activeNav = content.app.nav[1] ?? content.app.nav[0];
  return (
    <SpecimenFrame caption="Accent roles" detail={choices.accent}>
      <div className="grid grid-cols-4 gap-5">
        <div><StateLabel>Primary button</StateLabel><Button>{content.app.page.action}</Button></div>
        <div><StateLabel>Link</StateLabel><a className="text-accent-text underline underline-offset-4" href="#accent">{content.landing.ctaSecondary}</a></div>
        <div><StateLabel>Focused input</StateLabel><Input preview="focus" placeholder={content.app.form.fields[0]?.placeholder} /></div>
        <div className="flex flex-col gap-2"><StateLabel>Checks</StateLabel><Checkbox checked label={content.app.form.fields[3]?.label} /><Switch checked label={content.app.form.fields[2]?.label} /></div>
        <div>
          <StateLabel>Selected nav item</StateLabel>
          <div className="flex h-control items-center gap-2 rounded-[var(--radius-control)] bg-accent-soft px-3 text-accent-text">
            <ChevronRight className="size-4" strokeWidth={stroke} aria-hidden="true" />{activeNav?.label}
          </div>
        </div>
        <div>
          <StateLabel>Selected table row</StateLabel>
          <div className="flex h-row items-center gap-4 rounded-md bg-accent-soft px-3 text-body">
            {(content.app.table.rows[0] ?? []).slice(0, 3).map((cell, index) => <CellValue key={index} cell={cell} />)}
          </div>
        </div>
        <div><StateLabel>Soft badge</StateLabel><span className="inline-flex rounded-md bg-accent-soft px-2 py-1 text-chrome font-medium text-accent-text">{content.app.table.rows[0]?.[1]?.text}</span></div>
        <div>
          <StateLabel>Tab indicator</StateLabel>
          <Tabs items={content.app.topnav.slice(0, 3)} value={content.app.topnav[0]} />
        </div>
      </div>
      <div className="mt-7">
        <div className="mb-2 flex items-center justify-between text-chrome text-muted-foreground"><span>{content.app.stats[0]?.label}</span><span className="tabular">62%</span></div>
        <div className="h-[6px] overflow-hidden rounded-[var(--radius-control)] bg-muted"><div className="h-full w-[62%] bg-primary" /></div>
      </div>
    </SpecimenFrame>
  );
}

export function RadiusSpecimen() {
  const { choices, content } = useGallery();
  const radius = RADIUS_PX[choices.radius] ?? 6;
  const controlRadius = choices.buttons === "soft" && radius >= 8 ? radius + 2 : radius;
  return (
    <SpecimenFrame caption="Radius system" detail={`${radius}px`}>
      <div className="flex flex-wrap items-end gap-5">
        <div><StateLabel>Button · lg · {controlRadius}px</StateLabel><Button size="lg">{content.app.page.action}</Button></div>
        <div className="w-56"><StateLabel>Input · {controlRadius}px</StateLabel><Input placeholder={content.app.form.fields[0]?.placeholder} /></div>
        <div className="w-56"><StateLabel>Select · {controlRadius}px</StateLabel><Select options={content.app.form.fields[1]?.options ?? []} placeholder={content.app.form.fields[1]?.label} /></div>
        <div><StateLabel>Checkbox · {controlRadius}px</StateLabel><Checkbox checked label={content.app.form.fields[3]?.label} /></div>
      </div>
      <div className="mt-8 flex flex-wrap items-start gap-6">
        <div>
          <StateLabel>Card · {radius + 2}px · 240 × 160</StateLabel>
          <div className="flex h-[160px] w-[240px] flex-col justify-between rounded-lg border border-border-card bg-card p-5 shadow-sm">
            <span className="text-body font-medium">{content.app.prose.title}</span>
            <span className="text-chrome text-muted-foreground">240 × 160</span>
          </div>
        </div>
        <div>
          <StateLabel>Open menu · concentric with its items</StateLabel>
          <div className="w-64 rounded-popover border border-border bg-popover p-1.5 text-body shadow-lg">
            {content.app.nav.slice(0, 4).map((item, index) => <div key={item.label} className={cn("flex h-control items-center rounded-md px-3", index === 1 && "bg-accent")}>{item.label}</div>)}
          </div>
        </div>
        <div>
          <StateLabel>Dialog · {radius + 6}px · 420 wide</StateLabel>
          <div className="w-[420px] rounded-xl border border-border bg-popover shadow-lg">
            <div className="border-b border-border p-5 text-body font-semibold">{content.app.dialog.title}</div>
            <p className="p-5 text-body text-muted-foreground">{content.app.dialog.body}</p>
            <div className="flex justify-end gap-2 border-t border-border p-4"><Button variant="ghost">{content.app.dialog.cancel}</Button><Button variant="destructive">{content.app.dialog.confirm}</Button></div>
          </div>
        </div>
        <div>
          <StateLabel>Avatar tile · {radius + 6}px</StateLabel>
          <div className="flex size-20 items-center justify-center rounded-xl bg-accent-soft text-[32px] font-medium text-accent-text">{content.product.name.slice(0, 1)}</div>
        </div>
      </div>
    </SpecimenFrame>
  );
}

function DepthCard({ preview, children }: { preview?: "hover"; children: ReactNode }) {
  const { choices } = useGallery();
  return (
    <div
      className={cn(
        "rounded-lg border border-border-card bg-card p-5 shadow-sm transition-[transform,box-shadow] duration-[var(--duration-fast)]",
        preview === "hover" && choices.depth !== "hairline" && "-translate-y-1 shadow-md",
      )}
    >
      {children}
    </div>
  );
}

export function DepthSpecimen() {
  const { choices, content } = useGallery();
  return (
    <SpecimenFrame caption="Depth composition" detail={choices.depth}>
      <div className="relative h-[430px] overflow-hidden rounded-xl border border-border bg-background p-9">
        <div className="h-[250px] w-[520px] rounded-lg border border-border-card bg-card p-6 shadow-sm">
          <h2 className="text-[22px] font-medium">{content.app.prose.title}</h2>
          <p className="mt-3 max-w-[46ch] text-body leading-relaxed text-muted-foreground">{content.app.prose.paragraphs[0]}</p>
        </div>
        <div className="absolute left-[430px] top-[55px] z-10 w-64 rounded-popover border border-border bg-popover p-1.5 shadow-lg">
          {content.app.nav.slice(0, 4).map((item, index) => <div key={item.label} className={cn("flex h-control items-center rounded-md px-3 text-body", index === 0 && "bg-accent")}>{item.label}</div>)}
        </div>
        <div className="absolute inset-0 z-20 bg-foreground/10" />
        <div className="absolute bottom-8 right-8 z-30 w-[420px] rounded-xl border border-border bg-popover shadow-lg">
          <div className="border-b border-border p-5 font-semibold">{content.app.dialog.title}</div>
          <p className="p-5 text-muted-foreground">{content.app.dialog.body}</p>
          <div className="flex justify-end gap-2 border-t border-border p-4"><Button variant="ghost">{content.app.dialog.cancel}</Button><Button>{content.app.dialog.confirm}</Button></div>
        </div>
      </div>
      <div className="mt-6 grid grid-cols-2 gap-6">
        <DepthCard><StateLabel>Resting card</StateLabel><span>{content.product.tagline}</span></DepthCard>
        <DepthCard preview="hover"><StateLabel>Hover preview</StateLabel><span>{content.product.tagline}</span></DepthCard>
      </div>
    </SpecimenFrame>
  );
}
