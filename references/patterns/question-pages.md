# Question pages

`id: question-pages` · scale: flow · studio: no studio step · references checked: 2026-10-08

## Problem and outcome

A person has several answers to provide, but a large form makes the next decision difficult to understand. This flow presents a coherent question or small related group at a time, explains why it is needed and preserves the answers as the person moves backwards and forwards. It ends at a review or saved outcome, not at an arbitrary last screen.

## When to use / When not to use

Use for unfamiliar, conditional or consequential questions where focused guidance helps. Each question must have a reason tied to the task, an intended use and an owner for its validation rule. Ask for a piece of information once and reuse it where appropriate. Use [check-answers](check-answers.md) before a consequential commitment.

Do not split a familiar three-field edit into three routes just to display progress. A compact [create-edit](create-edit.md) form can be simpler. Independent tasks completed over several visits belong in [task-list](task-list.md). Do not use a question page to disguise an eligibility decision as an invalid answer; explain an unsuitable route and its alternatives.

## Structure and slots

- **Required — back:** an explicit route to the previous meaningful page, preserving its prior state; browser back also works.
- **Required — question heading:** a label or legend may carry the main heading for a single question. The heading must identify the actual decision.
- **Required — answer controls:** visible labels, relevant hints, explicit optional status and valid unknown/not-applicable choices where the task permits them.
- **Required — continue:** a primary action after the answer controls; only the final commitment uses its committing verb.
- **Required — error region:** a [validation](validation.md) summary plus corresponding field messages after an unsuccessful continuation.
- **Optional — progress/context:** a current section or reliable count, not an invented percentage for a branching sequence.
- **Optional — save/leave and supporting detail:** explain persistence and retention if the person can resume; secondary detail uses [disclosure](disclosure.md), not a hidden essential instruction.

## Variants

| Variant | Gain | Cost and choice |
| --- | --- | --- |
| One question per page | Makes one unfamiliar decision and its help the focus. | More navigation; choose for routing, sensitive answers or questions with substantial explanation. |
| Related question group | Keeps answers that people think of together in one place, such as an address. | More scanning and error targets; choose when splitting would break their relationship. |
| Branching sequence | Shows follow-up questions only when earlier answers make them relevant. | Progress and correction routes become conditional; choose when it removes genuinely irrelevant questions, not to conceal required work. |

## States and transitions

**Unanswered → editing → saving/validating → next question/review.** Continue validates the current answer on the server before moving on. **Invalid** redisplays the entered values and actionable errors. **Partial saved** distinguishes a stored draft from a complete answer. **Back/editing previous** restores values and relevant hints. **Changed branch** recalculates which questions are needed: do not submit now-irrelevant hidden answers, and ask newly required questions before returning to review. Retain or discard inactive answers according to a disclosed data policy, not accidentally through unmounting. **Save failed/offline** keeps the current values in the active form and explains which answers are not durably stored. **Denied/unsuitable** offers the actual alternative path. **Resumed** starts at the last meaningful unfinished question. **Submitted** cannot repeat the commitment through back navigation; show the existing [confirmation](confirmation.md).

## Data and copy contract

A question definition contains stable ID, answer type, purpose, required/optional rule, allowed choices, hint keys, validation codes, branch predicate and destination. A draft contains answer values, relevance, validity, revision and persistence acknowledgment. Store raw values where needed to redisplay errors separately from accepted normalized values. Accept unambiguous alternative formats rather than imposing a presentation-only rule. A grouped page contains one coherent topic, not a fixed arbitrary number of fields. Long legends and translated options wrap; do not clip choice labels. Unknown, omitted and not applicable are separate values when they mean different things.

All visible strings come from the copy deck: `questions.{id}.heading`, `label`, `hint`, `why`, `optional`, choice labels and error messages, plus `questionPages.back`, `continue`, `saveLeave`, `saved`, `saveFailed`, `section`, `resume`, `unsuitable`. State whether continue saves an answer. Do not use placeholder text as the only instruction or an asterisk as the only required/optional indication.

## Accessibility

Use a form, real labels and fieldsets/legends for related choices. Associate hints and errors with their controls. Avoid announcing the same question twice through a duplicated heading and label. On a new route, focus the heading; after a failed continuation, focus the error summary, whose links go to the actual invalid control. A conditional reveal does not steal focus or move the continue button ahead of a newly required input in reading order. Radios retain their standard keyboard behavior; touch labels activate their controls. Do not auto-advance after a selection. Provide 4.5:1 text contrast, 3:1 control/focus contrast, visible focus, reflow at 400% zoom and targets at least 24 by 24 CSS pixels or equivalent spacing; prefer 44 by 44 touch actions. These are implementation obligations, not tested specimen results.

## Responsive

Use one input column at phone width. Short related inputs can share a row only while labels and errors remain legible; otherwise stack them in logical order. Replace a desktop section rail with a concise section heading. Preserve back, errors and continue in the same reading sequence and keep focused fields clear of sticky UI and the keyboard.

## Motion

Use a moderate [content-swap](content-swap.md) role for deliberate next/back movement and a short disclosure role for a conditional follow-up. Neither must delay entry or validation. Under reduced motion, reveal content immediately, keep focus rules intact and use a static section label. Do not animate progress that cannot be computed accurately.

## Looks

**Quiet:** roomy single-question form. **Editorial:** expressive question heading and concise explanatory block. **Playful:** friendly option surfaces with ordinary labelled controls underneath. **Brutalist:** explicit section rules and square control outlines. **Print:** numbered questions and clear input rules. **Immersive:** stable high-contrast question panel, with decorative background kept away from controls. All looks keep errors, hints and optional status visually distinct without relying on color alone.

## References

- [GOV.UK: question pages](https://design-system.service.gov.uk/patterns/question-pages/) — checked 2026-10-08; supports purposeful questions, one-question starting point, back/heading/continue structure, answer reuse and optional labelling. Government guidance, not proof that every task benefits from more pages.
- [GOV.UK: check answers](https://design-system.service.gov.uk/patterns/check-answers/) — checked 2026-10-08; supports prefilled correction routes and newly relevant questions before review.
- [Carbon: forms](https://www.carbondesignsystem.com/building-blocks/core/patterns/forms) — checked 2026-10-08; supports logical groups and multistep/progressive forms. Carbon's blur-validation advice differs from GOV.UK; this record deliberately uses continuation-time validation by default.

## Code you can use

Candidate, not imported: [GOV.UK Frontend](https://github.com/alphagov/govuk-frontend) back-link, fieldset, radios, checkboxes, text-input, button and error-summary controls under [MIT](https://github.com/alphagov/govuk-frontend/blob/main/LICENSE.txt), checked 2026-10-08. Keep Crown copyright and the complete permission/warranty notice with adaptations. Candidate, not imported: [Carbon React](https://github.com/carbon-design-system/carbon/tree/main/packages/react) inputs and progress indicator under [Apache-2.0](https://github.com/carbon-design-system/carbon/blob/main/LICENSE), checked 2026-10-08; provide the license, retain applicable notices/NOTICE attribution and mark changed files.

Neither library implements this flow's branching, relevance or durable draft policy. Review chosen-version dependencies and media/font rights separately; no government crest, source screenshots or branded example copy is cleared by these candidate listings. No code or assets were imported and no form or assistive-technology exercise is claimed.
