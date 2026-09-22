---
name: frontend-studio
description: Define or rebuild a distinctive frontend through a product brief, MVP cut, live UI audit, copy deck, and a visual decision studio. Use for greenfield products and existing frontends that feel generic, inconsistent, or off-brand.
---

# Frontend Studio

Frontend Studio has two entry paths and one finish line: a product-specific interface whose copy, tokens, components, states, and responsive behavior agree.

Never generate visual variants. At each decision, render 3–5 named options against the product's own content and recommend the closest reference preset. The user confirms or deviates.

## Choose the entry path

### New product or idea

1. **Product grill.** Run [`grilling`](../grilling/SKILL.md) over [product-grill.md](references/product-grill.md). Write positive, current-tense answers into `docs/brief.md` using [brief-template.md](references/brief-template.md).
2. **MVP cut.** Apply [mvp-scope.md](references/mvp-scope.md). Mark every capability Must have, Should have, or Later. The first build contains only the smallest coherent Must-have workflow, but every visible state of that workflow is real.
3. **Copy deck.** Write `docs/copy.md`: every visible string for each Must-have surface, including nav, labels, buttons, states, errors, dialogs, empty states, and three landing headline candidates with a written evaluator. A surface builder must not invent copy.
4. **Visual grill.** Run the shared studio workflow below.
5. **Build and verify.** Follow the implementation contract below.

### Existing frontend to audit and rebuild

1. **Recover the product model.** Read the product, routes, fixtures/API shapes, and current copy. Reuse a current brief if it exists; otherwise run the product grill and write one. Do not infer the product from styling alone.
2. **Cut the MVP.** Apply [mvp-scope.md](references/mvp-scope.md) before preserving or deleting surfaces. Existing code is not evidence that a capability belongs in the first coherent product.
3. **Audit the live frontend.** After the product grill and before visual decisions, follow [audit-checklist.md](references/audit-checklist.md). From `studio/`, run:

   ```sh
   bun run audit --out /absolute/path/to/product/docs/audit \
     http://127.0.0.1:5173/ \
     http://127.0.0.1:5173/representative-route
   ```

   The command captures desktop and phone screenshots and writes computed-style frequency data. Review the actual surfaces, then write `docs/audit.md` with four explicit sections: **Generic**, **Inconsistent**, **Off-brand**, and **Preserve**. Every claim cites a route plus a screenshot or measurement. Audit the landing page separately from the app shell.
4. **Rebuild copy.** Keep accurate product language, rewrite unclear or generic UI language, and produce the same complete `docs/copy.md` required by the new-product path.
5. **Visual grill against the existing product.** Put the real copy and representative data into the studio. Choose a reference preset from [products.md](references/products.md), confirm or deviate through the full tree, and use the audit as a constraint: preserve proven information architecture and interactions; replace the generic, inconsistent, and off-brand base.
6. **Clean cutover.** Rebuild every Must-have surface from the exported tokens and components. Remove superseded styles, components, aliases, and dead variants instead of layering a second design system over the first.

## Shared visual grill

1. Write `docs/studio.content.json` from the copy deck in the shape of `studio/src/content/schema.ts`; copy it to `studio/public/content.json`.
2. In `studio/`, install once with `bun install`, then start `bun run dev` under the harness process manager. Give the user the local URL.
3. Pick the closest researched product in [products.md](references/products.md). The preset is a starting hypothesis, not permission to imitate the product's branded assets or page.
4. Walk [decision-tree.md](references/decision-tree.md) in order. Ask the exact question, recommend the preset choice with a product reason, and show every option in the live gallery. Commit each answer in the URL hash (`#step=…&typeface=…`) so the user's view and yours agree. Hover previews; `1–9` selects; `A`/`B` pins and `\` compares full states.
5. At **Export**, save `design-decisions.md` into the brief's Design section, `theme.css` to the product token file, and the `components.json` snippet to the product root.

Without a browser, run the same tree as text. The export still comes from the confirmed choices.

The visual grill is done only when every step is confirmed, all three artifacts are saved, and the brief's Design section reads as one concise paragraph of decisions.

## Implementation contract

- Scaffold new React products with shadcn on Base UI (`npx shadcn init -b base`). Existing products adopt the exported shadcn variable vocabulary without keeping an overlapping token layer.
- Replace generated theme CSS with the exported `theme.css`. Self-host the chosen fonts from `studio/public/fonts/`.
- Build one coherent component grammar before pages: typography, controls, navigation, page header, data display, feedback, overlay, and responsive shell. Use the studio specimens as the reference implementation.
- Give each surface builder only the brief, copy deck, exported decisions/tokens, and its surface data contract. Build the landing after the app so product screenshots and claims are truthful.
- Implement every named state: loading, empty, populated, partial, permission-denied, validation, and failure where applicable. Never use a mock control that implies absent behavior.
- Review the actual browser surface at desktop and phone widths against the studio. Token mismatch, duplicate styling vocabulary, invented copy, and unhandled states are bugs.
- For rebuilds, compare before/after screenshots and the audit measurements. A calmer screenshot is not enough: the preserved workflow must remain usable and the cited generic/inconsistent/off-brand findings must be resolved.

Done means every Must-have surface answers the question named in the brief, renders its state list, behaves responsively, and uses one exported visual system. The landing must match the confirmed hero, motion, rhythm, and proof choices.
