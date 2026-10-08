# First run

`id: first-run` · scale: flow · studio: no studio step · references checked: 2026-10-08 (new primary guidance); 2026-10-06 (inherited link-only inspiration)

## Problem and outcome

A new person understands the promise of a product but does not yet have the knowledge, permissions or initial content needed to use it. A tour can explain controls without delivering anything useful. This flow starts at the first visit and ends at a real, inspectable result: an object created, a source connected, or a useful collection opened. Completion means the result exists, not that the person clicked through introductory slides.

## When to use / When not to use

Use when a small amount of setup is genuinely necessary before the first useful action, or when new people need a clearly offered starting point. Separate essential prerequisites from later preferences. Ask for an account only when its persistence or access control is needed; use [sign-in](sign-in.md) at that boundary.

Do not put onboarding in front of an already usable [home](home.md). For an empty collection, a local [empty state](empty-states.md) with a creation action is often enough. A large job that can take several visits belongs in a [task list](task-list.md), not a mandatory welcome carousel.

## Structure and slots

- **Required — purpose:** one heading identifying the outcome and a short explanation of what is needed now.
- **Required — starting action:** a task-specific primary action leading into the actual product workflow, not a demonstration disconnected from saved data.
- **Required — prerequisite controls:** only inputs, permissions or choices required to produce that outcome. Explain why each permission is requested before invoking its native prompt.
- **Required — exit and continuation:** a way to leave, return to previous answers, and resume a saved setup where persistence exists.
- **Required — result:** the destination object or surface with an accurate success/status message.
- **Optional — example path:** clearly identified sample content that is distinguishable from the person's own content and removable.
- **Optional — help, progress and skip:** progress only for a stable sequence; skip only for optional work. A skip must leave a usable destination.

## Variants

| Variant | Gain | Cost and choice |
| --- | --- | --- |
| Direct start | The first visit opens the real surface with one guided action. | Little room for prerequisites; choose when defaults are safe and the task can teach itself. |
| Short setup sequence | One decision at a time establishes necessary settings before the result. | Adds navigation and branching; choose when several unfamiliar answers are truly required. Use [question pages](question-pages.md). |
| Resumable setup checklist | Independent tasks can be completed or deferred across visits. | Needs durable task state and an honest definition of readiness; choose for connections, imports or permissions with external dependencies. |

## States and transitions

**New → choosing → setting up → ready:** starting selects a path; accepted prerequisites allow the actual task; the saved result makes the flow ready. Optional preferences may remain incomplete without making the result incomplete. **Returning/partial** restores accepted answers and explains the next unfinished requirement. **Invalid** uses [validation](validation.md) without clearing answers. **Permission denied** explains the affected capability and offers a valid alternative or permission instructions; it does not repeatedly invoke the prompt. **Import/connection failed** preserves completed setup and allows a targeted retry. **Unavailable** explains why the proposed path cannot work and offers another genuine path. Leaving returns to the product without claiming completion; reopening resumes rather than creating duplicate objects. Completion of an asynchronous import is a separate event from submitting its request.

## Data and copy contract

Provide a setup definition with a stable version, required task IDs, dependency IDs, saved answers and the first-result ID. Store completion per person or device according to the stated persistence policy, not merely per current browser tab. A task has a title, reason, status, destination and optional alternative. One primary outcome is required; avoid a menu of unrelated product goals. Long permission explanations expand inline without hiding the continue action. Handle no available template or connection explicitly.

All visible strings come from the copy deck: `firstRun.title`, `outcome`, `requirements`, `start`, `resume`, `skipOptional`, `leave`, `permissionReason`, `permissionDenied`, `setupFailed`, `sampleLabel`, `resultReady`. Progress copy uses the actual reachable sequence; do not display a fixed total before branching is resolved. Do not promise that data is saved until persistence acknowledges it.

## Accessibility

Use a main landmark, a meaningful page title and ordered headings. Give inputs visible labels and associated hints. On a route change, move focus to the new heading; on an inline step, keep or deliberately place focus at the step heading. Do not auto-advance after a selection. Keyboard and touch must offer the same setup, skip and help actions. Announce completion and asynchronous status changes without repeating the whole checklist. Make targets at least 24 by 24 CSS pixels or provide the applicable spacing; prefer 44 by 44 for primary touch controls. Maintain text contrast of 4.5:1, control/focus contrast of 3:1, visible focus and usable reflow at 400% zoom. These are implementation requirements, not tested claims about a specimen.

## Responsive

At phone width, use one reading/input column. Put prerequisite explanations before their controls and the primary action after them. Turn a side progress rail into a compact current-step summary; do not remove exit or resume controls. Native permission sheets and the on-screen keyboard must not hide the reason for the request or a way back.

## Motion

Use the short control-response role for presses and a moderate content-swap role for a deliberate step change, as defined by [motion-language](motion-language.md). Motion may connect a created result to its destination, but never delay access to it. Under reduced motion, replace spatial movement and celebratory effects with an immediate update and a static completion statement. Status must remain understandable without animation.

## Looks

**Quiet:** plain setup column and restrained progress. **Editorial:** strong outcome heading with concise supporting text. **Playful:** friendly task markers, not compulsory mascots or confetti. **Brutalist:** hard divisions and explicit step numbers. **Print:** numbered instructions, ruled groups and a readable result summary. **Immersive:** a stable, high-contrast setup panel over optional atmosphere. Every look keeps skip, permission reasons and failures as legible as the happy path.

## References

- [GOV.UK: content and transactions](https://www.gov.uk/service-manual/design/govuk-content-transactions) — checked 2026-10-08; supports concise upfront orientation and guidance delivered at the relevant task. Government service guidance, not evidence that a commercial onboarding tour improves activation.
- [GOV.UK: create accounts](https://design-system.service.gov.uk/patterns/create-accounts/) — checked 2026-10-08; supports avoiding unnecessary accounts and postponing an account boundary until needed.
- [Carbon: forms](https://www.carbondesignsystem.com/building-blocks/core/patterns/forms) — checked 2026-10-08; supports necessary inputs, logical grouping and progressive disclosure. Does not define this first-result completion model.
- [VantaUI](https://www.vantaui.com/) — inherited public-source research dated 2026-10-06; link-only exploration of packaged UI categories. No component corpus fetched for this record; no usability evidence or reuse clearance inferred.

## Code you can use

Candidate, not imported: [GOV.UK Frontend](https://github.com/alphagov/govuk-frontend) button, back-link and form controls, under [MIT](https://github.com/alphagov/govuk-frontend/blob/main/LICENSE.txt), checked 2026-10-08. Retain Crown copyright and the full permission/warranty notice with adapted code. Candidate, not imported: [Carbon React](https://github.com/carbon-design-system/carbon/tree/main/packages/react) form controls and progress indicator under [Apache-2.0](https://github.com/carbon-design-system/carbon/blob/main/LICENSE), checked 2026-10-08; retain applicable notices, provide the license, mark changed files and carry any applicable upstream NOTICE attribution.

These candidates supply controls, not permission handling, persistence or an activation backend. Check the chosen version, dependency licenses and asset rights separately; use original copy and independently licensed fonts/media, not government branding or source screenshots. VantaUI remains link-only because access is plan-limited/proprietary; permission to view it is not permission to redistribute a kit. No code, prose or assets have been copied into this record, and no interaction/accessibility exercise is claimed.
