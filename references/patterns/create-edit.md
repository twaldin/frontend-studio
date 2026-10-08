# Create and edit

`id: create-edit` · scale: flow · studio: no studio step · references checked: 2026-10-08 (new primary guidance); 2026-10-06 (inherited link-only inspiration)

## Problem and outcome

A person needs to make a real object or change an existing one without losing work or confusing a local draft with a saved result. An editor that closes immediately on submit can hide rejection; an automatic save can silently overwrite another change. This flow starts with a new-object intention or an identified editable object and ends with an acknowledged saved version that the person can inspect, or an explicit decision to discard the draft.

## When to use / When not to use

Use for forms, composers or focused property editing that create or update persisted data. Reuse the same field definitions and [validation](validation.md) rules for creation and editing where the domain permits it. Use [check-answers](check-answers.md) if commitment has consequences not visible in the editor itself.

Do not build a separate editor for a simple immediate preference toggle; [settings](settings.md) can contain it. Large multistep intake belongs in [question-pages](question-pages.md) or [task-list](task-list.md). Deleting an object or discarding consequential work uses [destructive-action](destructive-action.md), not a save button labelled ambiguously.

## Structure and slots

- **Required — editor identity:** create/edit heading, object name or new-object type and any permission limits.
- **Required — fields/body:** visible labels, values, hints, required/optional status and relevant groups. A composer still needs a named input.
- **Required — save model:** an explicit save action or clearly stated acknowledged autosave state; choose deliberately, not accidentally through blur events.
- **Required — exit/cancel:** a route back with an honest policy for unsaved changes.
- **Required — error/status:** validation, saving, saved, failed and changed-elsewhere outcomes without clearing the draft.
- **Required — result:** the saved object's destination or updated in-context representation.
- **Optional — preview, attachments and advanced properties:** preview must distinguish draft content from the saved version; uploads have their own pending/failure state.
- **Optional — history/restore:** only offer a real saved revision that the service can restore.

## Variants

| Variant | Gain | Cost and choice |
| --- | --- | --- |
| Dedicated editor page | Gives complex content, help and preview adequate room and a stable URL. | Leaves the original collection; choose for lengthy or consequential edits. |
| Side-panel editor | Keeps the affected row/item visible while editing, useful for repeated operations. | Needs clear panel/object identity and a phone recomposition; choose when reference to the source surface is useful. |
| Focused dialog form | Concentrates a small, infrequent change in one bounded transaction. | Interrupts the page and requires focus containment; choose only when fields and errors fit without a complex nested flow. |
| Inline edit | Places a small correction directly beside its current value. | Save/cancel, neighboring actions and focus can become ambiguous; choose for a limited property with explicit acknowledgment, not a whole record squeezed into a row. |

## States and transitions

**Loading/new draft → pristine → dirty → validating/saving → saved.** A create save returns a real new ID; an edit save returns the accepted revision. **Invalid** preserves all values and focuses linked errors. **Saving failed/offline** retains the draft and identifies the last acknowledged saved version. **Conflict/changed elsewhere** gives a comparison or deliberate reload/merge choice without silently discarding either version. **Permission revoked/deleted elsewhere** explains why saving cannot proceed and preserves recoverable draft text under the security policy. **Attachment pending/failed** distinguishes uploaded data from a locally selected filename. **Cancel while pristine** exits; **leave/discard while dirty** follows the stated policy and offers a meaningful stay route. **Saved then exit** updates the affected surface and returns focus appropriately. Autosave, if chosen, has separate dirty, saving and acknowledged states; moving focus away alone is never proof of persistence. Unknown outcomes use the existing operation's status before repeating a create request.

## Data and copy contract

Provide object type/ID, field schema, editable permissions, baseline revision, current draft and accepted save result. Track dirty state against the baseline rather than a collection of independent booleans. The persistence boundary reports field errors, revision conflict and service failure distinctly. Keep selected upload metadata separate from accepted attachment IDs. A create command must not infer success from an empty response or reuse a fabricated ID. Support empty optional values, long names/body content, one/many attachments and values that are visible but not editable. Do not erase a recoverable draft simply because a panel unmounts; define draft retention and privacy deliberately.

Every visible string comes from the copy deck: `createEdit.createTitle`, `editTitle`, `fieldLabel`, `hint`, `optional`, `save`, `create`, `cancel`, `unsaved`, `saving`, `saved`, `lastSaved`, `saveFailed`, `conflict`, `reload`, `compare`, `stay`, `discard`, `permissionLost`, `objectGone`, `previewDraft`, `uploading`, `uploadFailed`. Use task/object-specific save labels when they clarify the result. Saved timestamps and success copy require acknowledgment; preview and sample content are labelled as such.

## Accessibility

Use a real form with visible labels, associated hints/errors and fieldsets for related choices. For page editors, focus the heading on navigation; for short modal forms, focus an appropriate first input and contain focus only while truly modal. A side panel's modality must be explicit; do not trap focus in a nonmodal editor. On save/cancel, return to the invoking control or the updated/new object if that is the logical next step; if it disappeared, choose a stable nearby heading. Inline editing offers visible save/cancel buttons to keyboard and touch, not just Enter/Escape shortcuts. Announce saving/saved failure sparingly and keep input focus stable during autosave. Support visible focus, 4.5:1 text contrast, 3:1 control/focus contrast, reflow at 400% zoom and at least 24 by 24 CSS-pixel targets or suitable spacing; prefer 44 by 44 touch actions. These are requirements, not tested claims.

## Responsive

At phone width, use one field column and convert a complex side panel into a full-width editor view without losing object identity or draft. Put actions after fields or in a footer that does not obscure errors/the keyboard. Preview becomes a clearly named alternate view, not a permanently cramped second column. Dialog content scrolls vertically while cancel/save remain reachable; if the form is too large, use a page instead.

## Motion

Use the chosen [layer-arrival](layer-arrival.md) for panel/dialog entry and a short local feedback role for acknowledged save. Do not animate every autosaved keystroke or close a form before a rejected response can be read. Reduced motion opens/closes immediately and uses static dirty/saving/saved text; focus and draft retention stay identical.

## Looks

**Quiet:** neutral fields and compact save status. **Editorial:** strong object title and readable body composition. **Playful:** friendly empty-draft guidance and original accent markers, not moving inputs. **Brutalist:** explicit field groups, baseline/draft distinction and hard action block. **Print:** ruled fields and documentary revision information. **Immersive:** stable opaque editing area and legible status over optional media. No look hides unsaved, conflict or permission messages.

## References

- [Carbon: forms](https://www.carbondesignsystem.com/building-blocks/core/patterns/forms) — checked 2026-10-08; supports page/dialog/side-panel choices, grouping and task-specific actions. The source says inline editing lacks consolidated guidance; this record's inline variant is an original implementation contract, not a claimed Carbon recommendation.
- [Carbon: modal](https://www.carbondesignsystem.com/building-blocks/core/components/modal/guidelines) — checked 2026-10-08; supports short infrequent editing, validation before closing and a page for complex content. Its blur-validation guidance differs from the submit-time default in [validation](validation.md).
- [GOV.UK: validation](https://design-system.service.gov.uk/patterns/validation/) — checked 2026-10-08; supports retained answers and actionable correction. Does not define revision conflict resolution.
- [W3C APG: modal dialog](https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/) — checked 2026-10-08; supports focus containment, initial-focus choices and logical focus return. Guidance is not a tested implementation result.
- [EasyUI](https://easyui.site/) — inherited public-source research dated 2026-10-06; link-only component-category exploration; no selected snippet/dependency/asset clearance asserted.

## Code you can use

Candidate, not imported: [Carbon React Modal](https://github.com/carbon-design-system/carbon/tree/main/packages/react/src/components/Modal) and form controls under [Apache-2.0](https://github.com/carbon-design-system/carbon/blob/main/LICENSE), checked 2026-10-08. Include the license, preserve applicable notices/NOTICE attribution and mark modified files. Candidate, not imported: [GOV.UK Frontend](https://github.com/alphagov/govuk-frontend) form and error-summary controls under [MIT](https://github.com/alphagov/govuk-frontend/blob/main/LICENSE.txt), checked 2026-10-08; retain Crown copyright and the full permission/warranty notice.

These candidates do not implement persistence, conflict resolution or safe draft retention. Audit selected-version dependencies and fonts/media independently. EasyUI stays link-only despite a general MIT description because candidate-specific code, dependencies and assets need separate clearance. No snippets, screenshots or branded examples are imported, and no editor/accessibility exercise is claimed.
