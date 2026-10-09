---
id: theme-transition
scale: interaction
studio: themeMotion
slots: {"required":[],"optional":["appearance"]}
variants: [{"id":"cut","label":"Cut"},{"id":"fade","label":"Crossfade"},{"id":"circle","label":"Circular reveal"},{"id":"wipe","label":"Wipe"}]
states: ["current","selected","applied","persisted","failed","system"]
copy: ["theme"]
events: ["selectTheme","systemThemeChange","persist","interrupt"]
renderer: variants
---

# Theme transition

`id: theme-transition` · `scale: interaction` · `studio: themeMotion` · `references checked: 2026-10-08`

## Problem and outcome

A person changing theme needs the requested palette to apply reliably without a flash, unreadable intermediate colors or lost focus. Theme transition may acknowledge that choice, but preference persistence and contrast are the actual outcome.

## When to use / When not to use

Use for an explicit palette/theme change when multiple supported themes exist. Do not add a theme toggle to a single-theme product or replay an effect during initial page paint. System preference and forced-colors changes should be direct, predictable state changes, not automatic full-screen choreography. Other content changes use content-swap.

## Structure and slots

Required: `control` has a labeled theme choice; `palette` maps a supported theme to complete tokens; `preference` distinguishes explicit choice from system-following; `state` exposes selected value/persistence outcome; `fallback` Cut. Optional: trigger origin for circular reveal and decorative transition snapshots. Bind account-settings → settings → `appearance` control, then attach this record only to its theme-change event. Changing palette does not change product data or layout decisions.

## Variants

Exactly the four `themeMotion` labels:

- **Cut:** all palette tokens change together in one frame. Robust for system changes, frequent use and Still; gives no signature effect but avoids ambiguous intermediate colors.
- **Crossfade:** old/new palette views fade across one another. Gentle acknowledgment with no travel; mixing text/background colors can harm contrast, so prefer complete inert visual snapshots rather than separately interpolating arbitrary tokens.
- **Circular reveal:** the new theme spreads from the actual toggle origin. Connects effect to action; needs valid origin/viewport geometry and browser capability, and costs attention for a routine preference.
- **Wipe:** new theme sweeps from one edge. Gives a strong graphic signature without a trigger origin; full-screen movement can distract and direction must be deliberate. Never turn it into a timed curtain that blocks interaction.

## States and transitions

Current preference → user selection → new applied palette → persisted or persistence failed, according to the real settings contract. The visible theme changes without waiting for a visual end callback. Rapid selection cancels the obsolete effect and applies the latest requested theme. “System” resolves to the current environment and follows future changes without replaying explicit-toggle animation. Initial render resolves preference before an avoidable opposite-theme flash. Unsupported transition APIs, invalid reveal origin, forced colors, reduced motion or Still use Cut. Persistence failure explains whether the current-session theme remains applied or reverts; do not silently claim it was saved.

## Data and copy contract

Supported theme IDs/labels/token sets, selected preference, effective theme, persistence policy/action and actual system preference when following it. Optional reveal origin is current toggle geometry, not a guessed screen center. Copy keys cover theme labels, follow-system, current choice, saving/saved/failure and real retry. Support no alternate theme, long localized labels and unavailable stored preference. The effect creates no extra completion claim; any media/icons have separately reviewed rights and theme alternatives.

## Accessibility

Use a labeled select/radio/toggle with correct value semantics and keyboard/touch equivalence. Keep focus on the control and do not duplicate it in tab/accessibility order during snapshots. Labels/focus/status remain readable in both complete palettes; theme alone does not guarantee contrast. Intermediate visuals cannot be the only access to content. Forced colors remains usable; reduced-motion preference removes sweeping/circular/full-screen movement. Provide 44px intended targets, visible focus and zoom-safe controls, and announce the selected/persisted state once rather than visual progress.

## Responsive

A reveal covers the actual viewport from the actual trigger, including resized/zoomed layouts; do not reuse stale desktop geometry. Toggle remains reachable on phone navigation/settings. Decorative masks/snapshots cannot introduce page overflow, obstruct content or obscure the virtual keyboard.

## Motion

Use a bounded large-view timing role from motion-language, not a fabricated save duration. Input and preference state remain available while the visual effect runs. Still/reduced-motion, system-driven and forced-colors changes use Cut for all four options; no animated color interpolation, fade, circle or wipe is required. Static selected-state feedback and persistence messages remain identical.

## Looks

Quiet can use Cut/Crossfade; editorial protects typography during replacement; playful may use a bounded Circular reveal; brutalist may use a deliberate Wipe; print remains direct; immersive may frame a signature moment but keeps both palettes legible. No look overrides motion preferences or the supported-theme contract.

## References

- [Carbon motion](https://www.carbondesignsystem.com/building-blocks/foundations/motion/overview) — checked 2026-10-08, public guidance read: purposeful transitions and static alternatives; no crossfade contrast or browser-capability test.
- [GOV.UK button](https://design-system.service.gov.uk/components/button/) — checked 2026-10-08, documentation read: descriptive action labels/contrast concern; not a theme persistence implementation.
- [Great UI](https://great-ui.com/components) and [VantaUI](https://www.vantaui.com/) — checked 2026-10-06 in earlier public-document research: link-only theme/control breadth; no effect code, screenshots or measured source behavior copied.

## Code you can use

[Carbon motion package](https://github.com/carbon-design-system/carbon/tree/main/packages/motion), candidate timing primitives under [Apache-2.0](https://github.com/carbon-design-system/carbon/blob/main/LICENSE), license read 2026-10-08. Preserve license/attribution, applicable NOTICE and modification notices; audit pinned source/dependencies/assets. This is not a cleared complete theme/view-transition integration, and no code is imported by this record. Great UI's custom no-kit redistribution and VantaUI's proprietary plan-limited material remain link-only. Docs-only checks did not exercise theme persistence, contrast or transitions.
