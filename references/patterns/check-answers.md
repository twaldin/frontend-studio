# Check answers

`id: check-answers` · scale: flow · studio: no studio step · references checked: 2026-10-08

## Problem and outcome

A person has entered information over several steps and needs to know exactly what will be committed. A final button alone gives no opportunity to catch a wrong value or an unintended scope. This flow presents relevant answers in readable groups, lets the person correct a specific answer and returns them directly to review. It ends only when the explicit commitment succeeds.

## When to use / When not to use

Use before a consequential submission, purchase-related decision or multi-page transaction where the whole set of answers has not been visible together. Use a section review for a long transaction when separate sections have meaningful owners or boundaries.

Do not add a review page after every low-risk toggle or short edit. [Create-edit](create-edit.md) can show the values and save action together. An already committed result uses [confirmation](confirmation.md), not a review with a still-active submit button. Validation failures belong in [validation](validation.md); review is not a substitute for checking data on the server.

## Structure and slots

- **Required — review heading:** identifies the action still to be completed; do not label an unsubmitted draft as complete.
- **Required — answer groups:** labels, formatted values and relevant section headings. Preserve enough detail to catch an error, including quantity, units and selected options.
- **Required — correction links:** each names the answer or group it changes and opens the prefilled editing context.
- **Required — commitment region:** an action-specific button plus any necessary declaration or consequences, after the answers.
- **Required — error/status region:** stale-data, missing-answer, saving and failed-submission outcomes remain visible near the review.
- **Optional — repeated-object cards:** one named group per object with its own edit/remove actions.
- **Optional — back/save/leave:** preserve the draft, distinguish a saved draft from submission, and state whether another person can change it.

## Variants

| Variant | Gain | Cost and choice |
| --- | --- | --- |
| Single final review | Presents the complete relevant transaction immediately before commitment. | Can be long; choose for small and medium journeys with one submission. |
| Section review plus final commitment | Allows meaningful sections to be checked as a long job progresses. | A section check can be mistaken for final submission; choose when sections have real boundaries and explain what remains. |
| Repeated-object summary | Named cards make similar entries and their corrections distinguishable. | More headings/actions; choose for several participants, items or destinations, rather than an ambiguous repeating list of labels. |

## States and transitions

**Loading draft → ready for review → committing → committed** leads to [confirmation](confirmation.md). **Change requested → editing → valid change → review** returns to the same group rather than forcing a replay of the remaining sequence. If an edit changes branching, collect newly required answers first. **Missing/invalid answer** provides a direct repair route and preserves other answers. **Stale revision** shows that the saved information changed and requires review of the current version before commitment; do not silently commit the version displayed earlier. **Commit failed** keeps the review and indicates whether the outcome is known. **Outcome unknown** checks the existing operation's status rather than inviting an immediate duplicate submission. **Already committed** replaces the commit action with the existing result. Optional unanswered values are visible as omissions; irrelevant branches are omitted, not presented as unexplained blanks.

## Data and copy contract

Supply a versioned draft, relevant answer groups, stable field IDs, display labels, formatted values, correction destinations and a commitment definition. The commitment references the exact reviewed revision. Display values derive from stored answers, not a second divergent form model. Distinguish omitted optional information, an explicit negative answer and an unknown answer. Sensitive values may be masked only if another safe method lets the person verify what will be used. Long text expands or wraps; an ellipsis alone cannot support a consequential review. One final commitment is required; any section-level save/check action has a different name and result.

Every visible string comes from the copy deck: `checkAnswers.title`, `notSubmitted`, `groupHeading`, `change`, `changeNamed`, `notProvided`, `declaration`, `commitAction`, `saving`, `failed`, `outcomeUnknown`, `changedElsewhere`, `alreadySubmitted`, `saveLeave`. Currency, dates, addresses and units use the product's locale formatting, not raw storage values. The copy states the actual outcome, such as sending a request, not a generic completion claim.

## Accessibility

Use a description list for label/value summaries or named sections/cards for repeated objects. Use links for correction navigation and a button for commitment. Repeated change links have distinct accessible names while retaining a concise visible label. Keep each action close to its value for magnifier use. The correction page receives focus at its heading; return focus to the changed group's heading or change link, and announce a saved update if it occurs in place. Failed commitment focuses a linked error/status summary. All correction routes work without pointer hover. Support visible focus, 4.5:1 text contrast, 3:1 control/focus contrast, 400% zoom reflow and at least 24 by 24 CSS-pixel targets or appropriate spacing; prefer 44 by 44 touch actions. No accessibility testing is asserted by this contract.

## Responsive

At phone width, stack label, value and change action within each row, preserving associations. Keep long values readable without horizontal scrolling. Put the commitment after the summary and declaration, not in a floating header that hides what is being accepted. Repeated cards stay individually named; narrow width does not collapse all answers into closed accordions.

## Motion

Use a moderate route/content transition for correction and return, and a brief local acknowledgment for an updated answer. Do not animate every unchanged row or scroll automatically past the changed answer. Reduced motion uses immediate replacement, explicit focus placement and a static saved statement. [Async-progress](async-progress.md) handles an actual commitment wait; an animation is not proof of success.

## Looks

**Quiet:** neutral summary rows and restrained separators. **Editorial:** section headings give the review a readable hierarchy. **Playful:** subtle object markers distinguish repeated groups without weakening serious consequences. **Brutalist:** strong rules and an explicit commit block. **Print:** a document-like summary with readable values and named corrections. **Immersive:** an opaque summary surface and stable action region. All preserve omissions, change links and the unsubmitted status.

## References

- [GOV.UK: check answers](https://design-system.service.gov.uk/patterns/check-answers/) — checked 2026-10-08; supports final/section review, repeated summary cards, relevant answers, prefilled correction and a direct return to review. Does not specify this record's concurrency protocol.
- [GOV.UK: question pages](https://design-system.service.gov.uk/patterns/question-pages/) — checked 2026-10-08; supports preserving answers through back navigation and avoiding repeat entry.
- [Carbon: forms](https://www.carbondesignsystem.com/building-blocks/core/patterns/forms) — checked 2026-10-08; supports meaningful grouping and task-specific action labels. Documentation read only, not an exercised review flow.

## Code you can use

Candidate, not imported: [GOV.UK Frontend](https://github.com/alphagov/govuk-frontend) summary-list/summary-card, back-link and button controls under [MIT](https://github.com/alphagov/govuk-frontend/blob/main/LICENSE.txt), checked 2026-10-08. Retain Crown copyright and the full permission/warranty notice. Candidate, not imported: [Carbon React](https://github.com/carbon-design-system/carbon/tree/main/packages/react) form controls under [Apache-2.0](https://github.com/carbon-design-system/carbon/blob/main/LICENSE), checked 2026-10-08; retain applicable notices, provide the license, mark modified files and carry applicable NOTICE attribution.

The review/correction routing, revision check and submission service must be implemented independently. Clear the selected dependency versions and any fonts/media separately; code licensing does not grant government branding or screenshot rights. This is original prose with no code or assets imported, and no tested accessibility or transaction claim.
