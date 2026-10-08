const base = `/* Async state comes from the real request. Set aria-busy on the region; use a role=status line for pending/success and role=alert for actionable failure. Retain input on failure. Never manufacture elapsed time, completion, percent or an ETA. */
.studio-async { display: grid; gap: .75rem; }
.studio-async[data-state="error"] { color: var(--destructive-text); }
.studio-async[data-state="success"] { color: var(--success-text); }`;
export const ASYNC_FEEDBACK_CSS: Record<string, string> = {
  spinner: `${base}
.studio-spinner { display: inline-block; width: 1em; height: 1em; border: 2px solid var(--border); border-top-color: currentColor; border-radius: 50%; animation: studio-spin .8s linear infinite; }
@keyframes studio-spin { to { transform: rotate(1turn); } }`,
  skeleton: `${base}
.studio-skeleton { background: var(--muted); border-radius: var(--radius); min-height: 1em; }
/* Skeleton geometry should match the known result. No looping shimmer; text status carries the pending state. */`,
  progress: `${base}
.studio-progress { appearance: none; width: 100%; height: .5rem; border: 0; border-radius: var(--radius); overflow: hidden; background: var(--muted); accent-color: var(--primary); }
.studio-progress::-webkit-progress-bar { background: var(--muted); }
.studio-progress::-webkit-progress-value { background: var(--primary); }
.studio-progress::-moz-progress-bar { background: var(--primary); }
/* Bind <progress max=total value=completed> to actual units; omit value when total is unknown. Report remaining time only if the backend measures it. */`,
  steps: `${base}
.studio-steps { display: grid; gap: .5rem; list-style: none; padding: 0; margin: 0; }
.studio-steps > li { border-inline-start: 2px solid var(--border); padding-inline-start: .75rem; }
.studio-steps > li[data-state="done"] { border-color: var(--success); }
.studio-steps > li[data-state="running"] { border-color: var(--primary); }
.studio-steps > li[data-state="error"] { border-color: var(--destructive); }
/* Include a text state on each item. Retry only the failed operation when the service supports it. */`,
};
