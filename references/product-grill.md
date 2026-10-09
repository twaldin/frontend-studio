# Product grill

The question tree for the product definition. Ask in this order; each answer unlocks the next. Find facts yourself (the SDK, the API, the prior art); put only decisions to the user. Questions about product behavior that come up later in studio notes come back here.

Write the answers into `docs/product.json`, a keyed `docs/copy.md` and `docs/product.fixtures.json` using [product-model.md](product-model.md). Keep voice, references, headline candidates and the concise product explanation in `docs/brief.md` using [brief-template.md](brief-template.md). The model is the source of structured facts; the brief explains their intent.

**Current boundary:** The model tooling defines and checks these files. The generic studio still uses its fixed catalog, `content.json` input and saved walks; it does not load product models, generate their walk, edit deck keys in Copy mode or provide a model-driven Every screen page. Capture and export are not model-aware. A completed grill establishes the definition, not those runtime capabilities.

## Who

1. Who is the user, in one sentence, with the device and the moment they open it? ("A renter comparing nearby tools on a phone before starting a weekend repair.")
2. What do they want to be true? Three outcomes, in their words, not features. Distill the product's central outcome into one sentence.
3. Is there a second kind of user? Name what each kind uses and what only one of them uses.
4. Which products do they already know? One per job: the reference for the app chrome, for the core workflow, for any data-heavy view, for any marketplace. Vocabulary is borrowed from these.

## What

5. What are the two or three entities, and what is each one's set of words? Everything else must be a relation between them.
6. Which word is the unit of work, and which is the unit of automation? Settle every collision now (a word the domain and the tool both use). Record the rejected terms as well as the chosen words.
7. What can the backend actually do today, and what is imagined? Record each capability's `real` value, and identify the flows and events that need it. An imagined capability is not an executable control or a truthful landing claim.

## Where

8. Navigation: flat list or grouped? Which item is first? Is there a global "new" action? How many destinations will there be in a year, and where do settings, account and theme live?
9. Every surface, with its route or entry point, users, phone/desktop widths and the one question it answers. For channel surfaces, use the logical template identity and preview-width conventions in [product-model.md](product-model.md#channels). A surface that answers two questions is two surfaces.
10. Which surface is home, and what are the ≤4 questions it answers above the fold, in order?
11. What does a brand-new user see first, and how does onboarding end: on an empty home, after a tour, or inside the first real run of the core workflow? Record the first-run flow and its observable end.
12. Which surfaces copy an existing product's layout outright, and which one? This fixes a composition only when its structure fits the product; record the product reason, not borrowed assets or source.

## How it behaves

13. The product's state vocabulary: loading, empty, unknown, stale, halted, waiting, error, offline — keep, cut, or add, with a rendering rule for each in one line. **For each surface**, which of these states can it really be in, and which is its default? A surface declares only its applicable states.
14. What is the rendering rule for a value that was not observed? (A rendering rule, never a selling point.)
15. What are the irreversible actions, and what does each one show before it runs? Name the confirmation setup, its event, affected data, accessible name, consequence and recovery copy.

## Voice

16. Which product's copy does this sound like? (Changelog, docs, marketing — name the register per surface and channel.)
17. Three before/after pairs: an overfit line from the previous build or the conversation, and its plain replacement.
18. The landing headline shape: category noun-phrase plus one scope sentence. Three candidates and the evaluator that picks. Keep candidates in the brief; only chosen product copy goes in the deck.

## Design frame (feeds the visual grill)

19. Where does the domain register live: in content cells only, or in chrome too?
20. Same visual language for app and landing, or a split?
21. Which archetype best describes the product's main object and home surface: `workspace`, `feed`, `commerce`, `reader`, `media`, `companion`, `canvas`, `conversation` or `utility`? This is an optional model hint, not a requirement to add that archetype's surfaces. Which reference does the current visual grill start from, and which look should the app speak? Reference and look remain walk decisions.
22. Which surfaces have product axes: decisions about how a surface is composed or behaves that no pattern record covers? Record their questions, reasons, surfaces and genuine options in `axes`; the current generic catalog does not render these axes. They need an in-app studio.

## Complete the behavior model

23. What are the flows, in the user's words? For each, name its goal, stages, next-stage branches, surfaces, applicable states, observable end and required capabilities. Apply [mvp-scope.md](mvp-scope.md): which flow is `must`, `should` or `later`?
24. What does each surface read? Name the contracts and fields, field types, enums, realistic `typical` and maximum counts, and fields that need a long case. Which values come from those fields, rather than fixed product language?
25. Which setups expose an interaction state without changing the whole surface: menu open, dialog open, field invalid, detail selected? Name each setup's label, triggering semantic event and optional resulting state. Which slot responds to each event, and on which interaction axis? An interaction-record slot binding is an explicit local override; `on` selects the semantic event treatment, while global style defaults apply to unbound placements.
26. **Per operation:** what is pending, done and failed? What evidence does each show? Can it really be cancelled, retried or undone? Tie operation events to real capabilities, operation states and fixtures; bind progress and recovery placements where the product needs them.
27. **Outside the screen:** which emails and pushes does the product send, to whom, after which operation, and what product outcome does each help the recipient reach? Give each `email` or `push` surface a specific recipient question, its states and copy, a logical `email:` / `push:` template identity in `route`, and phone/desktop preview widths in `viewports`; these are not browser routes or delivery claims. Email uses subject/preheader/body/actions; push uses title/body/action, not a subject. Inventory any other outbound text too; the model's channel enum is only `screen`, `email` and `push`, so resolve another channel explicitly rather than inventing a channel value or omitting its fixed strings.
28. What fixed language appears in each state and setup? Include nav, labels, placeholders, buttons, tooltips, errors, dialogs, empty states, onboarding, document/page titles, accessible names, alt text, email subject/preheader/body/actions and push title/body/actions. Which data-field placeholders does it interpolate? Every string not produced by a data-contract field gets a deck key and a surface or slot reference. Name actual state/setup IDs for conditional copy; use `always` only when it is present in every allowed target, as [product-model.md](product-model.md#keyed-copy-deck) defines.

## Binding pass

Use the [pattern index](patterns/README.md) and [machine headers](product-model.md#pattern-metadata), then read the selected records' prose contracts.

1. For each Must-have flow, select a fitting flow record or leave it unbound. Map its stage shape to the product's surfaces; stage IDs and `next` links describe the product's real sequence.
2. Select a surface record where it fits, or compose the surface from slots. Fill its header's required child placements with meaningful records, mapped data or copy and include the optional placements actually used. Empty stub slots do not satisfy a required placement. A bound surface rejects undeclared placement IDs.
3. Select component, state or interaction records for the slots. A slot-bound record must support that placement ID: for example, `search-filter` in `toolbar`, `empty-states` in `state`, or `notifications` in `outcome`. A record's internal regions do not all become separately bound nested slots. Interaction and motion records may supply explicit local overrides even when they also have a global studio step; see [Bindings](product-model.md#bindings).
4. Narrow `candidates` with the record's fit rules and model facts. A grid needs image data; real undo needs an undo capability; a pipeline needs ordered stages. Offer only variants that fit.
5. Set `open` when there is no pick, `proposed` when recommending a variant, and `fixed` when the user has decided or a real constraint forces it. Non-open bindings require `variant`; fixed bindings require `because`. List all fixed claims not already stated by the user together for confirmation. Independent schematic decisions must be fixed; leave a genuinely unresolved independent schematic unbound and record the decision as an in-app product axis.
6. Use `sameAs` only for a shared decision: `flow:<id>`, `surface:<id>` or `slot:<surface>/<slot>`. The records must share compatible variants; `browse-inspect-act` declares `sharesVariants: storefront`. A shared schematic flow may point to that compatible variant-rendered surface: the target supplies the renderer, with no independent schematic walk step, so a proposed storefront composition can remain proposed. This is the narrow exception to fixing independent schematics. Explain why the same choice serves both placements.
7. Map each slot's record fields to contract fields. Map required header copy families to surface/slot keys with that family as a dot-separated segment, such as `catalog.priceUnit`. A vague semantic resemblance is not a family match.

## Answer → field map

| Question | Model or companion field |
|---|---|
| 1–3 users and outcomes | `product.outcome`, `product.users` including their surface IDs |
| 4 familiar references | Brief's references and vocabulary |
| 5–6 entities and collisions | `entities[].words`, `entities[].never`, `entities[].contract` |
| 7 real versus imagined | `capabilities`, `flows[].needs`, `events[].needs` |
| 8 navigation and growth | `nav.items`, `nav.menu`, `nav.globalAction`, `nav.inAYear`; labels are deck keys |
| 9–10 surfaces and home | `surfaces[].question`, `route`, `viewports`, home surface binding |
| 11 first visit and its end | First-run flow's `stages`, `binding`, `ends` |
| 12 copied composition | Fixed bindings with `because` |
| 13–14 states and unobserved values | `states` with `label`, `kind`, `rule`, `fixtures`; `surfaces[].states` |
| 15 irreversible actions | Destructive-action bindings, confirmation `setups`, `events`, `copy` |
| 16–18 voice and headlines | Brief's Voice and headline evaluator; selected copy in the keyed deck |
| 19–20 register and visual split | Brief's Design intent |
| 21 archetype, reference, look | `product.archetype` hint; reference/look in the current walk |
| 22 uncovered product decisions | `axes` for an in-app studio |
| 23 workflow and MVP | `flows[].goal`, `priority`, `stages`, `ends`, `needs` |
| 24 data and scale | `data`, `slots[].data`, contract/scenario fixture arrays |
| 25 interaction setups | `surfaces[].setups`, `events`, `slots[].on` |
| 26 real operations | Operation `events`, capability needs, states, progress/recovery bindings |
| 27 non-screen channels | `surfaces[].channel`, recipient `question`, logical template `route`, preview `viewports`, users' surface IDs, state/copy references |
| 28 all fixed strings | Surface/slot `CopyRefs`, `nav.items[].copy`, keyed deck |

## Finish before the visual grill

Write contract/scenario fixtures with realistic populated counts, one-item and long cases, empty arrays where appropriate, and every scenario named by a surface state. Each state supplies a scenario for every contract the surface reads.

Apply [copy-rubric.md](copy-rubric.md). The deck's `Key | Copy | Shown when` rows use the model-derived target labels described in [product-model.md](product-model.md#keyed-copy-deck); an edit to states, setups or references can stale that column.

From this repository's `studio/`, run `bun run model:check /absolute/path/to/product/docs/product.json`. The definition is ready when all questions are answered, every flow has a priority, all Must-have placements have their required bindings, fixed claims are confirmed, every fixed string has a referenced key, fixtures cover the declared states, and the checker has no errors. Review the model and current walk plan under [review.md](review.md) before rendering. Resolve warnings about imagined capabilities or suspiciously constant fixture strings rather than treating a passing schema as proof of truthful behavior.

