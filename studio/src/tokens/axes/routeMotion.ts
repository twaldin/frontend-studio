const selector = `:root[data-studio-transition="route"]`;
const base = `/* Give the content region .studio-page; the shell stays outside it. transitionStudio("route", update, {direction}) wraps the actual navigation. Restore route focus and document title after navigation. Continuity needs exactly one matching .studio-item in the old and new view. */
.studio-page { view-transition-name: studio-page; }
${selector}::view-transition-old(root), ${selector}::view-transition-new(root) { animation: none; }
${selector}::view-transition-group(studio-page) { animation-duration: var(--duration-route); animation-timing-function: var(--ease-change); }
${selector}::view-transition-old(studio-page), ${selector}::view-transition-new(studio-page) { mix-blend-mode: normal; animation-duration: var(--duration-route); animation-timing-function: var(--ease); }`;
export const ROUTE_MOTION_CSS: Record<string, string> = {
  cut: `${base}\n${selector}::view-transition-group(studio-page), ${selector}::view-transition-old(studio-page), ${selector}::view-transition-new(studio-page) { animation: none; }\n${selector}::view-transition-old(studio-page) { display: none; }`,
  fade: `${base}\n${selector}::view-transition-old(studio-page) { animation-name: studio-fade-out; }\n${selector}::view-transition-new(studio-page) { animation-name: studio-fade-in; }`,
  axis: `${base}
${selector} { --studio-direction: 1; }
${selector}[data-studio-direction="back"] { --studio-direction: -1; }
${selector}::view-transition-old(studio-page) { animation-name: studio-route-out; }
${selector}::view-transition-new(studio-page) { animation-name: studio-route-in; }
@keyframes studio-route-out { to { opacity: 0; transform: translateX(calc(-32px * var(--studio-direction))); } }
@keyframes studio-route-in { from { opacity: 0; transform: translateX(calc(32px * var(--studio-direction))); } }`,
  continuity: `${base}
.studio-item { view-transition-name: studio-item; }
${selector}::view-transition-old(studio-page) { animation-name: studio-fade-out; }
${selector}::view-transition-new(studio-page) { animation-name: studio-fade-in; }
${selector}::view-transition-group(studio-item) { animation-duration: var(--duration-route); animation-timing-function: var(--ease-change); }
${selector}::view-transition-old(studio-item), ${selector}::view-transition-new(studio-item) { animation-duration: var(--duration-route); mix-blend-mode: normal; }`,
};
