# Confirmation

`id: confirmation` · scale: flow · studio: no studio step · references checked: 2026-10-08

## Problem and outcome

A person has committed a task and needs to know whether it worked, what happens next and how to prove or revisit the outcome. An animated tick or a fleeting toast cannot serve as a durable receipt. This flow starts from an acknowledged operation and ends with a readable result, a record the person can retain and a clear next action. A request received is not the same as an application approved, an item delivered or a payment settled.

## When to use / When not to use

Use after a significant submission, payment or creation where the person needs a reference, expected follow-up or evidence of completion. Link from [checkout](checkout.md), [check-answers](check-answers.md) or a consequential [create-edit](create-edit.md) operation.

Do not use a large confirmation page for every low-risk in-place change; [notifications](notifications.md) can acknowledge an edit without taking the person away. A still-running operation uses [async-progress](async-progress.md). A failed or unknown commitment must not appear as successful confirmation while the interface waits for an answer.

## Structure and slots

- **Required — outcome heading:** states exactly what is complete, with status independent of an icon or color.
- **Required — result identity:** the affected object or transaction, plus a selectable reference if the system issues one.
- **Required — next steps:** what will happen, who acts next and an honest timeframe or an explicit statement that no timeframe is known.
- **Required — durable record:** an available print/download/save route, or a link to the persistent receipt; choose a format the product can actually provide.
- **Required — support/revisit:** an appropriate contact or recovery destination and a helpful result when the URL is reopened.
- **Optional — delivery status:** confirmation-message destination and whether it has actually been sent; receipt delivery does not define operation success.
- **Optional — next task/feedback:** a relevant continuation separate from the receipt, with feedback lower priority than essential next steps.

## Variants

| Variant | Gain | Cost and choice |
| --- | --- | --- |
| Confirmation page | Gives the result, reference and next steps a durable, bookmarkable destination. | Changes context; choose for a major transaction or a receipt the person may need later. |
| Persistent in-context result | Keeps the newly created object or changed surface visible with an outcome region. | Must remain discoverable after transient feedback disappears; choose when the object itself is the durable result. |
| Submitted-with-follow-up receipt | Confirms receipt now while explicitly separating later review, delivery or fulfillment. | Requires accurate ongoing status and contact information; choose when acceptance is not the final real-world outcome. |

## States and transitions

**Checking operation → confirmed** only after the service acknowledges the relevant outcome. **Pending downstream work** shows what was accepted and what remains, without using final approval language. **Receipt delivery pending/failed** keeps the confirmed operation visible and offers a real resend or alternative save route. **Revisited** resolves to the same result, not a new submission. **Access required** routes through [sign-in](sign-in.md) and returns to the receipt without exposing private data. **Expired/unavailable receipt** explains how to retrieve the result using the reference or support route. **Unknown outcome** keeps a status-check destination and warns against repeating the action until resolved. **Known failure** offers the appropriate correction/retry path rather than a success panel. Browser back after confirmation must not resubmit the operation; a request to start again creates a separate, explicitly named task.

## Data and copy contract

Provide operation ID, result status, outcome time, affected object summary, optional reference, next-step responsibilities, timeframe source, support destination and record-export capability. A receipt is based on persisted service data, not whatever remains in a browser form. One primary outcome is required; several affected items may be grouped beneath it with stable names. Long references wrap and can be selected/copied; never truncate the only retrieval key. Mask personal details where appropriate while leaving enough information to recognise the transaction. Omit absent reference/download/delivery claims rather than showing invented values.

All visible strings come from the copy deck: `confirmation.title`, `outcomeDetail`, `referenceLabel`, `copyReference`, `copied`, `nextHeading`, `nextSteps`, `timeframe`, `contact`, `saveRecord`, `viewResult`, `messageSent`, `messagePending`, `messageFailed`, `resend`, `receiptUnavailable`, `statusUnknown`, `startNew`, `feedback`. Sent-email copy is conditional on actual send acknowledgment. Display localised dates, amounts and timezone where needed. Do not promise approval, fulfillment or settlement merely because a request was accepted.

## Accessibility

Use a main landmark and a clear outcome heading. A new route focuses that heading; an in-context result announces the outcome once through an appropriate status region without stealing focus unnecessarily. Keep copy/download/next actions outside a colored success panel unless their contrast and focus treatment are deliberately supplied. References remain ordinary selectable text even if a copy button is offered. Printing/downloading has a keyboard/touch equivalent and accessible file content where supplied. Provide 4.5:1 text contrast, 3:1 control/focus contrast, visible focus, 400% zoom reflow and targets at least 24 by 24 CSS pixels or equivalent spacing; prefer 44 by 44 for primary touch actions. These requirements have not been exercised on a specimen.

## Responsive

Stack outcome, identity, next steps and record actions in that order at phone width. Keep references and long filenames inside the viewport. Do not replace a usable receipt with a decorative full-screen celebration. A print view retains the result, date, reference and support information while omitting navigation and decorative backgrounds.

## Motion

A brief outcome emphasis may distinguish the acknowledged result; it must not gate access to the reference or next steps. Use the short feedback role from [motion-language](motion-language.md), not a prolonged route animation. Reduced motion removes celebration, scaling and confetti, leaving the same static heading and status. Never auto-dismiss the receipt or auto-route away from it.

## Looks

**Quiet:** restrained outcome block and plain next steps. **Editorial:** strong result heading and readable narrative. **Playful:** optional static celebratory accent, with no reliance on it for status. **Brutalist:** bold result label and sharply separated receipt details. **Print:** document-like receipt with stable rules and selectable reference. **Immersive:** a clear opaque outcome panel over optional atmosphere. Every look distinguishes accepted, pending and complete without color alone.

## References

- [GOV.UK: confirmation pages](https://design-system.service.gov.uk/patterns/confirmation-pages/) — checked 2026-10-08; supports references, next steps/timeframes, support, a saved record and helpful bookmarked revisits. The source identifies a research gap for transactions within wider tasks; this record does not claim that gap is resolved.
- [GOV.UK: panel](https://design-system.service.gov.uk/components/panel/) — checked 2026-10-08; supports a brief high-level outcome region, not an entire receipt packed into a highlighted box.
- [GOV.UK Pay: single payment reference](https://docs.payments.service.gov.uk/api_reference/single_payment_reference/) — checked 2026-10-08; explicitly distinguishes a finished journey from a successful payment. Provider-specific API guidance, not a generic payment integration exercise.

## Code you can use

Candidate, not imported: [GOV.UK Frontend](https://github.com/alphagov/govuk-frontend) panel, summary-list and button controls under [MIT](https://github.com/alphagov/govuk-frontend/blob/main/LICENSE.txt), checked 2026-10-08. Keep Crown copyright and the full permission/warranty notice. Candidate, not imported: [Carbon React](https://github.com/carbon-design-system/carbon/tree/main/packages/react) notification and button primitives under [Apache-2.0](https://github.com/carbon-design-system/carbon/blob/main/LICENSE), checked 2026-10-08; provide the license, retain applicable notices/NOTICE attribution and mark modified files.

A component library does not generate a legally sufficient receipt, accessible PDF or authenticated result endpoint. Review dependencies and font/media rights independently; government marks, source screenshots and branded copy are not included in this clearance. This record imports no code/assets and makes no tested transaction or accessibility claim.
