---
id: conversation
scale: surface
studio: conversationLayout
slots: {"required":["header","primary","composer","state"],"optional":["attachments","replies","navigation","timestamps","stop","context","actions","confirmation","outcome"]}
variants: [{"id":"bubbles","label":"Bubbles"},{"id":"transcript","label":"Transcript"},{"id":"channel","label":"Channel"},{"id":"context","label":"With context"}]
states: ["loading","empty","populated","partial","denied","failed","draft","sending","sent","unread","queued","streaming","awaitingInput","stopped","completed","uploadPending","uploadFailed","reconnecting"]
copy: ["composer","send"]
events: ["send","receive","retry","stop","upload","removeAttachment","reconnect"]
renderer: variants
---

# Conversation

`id: conversation` · `scale: surface` · `studio: conversationLayout` · `references checked: 2026-10-08`

## Problem and outcome

A person exchanging messages with people or an agent needs to know who said what, compose the next turn and distinguish an unfinished response from a completed one. The conversation keeps the thread, attachments and any relevant object in context without treating typing as successful delivery.

## When to use / When not to use

Use for genuine turn-taking or channel communication. Do not disguise a deterministic form as chat when [question-pages](question-pages.md) is clearer. A generated artifact that people mostly read belongs in [reader](reader.md); work execution details can use [agent-activity](agent-activity.md) alongside the thread.

## Structure and slots

Required: `header` identifies participants/thread; `primary` is an ordered message history with author and delivery status; `composer` has labeled input and send action; `state` explains loading, no messages, denied and failure. Optional: attachment controls, reply references, thread navigation, timestamps, response stop control and `context` about the discussed object. Bind support flow → conversation → `context` to the real order/file; bind `composer` pending to async-progress. Do not invent a context object just to fill the panel.

Optional task-level `confirmation` and `outcome` placements support actual consequential thread actions and their acknowledged results. Bind a delete/leave decision to dialogs-and-layers and a share/completion result to notifications only when those capabilities exist; they are child placements, not nested message regions.

## Variants

Exactly the four `conversationLayout` labels:

- **Bubbles:** visually separates mine/theirs. Quick for short personal exchanges; long answers and many participants become awkward, and alignment alone cannot identify authors.
- **Transcript:** full-width turns read like documents. Good for substantial agent answers; takes more vertical space and needs strong author boundaries.
- **Channel:** dense author/time rows group consecutive messages. Good for team scanning; grouping must not hide authorship or unread boundaries from assistive technology.
- **With context:** thread beside a relevant object panel. Supports investigation without switching routes; needs enough width and honest selection synchronization, otherwise the panel misleads.

## States and transitions

History fetch resolves to empty/populated/partial/denied/failed. Draft → sending → sent only on acknowledgment; failure keeps the draft/message and offers retry without accidental duplicate sends. Incoming messages show an unread notice if the person is reading earlier turns; auto-follow only while already at the end. Agent response can be queued, streaming, waiting for input, stopped, completed or failed; stopped/partial output remains labeled. Upload has independent pending/failed state and can be removed before send. Reconnect reconciles stable IDs; navigation preserves the draft under the product's stated policy.

## Data and copy contract

Thread ID/title, participant IDs/display names, message IDs/authors/timestamps/body/delivery state, ordered history boundary and actual send/stop/upload capabilities are required as applicable. Context uses an object ID and accessible label. Support no history, long transcripts, multiline content, absent avatars and failed attachments. Copy keys cover composer label, send, sending, retry, stop, partial response, new messages, attachment status and access/error recovery. Streaming chunks are not separate logical messages.

## Accessibility

Use labeled message lists/articles and a form composer. Author and state are text, not just position/color. Expose send as a button; document Enter behavior and preserve a multiline keyboard path. Do not announce every generated token: announce start, meaningful completion and failure with access to the full response. Keep reading focus/scroll stable when messages arrive. Context and thread have named landmarks. Provide 44px intended touch controls, visible focus, contrast and usable zoom; never rely on hover for message actions.

## Responsive

With context becomes a named context view/disclosure and thread, preserving object identity and return focus. Bubbles widen for long text rather than becoming narrow strips. The composer remains reachable above the virtual keyboard; its height must not consume the entire history viewport. Use one primary history scroll region.

## Motion

Message arrival may use a short local fade, never word-by-word decorative reveal. Control-response confirms send; async-progress reports actual work. Still/reduced-motion shows complete available chunks and static delivery/status text; no smooth forced scrolling.

## Looks

Quiet emphasizes authors and text; editorial suits Transcript; playful can shape Bubbles; brutalist separates turns with explicit rules; print reads as a labeled transcript; immersive protects message text/composer on solid surfaces. None substitutes an animated avatar for honest execution state.

## References

- [Carbon inline loading](https://www.carbondesignsystem.com/building-blocks/core/components/inline-loading/guidelines) — checked 2026-10-08, guidance read: pending/completed/error distinctions for local actions, not an agent-streaming protocol.
- [GOV.UK button](https://design-system.service.gov.uk/components/button/) — checked 2026-10-08, documentation read: descriptive action copy and action hierarchy; no chat interaction was exercised.
- [EasyUI](https://easyui.site/) and [PaceUI](https://paceui.com/) — checked 2026-10-06 in earlier public-document research: link-only conversation/AI composition inspiration; no downloaded code, live keyboard audit or outcome evidence.

## Code you can use

[Carbon core](https://github.com/carbon-design-system/carbon), candidate local loading/controls under [Apache-2.0](https://github.com/carbon-design-system/carbon/blob/main/LICENSE), license read 2026-10-08. Keep license/attribution, applicable NOTICE and modification notices; pin and audit dependencies/assets before adaptation. No complete conversation is imported. EasyUI's inherited MIT-code description does not clear its entire media catalog; PaceUI terms vary by item. Both remain link-only in this record. Documentation reading is not studio interaction verification.
