# Copy rubric

Apply this to the copy deck before the visual grill, to every edit made in the studio's Copy panel, and to the landing. Product terms and one-word labels stay short. Anything with a subject and a verb reads as a sentence.

## Coverage and keyed deck

Use the [product model's deck format](product-model.md#keyed-copy-deck): `Key | Copy | Shown when`. A string is derived only when a data-contract field produces it. User content, agent output, lesson text and a numeric price can be derived; navigation, explanatory language and a price-unit suffix are fixed product copy. Fixed copy surrounding `{placeholders}` still gets a key.

- Inventory every modeled surface and channel, including Should-have and Later flows, not only the default screenshot. Include navigation, headings, labels, buttons, placeholders, tooltips, loading/empty/error states, validation, confirmations, onboarding and landing copy.
- Include document/page titles, accessible names for icon-only controls, non-derived alt text and screen-reader announcements. A string being invisible in a screenshot does not make it derived.
- Include email subjects, preheaders, bodies and actions, and push titles, bodies and actions on their channel surfaces. Keep derived recipient or object values in contract fields.
- Give every chosen string a stable dot-separated key and a surface or slot reference. Use an explicit `as` role for hidden or outbound copy rather than relying on the key's spelling. Shorthand `always` and ID-array references mean visible `text`, including form labels and captions. Use `label` only for a hidden accessible name. Required roles must cover every state and setup under the [deck contract](product-model.md#deck-format-and-copy-roles). Reference navigation keys on the destination surface too.
- State- or setup-specific keys name their actual IDs. Use `always` only for copy present in its declared role in every allowed target. It covers every state/setup of the surface, or every state/setup allowed by a state-restricted slot.
- Match a bound record's required copy families with literal dot-separated key segments: `catalog.priceUnit` satisfies `priceUnit`; `catalog.dailyRate` does not. Add only strings the product really needs, not copy invented to make a family check pass.
- Keep headline candidates, editorial alternatives and their evaluator in the brief, not as orphan deck rows. The deck holds the selected product language.
- Generate `Shown when` from the model: `always` on a surface or unrestricted slot yields the surface ID; in a state-restricted slot it expands to that slot's state labels. Explicit references yield `surface ID · state/setup label`. Targets join with `; ` in model order. After changing labels, states, setups or references, use the guarded `model:check --write-shown-when`; an ordinary check rejects stale labels, and other validation errors prevent a write. See [product-model.md](product-model.md#generated-reach-and-staleness) for generation, escaping and preservation rules.
- Check missing keys and orphan rows with `model:check`. Resolve every placeholder from the referencing placement's declared data. Surface copy sees its slots' contracts, while slot copy sees only its own data. Use typed formatters such as `{editedAt:relative}` or `{fee:currency}` under the [placeholder contract](product-model.md#placeholder-sources-and-formatters).
- Review fixture fields for disguised fixed copy, even when strings vary. Store dates and numbers as data, and key the surrounding product language. Repeated fixture-value warnings are a lead, not an exhaustive detector.
- Review `entities[].never` warnings when rejected vocabulary appears in deck copy. List every banned whole-word form explicitly, including plurals.

Every screen must reach every referenced fixed string across all surfaces, states, setups, roles and channels. Deferred-only warnings do not permit coverage omissions. Must-have scope limits walk choices, not this inventory. See the [coverage contract](product-model.md#every-screen-coverage).

Reconcile content-based Copy panel edits back into the keyed deck and check it again. The [current boundary](product-model.md#current-boundary) explains the file checker and studio runtime.

## Interface strings

| Check | Instead of | Write |
|---|---|---|
| Instructions, body text, empty states and standalone messages are full sentences. Controls, names and state labels can stay short. | Two steps. No card. Done. | Setup takes two steps, and you won't need a card. |
| Name the action and its object. | Quick check | Review one invoice. |
| Say what to do, what happened, or what limits apply. Leave the layout and the method unexplained. | The summary appears under the table and stays there. | Read the summary, then approve the batch. |
| Cut slop constructions: "not X, it's Y", rhetorical triads, dramatic dashes, hype, empty intensifiers. | It's not just a tracker, it's a whole new way to work. | Track every invoice in one list. |
| Keep facts, placeholders, plurals and real constraints. Promise no speed or outcome the product doesn't measure. | Your report will be ready shortly. | We'll show your report when it's ready. |
| A standalone message makes sense away from its control, in sentence case, without praise. | Your choice is saved. | Your email preference is saved. |

## Landing and long-form copy

1. Open with the product or the reader's task.
2. Give every sentence its own job. Cut restated headings, self-praise and vague authority.
3. Let sentence length vary. Avoid fragment chains, "not X, it's Y" and padded triads.
4. Apply the swap test: if a paragraph still works with another product's nouns swapped in, rewrite it with this product's facts.
5. End on a fact or a real next action, not a flourish.

## Headlines

Write three candidates and an evaluator before choosing. The evaluator names what the headline must carry (the category, the user, the core promise), and any candidate that misses one is out.

Further reading: [Humanizer](https://github.com/blader/humanizer) for long-form passes, and the [Anti-Slop guide](https://github.com/camskihub/anti-slop-guide) for short, standalone copy.
