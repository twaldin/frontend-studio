# Product model

The product model is the structured result of the [product grill](product-grill.md), with the [MVP cut](mvp-scope.md), pattern decisions, fixed-copy inventory and representative data in one checked definition. The [brief](brief-template.md) holds intent and voice; it is not a second source of structured behavior.

## Current boundary

The model tooling defines and checks product files using the schema, pattern metadata/index, checker, sample definitions and grill workflow. It does not change the studio runtime.

The current generic studio still runs its fixed catalog, loads the legacy `content.json` input, and saves choices, notes, status and content copy edits in `.studio/state.json`. It does not load a checked `product.json`, generate a model-driven walk, edit deck keys in Copy mode or provide a model-driven **Every screen** page. Capture and export are not model-aware. Current exports remain the artifacts listed in the [README](../README.md#outputs); they do not produce a product model or implement its flows.

Only the twelve dedicated pattern records currently have studio steps. Other records' `renderer: variants` declarations are model contracts, not additional executable steps.

A passing model check establishes cross-file consistency, not a functioning product, exhaustive runtime copy coverage or a good design decision. Review the definition and planned current walk before rendering, as [review.md](review.md) describes.

Version 1 is the initial, unreleased product-model contract. Copy-role objects and `optional` field arrays are model metadata. Shorthand `"always"` and ID-array copy references mean visible text. Semantic validation requires explicit screen-title and email/push roles.

Saved studio walks use a separate runtime format. Product-model validation does not rewrite their choices, notes, status or content edits.

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

Model objects are strict. Unknown fields and duplicate JSON object keys fail instead of silently discarding values. Nonempty user, flow, surface, state and viewport lists provide a concrete definition.

Zod's native [`z.toJSONSchema()`](https://zod.dev/json-schema) conversion supports Draft 2020-12. Zod is [MIT-licensed](https://raw.githubusercontent.com/colinhacks/zod/main/LICENSE); its license remains with the normal dependency distribution, and no third-party source is copied into the model implementation. Both public references checked **2026-10-08**.

## Field map

All IDs use camelCase, starting with a lowercase letter; contract names may use PascalCase. Flow, surface, state and event IDs are globally distinct, so a `catalog` surface cannot also name a flow or state. Stage IDs are local to a flow; slot and setup IDs are local to a surface. A setup ID must differ from that surface's state IDs. Copy keys are dotted, such as `catalog.empty.title`; pattern record and variant IDs come from their headers rather than the product-ID convention.

| Field | Meaning |
|---|---|
| `model` | Version, currently `1`. |
| `product` | `id`, one-sentence `outcome`, optional `archetype`, and users with `id`, `who`, `device` (`phone`, `desktop`, `both`) and surface IDs. |
| `entities` | Product objects with `id`, chosen `words`, optional rejected terms in `never`, and their data `contract`. |
| `capabilities` | IDs, whether each is `real`, and an optional explanatory `note`. Flow/event dependencies reference these IDs. |
| `data` | Named contracts with field types, enums, realistic `typical` and `max` counts, `long` overflow fields, and `optional` nullable fields. |
| `states` | Product-wide IDs with a human `label`, rendering `rule`, `kind` and contract-to-fixture-scenario mapping. |
| `events` | Semantic IDs with a `label`, `kind`, and optional capability ID in `needs`. |
| `nav` | Ordered `items` (`surface`, deck `copy` key), optional `menu` surface IDs, optional `globalAction` event ID, expected destination count `inAYear`. |
| `flows` | User `goal`, `priority`, optional flow binding, stages, observable `ends` and capability `needs`. A stage has `id`, `surface`, optional `state` and `next` stage IDs in that flow. |
| `surfaces` | One `question`, `route`, optional channel, optional surface binding, slots, applicable states, setups, viewports and page-level copy references. |
| `axes` | Optional uncovered product decisions with `id`, `question`, `why`, surface IDs and options (`id`, `label`, `note`). These require an in-app studio; see the [current boundary](#current-boundary). |
| `files` | Paths to the keyed deck and fixture file. |

The nine model archetype hints are `workspace`, `feed`, `commerce`, `reader`, `media`, `companion`, `canvas`, `conversation` and `utility`. A hint describes the main object/home surface; it does not add surfaces or constrain the product to an archetype sample. Reference and look stay visual-walk decisions, outside the model.

Flow priority is `must`, `should` or `later`, separate from binding status. Must flows define the first coherent product loop and scope its walk choices. A surface shared with a Must flow belongs to that cut. A surface reached by no flow is an error, even if it has navigation or copy references. The checker warns about surfaces reached only by Should/Later flows and deck keys referenced only on those deferred surfaces.

### Every screen coverage

Flow priority does not narrow copy coverage. **Every screen** must reach every referenced fixed string on every modeled surface, including surfaces reached only by `should` or `later` flows. Its targets include every declared state and setup across screen, email and push channels. All copy roles count, including accessible names, titles, alt text, announcements and outbound message parts.

Deferred-only key warnings describe the walk's scope, not keys that coverage may omit. The coverage denominator is the complete set of surface and slot copy references, with each key reachable at its declared targets. Navigation keys require such references too. Runtime availability is described in the [current boundary](#current-boundary).

## Bindings

A binding selects one pattern record at one placement: **flow → surface → slot**. Flow and surface objects use `binding`; slots carry the binding fields directly.

Record scale must fit the binding target: a flow binding requires a flow-scale record; a surface binding accepts flow- or surface-scale records; a slot binding cannot use a surface-scale record and must support the slot's placement. Record metadata supplies these facts, not the record's name or appearance.

| Field | Rule |
|---|---|
| `record` | An ID in the pattern index. Read that record's fit and behavior contracts. |
| `status` | `open`: no pick yet; `proposed`: a recommendation; `fixed`: confirmed or forced by a real constraint. |
| `variant` | Required for proposed/fixed bindings; must be a header variant ID. |
| `candidates` | Optional nonempty list of fitting header variant IDs; omitted means all header variants. Any selected variant must be included. A nonfixed binding needs at least two effective candidates. |
| `because` | Product reason or confirmed constraint; required and nonblank when fixed. Recommended for proposals too. |
| `sameAs` | Optional existing bound target: `flow:<id>`, `surface:<id>` or `slot:<surface>/<slot>`. |

A copied layout, provider constraint or single fitting variant can justify a fixed choice, but list fixed claims not already stated by the user for confirmation. An `open` or `proposed` binding with fewer than two effective candidates is an error; use `fixed` with a selected variant and a product reason. A preference without a strong constraint is a proposal, not a fixed fact. Narrow candidates against real fields, counts and capabilities before offering a decision.

`sameAs` means one shared decision, not merely similar styling. Both records must have the same variant IDs and either be the same record or declare a `sharesVariants` relationship. The follower's status, selected variant and effective candidate set must equal the leader's. Candidate order does not matter, and omitted candidates expand to all variants in that record's header. Targets must exist, and cycles fail. In particular, `browse-inspect-act` declares `sharesVariants: storefront`, so a browse flow may share its catalog surface's composition.

**Schematic decisions are fixed when independent.** A schematic has no independently selectable variant renderer. The narrow exception is a shared schematic flow with `sameAs` pointing to a compatible variant-rendered surface declared through `sharesVariants`: the target supplies the renderer and there is no independent schematic walk step. This permits the browse flow and storefront to share a still-proposed composition without predeciding it. It is not permission to leave an unrelated schematic open. If an independent schematic decision is unresolved, leave it unbound and record the uncovered question as an in-app product axis.

### Slots and data mapping

A surface header's slots describe **child placements**. When a surface is bound, all required placement IDs must exist with meaningful record, mapped data or referenced copy; an empty `{ copy: {} }` slot is not a filled placement. Any undeclared placement ID fails. A slot-bound record must support that placement ID too: `search-filter` can bind at `toolbar`, `empty-states` at `state`, and `notifications` at `outcome`. Internal regions in a component/state/interaction record do not all need separately bound nested slots. A storefront with a separate detail surface can omit its optional `detail` placement; a split layout still needs local detail as its prose contract requires.

A slot without `record` is plain copy/data and carries no binding-decision fields. Every slot has `id` and `copy`; it can also have:

- `data: { contract, many?, map }`, where `map` is **record field → contract field**, and every target must be declared by that contract;
- `states`, limiting the slot to a subset of its surface states; omitted means all;
- `on: [{ event, axis }]`, linking treatment to semantic events rather than a fictitious timed animation.

A slot bound to an interaction- or motion-scale record requires a nonempty `on` list. For records whose `studio` field is one of the six interaction axes below, the binding uses that axis. Each linked event must exist and have the semantic kind required by the axis. `motion-language`, whose studio step is `motion`, accepts any of those axes with a matching event kind. Header `events` describe lifecycle or action vocabulary; they are not model event IDs.

These bindings are explicit local overrides, even when the record also has a global studio step. `on` selects the semantic event and treatment axis, not a variant. Global interaction style supplies defaults for unbound placements. A model-loading runtime must honor the local binding rather than overwrite it with the global choice. See the [current boundary](#current-boundary) for the generic studio.

Required header copy families are strings, and every listed family is required. A family matches a literal dot-separated segment in a key: `priceUnit` matches `catalog.priceUnit` or `catalog.priceUnit.caption`, not `catalog.dailyRate`. Surface bindings inspect page and child-slot keys; slot bindings inspect their own keys; flow bindings inspect keys on their stage surfaces. Declare only genuinely obligatory fixed-copy families in a record header.

## States, setups and real operations

A state is a product-wide rendering condition, with `kind: data | auth | connectivity | operation | firstRun`. Its `rule` tells the builder what to show; it is not a product benefit. Multiple surfaces can reference one state when its meaning and rendering rule agree. Surface-specific conditions still get distinct IDs. Each surface explicitly lists its applicable state IDs, default first. The checker requires a fixture scenario for every contract that surface reads in every declared state, even when the scenario is an empty array. The [Shed example](#samples) demonstrates shared states.

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

Surface channels are `screen`, `email` and `push`, with `screen` as the default. Copy-reference roles identify each string's destination without inferring it from the key. Each screen surface requires a `title` role, each email requires `subject` and `body`, and each push requires `title` and `body`. References for each required role must collectively cover every state and setup, including slot-state restrictions. Email preheaders and actions, and push actions, belong to the same channel surface when present. Push has a title, not an email subject. Their fixed copy has the same coverage obligations as screen copy.

For a screen, `route` identifies its browser route or entry point. For an email or push, use a logical channel-template identity such as `email:rentalRequestReceived` or `push:rentalReady`: it names the product message, not a navigable browser route or a claim that delivery is implemented. Channel `viewports` are phone/desktop **preview widths**, not a promise about a recipient's device or an email client's layout. The surface's `question` names the recipient's product outcome, such as “Which rental request needs my response?” or “Where can I collect my reserved tool?”, rather than how the studio previews it. Studio preview labels are not product-deck copy.

Inventory any other outbound text in the grill and resolve its representation explicitly; do not add an unsupported channel value or omit it because it is not a screen.

## Keyed copy deck

**Derived** means produced by a data-contract field, such as user content, agent output, lesson text or a price. **Fixed** means all other product language, including accessible names, page/document titles, non-derived alt text and announcements, and email and push copy. The deck holds fixed strings; fixtures hold derived content. Placeholders join the two. For example, `{fee:currency} per day` formats a money field while `per day` remains fixed copy.

### Placeholder sources and formatters

Every `{name}` placeholder must resolve at every placement that references its key. Surface-level copy can read fields and map keys from all contracts read by that surface's slots. Slot copy can read only that slot's own `data.contract` fields and `data.map` keys. A map key resolves through its mapped contract field, including that field's type. A field on another surface, or on a sibling slot, does not supply slot copy. Surface-level resolution requires at least one matching source; it does not select among multiple sources or list rows. Source and row selection belong to model rendering, outside the [current boundary](#current-boundary).

Derived formatting uses `{field:formatter}` rather than an unexplained `{count}` or `{time}` alias:

| Syntax | Required field type | Meaning |
|---|---|---|
| `{editedAt:relative}` | `date` | Complete relative-time phrase, such as `2 hours ago`. |
| `{sentAt:time}` | `date` | Time of day. |
| `{dueAt:date}` | `date` | Calendar date. |
| `{fee:currency}` | `money` | Currency amount. |
| `{quantity:number}` | `number` or `money` | Formatted number. |

Unknown placeholder names, unsupported formatters and formatter/type mismatches are errors. Plain `{field}` interpolation renders string fields as stored and numeric fields as an unlocalized decimal value. A bare date therefore retains its ISO representation; use a date formatter for product-facing calendar or time copy. A bare money value has no currency symbol; key its unit explicitly or use `currency`. Fixtures hold dates and numeric values, not precomposed relative-time or measurement strings. A composed fixture string such as `Weapon · +142 power` hides fixed category and unit language. Map its values separately and put the surrounding words in keyed copy.

### Deck format and copy roles

The deck is a Markdown table with exactly these columns, one nonempty chosen string per unique key. Each row requires a trailing pipe; a missing closing pipe is a deck-format error, not a stale reach cell. Escape literal pipes in copy as `\|`.

```markdown
| Key | Copy | Shown when |
|---|---|---|
| catalog.title | Find a tool. | catalog |
| catalog.empty.title | No tools are available nearby. | catalog · Empty |
| catalog.confirm.title | Send this rental request? | catalog · Confirm request |
```

Surface and slot `copy` objects are `CopyRefs`. Each key accepts either a shorthand `when` value or `{ "when": ..., "as": ... }`. A `when` value is `"always"` or a nonempty array of that surface's state/setup IDs. The shorthand forms and an omitted `as` both mean `text`.

| `as` | Destination |
|---|---|
| `text` | Visible fixed text, including form labels and captions. |
| `label` | Hidden accessible name, such as an icon control's `aria-label` or a landmark name. |
| `title` | Screen page/document title or push title. |
| `alt` | Non-derived alternative text. |
| `announce` | Live-region status message, which can also be visible in its placement. |
| `subject` | Email subject. |
| `preheader` | Email preheader. |
| `body` | Email or push body. |
| `action` | Action text, including outbound message actions. |

Roles are explicit metadata, not reserved segments inferred from key names. Visible form labels use `text`; a separate hidden accessible name uses `label`. Action copy is visible in its screen or channel target. Hidden-only screen destinations include `label`, `title` and `alt`. An `announce` message has live-region behavior and can remain visible, such as inline notification or toast copy. Channel subjects and bodies render in their channel preview. For example:

```json
"copy": {
  "catalog.documentTitle": { "when": "always", "as": "title" },
  "catalog.title": "always",
  "shell.aria.main": { "when": "always", "as": "label" },
  "catalog.empty.title": ["catalogEmpty"],
  "catalog.confirm.title": { "when": ["confirmRequest"], "as": "text" }
}
```

`always` means the string is present in every state and setup of the owning surface, in its declared role. In a slot with `states`, it covers every state and setup allowed by that restriction. A state reference also covers setups based on that state. A setup reference covers only that setup, for layer-specific or validation-specific language. State- or setup-specific copy lists the actual IDs unless it genuinely appears in every allowed target.

Here `catalogEmpty` has state label `Empty`, and `confirmRequest` has setup label `Confirm request`. These are excerpts; use a [sample model](#samples) for a complete definition.

Every referenced key must exist, and every deck key must be referenced by a surface or slot. A navigation key must also have such a reference; a nav entry alone does not establish its reach. A reference can target only the owning surface's states/setups. If a slot restricts its states, its copy cannot target a state or setup in which the slot is hidden. Keep headline candidates and editorial alternatives in the brief, not orphan deck rows.

### Generated reach and staleness

`Shown when` is generated from each reference's `when`, not free-form documentation. The `as` role does not change its reach labels:

- `always` on a surface or unrestricted slot produces the surface ID, such as `catalog`;
- `always` on a state-restricted slot expands to `surface ID · state label` and that state's setup labels for each state in the slot's declared order; it does not produce the bare surface ID;
- an explicit state ID produces `surface ID · state label`, followed by the labels of its setups in setup declaration order; a setup without `state` uses the surface's first state;
- an explicit setup ID produces only `surface ID · setup label`, such as `catalog · Confirm request`;
- multiple targets are joined with `; `;
- order follows model surfaces, then page copy and slot copy in declaration order, then each reference's state/setup order;
- duplicate target labels for a key are included once.

A changed state/setup label, reference, surface order or target can stale the column. Normal `model:check` rejects any mismatch and gives the expected value. `--write-shown-when` is a guarded mutation: it computes the updated reach in memory, then validates the model, bindings, deck and fixtures against that candidate before writing. Any other validation error leaves the deck untouched. On success it updates only generated reach cells, preserving chosen copy, prose, deck row order and existing line endings (LF or CRLF), and escaping literal pipes and backslashes in generated labels. It does not invent missing keys or fix invalid references. Warnings are still reported and require review. Review copy edits against [copy-rubric.md](copy-rubric.md) as well as checking their reach.

Reconcile edits from the studio's content-based Copy panel back into the keyed deck manually. See the [current boundary](#current-boundary) for the distinction between file checks and rendered coverage.

## Data and fixtures

A data contract declares `fields` using `text`, `longText`, `number`, `money`, `date`, `image`, `enum` or `ref`. `enums` supplies allowed strings for enum fields. `typical` is the realistic populated count. `max`, when present, is at least `typical` and bounds every scenario. `long` lists text/longText fields needing an overflow case.

`optional: ["fieldName"]` permits `null` for named fields, representing an absent or unobserved value. Every row still declares every field and no unknown fields. A field omitted from `optional` cannot be `null`. Every optional field needs at least one `null` row in some fixture scenario. Select that scenario in the relevant state when reviewing the missing-value rendering rule; the check validates the fixture case, not its runtime rendering. An optional numeric `latencyMs` uses `null` for an unobserved measurement and `0` for a real zero measurement.

Fixtures are contract → scenario → row arrays, not wrappers with fake API metadata. An absent collection is `[]`; a null field represents a missing value within an existing row. Neither case uses a fabricated empty-state message.

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

- non-null values match their declared types: strings for text, longText, image and ref fields; finite numbers for number/money; a valid ISO date or timestamp for date; declared enum members for enum;
- null values appear only in declared optional fields, and every optional field has at least one null fixture row in some scenario;
- `populated` has exactly `typical` rows, and no scenario exceeds `max` when set;
- each field listed in `long` has a non-null value in the `long` scenario of at least 40 characters and longer than every non-null populated value for that field;
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

Checker diagnostics identify a JSON path or copy/fixture location. Cross-file errors include an actionable correction; structural errors use the schema's validation messages.

Errors cover strict structure and duplicate JSON keys, ID collisions, no-flow surfaces, unknown or incompatible references, missing variants/reasons, sameAs disagreements, nonfixed singleton choices, required/undeclared slots, copy roles and placeholder sources/types, missing/orphan copy, malformed deck rows, stale reach labels, data mapping/types/counts/long/null cases, fixture coverage and event/axis mismatches.

Warnings identify imagined capability dependencies, deferred-only surfaces and deck keys, rejected `entities[].never` terms found in deck copy, and suspiciously constant fixture strings. Rejected terms match exact whole-word forms, case-insensitively; list singular, plural and other inflected forms explicitly when each is banned. Resolve or account for warnings during the product review; an error-free parse is not a truthfulness review.

## Samples

[`studio/samples/`](../studio/samples/) contains a self-contained `product.json`, `copy.md` and `fixtures.json` in each of `workspace`, `feed`, `commerce`, `reader`, `media`, `companion`, `canvas`, `conversation` and `utility`. These nine invented products are meaningful starting points: their core loops, MVP cuts, recipient questions and binding reasons illustrate product decisions, not only checker syntax. Their companion paths are local, so copy a sample directory together when adapting it. Rename users, entities, contracts, goals, states, operations and bindings to fit the actual product; keep only truthful capabilities and required copy families.

[`shed/product.json`](../studio/samples/shed/product.json) is an additional invented example of renting tools from neighbors by the day. Its home and catalog surfaces share `loading`, `populated`, `noMatches` and `failed` state IDs, with fixture mappings covering the contracts either surface reads. Surface-specific conditions keep distinct IDs. It is a complete worked model, not a tenth archetype or a claim about an external service. Start with the closest structural sample or Shed, then run the grill rather than inheriting decisions blindly.

These definitions are separate from runtime content in `studio/src/content/archetypes/`. See the [current boundary](#current-boundary) for runtime and saved-walk compatibility.
