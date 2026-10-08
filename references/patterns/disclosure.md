# Disclosure

`id: disclosure` · `scale: component` · `studio: no studio step` · `references checked: 2026-10-08`

## Problem and outcome

A person scanning the main task needs secondary explanation or controls only when relevant. Disclosure keeps that detail one explicit action away while making the hidden content's purpose and open state understandable.

## When to use / When not to use

Use for optional help, secondary sections or a small contextual control set. Do not hide the information most people need, required fields, prices/consequences or errors that must be corrected. A dedicated tabbed workspace is [content-swap](content-swap.md); a blocking decision is [dialogs-and-layers](dialogs-and-layers.md). Hover alone is not a disclosure trigger.

## Structure and slots

Required: `trigger` has a meaningful label and open state; `content` is associated with it; `policy` declares independent/mutually exclusive expansion and persistence. Optional: section heading, concise summary, explicit close, asynchronous detail state and related controls. Bind reader → `notes`, settings → secondary `help`, or storefront → optional `detail` to this record. Required content remains in the primary region.

## Variants

- **Single details region:** one summary reveals an in-flow block. Simple for optional help and supports native semantics; pushes following content and is easy to overlook when the label is vague.
- **Accordion:** several headed sections reveal related blocks. Supports scanning a large secondary set; hides comparisons and adds action cost. Independent expansion permits comparison; single-open policy saves space but must be explicit.
- **Context popover:** concise detail/controls stay near a trigger without reflowing the page. Preserves location; needs collision handling and focus/dismiss rules. Choose only for small secondary content, not required multi-step work.

## States and transitions

Closed ↔ open by explicit trigger. An open block may load → available, empty, denied or failed; failure stays in context with real recovery. Closing does not erase edited values unless the stated draft policy requires it. A deep link/find/error can open the owning section to make its destination visible. If content is removed while focus is inside, move focus to its trigger before hiding it. Mutual-exclusion changes close only the designated peer block, never an unrelated section. Permission loss hides protected detail with an honest safe explanation.

## Data and copy contract

Disclosure/section IDs, labels, content or data-fetch capability, open policy, persistence and actual actions. Optional summaries must not falsely imply all detail is loaded. Support one block, many sections, long labels, no detail and interactive controls. Copy keys cover summary, expand/collapse where useful, loading, no detail, access/failure and recovery. Use descriptive summary names rather than many identical “More” buttons. Never hide critical contract copy merely to shorten the page.

## Accessibility

Prefer native details/summary for one in-flow block; otherwise use a button with expanded state and a stable controlled region. Accordion headers have correct heading hierarchy. Content is absent from tab/accessibility order while closed. Enter/Space and touch toggle equally; in-flow opening normally keeps focus on trigger, while popover focus follows its declared control/menu model. Escape closes popover and returns to trigger; inline disclosure does not trap focus. No hover-only data, color-only expansion, or motion-only cue. Provide contrast, visible focus, 44px intended targets and zoom-safe reading order.

## Responsive

In-flow blocks stack naturally; long headings wrap. Popovers can become named in-flow detail or a reachable sheet when they cannot fit, preserving information and exit. Wide tables/details get a labeled local overflow or responsive form; never let a hidden panel extend outside the phone viewport.

## Motion

A short height/opacity change can explain in-flow expansion; interactive content must not wait for animation to become usable. Popover arrival uses layer-arrival. Avoid scroll-jumping the reader after every toggle. Still/reduced-motion opens/closes immediately with the same expanded state, focus return and data/error explanation.

## Looks

Quiet uses a compact summary; editorial emphasizes section names; playful can style disclosure markers; brutalist uses explicit plus/minus and rules; print expands essential print content with a clear summary; immersive keeps labels/detail on legible surfaces. All retain the same visibility policy.

## References

- [GOV.UK details](https://design-system.service.gov.uk/components/details/) — checked 2026-10-08, guidance read: optional-not-majority-needed content and descriptive labels. Its voice-assist concern is documentation evidence, not a test performed here.
- [Carbon disclosures](https://www.carbondesignsystem.com/building-blocks/core/patterns/disclosures) — checked 2026-10-08, guidance read: concise user-triggered interactive popovers; its popover rules are not blindly applied to independent in-flow accordion sections.
- [PaceUI](https://paceui.com/) — checked 2026-10-06 in earlier public-document research: link-only interaction breadth, no code or exercised keyboard behavior copied.

## Code you can use

[GOV.UK Frontend](https://github.com/alphagov/govuk-frontend) details/accordion are candidates under [MIT](https://github.com/alphagov/govuk-frontend/blob/main/LICENSE.txt), license read 2026-10-08. Keep Crown Copyright and permission notice in copies/substantial portions; audit pinned source/dependencies/assets, and do not import protected branding or assume software terms cover website prose. PaceUI remains link-only because licenses vary by item. No implementation imported and no disclosure, keyboard or voice-control check exercised by this author.
