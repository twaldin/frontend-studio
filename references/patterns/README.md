# Pattern records

A pattern record is a reusable answer to a user problem: what the person is trying to do, the shapes that answer works in, the states it has to handle, and the contract a builder implements. It is not a screenshot, a branded page or a component. Records are written in this repository's own words from public guidance, and they cite every source with the date it was checked.

The studio has five surface axes and seven interaction axes. A surface step's options are the corresponding surface record's variants; an interaction step renders one response/progress/motion decision, not the complete product flow. Other records guide the product grill, visual grill and product-specific [in-app studio](../in-app-studio.md). An archetype supplies context and a home anatomy, not a binding that obliges the product to build every suggested surface.

## How records bind to a product: flow → surface → slot

A product is a few **flows** (sign in, browse then buy, write then publish). Each flow passes through **surfaces** (a storefront, a reading view, a checkout page), and each surface has **slots** (its primary list, a detail panel, a composer, its empty state). A **binding** puts one record, in one variant, into one slot of one surface in one flow.

1. **Flows first.** From the model's Must-have workflows, name each flow and give it a flow record when one fits (`checkout`, `browse-inspect-act`, `first-run`). The flow record says where it starts and ends, and which surfaces it crosses.
2. **Surfaces next.** For every surface a flow crosses, pick a surface record (`storefront`, `reader`, `feed`) or compose it from slots.
3. **Slots last.** Fill declared placements with the component, state and interaction records they need (`search-filter` in `toolbar`, `empty-states` in `state`, `async-progress` in `pending`).
4. **Write bindings into `docs/product.json`.** Each binding names its record, status, candidates, selected variant when proposed/fixed, product reason and any shared decision. The surface/slot definition owns data maps, fixed-copy keys, states, setups and semantic events. An unbound slot is plain copy/data, not an automatically generated choice; a non-fixed binding with fitting variants describes an unresolved decision. See [product-model.md](../product-model.md) for the checked format. Today's generic studio still uses its fixed catalog; model-generated walking is not available yet.

The table below illustrates model placements, not a second structural source in the brief. A flow/surface binding occupies its `binding` field; slot bindings use header-supported placement IDs:

| Flow | Surface | Slot | Record | Variant | States to render |
| --- | --- | --- | --- | --- | --- |
| Browse, inspect, buy | — | flow binding | [browse-inspect-act](browse-inspect-act.md) | Shared with storefront | Flow stages reference the applicable surface states |
| Browse, inspect, buy | Catalog | surface binding | [storefront](storefront.md) | Grid | loading, populated, no matches, failed |
| Browse, inspect, buy | Catalog | toolbar | [search-filter](search-filter.md) | Submitted search with filter bar | filters applied, no results, failed |
| Browse, inspect, buy | Catalog | state | [empty-states](empty-states.md) | Action panel | first-use, no matches, denied, unavailable |
| Browse, inspect, buy | Tool detail | facts | [disclosure](disclosure.md) | Single details region | closed, open, unavailable |
| Browse, inspect, buy | Tool detail | pending | [async-progress](async-progress.md) | Inline spinner | pending, failed, confirmed |
| Pay | — | flow binding | [checkout](checkout.md) | One page | stages reference editing, paying, declined, unknown and paid states |
| Pay | Receipt | surface binding | [confirmation](confirmation.md) | Confirmation page | paid, receipt delivery pending/sent/failed |

Make the mappings concrete in the model. `primary` maps item identity/title/price/availability to product fields; `pending` maps the operation's actual lifecycle and retry capability; the toolbar names query/filter/sort events; copy references name the states/setups that reveal each fixed string. Do not infer absence from an empty array, payment success from a timer, or permission from a hidden button.

Record focus/return and responsive behavior with the same binding: inspection preserves query and selected item, phone detail returns to the originating item, and purchase failure retains the actual order state. Bind `control-response` to press/release, `async-progress` to the service lifecycle, and `route-transition` to navigation. The product's chosen `motion-language` supplies timing; Still/reduced motion supplies the complete static rendition. One surface may participate in multiple flows without duplicating its data or inventing a second component grammar.

The current studio export's `design-decisions.md` names the record and option label for each of its five surface axes. It is a decision list, **not an automatically generated flow/slot/data/action graph**. Keep the checked model as the source of product-specific bindings and required states; reconcile current studio decisions into it manually. Drop surfaces the product does not have rather than building them because a fixed catalog lists an option.

Records attach to user goals, not archetypes. An archetype hints at likely surfaces; the product model decides.

## Record fields

Every record has these sections, in this order. A record with a dedicated studio axis uses that axis's exact option labels. Home composition families are not new archetype choices; agent activity can use the “Step list” progress slot without becoming another axis. Most records have two to four variants. **Motion language has Still as its universal no-motion baseline plus four timed variants; layer arrival has Cut as its universal baseline plus four arrival variants.** Each therefore documents five studio choices without counting the baseline as a fifth animated variant.

| Section | What it holds |
| --- | --- |
| Machine header | YAML front matter: `id`, `scale`, `studio` (an exact existing step id or `null`), required/optional placement `slots`, `{id,label}` variants, states, required copy families, events and `renderer`. A flow may declare `sharesVariants` for a surface record. |
| Human header | Record identity, any indirect studio relationship and latest reference-check date; individual sources retain their own dates. |
| Problem and outcome | Who is trying to do what, what gets in the way, and what they can observably do once the pattern is in place. |
| When to use / When not to use | The situations it fits, and the ones where a simpler pattern (linked) does better. |
| Structure and slots | The regions and slots, which are required, and what each holds. |
| Variants | Two to four genuinely different shapes, each with gain, cost and when to choose it; the universal Still/Cut baselines are documented separately in the two five-choice records. |
| States and transitions | Every state the person can see (loading, empty, populated, partial, invalid, denied, failed, done, as they apply), and what moves them between states. |
| Data and copy contract | The objects and fields it needs, how many, the long and short cases, and the copy keys; every visible string comes from the copy deck. |
| Accessibility | Semantics, focus order and focus return, keyboard and touch equivalents, announcements, targets, contrast and zoom. |
| Responsive | How it recomposes at phone width and what stays reachable. |
| Motion | What may move, why, its duration role in the motion language, and the still version under reduced motion. |
| Looks | How it reads in each of the studio's looks: quiet, editorial, playful, brutalist, print, immersive. |
| References | Every source, with what it supports here and the date it was checked. |
| Code you can use | Implementations whose license allows adapting them, with the license and the notice to keep; sources that are link-only, and why. |

The machine header is the binding contract. A surface record's required slots are its child placements; optional slots are the additional placements it supports. A record bound inside a slot declares supported placement ids (for example, search/filter in `toolbar`, absence feedback in `state`, and notifications in `outcome`). Its internal prose regions do not require separately bound nested slots. Variant, slot, state and event ids use camelCase; record ids retain their filenames. Every string in `copy` is a **required fixed-copy family**: at least one bound copy key must contain that exact dot-separated segment, such as `catalog.priceUnit` for `priceUnit`. Headers deliberately list only genuinely obligatory families; the fuller prose contract still applies to whichever states and capabilities the product actually offers.

## Index

Each record's YAML header is the machine source of truth; [`index.json`](index.json) is its deterministic generated snapshot, with `{version:1,records:[...]}` ordered by record id. The tables below are a human navigation index of the 34 records, excluding this README. They group flows, surfaces, components/states and interaction/motion contracts, not executable studio options. For example, `async-progress` is an interaction record indexed with states, while `search-filter` is a flow contract that can bind to local toolbar/results slots.

From `studio/`, run `bun run patterns:index` after editing a header; `bun run patterns:index --check` fails when the snapshot is missing or stale. Both use `readPatternCatalog` in `studio/src/model/patterns.ts`, which checks header shape, filenames, duplicate ids, studio option ids/labels, shared variants and exact label agreement with the prose Variants section. Still and Cut remain explicit header entries as well as prose baselines. `browse-inspect-act` declares `sharesVariants: storefront`, so its flow binding can share the surface's selection rather than introducing an independent step.

`renderer` declares the product-model rendering contract, **not a claim that a new renderer ships here**. The twelve current dedicated records and eleven additional records (home, empty states, notifications, dialogs/layers, search/filter, settings, create/edit, destructive action, confirmation, sign-in and first run) declare `variants`; the remaining eleven declare `schematic`. The current studio still has only the twelve dedicated pattern axes listed below. A standalone schematic binding must be fixed with its product reason; the shared browse/inspect/act flow may instead follow a compatible variant-rendered surface through `sameAs`. Text-only records do not acquire an executable studio step merely by appearing in the index.

### Flows

| Record | Problem | Studio |
| --- | --- | --- |
| [first-run](first-run.md) | A new person reaches the product's first useful result. | No studio step |
| [sign-in](sign-in.md) | Prove who you are, or create an account, with the least friction the risk allows. | No studio step |
| [question-pages](question-pages.md) | Collect several answers without one overwhelming form. | No studio step |
| [check-answers](check-answers.md) | Review and correct answers before committing them. | No studio step |
| [confirmation](confirmation.md) | Know that a task finished, what happens next, and how to prove it. | No studio step |
| [task-list](task-list.md) | Complete a job made of several tasks, in any order, over several visits. | No studio step |
| [validation](validation.md) | Find and fix what's wrong with a form. | No studio step |
| [checkout](checkout.md) | Pay for what's in the cart and know it worked. | No studio step |
| [browse-inspect-act](browse-inspect-act.md) | Find one item in many, look closer, then act on it. | No dedicated flow step; binds to `commerceLayout` through storefront |
| [search-filter](search-filter.md) | Narrow a large collection to the few items that matter. | No studio step |
| [create-edit](create-edit.md) | Make a new object or change one, and see the result. | No studio step |
| [destructive-action](destructive-action.md) | Delete or discard safely, with a way back where possible. | No studio step |
| [error-pages](error-pages.md) | Recover when a page is missing, broken or unavailable. | No studio step |

### Surfaces

| Record | Problem | Studio |
| --- | --- | --- |
| [home](home.md) | Land somewhere that answers "what now?" | No dedicated step; `archetype` selects home anatomy |
| [feed](feed.md) | Keep up with a stream of entries from people or sources. | `feedLayout` |
| [board](board.md) | See work moving through stages and move it on. | `boardLayout` |
| [conversation](conversation.md) | Talk with people or an agent and keep the thread. | `conversationLayout` |
| [reader](reader.md) | Read a long text without losing your place. | `readerLayout` |
| [storefront](storefront.md) | Browse things for sale, compare them and buy one. | `commerceLayout` |
| [settings](settings.md) | Find and change one setting among many. | No studio step |
| [pricing](pricing.md) | Choose a plan and understand what it costs. | No studio step |
| [agent-activity](agent-activity.md) | Follow and steer work an agent is doing. | No dedicated surface step; `asyncFeedback` "Step list" can fill progress |

### Components and states

| Record | Problem | Studio |
| --- | --- | --- |
| [empty-states](empty-states.md) | Understand why there is nothing here and what to do. | No dedicated step; surface galleries include empty/loading examples |
| [async-progress](async-progress.md) | Wait for work without wondering whether it's happening. | `asyncFeedback` |
| [notifications](notifications.md) | Learn about an outcome or a problem at the right volume. | No studio step |
| [command-palette](command-palette.md) | Reach any command or place by typing. | No studio step |
| [dialogs-and-layers](dialogs-and-layers.md) | Choose between a dialog, a popover, a sheet and inline. | No studio step (`layerArrival` covers its motion) |
| [disclosure](disclosure.md) | Keep secondary detail one action away. | No studio step |

### Interaction and motion

| Record | Problem | Studio |
| --- | --- | --- |
| [motion-language](motion-language.md) | Give every move one timing and character. | `motion` |
| [layer-arrival](layer-arrival.md) | Show where a layer came from without slowing the next action. | `layerArrival` |
| [control-response](control-response.md) | Confirm a press before anything else happens. | `controlResponse` |
| [content-swap](content-swap.md) | Replace content in place without losing the person. | `contentSwap` |
| [route-transition](route-transition.md) | Move between pages and keep the sense of place. | `routeMotion` |
| [theme-transition](theme-transition.md) | Change theme without a jarring flash. | `themeMotion` |

## Sources and reuse

Records contain independently authored generic contracts and public links. No source prose, screenshots, prompt corpus, branded assets or third-party code is copied into these records. The seven inspiration sources widen the questions we consider; **GOV.UK and Carbon are the primary task/accessibility/state guidance**, not a claim that every original surface variant comes from their catalogs. Recommendations and tradeoffs are this repository's synthesis, not source-provider endorsements or measured outcome claims.

### Evidence and checked dates

“Checked” means the returned public documentation/license text or the earlier public-document research was read. It does **not** mean a browser interaction, authenticated product journey, keyboard/screen-reader audit, performance run or conversion experiment occurred. Earlier inspiration references retain **2026-10-06**; newly read primary documentation and the two software licenses use **2026-10-08**. Cue is a registered public link only: no corpus, item prompt or restricted content was fetched or ingested for these records. Filmstrip/screenshot/documentation evidence cannot by itself prove real interaction behavior.

| Source | Date and evidence limit | Role and reuse posture |
| --- | --- | --- |
| [GOV.UK patterns](https://design-system.service.gov.uk/patterns/), [layout](https://design-system.service.gov.uk/styles/layout/), [button](https://design-system.service.gov.uk/components/button/), [details](https://design-system.service.gov.uk/components/details/) | 2026-10-08, public guidance read; examples not exercised here. | Primary task/action, readable-layout and secondary-information guidance. Original wording only; do not import government branding/protected assets or confuse website-prose terms with the separate software license. |
| [Carbon patterns](https://www.carbondesignsystem.com/building-blocks/core/patterns/overview), [empty states](https://www.carbondesignsystem.com/building-blocks/core/patterns/empty-states), [notifications](https://www.carbondesignsystem.com/building-blocks/core/patterns/notifications), [dialogs](https://www.carbondesignsystem.com/building-blocks/core/patterns/dialogs), [disclosures](https://www.carbondesignsystem.com/building-blocks/core/patterns/disclosures), [inline loading](https://www.carbondesignsystem.com/building-blocks/core/components/inline-loading/guidelines), [motion](https://www.carbondesignsystem.com/building-blocks/foundations/motion/overview) | 2026-10-08, public documentation read; no demos exercised or accessibility conformance asserted. | Primary state/interaction/motion guidance. Patterns are contracts, not automatically complete code. Website prose/media is not assumed Apache-2.0 merely because core code is. |
| [VantaUI](https://www.vantaui.com/) | 2026-10-06, earlier public-document research; not live rechecked or interaction-audited for these records. | Link-only control/layer breadth. Inherited proprietary, plan-limited posture; no code, screenshots or assets bundled. |
| [DesignBookmark](https://designbookmark.com/) | 2026-10-06, earlier public-document research; directory descriptions, not audited downstream products. | Link-only discovery across product/register families. A directory link supplies no rights to linked products, fonts, images or code. |
| [Cue](https://www.cuedesign.space/) | Link registered in earlier research dated 2026-10-06; corpus/item prompts neither fetched nor ingested here. | Link-only expressive context. Restrictive AI-ingestion and library-redistribution posture excludes its corpus, prompts, code and media; no claim that its content generated these contracts. |
| [EasyUI](https://easyui.site/) | 2026-10-06, earlier public-document research; no registry package installed or interaction/asset audit here. | Link-only interaction/effect breadth in this catalog. Earlier research describes code as MIT, but item-specific source, dependency, asset and notice review is still needed before adaptation; no blanket clearance or imported code claim. |
| [Great UI](https://great-ui.com/components) | 2026-10-06, earlier public-document research; catalog descriptions, not measured transitions. | Link-only route/theme/register breadth. Inherited custom terms restrict kit/template/framework redistribution; do not bundle its code or assets. |
| [PaceUI](https://paceui.com/) | 2026-10-06, earlier public-document research; no purchased/authenticated item or live behavior checked. | Link-only vertical composition and interaction breadth. Licenses vary by item and access wording was uncertain; “free” does not establish redistributable code. |
| [dev.cards](https://dev.cards/) | 2026-10-06, earlier public-document research; section breadth, not imported source or tested behavior. | Link-only art-directed section/register breadth. MIT plus Commons Clause is **not plain MIT** and is not treated as a cleared public component-corpus license. |

### Software candidates are not imports

Each record's “Code you can use” names a candidate or an own implementation reference and its limits. A permissive software license can clear an identified code subset; it does not clear an entire website, example media, fonts, service access or a complete product pattern. No third-party implementation is imported merely by linking it here.

| Candidate | Checked evidence | License and notices before adaptation |
| --- | --- | --- |
| [GOV.UK Frontend](https://github.com/alphagov/govuk-frontend) and its [license](https://github.com/alphagov/govuk-frontend/blob/main/LICENSE.txt) | 2026-10-08, MIT license text read; record-specific implementation/runtime/dependencies/assets not audited here. | MIT: keep the Crown Copyright and permission notice in copies/substantial portions. Pin the exact source revision and separately review assets/dependencies; do not import protected government branding. The code license is not a blanket website-content clearance. |
| [Carbon core](https://github.com/carbon-design-system/carbon), [motion package](https://github.com/carbon-design-system/carbon/tree/main/packages/motion) and [license](https://github.com/carbon-design-system/carbon/blob/main/LICENSE) | 2026-10-08, Apache-2.0 license text and public guidance/source pointers read; no complete implementation/runtime audit. | Apache-2.0: distribute the license, retain applicable copyright/attribution notices, mark changed files and reproduce applicable upstream NOTICE entries if supplied. Pin the source revision and audit dependencies/assets separately; no trademark or website-prose/media rights inferred. |

Existing own implementations can be linked as source evidence without calling them “cleared third-party imports.” Before actually adapting a candidate, record the selected revision/files, provenance, dependency/asset rights and retained notices with that change. Unknown or restricted rights remain link-only; paid access, a download button, an AI endpoint or a visually similar original implementation does not change that posture.

### Contract versus verification

The state, keyboard, focus, responsive and reduced-motion sections specify what a product binding must implement and what its integration owner must exercise. They are not test reports. Creating/checking Markdown, matching labels or reading public source/license text does not exercise interactions. Review the bound product on its real data/actions and run its own interaction/accessibility checks before claiming those contracts are satisfied.
