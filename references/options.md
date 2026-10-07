# Steps and options

A step is one design decision; an option is one answer to it. Read this before writing or extending a tree, and give it to every reviewer.

## An option is one composable decision

- Each option changes one thing. Any option of one step composes with any option of every other step; where a pair can't be drawn together, write the rule that resolves it on both steps.
- A whole site, a theme or a "direction" is several decisions fused. Five sites that share a layout and differ in tokens show one decision five times; five concepts that each bundle a palette, a typeface and a layout give the user nothing to pull apart. Split them into steps.
- The options of a step differ visibly at the default viewport, in both themes, on the product's own content. An option the user has to squint at is a twinge: make it visibly different or cut it.
- Three to five options per step. Recommend one, with a product reason and the reference product that uses it.

## Product axes and style axes

- **Style axes** are the generic tree in `studio/src/tree/steps.ts`: the product's archetype, reference and look, then type, color, shape, depth, density, shell, motion and the landing. Every product walks them, on the home surface and sample content of its archetype.
- **Product axes** come from the brief's surfaces: how the core object is composed, where secondary actions and generated or added content appear, how results and progress read, onboarding, first-run and empty states. Write them as steps under the same rules. They need the product's real surfaces, so they live in an in-app studio ([in-app-studio.md](in-app-studio.md)).
- Order the tree from the product's shape and register, through the frame (navigation, shell), to the fine grain (geometry, motion), so early answers constrain later ones. The generic tree runs product, frame, tokens, components, landing.

## Show what each option changes

- Every option has a setup state that exercises it: a selection for a selection color, a link in view for a link style, an open menu for a menu style, the pending-to-done transition for an arrival animation, populated and empty states for a list. Without one, the options render identically and the user picks blind.
- Show interaction states: hover, press, focus, open and closed, and the transition between them.
- Render with realistic and grown content: long labels, real counts, and the navigation as it will be in a year. A layout chosen with four destinations has to hold seven.
- Show both themes, and check layer order in each: canvas, panel, raised surfaces and overlays rank the same way in light and dark.
- Motion options play live with a replay control and a reduced-motion toggle. A still can't show them.

## What earns an option its place

Structure is felt through type, spacing and alignment before boxes; color carries meaning; motion demonstrates the product; copy states facts about the product.

Agents fall back on a few looks when nothing steers them. An option may use one when the product's register calls for it (serif and rules for a publication, mono for a terminal tool); reviewers cut it when it stands in for a decision:

- the editorial or newspaper look: serif display, ruled columns, paper tones;
- every block of content in its own colored or tinted card;
- small mono or all-caps eyebrows over headings;
- a modal or popover input with pre-filled example prompts as the main way in;
- gradient blobs, glows or grid wallpaper behind every surface;
- a single gimmick standing in for a decision (a terminal theme, a CRT theme);
- copy that explains the design ("clean, minimal, distraction-free").

The opposite default is just as strong: calm developer-tool SaaS (a cool-gray sidebar, an Inter-class sans, one indigo or blue accent, hairlines). Most of the product presets lean that way, so check that a product outside that category isn't drifting there because it's the preset, not because it fits. The archetype and look steps are where a product picks its shape and register on purpose: start from the archetype's reference, and pick a look other than quiet when the product's audience calls for it.
