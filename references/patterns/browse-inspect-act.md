---
id: browse-inspect-act
scale: flow
studio: commerceLayout
slots: {"required":["collection","selection","detail","actions","return","outcome"],"optional":["compare","save","media","facts"]}
variants: [{"id":"grid","label":"Grid"},{"id":"list","label":"List"},{"id":"shelves","label":"Shelves"},{"id":"split","label":"List and detail"}]
states: ["loading","populated","empty","noMatches","failed","selecting","detailLoading","ready","unavailable","deleted","denied","available","acting","succeeded","changedTerms","outcomeUnknown","removed","bulkSelected"]
copy: ["inspect","backToResults"]
events: ["select","inspect","act","return","filter"]
renderer: schematic
sharesVariants: storefront
---

# Browse, inspect, act

`id: browse-inspect-act` · scale: flow · studio: `commerceLayout` (“List and detail” specimen; variant names match the surface options) · references checked: 2026-10-08 (new primary guidance); 2026-10-06 (inherited link-only inspiration)

## Problem and outcome

A person needs to find one suitable item among many, inspect enough detail to decide and perform a meaningful action. Losing the collection state when opening details makes comparison expensive; acting from a thumbnail without important constraints can lead to the wrong choice. This flow starts with a collection and ends with an acknowledged item-specific action while preserving a sensible route back to browsing. The item might be a product, document or other independently authored generic record; inspection does not always imply purchase.

## When to use / When not to use

Use when collection entries need more explanation than fits in their preview, or when people compare several candidates before acting. Bind the browse surface to [storefront](storefront.md), [feed](feed.md) or another appropriate surface, and its narrowing slot to [search-filter](search-filter.md). A purchase continues into [checkout](checkout.md).

Do not add an inspection stage when a fully described, low-risk action can safely happen in the list. Reading one long item is [reader](reader.md), not a permanent list/detail split. Creation is [create-edit](create-edit.md). Do not make the entire row a competing activation target around nested links and action controls.

## Structure and slots

- **Required — collection:** named scope, identifiable entries, useful preview information and loading/empty/failed states.
- **Required — selection/inspection route:** an explicit item link or inspection control, selected identity and a detail destination that can be restored or shared where appropriate.
- **Required — detail:** title, decision-relevant facts, availability/permission and the item's current version or freshness when it affects the action.
- **Required — action:** a clearly named item-specific command with the important consequences, price or destination visible before activation.
- **Required — return/context:** retained query, filters, ordering and position, plus a recognisable way to inspect another item.
- **Required — outcome:** an acknowledged action result and failure/recovery region; use [confirmation](confirmation.md) when a durable receipt is needed.
- **Optional — compare/save, media and secondary facts:** do not hide essential constraints behind decorative media or secondary tabs.

## Variants

These names match `commerceLayout`; the binding still separates the flow from its [storefront](storefront.md) surface.

| Variant | Gain | Cost and choice |
| --- | --- | --- |
| Grid | Picture-led previews open a dedicated, shareable detail view. | Returning needs explicit query/position restoration and images need useful alternatives; choose when appearance is a major decision factor. |
| List | Comparable facts sit in aligned rows, with a compact inline inspection or detail route. | Dense previews can become hard to scan; choose when attributes, availability or price matter more than large media. |
| Shelves | A category context helps the person enter a relevant group before inspecting one item. | Curated ordering can hide the full inventory; choose for meaningful categories and retain a route to the complete collection. |
| List and detail | The selected item's detail and action sit beside the collection so the person can inspect successive items. | Divides horizontal space and needs clear focus/selection state; choose for repeated inspection, recomposing to a single-view sequence on phones. |

## States and transitions

**Collection loading → populated/empty/failed.** A query can produce **no matches**, distinct from no collection data. **Selecting → detail loading → ready** updates the inspected identity; stale responses for earlier selections must not replace the current detail. **Detail unavailable/deleted/denied** explains the item-level issue while retaining browsing context. **Available → acting → succeeded/failed** uses the service's actual result. Availability or price changing during inspection requires a current recheck and an explicit revised decision when necessary. **Action outcome unknown** keeps the existing operation's status route rather than inviting duplicate activation. **Return/next selection** preserves filters and position, including the narrow-screen list/detail sequence. **Removed from current result set** identifies what happened and offers a logical next item; do not silently show an unrelated detail as though it were still selected. A bulk selection is a different state from the inspected item and must be labelled separately.

## Data and copy contract

Supply collection ID/scope, result IDs/order, query/filter state, total or an explicitly partial count, pagination/cursor and selected item ID. Preview/detail share a stable identity; detail adds decision fields, availability, permitted actions and revision. An action references the current item and reports its result independently of whether the collection reload succeeded. One collection and at most one inspected item are required for the split variant; optional comparison is separately named and bounded. Handle zero/one/many items, long names, unavailable media, absent optional facts and a result removed during inspection. Do not truncate the only identity or an action's consequence.

Every visible string comes from the copy deck: `browseInspectAct.title`, `inspect`, `backToResults`, `selected`, `loadingDetail`, `noSelection`, `noMatches`, `unavailable`, `denied`, `facts`, action names/consequences, `working`, `succeeded`, `failed`, `outcomeUnknown`, `nextItem`. Price and status copy derive from current data. A visually selected row must correspond to the item actually being acted on.

## Accessibility

Use lists or tables according to the information relationship, links for detail navigation and buttons for commands. Do not use a listbox role merely to obtain arrow-key styling around rich interactive rows. In a split view, retain focus on the chosen item for a background detail refresh and provide a direct way to reach the named detail region. Explicit navigation to a detail page focuses its heading; returning restores the originating link or a logical fallback if it vanished. Announce completed detail/status updates once, not every loaded field. All selection, inspection and actions work with keyboard and touch; hover previews are supplementary. Provide visible focus, 4.5:1 text contrast, 3:1 control/focus contrast, 400% zoom reflow and at least 24 by 24 CSS-pixel targets or suitable spacing; prefer 44 by 44 touch actions. No interaction/accessibility exercise is claimed.

## Responsive

At phone width, list and detail become successive views rather than two cramped columns. Keep the collection state and a clearly labelled return route; do not strand the person in a sheet without an item URL or navigation model. Reflow decision facts ahead of the action, and keep price/availability visible near commitment. Horizontal shelves need explicit controls as well as touch scrolling; essential discovery cannot depend on a swipe alone.

## Motion

Use a short selection/control response and moderate [content-swap](content-swap.md) or route role to explain which detail changed. Do not slide an entire list for each selection or make an action wait for media animation. Reduced motion replaces detail immediately with the same heading, focus rules and status. Retain a stable loading area rather than flashing between empty and filled panes.

## Looks

**Quiet:** compact list and calm detail region. **Editorial:** strong item title and readable decision narrative. **Playful:** distinct original item accents with conventional actions. **Brutalist:** hard collection/detail division and explicit selection border. **Print:** a catalogue-like list and documentary fact block. **Immersive:** optional large media beside a stable opaque action/fact region. Selection, availability and consequences remain explicit in every look.

## References

- [Carbon: data table](https://www.carbondesignsystem.com/building-blocks/core/components/data-table/guidelines) — checked 2026-10-08; supports comparable rows, separate selection/expansion/actions and moving cramped detail into a dedicated page or panel. Does not require tables for picture-led collections.
- [Carbon: search](https://www.carbondesignsystem.com/building-blocks/core/patterns/search) — checked 2026-10-08; supports scoped discovery, counts and useful no-result recovery. Documentation-only evidence.
- [GOV.UK: check answers](https://design-system.service.gov.uk/patterns/check-answers/) — checked 2026-10-08; supports inspecting relevant information and named corrections before consequential commitment. The selection/reconciliation contract above is independently specified.
- [DesignBookmark](https://designbookmark.com/) — inherited public-source research dated 2026-10-06; link-only discovery directory, not evidence for a specific layout or clearance for downstream sites.
- [Cue](https://www.cuedesign.space/) — inherited public-source research dated 2026-10-06; link-only pointer. Its corpus was neither fetched nor ingested for this record; its AI-ingestion restriction rules out using it as research content. No pattern claim is attributed to that corpus.

## Code you can use

Candidate, not imported: [Carbon React DataTable](https://github.com/carbon-design-system/carbon/tree/main/packages/react/src/components/DataTable) selection/expansion primitives under [Apache-2.0](https://github.com/carbon-design-system/carbon/blob/main/LICENSE), checked 2026-10-08. Provide the license, retain relevant notices/NOTICE attribution and mark modified files. Candidate, not imported: [GOV.UK Frontend](https://github.com/alphagov/govuk-frontend) summary-list and button controls under [MIT](https://github.com/alphagov/govuk-frontend/blob/main/LICENSE.txt), checked 2026-10-08; keep Crown copyright and the full permission/warranty notice.

Neither provides the whole item routing/action service. Audit chosen-version dependencies and independently license media/fonts; source demo imagery, marks and screenshots are not cleared. DesignBookmark destinations require separate rights review; Cue remains strictly link-only for the stated restriction. This record imports no prose, code or assets and claims no tested usability/accessibility result.
