# Frontend Studio

A reusable agent skill and live React studio for defining or rebuilding a product frontend before implementation.

Frontend Studio supports two paths:

- **New product:** product grill → MVP cut → copy deck → visual grill → build.
- **Existing frontend:** product recovery → MVP cut → live audit → copy rebuild → visual grill → clean rebuild.

The studio renders every visual choice against the product's real content. The walk opens with the product's archetype (workspace, feed, store, course or reader, media library, game companion, editor, conversation or utility), which sets the home surface and sample content; then a reference and a look, followed by frame, surfaces, tokens, components, interaction and landing. Each decision is a step with a few composable options; the user confirms or departs from the defaults, records what no option offers, and exports theme variables, selected patterns, next-round notes and component configuration. Reference presets are decision systems based on structural product patterns, not templates or branded copies.

## Install

The skill is `SKILL.md` plus the files it links. Clone the repository where your agent reads skills, for example:

```sh
git clone https://github.com/twaldin/frontend-studio ~/.claude/skills/frontend-studio
```

Or keep the clone anywhere and tell the agent to read `SKILL.md` before any design spike, redesign, or landing page. Either way, the agent should reach it before it builds a single design alternative.

## Repository layout

- `SKILL.md`: agent workflow and completion contract.
- `references/product-grill.md`: product question tree.
- `references/mvp-scope.md`: Must have / Should have / Later cut.
- `references/copy-rubric.md`: checks for the copy deck and landing copy.
- `references/audit-checklist.md`: evidence-first live frontend review.
- `references/products.md`: researched reference profiles and preset anchors.
- `references/decision-tree.md`: generated visual decision tree.
- `references/patterns/`: 34 independently authored task, surface, state and interaction records, with variants, contracts, dated references and code-license boundaries.
- `references/options.md`: what a step and an option are, and what earns an option its place.
- `references/review.md`: adversarial review before and after rendering.
- `references/rounds.md`: serving the walk, recording it, and locking in between rounds.
- `references/in-app-studio.md`: building the studio into the product for product-specific decisions.
- `studio/`: interactive React gallery, exports, capture and audit tooling.

## Run the studio

Requirements: Bun and a Chromium-based browser. Vite's default Node runner needs Node.js 20.19+ (20.x) or 22.12+. Alternatively, `bun run --bun dev` and `bun run --bun build` use Bun's own runtime.

```sh
cd studio
bun install
bun run dev
```

Open the printed local URL. Each archetype ships sample content in `studio/src/content/archetypes/`; put product-specific content in `studio/public/content.json`, which deep-merges over the chosen archetype's sample. The schema lives at `studio/src/content/schema.ts`.

### Compose surfaces and interactions

The five surface galleries each offer four structural options, on every archetype's content and each of the six looks:

| Surface | Options |
| --- | --- |
| Feed | Timeline, Cards, Compact list, Digest |
| Board | Columns, Swimlanes, Grouped list, Pipeline |
| Conversation | Bubbles, Transcript, Channel, With context |
| Reader | Single column, With outline, Margin notes, Paged |
| Commerce | Grid, List, Shelves, List and detail |

The interaction branch separates **motion language** (Still, Snappy, Anchored, Tactile, Material), **layer arrival**, **control response**, **content swap**, **async feedback**, **route transition** and **theme transition**. Motion specimens show explicit before/during/after frames for static review and a live replay; reduced motion keeps access to the final state immediate. A language re-defaults the interaction axes while explicit choices remain independent.

Use the [pattern index](references/patterns/README.md) to bind selections to a product as **flow → surface → slot**. The generic studio is a fixed catalog: it does not yet generate a tree from a product model, and its specimens are not complete executable product workflows. Bind only the surfaces and capabilities the brief actually needs. Guidance, link-only inspiration and cleared implementation candidates stay separate; no reference site's assets or proprietary source are bundled.

Useful controls:

- Hover an option to preview it.
- Press `1–9` to choose.
- Mark each step **Decided** or **Revisit**, and leave a note when no option says what you want.
- Press `A` or `B` to pin states, then `\` to compare.
- Open **Copy** to edit any string of the content in place.
- Use **Export** after every decision is confirmed.

The dev server saves the walk (choices, notes, status and copy edits) to `studio/.studio/state.json`, so an agent can read it while you walk, and reopening the studio resumes it. A link whose hash carries choices takes precedence over the file.

### Review from another machine

Bind an address the other machine can reach, and allow the hostname it will use:

```sh
STUDIO_HOST=100.64.0.10 STUDIO_ALLOWED_HOSTS=studio-host,studio-host.example.ts.net bun run dev
```

The dev server has no authentication: anyone who can reach the bound address can read and replace the saved walk through `/__studio/state`, and read the studio's source. Bind a private interface such as a tailnet address, never a public or shared network. `STUDIO_ALLOWED_HOSTS` blocks DNS rebinding; it doesn't authenticate clients.

Plain http on any host other than localhost isn't a secure context. The studio works without the APIs that require one; Copy falls back to a selection copy.

Regenerate the textual tree after changing steps or options:

```sh
bun run tree:md
```

## Capture every option

With the studio running, from `studio/`:

```sh
bun run capture                       # every step, light and dark
bun run capture --step accent,radius  # just these steps
```

The script uses Playwright (see the audit section for how it is provisioned) and writes one screenshot per option and theme to `studio/capture/`, plus `report.json` and an `index.html` contact sheet. It flags pairs of options in the same step that render identically (a capture gap or a dead option) or differ in at most 0.1% of pixels (a candidate twinge; change the threshold with `--near`). Interaction filmstrips make transition choices legible even in reduced-motion stills; also review live replay to judge timing. Options that only differ in the other theme can flag in one theme; [review.md](references/review.md) explains the review contract.

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

1. Research the live public site and public product UI or docs. A genre preset (a look common to a kind of product, such as the newspaper or the game companion) cites the products it was drawn from instead.
2. Record the reusable structural choices in `references/products.md`.
3. Add the reference option and complete preset in `studio/src/tree/steps.ts`, including the archetype it fits and its look. The look's tokens (heading voice, texture, button edge) apply to the preset, so pick the look whose tokens match the product, usually `quiet`.
4. If the product exposes a genuinely missing visual decision, add the smallest reusable option and render it in the gallery.
5. Run `bun run tree:md`, then `bun run capture --step <the steps you touched>` and check the new option isn't flagged.
6. Inspect the preset at desktop and phone widths. Do not add branded assets or copy page structure.

## Run the smoke suite

With the dev server running, from `studio/`:

```sh
bun run smoke --url http://127.0.0.1:5199/
```

The suite checks the saved walk, keyboard selection, copy editing, reset, reference order, defaults and exports, plus all surface options across archetypes and looks and every interaction option. It uses at most two browser pages and restores the saved walk after the run. Capture is a separate visual gate.

## Add an archetype

1. Add it to `Archetype` in `studio/src/tree/types.ts`, as an option of the archetype step, and its starting reference in `ARCHETYPE_REFERENCE` (`studio/src/tree/steps.ts`).
2. Write its sample content in `studio/src/content/archetypes/<id>.ts` and register it in `studio/src/content/default.ts`.
3. Write its home surface in `studio/src/gallery/app/homes/<Name>.tsx`: the main object first, built from the shared kit (`kit.tsx`, `sections.tsx`) so every step still changes it. Register it and its nav icons in `homes/index.ts`.
4. Run `bun run tree:md` and `bun run capture --step archetype`, and check the new home isn't flagged.

## Outputs

The Export view, or `bun run export` for the saved walk, produces:

- `design-decisions.md`: confirmed choices, deviations and selected pattern records;
- `studio-notes.md`: notes, the steps to revisit, and the steps still open;
- `theme.css`: shadcn-compatible light/dark tokens, motion durations and curves, and interaction CSS;
- `interaction.js`: a dependency-free DOM helper for content, route and theme transitions; the product supplies the actual state update and focus/scroll lifecycle;
- `components.json`: shadcn configuration;
- `content.json`: the content with the studio's copy edits.

`bun run export -- <stepId>=<optionId> ...` exports given choices without a walk.

These outputs define one coherent base. Do not keep a second token system or generate page-specific variants around it.

## License

MIT. See [LICENSE](LICENSE).
