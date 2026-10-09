# <Product> — product brief

Start here before touching a surface, then read `docs/product.json`, the keyed
`docs/copy.md` and the contract/scenario `docs/product.fixtures.json`.
Fill those files using the skill's [product model reference](product-model.md)
and [product grill](product-grill.md). Positive, current-tense statements only;
history lives in git.

The brief holds intent, voice and reference choices. The model holds structured
facts, priorities, bindings, data, states, setups and events. Edit the model
when behavior changes, rather than keeping a second contradictory definition
in prose.

## What it is

One paragraph: the product's central outcome, what it is, who links what,
what the system does and what the user watches. Then the kinds of user,
their device and moment of use, and the surfaces each lives on
(`product.outcome`, `product.users`).

Archetype hint: <workspace / feed / commerce / reader / media / companion /
canvas / conversation / utility, or omitted>. Explain the fit to the main
object and home surface; it does not prescribe additional surfaces.

Vocabulary borrowed from: <reference for chrome>, <reference for workflow>,
<reference for data view>, <reference for library>.

## Entities

| Entity / model ID | What it is | Its words | Contract |
|---|---|---|---|

Collisions settled: "<word> means X here, never Y." Put the chosen vocabulary
and rejected terms in `entities[].words` and `entities[].never`.

## MVP loop and capabilities

> A <target user> can <trigger>, understand <critical information>, take
> <primary action>, and verify <outcome>.

Apply [MVP scope](mvp-scope.md). Explain the capability cut and any real
dependencies. In the model, capabilities have `real` and a reason where
needed; every flow has `priority: must | should | later`. An imagined
capability stays explicitly labeled, with its dependent flows and events
identified; the built UI makes only real promises.

| Flow / model ID | User goal | Priority | Observable end |
|---|---|---|---|

The authoritative stages, next-stage links, surfaces and capability needs
live in `flows`.

## Navigation

The sidebar or top nav, in order, with any global action. Which entities have
no nav item and how they are reached. Record items, menu destinations,
global-action event and expected destination count in a year in `nav`.
Navigation labels are deck keys referenced by their surfaces.

## Surfaces and channels

| Surface ID | Route / logical template identity | Channel | Recipient or user question | Users / widths |
|---|---|---|---|---|

One question per row. Include screen, email and push surfaces; outbound fixed
copy belongs to the product definition too. For channels, state the recipient's
product outcome. `email:` / `push:` routes identify logical message templates,
not browser routes; phone/desktop viewports are preview widths.
Name the home surface, its ordered questions above the fold, and the first
visit's route to the first real outcome. Surfaces that borrow a known layout
name the reference and the product reason.

## Data, states and operations

Name each surface's contracts, realistic counts and long-content pressures.
Put fields, types, enums, `typical`, `max` and `long` in `data`, then map each
slot's record fields to those contract fields.

The rule for an unobserved value is a rendering rule. Define each product-wide
state with its kind, label and one-line rule in `states`; each surface declares
its applicable states, default first. Each state names a fixture scenario for
every contract that surface reads.

Name menu, dialog, validation and other interaction setups with their
triggering events. For each operation, state what is pending, done and failed,
and whether cancellation, retry or undo is real. Record these in `events`,
`surfaces[].setups` and slot event/axis bindings, including capability needs.

## Pattern decisions

Bindings in the model follow **flow → surface → slot**. Record `open` for
unpicked decisions, `proposed` for recommendations and `fixed` for confirmed
or constrained choices. Every non-open binding has a variant; every fixed
binding has `because`. Candidate variants fit the data and real capabilities.
Required header placements contain meaningful records, mapped data or copy.
Independent schematic decisions are fixed. Shared choices use explicit `sameAs`
targets; a schematic flow can
share a compatible variant-rendered surface through its declared
`sharesVariants` relationship, without an independent schematic walk step.
The prose here explains important trade-offs rather than duplicating binding fields.

## Design

<Design principle in one line, e.g. "Quiet chrome, expressive content.">
References per part, app/landing visual split, and any product axes no record
covers. Then the **Design decisions** section pasted from the studio export.
Reference and look are walk decisions, not model fields.

## Rules

Mechanical rules a lint can hold: case, type roles, size ramp, depth, status
rendering, palette roles, motion budget, interactive states, component source,
comment policy.

## Voice

The register per surface/channel, three rules, and a before/after table.
Keep three landing headline candidates and a written evaluator here. The keyed
deck contains the selected strings and covers accessible names, page titles,
alt text, email subject/preheader/body/actions and push title/body/action as
well as visible controls and messages. Derived strings come from contract
fields in fixtures; fixed language surrounding a placeholder remains deck copy.
Conditional strings reference actual state/setup IDs. `always` follows the
every-allowed-target rule in the [product model](product-model.md#keyed-copy-deck).

