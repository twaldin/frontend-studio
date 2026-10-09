---
id: layer-arrival
scale: interaction
studio: layerArrival
slots: {"required":[],"optional":["detail","confirmation","menu"]}
variants: [{"id":"cut","label":"Cut"},{"id":"fade","label":"Fade"},{"id":"anchored","label":"Grow from the trigger"},{"id":"rise","label":"Rise"},{"id":"reveal","label":"Reveal"}]
states: ["closed","opening","open","closing"]
copy: []
events: ["open","close","interrupt"]
renderer: variants
---

# Layer arrival

`id: layer-arrival` · `scale: interaction` · `studio: layerArrival` · `references checked: 2026-10-08`

## Problem and outcome

A person opening a menu, popover, dialog or sheet benefits from knowing where it belongs without waiting to act. Layer arrival gives bounded spatial feedback while semantic opening, focus and dismissal remain governed by the actual layer pattern.

## When to use / When not to use

Use on explicit layer open/close events. Do not use an entrance to hide loading, manufacture modal semantics or delay typing. Frequent/keyboard menus are instant under every language. For in-flow secondary text use disclosure; for page navigation use route-transition. Choose Cut when an origin is unknown or motion adds no information.

## Structure and slots

Required: `layer` with real open/closed state; `event` opening/closing; `baseline` Cut; `timing` local or layer role from motion-language; and the layer's focus/dismiss contract. Optional: actual trigger origin/edge, direction and overlay tone. Bind flow → surface → a dialog/detail/menu slot; bind this record only to that slot's open/close event. Geometry never determines whether background content is inert.

## Variants

There are **five studio options: Cut as the universal baseline plus four arrival variants**. Labels exactly match `layerArrival`.

**Cut — universal baseline:** fully visible/hidden in place immediately. Efficient for frequent/keyboard paths, Still and reduced motion; offers no animated spatial cue but keeps trigger, title and focus context. It is always available, not a missing animation.

- **Fade:** opacity changes in place. Low-distraction feedback without layout movement; gives little origin information and cannot substitute for a visible layer boundary.
- **Grow from the trigger:** bounded scale/fade uses the actual trigger edge as transform origin. Clarifies ownership; scaling text can blur and a false origin misleads. Choose only with reliable trigger/layer geometry.
- **Rise:** a short upward offset plus fade. Works for dialogs/sheets whose arrival has a clear below relationship; overuse makes all layers feel detached. Travel stays small and inside the viewport.
- **Reveal:** the layer edge opens away from the trigger while its content remains still. Preserves text sharpness and spatial association; clipping/edge geometry is more complex and must not hide focused controls or prolong access.

## States and transitions

Closed → opening → open → closing → closed; the semantic state changes immediately on the real event. Rapid close/open cancels the obsolete visual transition and resolves to the latest state. Closing removes focus/accessibility access according to the layer contract, not a delayed animation callback. Data loading/failed states belong inside the open layer. Missing trigger geometry uses Cut rather than an arbitrary fake origin. Still/reduced-motion and instant input paths bypass all visual transition states while preserving open/close events and focus return.

## Data and copy contract

Layer ID/open state, event reason, modality, optional trigger bounds/origin edge, selected arrival option and effective timing permission. Copy remains the owning layer's title/actions/status; the arrival has no invented content or success label. Support absent triggers, large localized bodies and long menus without cropping required actions. A selected effect is not a license to make a currently closed layer tabbable.

## Accessibility

Layer semantics, initial focus, containment when modal, Escape and return focus come from dialogs-and-layers/disclosure. Every action has keyboard/touch access and usable focus independent of arrival duration. Hidden layers leave tab/accessibility order. Do not expose snapshot duplicates to assistive technology. Preserve contrast/visible focus, 44px intended touch targets and zoom; no essential meaning depends on travel, opacity progression or clipping.

## Responsive

Origin is recomputed for the actual layout; a popover changing to a sheet cannot reuse a stale desktop anchor. Constrain travel and reveal to the viewport. Long content has bounded accessible scrolling with exit/actions reachable. Do not animate width across the phone and temporarily occlude the trigger or action.

## Motion

Small menus use local timing, larger dialogs/sheets layer timing. Exit should be short and interruptible, never delaying semantic close. Still/reduced-motion uses Cut for Fade, Grow from the trigger, Rise and Reveal alike. Keyboard/frequent paths also use Cut even when another option is selected.

## Looks

Quiet can use Fade; editorial can use a restrained trigger relationship; playful may pair Rise with Tactile; brutalist/print often favor Cut; immersive can use a bounded Reveal. These are optional pairings: every look supports every option and a legible still form.

## References

- [Carbon motion](https://www.carbondesignsystem.com/building-blocks/foundations/motion/overview) — checked 2026-10-08, guidance read: purposeful entrance/exit and static alternatives; not measurement of these five studio options.
- [Carbon dialogs](https://www.carbondesignsystem.com/building-blocks/core/patterns/dialogs) — checked 2026-10-08, guidance read: focus/modal behavior is distinct from appearance; no layer demo exercised.
- [VantaUI](https://www.vantaui.com/), [EasyUI](https://easyui.site/) and [PaceUI](https://paceui.com/) — checked 2026-10-06 in earlier public-document research: link-only layer breadth, no copied animation code/assets or verified accessibility behavior.

## Code you can use

Own option definitions: [`studio/src/tree/steps.ts`](../../studio/src/tree/steps.ts); source read, not interaction-tested, and not a third-party clearance claim. [Carbon motion package](https://github.com/carbon-design-system/carbon/tree/main/packages/motion), candidate under [Apache-2.0](https://github.com/carbon-design-system/carbon/blob/main/LICENSE), license read 2026-10-08. Preserve license/attribution, applicable NOTICE and modification notices; audit pinned code/dependencies/assets before adaptation. No imported implementation is claimed. VantaUI is proprietary, PaceUI per-item, and EasyUI's inherited MIT description does not clear every asset; all stay link-only here.
