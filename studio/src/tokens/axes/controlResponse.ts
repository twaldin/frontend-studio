import type { CSSProperties } from "react";

export function controlFrame(option: string, progress: number): CSSProperties {
  if (option === "press") return { transform: `scale(${1 - 0.03 * progress})`, filter: `brightness(${1 - 0.12 * progress})` };
  if (option === "sink") return { transform: `translateY(${3 * progress}px)`, boxShadow: `0 ${3 * (1 - progress)}px 0 color-mix(in oklab, var(--foreground) 30%, transparent)` };
  return { filter: option === "tone" ? `brightness(${1 - 0.18 * progress})` : undefined };
}

const base = `.studio-control { position: relative; isolation: isolate; transition: transform var(--duration-press) var(--ease-change), filter var(--duration-press) var(--ease-change), box-shadow var(--duration-press) var(--ease-change); }
.studio-control:disabled, .studio-control[aria-disabled="true"] { cursor: not-allowed; }
.studio-control:focus-visible { outline: 2px solid var(--ring); outline-offset: 2px; }`;
const held = `.studio-control:not(:disabled):not([aria-disabled="true"]):is(:active, [data-preview="active"])`;
export const CONTROL_RESPONSE_CSS: Record<string, string> = {
  tone: `${base}\n${held} { filter: brightness(.82); }`,
  press: `${base}\n${held} { transform: scale(.97); filter: brightness(.88); }`,
  sink: `${base}\n.studio-control { box-shadow: 0 3px 0 color-mix(in oklab, var(--foreground) 30%, transparent); }\n${held} { transform: translateY(3px); box-shadow: 0 0 0 transparent; }`,
  ink: `${base}
.studio-control { overflow: hidden; }
.studio-control::after { content: ""; position: absolute; inset: 0; pointer-events: none; background: currentColor; opacity: 0; clip-path: circle(0% at 50% 50%); transition: clip-path var(--duration-press) var(--ease), opacity var(--duration-press) var(--ease-exit); }
${held}::after { opacity: .18; clip-path: circle(75% at 50% 50%); }`,
};
