# Motion language

`id: motion-language` · `scale: motion` · `studio: motion` · `references checked: 2026-10-08`

## Problem and outcome

A person interacting with many parts of a product needs consistent response rather than unrelated effects on every component. A motion language supplies duration roles and easing character; separate interaction axes decide what moves. The result is coherent, interruptible feedback with a universally usable still rendition.

## When to use / When not to use

Use as a product-wide policy wherever transitions exist. Do not animate simply because a language is selected, infer permission for decorative loops, or delay frequent/keyboard paths. Explanatory progress needs async-progress data, not an easing curve. A language does not replace surface structure or task accessibility.

## Structure and slots

Required: `baseline` is Still; `roles` defines press, local, layer, swap and route timing; `curves` defines entrance/exit/change; `overrides` covers reduced motion and frequent/keyboard instant paths. Optional: a documented exceptional expressive moment. Bind product → all surfaces → interaction events to the language once, then bind layer-arrival/control-response/content-swap/route-transition/theme-transition to specific semantic events.

## Variants

There are **five studio options: one universal no-motion baseline and four timed language variants**, not five timed variants. Labels exactly match `motion`.

**Still — universal baseline:** all five timing roles are 0ms; no travel, scale, reveal, spin or animated interpolation. States cut directly to complete values. Essential feedback remains through text, tone, focus and semantics. Still can always be chosen and is the effective rendition for reduced motion.

- **Snappy:** brief fast-out changes with minimal travel. Efficient for dense frequent work; less useful for explaining larger spatial relationships. Current press/local/layer/swap/route roles: **80/120/150/100/120ms**.
- **Anchored:** unhurried origin-conscious changes without overshoot. Helps connect a layer to a trigger; slower than Snappy for repeated work and does not automatically choose a grow effect. Roles: **100/160/200/140/160ms**.
- **Tactile:** spring-like give and settling. Useful for expressive consumer interactions; overshoot can distract and repeated input stays instant. Current implementation uses overshooting cubic easing, not a physical spring simulation. Roles: **120/200/280/160/200ms**.
- **Material:** emphasized easing with enough time for related-view continuity. Good for meaningful spatial transitions; costs time/attention when used indiscriminately. Roles: **100/150/250/150/300ms**.

These are the studio's own current tokens, not copied source timing tables or measured performance claims. Easing curves live in the implementation; choose effects separately rather than bundling them into a branded preset.

## States and transitions

Each effect has idle → responding/entering/changing/exiting → settled, with interruption resolving to the latest real state. Repeated input never queues a backlog of animations. Opening/closing/navigation updates semantics immediately, independent of visual completion. Reduced-motion preference or Still selection removes movement without losing feedback. Failed data/task transitions expose failure rather than finishing a success sequence. Frequent/keyboard-triggered paths cut in every timed language.

## Data and copy contract

Language ID, numeric role durations, entrance/exit/change easing, semantic event kind and effective motion permission. Effects requiring direction/origin need actual relationship data, otherwise choose Cut. Copy keys cover the language labels/descriptions and state messages in their owning records; animation invents no extra “done” copy. Content/data timing belongs to the real operation, not the language clock.

## Accessibility

Static text/semantics convey every state. Honor reduced-motion preference, retain visible focus and do not move focused controls away from their hit targets. Keyboard/touch perform identical semantic actions; animations never trap focus or require gesture tracking. Contrast, targets and zoom requirements come from the bound components and remain unchanged while moving. No flashing or essential looping motion; reading order and announcements follow state, not visual frames.

## Responsive

The role expresses purpose, not desktop distance. Constrain travel at small widths and large zoom; do not make phone transitions take longer because the layout has stacked. A simplified/Still rendition may be appropriate independent of viewport. All actions stay available during transitions.

## Motion

This record owns the common timing/permission contract. Local control response, layer arrival and view changes use their corresponding role, with no artificial delay before task completion. Reduced motion and Still take precedence over every selected moving option; their static equivalent is part of that option, not an extra variant.

## Looks

Quiet commonly suits Still/Snappy; editorial may suit Anchored; playful may suit Tactile; brutalist and print may use Still/direct response; immersive may use bounded Material continuity. These are suggestions, not defaults that erase the chosen look or impose movement. Every language remains available with every look.

## References

- [Carbon motion](https://www.carbondesignsystem.com/building-blocks/foundations/motion/overview) — checked 2026-10-08, public guidance read: purposeful productive/expressive motion, duration roles and static alternatives. No animation/performance audit; the five studio languages are not Carbon's taxonomy.
- [GOV.UK patterns](https://design-system.service.gov.uk/patterns/) — checked 2026-10-08, documentation read: tasks precede visual combinations, not a motion-token source.
- [EasyUI](https://easyui.site/) and [Great UI](https://great-ui.com/components) — checked 2026-10-06 in earlier public-document research: link-only breadth for independently authored response/transition decisions; no timing remeasurement or imported effect code.
- [Cue](https://www.cuedesign.space/) — link registered in earlier research dated 2026-10-06; corpus/prompts/items not fetched or ingested here. Link-only expressive context, not evidence for these timing values.

## Code you can use

Own token definitions: [`studio/src/tokens/motion.ts`](../../studio/src/tokens/motion.ts); their source was read, not executed, and this reference is not a third-party clearance claim. [Carbon motion package](https://github.com/carbon-design-system/carbon/tree/main/packages/motion) is a candidate under [Apache-2.0](https://github.com/carbon-design-system/carbon/blob/main/LICENSE), license read 2026-10-08: retain license/attribution, applicable NOTICE and modification notices; audit pinned dependencies/assets before adaptation. No Carbon code is imported by this record. EasyUI/Great UI/Cue stay link-only under the index posture; docs-only checks did not exercise any studio interaction.
