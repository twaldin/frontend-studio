# Validation

`id: validation` · scale: flow · studio: no studio step · references checked: 2026-10-08

## Problem and outcome

A person tries to continue with information the service cannot use. A red outline, a disabled button or a generic failure message does not explain how to recover. This flow identifies the specific correction, preserves the entered answers and provides a direct route to each affected control. It ends when accepted information reaches the intended next step, without requiring unrelated answers to be entered again.

## When to use / When not to use

Use for missing required answers, impossible values, ambiguous formats or domain rules that genuinely make an answer unusable. Prefer clear questions and tolerant handling of unambiguous formats before adding error states. Pair with [question-pages](question-pages.md), [create-edit](create-edit.md) or [checkout](checkout.md).

Do not label lack of eligibility or permission as a badly entered field. Explain the actual restriction and next options. Infrastructure failure uses [error-pages](error-pages.md) or an in-context service-failure message. A payment decline is not automatically a malformed card number. A warning about a plausible but unusual answer should allow confirmation where the service permits it, rather than making valid information impossible to submit.

## Structure and slots

- **Required — form context:** the question, labels, constraints and optional/required status remain visible.
- **Required — error summary after attempted continuation:** concise linked messages, in form order, with the same wording as each corresponding field message.
- **Required — inline message:** an actionable explanation associated with each affected control or field group; an error mark alone is insufficient.
- **Required — retained values:** preserve the person's entered values, including malformed ones that they need to inspect.
- **Required — retry action:** the original task-specific continue/save action remains available for correction.
- **Required — status distinction:** service failures and unresolved remote checks are separate from correctable input errors.
- **Optional — preventative feedback:** character limits, format examples or a deliberate availability check where helpful; avoid announcing every intermediate keystroke as a failure.

## Variants

| Variant | Gain | Cost and choice |
| --- | --- | --- |
| Submit-time summary and inline errors | Gives one coherent repair path after the person indicates readiness. | Delays feedback until continuation; choose as the default for question journeys and unfamiliar input. |
| Explicit field check | A named check action confirms availability or verifies a costly answer before final submission. | Introduces another action and a stale-result risk; choose when the person needs an external check with an identifiable result. |
| Bounded preventative feedback | Shows a useful limit or requirement while composing, such as remaining characters. | Can interrupt slow typing or become noisy; choose only for a specific demonstrated need, with restrained announcements and final server validation. |

## States and transitions

**Pristine → editing → validation requested → accepted/invalid.** Do not show a required-field error before the person has attempted the relevant action. **Invalid → correcting → revalidation** preserves other answers and removes a message only when that rule is known to pass; do not imply remote validity from local editing. **Remote check pending** names the check and does not masquerade as invalid. **Remote check unavailable** offers retry or a real alternative, not a fabricated answer. **Cross-field invalidity** identifies the relationship and links to the first useful repair control. **Conflict/stale rule** explains what changed and permits review of the current requirement. **Submission failure** keeps values without inventing field errors. **Accepted** removes obsolete summary/title error state and proceeds normally. A later edited value invalidates any earlier check that depended on it.

## Data and copy contract

Each validation result has stable rule code, field or group ID, severity, message key and parameters; summaries derive from the same result set as inline messages. Define accepted formats and normalization separately from display constraints. Keep raw entered values for correction while protecting secret fields under the security policy. Server validation is authoritative even when local feedback exists. A request revision or value token prevents an old remote result from marking a newer answer valid. One field can have several failed rules, but present a useful first correction rather than an overwhelming cascade. Long messages wrap and do not push the associated field out of reach.

Every visible string comes from the copy deck: `validation.summaryTitle`, `errorTitlePrefix`, rule-specific `required`, `format`, `range`, `crossField`, `unavailable`, `checking`, `checkAction`, `checkPassed`, `retry` and limit feedback. Messages state the required correction with actual limits or examples; avoid vague invalid-value wording or blame. Give essential constraints before entry, not only after failure. Error keys must not expose technical payloads or private service details.

## Accessibility

Use visible labels, fieldsets for grouped answers and `aria-describedby` links to hints/errors. Set `aria-invalid` when the current result is invalid, not simply when a field is focused. After failed submission, prefix the document title with the localised error indicator and move focus to a focusable summary whose links reach the affected inputs. Do not announce the summary twice by combining unnecessary live-region repetition with focus. Keep error wording consistent between summary and inline message. Native browser blocking validation and a custom summary must not compete; when using this record's custom flow, suppress native blocking UI and provide the complete equivalent, including required/optional semantics. Keyboard and touch both reach every repair route. Use visible focus, 4.5:1 text contrast, 3:1 control/focus contrast, non-color error cues, 400% zoom reflow and targets at least 24 by 24 CSS pixels or suitable spacing; prefer 44 by 44 touch actions. These are requirements, not an audit result.

## Responsive

Place errors immediately beside/below their control in the reading order; at phone width, stack grouped fields if messages would otherwise become detached. Keep the summary above the form. Sticky actions and the keyboard must not obscure a focused invalid field. Do not shorten an error by dropping the actual constraint or correction.

## Motion

Use a short feedback role to reveal a stable error message; do not shake fields, flash borders or continuously pulse an error. Scroll/focus changes must target a real correction and avoid disorienting movement. Reduced motion uses immediate display and non-animated focus/scroll placement. Pending checks can use static working text from [async-progress](async-progress.md).

## Looks

**Quiet:** restrained border plus explicit text. **Editorial:** readable summary and plain corrective explanation. **Playful:** friendly non-blaming copy without jokes or wobbling controls. **Brutalist:** strong error rule and clear label. **Print:** an error prefix and documentary correction text, legible in monochrome. **Immersive:** opaque error region and high-contrast focus. No look may rely on red alone or sacrifice legible helper text.

## References

- [GOV.UK: validation](https://design-system.service.gov.uk/patterns/validation/) — checked 2026-10-08; supports tolerant formats, retained answers, server validation, summary/inline messages and continuation-time validation. Its claims about GOV.UK components are not claims about this implementation.
- [GOV.UK: error summary](https://design-system.service.gov.uk/components/error-summary/) — checked 2026-10-08; supports focused, linked summaries and consistent message wording, including single-error cases.
- [Carbon: forms](https://www.carbondesignsystem.com/building-blocks/core/patterns/forms) — checked 2026-10-08; supports specific inline correction and service-level notifications. It recommends blur validation in cases where GOV.UK advises waiting; this record chooses submit-time default, with explicit/limited checks as separate variants rather than claiming consensus.

## Code you can use

Candidate, not imported: [GOV.UK Frontend](https://github.com/alphagov/govuk-frontend) error-summary/error-message and form controls under [MIT](https://github.com/alphagov/govuk-frontend/blob/main/LICENSE.txt), checked 2026-10-08. Retain Crown copyright and the complete permission/warranty notice. Candidate, not imported: [Carbon React](https://github.com/carbon-design-system/carbon/tree/main/packages/react) invalid input states and inline notifications under [Apache-2.0](https://github.com/carbon-design-system/carbon/blob/main/LICENSE), checked 2026-10-08; provide the license, retain relevant notices/NOTICE attribution and mark modified files.

These controls do not define domain validation rules or prove service accessibility. Clear chosen-version dependencies, fonts and media separately; do not copy branded examples or screenshots. This original record imports no code/assets and reports no exercised validation or assistive-technology result.
