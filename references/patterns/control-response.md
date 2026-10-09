---
id: control-response
scale: interaction
studio: controlResponse
slots: {"required":[],"optional":["actions","composer","commit"]}
variants: [{"id":"tone","label":"Tone"},{"id":"press","label":"Press in"},{"id":"sink","label":"Sink"},{"id":"ink","label":"Ink"}]
states: ["rest","held","disabled","readOnly","pending"]
copy: []
events: ["press","release","cancel"]
renderer: variants
---

# Control response

`id: control-response` · `scale: interaction` · `studio: controlResponse` · `references checked: 2026-10-08`

## Problem and outcome

A person pressing a control needs immediate confirmation that the intended target was hit. Response acknowledges the press before any remote result, without pretending that a task succeeded or changing the control's actual hit area.

## When to use / When not to use

Use consistently on enabled pressable controls. Focus, hover, selection and disabled state remain distinct. Do not use press movement on text entry, large reading regions or links where it would disturb scanning. Remote completion belongs to [async-progress](async-progress.md)/notifications. Press feedback never replaces a visible focus indicator or permission explanation.

## Structure and slots

Required: `control` is a real button/action with a stable accessible name and hit target; `held` state represents actual active input; `release` returns it to rest; `outcome` is owned by the real action. Optional: decorative face/shadow/wash layers that cannot intercept input. Bind any surface's `actions` or `composer` button to this record's press/release event; bind operation pending/outcome separately. Transform only the visual face, not the layout/hit target.

## Variants

Exactly the four `controlResponse` labels:

- **Tone:** fill/tone changes while held, no movement. Efficient and compatible with Still; less tactile depth, so contrast and distinct focus/selected states must do the work.
- **Press in:** face scales to 97% while held and returns on release. Clear bounded physical response; text can soften and shrinking the actual hit area would be a defect. Keep target geometry stable.
- **Sink:** face drops onto its edge/shadow like a key. Suits a tactile/graphic look; depends on a visible depth cue and can look accidental on a flat control. The resting border/shadow remains understandable.
- **Ink:** a wash spreads from the middle while held. Shows activation across a larger face; adds rendering/masking complexity and must not obscure label/focus or leak beyond the target. It does not invent the pointer's position as its origin.

## States and transitions

Rest → held on enabled input → rest on release/cancel. A cancelled pointer gesture or moving away follows native activation semantics and does not execute merely because an animation started. Keyboard activation receives equivalent immediate feedback, without a timed delay. Toggle/selection states update from the real action, not from held styling. Pending actions indicate progress separately and prevent unsupported duplicate submission without disabling unrelated work. Disabled/read-only controls explain their state and do not appear to accept a press. Rapid input resolves to the actual current held/rest state, not a queued sequence.

## Data and copy contract

Control ID/type, action, enabled/permission state, actual held input, optional pressed/checked state, selected response and motion permission. The action's label/consequence and pending/result copy are deck-owned. This effect creates no new “success” string. Support icon-only controls with accessible names, multiline/long labels, toggles and disabled actions. Never encode selected value solely as a transform or reuse a generic label that hides what will happen.

## Accessibility

Use native buttons and checked/pressed semantics where appropriate; links remain navigation. Enter/Space/touch follows the control's declared/native model. Keep visible focus distinct from held/hover/selected styling and labels readable through every frame. Decorative washes are hidden from accessibility and pointer hit testing. At least 44px intended touch targets stay stable; preserve contrast and zoom. Color/tone feedback supplements, not replaces, semantic state. Keyboard/frequent paths are instant; focus never waits for settling.

## Responsive

Long labels wrap without changing press geometry or spilling ink. Small icon faces still have adequate hit targets. Touch has no required hover state. At zoom, face movement stays bounded within the control and cannot overlap neighboring actions.

## Motion

Use the language's press role for pointer-held response, with immediate semantic acknowledgment; release is interruptible. Still/reduced-motion keeps static Tone/held-state feedback with no shrink, travel or spreading wash for all four selections. The action/result occurs on real activation, never on transition end.

## Looks

Quiet often suits Tone; editorial uses restrained Press in; playful may use bounded Sink; brutalist can show a clear hard edge; print can use Tone without simulated depth; immersive may use Ink on a legible solid face. Pairing suggestions do not limit options or change semantics.

## References

- [GOV.UK button](https://design-system.service.gov.uk/components/button/) — checked 2026-10-08, documentation read: truthful action labels, hierarchy and considered disabled states; no press demo exercised.
- [Carbon motion](https://www.carbondesignsystem.com/building-blocks/foundations/motion/overview) — checked 2026-10-08, guidance read: immediate purposeful microfeedback/static alternatives; not measurement of 97% scale or studio timing.
- [VantaUI](https://www.vantaui.com/), [EasyUI](https://easyui.site/) and [PaceUI](https://paceui.com/) — checked 2026-10-06 in earlier public-document research: link-only control breadth, no copied source code/assets or verified touch/focus behavior.

## Code you can use

[GOV.UK Frontend](https://github.com/alphagov/govuk-frontend) buttons are candidates under [MIT](https://github.com/alphagov/govuk-frontend/blob/main/LICENSE.txt), license read 2026-10-08. Keep Crown Copyright and permission notice in copies/substantial portions, audit pinned source/dependencies/assets and do not import branding or website prose as software. This does not claim imported press/ink effects. VantaUI/PaceUI remain restricted/per-item links; EasyUI's inherited MIT description still needs item/media review. No interactions or accessibility checks exercised by this author.
