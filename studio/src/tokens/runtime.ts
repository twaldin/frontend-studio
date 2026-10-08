/** Exported verbatim as an ES module; all progress and request lifecycles remain the host's responsibility. */
export const INTERACTION_RUNTIME = `/** Wrap a real DOM update, not a delay or a simulated request.
 * kind: "content" | "route" | "theme"
 * direction: "forward" | "back"; x/y: viewport coordinates of the theme toggle.
 * Mark frequent/keyboard-triggered changes with instant: true.
 * The update must resolve after the framework commits the new DOM.
 * Calling again skips the previous visual transition, not the host's data work.
 * Focus, title, persistence and request cancellation belong in the host update/lifecycle.
 */
let currentTransition;
export async function transitionStudio(kind, update, { direction = "forward", x, y, instant = false } = {}) {
  if (!["content", "route", "theme"].includes(kind)) throw new TypeError("Unknown transition kind");
  const root = document.documentElement;
  const role = kind === "route" ? "--duration-route" : kind === "content" ? "--duration-swap" : "--duration-base";
  const durationValue = getComputedStyle(root).getPropertyValue(role).trim();
  // A role is one time token, not an arbitrary CSS list or a unitless number.
  const duration = /^(?:[0-9]+(?:[.][0-9]+)?|[.][0-9]+)(?:ms|s)$/.test(durationValue)
    ? Number.parseFloat(durationValue) * (durationValue.endsWith("ms") ? 1 : 1000)
    : 0;
  if (currentTransition) currentTransition.skipTransition();
  if (instant || !Number.isFinite(duration) || duration <= 0 || matchMedia("(prefers-reduced-motion: reduce)").matches || !document.startViewTransition) {
    await update();
    return;
  }
  root.dataset.studioTransition = kind;
  root.dataset.studioDirection = direction;
  if (kind === "theme") {
    const originX = x ?? innerWidth / 2;
    const originY = y ?? 0;
    const radius = Math.hypot(Math.max(originX, innerWidth - originX), Math.max(originY, innerHeight - originY));
    root.style.setProperty("--theme-x", originX + "px");
    root.style.setProperty("--theme-y", originY + "px");
    root.style.setProperty("--theme-radius", radius + "px");
  }
  const transition = document.startViewTransition(update);
  currentTransition = transition;
  // Native ready rejects when a visual transition is skipped, including interruption.
  // Observe that expected visual outcome immediately; actual DOM-update errors still propagate.
  const readiness = transition.ready.catch(() => undefined);
  try {
    await Promise.all([transition.updateCallbackDone, transition.finished, readiness]);
  } finally {
    if (currentTransition === transition) {
      currentTransition = undefined;
      delete root.dataset.studioTransition;
      delete root.dataset.studioDirection;
      root.style.removeProperty("--theme-x");
      root.style.removeProperty("--theme-y");
      root.style.removeProperty("--theme-radius");
    }
  }
}
`;
