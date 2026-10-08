/**
 * Motion languages: the timing and easing every move in the product uses, set once.
 * Durations are per role (how big the move is), not per component, so a menu and a
 * tooltip share `local`. The interaction axes (layer arrival, control response, content
 * swap, route and theme motion) decide what moves; the language decides how fast and on
 * which curve. Values are this studio's own, informed by Material 3's duration and easing
 * tokens, Carbon's productive and expressive motion, and the MIT-licensed guidance in
 * emilkowalski/skills (fast-out curves, under 300 ms for app chrome, no motion on
 * many-times-a-day paths). See references/patterns/motion-language.md.
 */
import type { ResolvedChoices } from "@/tree/types";
import { ASYNC_FEEDBACK_CSS } from "./axes/asyncFeedback";
import { CONTENT_SWAP_CSS } from "./axes/contentSwap";
import { CONTROL_RESPONSE_CSS } from "./axes/controlResponse";
import { LAYER_ARRIVAL_CSS } from "./axes/layerArrival";
import { ROUTE_MOTION_CSS } from "./axes/routeMotion";
import { THEME_MOTION_CSS } from "./axes/themeMotion";

export interface MotionLanguage {
  /** ms: a press acknowledged. */
  press: number;
  /** ms: a small change in place: a menu, a tooltip, a toggle. */
  local: number;
  /** ms: a layer arriving: a dialog, a sheet, a large popover. */
  layer: number;
  /** ms: content replaced in place: a tab, a filter, a page of results. */
  swap: number;
  /** ms: a page change. */
  route: number;
  /** CSS easing for things arriving. */
  enter: string;
  /** CSS easing for things leaving. */
  exit: string;
  /** CSS easing for things moving or resizing in place. */
  change: string;
}

export const MOTION_LANGUAGES: Record<string, MotionLanguage> = {
  still: { press: 0, local: 0, layer: 0, swap: 0, route: 0, enter: "linear", exit: "linear", change: "linear" },
  snappy: {
    press: 80, local: 120, layer: 150, swap: 100, route: 120,
    enter: "cubic-bezier(0.23, 1, 0.32, 1)", exit: "cubic-bezier(0.4, 0, 1, 1)", change: "cubic-bezier(0.2, 0, 0, 1)",
  },
  anchored: {
    press: 100, local: 160, layer: 200, swap: 140, route: 160,
    enter: "cubic-bezier(0.23, 1, 0.32, 1)", exit: "cubic-bezier(0.4, 0, 1, 1)", change: "cubic-bezier(0.77, 0, 0.175, 1)",
  },
  tactile: {
    press: 120, local: 200, layer: 280, swap: 160, route: 200,
    enter: "cubic-bezier(0.34, 1.56, 0.64, 1)", exit: "cubic-bezier(0.4, 0, 1, 1)", change: "cubic-bezier(0.34, 1.3, 0.64, 1)",
  },
  material: {
    press: 100, local: 150, layer: 250, swap: 150, route: 300,
    enter: "cubic-bezier(0.05, 0.7, 0.1, 1)", exit: "cubic-bezier(0.3, 0, 0.8, 0.15)", change: "cubic-bezier(0.2, 0, 0, 1)",
  },
};

/** The language's CSS variables. `--duration-fast` and `--duration-base` are the local and layer roles; `--ease` is the entering curve. */
export function motionVars(language: string): Record<string, string> {
  const m = MOTION_LANGUAGES[language] ?? MOTION_LANGUAGES.snappy!;
  return {
    "--duration-press": `${m.press}ms`,
    "--duration-fast": `${m.local}ms`,
    "--duration-base": `${m.layer}ms`,
    "--duration-swap": `${m.swap}ms`,
    "--duration-route": `${m.route}ms`,
    "--ease": m.enter,
    "--ease-exit": m.exit,
    "--ease-change": m.change,
  };
}

/**
 * Progress along a CSS easing at time t (both 0–1): `linear` or `cubic-bezier(x1, y1, x2, y2)`.
 * Filmstrips use it to draw a transition's frames at fixed times.
 */
export function easeAt(easing: string, t: number): number {
  const m = /cubic-bezier\(\s*([-\d.]+)\s*,\s*([-\d.]+)\s*,\s*([-\d.]+)\s*,\s*([-\d.]+)\s*\)/.exec(easing);
  if (!m || t <= 0 || t >= 1) return Math.min(1, Math.max(0, t));
  const [x1, y1, x2, y2] = m.slice(1).map(Number) as [number, number, number, number];
  // Bezier with P0 = 0 and P3 = 1: solve x(s) = t by bisection, then return y(s).
  const at = (a: number, b: number, s: number) => 3 * a * s * (1 - s) ** 2 + 3 * b * s * s * (1 - s) + s ** 3;
  let lo = 0;
  let hi = 1;
  for (let i = 0; i < 40; i += 1) {
    const mid = (lo + hi) / 2;
    if (at(x1, x2, mid) < t) lo = mid;
    else hi = mid;
  }
  return at(y1, y2, (lo + hi) / 2);
}

/**
 * The working CSS for the chosen interaction options, appended to theme.css: each axis
 * writes its own utilities or view-transition rules from the same data its specimen draws.
 */
export function interactionCss(c: ResolvedChoices): string {
  return [
    "/* Shared transition primitives. Filmstrips in the studio are computed snapshots, not production timers. */",
    "@keyframes studio-fade-in { from { opacity: 0; } to { opacity: 1; } }",
    "@keyframes studio-fade-out { from { opacity: 1; } to { opacity: 0; } }",
    LAYER_ARRIVAL_CSS[c.layerArrival],
    CONTROL_RESPONSE_CSS[c.controlResponse],
    CONTENT_SWAP_CSS[c.contentSwap],
    ASYNC_FEEDBACK_CSS[c.asyncFeedback],
    ROUTE_MOTION_CSS[c.routeMotion],
    THEME_MOTION_CSS[c.themeMotion],
    c.motion === "still" ? ".studio-spinner { animation: none; }" : "",
    `/* Explicit instant paths: set data-studio-instant on frequent/keyboard-triggered regions. */
[data-studio-instant], [data-studio-instant] *, [data-studio-instant]::before, [data-studio-instant]::after { animation-duration: 0s !important; transition-duration: 0s !important; }
@media (prefers-reduced-motion: reduce) {
  .studio-layer { animation: none !important; }
  .studio-layer:is([data-state="closed"], [data-closed]) { visibility: hidden; }
  .studio-control:active { transform: none !important; filter: brightness(.82); }
  .studio-control::after, .studio-spinner { animation: none !important; transition: none !important; }
  ::view-transition-group(*), ::view-transition-old(*), ::view-transition-new(*) { animation: none !important; }
}`,
  ]
    .filter(Boolean)
    .join("\n\n");
}
