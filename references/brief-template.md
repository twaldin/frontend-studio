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

What central outcome does the product give its users? What does the system do,
and what does the user watch or control?

Who uses it, on which device, and at what moment? Which familiar products give
them useful expectations for navigation, workflow and data views?

Which archetype is a useful hint for the main object and home surface, if any?
Explain the fit rather than inheriting a sample's decisions. The structured
definition lives in the [model field map](product-model.md#field-map).

## Entities

What are the central entities, and what does each word mean here? Which word
collisions need an explanation? Keep the chosen words, rejected terms and
contract links in the [model](product-model.md#field-map).

## MVP loop and capabilities

> A <target user> can <trigger>, understand <critical information>, take
> <primary action>, and verify <outcome>.

Why is this the smallest coherent loop? Which capabilities make it possible,
and which dependencies are real? What can wait without weakening the promise?

Explain the cut using [MVP scope](mvp-scope.md). Flow goals, priorities, stages,
observable ends and capability needs live in the [model](product-model.md#field-map),
not a second flow table here.

## Navigation

How do users find the next task? Which objects deserve a navigation item, and
which are reached through another object? What changes as the product grows?

Explain the hierarchy and any global action. The ordered destinations and
their copy keys live in the [model](product-model.md#field-map).

## Surfaces and channels

Why does each surface exist? What would become unclear if two surfaces were
combined? Which questions should home answer above the fold, and how does a
first visit reach a real outcome?

What outcome does each outbound message help its recipient reach? Which
surfaces borrow a known layout, and why does that structure fit this product?

Surface questions, routes, users and preview widths live in the
[model](product-model.md#field-map). Email and push identities follow the
[channel contract](product-model.md#channels). Keep that inventory out of a
second surface table here.

## Data, states and operations

Which data pressures determine the interface? What do realistic counts and
long content make difficult? How does the product distinguish an unobserved
value from a real zero or an empty collection?

Which rendering conditions have the same meaning across surfaces? Which need
surface-specific rules? Explain the user-visible behavior. Shared state IDs,
applicable states, optional fields and null scenarios live in the
[state](product-model.md#states-setups-and-real-operations) and
[fixture](product-model.md#data-and-fixtures) definitions.

What evidence does an operation show while pending, after completion and after
failure? Which cancellation, retry or undo behavior is real? What should a menu,
dialog or validation setup help the user decide?

## Pattern decisions

Which important trade-offs explain the chosen patterns? Which choices are
forced by a real constraint, and which remain recommendations? Why does a
shared decision serve each placement that follows it?

Keep records, statuses, variants, candidates, reasons and `sameAs` links in the
[bindings](product-model.md#bindings). The prose here explains the decision
instead of repeating its fields.

## Design

What is the design principle in one sentence? Which references inform each
part, and why do the app and landing use the same or different visual language?
Which product decisions have no suitable pattern record?

Keep the confirmed **Design decisions** from the studio export here. Reference
and look are walk decisions, not model fields.

## Rules

Which mechanical rules preserve the design during implementation? State the
case conventions, type roles, geometry, status treatments, motion limits and
component sources that a check can enforce.

## Voice

What register fits each surface and channel? Which concrete writing rules
preserve it? Give before-and-after examples of unclear and accurate language.

What must the landing headline tell the reader? Keep three candidates and a
written evaluator here. The selected fixed strings belong in the keyed deck
under the [copy rubric](copy-rubric.md), including hidden and outbound copy.
Placeholder sources and copy roles follow the
[deck contract](product-model.md#keyed-copy-deck).

