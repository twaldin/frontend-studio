# Board

`id: board` · `scale: surface` · `studio: boardLayout` · `references checked: 2026-10-08`

## Problem and outcome

A person coordinating work needs to see where items are stalled, who owns them and what transition is permitted next. The board exposes real stages and provides a safe way to move an item with an observable, recoverable result.

## When to use / When not to use

Use when stage membership is meaningful and work moves through a known process. Do not invent stages for a simple collection; use a list or [feed](feed.md). A prerequisite checklist is [task-list](task-list.md), not automatically a draggable board. Dragging alone must never be required.

## Structure and slots

Required: `header` names the process/scope; `primary` organizes stable item IDs by stage; stage headings show name and truthful count; items expose title, current stage and permitted move action; `state` handles empty/loading/error. Optional: `toolbar` filter, owner/area lanes, limits, item detail, creation and activity. Binding: triage → board → `detail` uses browse-inspect-act; move work → item `actions` uses control-response and async-progress. Counts include only the clearly stated scope.

## Variants

Exactly the four `boardLayout` labels:

- **Columns:** stage columns hold stacked cards. Best at showing flow and bottlenecks; wide processes need horizontal navigation and careful scroll ownership.
- **Swimlanes:** stage columns cross owner/area rows. Makes responsibilities comparable; sparse matrices waste space and demand meaningful lane data. Avoid for dozens of owners.
- **Grouped list:** items sit under stage headings in one readable list. Holds well on phones and supports dense text; cross-stage comparison takes more scrolling.
- **Pipeline:** a stage-count strip selects one stage's cards below. Fits many stages in less space; conceals neighboring items and requires unmistakable selected-stage feedback.

## States and transitions

Fetch resolves to populated, empty board, empty stage, filtered-out, denied or failed. Select opens the item's detail while preserving board scope. A permitted move enters pending, then confirmed at its destination; rejection restores the prior stage and states the reason. Concurrent changes show the current server state rather than overwriting it silently. Drag cancel/Escape makes no change. Creation failure retains entered data. Partial stage-load failure leaves other stages usable with an explicit local recovery. No success or count update is claimed before the move result is known.

## Data and copy contract

Provide ordered stage IDs/names, stable item IDs/titles, stage, optional lane/owner and real transition capabilities. Optional limits require defined thresholds. Support zero items, one crowded stage, long names and missing owners. Copy keys cover heading, counts, move destination, pending, moved, rejected/conflict, empty stage, no matches and access recovery. Never derive permission from card appearance; it comes from product capability data.

## Accessibility

Use stage sections and item lists; avoid an ARIA grid unless implementing its full keyboard model. Every draggable item also has a labeled “move to stage” control reachable with keyboard/touch. Announce completed moves with item and destination, and keep focus on the moved item or its stable action. Invalid destinations communicate reasons in text. Selected stage and limits use more than color. Ensure visible focus, 44px intended touch targets, contrast and usable zoom; dragging visuals are not the accessible status channel.

## Responsive

Grouped list stacks naturally. Columns retain labeled horizontal access or recompose into stage sections; swimlanes flatten into stage groups with owner labels. Pipeline's stage selector wraps or scrolls with all stages discoverable. Detail becomes a separate view with return to the same item/scope, not a squeezed inspector.

## Motion

Optional bounded movement can explain a confirmed stage change; do not animate every sort or refresh. Pending is text/status, not a travelling card that implies success. Still/reduced-motion cuts to the confirmed grouping with a static moved announcement and unchanged recovery behavior.

## Looks

Quiet uses restrained stage divisions; editorial gives stages clear typographic hierarchy; playful can distinguish stages without childish failure copy; brutalist emphasizes edges and counts; print reads as grouped work lists; immersive must not hide titles or drag alternatives in textured cards.

## References

- [GOV.UK patterns](https://design-system.service.gov.uk/patterns/) — checked 2026-10-08, documentation read: tasks precede component choice; not endorsement of a board for every task.
- [Carbon pattern overview](https://www.carbondesignsystem.com/building-blocks/core/patterns/overview) — checked 2026-10-08, guidance read: action/state composition; board/drag contracts above are original requirements, not exercised source behavior.
- [dev.cards](https://dev.cards/) — checked 2026-10-06 in earlier public-document research: link-only whole-section breadth; no source code, assets or branded board are copied.

## Code you can use

[Carbon core](https://github.com/carbon-design-system/carbon) controls are candidates under [Apache-2.0](https://github.com/carbon-design-system/carbon/blob/main/LICENSE), read 2026-10-08. Retain license/attribution and applicable NOTICE, mark modified files, and review a pinned source/dependency/asset set before reuse. This is not a cleared drag-and-drop board implementation. dev.cards is inherited MIT plus Commons Clause, so remains link-only here, not plain-MIT export code. No interaction or accessibility checks were run by this record's author.
