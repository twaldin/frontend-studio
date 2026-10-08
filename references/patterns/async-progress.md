# Async progress

`id: async-progress` · `scale: interaction` · `studio: asyncFeedback` · `references checked: 2026-10-08`

## Problem and outcome

A person waiting for work needs to know that the request was accepted, what is happening and what can be done if it fails. Progress reflects actual lifecycle or measurable work; it does not invent a percentage to make waiting feel shorter.

## When to use / When not to use

Use for a noninstant operation, result fetch or measurable multistep job. Instant actions need [control-response](control-response.md), not a flash of unnecessary loading chrome. Absence after loading is [empty-states](empty-states.md). A delegated execution ledger can use [agent-activity](agent-activity.md). Never make a spinner the only explanation for a long or blocked task.

## Structure and slots

Required: `status` names the operation/current phase; `indicator` matches what is known; `outcome` exposes success, partial result or failure; `recovery` offers a supported next action when applicable. Optional: cancel, elapsed/estimated time, detailed steps, accessible progress value and background-task link. Bind the initiating surface's action/result `pending` slot to this record; the same operation ID connects progress and result. Duplicate submission policy is explicit and does not disable unrelated work.

## Variants

Exactly the four `asyncFeedback` labels:

- **Inline spinner:** a local busy mark plus status beside the initiating action. Good for short, indeterminate operations; poor for full-page loads or long work without phase/context.
- **Skeleton:** static shapes reserve an expected result layout. Good for initial content loads with known structure; gives no backend progress and must not imply nonexistent results. Avoid shimmer as a requirement.
- **Progress bar:** measured value/max with percentage and time estimate only when supported. Good for uploads/exports; inaccurate totals or invented countdowns undermine trust. Unknown work becomes indeterminate text, not fake determinate progress.
- **Step list:** named steps report actual completion and the active/blocked stage. Good for bounded pipelines; requires real checkpoints, handles plan revisions, and must not tick on timers unrelated to work.

## States and transitions

Idle → queued/active → succeeded, partially succeeded, failed or cancelled. Awaiting input is a separate blocked state with a real intervention route. Cancellation enters cancelling until acknowledged; a disconnected client reports uncertainty rather than claiming cancellation. Failure removes the false busy promise and identifies known recovery. Retry states whether it resumes or restarts and preserves useful prior output. A request/result identity prevents stale progress from overwriting a newer operation. Success is confirmed by the operation result, never by elapsed time or a bar reaching a scheduled end.

## Data and copy contract

Operation ID, status, operation label, actual result/error and permitted recovery/cancel actions. Determinate work supplies value/max/unit; estimates include basis/update time. Step lists supply ordered step IDs/labels/statuses. Support unknown duration, zero progress, partial output, long step names and no cancellability. Copy keys cover queued/active/blocked, cancel/cancelling/cancelled, done/partial/failed, retry and estimate qualification. All visible copy comes from the deck, not raw backend stack traces.

## Accessibility

Expose busy state on the affected region without hiding usable existing content. Determinate indicators use progress semantics with values; indeterminate text has no fabricated numeric value. A restrained live status announces phase/outcome, not every percentage or skeleton shape. Keep focus on the initiating control where possible; if removed, choose a stable result/heading target. Controls have keyboard/touch equivalents, 44px intended targets, contrast and visible focus. Non-color text distinguishes active/failed/done; zoom does not obscure recovery.

## Responsive

Progress/status wraps beside or below the action. Step lists become vertical; labels remain readable. Skeletons match the narrow layout, not desktop widths squeezed down. Cancel and recovery remain reachable without a full-screen blocking overlay for unrelated work.

## Motion

Indeterminate spin may communicate active work; skeleton shimmer is optional. Short state feedback uses motion-language response timing; no success delay is required before exposing the result. Still/reduced-motion replaces spinning/shimmering with static status and updates real values/checkmarks immediately. Timers cannot fabricate progress in any language.

## Looks

Quiet uses local status; editorial emphasizes phase labels; playful may accent a genuine completion; brutalist makes numbers/units explicit; print uses a clear ledger/bar; immersive protects status/recovery contrast. No look replaces work evidence with a thinking effect.

## References

- [Carbon inline loading](https://www.carbondesignsystem.com/building-blocks/core/components/inline-loading/guidelines) — checked 2026-10-08, guidance read: local loading and inactive/active/finished/error states. Its preview was not exercised; this record does not adopt its timed success delay as a requirement.
- [GOV.UK button](https://design-system.service.gov.uk/components/button/) — checked 2026-10-08, documentation read: truthful action wording and considered disabled states; not backend cancellation evidence.
- [EasyUI](https://easyui.site/) and [PaceUI](https://paceui.com/) — checked 2026-10-06 in earlier public-document research: link-only loading/activity breadth, not measured timing or accessibility results.

## Code you can use

[Carbon InlineLoading source](https://github.com/carbon-design-system/carbon/tree/main/packages/react/src/components/InlineLoading) is a candidate under [Apache-2.0](https://github.com/carbon-design-system/carbon/blob/main/LICENSE), license read 2026-10-08. Guidance names the source; code was not imported or runtime-audited here. Keep license/attribution, applicable NOTICE and modification notices; pin/review dependencies/assets before adaptation. EasyUI/PaceUI remain inspiration links under the index posture. Docs-only reading did not exercise asyncFeedback specimens or establish accessibility conformance.
