---
id: pricing
scale: surface
studio: null
slots: {"required":["header","primary","terms","state"],"optional":["period","comparison","estimator","faq","currentPlan","contact","actions"]}
variants: [{"id":"cards","label":"Plan cards"},{"id":"matrix","label":"Comparison matrix"},{"id":"estimator","label":"Usage estimator"}]
states: ["loading","available","unavailable","denied","failed","checkingEligibility","restricted","currentPlan","quoteExpired","priceChanged","invalid","scheduled"]
copy: ["priceUnit","choose"]
events: ["changePeriod","changeQuantity","select","contact","changePlan"]
renderer: schematic
---

# Pricing

`id: pricing` · `scale: surface` · `studio: no studio step` · `references checked: 2026-10-08`

## Problem and outcome

A person deciding whether to pay needs to compare plans, understand the billing basis and identify the plan that covers their task. The pricing surface makes total/basis, limits and consequences visible before a selection enters checkout or an account-change flow.

## When to use / When not to use

Use for a real choice between plans, tiers or measured usage. A single known item is a storefront/detail purchase, not a fabricated three-plan comparison. Do not use a pricing page as a receipt; use [confirmation](confirmation.md). Contact-only offers must be labeled as such, without invented prices or a checkout button that cannot work.

## Structure and slots

Required: `header` explains offering/billing context; `primary` lists plans with price basis, limits and selection actions; `terms` provides currency, billing interval, tax/trial/renewal qualifications as applicable; `state` handles unavailable quotes and eligibility. Optional: billing-period selector, comparison matrix, usage estimator, FAQ, current plan, contact action. Bind choose-plan → pricing → `primary` to plan selection; pay → checkout carries the chosen plan/period/quote rather than rereading marketing copy as payment data.

## Variants

- **Plan cards:** two to four succinct offers emphasize key differences and one action each. Easy first-pass choice; weak for many comparable features and prone to misleading “recommended” emphasis. Recommendation requires a stated basis.
- **Comparison matrix:** shared feature rows compare plans directly. Good for expert requirements; wide tables need careful phone adaptation and meaningful empty/unsupported markers.
- **Usage estimator:** explicit quantity controls show a calculated quote/basis. Useful for metered offers; needs real formula, included units and uncertainty disclosure, and costs more to understand than a fixed price. Provide a noninteractive explanation of the formula.

## States and transitions

Pricing load → available, unavailable, denied or failed. Billing period/quantity changes recalculate an estimate only from valid data. Selection → eligibility check → checkout/contact/change-plan, or an explained restriction. Current-plan state is not a selectable duplicate purchase. A quote expiry or changed price is disclosed before commitment. Invalid quantity keeps prior valid estimate labeled and exposes correction. Upgrade/downgrade scheduling states explain effective date; failed plan changes preserve the current plan and a real recovery route. Trial ending is not silently “free.”

## Data and copy contract

Plan IDs/names, currency, unit/interval, exact fixed amount or estimator formula, included usage, limits, eligibility and actual selection destination. Optional trial length, renewal terms, taxes, discounts, effective dates and feature comparison use truthful data. Support long plan names, localized amounts, free tiers, custom quotes and unavailable features. Copy keys cover price basis, period, billed total, trial/renewal, estimated amount, included/excluded, choose/current/contact, quote expiry and failures. Distinguish per-month equivalent from the full annual charge; don't fabricate social proof or scarcity.

## Accessibility

Use headings/lists for cards and a correctly headed table for a matrix. Period controls are labeled radios or equivalent, not unlabeled colored tabs. Feature availability is expressed in words as well as icons. Estimators accept keyboard/touch and have labeled numeric input rather than slider-only entry. Announce recalculation concisely, not every pointer movement. Focus remains on the choice until explicit navigation. Ensure 44px intended touch targets, contrast, focus and zoom access to terms; legal qualifications cannot be tiny decorative footnotes.

## Responsive

Cards stack with terms beside each action. Matrices either retain labeled local scrolling or become plan sections with repeated feature names, never an unreadable screenshot. Estimator controls/results stack and total stays visible. Billing qualifiers and contact routes remain reachable.

## Motion

Use control-response for selection and a short content-swap on billing changes only if it improves continuity. Never animate the price through fake intermediate values or hide terms until a reveal finishes. Still/reduced-motion shows the full new quote immediately with static qualification/error text.

## Looks

Quiet favors facts; editorial clarifies plan stories; playful can accent a genuine recommendation; brutalist makes price/basis explicit; print supports comparison rules; immersive may frame offers boldly but leaves terms on high-contrast surfaces. No look changes the billing facts.

## References

- [GOV.UK patterns](https://design-system.service.gov.uk/patterns/) — checked 2026-10-08, guidance read: compose around a user's decision/task; not evidence of pricing conversion.
- [Carbon pattern overview](https://www.carbondesignsystem.com/building-blocks/core/patterns/overview) — checked 2026-10-08, documentation read: forms/actions/feedback are distinct concerns; not a metering implementation.
- [EasyUI](https://easyui.site/), [PaceUI](https://paceui.com/) and [dev.cards](https://dev.cards/) — checked 2026-10-06 in earlier public-document research: link-only pricing/comparison breadth; no plans, copy, screenshots or code imported.

## Code you can use

[Carbon core](https://github.com/carbon-design-system/carbon) controls/table are candidates under [Apache-2.0](https://github.com/carbon-design-system/carbon/blob/main/LICENSE), read 2026-10-08. Retain license/attribution and applicable NOTICE, mark modified files and audit pinned code/dependencies/assets. No complete pricing/billing engine is claimed imported. EasyUI's inherited MIT description does not cover all assets; PaceUI is per-item; dev.cards adds Commons Clause. All three are inspiration links here. Docs-only checks do not verify purchasing or quoting behavior.
