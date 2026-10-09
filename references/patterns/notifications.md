---
id: notifications
scale: component
studio: null
slots: {"required":[],"optional":["outcome","notice"]}
variants: [{"id":"inline","label":"Inline"},{"id":"toast","label":"Toast"},{"id":"banner","label":"Banner"},{"id":"notificationCenter","label":"Notification center"}]
states: ["visible","unread","read","pending","resolved","dismissed","failed","expired"]
copy: ["outcome"]
events: ["notify","read","act","resolve","dismiss","expire"]
renderer: variants
---

# Notifications

`id: notifications` · `scale: component` · `studio: no studio step` · `references checked: 2026-10-08`

## Problem and outcome

A person needs relevant feedback about an action or system condition without having the current task repeatedly interrupted. Notifications match prominence and persistence to urgency, explain the outcome and expose a real next step where needed.

## When to use / When not to use

Use for meaningful success, information, warning or error. Do not notify every routine click or duplicate feedback already obvious in the changed UI. Field correction is [validation](validation.md); pending work is [async-progress](async-progress.md). A decision that truly must block the workflow belongs to dialogs-and-layers, not a toast pretending to be mandatory.

## Structure and slots

Required: `message` names event/outcome in context; `severity` has text/semantic meaning; `persistence` defines when it resolves. Optional: title, timestamp, one primary action, dismiss control, object link and durable history entry. Bind the task's `outcome` slot to a local message; bind system-wide conditions to shell `notice`; do not broadcast a local failure across every surface.

## Variants

- **Inline:** lives beside the affected content until resolved/dismissed. Best for actionable local failures; may be missed if distant from the user's current region. Preserve existing content rather than covering it.
- **Toast:** compact out-of-context update with optional history entry. Good for nonblocking background outcomes; ephemeral reading is unreliable, so actionable/critical content persists and remains retrievable.
- **Banner:** one broad system/product condition in document flow. Good for maintenance/connectivity affecting the whole surface; consumes prominent space and causes fatigue if used for promotions or unrelated news.
- **Notification center:** a chronological, user-opened collection. Good for many updates and later review; requires read/unread semantics, preferences and a concise attention cue rather than many simultaneous toasts.

## States and transitions

Event → visible/unread → read, action pending, resolved or dismissed according to explicit policy. Dismissal is not completion of an outstanding task. Action failure retains the message and gives recovery; success resolves only the associated event. Deduplicate the same event ID, group bursts meaningfully and never re-alert repeatedly because a person did not click. Expiry applies only to noncritical, nonactionable notices; keep any important result in its owning surface/history. Error messages state the known problem without promising an unavailable remedy. Connectivity recovery resolves the banner on confirmed recovery, not a timer.

## Data and copy contract

Event ID, source/object context, severity, title/body, created time, action/destination, persistence and read/dismiss state. Preferences apply only where notification delivery is optional; required safety/task notices stay explicit. Support one notice, bursts, long localized copy, absent timestamps and unavailable actions. Copy keys cover event summaries, resolve/dismiss, action pending/failed, unread count, preferences and empty history. Prefer specific outcome/next-step wording; raw codes and exaggerated urgency are not user copy.

## Accessibility

Use a restrained polite status for ordinary feedback; assertive alerts only when urgency warrants interruption. Do not steal focus for routine notifications. Interactive messages remain keyboard/touch reachable and do not disappear while focused or before the action can be used. Announce once per logical event, not on rerender. Severity uses text/icon beyond color. Dismiss buttons have contextual names; focus returns predictably after removal. Keep 44px intended touch targets, contrast, focus and zoom access; announcements alone are not the only place to find results.

## Responsive

Inline/banner messages stay in content flow. Toasts fit the viewport and avoid obscuring primary actions or the virtual keyboard; center history becomes a readable page/sheet with explicit close/back. Stack text and actions without truncating required meaning.

## Motion

A short layer-arrival can signal a toast; no bouncing/looping urgency. Removal waits for semantic dismissal/resolution, not animation completion. Still/reduced-motion cuts messages in/out with the same persistence and announcements; no auto-dismiss policy is justified by reduced motion alone.

## Looks

Quiet minimizes interruption; editorial uses concise headline/body; playful accents success but not serious error; brutalist makes severity explicit; print uses notices in flow; immersive ensures readable solid notice surfaces. Every look keeps identical urgency and dismissal rules.

## References

- [Carbon notifications](https://www.carbondesignsystem.com/building-blocks/core/patterns/notifications) — checked 2026-10-08, guidance read: contextuality, severity/type and actionable persistence. This record independently chooses non-focus-stealing routine feedback; no Carbon demo exercised.
- [GOV.UK button](https://design-system.service.gov.uk/components/button/) — checked 2026-10-08, documentation read: descriptive action labels; not a notification announcement audit.
- [VantaUI](https://www.vantaui.com/) and [EasyUI](https://easyui.site/) — checked 2026-10-06 in earlier public-document research: link-only feedback breadth, no code/assets or measured source behavior copied.

## Code you can use

[Carbon core](https://github.com/carbon-design-system/carbon) notification components are candidates under [Apache-2.0](https://github.com/carbon-design-system/carbon/blob/main/LICENSE), read 2026-10-08. Preserve license/attribution, applicable NOTICE and modification notices; audit pinned source/dependencies/assets. Its website prose is not cleared by the software license. VantaUI is proprietary/plan-limited; EasyUI's inherited MIT description requires item/media review. Both stay link-only here. No imported code or exercised notification/accessibility checks.
