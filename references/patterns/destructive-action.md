# Destructive action

`id: destructive-action` · scale: flow · studio: no studio step · references checked: 2026-10-08

## Problem and outcome

A person wants to delete, discard or remove something, but may misunderstand the affected object, scope or reversibility. Routine confirmations can become meaningless, while an unqualified undo button can promise recovery the service cannot provide. This flow makes the real consequence visible, applies the action once and reports an honest result, with restoration only where it is genuinely supported.

## When to use / When not to use

Use for data loss, discarded unsaved work, removal affecting others or another meaningful hard-to-reverse change. Choose friction according to consequence and recovery, not according to button color. Use a clear [dialogs-and-layers](dialogs-and-layers.md) choice if interruption is needed.

Do not ask for confirmation for every low-risk, reversible control. Prefer a direct action with a real undo where appropriate. Do not use a danger dialog to communicate a service outage; [error-pages](error-pages.md) explains that state. Removing an item from a personal view is not necessarily deleting its underlying data; name the actual operation. Cancelling [create-edit](create-edit.md) while pristine needs no invented data-loss warning.

## Structure and slots

- **Required — trigger:** a specific verb and object context; keep it separate from ordinary save/continue actions.
- **Required — impact:** the exact affected object(s), meaningful dependent effects and whether recovery is possible.
- **Required — decision:** a clear destructive command and a non-destructive way to stay/cancel where confirmation is used.
- **Required — operation/status:** pending, succeeded, failed and unknown outcomes grounded in the actual service operation.
- **Required — post-action destination:** a stable place and logical focus target after the affected object or trigger disappears.
- **Required when offered — undo/restore:** the scope, availability and expiry of actual restoration, with its own result/failure state.
- **Optional — high-impact acknowledgment:** a deliberate checkbox or typed identifier only when it helps establish understanding of a substantial consequence, not as routine ceremony.
- **Optional — batch review:** count, selected scope and item-level outcomes, including dependent objects and partial failure.

## Variants

| Variant | Gain | Cost and choice |
| --- | --- | --- |
| Direct removal with real undo | Keeps routine work quick while allowing an acknowledged reversible action to be restored. | Needs durable restore capability and a discoverable route beyond a fleeting toast; choose for low-risk removals the service can truly reverse. |
| Irreversible confirmation | Names the object and consequence before the final command. | Interrupts work and can become habitual; choose for significant loss without a reliable undo. |
| Batch impact review | Makes the selected scope and dependencies inspectable before affecting several objects. | More data/status complexity; choose when many objects or mixed permissions make a simple yes/no prompt insufficient. |

## States and transitions

**Idle → requested → impact loading/ready → cancelled or committing.** Cancel makes no destructive request. **Committing → removed/discarded/failed** reflects the actual operation, not the closing animation. **Impact changed/stale object** requires current review where consequences differ. **Denied/dependency blocked** explains why the operation cannot occur and offers a legitimate alternative. **Unknown outcome** checks the existing operation rather than inviting duplicate activation. **Partial batch result** identifies succeeded, failed and untouched objects; retry targets only the appropriate failed subset after review. **Undo available → restoring → restored/restore failed** uses a real service acknowledgment. **Undo expired** removes the false promise and gives any genuine alternative restore route. **Object already gone** explains the current state without pretending this attempt performed the deletion. After removal, route/focus move to a surviving collection or heading. A later return cannot use stale detail as though the object still existed.

## Data and copy contract

Provide stable target IDs, names, revisions, operation type, selected scope, dependencies, permission and reversibility metadata. A batch count distinguishes current-page selection from all matching items; never imply one when the service will act on the other. Impact data is current enough to support the decision and checked again at commitment. Restoration requires a real token/object revision, retained data and service-defined availability; a client timer alone is not undo. Keep a discarded local draft distinct from deleted persisted data. Handle long or duplicate names with a safe distinguishing attribute, zero valid targets, mixed permissions and partial results. Do not publish secret content merely to make the warning specific.

Every visible string comes from the copy deck: `destructiveAction.trigger`, `title`, `target`, `impact`, `irreversible`, `undoAvailable`, `cancel`, `stay`, `commit`, `working`, `removed`, `failed`, `denied`, `blocked`, `changedImpact`, `unknown`, `partialResult`, `undo`, `restoring`, `restored`, `restoreFailed`, `undoExpired`. The command names the real action; vague acceptance labels are insufficient. Consequence copy distinguishes deleting for everyone, removing from a view and discarding a draft. Do not call an action permanent if the actual policy retains/restores it, or reversible if restoration is only hoped for.

## Accessibility

Use a labelled dialog for a confirmation, or an alert dialog for a brief important message requiring a response. If modal, make the background inert and contain Tab/Shift-Tab focus. Initially focus the non-destructive action for hard-to-reverse decisions, or the heading when structured impact content must be read first; do not default to the destructive command merely because it is visually primary. Escape and visible cancel/close provide a non-destructive exit before commitment. Once a command is in flight, do not imply that closing the UI cancels the server operation. On cancellation, return focus to the trigger; after removal, choose a surviving logical target. Announce acknowledged removal/restoration once and keep a real restore route keyboard/touch accessible. Typed acknowledgment supports paste and clearly states the expected identifier. Provide non-color danger cues, visible focus, 4.5:1 text contrast, 3:1 control/focus contrast, reflow at 400% zoom and targets at least 24 by 24 CSS pixels or suitable spacing; prefer 44 by 44 decision controls. No conformance test is claimed.

## Responsive

At phone width, stack impact text and clearly separated decision buttons without hiding cancel below an unreachable footer. Long names and dependency lists wrap; a large batch review becomes a full page rather than a cramped nested dialog. The on-screen keyboard for acknowledgment must not cover the consequence or exit. Undo remains discoverable in the resulting surface even if transient feedback disappears.

## Motion

Use a restrained layer-entry role for confirmation and brief feedback for acknowledged removal. Do not let a collapse animation stand in for successful deletion or trigger a command at animation end. Keep focus stable while a row exits and choose the surviving target deliberately. Reduced motion removes row collapse, shaking and urgency effects, leaving immediate result/status text and the same restore route.

## Looks

**Quiet:** a concise warning with clearly distinct actions. **Editorial:** an explicit consequence heading and readable impact list. **Playful:** restrained accents only; no cheerful animation that trivialises loss. **Brutalist:** strong danger boundary and named command. **Print:** a documentary impact summary with explicit irreversible/reversible wording. **Immersive:** opaque high-contrast decision surface over a dimmed, inert background. Red alone never carries the warning in any look.

## References

- [Carbon: modal](https://www.carbondesignsystem.com/building-blocks/core/components/modal/guidelines) — checked 2026-10-08; supports danger confirmations, named actions and visible consequences. Its general primary-button focus rule is not adopted for an irreversible decision; the specific APG guidance below governs that case here.
- [W3C APG: modal dialog](https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/) — checked 2026-10-08; supports contained focus, Escape, logical return and least-destructive initial focus for difficult-to-reverse operations. Guidance is not proof of this flow's accessibility.
- [W3C APG: alert dialog](https://www.w3.org/WAI/ARIA/apg/patterns/alertdialog/) — checked 2026-10-08; supports naming and describing a brief modal decision message.
- [Base UI: alert dialog](https://base-ui.com/react/components/alert-dialog) — checked 2026-10-08; establishes an actual unstyled React component candidate and its parts. Documentation read only; demo styling/code is not copied and async deletion behavior is not inferred from a close control.

## Code you can use

Candidate, not imported: [Base UI Alert Dialog](https://github.com/mui/base-ui), under [MIT](https://github.com/mui/base-ui/blob/master/LICENSE), checked 2026-10-08. Retain the Material-UI SAS copyright and full permission/warranty notice with adapted code. Candidate, not imported: [Carbon React Modal](https://github.com/carbon-design-system/carbon/tree/main/packages/react/src/components/Modal), under [Apache-2.0](https://github.com/carbon-design-system/carbon/blob/main/LICENSE), checked 2026-10-08; provide the license, retain applicable notices/NOTICE attribution and mark modified files. Select a supported component version and explicitly configure the focus policy above rather than assuming defaults satisfy it.

Neither candidate implements deletion authorization, batch atomicity, restore storage or operation reconciliation. Audit dependency licenses and fonts/media independently; source illustrations, branding and screenshots are not included. APG pages are guidance links, not an imported implementation. This record is independently authored, contains no borrowed code/assets and reports no exercised destructive operation or accessibility result.
