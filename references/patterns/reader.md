# Reader

`id: reader` · `scale: surface` · `studio: readerLayout` · `references checked: 2026-10-08`

## Problem and outcome

A person reading a long article, document or lesson needs a comfortable measure and a reliable way to locate sections and resume. The reader makes content, supplementary explanation and progress understandable without requiring animation or pointer precision.

## When to use / When not to use

Use for sustained reading with meaningful document structure. Do not force a short utility result into pages or add an outline to a text without sections. Editing is [create-edit](create-edit.md); stream scanning is [feed](feed.md). Required instructions must stay visible, not hidden as optional notes.

## Structure and slots

Required: `header` names the document and its relevant metadata; `primary` holds semantic content; `position` gives a meaningful place/return mechanism; `state` handles unavailable content. Optional: `outline`, `notes`, glossary, saved position, lesson completion, previous/next, media and related reading. Bind learning flow → reader → `primary` to the lesson; `notes` to disclosure; `completion` to the real completion action/confirmation. Progress is not automatically mastery.

## Variants

Exactly the four `readerLayout` labels:

- **Single column:** one centered measure without adjacent panels. Minimizes distraction; navigation through a large document takes more scrolling. Choose for linear reading.
- **With outline:** a persistent section index beside the text. Good for reference and returning to a section; costs width and requires stable heading IDs plus truthful current-section tracking.
- **Margin notes:** explanations sit near their references. Makes contextual detail convenient; needs careful reading order and narrow-screen recomposition to avoid orphaned notes.
- **Paged:** one page at a time with page controls and progress. Provides bounded chunks; makes find, deep links and reflow harder. Choose only with explicit page/position semantics, not arbitrary clipping of a scrolling document.

## States and transitions

Load → readable, missing, denied or failed. Saved position restores after content layout is known without overriding an explicit deep link. Outline/next-page actions move to the selected heading/page and give it a reachable focus target. Unavailable media leaves an explanation/transcript rather than blocking the text. Save-position failure is shown without discarding the current position. Content updates resolve position by stable section identity, with a notice if the old anchor vanished. Mark-complete shows pending, failed or confirmed; reading to the bottom alone is not confirmed task completion.

## Data and copy contract

Document ID/title, semantic ordered sections with stable IDs, text/media alternatives, language and relevant author/update metadata. Optional notes link to their section; paged mode requires ordered page IDs and reflow policy. Provide short and long chapters, long headings, missing notes, diagrams and code overflow. Copy keys cover contents, note label, previous/next, position, completion, unavailable, restored/moved position and recovery. Progress states exactly what is measured: page position, reading estimate or acknowledged lesson completion.

## Accessibility

Use article/main, logical headings and a named outline nav. Links target real sections; after user navigation, focus can reach the destination heading without destroying normal reading order. Connect note markers to notes with return links; don't require hover. Expose selected section/page in text and semantics. Media has alternatives and controls. Preserve browser find, text selection and zoom; no swipe-only paging. Provide visible focus, 44px intended touch page controls, contrast and readable measures.

## Responsive

Outline becomes a reachable contents disclosure; margin notes move after their referenced block with markers preserved. Paged text reflows without losing the logical section/position; oversized code/tables get labeled local overflow or alternate presentation. At narrow width and zoom, primary text does not share a squeezed column with optional panels.

## Motion

Optional short page/content swap can show a requested change; the reader never gates text behind scrolling choreography. Still/reduced-motion jumps to sections/pages without smooth scroll or simulated page curls. Save/completion state remains textual and immediate.

## Looks

Quiet reduces chrome; editorial and print emphasize typographic rhythm; playful can accent lesson navigation but not body-text legibility; brutalist uses strong section boundaries; immersive supports rich media beside a protected reading surface. All preserve semantics and usable text selection.

## References

- [GOV.UK layout](https://design-system.service.gov.uk/styles/layout/) — checked 2026-10-08, documentation read: small-screen-first and bounded text measure; not a reader performance experiment.
- [GOV.UK details](https://design-system.service.gov.uk/components/details/) — checked 2026-10-08, guidance read: optional information can be disclosed, majority-needed information should not be hidden; no voice-control exercise performed.
- [DesignBookmark](https://designbookmark.com/) and [dev.cards](https://dev.cards/) — checked 2026-10-06 in earlier public-document research: link-only breadth for reading/section composition, no copied product content or assets.

## Code you can use

[GOV.UK Frontend](https://github.com/alphagov/govuk-frontend) is a candidate for details/layout building blocks, not a complete paged reader. Its [MIT license](https://github.com/alphagov/govuk-frontend/blob/main/LICENSE.txt), read 2026-10-08, requires retaining the Crown Copyright and permission notice in copies/substantial portions. Pin/review source, dependencies and assets separately; do not import government branding or assume the software license covers website prose. DesignBookmark/downstream examples and dev.cards remain link-only under the index posture. No code imported or interactions checked here.
