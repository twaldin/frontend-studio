---
id: dialogs-and-layers
scale: component
studio: null
slots: {"required":[],"optional":["detail","confirmation"]}
variants: [{"id":"inline","label":"Inline region"},{"id":"popover","label":"Anchored popover"},{"id":"dialog","label":"Dialog"},{"id":"sheet","label":"Sheet"}]
states: ["closed","open","editing","ready","validating","submitting","done","invalid","failed"]
copy: ["close"]
events: ["open","close","cancel","commit"]
renderer: variants
---

# Dialogs and layers

`id: dialogs-and-layers` · `scale: component` · `studio: no dedicated step; layerArrival controls appearance, not layer semantics` · `references checked: 2026-10-08`

## Problem and outcome

A person needs to complete a short contextual task or inspect secondary information without losing their place. The layer choice makes interruption, page access and dismissal predictable; a visual sheet is not automatically modal, and arrival animation does not decide focus behavior.

## When to use / When not to use

Use for bounded contextual work, optional detail or a genuinely necessary decision. Prefer inline content for repeated actions and a full page for large/complex tasks. Do not interrupt for unrelated promotions, nest modal tasks, or hide required context behind the modal that blocks it. Passive background outcomes use [notifications](notifications.md).

## Structure and slots

Required: `trigger` names the action; `title` explains the task; `body` supplies enough context; `exit` has a clear close/cancel route; `semantics` declares modal/non-modal and focus/dismiss policy. Transactional tasks also require `commit` and outcome/validation. Optional: description, related object, overlay, local progress and bounded detail disclosure. Bind a flow's inspect/confirm stage → surface → `detail` or `confirmation` slot; attach [layer-arrival](layer-arrival.md) only to its open/close event.

## Variants

- **Inline region:** expands or edits in document flow. Low interruption and context stays accessible; may push surrounding content and needs a clear region boundary. Best for frequent work.
- **Anchored popover:** small secondary content stays near its trigger, normally non-modal. Strong spatial relationship; constrained by viewport and unsuitable for required complex input. Not an interactive tooltip.
- **Dialog:** centered short task with modal semantics when the workflow truly requires exclusive attention. Clear focus; blocks page consultation and adds interaction cost. Non-modal dialog is possible only with an explicit accessible focus/navigation contract.
- **Sheet:** edge-attached panel, often suited to touch or persistent detail. Uses more vertical space than a popover; modal/non-modal must be declared, and drag cannot be its only dismissal. A sheet is a geometry, not a fifth semantic role.

## States and transitions

Closed → open → editing/ready → validating/submitting → done or invalid/failed. Cancel/close discards only what the product says is uncommitted; it never quietly submits. Escape/back follows the declared policy; backdrop dismissal is allowed only when safe and understandable. Required decisions have an explicit safe exit, not a disappearing close icon. Failed submissions remain open with input and recovery. Completion closes or remains for repeated tasks by explicit policy. Opening another task replaces/navigates rather than stacking nested modals. If the trigger vanishes, closing focuses a logical surviving item/heading.

## Data and copy contract

Layer ID/title, associated object, modal flag, open/close reason, allowed dismissal methods, initial/return focus targets, draft/commit policy and actual actions. Support short messages, long localized text, invalid fields, no actions and unavailable context. Copy keys cover task title, action/consequence, cancel/close, unsaved warning, pending, errors and recovery. Content is plain and task-related; do not send raw backend errors or private object information into a generic layer.

## Accessibility

Use dialog semantics and accessible name for dialogs, with modal marking only when background is inert. Move focus into a modal to a suitable input or reading target; contain focus, support keyboard close, then restore it. Non-modal popovers/regions leave page access available and have declared keyboard/touch navigation. Hiding a layer removes it from tab/accessibility order. Errors are associated and announced without closing. Provide visible focus, contrast, 44px intended targets and zoom-safe scrolling; no hover-only controls or swipe-only exit.

## Responsive

Popover can recompose to a sheet/dialog when it cannot fit, preserving the declared task/modal policy and focus. Long body content scrolls with title/actions reachable; prevent page-behind scroll only for modal layers. At zoom a full-page task can be preferable to an unusable small modal; never crop completion/cancel controls.

## Motion

[layer-arrival](layer-arrival.md) explains spatial origin, using the chosen language's layer/local role. Semantics and usable focus are ready when the layer opens, not after an animation callback. Still/reduced-motion uses Cut with identical dismissal, validation and focus return. No exit animation keeps hidden content tabbable.

## Looks

Quiet uses restrained framing; editorial establishes title/body hierarchy; playful may soften shape; brutalist emphasizes task/exit edges; print uses a clear inset; immersive can use a strong overlay but never illegible glass. The look cannot turn a non-modal task into a blocking one.

## References

- [Carbon dialogs](https://www.carbondesignsystem.com/building-blocks/core/patterns/dialogs) — checked 2026-10-08, guidance read: bounded tasks, modal/non-modal distinctions and focus return; no demo interaction exercised.
- [Carbon disclosures](https://www.carbondesignsystem.com/building-blocks/core/patterns/disclosures) — checked 2026-10-08, guidance read: user-triggered concise interactive popovers, not hover-only critical information.
- [VantaUI](https://www.vantaui.com/) and [EasyUI](https://easyui.site/) — checked 2026-10-06 in earlier public-document research: link-only layer breadth; no copied implementation, assets or accessibility verdict.

## Code you can use

[Carbon core](https://github.com/carbon-design-system/carbon) modal/controls are candidates under [Apache-2.0](https://github.com/carbon-design-system/carbon/blob/main/LICENSE), read 2026-10-08. Keep license/attribution, applicable NOTICE and modification notices, and audit pinned source/dependencies/assets before reuse. This does not establish one cleared implementation for every sheet/popover policy. VantaUI stays proprietary link-only; EasyUI's inherited MIT description requires item/asset review and no code is imported here. Documentation checks do not exercise studio layers.
