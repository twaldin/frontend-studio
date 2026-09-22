# Frontend Studio

A reusable agent skill and live React studio for defining or rebuilding a product frontend before implementation.

Frontend Studio supports two paths:

- **New product:** product grill → MVP cut → copy deck → visual grill → build.
- **Existing frontend:** product recovery → MVP cut → live audit → copy rebuild → visual grill → clean rebuild.

The studio renders every visual choice against the product's real content. It exports shadcn-compatible theme variables, a concise decision record, and component configuration. Reference presets are decision systems based on structural product patterns, not templates or branded copies.

## Repository layout

- `SKILL.md` — agent workflow and completion contract.
- `references/product-grill.md` — product question tree.
- `references/mvp-scope.md` — Must have / Should have / Later cut.
- `references/audit-checklist.md` — evidence-first live frontend review.
- `references/products.md` — researched reference profiles and preset anchors.
- `references/decision-tree.md` — generated visual decision tree.
- `studio/` — interactive React gallery, exports, and audit tooling.

## Run the studio

Requirements: Bun and a Chromium-based browser.

```sh
cd studio
bun install
bun run dev
```

Open the printed local URL. Put product-specific content in `studio/public/content.json`; its schema lives at `studio/src/content/schema.ts`.

Useful controls:

- Hover an option to preview it.
- Press `1–9` to choose.
- Press `A` or `B` to pin states, then `\` to compare.
- Use **Export** after every decision is confirmed.

Regenerate the textual tree after changing steps or options:

```sh
bun run tree:md
```

## Audit an existing frontend

Run the product locally, then from `studio/`:

```sh
bun run audit --out /absolute/path/to/product/docs/audit \
  http://127.0.0.1:5173/ \
  http://127.0.0.1:5173/representative-route
```

The auditor uses Playwright. If Playwright is not installed in the studio, the command provisions a pinned copy through `bun x`; it prefers the system Chrome channel and falls back to Playwright Chromium. It writes:

- desktop and phone screenshots for every route;
- `tokens.json` with computed font, color, radius, spacing, control, and row-height frequencies;
- `audit.md` with route evidence and the required Generic / Inconsistent / Off-brand / Preserve review sections.

Use `references/audit-checklist.md` to turn the evidence into a product-specific verdict before opening the visual grill.

## Add or change a reference preset

1. Research the live public site and public product UI or docs.
2. Record the reusable structural choices in `references/products.md`.
3. Add the reference option and complete preset in `studio/src/tree/steps.ts`.
4. If the product exposes a genuinely missing visual decision, add the smallest reusable option and render it in the gallery.
5. Run `bun run tree:md`.
6. Inspect the preset at desktop and phone widths. Do not add branded assets or copy page structure.

## Outputs

The Export view produces:

- `design-decisions.md` — confirmed choices and deviations;
- `theme.css` — shadcn-compatible tokens for light/dark themes;
- `components.json` — shadcn configuration.

These outputs define one coherent base. Do not keep a second token system or generate page-specific variants around it.

## License

MIT. See [LICENSE](LICENSE).