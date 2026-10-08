# Content swap

`id: content-swap` · `scale: interaction` · `studio: contentSwap` · `references checked: 2026-10-08`

## Problem and outcome

A person changing a tab, filter or result page needs to understand that the content changed while retaining context, selection and focus. The swap communicates replacement or direction without duplicating interactive content or treating a request as a successful result.

## When to use / When not to use

Use for user-requested replacement within one stable surface/region. Route changes use [route-transition](route-transition.md); expansion uses disclosure. Do not animate every live refresh or imply left/right order when filters have no sequence. Frequent/keyboard paths stay instant, and Cut is valid wherever movement adds no information.

## Structure and slots

Required: `trigger` has real selection/query state; `region` names the replaceable content; `request` tracks current intent; `focus` has a stable target; `timing` uses the language's swap role. Optional: actual direction, preserved selection/scroll, outgoing decorative snapshot and bounded size transition. Bind browse → storefront → `primary` swap after toolbar query, or reader → `primary` after page selection; loading/outcome remains async-progress/empty-states responsibility.

## Variants

Exactly the four `contentSwap` labels:

- **Cut:** replace immediately. Clear and fast, best for frequent/keyboard work; provides no spatial cue, so selected tab/page and region headings must communicate context.
- **Crossfade:** old/new appear in the same place across a short opacity change. Softens replacement without inventing direction; overlapping text can be illegible and duplicate live controls must never coexist in accessibility/focus order.
- **Slide by direction:** next comes from the right, previous from the left, based on a real ordered relationship. Explains tab/page progression; wrong or fabricated direction misleads, and unordered query changes should use Cut instead.
- **Resize and settle:** the container grows/shrinks to fit, then new content fades in. Helps explain changing region size; adds measurement/layout cost and can move nearby controls, so choose only for bounded content and stable focus/scroll.

## States and transitions

Ready → requested → loading if needed → new ready/empty/failed. Selection updates to actual intent; result transition happens only when the correct result is available. A newer request supersedes older results and cancels their visual transition. Failure preserves usable prior content with a clear stale/current-query distinction and recovery. Animation interruption settles to the latest valid state rather than leaving both panels partly interactive. Focus remains on the trigger; if the focused item is removed, move to a stable region/heading or meaningful successor. Successful data replacement is not a route or task completion claim.

## Data and copy contract

Region ID, request/query/selection ID, actual result status/data, previous/current ordered index when direction exists, stable item IDs and selected option. Resize needs known current/target geometry at the transition, not continuous unnecessary measurement. Copy keys remain the owning surface's region title, selected tab/page, result count, loading, empty, stale and failed/retry. Support no results, long localized content, large height differences and removed selections. Do not invent intermediate values or fake data for an animation.

## Accessibility

Tabs use a correctly implemented tab/tabpanel model when they are truly tabs; filters/pagination retain their own semantics. Only one current region is interactive/exposed; outgoing visual snapshots are inert and hidden from assistive technology. Announce concise requested-result outcomes, not visual frames. Do not steal focus after a fetch or smooth-scroll unexpectedly. Keyboard/touch selects the same result; contrast, 44px intended targets, visible focus and zoom stay intact. Direction/opacity is not the only context signal.

## Responsive

Constrain slides to the content region and avoid whole-page horizontal overflow. Resize and settle must not move a focused trigger out of view. Stacked layouts may use Cut rather than a huge animated height change. A local scroll region keeps its declared position policy; phone recomposition does not erase query or selection.

## Motion

Use the swap duration/easing role, not data-fetch time. The new semantic state is available without waiting for the visual end; repeated requests are interruptible. Still/reduced-motion replaces immediately with static selected-state/result feedback, no slide, fade or interpolated size. Frequent/keyboard paths use the same instant behavior in timed languages.

## Looks

Quiet supports Cut/Crossfade; editorial protects text from double exposure; playful may use a bounded directional cue; brutalist favors direct replacement; print retains clear headings/page labels; immersive may use continuity but cannot obscure primary data. Every look has the same complete static state.

## References

- [Carbon motion](https://www.carbondesignsystem.com/building-blocks/foundations/motion/overview) — checked 2026-10-08, public guidance read: purposeful changes/static alternatives and bounded duration roles; not source measurement of these effects.
- [GOV.UK layout](https://design-system.service.gov.uk/styles/layout/) — checked 2026-10-08, documentation read: responsive readable layout; not an animated-height accessibility test.
- [EasyUI](https://easyui.site/) and [PaceUI](https://paceui.com/) — checked 2026-10-06 in earlier public-document research: link-only interaction breadth, no imported effect implementation or exercised behavior.

## Code you can use

[Carbon motion package](https://github.com/carbon-design-system/carbon/tree/main/packages/motion) is a candidate timing primitive under [Apache-2.0](https://github.com/carbon-design-system/carbon/blob/main/LICENSE), license read 2026-10-08. Retain license/attribution, applicable NOTICE and modification notices; review pinned source/dependencies/assets before adaptation. It is not a complete data-request/content-swap implementation, and no code is imported by this record. EasyUI/PaceUI remain inspiration links under the index posture. Docs-only checks did not exercise swaps, focus or cancellation.
