import type { CSSProperties } from "react";

/** The same geometry is used by the computed filmstrip and the exported keyframes. */
export function layerFrame(option: string, progress: number): CSSProperties {
  const p = Math.max(0, progress);
  if (option === "cut") return { opacity: p >= 1 ? 1 : 0 };
  if (option === "anchored") return { opacity: Math.min(1, p), transform: `scale(${0.82 + 0.18 * p})`, transformOrigin: "top left" };
  if (option === "rise") return { opacity: Math.min(1, p), transform: `translateY(${16 * (1 - p)}px)` };
  if (option === "reveal") return { clipPath: `inset(0 0 ${100 * (1 - Math.min(1, p))}% 0)` };
  return { opacity: Math.min(1, p) };
}

const starts: Record<string, string> = {
  cut: "opacity: 1;", fade: "opacity: 0;", anchored: "opacity: 0; transform: scale(.82);",
  rise: "opacity: 0; transform: translateY(16px);", reveal: "clip-path: inset(0 0 100% 0);",
};
export const LAYER_ARRIVAL_CSS: Record<string, string> = Object.fromEntries(Object.entries(starts).map(([id, start]) => [id, `/* Layers: use .studio-layer[data-state="open"|"closed"], or Base UI's data-open/data-closed attributes. The host owns mounting, dismissal and focus. Set --layer-origin to the trigger edge; .studio-layer-local uses the smaller local role. */
.studio-layer { transform-origin: var(--layer-origin, var(--transform-origin, top left)); }
.studio-layer-local { --layer-duration: var(--duration-fast); }
.studio-layer:is([data-state="open"], [data-open]) { animation: studio-layer-in ${id === "cut" ? "0ms" : "var(--layer-duration, var(--duration-base))"} var(--ease) both; }
.studio-layer:is([data-state="closed"], [data-closed]) { pointer-events: none; animation: studio-layer-out ${id === "cut" ? "0ms" : "var(--layer-duration, var(--duration-base))"} var(--ease-exit) both; }
@keyframes studio-layer-in { from { ${start} } to { opacity: 1; transform: none; clip-path: inset(0); } }
@keyframes studio-layer-out { from { opacity: 1; transform: none; clip-path: inset(0); } to { ${id === "cut" ? "opacity: 0;" : start} } }`]));
