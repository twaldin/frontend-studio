/**
 * Choices → CSS variables (shadcn names) for light and dark, plus the
 * structural settings the galleries read. The export writes exactly these.
 */
import * as radix from "@radix-ui/colors";
import type { ResolvedChoices } from "@/tree/types";

type Scale = Record<string, string>;
/** Radix names scales `slate`, `slateDark`, `slateA`, `slateDarkA`; `name` may end in `A`. */
const scale = (name: string, dark: boolean): string[] => {
  const alpha = name.endsWith("A");
  const base = alpha ? name.slice(0, -1) : name;
  const key = `${base}${dark ? "Dark" : ""}${alpha ? "A" : ""}`;
  const s = (radix as unknown as Record<string, Scale>)[key];
  if (!s) throw new Error(`no radix scale ${key}`);
  return Object.values(s);
};

const NEUTRAL: Record<string, string> = { cool: "slate", neutral: "gray", warm: "sand", tinted: "mauve" };
const ACCENT: Record<string, string> = {
  indigo: "indigo", blue: "blue", violet: "violet", teal: "teal", green: "green", orange: "orange", crimson: "crimson", pink: "pink", amber: "amber",
};
/** Accents bright enough that their solid fill needs dark text in dark mode. */
const BRIGHT_ACCENT: Record<string, true> = { orange: true, green: true, teal: true, amber: true };

export const FONT_STACK: Record<string, string> = {
  inter: `"Inter", ui-sans-serif, system-ui, sans-serif`,
  geist: `"Geist", ui-sans-serif, system-ui, sans-serif`,
  plex: `"IBM Plex Sans", ui-sans-serif, system-ui, sans-serif`,
  instrument: `"Instrument Sans", ui-sans-serif, system-ui, sans-serif`,
  system: `ui-sans-serif, system-ui, -apple-system, "Segoe UI", sans-serif`,
  serif: `"Newsreader", ui-serif, Georgia, serif`,
  rounded: `"Nunito", ui-rounded, ui-sans-serif, system-ui, sans-serif`,
  grotesk: `"Space Grotesk", ui-sans-serif, system-ui, sans-serif`,
};
export const MONO_STACK: Record<string, string> = {
  "geist-mono": `"Geist Mono", ui-monospace, monospace`,
  jetbrains: `"JetBrains Mono", ui-monospace, monospace`,
  "plex-mono": `"IBM Plex Mono", ui-monospace, monospace`,
  "system-mono": `ui-monospace, "SF Mono", Menlo, Consolas, monospace`,
};

export const RADIUS_PX: Record<string, number> = { none: 0, sharp: 4, medium: 6, round: 8, soft: 10, pill: 16 };

/** Tailwind v4 derives every padding, gap and size utility from `--spacing`. */
export const SPACING_UNIT: Record<string, string> = { tight: "3.5px", regular: "4px", airy: "5px" };

export interface Density {
  chrome: number;
  body: number;
  control: number;
  row: number;
}
export const DENSITY: Record<string, Density> = {
  compact: { chrome: 13, body: 14, control: 28, row: 34 },
  standard: { chrome: 14, body: 15, control: 32, row: 38 },
  comfortable: { chrome: 15, body: 16, control: 36, row: 44 },
};

export const MOTION_MS: Record<string, { fast: number; base: number; spring: boolean }> = {
  none: { fast: 0, base: 0, spring: false },
  minimal: { fast: 100, base: 150, spring: false },
  expressive: { fast: 150, base: 260, spring: true },
};

/**
 * The look step's type voice for headings. Editorial and print set headings in the serif;
 * the other looks keep the body face and change weight, tracking and case. Quiet is the
 * studio's long-standing heading: medium weight, no tracking.
 */
const LOOK_HEADING: Record<string, { serif: boolean; weight: number; tracking: string; case: string }> = {
  quiet: { serif: false, weight: 500, tracking: "normal", case: "none" },
  editorial: { serif: true, weight: 500, tracking: "-0.015em", case: "none" },
  playful: { serif: false, weight: 800, tracking: "-0.01em", case: "none" },
  brutalist: { serif: false, weight: 700, tracking: "-0.025em", case: "none" },
  print: { serif: true, weight: 600, tracking: "-0.01em", case: "none" },
  immersive: { serif: false, weight: 700, tracking: "-0.02em", case: "none" },
};

/** Fine paper grain: SVG noise in a warm gray at 7% alpha. */
const PAPER_GRAIN = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='180' height='180'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3CfeColorMatrix values='0 0 0 0 0.35 0 0 0 0 0.3 0 0 0 0 0.24 0 0 0 0.07 0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`;

export type Vars = Record<string, string>;

/** Opacity per stack layer, top to bottom: one hue, stepped tints. Charts read `--chart-n` from the same ramp. */
export const STACK_OPACITY = [0.9, 0.65, 0.45, 0.3, 0.2, 0.14];

/** `#rrggbb` + alpha → `#rrggbbaa`; non-hex values pass through unchanged. */
const withAlpha = (color: string, alpha: number): string =>
  /^#[0-9a-f]{6}$/i.test(color) ? `${color}${Math.round(alpha * 255).toString(16).padStart(2, "0")}` : color;

/** One theme's semantic colors, in shadcn's vocabulary plus a few extras. */
function palette(c: ResolvedChoices, dark: boolean): Vars {
  const n = scale(NEUTRAL[c.neutral] ?? "slate", dark);
  const nD = scale(NEUTRAL[c.neutral] ?? "slate", true);
  const accentName = ACCENT[c.accent];
  const a = accentName ? scale(accentName, dark) : null;
  const red = scale("red", dark);
  const amber = scale("amber", dark);
  const green = scale("green", dark);
  const step = (i: number) => n[i - 1]!;

  const soft = c.contrast === "soft";
  const high = c.contrast === "high";

  // The canvas sits on scale step 1 (step 2 for soft contrast). Light mode
  // elevates by border and shadow with surfaces at the canvas; dark mode
  // elevates by lightness: canvas → card → popover, one step each.
  const canvasIdx = soft ? 2 : 1;
  const background = high ? (dark ? "#000000" : "#ffffff") : step(canvasIdx);
  const foreground = high ? (dark ? "#ffffff" : "#000000") : step(12);
  const card = dark ? (high ? step(1) : step(canvasIdx + 1)) : high ? "#ffffff" : step(1);
  const popover = dark ? (high ? step(2) : step(canvasIdx + 2)) : high ? "#ffffff" : step(1);
  // Fills and lines are translucent so they stack: a filled input on a filled
  // card is still one step lighter than the card. Surfaces and text stay opaque.
  const nA = scale(`${NEUTRAL[c.neutral] ?? "slate"}A`, dark);
  const nDA = scale(`${NEUTRAL[c.neutral] ?? "slate"}A`, true);
  const aA = accentName ? scale(`${accentName}A`, dark) : null;
  const border = soft ? nA[4]! : high ? nA[7]! : nA[5]!;
  const input = soft ? nA[5]! : high ? nA[8]! : nA[6]!;
  const muted = nA[2]!;
  const mutedForeground = step(11);
  const secondary = nA[2]!;
  const hover = nA[3]!;

  const primary = a ? a[8]! : foreground;
  const primaryForeground = a ? (BRIGHT_ACCENT[c.accent] ? (dark ? "#000000" : "#ffffff") : "#ffffff") : background;
  const ring = a ? a[7]! : step(8);
  const accentSoft = aA ? aA[2]! : nA[3]!;
  const accentSoftHover = aA ? aA[3]! : nA[4]!;
  const accentText = a ? a[10]! : foreground;

  // "tinted" is the scale's subtle step in both themes (darker in light, lighter
  // in dark — Notion). "dimmer" is darker in both, so dark-mode content reads as
  // a raised panel inside the frame (Linear).
  const sidebar =
    c.sidebarTone === "dark"
      ? nD[1]!
      : c.sidebarTone === "tinted"
        ? step(canvasIdx + 1)
        : c.sidebarTone === "dimmer"
          ? dark
            ? `color-mix(in oklab, ${background} 72%, black)`
            : step(canvasIdx + 1)
          : background;
  const sidebarForeground = c.sidebarTone === "dark" ? nD[11]! : foreground;
  const sidebarMuted = c.sidebarTone === "dark" ? nD[10]! : mutedForeground;
  const sidebarBorder = c.sidebarTone === "dark" ? nDA[5]! : border;
  const sidebarHover = c.sidebarTone === "dark" ? nDA[3]! : nA[3]!;
  // Offset depth draws hard shadows and card outlines in the text color.
  const offset = c.depth === "offset";
  const texture =
    c.look === "print" && !dark
      ? PAPER_GRAIN
      : c.look === "immersive"
        ? `radial-gradient(900px 420px at 15% -10%, color-mix(in oklab, ${primary} ${dark ? 24 : 14}%, transparent), transparent 70%)`
        : "none";
  return {
    "--background": background,
    "--foreground": foreground,
    "--card": card,
    "--card-foreground": foreground,
    "--popover": popover,
    "--popover-foreground": foreground,
    "--primary": primary,
    "--primary-foreground": primaryForeground,
    "--secondary": secondary,
    "--secondary-foreground": foreground,
    "--muted": muted,
    "--muted-foreground": mutedForeground,
    "--accent": hover,
    "--accent-foreground": foreground,
    "--accent-soft": accentSoft,
    "--accent-soft-hover": accentSoftHover,
    "--accent-text": accentText,
    "--destructive": red[8]!,
    "--warning": amber[8]!,
    "--success": green[8]!,
    // Step 11 of each scale: the text-contrast tone, for status words on the canvas.
    "--destructive-text": red[10]!,
    "--warning-text": amber[10]!,
    "--success-text": green[10]!,
    "--border": border,
    "--input": input,
    "--ring": ring,
    "--sidebar": sidebar,
    "--sidebar-foreground": sidebarForeground,
    "--sidebar-muted": sidebarMuted,
    "--sidebar-border": sidebarBorder,
    "--sidebar-hover": sidebarHover,
    "--sidebar-primary": primary,
    "--sidebar-primary-foreground": primaryForeground,
    "--sidebar-accent": sidebarHover,
    "--sidebar-accent-foreground": sidebarForeground,
    "--sidebar-ring": ring,
    "--chart-1": withAlpha(primary, STACK_OPACITY[0]!),
    "--chart-2": withAlpha(primary, STACK_OPACITY[1]!),
    "--chart-3": withAlpha(primary, STACK_OPACITY[2]!),
    "--chart-4": withAlpha(primary, STACK_OPACITY[3]!),
    "--chart-5": withAlpha(primary, STACK_OPACITY[4]!),
    "--shadow-sm": offset ? `2px 2px 0 0 ${foreground}` : c.depth === "hairline" ? "none" : c.depth === "soft" ? "0 1px 2px rgb(0 0 0 / 0.05)" : "0 1px 2px rgb(0 0 0 / 0.06), 0 2px 6px rgb(0 0 0 / 0.06)",
    "--shadow-md": offset ? `4px 4px 0 0 ${foreground}` : c.depth === "hairline" ? "none" : c.depth === "soft" ? "0 2px 6px rgb(0 0 0 / 0.06)" : "0 4px 12px rgb(0 0 0 / 0.08), 0 1px 3px rgb(0 0 0 / 0.06)",
    "--shadow-lg": offset ? `6px 6px 0 0 ${foreground}` : dark ? "0 12px 32px rgb(0 0 0 / 0.5)" : "0 12px 32px -8px rgb(0 0 0 / 0.18), 0 2px 8px rgb(0 0 0 / 0.08)",
    "--border-card": offset ? foreground : c.depth === "shadow" ? (soft ? nA[3]! : nA[4]!) : border,
    "--texture": texture,
  };
}

export interface Resolved {
  light: Vars;
  dark: Vars;
  /** Theme-independent variables. */
  shared: Vars;
  density: Density;
  choices: ResolvedChoices;
}

export function resolveTokens(c: ResolvedChoices): Resolved {
  const d = DENSITY[c.density] ?? DENSITY.compact!;
  const m = MOTION_MS[c.motion] ?? MOTION_MS.minimal!;
  const r = RADIUS_PX[c.radius] ?? 6;
  const heading = LOOK_HEADING[c.look] ?? LOOK_HEADING.quiet!;
  const sans = FONT_STACK[c.typeface] ?? FONT_STACK.inter!;
  const shared: Vars = {
    "--font-sans": sans,
    "--font-heading": heading.serif ? FONT_STACK.serif! : sans,
    "--heading-weight": String(heading.weight),
    "--heading-tracking": heading.tracking,
    "--heading-case": heading.case,
    // Buttons with a fill or an outline sit on a hard edge: offset in brutalist depth, a pressed lip in the playful look.
    "--button-edge": c.depth === "offset" ? "2px 2px 0 0 var(--foreground)" : c.look === "playful" ? "inset 0 -2px 0 rgb(0 0 0 / 0.22)" : "none",
    "--font-mono": MONO_STACK[c.mono] ?? MONO_STACK["geist-mono"]!,
    "--radius": `${r}px`,
    "--radius-control": c.buttons === "soft" && r >= 8 ? `${r + 2}px` : `${r}px`,
    "--text-chrome": `${d.chrome}px`,
    "--text-body": `${d.body}px`,
    "--control-h": `${d.control}px`,
    "--row-h": `${d.row}px`,
    "--duration-fast": `${m.fast}ms`,
    "--duration-base": `${m.base}ms`,
    "--ease": m.spring ? "cubic-bezier(0.34, 1.56, 0.64, 1)" : "cubic-bezier(0.22, 1, 0.36, 1)",
    "--spacing": SPACING_UNIT[c.spacing] ?? "4px",
    "--icon-stroke": c.iconWeight === "regular" ? "2" : "1.5",
    "--title-size": c.pageTitle === "display" ? "36px" : c.pageTitle === "standard" ? "22px" : `${d.chrome + 1}px`,
  };
  return { light: palette(c, false), dark: palette(c, true), shared, density: d, choices: c };
}

const FONT_FILES: Record<string, string> = {
  inter: "Inter",
  geist: "Geist",
  plex: "IBM Plex Sans",
  instrument: "Instrument Sans",
  serif: "Newsreader",
  rounded: "Nunito",
  grotesk: "Space Grotesk",
  "geist-mono": "Geist Mono",
  jetbrains: "JetBrains Mono",
  "plex-mono": "IBM Plex Mono",
};

const block = (selector: string, vars: Vars) =>
  `${selector} {\n${Object.entries(vars).map(([k, v]) => `  ${k}: ${v};`).join("\n")}\n}`;

/**
 * The theme.css a shadcn + Tailwind v4 project imports from its main stylesheet,
 * after `tailwindcss` and `shadcn/tailwind.css`. Variables use shadcn's names so
 * registry components work unchanged; a few extras (`accent-soft`, `warning`,
 * `success`, `sidebar-muted`, `sidebar-hover`, `border-card`) are for product code.
 */
export function themeCss(r: Resolved): string {
  const c = r.choices;
  const headingFont = LOOK_HEADING[c.look]?.serif ? "serif" : c.typeface;
  const fonts = [...new Set([FONT_FILES[c.typeface], FONT_FILES[headingFont], FONT_FILES[c.mono]])].filter(Boolean);
  const lines = [
    `/* Generated by frontend-studio. Archetype: ${c.archetype}. Reference: ${c.reference}. Look: ${c.look}. */`,
    `/* Import after "tailwindcss" and "shadcn/tailwind.css". */`,
    fonts.length
      ? `/* Self-host: ${fonts.join(", ")} — @fontsource-variable packages, or the woff2 files and @font-face rules from the studio's fonts.css. */`
      : `/* System font stack; nothing to self-host. */`,
    ``,
    `@custom-variant dark (&:where(.dark, .dark *));`,
    ``,
    block(":root", { ...r.shared, ...r.light }),
    ``,
    c.themes === "light" ? `/* Light only. */` : block(c.themes === "dark" ? ":root" : ".dark", r.dark),
    ``,
    `@theme inline {`,
    `  --font-sans: var(--font-sans);`,
    `  --font-mono: var(--font-mono);`,
    `  --font-heading: var(--font-heading);`,
    `  --color-background: var(--background);`,
    `  --color-foreground: var(--foreground);`,
    `  --color-card: var(--card);`,
    `  --color-card-foreground: var(--card-foreground);`,
    `  --color-popover: var(--popover);`,
    `  --color-popover-foreground: var(--popover-foreground);`,
    `  --color-primary: var(--primary);`,
    `  --color-primary-foreground: var(--primary-foreground);`,
    `  --color-secondary: var(--secondary);`,
    `  --color-secondary-foreground: var(--secondary-foreground);`,
    `  --color-muted: var(--muted);`,
    `  --color-muted-foreground: var(--muted-foreground);`,
    `  --color-accent: var(--accent);`,
    `  --color-accent-foreground: var(--accent-foreground);`,
    `  --color-accent-soft: var(--accent-soft);`,
    `  --color-accent-soft-hover: var(--accent-soft-hover);`,
    `  --color-accent-text: var(--accent-text);`,
    `  --color-destructive: var(--destructive);`,
    `  --color-warning: var(--warning);`,
    `  --color-success: var(--success);`,
    `  --color-destructive-text: var(--destructive-text);`,
    `  --color-warning-text: var(--warning-text);`,
    `  --color-success-text: var(--success-text);`,
    `  --color-border: var(--border);`,
    `  --color-border-card: var(--border-card);`,
    `  --color-input: var(--input);`,
    `  --color-ring: var(--ring);`,
    `  --color-sidebar: var(--sidebar);`,
    `  --color-sidebar-foreground: var(--sidebar-foreground);`,
    `  --color-sidebar-muted: var(--sidebar-muted);`,
    `  --color-sidebar-border: var(--sidebar-border);`,
    `  --color-sidebar-hover: var(--sidebar-hover);`,
    `  --color-sidebar-primary: var(--sidebar-primary);`,
    `  --color-sidebar-primary-foreground: var(--sidebar-primary-foreground);`,
    `  --color-sidebar-accent: var(--sidebar-accent);`,
    `  --color-sidebar-accent-foreground: var(--sidebar-accent-foreground);`,
    `  --color-sidebar-ring: var(--sidebar-ring);`,
    `  --color-chart-1: var(--chart-1);`,
    `  --color-chart-2: var(--chart-2);`,
    `  --color-chart-3: var(--chart-3);`,
    `  --color-chart-4: var(--chart-4);`,
    `  --color-chart-5: var(--chart-5);`,
    `  --radius-sm: calc(var(--radius) - 2px);`,
    `  --radius-md: var(--radius);`,
    `  --radius-lg: calc(var(--radius) + 2px);`,
    `  --radius-xl: calc(var(--radius) + 6px);`,
    `  --radius-2xl: calc(var(--radius) + 10px);`,
    `  --radius-3xl: calc(var(--radius) + 14px);`,
    `  --radius-4xl: calc(var(--radius) + 18px);`,
    `  /* Concentric nesting: a menu or popover with p-1.5 around rounded-md items. Outer = inner + inset. */`,
    `  --radius-popover: calc(var(--radius) + var(--spacing) * 1.5);`,
    `  --shadow-sm: var(--shadow-sm);`,
    `  --shadow-md: var(--shadow-md);`,
    `  --shadow-lg: var(--shadow-lg);`,
    `  --text-chrome: var(--text-chrome);`,
    `  --text-body: var(--text-body);`,
    `  /* Registry components use text-sm for chrome and text-base for body. */`,
    `  --text-sm: var(--text-chrome);`,
    `  --text-sm--line-height: 1.45;`,
    `  --text-base: var(--text-body);`,
    `  --text-base--line-height: 1.5;`,
    `}`,
    ``,
    `/* The look's type voice: put \`heading\` on every heading. */`,
    `@utility heading {`,
    `  font-family: var(--font-heading);`,
    `  font-weight: var(--heading-weight);`,
    `  letter-spacing: var(--heading-tracking);`,
    `  text-transform: var(--heading-case);`,
    `}`,
    ``,
    `/* The look's canvas texture (paper grain, a glow, or none): put \`surface\` on the app canvas. */`,
    `@utility surface {`,
    `  background-color: var(--background);`,
    `  background-image: var(--texture);`,
    `}`,
    ``,
    `/* Filled and outlined buttons take \`shadow-[var(--button-edge)]\`: a hard offset or a pressed lip, per the look. */`,
    ``,
    `body {`,
    `  font-family: var(--font-sans);`,
    `  font-size: var(--text-body);`,
    `  background: var(--background);`,
    `  color: var(--foreground);`,
    `  -webkit-font-smoothing: antialiased;`,
    `}`,
    `.tabular, table { font-variant-numeric: tabular-nums; }`,
    ``,
    `@media (prefers-reduced-motion: reduce) {`,
    `  *, *::before, *::after { animation-duration: 0.01ms !important; transition-duration: 0.01ms !important; }`,
    `}`,
  ];
  return lines.join("\n");
}
