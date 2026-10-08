# Pattern records

A pattern record is a reusable answer to a user problem: what the person is trying to do, the shapes that answer works in, the states it has to handle, and the contract a builder implements. It is not a screenshot, a branded page or a component. Records are written in this repository's own words from public guidance, and they cite every source with the date it was checked.

The studio has five surface axes and seven interaction axes. A surface step's options are the corresponding surface record's variants; an interaction step renders one response/progress/motion decision, not the complete product flow. Other records guide the product grill, visual grill and product-specific [in-app studio](../in-app-studio.md). An archetype supplies context and a home anatomy, not a binding that obliges the product to build every suggested surface.

## How records bind to a product: flow → surface → slot

A product is a few **flows** (sign in, browse then buy, write then publish). Each flow passes through **surfaces** (a storefront, a reading view, a checkout page), and each surface has **slots** (its primary list, a detail panel, a composer, its empty state). A **binding** puts one record, in one variant, into one slot of one surface in one flow.

1. **Flows first.** From the brief's Must-have workflows, name each flow and give it a flow record when one fits (`checkout`, `browse-inspect-act`, `first-run`). The flow record says where it starts and ends, and which surfaces it crosses.
2. **Surfaces next.** For every surface a flow crosses, pick the surface record (`storefront`, `reader`, `feed`) and its variant. In the studio, that's the surface step.
3. **Slots last.** Fill each slot of a surface with the component, state and interaction records it needs (`search-filter` in the storefront's toolbar slot, `empty-states` in its empty slot, `async-progress` while results load).
4. **Write the bindings into the brief.** Each binding names the flow/stage, surface, slot, record, variant, data fields, copy keys, real actions and states/events/recovery the product must support. Unbound slots are decisions still open; they become steps in the next studio round. Attach interaction/motion selections to semantic events in those slots, not just to screenshots.

A binding table in a product's `docs/brief.md`, Design section. Choose the flow contract first: here, [browse-inspect-act](browse-inspect-act.md) with **Grid** describes browse → inspect → act and the return path; [checkout](checkout.md) with **One page** owns payment and its outcome. The local surface/slot bindings then refine those contracts:

| Flow | Surface | Slot | Record | Variant | States to render |
| --- | --- | --- | --- | --- | --- |
| Browse, inspect, buy | Storefront | primary | [storefront](storefront.md) | Grid | loading, empty, no matches, populated, failed |
| Browse, inspect, buy | Storefront | toolbar | [search-filter](search-filter.md) | Submitted search with filter bar | no filters, filters applied, no results, failed |
| Browse, inspect, buy | Storefront | state | [empty-states](empty-states.md) | Action panel | first-use, no matches, denied, unavailable |
| Browse, inspect, buy | Product detail | secondary facts | [disclosure](disclosure.md) | Single details region | closed, open, unavailable |
| Browse, inspect, buy | Product detail | purchase.pending | [async-progress](async-progress.md) | Inline spinner | idle, pending, failed, confirmed |
| Pay | Checkout | primary | [checkout](checkout.md) | One page | editing, invalid, paying, declined, unknown, paid |
| Pay | Receipt | outcome | [confirmation](confirmation.md) | Confirmation page | paid, receipt delivery pending/sent/failed |

Below the table, make the mappings concrete. For example, `primary` maps item identity/title/price/availability to the product's own fields; `purchase.pending` maps the real operation ID/status/result and retry capability; the toolbar maps query/filter/sort events; copy maps labels and each absence/failure reason to copy-deck keys. Do not infer absence from an empty array, payment success from a timer, or permission from a hidden button.

Record focus/return and responsive behavior with the same binding: inspection preserves query and selected item, phone detail returns to the originating item, and purchase failure retains the actual order state. Bind `control-response` to press/release, `async-progress` to the service lifecycle, and `route-transition` to navigation. The product's chosen `motion-language` supplies timing; Still/reduced motion supplies the complete static rendition. One surface may participate in multiple flows without duplicating its data or inventing a second component grammar.

The studio export's `design-decisions.md` names the record and option label for each of the five surface axes. It is a decision list, **not an automatically generated flow/slot/data/action graph**: the builder writes those product-specific bindings and required states into the brief. Drop surfaces the product does not have rather than building them because an export lists an option.

Records attach to user goals, not to archetypes. An archetype suggests which surfaces a product probably has; the brief decides.

## Record fields

Every record has these sections, in this order. A record with a dedicated studio axis uses that axis's exact option labels. Home composition families are not new archetype choices; agent activity can use the “Step list” progress slot without becoming another axis. Most records have two to four variants. **Motion language has Still as its universal no-motion baseline plus four timed variants; layer arrival has Cut as its universal baseline plus four arrival variants.** Each therefore documents five studio choices without counting the baseline as a fifth animated variant.

| Section | What it holds |
| --- | --- |
| Header line | `id` · scale (flow, surface, component, interaction or motion) · the dedicated studio step, or "no studio step" with any indirect relationship stated · latest reference-check date; individual sources retain their own dates. |
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

## Index

There are **34 pattern records**, excluding this README: **13 flows + 9 surfaces + 6 components/states + 6 interaction/motion records**. These are problem-oriented index groups, not a count of executable studio options. For example, `async-progress` is an interaction record indexed with states, while `search-filter` is a flow contract that can bind to local toolbar/results slots. Twelve dedicated axes point at records: the five surface axes and seven interaction axes; the latter include `asyncFeedback`. Text-only records do not acquire an executable studio step merely by appearing here.

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
