---
id: error-pages
scale: flow
studio: null
slots: {"required":["identity","header","facts","actions"],"optional":["dataStatus","support","reference","search","state"]}
variants: [{"id":"missingDestination","label":"Missing destination"},{"id":"serviceFailure","label":"Unexpected service failure"},{"id":"deliberateUnavailability","label":"Deliberate unavailability"}]
states: ["missing","failed","unavailable","saved","partiallySaved","notSaved","saveStatusUnknown","checking","recovered","resumed","permanentlyClosed"]
copy: ["explanation"]
events: ["retry","checkStatus","resume","findContent","contact"]
renderer: schematic
---

# Error pages

`id: error-pages` · scale: flow · studio: no studio step · references checked: 2026-10-08

## Problem and outcome

A person cannot reach a page or continue a task because a destination is missing, the service failed, or access is deliberately unavailable. A decorative apology gives no help with their original goal or the fate of entered data. This flow identifies the user-relevant situation, states what is known and offers a safe next route. Recovery may be immediate navigation, a later resumed session or another supported channel; it is not always a retry button.

## When to use / When not to use

Use a full-page recovery surface when the destination or service cannot render enough of the intended task to recover locally. Distinguish a missing destination from an unexpected failure and a deliberate closure. Retain the product's recognisable identity and useful support information without inventing a navigable hierarchy for a page that does not exist.

Do not replace a correctable form with a generic error page; use [validation](validation.md) and keep its values. A failed attachment or one unavailable collection item can recover in place with [notifications](notifications.md) or the affected surface state. Authentication/permission boundaries belong in [sign-in](sign-in.md) or an access-denied explanation, not a false missing-page claim unless the security policy deliberately requires non-disclosure. An empty result is [empty-states](empty-states.md), not service failure.

## Structure and slots

- **Required — product/task identity:** a recognisable shell and meaningful document title, without private diagnostics or distracting promotional navigation.
- **Required — situation heading:** a concise statement of what the person can currently do, using ordinary language rather than an HTTP code as the explanation.
- **Required — known facts:** missing destination, unexpected problem or deliberate closure; a known return time only when supported by actual information.
- **Required for interrupted work — data status:** what was saved, what was not, how long it is retained and how to resume if that capability exists.
- **Required — safe next action:** a useful existing destination, a status/resume route, a justified retry or an available alternate channel.
- **Required where helpful — support:** a working contact route and relevant hours/access options, not a dead generic help link.
- **Optional — public incident reference:** a non-sensitive reference useful to support and a public status page if actually provided.
- **Optional — search:** only when it can help find a genuine replacement; it must not send the person into the same broken path.

## Variants

| Variant | Gain | Cost and choice |
| --- | --- | --- |
| Missing destination | Gives a route to find the desired content or contact the service without blaming the person. | Cannot restore nonexistent content; choose for unknown/moved/deleted addresses and make known replacements explicit. |
| Unexpected service failure | Explains interrupted work and a safe way to resume when the service can work again. | Often cannot promise a return time; choose for an unplanned failure, keeping unknown facts unknown. |
| Deliberate unavailability | States a known closure/restoration schedule or a permanent alternative. | Needs current operational information and timezone clarity; choose for planned closure, not as a vague cover for an unexplained crash. |

## States and transitions

**Requested destination → missing/failure/unavailable** selects the correct situation using the service's actual response, not a generic catch-all success route. **Saved/partially saved/not saved/unknown save status** reflects acknowledged storage for an interrupted task. Unknown status says it is unknown and offers a retrieval/status route rather than asserting loss. **Retry/check availability → still unavailable/recovered** preserves the intended destination and only repeats safe operations. A failed committing request uses its existing operation's status before inviting another submission; [checkout](checkout.md) must not repeat a charge through a generic retry link. **Known reopening time passed** reads current availability rather than continuing to promise a stale date. **Resume → draft/task** restores accepted answers and focuses the resumed context. **Permanent closure** removes misleading retry and directs to the genuine alternative. **Missing page found through search/replacement** opens the real destination. Support and alternate channels remain reachable if the main application bundle or API is unavailable.

## Data and copy contract

Provide user-facing situation type, product name, intended safe destination, optional non-sensitive support reference, available recovery routes and operational facts. For interrupted work, include acknowledged saved scope, retention end/timezone and resume capability. Do not hard-code a claim that answers were saved merely because the form still appears in client memory. For planned closure, supply an authoritative reopening timestamp or permanent alternative; an estimate is labelled as such and omitted when unknown. Keep HTTP status and detailed diagnostics separate from public copy; return an appropriate error status rather than a successful response that hides a failure. Avoid exposing query secrets, stack traces, account existence or infrastructure names. Support long product names, translated messages, absent return dates and no valid automatic retry route.

Every visible string comes from the copy deck: `errorPages.missingTitle`, `failureTitle`, `unavailableTitle`, `explanation`, `saved`, `partiallySaved`, `notSaved`, `saveStatusUnknown`, `retention`, `availableAt`, `returnUnknown`, `permanentAlternative`, `resume`, `retrySafe`, `checkStatus`, `findContent`, `contact`, `supportHours`, `reference`. Copy states a useful next step, not blame, jokes or technical jargon. Do not say the person should re-enter answers if their submitted operation may already have succeeded.

## Accessibility

Use a main landmark, one situation heading and a matching document title. On application navigation to the page, focus the heading; an initial server-rendered page must remain understandable without JavaScript. Use real links for destinations and buttons only for local commands. Do not force repeated alert announcements for a stable full-page error. Label contact/status/return actions by their destination and keep a keyboard/touch equivalent for every recovery path. A later recovery route focuses the restored task heading or relevant error summary. Use visible focus, 4.5:1 text contrast, 3:1 control/focus contrast, usable reflow at 400% zoom and targets at least 24 by 24 CSS pixels or equivalent spacing; prefer 44 by 44 primary touch actions. Do not depend on red, illustration or animation to convey failure. These are implementation requirements; this record is not an accessibility test result.

## Responsive

Use one readable column at phone width, with explanation and data status before recovery/support actions. Long references, URLs and timestamps wrap or have a readable display label. Keep essential recovery functional in a minimal shell; do not require a desktop navigation rail or large illustration. At high zoom, preserve the original heading/explanation/action order.

## Motion

A full-page error needs no dramatic arrival. A brief [route-transition](route-transition.md) may preserve context, but the explanation and recovery must be available immediately. A manual safe check can use static working text or restrained progress; never auto-retry a committing operation or flash the page between failure and loading. Reduced motion uses immediate rendering with identical focus and recovery routes. No decorative shake, pulse or looping mascot is needed.

## Looks

**Quiet:** direct heading, plain explanation and practical links. **Editorial:** readable hierarchy and a concise account of interrupted work. **Playful:** warmth without jokes that minimise the problem. **Brutalist:** explicit situation and recovery blocks, not alarming all-red text. **Print:** documentary status, retention and contact details. **Immersive:** stable opaque recovery panel; background effects cannot be required to understand or use the page. All six avoid making a failure screen more decorative than helpful.

## References

- [GOV.UK: page not found](https://design-system.service.gov.uk/patterns/page-not-found-pages/) — checked 2026-10-08; supports clear non-blaming explanation and useful contact information, without technical jargon, humorous copy or invented breadcrumbs. Guidance does not prove the recovery route works here.
- [GOV.UK: problem with the service](https://design-system.service.gov.uk/patterns/problem-with-the-service-pages/) — checked 2026-10-08; supports truthful saved-answer/retention information and useful later/alternate-channel recovery. Its source research and government examples are not evidence of this record's implementation; an unknown return time remains unknown.
- [GOV.UK: service unavailable](https://design-system.service.gov.uk/patterns/service-unavailable-pages/) — checked 2026-10-08; supports distinguishing deliberate closure, known reopening details and permanent alternatives. A planned date is not permission to promise restoration without current operational facts.
- [GOV.UK: validation](https://design-system.service.gov.uk/patterns/validation/) — checked 2026-10-08; supports separating correctable input from permission, eligibility and service problems. These sources were read as documentation; no error-page UI, screen reader or recovery operation was exercised.

## Code you can use

Candidate, not imported: [GOV.UK Frontend](https://github.com/alphagov/govuk-frontend) layout/typography, link and button primitives for a minimal recovery shell under [MIT](https://github.com/alphagov/govuk-frontend/blob/main/LICENSE.txt), checked 2026-10-08. Retain Crown copyright and the full permission/warranty notice. Candidate, not imported: [Carbon React](https://github.com/carbon-design-system/carbon/tree/main/packages/react) Button and Link primitives under [Apache-2.0](https://github.com/carbon-design-system/carbon/blob/main/LICENSE), checked 2026-10-08; include the license, retain applicable notices/NOTICE attribution and mark modified files.

Neither candidate provides error classification, durable answers, uptime information or a working support service. Audit chosen-version dependencies and media/fonts separately; do not import government marks, source illustrations, screenshots or example copy. This record uses independently authored prose and no borrowed code/assets. Source guidance is evidence for design requirements, not a fabricated tested-accessibility claim.
