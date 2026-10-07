# Live frontend audit checklist

Run this after the product grill and MVP cut, before the visual grill. Audit rendered routes, not source screenshots or component names. Use `studio/scripts/audit.ts` for computed-style frequencies and desktop/phone captures, then inspect the actual interaction paths in a browser.

Every finding must cite a route plus a screenshot path or measurement. Separate evidence from interpretation.

## 1. Choose representative routes

Cover the landing page separately from the app. For the app include:

- the primary workflow in populated and empty states;
- the densest data route;
- a create/edit form with validation;
- a detail route with secondary navigation;
- a loading, error, or permission boundary;
- one route likely to change shape on a phone.

Do not audit every route when several share the same shell and component grammar. Do add a route when it introduces a distinct layout or interaction.

## 2. Capture the evidence

From `studio/`:

```sh
bun run audit --out /absolute/path/to/product/docs/audit \
  http://127.0.0.1:5173/ \
  http://127.0.0.1:5173/primary-route
```

The output includes desktop and phone screenshots, `tokens.json`, and an evidence-first `audit.md`. Verify screenshots after capture: route loaded, authenticated state is correct, fonts settled, and no consent dialog hides the surface.

## 3. Product and information architecture

- Can the target user identify the product, current location, primary object, and next action without explanation?
- Does each route answer the one question named in the brief?
- Are entities named with user vocabulary, consistently singular/plural, and clearly related?
- Is navigation grouped by workflow rather than implementation or database shape?
- Are primary actions stable in placement and distinct from filters, tabs, and links?
- Does the hierarchy survive real content lengths and representative counts?

Record what to preserve before proposing a redesign.

## 4. Typography

Use the frequency report and screenshots to inspect:

- font families and fallback failures;
- body, chrome, table, label, and display sizes;
- weight as hierarchy rather than decoration;
- line-height, measure, tracking, tabular numerals, and mono usage;
- heading levels that look and read in order;
- truncation, wrapping, and long-label behavior.

Flag unexplained near-duplicates such as 13/13.5/14px body text or several weights serving the same role. Do not flag a purposeful display scale as inconsistency.

## 5. Color and contrast

- Count canvas, surface, border, text, accent, and status values.
- Confirm one accent vocabulary and separate semantic status colors.
- Identify neutral temperature and whether it matches the product posture.
- Check text and interactive contrast in light/dark modes and over imagery.
- Distinguish selectable, selected, focused, disabled, warning, success, and destructive states without relying on color alone.
- Find one-off hex/RGB values and alpha overlays that duplicate an existing role.

A palette is generic when it is merely the framework default and communicates nothing useful about the product. “Blue is generic” is not evidence; identical shadcn defaults across unrelated roles can be.

## 6. Shape, depth, and surfaces

- Compare control, card, menu, dialog, and media radii.
- Check whether border, fill, and shadow each have a clear job.
- Identify nested-card stacks that add boxes without hierarchy.
- Compare card padding and header/footer treatment across equivalent content.
- Verify elevation works in both themes and does not erase focus or borders. Canvas, panel, raised surfaces and overlays rank in the same order in light and dark.
- Check nested corners are concentric: an outer radius equals the inner radius plus the gap between them.

Flag random radius or shadow values. Preserve deliberate changes for device frames, pills, or full-bleed media.

## 7. Density and spacing

Measure control height, row height, shell chrome, page gutters, section gaps, card padding, and repeated inline gaps.

- Is density appropriate for task frequency and information volume?
- Do related items sit closer than unrelated groups?
- Are compact and comfortable modes intentional rather than route drift?
- Are tables, lists, forms, and dashboards aligned to a shared spacing unit?
- Does the phone layout recompose, not merely shrink?

## 8. Shell and navigation

- Sidebar/top bar choice and relative visual weight;
- active, hover, focus, collapsed, overflow, and mobile states;
- page title, breadcrumbs, tabs, filters, search, and primary action order;
- stable content width and gutters between routes;
- whether the shell competes with the work;
- fixed top bars and tab bars clear the device safe area and the browser's own bars.

## 9. Data display and states

- Tables: column purpose, row affordance, alignment, numeric formatting, responsive fallback, empty/loading/error states.
- Stats: comparison context, units, trends, and whether cards add hierarchy or clutter.
- Charts: question answered, axes/legend/tooltip, palette, zero/unknown handling, and reduced-motion behavior.
- Forms: label/help/error relationship, keyboard order, validation timing, destructive confirmation, and preserved input after failure.
- Overlays: trigger, focus return, escape/outside behavior, and nested scroll.

## 10. Landing page — audit separately

- Does the hero state what the product does, for whom, and the credible next action?
- Is the product visible, or replaced by generic gradients and decorative cards?
- Do proof, claims, product shots, and CTA form a coherent argument?
- Is motion tied to product behavior and reduced-motion safe?
- Does the visual register connect to the app without forcing identical composition?
- At phone width, are headline scale, media crop, navigation, and CTA still intentional?

## 11. Accessibility and interaction

Keyboard-walk the primary workflow. Inspect focus visibility, landmark structure, heading order, names/labels, error announcements, touch targets, hover-only disclosure, motion preferences, zoom, and contrast. Check that every interactive indicator has hover, press and focus states, that status and validation messages appear without shifting layout, and that loading states don't flash on fast responses. Accessibility defects are product defects, not style deviations.

## 12. Write the audit

Use four outcome sections:

1. **Generic** — default choices that fail to express the product or its workflow.
2. **Inconsistent** — equivalent roles rendered or behaving differently without a reason.
3. **Off-brand** — choices that conflict with the brief's promise, audience, vocabulary, or posture.
4. **Preserve** — information architecture, interaction, copy, hierarchy, density, or responsive behavior already earning its place.

For each finding write: observed evidence → user consequence → rebuild rule. Do not prescribe a component before naming the consequence. End with a short list of constraints to carry into the visual grill.