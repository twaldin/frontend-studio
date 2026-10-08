# Feed

`id: feed` · `scale: surface` · `studio: feedLayout` · `references checked: 2026-10-08`

## Problem and outcome

A person keeping up with people, topics or sources needs to scan new entries, inspect one and respond without losing their place. A feed preserves ordering and entry identity while allowing the same content to be read at different densities.

## When to use / When not to use

Use for a changing stream where recency or editorial grouping matters. Do not use for work that must move between explicit stages: choose [board](board.md). A stable product catalog is [storefront](storefront.md); long-form reading is [reader](reader.md). Avoid endless scrolling when a bounded, paginated collection answers the task better.

## Structure and slots

Required: `header` identifies stream/scope; `primary` contains ordered entries; each entry has identity, content and its permitted actions; `state` explains loading/empty/failure; `continuation` provides a real next-page/end boundary. Optional: `toolbar` for sort/filter, `composer`, media, topic headings, unread boundary and detail/replies. Bind browse-inspect-act → feed → `toolbar` to [search-filter](search-filter.md), and `state` to [empty-states](empty-states.md). A composer is absent when posting is not a capability.

## Variants

The four labels exactly match `feedLayout`.

- **Timeline:** whole entries in one column. Good for reading and replying in sequence; long posts/media reduce scan density. Choose when voice and context matter.
- **Cards:** media-led entries in two columns where space permits. Good for visual discovery; weak for strict chronological comparison and long text. Keep a deterministic DOM/reading order rather than masonry that scrambles chronology.
- **Compact list:** a title and concise metadata per row. Fast for scanning many entries; inspection requires a detail route and expressive media has less room.
- **Digest:** topics collect summaries under headings. Good for a bounded briefing; editorial grouping obscures global recency unless dates remain explicit. Needs genuine topic/summary data, not a relabeled timeline.

## States and transitions

Load → populated, first-use empty, no matches, denied or failed. Load-more appends stable IDs without replacing the focused entry. Refresh offers a new-entry notice rather than inserting above a reader unexpectedly. Open/reply/save updates the targeted entry only; pending actions expose progress, confirmed success updates counts, failure retains content and allows a legitimate retry. Removed entries explain their absence where a focused/detail item was. End-of-stream is distinct from a failed next page; preserve already-loaded entries on pagination failure.

## Data and copy contract

Each entry needs ID, author/source label, timestamp, content/title/summary appropriate to the variant, permitted actions and real counts. Media has dimensions, alt text or an explicit decorative designation. Digest requires topic IDs and grouping order. Provide zero, one and many entries; long titles, absent avatars/media and multiline text. Copy keys include scope, action labels, pagination, new-entry notice, first-use, no matches, unavailable and failed. Counts use plural rules; relative times have an accessible absolute value.

## Accessibility

Use an ordered list or labeled sections with articles; do not add an ARIA feed role without its complete navigation contract. Name entry actions with entry context. Native links/buttons offer keyboard and touch equivalents. Focus stays on the active action during refresh; return from detail to the originating entry. Announce concise page-load outcomes, not each inserted post. Maintain 44px intended touch targets, visible focus, contrast and readable text at zoom; never rely on hover for actions or color for unread state.

## Responsive

Cards become one column when two readable cards no longer fit. Compact metadata wraps instead of pushing the action offscreen. Context panels become a detail view with an explicit return. One scroll owner carries stream position; media stays inside the content width.

## Motion

Use short local response for save/reply and optional [content-swap](content-swap.md) on a requested filter change. Do not stagger every entry or animate an automatic refresh. Still/reduced-motion inserts complete items with static unread/status cues and no scroll travel.

## Looks

Quiet uses light separators; editorial emphasizes titles/bylines; playful can accent reactions; brutalist uses explicit metadata and divisions; print reads as a news index; immersive may foreground media but protects captions and actions on high-contrast surfaces. All retain the same order and state meanings.

## References

- [GOV.UK layout](https://design-system.service.gov.uk/styles/layout/) — checked 2026-10-08, documentation read: narrow-first recomposition and readable measures, not feed-specific usability evidence.
- [Carbon empty states](https://www.carbondesignsystem.com/building-blocks/core/patterns/empty-states) — checked 2026-10-08, guidance read: contextual missing-data reasons/recovery, no interaction audit.
- [DesignBookmark](https://designbookmark.com/) — checked 2026-10-06 in earlier public-document research: discovery links only; these four feed topologies are original synthesis, not imported screenshots or measured source behavior.

## Code you can use

[Carbon core](https://github.com/carbon-design-system/carbon), candidate controls under [Apache-2.0](https://github.com/carbon-design-system/carbon/blob/main/LICENSE), license read 2026-10-08. Preserve license/attribution, modified-file notices and applicable NOTICE entries; separately audit dependencies/assets and pin a revision before adaptation. No complete feed or third-party implementation is imported here. DesignBookmark and its linked products remain link-only; directory inclusion supplies no reuse rights. Docs-only checks do not exercise the studio feed.
