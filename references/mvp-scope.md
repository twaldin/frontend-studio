# MVP scope

The MVP is the smallest coherent product loop a real target user can complete and trust. It is not the smallest number of screens and not a visual prototype with dead controls.

Apply this after the [product grill](product-grill.md) and before copy or visual decisions. Write the cut into the [product model](product-model.md), not only the brief. Existing products use the same cut: code already present does not make a capability essential.

## 1. State the loop

Write one sentence:

> A [target user] can [trigger], understand [critical information], take [primary action], and verify [outcome].

If the sentence needs “and” more than twice, it probably contains multiple loops. Pick the one that proves the product's central promise.

## 2. Classify flows and capabilities

Record every model flow's `priority` as `must`, `should` or `later`. Explain the capability cut in the brief; capabilities themselves record whether they are real, not a priority field. Each flow names its user goal, stages, observable `ends` and required capability IDs in `needs`. Flow priority is separate from a binding's `open`, `proposed` or `fixed` decision status.

### Must have

A capability is Must have only when removing it breaks one of these:

- the primary loop cannot start, progress, or finish;
- the user cannot understand or verify the outcome;
- the product would be unsafe, deceptive, inaccessible, or unable to recover from a common failure;
- a real dependency such as authentication or permissions makes the loop impossible.

Must-have UI includes the states needed for truth: loading, empty, populated, partial, validation, failure, permission, and destructive confirmation where applicable.

### Should have

Useful immediately, but the primary loop remains coherent and trustworthy without it. It improves speed, comprehension, or retention for a repeat user. Build after the Must-have loop works end to end.

### Later

A second persona, second workflow, optimization, configuration surface, social layer, admin convenience, speculative integration, or polish whose absence does not break the promise. Record it in the brief but do not let it distort the first information architecture.

Keep Should-have and Later flows explicit rather than silently promoting their surfaces. The checker reports surfaces reached only by those flows as outside this round's design scope. A surface shared with a Must-have flow still belongs to the Must-have cut. The model tooling checks these priorities; the current generic studio catalog does not filter or generate its walk from them.

## 3. Use the dependency test

For every proposed surface ask:

1. Which exact step in the primary loop requires it?
2. What user decision becomes impossible without it?
3. Can the same decision live on an existing surface without creating confusion?
4. Is the underlying behavior real in this build?
5. What is the failure or empty state?

If answers 1–2 are vague, classify its flow Should have or Later. If answer 4 is no, remove the executable control and its claim from the built UI. Record the imagined capability as `real: false` in the model and connect dependent flows/events to it, so the checker can report the gap. A recorded future capability is not permission to fake its behavior.

## 4. Build the surface map

For each Must-have surface record in `surfaces`:

- ID, route or entry point, channel (`screen`, `email` or `push`) and one user question;
- users, phone/desktop viewports, entities shown and actions allowed;
- flow stages reaching it, with real capability and permission dependencies;
- its applicable state IDs, default first, each with a rendering rule;
- setups for menus, dialogs, validation and other interaction states, with triggering event IDs;
- operation pending, success and failure behavior, and real cancellation/retry/undo;
- flow/surface/slot bindings, required placements, candidate variants and reasons for fixed choices;
- contract-field mappings, realistic counts, long cases and fixture scenarios for every state;
- keyed copy references for all fixed strings, including accessible names, page titles, alt text and outbound channel copy;
- success evidence and recovery path.

Combine surfaces only when the same user question, hierarchy, and action remain clear. Split when modes create hidden state or competing primary actions.

## 5. Landing scope

The MVP landing page needs a truthful promise, target-user context, visible product evidence, credible proof available now, and one real CTA. Do not claim future integrations, automation, scale, or community activity. A waitlist is acceptable only when the product is genuinely unavailable and the copy says so.

## 6. Exit gate

The definition is ready for visual decisions when:

- one coherent loop is written in one sentence;
- every capability has a documented cut and real/imagined status;
- every flow has a goal, stages, observable end, capability needs and `must` / `should` / `later` priority;
- every Must-have surface has its question, applicable states, setups, required bindings and realistic fixture coverage;
- every fixed string is in the keyed deck with valid surface/slot references;
- every proposed executable control invokes real behavior, and landing claims match the Must-have scope;
- `model:check` has no errors and its warnings have been resolved or explicitly accounted for.

The built product is complete only when a target user can finish that loop at its declared desktop and phone widths, including recovery from one realistic failure. A passing model check establishes a coherent definition; it does not verify an implementation.

Do not add “nice to have” placeholder UI. It increases copy, design, implementation, and audit surface while making the product less believable.