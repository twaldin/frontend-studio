---
id: empty-states
scale: component
studio: null
slots: {"required":[],"optional":["state"]}
variants: [{"id":"compactCue","label":"Compact inline cue"},{"id":"actionPanel","label":"Action panel"},{"id":"educationalFirstUse","label":"Educational first-use"},{"id":"starterContent","label":"Starter content"}]
states: ["loading","populated","firstUse","pending","noMatches","completed","denied","failed","configurationNeeded","partial"]
copy: ["empty"]
events: ["create","clearFilters","requestAccess","configure","retry"]
renderer: variants
---

# Empty states

`id: empty-states` · `scale: component` · `studio: no dedicated step; surface galleries include empty/loading examples` · `references checked: 2026-10-08`

## Problem and outcome

A person encountering no visible data needs to know why it is absent and whether to start, adjust, wait or recover. The empty state names the actual reason and puts an appropriate next action in the empty region. Nothing pending or inaccessible is silently called “empty.”

## When to use / When not to use

Use when a page, list, panel or collection has no displayable content. Loading uses [async-progress](async-progress.md); a broken route uses [error-pages](error-pages.md). Do not cover useful partial data with a whole-page empty illustration. Do not urge creation when the person lacks permission or when all work is genuinely complete.

## Structure and slots

Required: `reason` identifies the absence; `message` explains what the region normally holds or the current outcome; `recovery` supplies a next action when one exists. Optional: primary action, secondary help, small decorative image, educational content and clearly labeled starter objects. Bind a surface's `state` slot separately for first-use, no matches, complete work, denied and failed. The reason is state data, not inferred from an empty array alone.

## Variants

- **Compact inline cue:** one short reason beside the region's existing action. Fits secondary panels; low interruption but offers little teaching space. Use when the action is already discoverable.
- **Action panel:** reason, explanation and one primary next action replace the missing collection. Clear first-use/no-results recovery; consumes space and is noisy if repeated in every dashboard tile.
- **Educational first-use:** explanation of a primary feature plus a real start route and optional help. Useful for unfamiliar concepts; adds reading cost and should disappear when no longer relevant.
- **Starter content:** explicitly labeled, safe sample objects let people learn by doing. Good for complex creation tools; requires real editable/removable examples and a clear separation from user data. Never pretend samples are the person's activity or offer sample destructive actions as production work.

## States and transitions

Loading resolves to populated or an explicit absence reason. First-use creation → pending → populated or failed with inputs retained. No matches → adjust/clear query → loading → results or no matches. Completed work has an honest completion message, often without another primary action. Denied offers actual access/help routes without revealing protected objects. Service failure retains a real retry/status route and does not masquerade as first use. Configuration-needed points at required setup. Partial data remains visible with local messages for missing regions; recovery transitions preserve the originating scope.

## Data and copy contract

Reason enum, resource label, current query/filter scope if relevant, permission/configuration information safe to expose, and actual available action/destination. Starter objects require separate sample IDs and provenance. Support small panels, long localized explanations, no recovery capability and multiple empty regions. Copy keys cover each reason, primary verb, clear filters, access/setup/help, pending and failure. Do not blame the person or promise unavailable remedies; absence caused by success is not an error.

## Accessibility

Use a meaningful heading/text in the replaced region; remove irrelevant empty collection scaffolding from the reading order. Keep existing query controls available for no-results recovery. Do not move focus simply because an empty result arrives; announce concise outcomes after explicit searches. Images are decorative unless they add unique information with an alternative. Action semantics, visible focus, 44px intended touch targets, contrast and zoom remain intact. No state relies solely on an illustration or color.

## Responsive

Use text-first compact composition in narrow panels. Stack action/help without shrinking the message. Large illustrations are optional and yield space to explanation; the next action remains reachable on a phone and at zoom.

## Motion

No perpetual animation is needed to explain absence. A requested recovery can use control-response/async-progress; arrival uses short or no content swap. Still/reduced-motion gives the complete explanation and action immediately. Loading skeletons are never the still version of an empty state.

## Looks

Quiet favors concise text; editorial gives explanation hierarchy; playful can use original modest illustration without flippant denial/failure copy; brutalist names the reason directly; print uses a contextual note; immersive keeps the explanation/action legible rather than replacing them with a scene.

## References

- [Carbon empty states](https://www.carbondesignsystem.com/building-blocks/core/patterns/empty-states) — checked 2026-10-08, public guidance read: absence reasons, contextual actions and educational alternatives; no examples or prose copied and no interaction audit.
- [GOV.UK patterns](https://design-system.service.gov.uk/patterns/) — checked 2026-10-08, documentation read: task/state-specific composition; not evidence for decorative treatment effectiveness.
- [dev.cards](https://dev.cards/) and [PaceUI](https://paceui.com/) — checked 2026-10-06 in earlier public-document research: link-only empty-state breadth; no assets/code imported.

## Code you can use

[Carbon core](https://github.com/carbon-design-system/carbon) controls/notifications are candidates under [Apache-2.0](https://github.com/carbon-design-system/carbon/blob/main/LICENSE), read 2026-10-08. Retain license/attribution, applicable NOTICE and modification notices; audit pinned source/dependencies/assets. Its pattern prose does not establish a universally coded empty-state implementation. dev.cards' Commons Clause and PaceUI's per-item terms keep those sources link-only. This record imports no code and docs-only checks do not verify any empty-state interactions.
