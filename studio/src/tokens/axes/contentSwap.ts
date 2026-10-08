import type { CSSProperties } from "react";

export function swapFrame(option: string, p: number, incoming: boolean): CSSProperties {
  const progress = Math.min(1, Math.max(0, p));
  if (option === "cut") return { opacity: incoming ? Number(progress >= 1) : Number(progress < 1) };
  if (option === "slide") return { opacity: incoming ? progress : 1 - progress, transform: `translateX(${incoming ? 100 * (1 - progress) : -100 * progress}%)` };
  if (option === "resize") return { opacity: incoming ? Math.max(0, (progress - 0.5) * 2) : Math.max(0, 1 - progress * 2) };
  return { opacity: incoming ? progress : 1 - progress };
}

const selector = `:root[data-studio-transition="content"]`;
const base = `/* Put .studio-swap on one changing region, then call transitionStudio("content", update, {direction: "forward"|"back"}). Keep focus on the initiating tab or filter. Resize uses the old/new measured view-transition group bounds; there are no guessed heights or delays. */
.studio-swap { view-transition-name: studio-content; }
${selector}::view-transition-old(root), ${selector}::view-transition-new(root) { animation: none; }
${selector}::view-transition-group(studio-content) { animation-duration: var(--duration-swap); animation-timing-function: var(--ease-change); }
${selector}::view-transition-old(studio-content), ${selector}::view-transition-new(studio-content) { mix-blend-mode: normal; animation-duration: var(--duration-swap); animation-timing-function: var(--ease-change); }`;
export const CONTENT_SWAP_CSS: Record<string, string> = {
  cut: `${base}\n${selector}::view-transition-group(studio-content), ${selector}::view-transition-old(studio-content), ${selector}::view-transition-new(studio-content) { animation: none; }\n${selector}::view-transition-old(studio-content) { display: none; }`,
  crossfade: `${base}\n${selector}::view-transition-old(studio-content) { animation-name: studio-fade-out; }\n${selector}::view-transition-new(studio-content) { animation-name: studio-fade-in; }`,
  slide: `${base}
${selector} { --studio-direction: 1; }
${selector}[data-studio-direction="back"] { --studio-direction: -1; }
${selector}::view-transition-old(studio-content) { animation-name: studio-swap-out; }
${selector}::view-transition-new(studio-content) { animation-name: studio-swap-in; }
@keyframes studio-swap-out { to { opacity: 0; transform: translateX(calc(-100% * var(--studio-direction))); } }
@keyframes studio-swap-in { from { opacity: 0; transform: translateX(calc(100% * var(--studio-direction))); } }`,
  resize: `${base}
${selector}::view-transition-old(studio-content) { animation-name: studio-settle-out; }
${selector}::view-transition-new(studio-content) { animation-name: studio-settle-in; }
@keyframes studio-settle-out { 0% { opacity: 1; } 50%, 100% { opacity: 0; } }
@keyframes studio-settle-in { 0%, 50% { opacity: 0; } 100% { opacity: 1; } }`,
};
