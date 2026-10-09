---
id: route-transition
scale: interaction
studio: routeMotion
slots: {"required":[],"optional":["navigation","detail"]}
variants: [{"id":"cut","label":"Cut"},{"id":"fade","label":"Fade"},{"id":"axis","label":"Shared axis"},{"id":"continuity","label":"Continuity"}]
states: ["ready","requested","loading","failed","arrived"]
copy: []
events: ["navigate","back","forward","arrive","interrupt"]
renderer: variants
---

# Route transition

`id: route-transition` · `scale: interaction` · `studio: routeMotion` · `references checked: 2026-10-08`

## Problem and outcome

A person navigating between pages needs to know where they arrived and how to return without losing the originating object's context. Route transition optionally explains the relationship while history, document title, focus and scroll remain correct even when there is no animation support.

## When to use / When not to use

Use on real route/history changes. In-place tab/filter changes use [content-swap](content-swap.md); layers use layer-arrival. Do not use cinematic transitions on every frequent/keyboard action or imply spatial direction for unrelated pages. A route's loading/error page remains its own state, not an animation backdrop.

## Structure and slots

Required: `navigation` names source/destination and actual history action; `content` is the changing region under a stable shell when applicable; `arrival` updates title/focus/scroll; `fallback` is Cut. Optional: shared object identity/geometry, forward/back relation and decorative outgoing snapshot. Bind browse-inspect-act → storefront → selected product's `detail` route to Continuity only when that same object exists at both ends; the return binding restores collection selection/query.

## Variants

Exactly the four `routeMotion` labels:

- **Cut:** new page replaces old under a stable shell. Fast and robust across platforms; relies on heading/title/focus for orientation rather than spatial explanation.
- **Fade:** content crossfades under a still shell. Low travel and useful for unrelated destinations; overlapping text can reduce legibility and requires inert outgoing visuals, not two live pages.
- **Shared axis:** forward arrives from the right, back from the left according to actual history relationship. Helps hierarchical progression; misleading for unordered destinations and requires explicit history direction rather than guessing from URL text.
- **Continuity:** the selected object visually expands into its detail page. Preserves identity in browse/inspect flows; costs geometry/snapshot coordination and needs a Cut fallback when the source object is absent, offscreen or incompatible with the destination.

## States and transitions

Source ready → navigation requested → destination loading/ready/error → arrived. History commits by the router's real navigation contract, not animation completion. A superseding navigation interrupts the obsolete transition and resolves to the latest route. Failed destination render exposes the correct error/recovery instead of restoring a fake success snapshot. Back restores the source's meaningful selection/query/scroll when available. Missing continuity geometry, unsupported APIs or motion restrictions use Cut. Refresh/deep-link arrival needs no fictional source object; focus/title still update appropriately.

## Data and copy contract

Source/destination route IDs/URLs, history action/direction, destination document title/heading, focus/scroll policy and real data state. Continuity adds stable shared object ID and geometry, never copied source images with unknown rights. Copy keys belong to destination headings, loading/error/back and route labels; the motion itself creates no progress percentage or “done” message. Support direct entry, missing objects, long page titles and denied/not-found routes.

## Accessibility

Navigation is available through real links and normal browser history. Update document title and give an appropriate destination heading/main focus target on client navigation; preserve explicit deep-link targets and source focus on return. Shell remains reachable where the product contract allows. Outgoing snapshots are inert/hidden from assistive technology; only the current page is interactive. Announce route arrival sparingly and never visual frames. Keyboard/frequent navigation is instant, touch has non-swipe equivalents, and contrast/focus/44px intended targets/zoom remain intact.

## Responsive

The content boundary and shared object geometry derive from the current layout, not stale desktop coordinates. Constrain directional travel to the viewport without accidental horizontal page scrolling. Large mobile/zoom transitions can use Cut; query, return route and destination actions remain reachable in every composition.

## Motion

Use the motion-language route role for optional visuals, with no blocked input or queued history transitions. Still/reduced-motion and keyboard/frequent paths use Cut for all four options, preserving title, focus, history and scroll behavior. Navigation never waits for a fade/growth to decide whether it succeeded.

## Looks

Quiet commonly suits Cut/Fade; editorial prioritizes immediate reading arrival; playful may use bounded Shared axis; brutalist/print can be direct; immersive can use Continuity for a real media/item relationship. These are suggestions, not permissions to trade semantics for cinematic effects.

## References

- [Carbon motion](https://www.carbondesignsystem.com/building-blocks/foundations/motion/overview) — checked 2026-10-08, public guidance read: purposeful larger transitions and static alternatives; no route implementation/performance test.
- [GOV.UK patterns](https://design-system.service.gov.uk/patterns/) — checked 2026-10-08, documentation read: task/page composition; route history/focus details above are independently authored requirements.
- [Great UI](https://great-ui.com/components) and [EasyUI](https://easyui.site/) — checked 2026-10-06 in earlier public-document research: link-only transition breadth, not imported effects, assets or exercised keyboard/history behavior.

## Code you can use

[Carbon motion package](https://github.com/carbon-design-system/carbon/tree/main/packages/motion) supplies candidate timing primitives under [Apache-2.0](https://github.com/carbon-design-system/carbon/blob/main/LICENSE), license read 2026-10-08. Keep license/attribution, applicable NOTICE and modification notices; pin/review source/dependencies/assets. This does not clear a complete router integration; no third-party implementation imported here. Great UI's custom no-kit redistribution posture keeps it link-only. EasyUI's inherited MIT description needs per-item/media review and stays a link here. Docs-only reading did not exercise route transitions or fallback behavior.
