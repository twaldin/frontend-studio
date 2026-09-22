# MVP scope

The MVP is the smallest coherent product loop a real target user can complete and trust. It is not the smallest number of screens and not a visual prototype with dead controls.

Apply this after the product grill and before copy or visual decisions. Existing products use the same cut: code already present does not make a capability essential.

## 1. State the loop

Write one sentence:

> A [target user] can [trigger], understand [critical information], take [primary action], and verify [outcome].

If the sentence needs “and” more than twice, it probably contains multiple loops. Pick the one that proves the product's central promise.

## 2. Classify capabilities

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

## 3. Use the dependency test

For every proposed surface ask:

1. Which exact step in the primary loop requires it?
2. What user decision becomes impossible without it?
3. Can the same decision live on an existing surface without creating confusion?
4. Is the underlying behavior real in this build?
5. What is the failure or empty state?

If answers 1–2 are vague, classify it Should have or Later. If answer 4 is no, remove the control and its claim.

## 4. Build the surface map

For each Must-have surface record:

- route or entry point;
- one user question it answers;
- entities shown and actions allowed;
- upstream data/permission dependency;
- visible states;
- phone composition;
- success evidence and recovery path.

Combine surfaces only when the same user question, hierarchy, and action remain clear. Split when modes create hidden state or competing primary actions.

## 5. Landing scope

The MVP landing page needs a truthful promise, target-user context, visible product evidence, credible proof available now, and one real CTA. Do not claim future integrations, automation, scale, or community activity. A waitlist is acceptable only when the product is genuinely unavailable and the copy says so.

## 6. Exit gate

The MVP cut is ready when:

- one coherent loop is written in one sentence;
- every capability is Must have, Should have, or Later;
- every Must-have surface has its question and state list;
- every visible control invokes real behavior;
- the landing claims only what the Must-have product demonstrates;
- a target user can complete the loop at desktop and phone widths, including recovery from one realistic failure.

Do not add “nice to have” placeholder UI. It increases copy, design, implementation, and audit surface while making the product less believable.