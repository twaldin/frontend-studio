---
id: settings
scale: surface
studio: null
slots: {"required":["header","navigation","primary","commit","state"],"optional":["toolbar","reset","unsaved","billing","security","help","actions"]}
variants: [{"id":"sections","label":"Sectioned page"},{"id":"categories","label":"Category navigation"},{"id":"search","label":"Search-led settings"}]
states: ["loading","editable","readOnly","denied","failed","dirty","validating","saving","saved","invalid","pending","confirmed","reverted","conflict","partial"]
copy: ["save"]
events: ["edit","save","reset","leave","discard","search","navigate"]
renderer: variants
---

# Settings

`id: settings` · `scale: surface` · `studio: no studio step` · `references checked: 2026-10-08`

## Problem and outcome

A person needs to find a preference or configuration, understand its effect and change it without uncertainty about what was saved. Settings distinguishes account, workspace and local-device scope, and gives an observable result with a recovery path.

## When to use / When not to use

Use for persistent configuration outside the main task. Keep frequent contextual controls beside the work instead of burying them in settings. Initial required answers belong to [first-run](first-run.md) or question-pages; a tiny secondary setting may use [disclosure](disclosure.md). Do not offer editable-looking controls when a value is read-only.

## Structure and slots

Required: `header` names configuration scope; `navigation` groups sections; `primary` contains labeled controls with descriptions/current values; `commit` makes the save policy clear; `state` explains loading, permissions and failures. Optional: settings search, reset, unsaved-change notice, linked billing/security flows and help. Bind account-management → settings → section `primary` to create-edit/validation; destructive reset uses destructive-action. Billing and credential changes can have their own routes rather than hidden nested dialogs.

## Variants

- **Sectioned page:** headings divide all settings on one page, with local save boundaries. Easy to discover a small set; lengthy pages become hard to scan. Choose when sections fit a manageable reading length.
- **Category navigation:** a category list opens one configuration page at a time. Scales to many settings and deep links; adds a navigation hop and must retain the selected category/unsaved edits.
- **Search-led settings:** query matches setting names/descriptions and opens the owning section. Fast for experts with many controls; weak when people do not know the term, so category navigation remains available.

Immediate versus explicit save is a declared per-section commit policy, not a hidden fourth layout. Do not mix policies without visible local explanations.

## States and transitions

Load → editable, read-only, denied or failed. Edit produces dirty state; explicit save → validating → saving → saved or invalid/failed. Failure retains entered values and the prior saved value. Immediate-save controls show pending then confirmed/reverted, never merely a cosmetic check. Reset names the scope and requires the real recovery/confirmation contract. Leaving a dirty section offers save/discard/stay where the product can support it. Concurrent updates show conflict and preserve both known values for resolution; partial failures identify affected settings rather than claiming the whole section saved.

## Data and copy contract

Setting ID, category, scope, label, help, type, current/saved value, constraints, permissions, commit policy and actual save/reset actions. Search indexes only permitted settings. Support long descriptions, several controls, no editable settings, unavailable defaults and localized units. Copy keys include category, value labels, save, saving, saved, unsaved, discard, validation, read-only reason, conflict and recovery. Password/secrets are not echoed as ordinary current values.

## Accessibility

Use forms, fieldsets/legends and explicitly associated labels/help/errors. Toggles expose checked state and do not use color alone. Tab order follows headings and local commit actions. Focus goes to relevant validation feedback after submit; successful save does not steal focus. Announce concise outcomes. Read-only values remain readable; disabled controls have a discoverable reason. Preserve 44px intended touch targets, contrast, visible focus and zoom access to every description/action.

## Responsive

Category navigation becomes a named section selector or separate category index. Controls stack with labels/help; long options wrap. Save/reset remains visible or readily reachable without covering fields. Avoid two competing vertical scroll regions on phones.

## Motion

[control-response](control-response.md) acknowledges a press; async-progress describes persistence. Local content swaps can mark category changes without animating every value. Still/reduced-motion uses static dirty/saving/saved/error text and immediate category changes, with identical focus behavior.

## Looks

Quiet reduces chrome; editorial improves section/help hierarchy; playful accents selected values without vague copy; brutalist uses clear scopes and boundaries; print resembles a labeled form; immersive keeps controls on legible solid surfaces. All retain exact permissions and commit policy.

## References

- [GOV.UK button](https://design-system.service.gov.uk/components/button/) — checked 2026-10-08, documentation read: action labels distinguish save from navigation; not an exercised persistence test.
- [Carbon pattern overview](https://www.carbondesignsystem.com/building-blocks/core/patterns/overview) — checked 2026-10-08, guidance read: form/read-only/disabled distinctions are semantic concerns; the settings layouts above are original synthesis.
- [VantaUI](https://www.vantaui.com/) — checked 2026-10-06 in earlier public-document research: link-only control-level inspiration; no copied settings, assets or verified interaction model.

## Code you can use

[GOV.UK Frontend](https://github.com/alphagov/govuk-frontend) form controls are candidates under [MIT](https://github.com/alphagov/govuk-frontend/blob/main/LICENSE.txt), license read 2026-10-08. Keep the Crown Copyright and permission notice in copies/substantial portions; review a pinned implementation/dependencies/assets before adaptation. No complete settings surface or persistence system is imported. VantaUI's plan-limited proprietary material stays link-only, with no redistribution clearance asserted. Documentation reading does not establish interaction or accessibility conformance.
