# Command palette

`id: command-palette` · `scale: component` · `studio: no studio step` · `references checked: 2026-10-08`

## Problem and outcome

A frequent user needs to reach a command, object or place without walking through several navigation levels. A palette lets them search a clearly defined scope and execute a real permitted action, while ordinary navigation remains available to people who do not know its vocabulary.

## When to use / When not to use

Use for enough commands/destinations that typing materially shortens the path. A small menu is simpler; product-content discovery belongs to [search-filter](search-filter.md). Do not make the palette the only way to perform a required task. Destructive operations still use [destructive-action](destructive-action.md), not unchecked immediate execution.

## Structure and slots

Required: `trigger` is a named visible control plus optional shortcut; `query` has a label and scope; `results` show action/destination type and permitted matches; `selection` is explicit; `state` explains no matches/loading/error; `close` restores context. Optional: grouped commands, shortcut hints, recent destinations, scope chooser and preview. Bind a product's navigation flow → shell → `commands` to this record; each command maps to a real route/action and its owning task state contract.

## Variants

- **Flat command search:** one query with ranked actions/destinations. Fast to learn; ambiguous similarly named commands need group/context labels. Best for a modest command set.
- **Scoped palette:** choose a domain or typed prefix before matching. Reduces noise in large products; adds a scope-selection step and needs discoverable scope vocabulary plus a way back.
- **Search with preview:** selected result exposes descriptive detail beside the list before execution. Helps identify similar objects or consequential commands; consumes width and must not execute just because the active row changes.

## States and transitions

Closed → open with focused query → idle/results, searching, no matches or failed. Typing updates results; asynchronous stale results cannot replace a newer query. Arrow/touch selection changes preview, not execution. Enter/explicit selection executes only the current permitted result; navigation closes to the destination, while task commands show pending/outcome in their owning region. Failure keeps query/context available. Escape/back closes and restores trigger focus; nested scope Escape first exits that scope. Denied/unavailable commands either disappear when safe or show a meaningful reason; do not leak protected object names in search.

## Data and copy contract

Command ID/title/type, scope, keywords, eligibility, execution/destination and optional shortcut/description. Object results have stable ID and context; recents must be actual permitted history. Support no commands, one match, many matches, long similar names and localized keywords. Copy keys cover trigger, query, scope, groups, result count, no matches, searching, permission/failure and execution consequence. Keyboard hints reflect the actual platform and shortcut, never copied example bindings that do nothing.

## Accessibility

Use a labeled dialog when modal, with a correctly implemented combobox/listbox search model or a simpler labeled input and keyboard-reachable result buttons. Do not mix both models inconsistently. Announce active result/count concisely; selected/disabled states are semantic and textual. Arrow keys move active result, Enter executes, Escape closes, and Tab follows the declared model; touch performs the same actions. Initial focus goes to query, modal focus stays contained and close returns to the trigger or stable shell control. No hover-only preview information; maintain focus, contrast, 44px intended targets and zoom.

## Responsive

Preview moves below the list or to an explicit detail action. Query and close stay reachable above the virtual keyboard, results scroll in one bounded region, long labels wrap with type/context retained. Do not require an offscreen shortcut legend to understand execution.

## Motion

Frequent/keyboard-opened palettes are instant under every motion language. Optional pointer-open layer-arrival never delays typing. Still/reduced-motion cuts open/closed and updates results immediately with the same selection, announcements and focus return.

## Looks

Quiet minimizes chrome; editorial improves group/description hierarchy; playful may accent scope chips; brutalist exposes action types directly; print reads as a command index; immersive protects query/results contrast. None changes search scope or hides the visible trigger.

## References

- [Carbon disclosures](https://www.carbondesignsystem.com/building-blocks/core/patterns/disclosures) — checked 2026-10-08, public guidance read: explicit trigger and interactive secondary content; not a command-search keyboard audit.
- [GOV.UK button](https://design-system.service.gov.uk/components/button/) — checked 2026-10-08, documentation read: action wording/primary hierarchy; palette behavior above is an original contract, not copied code.
- [Cue](https://www.cuedesign.space/) — link registered in earlier research dated 2026-10-06 only. Corpus/item prompts were not fetched or ingested for this work. It is a link-only expressive reference, not evidence for the variants or accessibility behavior above.

## Code you can use

[Carbon core](https://github.com/carbon-design-system/carbon) controls/layers are candidates under [Apache-2.0](https://github.com/carbon-design-system/carbon/blob/main/LICENSE), read 2026-10-08. Retain license/attribution, applicable NOTICE and modification notices; review pinned source/dependencies/assets. No complete command palette or search engine is imported or claimed cleared. Cue's restrictive AI-ingestion/library posture excludes its corpus, code, prompts and media here. Docs-only reference reading did not exercise a palette or establish accessibility conformance.
