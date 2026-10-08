# Task list

`id: task-list` · scale: flow · studio: no studio step · references checked: 2026-10-08; 2026-10-06 (inherited link-only inspiration)

## Problem and outcome

A person must complete a job made of several meaningful tasks, often with pauses or external dependencies. A linear wizard makes them replay finished work, while an undifferentiated menu fails to show what remains. This flow gives each task a durable status and a clear entry point, so the person can plan, resume and reach a distinct final commitment. Completing every task is not itself submission unless the product explicitly makes it so.

## When to use / When not to use

Use for longer transactions that can span sessions, with tasks that have their own coherent outcomes. Permit any order that the real dependencies allow. Show the list on first entry and return visits. Pair it with [question-pages](question-pages.md) inside individual tasks and [check-answers](check-answers.md) before final commitment.

Do not use a task list for a short form that can be simplified. A known linear sequence uses question pages or a progress indicator instead. A list of work items that changes stage is a [board](board.md), not the person's transaction checklist. Do not invent dependencies merely to force a particular reading order.

## Structure and slots

- **Required — job identity:** title, relevant draft/reference and whether the job is still unsubmitted.
- **Required — tasks:** verb-led names, stable destinations and a textual status for every task.
- **Required — dependency explanation:** a blocked task states which real prerequisite prevents starting; unavailable tasks are not misleading live links.
- **Required — continuation:** accessible entry into any available task and a return to the list after saving it.
- **Required — persistence/status:** saved progress, resumed state and failures that could affect completion.
- **Required when applicable — final commitment:** a separately named action available after the actual required tasks are complete.
- **Optional — grouping:** meaningful stages with headings, a compact completed/required count, due dates or optional tasks explicitly marked as such.
- **Optional — external task acknowledgment:** a person-confirmed completion step when the system cannot observe the work directly.

## Variants

| Variant | Gain | Cost and choice |
| --- | --- | --- |
| Flat task list | Makes a small set of independent tasks easy to scan and choose. | Loses usefulness as unrelated tasks accumulate; choose for one coherent job without major stages. |
| Grouped task list | Organises a longer job into meaningful stages while preserving open choice. | More headings and status logic; choose when groups explain the work, not merely to shorten a screen. |
| Dependency-led task list | Shows available work and why later tasks cannot yet start. | Requires accurate dependency recomputation and repair paths; choose only when prerequisite outputs are genuinely necessary. |

## States and transitions

A task can be **not started**, **in progress**, **completed**, **blocked**, or **needs attention** after a previously valid answer becomes insufficient. Entering a task does not complete it. Saving a partial answer makes it in progress; accepted required answers or an explicit justified acknowledgment make it completed. Editing a prerequisite can reopen dependent tasks and must explain why. **External waiting** identifies the external event that will unblock work rather than estimating progress from elapsed time. **Saving failed/offline** leaves durable status unchanged and says which progress was not stored. **Resume/loading** reads the latest saved job before showing counts. **Access denied** explains how to regain legitimate access without exposing another person's answers. **All required tasks completed** enables review/submission, not an automatic commitment. **Submitting → submitted** leads to [confirmation](confirmation.md). A revisit to a submitted job shows its result and permitted changes, not an active duplicate submit action.

## Data and copy contract

A job has ID, revision, submission status and task definitions. A task has ID, name key, group, required flag, dependencies, saved revision, completion rule, status reason and route. Completion is derived from meaningful persisted evidence; an answered field count is insufficient if answers can be invalid. For externally performed work, record who acknowledged it and when, and label the acknowledgment honestly. Supply zero, partial and complete cases; a job with no remaining tasks explains the next action rather than showing an empty list. Long task names and dependency reasons wrap. Counts use required tasks consistently; optional tasks must not make a complete job appear incomplete.

Every visible string comes from the copy deck: `taskList.title`, `unsubmitted`, `resume`, `progressCount`, task names/hints, `notStarted`, `inProgress`, `completed`, `blocked`, `blockedReason`, `needsAttention`, `externalWaiting`, `saveFailed`, `review`, `commitAction`, `alreadySubmitted`. Status names describe the task, not the user's competence. Do not display a saved timestamp until storage confirms the save.

## Accessibility

Use semantic lists with section headings, real task links and status text associated with each link. A disabled-looking task is not a keyboard trap or a clickable link to nowhere; present its name and reason as readable content. Status is not conveyed through tag color alone. Focus the task heading on entry and return to the task's link or list heading after completion; announce a changed status once. Keep logical reading/tab order even when statuses align at the right on wide screens. Offer every task and help action to keyboard and touch. Provide visible focus, 4.5:1 text contrast, 3:1 control/focus contrast, usable reflow at 400% zoom and at least 24 by 24 CSS-pixel targets or equivalent spacing; prefer 44 by 44 touch links. No task-list accessibility exercise is claimed.

## Responsive

At phone width, stack each task's name, hint and status together. Preserve stage headings and dependency explanations; do not move statuses into an unrelated column. A desktop summary rail becomes a compact count above the list. Keep resume/save and final commitment reachable in ordinary document flow.

## Motion

Use a short status-feedback role when a task becomes completed and a moderate route role when entering work. Do not reorder completed tasks during a focus interaction or animate a fabricated completion percentage. Under reduced motion, update the textual status immediately and preserve position. Long waits use [async-progress](async-progress.md), not a pulsing task tag.

## Looks

**Quiet:** restrained rows and plain completed text. **Editorial:** meaningful stage headings and readable task descriptions. **Playful:** distinct static task markers without game-like completion pressure. **Brutalist:** strong row rules and explicit status words. **Print:** numbered groups and documentary progress. **Immersive:** high-contrast task surface with stable reading order. Each look keeps blocked reasons and incomplete tasks as clear as completed ones.

## References

- [GOV.UK: complete multiple tasks](https://design-system.service.gov.uk/patterns/complete-multiple-tasks/) — checked 2026-10-08; supports multi-session use, grouping, textual statuses, flexible ordering and person-confirmed completion for some tasks. Replaces the retired task-list-pages URL; no source usability result is transferred to this implementation.
- [Carbon: forms](https://www.carbondesignsystem.com/building-blocks/core/patterns/forms) — checked 2026-10-08; supports grouped input and saved multistep work, not this dependency model.
- [PaceUI](https://paceui.com/) — inherited public-source research dated 2026-10-06; link-only UI exploration. Access and licenses vary by item; it supplies no evidence for completion rules or accessibility here.

## Code you can use

Candidate, not imported: [GOV.UK Frontend](https://github.com/alphagov/govuk-frontend) task-list and tag controls under [MIT](https://github.com/alphagov/govuk-frontend/blob/main/LICENSE.txt), checked 2026-10-08. Retain Crown copyright and the full permission/warranty notice. Candidate, not imported: [Carbon React](https://github.com/carbon-design-system/carbon/tree/main/packages/react) progress indicator and form primitives under [Apache-2.0](https://github.com/carbon-design-system/carbon/blob/main/LICENSE), checked 2026-10-08; retain applicable notices/NOTICE attribution, include the license and mark modified files.

These are rendering/control candidates, not task dependency or persistence services. Audit selected-version dependencies and media/fonts separately. PaceUI stays link-only because per-item rights and access are not established; no kit, screenshots or source assets are imported. All prose is original and documentation-only research is not a tested accessibility claim.
