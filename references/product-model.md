# Product model

The product model is the structured result of the [product grill](product-grill.md), with the [MVP cut](mvp-scope.md), pattern decisions, fixed-copy inventory and representative data in one checked definition. The [brief](brief-template.md) holds intent and voice; it is not a second source of structured behavior.

## Model tooling and current studio

The model tooling defines and checks product files using the schema, pattern metadata/index, checker, sample definitions and grill workflow. It does not change the studio runtime.

The current generic studio still runs its fixed catalog, loads the legacy `content.json` input, and saves choices, notes, status and content copy edits in `.studio/state.json`. It does not load a checked `product.json`, generate a model-driven walk, edit deck keys in Copy mode or provide a model-driven **Every screen** page. Capture and export are not model-aware. Current exports remain the artifacts listed in the [README](../README.md#outputs); they do not produce a product model or implement its flows.

A passing model check establishes cross-file consistency, not a functioning product, exhaustive runtime copy coverage or a good design decision. Review the definition and planned current walk before rendering, as [review.md](review.md) describes.

## Files and source of truth

A product normally keeps:

```text
docs/
  brief.md
  product.json
  copy.md
  product.fixtures.json
```

`product.json` has `model: 1` and points to its companion files:

```json
"files": {
  "copy": "copy.md",
  "fixtures": "product.fixtures.json"
}
```

Companion resolution is deterministic and independent of the command's working directory: `copy.md` and `fixtures.json` resolve relative to the directory containing `product.json`. For a conventional `docs/product.json`, paths starting with `docs/`, such as `docs/copy.md` and `docs/product.fixtures.json`, resolve from the project root instead. There is no filesystem-dependent fallback or shadowing by a nested `docs/docs/` directory. Prefer local companion names for portable directories, as the samples do. Companion paths must be relative; the checker rejects absolute companion paths. The path to the model itself is relative to the invoking working directory, or absolute.

The structural source is [`studio/src/model/schema.ts`](../studio/src/model/schema.ts), using Zod 4. [`product-model.schema.json`](product-model.schema.json) is its generated JSON Schema for editor completion and structural validation. Point the optional model `$schema` field or your editor's schema configuration at that file; do not hand-edit the generated schema. Cross-file constraints still require `model:check`.

Model objects are strict: unknown fields fail instead of being silently ignored. Use the schema's optional fields explicitly; nonempty user, flow, surface, state and viewport lists provide a concrete definition rather than a runtime scaffold.

Zod's native [`z.toJSONSchema()`](https://zod.dev/json-schema) conversion supports Draft 2020-12. Zod is [MIT-licensed](https://raw.githubusercontent.com/colinhacks/zod/main/LICENSE); its license remains with the normal dependency distribution, and no third-party source is copied into the model implementation. Both public references checked **2026-10-08**.

## Field map

All IDs use camelCase, starting with a lowercase letter; contract names may use PascalCase. Flow, surface, state and event IDs are globally distinct, so a `catalog` surface cannot also name a flow or state. Stage IDs are local to a flow; slot and setup IDs are local to a surface. A setup ID must differ from that surface's state IDs. Copy keys are dotted, such as `catalog.empty.title`; pattern record and variant IDs come from their headers rather than the product-ID convention.

| Field | Meaning |
|---|---|
| `model` | Version, currently `1`. |
| `product` | `id`, one-sentence `outcome`, optional `archetype`, and users with `id`, `who`, `device` (`phone`, `desktop`, `both`) and surface IDs. |
| `entities` | Product objects with `id`, chosen `words`, optional rejected terms in `never`, and their data `contract`. |
| `capabilities` | IDs, whether each is `real`, and an optional explanatory `note`. Flow/event dependencies reference these IDs. |
| `data` | Named contracts: field types, enums, realistic `typical`/`max` counts and fields needing a `long` case. |
| `states` | Product-wide IDs with a human `label`, rendering `rule`, `kind` and contract-to-fixture-scenario mapping. |
| `events` | Semantic IDs with a `label`, `kind`, and optional capability ID in `needs`. |
| `nav` | Ordered `items` (`surface`, deck `copy` key), optional `menu` surface IDs, optional `globalAction` event ID, expected destination count `inAYear`. |
| `flows` | User `goal`, `priority`, optional flow binding, stages, observable `ends` and capability `needs`. A stage has `id`, `surface`, optional `state` and `next` stage IDs in that flow. |
| `surfaces` | One `question`, `route`, optional channel, optional surface binding, slots, applicable states, setups, viewports and page-level copy references. |
| `axes` | Optional uncovered product decisions with `id`, `question`, `why`, surface IDs and options (`id`, `label`, `note`). These require an in-app studio; the current generic catalog does not render them. |
| `files` | Paths to the keyed deck and fixture file. |

The nine model archetype hints are `workspace`, `feed`, `commerce`, `reader`, `media`, `companion`, `canvas`, `conversation` and `utility`. A hint describes the main object/home surface; it does not add surfaces or constrain the product to an archetype sample. Reference and look stay visual-walk decisions, outside the model.

Flow priority is `must`, `should` or `later`, separate from binding status. Must flows define the first coherent product loop. The checker reports surfaces reached only by Should/Later flows as not designed this round; a surface shared with a Must flow remains in scope. This is a model report, not filtering of today's fixed studio catalog.

## Bindings

A binding selects one pattern record at one placement: **flow → surface → slot**. Flow and surface objects use `binding`; slots carry the binding fields directly.

Record scale must fit the binding target: a flow binding requires a flow-scale record; a surface binding accepts flow- or surface-scale records; a slot binding cannot use a surface-scale record and must support the slot's placement. Record metadata supplies these facts, not the record's name or appearance.

| Field | Rule |
|---|---|
| `record` | An ID in the pattern index. Read that record's fit and behavior contracts. |
| `status` | `open`: no pick yet; `proposed`: a recommendation; `fixed`: confirmed or forced by a real constraint. |
| `variant` | Required for proposed/fixed bindings; must be a header variant ID. |
| `candidates` | Optional nonempty list of fitting header variant IDs; omitted means all. Any selected variant must be included. |
| `because` | Product reason or confirmed constraint; required and nonblank when fixed. Recommended for proposals too. |
| `sameAs` | Optional existing bound target: `flow:<id>`, `surface:<id>` or `slot:<surface>/<slot>`. |

A copied layout, provider constraint or single fitting variant can justify a fixed choice, but list fixed claims not already stated by the user for confirmation. A preference without a strong constraint is a proposal, not a fixed fact. Narrow candidates against real fields, counts and capabilities before offering a decision.

`sameAs` means one shared decision, not merely similar styling. Both records must have the same variant IDs and either be the same record or declare a `sharesVariants` relationship. Selected variants must agree, targets must exist, and cycles fail. In particular, `browse-inspect-act` declares `sharesVariants: storefront`, so a browse flow may share its catalog surface's composition.

**Schematic decisions are fixed when independent.** A schematic has no independently selectable variant renderer. The narrow exception is a shared schematic flow with `sameAs` pointing to a compatible variant-rendered surface declared through `sharesVariants`: the target supplies the renderer and there is no independent schematic walk step. This permits the browse flow and storefront to share a still-proposed composition without predeciding it. It is not permission to leave an unrelated schematic open. If an independent schematic decision is unresolved, leave it unbound and record the uncovered question as an in-app product axis.

### Slots and data mapping

A surface header's slots describe **child placements**. When a surface is bound, all required placement IDs must exist with meaningful record, mapped data or referenced copy; an empty `{ copy: {} }` slot is not a filled placement. Any undeclared placement ID fails. A slot-bound record must support that placement ID too: `search-filter` can bind at `toolbar`, `empty-states` at `state`, and `notifications` at `outcome`. Internal regions in a component/state/interaction record do not all need separately bound nested slots. A storefront with a separate detail surface can omit its optional `detail` placement; a split layout still needs local detail as its prose contract requires.

A slot without `record` is plain copy/data and carries no binding-decision fields. Every slot has `id` and `copy`; it can also have:

- `data: { contract, many?, map }`, where `map` is **record field → contract field**, and every target must be declared by that contract;
- `states`, limiting the slot to a subset of its surface states; omitted means all;
- `on: [{ event, axis }]`, linking treatment to semantic events rather than a fictitious timed animation.

Interaction and motion records may bind to supported slots even when the record also has a global `studio` step. Such a binding is an **explicit local override** for that placement; `on` selects the semantic event and treatment axis, not a variant. The global interaction style supplies defaults for placements without an explicit binding. A model-loading runtime must honor the local binding rather than overwrite it with the global choice; today's generic catalog does not apply model bindings.

Required header copy families are strings, and every listed family is required. A family matches a literal dot-separated segment in a key: `priceUnit` matches `catalog.priceUnit` or `catalog.priceUnit.caption`, not `catalog.dailyRate`. Surface bindings inspect page and child-slot keys; slot bindings inspect their own keys; flow bindings inspect keys on their stage surfaces. Declare only genuinely obligatory fixed-copy families in a record header.

## States, setups and real operations

A state is a product-wide rendering condition, with `kind: data | auth | connectivity | operation | firstRun`. Its `rule` tells the builder what to show; it is not a product benefit. Each surface explicitly lists its applicable state IDs, **default first**. The checker requires a fixture scenario for every contract that surface reads in every declared state, even when the scenario is an empty array.

A setup is an interaction target on a surface, such as an open menu, confirmation dialog or invalid field: `{ id, label, event, state? }`. Its event must exist; an optional state must belong to the surface. Without an explicit state, the setup uses the surface's default state. Copy can target a setup directly, so a dialog's strings are not disguised as always-visible page text.

State and setup labels are single-line and have no surrounding whitespace, so generated deck targets round-trip exactly. Pipes and backslashes are allowed; the reach writer escapes them in Markdown.

Event kinds are `press`, `submit`, `operation`, `layer`, `swap`, `route` and `theme`. The supported slot interaction axes are:

| Axis | Event kind |
|---|---|
| `layerArrival` | `layer` |
| `controlResponse` | `press` or `submit` |
| `contentSwap` | `swap` |
| `asyncFeedback` | `operation` |
| `routeMotion` | `route` |
| `themeMotion` | `theme` |

Model pending, done and failed outcomes for each real operation. Show cancellation, retry or undo only when its capability exists. `flows[].needs` and `events[].needs` connect behavior to capabilities; unknown IDs fail, while `real: false` dependencies produce warnings that the operation is imagined. Neither a model warning nor a schematic specimen makes it real.

### Channels

Surface channels are `screen`, `email` and `push` (omitted means a screen). Email subjects, preheaders, bodies and actions, plus push titles, bodies and actions, belong to channel surfaces. Push has a title, not an email subject. Their fixed copy is checked like screen copy.

For a screen, `route` identifies its browser route or entry point. For an email or push, use a logical channel-template identity such as `email:rentalRequestReceived` or `push:rentalReady`: it names the product message, not a navigable browser route or a claim that delivery is implemented. Channel `viewports` are phone/desktop **preview widths**, not a promise about a recipient's device or an email client's layout. The surface's `question` names the recipient's product outcome, such as “Which rental request needs my response?” or “Where can I collect my reserved tool?”, rather than how the studio previews it. Studio preview labels are not product-deck copy.

Inventory any other outbound text in the grill and resolve its representation explicitly; do not add an unsupported channel value or omit it because it is not a screen.

## Keyed copy deck

**Derived** means produced by a data-contract field: user content, agent output, lesson text, a price. **Fixed** means all other product language, including text outside the visible page: accessible names, page/document titles, non-derived alt text and announcements, email and push copy. The deck holds fixed strings; fixtures hold derived content. `{placeholders}` join the two: `catalog.priceUnit` might be `{fee} per day`, where `fee` comes from the contract but `per day` remains fixed copy.

Use date/timestamp and number fields for times, counts, currency and measurements. For example, fixtures hold a sent timestamp or a review interval; deck keys supply `{count} min ago` or `Review in {days} days`. A composed fixture string such as `Weapon · +142 power` still hides fixed category/unit language: map the values separately and put the surrounding words in keyed copy. Varying fixture values do not make their fixed wording derived.

The deck is a Markdown table with exactly these columns, one nonempty chosen string per unique key. Escape literal pipes in copy as `\|`.

```markdown
| Key | Copy | Shown when |
|---|---|---|
| catalog.title | Find a tool. | catalog |
| catalog.empty.title | No tools are available nearby. | catalog · Empty |
| catalog.confirm.title | Send this rental request? | catalog · Confirm request |
```

Surface and slot `copy` objects are `CopyRefs`: **key → `always` or a nonempty array of that surface's state/setup IDs**. `always` means the string is visible in **every state and setup** of the owning surface, not merely somewhere reachable on it. In a slot with `states`, it means visible in every state and setup allowed by that restriction. A state reference also covers setups based on that state: opening a menu or showing field validation does not remove the surrounding state copy. A setup reference covers only that setup, for layer-specific or validation-specific language. State- or setup-specific copy explicitly lists the actual IDs unless it genuinely appears in every allowed target. For the table above, the reference shape might be:

```json
"copy": {
  "catalog.title": "always",
  "catalog.empty.title": ["catalogEmpty"],
  "catalog.confirm.title": ["confirmRequest"]
}
```

Here `catalogEmpty` has state label `Empty`, and `confirmRequest` has setup label `Confirm request`. These are excerpts; use a [sample model](#samples) for a complete definition.

Every referenced key must exist, and every deck key must be referenced by a surface or slot. A navigation key must also have such a reference; a nav entry alone does not establish its reach. A reference can target only the owning surface's states/setups. If a slot restricts its states, its copy cannot target a state or setup in which the slot is hidden. Keep headline candidates and editorial alternatives in the brief, not orphan deck rows.

### Generated reach and staleness

`Shown when` is generated from `CopyRefs`, not free-form documentation:

- `always` on a surface or unrestricted slot produces the surface ID, such as `catalog`;
- `always` on a state-restricted slot expands to `surface ID · state label` and that state's setup labels for each state in the slot's declared order; it does not produce the bare surface ID;
- an explicit state ID produces `surface ID · state label`, followed by the labels of its setups in setup declaration order; a setup without `state` uses the surface's first state;
- an explicit setup ID produces only `surface ID · setup label`, such as `catalog · Confirm request`;
- multiple targets are joined with `; `;
- order follows model surfaces, then page copy and slot copy in declaration order, then each reference's state/setup order;
- duplicate target labels for a key are included once.

A changed state/setup label, reference, surface order or target can stale the column. Normal `model:check` rejects any mismatch and gives the expected value. `--write-shown-when` is a guarded mutation: it computes the updated reach in memory, then validates the model, bindings, deck and fixtures against that candidate before writing. Any other validation error leaves the deck untouched. On success it updates only generated reach cells, preserving chosen copy, prose, deck row order and existing line endings (LF or CRLF), and escaping literal pipes and backslashes in generated labels. It does not invent missing keys or fix invalid references. Warnings are still reported and require review. Review copy edits against [copy-rubric.md](copy-rubric.md) as well as checking their reach.

The model checker checks the file inventory. It does not inspect a rendered DOM for untagged fixed strings or provide a live Every screen page. Reconcile edits from the current studio's content-based Copy panel back into this keyed deck manually.

## Data and fixtures

A data contract declares `fields` using `text`, `longText`, `number`, `money`, `date`, `image`, `enum` or `ref`. `enums` supplies allowed strings for enum fields. `typical` is the realistic populated count; optional `max` is at least `typical` and bounds every scenario. `long` lists text/longText fields needing an overflow case.

Fixtures are **contract → scenario → row arrays**, not wrappers with fake API metadata. Every row supplies every declared field and no unknown fields. An absence scenario is `[]`, not `null` or a fabricated empty-state message.

```json
{
  "Tool": {
    "populated": [
      { "name": "Cordless drill", "fee": 8 },
      { "name": "Folding workbench", "fee": 12 }
    ],
    "one": [{ "name": "Compact socket set", "fee": 5 }],
    "none": [],
    "long": [
      { "name": "Adjustable workbench with folding legs and a removable clamping rail", "fee": 14 }
    ]
  }
}
```

This fixture shape corresponds to a `Tool` contract with `name: text`, `fee: money`, `typical: 2` and `long: ["name"]`.

The checker enforces:

- strings for text, longText, image and ref fields; finite numbers for number/money; a valid ISO date or timestamp for date; declared enum members for enum;
- `populated` has exactly `typical` rows, and no scenario exceeds `max` when set;
- each field listed in `long` has a value in the `long` scenario of at least 40 characters and longer than every populated value for that field;
- every state's named contract/scenario exists, and every surface state covers all contracts that surface reads.

Use `populated`, `one`, `long`, `none` and product-specific scenarios as needed; only required contract/state scenarios and declared long cases are checker obligations. A nonempty `text` or `longText` value repeated identically across multiple fixture rows is a warning for possible fixed copy disguised as data, including when only the populated scenario has rows. Enums, dates, references and image URLs are not language-copy heuristics. A legitimate constant such as a draft's identity may have a product reason, but fixed explanatory messages belong in the deck rather than a data field.

## Pattern metadata

Each pattern record has YAML front matter consumed by the machine index, alongside its human fit, state, data, accessibility and motion contracts. The fields are `id`, `scale`, legacy catalog `studio` step or `null`, `slots.required`/`optional`, variant IDs/labels, state vocabulary, required `copy` families, semantic `events`, `renderer: variants | schematic`, and optional `sharesVariants`.

Headers describe binding facts; prose explains their use. Variant labels must agree with the prose Variants section. Surface slots are child placements; slot-bound records declare their supported placement IDs. Header copy families are all required, so keep the list limited to genuinely obligatory fixed language.

[`patterns/index.json`](patterns/index.json) is generated from the records. Use the [human index](patterns/README.md) to find a record, then consult the machine header/index for IDs. Regenerate the index after header changes; do not add a separate opaque family-matching convention or hand-edit generated metadata.

## Commands

Run these from this repository's `studio/` after `bun install`. Use **Bun 1.3.14 or newer**; the pattern-header loader requires its `Bun.YAML` API.

```sh
# Check a product outside this repository.
bun run model:check /absolute/path/to/product/docs/product.json

# Check a self-contained sample, or all sample models.
bun run model:check samples/shed/product.json
bun run model:check --samples

# Validate all other rules, then refresh only the generated reach column.
bun run model:check /absolute/path/to/product/docs/product.json --write-shown-when

# Regenerate structural schema and pattern metadata after source changes.
bun run model:schema
bun run patterns:index

# Detect stale generated schema/index without rewriting them.
bun run model:schema --check
bun run patterns:index --check
```

Checker diagnostics identify a JSON path or copy/fixture location. Cross-file errors include an actionable correction; structural errors use the schema's validation messages. Errors cover structure/ID collisions, unknown or incompatible references, missing variants/reasons, required/undeclared slots, unreachable or missing/orphan copy, stale reach labels, data mapping/types/counts/long cases, fixture coverage and event/axis mismatches. Warnings identify imagined capability dependencies, deferred-only surfaces and suspiciously constant fixture strings. Resolve or account for warnings during the product review; an error-free parse is not a truthfulness review.

## Samples

[`studio/samples/`](../studio/samples/) contains a self-contained `product.json`, `copy.md` and `fixtures.json` in each of `workspace`, `feed`, `commerce`, `reader`, `media`, `companion`, `canvas`, `conversation` and `utility`. These nine invented products are meaningful starting points: their core loops, MVP cuts, recipient questions and binding reasons illustrate product decisions, not only checker syntax. Their companion paths are local, so copy a sample directory together when adapting it. Rename users, entities, contracts, goals, states, operations and bindings to fit the actual product; keep only truthful capabilities and required copy families.

[`shed/product.json`](../studio/samples/shed/product.json) is an additional invented example: renting tools from neighbors by the day. It is a complete worked model, not a tenth archetype or a claim about an external service. Start with the closest structural sample or Shed, then run the grill rather than inheriting decisions blindly.

These sample definitions are separate from the current runtime content in `studio/src/content/archetypes/`. They do not replace `studio/public/content.json` or change saved-walk compatibility.
