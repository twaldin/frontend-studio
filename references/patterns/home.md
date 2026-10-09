---
id: home
scale: surface
studio: null
slots: {"required":["identity","primary","navigation","state"],"optional":["resume","secondary","summary","help","header","actions"]}
variants: [{"id":"launcher","label":"Action launcher"},{"id":"continue","label":"Continue work"},{"id":"collection","label":"Collection landing"},{"id":"status","label":"Status overview"}]
states: ["loading","firstUse","populated","failed","resumable","partial","denied","stale"]
copy: ["title"]
events: ["start","resume","complete","refresh","navigate"]
renderer: variants
---

# Home

`id: home` · `scale: surface` · `studio: no dedicated step; archetype selects the home anatomy` · `references checked: 2026-10-08`

## Problem and outcome

A returning person needs to decide what to do next without deciphering the whole product. The home establishes the current context, puts one useful next action within reach, and makes unfinished work easy to resume. Success means the person can start or continue their actual flow, not merely admire a dashboard.

## When to use / When not to use

Use when several meaningful destinations or unfinished objects need orientation. Do not insert a home between a person and a single focused tool; open that tool directly. A new person's first useful result belongs to [first-run](first-run.md), not a permanent tutorial on every visit.

## Structure and slots

Required: `identity` names the current product/context; `primary` holds the next action or primary objects; `navigation` reaches actual destinations; `state` explains missing, unavailable or stale content. Optional: `resume` for unfinished objects, `secondary` for recent activity, `summary` for actionable counts, and `help` for contextual setup. Do not add a metric slot when no decision depends on it.

Binding example: flow “continue a lesson” → home → `resume` → [reader](reader.md), then its reading surface. The home binding names the destination and object, not just a decorative card.

## Variants

These four composition families are not additional `archetype` option labels. All nine archetypes remain available; the brief chooses a fitting family.

- **Action launcher:** a focused input or primary command with a few examples. Fast for Utility and Conversation; weak for browsing or comparing many objects.
- **Continue work:** unfinished objects dominate, with creation secondary. Fits Course or reader, Media library, Editor or canvas and Game companion; needs trustworthy saved progress and an honest first-use state.
- **Collection landing:** begin in the stream or catalog itself. Fits Feed and Store or marketplace; removes a navigation hop but gives less room for account-level orientation.
- **Status overview:** current work and actionable exceptions lead. Fits Workspace and operational companion use; supports triage but becomes noise if it accumulates vanity figures.

## States and transitions

Initial loading resolves to first-use, populated or failed. Returning with saved work exposes resume actions. A completed item leaves the resume set only on confirmed completion. Partial fetches preserve usable regions and mark unavailable ones locally. Permission changes show a denied explanation without leaking hidden objects. Refresh resolves stale content; failure retains last-known content with its age and a real retry action. Navigation carries the selected object into its destination.

## Data and copy contract

Provide context label, permitted destinations, primary capability, zero or more resumable objects with stable IDs/URLs and updated times, and optional summaries with their meaning and freshness. Support one object, dozens of recents, long titles and no available action. Copy keys cover heading, primary verb, resume, first-use reason, partial, stale, failed and access request; all strings come from the product copy deck. Never fabricate activity to fill space.

## Accessibility

One main heading and named navigation; links navigate, buttons perform actions. DOM order follows primary → resume → secondary. Do not steal focus on asynchronous arrival. Announce a refresh outcome once, not every count. Provide visible focus, at least 44px intended touch targets, text/state contrast and non-color status cues. At zoom, every destination and primary action remains reachable without overlap.

## Responsive

Stack regions in priority order, keeping primary and resume above optional summaries. Avoid a horizontally scrolling card carousel as the only route to saved work. Long names wrap; navigation may recompose but not disappear.

## Motion

A selected object's transition can use [route-transition](route-transition.md); local refresh uses [content-swap](content-swap.md). Do not replay a home entrance on every visit. Still/reduced-motion gives complete content immediately, with the same state labels and focus behavior.

## Looks

Quiet uses restrained grouping; editorial leads with a clear title and reading hierarchy; playful can use bounded accents; brutalist uses direct labels and hard divisions; print prioritizes a contents-like hierarchy; immersive keeps navigation and next action on solid, legible surfaces. None changes the task order.

## References

- [GOV.UK patterns](https://design-system.service.gov.uk/patterns/) — checked 2026-10-08, public documentation read: task-first composition rationale, not a home template or exercised journey.
- [Carbon pattern overview](https://www.carbondesignsystem.com/building-blocks/core/patterns/overview) — checked 2026-10-08, public guidance read: component combinations solve goals; not evidence that this composition improves conversion.
- [DesignBookmark](https://designbookmark.com/) and [dev.cards](https://dev.cards/) — checked 2026-10-06 in earlier public-document research: link-only breadth for independently authored home families; no downloaded screenshots, code or verified live interactions.

## Code you can use

[Carbon core repository](https://github.com/carbon-design-system/carbon) is a candidate for individual controls, not this complete home. Its [Apache-2.0 license](https://github.com/carbon-design-system/carbon/blob/main/LICENSE) was read 2026-10-08: retain license/copyright/attribution, mark modified files and reproduce applicable NOTICE entries. No code is imported by this record; dependencies/assets and a pinned revision require their own review. DesignBookmark is a directory, not downstream rights clearance; dev.cards' inherited MIT-plus-Commons-Clause posture keeps its material link-only here. Documentation checks did not exercise the studio or establish accessibility conformance.
