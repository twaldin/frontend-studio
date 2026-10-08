# Search and filter

`id: search-filter` · scale: flow · studio: no studio step · references checked: 2026-10-08 (new primary guidance); 2026-10-06 (inherited link-only inspiration)

## Problem and outcome

A person needs a manageable set of relevant items from a large collection. Query text, filters and sort can compete or silently persist, leaving an unexplained empty result. This flow makes the search scope and applied criteria visible, returns a truthful result state and provides a way to broaden the search without starting over. It ends when the person can inspect a relevant item or understand that there is no current match.

## When to use / When not to use

Use for a collection too large or varied to scan directly, with searchable fields or meaningful predefined facets. Bind it to a [storefront](storefront.md), [feed](feed.md), [board](board.md) or other collection's toolbar/results slots. Continue into [browse-inspect-act](browse-inspect-act.md).

Do not add filters for distinctions that barely affect a short list. Do not call sort a filter: ordering does not remove items. A command/action launcher belongs in [command-palette](command-palette.md). Search cannot substitute for permission-aware data access; unavailable private records must not leak through counts or suggestions.

## Structure and slots

- **Required — scope and query:** a named search input, an explicit scope when not obvious and the submit behavior appropriate to the variant.
- **Required — results:** collection identity, current query/criteria, count or an honestly partial count, and list/grid/table appropriate to the content.
- **Required — applied criteria:** visible selected filters, individually removable where appropriate, and a clear-all route; hidden filter containers still expose their applied count.
- **Required — status/recovery:** loading, no collection data, no matches, partial/stale results and failure are distinct.
- **Required when filtering — facet controls:** named groups, actual choices and single/multiple-selection semantics.
- **Optional — sort, pagination and suggestions:** independent of filtering, with coherent URL/history and keyboard behavior.
- **Optional — staged apply:** unapplied choices and applied choices are distinguishable; cancel restores the currently applied criteria.

## Variants

| Variant | Gain | Cost and choice |
| --- | --- | --- |
| Submitted search with filter bar | A deliberate search request and a few visible facets create a predictable results view. | Requires a submit action and space for controls; choose for expensive queries or a small facet set. |
| Active local search | Results narrow in place while the person types or changes a lightweight filter. | Can overload remote services and announcements; choose for small/fast data where immediate feedback is genuinely helpful. |
| Faceted panel with batch apply | Several categories can be adjusted before one refresh. | Draft versus applied filter state needs explicit handling; choose for complex combinations, slow retrieval or a phone filter sheet. |
| Focused search with broader escape | Starts within a named collection and offers an explicit wider search. | Two scopes can confuse counts/history; choose when local discovery is common but a broader corpus is useful. |

## States and transitions

**Initial → editing query/draft filters → request pending → populated/no matches/failed.** In the submitted/batch variants, editing alone does not change the applied result identity. In active search, use the chosen scheduling policy and ignore responses for superseded criteria; a late result must not overwrite the current query. **Filters applied** exposes the actual selections and reset route. **Clear one/all** restores the defined default criteria and resets pagination appropriately. **No collection data** offers the relevant create/import action; **no matches** suggests broadening/removing criteria, not creating a duplicate record. **Partial/stale results** names the limitation and never claims a complete current count. **Load more/page change** preserves criteria and reports the next-page failure without clearing existing results. **Open item/return** restores query, filters, sort and position. **Unavailable facet** explains changed options rather than leaving a hidden active criterion. **Access denied** exposes no unauthorized data or counts.

## Data and copy contract

A search state contains query, explicit scope ID, facet IDs/values, sort, page/cursor and applied revision. Results have stable item IDs, request identity, count/partial flag and retrieval outcome. Facets supply labels, allowed values, selection mode, defaults and counts only when those counts are reliable and safe to disclose. Define matching and combination rules: for example, OR within a category and AND across categories only if the actual service behaves that way. Reset returns to those stated defaults, not necessarily an empty object. Separate draft panel selections from applied criteria. Handle blank query, zero/one/many results, long queries and labels, translated facets and values that disappear. URL state must not encode sensitive query content when policy prohibits sharing it.

Every visible string comes from the copy deck: `searchFilter.queryLabel`, `placeholder`, `scopeLabel`, `allScope`, `search`, `filters`, `apply`, `cancel`, `clearOne`, `clearAll`, `appliedCount`, `resultsCount`, `partialCount`, `sort`, `loading`, `noData`, `noMatches`, `broaden`, `failed`, `retry`, `loadMore`, `scopeEscape`. Count grammar supports zero/one/many. Do not show a sample result or estimated count as though it came from the service.

## Accessibility

Give the search an accessible name; this contract keeps a visible label unless the surrounding named search region makes it redundant. A placeholder/icon alone is not the naming strategy. Use standard radios/checkboxes/selects for facets, real buttons for clearing/applying and meaningful labels for sort. If suggestions exist, implement a coherent combobox keyboard model with arrows, Enter and Escape; do not fake it with unstructured hover rows. Preserve focus on a filter/query control as results refresh and announce a concise settled result count politely. Explicit navigation to a results route focuses its heading. A modal phone panel follows [dialogs-and-layers](dialogs-and-layers.md), including focus containment and return; a nonmodal panel does not trap focus. Support keyboard and touch, visible focus, 4.5:1 text contrast, 3:1 control/focus contrast, reflow at 400% zoom and targets at least 24 by 24 CSS pixels or suitable spacing; prefer 44 by 44 touch controls. These are unexercised implementation requirements.

## Responsive

At phone width, keep query, current scope, applied count and clear-all reachable. Move several facet groups into a named sheet/panel with Apply and Cancel when batching, retaining visible applied criteria outside it. Stack result facts rather than forcing narrow multi-column controls. Wrapping selected-filter chips must not push all results or the clear action out of reach.

## Motion

Use short control acknowledgment and a moderate [content-swap](content-swap.md) role for settled result replacement. Avoid animating every row on every keystroke, moving the user's focused facet or flashing empty results between requests. Reduced motion updates immediately and uses static loading/status text with the same count announcement. Panel movement follows the chosen layer motion without delaying filter entry.

## Looks

**Quiet:** compact query and plain selected criteria. **Editorial:** prominent scope/results heading and readable result snippets. **Playful:** friendly facet markers with ordinary labelled controls. **Brutalist:** explicit query/filter/result blocks and hard selection outlines. **Print:** a catalogue-like query summary, ruled facets and documentary counts. **Immersive:** opaque toolbar/panel and high-contrast result facts over optional media. All distinguish draft filters, applied filters and sort.

## References

- [Carbon: search](https://www.carbondesignsystem.com/building-blocks/core/patterns/search) — checked 2026-10-08; supports basic/active/focused search, scope, counts, no-result recovery and retained focus. Its visual-label recommendation is not adopted as permission to omit an accessible name.
- [Carbon: filtering](https://www.carbondesignsystem.com/building-blocks/core/patterns/filtering) — checked 2026-10-08; supports selection semantics, batch versus instant refresh, applied indicators and reset. Documented guidance, not measured search quality.
- [GOV.UK: question pages](https://design-system.service.gov.uk/patterns/question-pages/) — checked 2026-10-08; supports purposeful labelled questions and not requesting unnecessary information. Does not prescribe this search scheduling model.
- [dev.cards](https://dev.cards/) — inherited public-source research dated 2026-10-06; link-only UI-category exploration. MIT plus Commons Clause is not plain MIT, so no unrestricted commercial reuse is inferred.

## Code you can use

Candidate, not imported: [Carbon React](https://github.com/carbon-design-system/carbon/tree/main/packages/react) Search, Checkbox, RadioButton, Select and Pagination controls under [Apache-2.0](https://github.com/carbon-design-system/carbon/blob/main/LICENSE), checked 2026-10-08. Include the license, retain applicable notices/NOTICE attribution and mark modified files. Candidate, not imported: [GOV.UK Frontend](https://github.com/alphagov/govuk-frontend) labelled inputs/radios/checkboxes under [MIT](https://github.com/alphagov/govuk-frontend/blob/main/LICENSE.txt), checked 2026-10-08; keep Crown copyright and the full permission/warranty notice.

These controls do not provide an index, ranking, authorization or count service. Review selected-version dependencies, fonts and media independently. dev.cards remains link-only because its additional restriction changes reuse rights; no snippets, source images or corpus are imported. This record is original prose and claims no exercised search or accessibility result.
