---
name: frontend-studio
description: Define or rebuild a product's frontend through a product grill, checked product model, MVP cut, keyed copy deck and a visual decision studio. Use before building or restyling product UI or a landing page, when asked for design directions, spikes, themes, mockups or a redesign, and when an existing frontend feels generic, inconsistent or off-brand.
---

# Frontend Studio

Frontend Studio has two entry paths and one finish line: a product-specific interface whose copy, tokens, components, states and responsive behavior agree.

Read [product-model.md](references/product-model.md) before writing or changing `docs/product.json`, the keyed `docs/copy.md` deck or `docs/product.fixtures.json`. Its [current boundary](references/product-model.md#current-boundary) distinguishes model tooling from the studio runtime. Use the studio workflow below.

**Options, not variants.** A design round produces steps, never whole alternative sites, themes or "directions". Each step is one decision with 3–5 composable options rendered on the product's own content, and the user confirms or departs from a recommended reference preset one step at a time. Five sites that share a layout and differ in tokens, or five concepts that each bundle a palette, a typeface and a layout, give the user nothing to pull apart. [options.md](references/options.md) has the rules, and the defaults agents fall back on.

## Choose the entry path

### New product or idea

1. **Product grill.** Run [`grilling`](../grilling/SKILL.md) over [product-grill.md](references/product-grill.md). Write positive, current-tense voice and context into `docs/brief.md` using [brief-template.md](references/brief-template.md), and the structured answers into `docs/product.json`. The grill's field map covers users, entities, real capabilities, navigation, flows, surfaces, states, setups and events.
2. **MVP cut and bindings.** Apply [mvp-scope.md](references/mvp-scope.md). Assign every flow `must`, `should` or `later`, with the capability cut recorded in the brief. Bind the Must-have flows, surfaces and slots to pattern records with `open`, `proposed` or `fixed` status; a fixed choice has a product reason in `because`. Nonfixed bindings need at least two fitting candidates, and `sameAs` followers match their leader's complete decision. The first build contains the smallest coherent Must-have workflow, including its real recovery states.
3. **Copy and fixtures.** Write the keyed `docs/copy.md` deck and `docs/product.fixtures.json` as [product-model.md](references/product-model.md) specifies. Give every fixed string a key, its actual state/setup targets and an explicit role where it is not visible text. Resolve placeholders from the referencing placement's data, and cover optional fields with null fixtures. Check the deck against [copy-rubric.md](references/copy-rubric.md). Keep landing headline candidates and their evaluator in the brief; the deck holds the selected copy. From this repository's `studio/`, run `bun run model:check /absolute/path/to/product/docs/product.json` before the visual grill. A surface builder uses the checked copy rather than inventing strings.
4. **Visual grill.** Run the shared studio workflow below.
5. **Build and verify.** Follow the implementation contract below.

### Existing frontend to audit and rebuild

1. **Recover the product model.** Read the product, routes, fixtures or API shapes, and current copy. Reuse a current brief and model if they exist; otherwise run the product grill and write both. Reconcile `docs/product.json` with real capabilities, product-wide shared states and each surface's applicable states, operations and non-screen channels, plus its keyed deck and contract/scenario fixtures. Styling alone does not establish product behavior.
2. **Cut the MVP.** Apply [mvp-scope.md](references/mvp-scope.md) and assign `flows[].priority` before preserving or deleting surfaces. Existing code is not evidence that a capability belongs in the first coherent product.
3. **Audit the live frontend.** After the product grill and before visual decisions, follow [audit-checklist.md](references/audit-checklist.md). From `studio/`, run:

   ```sh
   bun run audit --out /absolute/path/to/product/docs/audit \
     http://127.0.0.1:5173/ \
     http://127.0.0.1:5173/representative-route
   ```

   The command captures desktop and phone screenshots and writes computed-style frequency data. Review the actual surfaces, then write `docs/audit.md` with four explicit sections: **Generic**, **Inconsistent**, **Off-brand** and **Preserve**. Every claim cites a route plus a screenshot or measurement. Audit the landing page separately from the app shell.
4. **Rebuild copy and fixtures.** Keep accurate product language, rewrite unclear or generic UI language against [copy-rubric.md](references/copy-rubric.md), and produce the same keyed deck, `CopyRefs` and realistic fixture coverage the new-product path requires. Check `docs/product.json` and its files with `model:check` before visual decisions.
5. **Visual grill against the existing product.** Put the real copy and representative data into the studio, preferably the in-app studio on the real routes. Choose a reference preset from [products.md](references/products.md), confirm or depart through the full tree, and use the audit as a constraint: preserve proven information architecture and interactions; replace the generic, inconsistent and off-brand base.
6. **Clean cutover.** Rebuild every Must-have surface from the exported tokens and components. Remove superseded styles, components, aliases and dead variants instead of layering a second design system over the first.

## Shared visual grill

1. **Pick the studio.** The generic studio in `studio/` opens with the product's archetype (workspace, feed, store, course or reader, media library, game companion, editor, conversation or utility), which picks the home surface and sample content every later step renders on. Feed, board, conversation, reader and commerce galleries compare surface compositions on that archetype's content and the chosen look. When the product has its own frontend or needs additional product axes, build the studio into the product: [in-app-studio.md](references/in-app-studio.md).
2. **Use the model's bindings to plan the walk.** Use [patterns/README.md](references/patterns/README.md) and its machine index to bind records as **flow → surface → slot** in `docs/product.json`; read each selected record's variants, states, data, accessibility and motion contracts. Fill required placements, narrow candidates with real product facts, and bring fixed claims to the user for confirmation as [product-grill.md](references/product-grill.md) describes. Start the current walk from [decision-tree.md](references/decision-tree.md). Pick a structurally fitting reference from [products.md](references/products.md) and choose the look on purpose. Handle additional product axes in an in-app studio using [options.md](references/options.md), subject to the [current boundary](references/product-model.md#current-boundary).
3. **Review the model and planned tree.** Reviewers from more than one model family check the model, copy, fixtures, bindings and current walk plan before anything is built: [review.md](references/review.md), "Before rendering". A passing checker establishes consistency, not whether the product decisions are good.
4. **Load the content and start the studio.** Write `docs/studio.content.json` from the copy deck in the shape of `studio/src/content/schema.ts`, including the selected surface's entries, stages, thread context, sections or listings, and copy it to `studio/public/content.json`. It deep-merges over the archetype's sample. In `studio/`, install once with `bun install`, then start `bun run dev` with your environment's process manager. An in-app studio runs on the product's own dev server and fixtures instead ([in-app-studio.md](references/in-app-studio.md)).
5. **Capture and review the renders.** Build the options, then capture every one: `bun run capture` in the generic studio flags options that render alike; an in-app studio uses its own capture, at phone and desktop widths with clips for motion ([in-app-studio.md](references/in-app-studio.md)). Reviewers read the captures before the user sees them ([review.md](references/review.md), "After rendering").
6. **Serve and walk.** Ask where the user will look at the studio, and serve it there as [rounds.md](references/rounds.md) describes. Walk [decision-tree.md](references/decision-tree.md) in order: ask the exact question, recommend an option with a product reason, and show every option live. For each step the user picks an option, marks it Decided or Revisit, and writes a note whenever the options fall short; the walk saves to `studio/.studio/state.json`, so read it there. Hovering previews an option; `1–9` selects; `A`/`B` pin and `\` compares; the Copy panel edits any string in place.
7. **Export and lock in.** `bun run export` or the Export panel writes `design-decisions.md`, `studio-notes.md`, `theme.css`, `interaction.js`, `components.json` and `content.json`. Save the decisions into the brief's Design section, CSS and the helper to the product's design module, component configuration to the product root, and edited copy back into `docs/copy.md` and `docs/studio.content.json`. Reconcile the choices with the product's flow/surface/slot bindings and the selected records' contracts. Then lock in as [rounds.md](references/rounds.md) describes. Every note becomes an acceptance criterion, a brief rule, a product-grill question or a revisit step. Decided steps leave the tree, and revisit steps start the next round.
8. **Landing round.** Walk the product, frame, tokens and components first. Once the app is locked, the landing gets its own round, starting from the locked shell.

A note that questions product behavior returns to the product grill. Update the model, brief, copy or fixtures as appropriate, then run `model:check`.

Without a browser, run the same tree as text and record notes and revisit steps in the conversation. The export still comes from the confirmed choices.

The visual grill is done when no step is Open or Revisit, every note is resolved, every artifact is saved, and the brief's Design section reads as one concise paragraph of decisions.

End each round on a page with controls that reach every modeled surface's states, setups and referenced fixed strings. Include all copy roles and screen, email and push channels, even when a surface belongs only to Should-have or Later flows. Must-only scope limits walk choices, not this coverage. Follow the [Every screen coverage contract](references/product-model.md#every-screen-coverage) and the [current boundary](references/product-model.md#current-boundary).

## Implementation contract

- Scaffold new React products with shadcn on Base UI (`npx shadcn init -b base`). Existing products adopt the exported shadcn variable vocabulary without keeping an overlapping token layer.
- Replace generated theme CSS with the exported `theme.css`. Self-host the chosen fonts from `studio/public/fonts/`.
- Build one coherent component grammar before pages: typography, controls, navigation, page header, data display, feedback, overlay and responsive shell. Use the studio specimens as the reference implementation.
- Choose interaction separately from composition: motion language, layer arrival, control response, content swap, async feedback, route transition and theme transition. Bind each to a real semantic event and implement its record's interruptibility and reduced-motion contract; a static filmstrip explains the option, not a required delay in the product.
- Give each surface builder the brief, checked product model, keyed copy deck, fixtures, exported decisions and tokens, the notes' acceptance criteria, and its surface data contract. Build the landing after the app so product screenshots and claims are truthful.
- Implement each surface's declared states and setups, including loading, empty, populated, partial, permission-denied, validation and failure where applicable. Operation events expose real pending, success and failure behavior, with cancellation or retry only when the capability exists. Never use a mock control that implies absent behavior.
- Hold to these craft rules: nested corners are concentric (the outer radius equals the inner radius plus the gap between them); fixed bars clear the device safe area and the browser's own bars; status and validation messages appear without shifting layout; loading states wait about 150 ms before showing, so fast responses don't flash; layers rank the same way in light and dark; every interactive indicator has hover, press and focus states.
- Review the actual browser surface at desktop and phone widths against the studio. Token mismatches, duplicate styling vocabulary, invented copy and unhandled states are bugs.
- For rebuilds, compare before/after screenshots and the audit measurements. A calmer screenshot isn't enough: the preserved workflow must stay usable and the cited generic, inconsistent and off-brand findings must be resolved.

Done means every Must-have surface answers the question named in the brief, renders its state list, behaves responsively and uses one exported visual system. The landing matches the confirmed hero, motion, rhythm and proof choices.
