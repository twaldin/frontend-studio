---
name: frontend-studio
description: Define or rebuild a product's frontend through a product grill, MVP cut, copy deck and a visual decision studio. Use before building or restyling product UI or a landing page, when asked for design directions, spikes, themes, mockups or a redesign, and when an existing frontend feels generic, inconsistent or off-brand.
---

# Frontend Studio

Frontend Studio has two entry paths and one finish line: a product-specific interface whose copy, tokens, components, states and responsive behavior agree.

**Options, not variants.** A design round produces steps, never whole alternative sites, themes or "directions". Each step is one decision with 3–5 composable options rendered on the product's own content, and the user confirms or departs from a recommended reference preset one step at a time. Five sites that share a layout and differ in tokens, or five concepts that each bundle a palette, a typeface and a layout, give the user nothing to pull apart. [options.md](references/options.md) has the rules, and the defaults agents fall back on.

## Choose the entry path

### New product or idea

1. **Product grill.** Run [`grilling`](../grilling/SKILL.md) over [product-grill.md](references/product-grill.md). Write positive, current-tense answers into `docs/brief.md` using [brief-template.md](references/brief-template.md).
2. **MVP cut.** Apply [mvp-scope.md](references/mvp-scope.md). Mark every capability Must have, Should have or Later. The first build contains only the smallest coherent Must-have workflow, but every visible state of that workflow is real.
3. **Copy deck.** Write `docs/copy.md`: every visible string for each Must-have surface, including nav, labels, buttons, states, errors, dialogs, empty states and onboarding, plus three landing headline candidates with a written evaluator. Check it against [copy-rubric.md](references/copy-rubric.md). A surface builder never invents copy.
4. **Visual grill.** Run the shared studio workflow below.
5. **Build and verify.** Follow the implementation contract below.

### Existing frontend to audit and rebuild

1. **Recover the product model.** Read the product, routes, fixtures or API shapes, and current copy. Reuse a current brief if one exists; otherwise run the product grill and write one. Don't infer the product from styling alone.
2. **Cut the MVP.** Apply [mvp-scope.md](references/mvp-scope.md) before preserving or deleting surfaces. Existing code is not evidence that a capability belongs in the first coherent product.
3. **Audit the live frontend.** After the product grill and before visual decisions, follow [audit-checklist.md](references/audit-checklist.md). From `studio/`, run:

   ```sh
   bun run audit --out /absolute/path/to/product/docs/audit \
     http://127.0.0.1:5173/ \
     http://127.0.0.1:5173/representative-route
   ```

   The command captures desktop and phone screenshots and writes computed-style frequency data. Review the actual surfaces, then write `docs/audit.md` with four explicit sections: **Generic**, **Inconsistent**, **Off-brand** and **Preserve**. Every claim cites a route plus a screenshot or measurement. Audit the landing page separately from the app shell.
4. **Rebuild copy.** Keep accurate product language, rewrite unclear or generic UI language against [copy-rubric.md](references/copy-rubric.md), and produce the same complete `docs/copy.md` the new-product path requires.
5. **Visual grill against the existing product.** Put the real copy and representative data into the studio, preferably the in-app studio on the real routes. Choose a reference preset from [products.md](references/products.md), confirm or depart through the full tree, and use the audit as a constraint: preserve proven information architecture and interactions; replace the generic, inconsistent and off-brand base.
6. **Clean cutover.** Rebuild every Must-have surface from the exported tokens and components. Remove superseded styles, components, aliases and dead variants instead of layering a second design system over the first.

## Shared visual grill

1. **Pick the studio.** The generic studio in `studio/` covers the style axes (type, color, shape, density, shell, landing) on specimens fed by `content.json`. When the product has its own frontend, or the tree needs product axes such as how its core surface is composed, build the studio into the product: [in-app-studio.md](references/in-app-studio.md).
2. **Write the tree.** Start from [decision-tree.md](references/decision-tree.md) and the closest preset in [products.md](references/products.md); the preset is a starting hypothesis, not permission to imitate the product's branded assets or pages. Add the product axes the brief's surfaces raise, following [options.md](references/options.md).
3. **Review the tree.** Reviewers from more than one model family check it before anything is built: [review.md](references/review.md), "Before rendering".
4. **Load the content and start the studio.** Write `docs/studio.content.json` from the copy deck in the shape of `studio/src/content/schema.ts`, and copy it to `studio/public/content.json`. In `studio/`, install once with `bun install`, then start `bun run dev` under the harness process manager. An in-app studio runs on the product's own dev server and fixtures instead ([in-app-studio.md](references/in-app-studio.md)).
5. **Capture and review the renders.** Build the options, then capture every one: `bun run capture` in the generic studio flags options that render alike; an in-app studio uses its own capture, at phone and desktop widths with clips for motion ([in-app-studio.md](references/in-app-studio.md)). Reviewers read the captures before the user sees them ([review.md](references/review.md), "After rendering").
6. **Serve and walk.** Ask where the user will look at the studio, and serve it there as [rounds.md](references/rounds.md) describes. Walk [decision-tree.md](references/decision-tree.md) in order: ask the exact question, recommend an option with a product reason, and show every option live. For each step the user picks an option, marks it Decided or Revisit, and writes a note whenever the options fall short; the walk saves to `studio/.studio/state.json`, so read it there. Hovering previews an option; `1–9` selects; `A`/`B` pin and `\` compares; the Copy panel edits any string in place.
7. **Export and lock in.** `bun run export` (or the Export panel) writes `design-decisions.md`, `studio-notes.md`, `theme.css`, `components.json` and `content.json`. Save `design-decisions.md` into the brief's Design section, `theme.css` to the product token file, the `components.json` snippet to the product root, and the edited copy back into `docs/copy.md` and `docs/studio.content.json`. Then lock in as [rounds.md](references/rounds.md) describes: every note becomes an acceptance criterion, a brief rule, a product-grill question or a revisit step; decided steps leave the tree; revisit steps start the next round.
8. **Landing round.** Walk Base and App first. Once the app is locked, the landing gets its own round, starting from the locked shell.

A note that questions product behavior (how many destinations, how onboarding ends, where content scrolls) goes back to the product grill; it doesn't become another option.

Without a browser, run the same tree as text and record notes and revisit steps in the conversation. The export still comes from the confirmed choices.

The visual grill is done when no step is Open or Revisit, every note is resolved, every artifact is saved, and the brief's Design section reads as one concise paragraph of decisions.

## Implementation contract

- Scaffold new React products with shadcn on Base UI (`npx shadcn init -b base`). Existing products adopt the exported shadcn variable vocabulary without keeping an overlapping token layer.
- Replace generated theme CSS with the exported `theme.css`. Self-host the chosen fonts from `studio/public/fonts/`.
- Build one coherent component grammar before pages: typography, controls, navigation, page header, data display, feedback, overlay and responsive shell. Use the studio specimens as the reference implementation.
- Give each surface builder only the brief, copy deck, exported decisions and tokens, the notes' acceptance criteria, and its surface data contract. Build the landing after the app so product screenshots and claims are truthful.
- Implement every named state: loading, empty, populated, partial, permission-denied, validation and failure where applicable. Never use a mock control that implies absent behavior.
- Hold to these craft rules: nested corners are concentric (the outer radius equals the inner radius plus the gap between them); fixed bars clear the device safe area and the browser's own bars; status and validation messages appear without shifting layout; loading states wait about 150 ms before showing, so fast responses don't flash; layers rank the same way in light and dark; every interactive indicator has hover, press and focus states.
- Review the actual browser surface at desktop and phone widths against the studio. Token mismatches, duplicate styling vocabulary, invented copy and unhandled states are bugs.
- For rebuilds, compare before/after screenshots and the audit measurements. A calmer screenshot isn't enough: the preserved workflow must stay usable and the cited generic, inconsistent and off-brand findings must be resolved.

Done means every Must-have surface answers the question named in the brief, renders its state list, behaves responsively and uses one exported visual system. The landing matches the confirmed hero, motion, rhythm and proof choices.
