---
id: checkout
scale: flow
studio: null
slots: {"required":["summary","total","details","payment","commit","recovery"],"optional":["promotion","account","express","state"]}
variants: [{"id":"onePage","label":"One page"},{"id":"staged","label":"Staged checkout"},{"id":"hosted","label":"Hosted or express handoff"}]
states: ["loading","editable","reviewing","submitting","challenge","pending","paid","accepted","quoteChanged","empty","unavailable","invalid","declined","cancelled","expired","outcomeUnknown","fulfillmentPending","receiptFailed","alreadyPaid","offline","denied"]
copy: ["total","payAmount"]
events: ["editCart","changeDetails","pay","challenge","cancel","checkStatus","resume"]
renderer: schematic
---

# Checkout

`id: checkout` · scale: flow · studio: no studio step · references checked: 2026-10-08 (new primary guidance); 2026-10-06 (inherited link-only inspiration)

## Problem and outcome

A person has chosen items and needs to understand the final cost, provide only necessary fulfillment/payment information and pay once. A flow that treats a redirect, a spinner finishing or a bank authorization as a complete order can mislead them or cause a second charge. This flow begins with a non-empty purchasable cart and ends with the service's acknowledged order/payment outcome and a durable [confirmation](confirmation.md).

## When to use / When not to use

Use when an actual monetary commitment needs cart review, fulfillment or billing details and a supported payment method. Keep account creation optional unless the purchase genuinely requires durable authenticated access; use [sign-in](sign-in.md) at that explicit boundary. Let people correct their cart and costs before paying.

Do not use checkout for a free object creation or inquiry. Use [create-edit](create-edit.md) or [check-answers](check-answers.md) as appropriate. Do not collect raw card details in a generic studio form as though it were a cleared payment integration. A price preview in [storefront](storefront.md) is not checkout until the actual total and commitment are known.

## Structure and slots

- **Required — order summary:** item identity, variant, quantity, unit/line costs and editable cart route.
- **Required — total:** currency, subtotal, discounts, taxes, delivery and other fees, with estimated versus final amounts distinguished before payment.
- **Required — necessary details:** contact, delivery/billing or digital fulfillment information only as the purchase requires.
- **Required — payment boundary:** supported provider/wallet action or secured hosted fields, the amount committed and any relevant recurring terms.
- **Required — commitment/status:** a named pay/place-order action, pending/declined/unknown outcomes and a duplicate-safe service operation.
- **Required — recovery/result:** cart preservation, correction/retry where permitted and the existing receipt after success.
- **Optional — promotion, account and express method:** secondary to the core purchase; never hide essential costs behind promotion entry or account creation.

## Variants

| Variant | Gain | Cost and choice |
| --- | --- | --- |
| One page | Details, total and payment decision remain together. | Can become long and dependency-heavy; choose for a modest set of fields with simple fulfillment. |
| Staged checkout | Groups delivery, payment and final review into understandable steps. | More navigation and draft state; choose for conditional fulfillment or several unfamiliar decisions. |
| Hosted or express handoff | A supported provider handles the payment/proof surface, possibly reusing wallet details. | Return/cancel reconciliation and provider accessibility remain real responsibilities; choose only with an actual integration and a local final-total/recovery contract. |

## States and transitions

**Cart loading → editable → reviewing final total → submitting → provider challenge/pending → paid/order accepted** leads to confirmation. A stock, quantity, address, tax or delivery change can require a **revised quote**; show the changed total and obtain the appropriate confirmation before committing it. **Empty cart** returns to browsing, not an empty pay form. **Sold out/unavailable item** identifies the affected item and preserves the rest. **Invalid details** use [validation](validation.md). **Declined/cancelled/expired payment** preserves non-secret details and offers provider-supported recovery. **Unknown outcome** checks the existing payment/order rather than creating another on a timeout. **Paid but fulfillment pending** says precisely what has succeeded and what remains. **Receipt delivery failed** does not turn a paid order back into an unpaid cart. **Already paid** shows the existing result; refresh/back/duplicate activation cannot create another charge for the same confirmed operation. Offline or denied access explains a safe route to resume without assuming payment failure.

## Data and copy contract

A cart contains stable line IDs, purchasable variant IDs, quantities and availability. A server-authoritative quote has revision, currency, integer minor-unit amounts, discount/tax/delivery lines, final total and any real expiry. An order links to its quote and a stable operation/payment ID with separate payment and fulfillment status. Reconcile provider state on the server; client navigation is not proof of payment. Provider events can repeat or arrive out of order, so an old event must not overwrite a newer authoritative result. Do not invent a common provider status vocabulary; map the actual integration to honest user-facing outcomes. Do not store card secrets in draft, content or copy objects. Handle one/many items, long titles/addresses, unavailable shipping, zero-cost legitimate totals and recurring versus one-off terms explicitly.

Every visible string comes from the copy deck: `checkout.title`, `item`, `quantity`, `editCart`, `subtotal`, `discount`, `tax`, `delivery`, `estimated`, `total`, `payAmount`, `recurringTerms`, `working`, `challenge`, `declined`, `cancelled`, `expired`, `quoteChanged`, `unavailableItem`, `outcomeUnknown`, `checkStatus`, `resume`, `paid`, `fulfillmentPending`. Never promise saved payment details, delivery dates or successful charge unless the service can support them.

## Accessibility

Use forms, visible labels, associated errors and native input purposes for contact/address data. The summary is readable in document order and announces revised totals once after an acknowledged calculation, not on every keystroke. Focus errors after rejected submission; keep focus and a clear status during payment handoff. Provider challenges and hosted fields must be assessed as part of the real flow, not presumed accessible because a local shell is accessible. Keyboard/touch can edit quantities, change delivery and choose supported payment methods without hover. Use visible focus, 4.5:1 text contrast, 3:1 control/focus contrast, reflow at 400% zoom and targets at least 24 by 24 CSS pixels or suitable spacing; prefer 44 by 44 payment controls. No payment or accessibility exercise has been performed for this record.

## Responsive

At phone width, put a concise order/total summary before data entry and the final total directly before commitment. If details are disclosed, the current total and item count remain visible. Replace a desktop summary rail with a normal-flow region; do not let a sticky pay bar obscure errors, provider fields or the keyboard. Long addresses and fee explanations wrap without losing meaning.

## Motion

Use short control feedback and a moderate step/handoff role. Updating a total can briefly emphasize the changed amount but must include readable changed-total copy. Never show fake payment progress or celebratory success before acknowledgment. Reduced motion uses static working/checking text and immediate step changes. Keep the unknown-outcome state stable until real reconciliation.

## Looks

**Quiet:** calm form and plainly separated total. **Editorial:** clear item identities and a strong final-cost hierarchy. **Playful:** restrained item accents, never urgency tricks or joking decline text. **Brutalist:** explicit price ledger and commitment block. **Print:** invoice-like summary with readable fee lines. **Immersive:** opaque form/payment region; atmosphere never obscures costs or provider identity. All looks preserve final costs and recurrence terms before payment.

## References

- [GOV.UK: check answers](https://design-system.service.gov.uk/patterns/check-answers/) — checked 2026-10-08; supports readable review, correction and an explicit final action. This record adapts the principle, not government transaction copy.
- [Carbon: forms](https://www.carbondesignsystem.com/building-blocks/core/patterns/forms) — checked 2026-10-08; supports necessary fields, grouping and multistep structures. Not a payment-security specification.
- [GOV.UK Pay: single payment reference](https://docs.payments.service.gov.uk/api_reference/single_payment_reference/) — checked 2026-10-08; supports authoritative payment identity/state and the distinction between a finished journey and payment success. Provider-specific, not universally interchangeable with other processors.
- [GOV.UK Pay: webhooks](https://docs.payments.service.gov.uk/webhooks/) — checked 2026-10-08; supports duplicate/out-of-order event handling. Documentation evidence only; no payment integration tested or imported.
- [Great UI](https://great-ui.com/components) — inherited public-source research dated 2026-10-06; link-only commercial UI-category exploration. Its custom license does not clear kit redistribution; no component content is incorporated.

## Code you can use

Candidate, not imported: [GOV.UK Frontend](https://github.com/alphagov/govuk-frontend) summary-list, form and button controls under [MIT](https://github.com/alphagov/govuk-frontend/blob/main/LICENSE.txt), checked 2026-10-08; retain Crown copyright and the full permission/warranty notice. Candidate, not imported: [Carbon React](https://github.com/carbon-design-system/carbon/tree/main/packages/react) form controls under [Apache-2.0](https://github.com/carbon-design-system/carbon/blob/main/LICENSE), checked 2026-10-08; include the license, preserve applicable notices/NOTICE attribution and mark modified files.

These candidates cover the local shell, not processing, PCI obligations, tax calculation or provider branding. A payment SDK/hosted surface needs its own contract, version/license and compliance review. Audit dependency and media/font rights separately. Great UI stays link-only; no proprietary snippets, kit assets or screenshots were copied. This record contains original prose and no imported implementation.
