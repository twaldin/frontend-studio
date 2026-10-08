const selector = `:root[data-studio-transition="theme"]`;
const base = `/* transitionStudio("theme", () => document.documentElement.classList.toggle("dark"), {x, y}) uses viewport coordinates from the theme toggle. Unsupported or reduced-motion browsers switch immediately. The host persists the chosen theme. */
${selector}::view-transition-group(root) { animation-duration: var(--duration-base); }
${selector}::view-transition-old(root), ${selector}::view-transition-new(root) { mix-blend-mode: normal; animation-duration: var(--duration-base); animation-timing-function: var(--ease); }`;
export const THEME_MOTION_CSS: Record<string, string> = {
  cut: `${base}\n${selector}::view-transition-old(root) { display: none; }\n${selector}::view-transition-new(root) { animation: none; }`,
  fade: `${base}\n${selector}::view-transition-old(root) { animation-name: studio-fade-out; }\n${selector}::view-transition-new(root) { animation-name: studio-fade-in; }`,
  circle: `${base}
${selector}::view-transition-old(root) { animation: none; }
${selector}::view-transition-new(root) { animation-name: studio-theme-circle; }
@keyframes studio-theme-circle { from { clip-path: circle(0 at var(--theme-x, 50vw) var(--theme-y, 0px)); } to { clip-path: circle(var(--theme-radius, 150vmax) at var(--theme-x, 50vw) var(--theme-y, 0px)); } }`,
  wipe: `${base}
${selector}::view-transition-old(root) { animation: none; }
${selector}::view-transition-new(root) { animation-name: studio-theme-wipe; }
@keyframes studio-theme-wipe { from { clip-path: inset(0 100% 0 0); } to { clip-path: inset(0); } }`,
};
