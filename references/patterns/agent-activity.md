---
id: agent-activity
scale: surface
studio: null
slots: {"required":["header","primary","result","intervention","state"],"optional":["steps","history","input","timestamps","resources","detail"]}
variants: [{"id":"runSummary","label":"Run summary"},{"id":"stepLedger","label":"Step ledger"},{"id":"eventTimeline","label":"Event timeline"}]
states: ["created","queued","running","awaitingInput","awaitingApproval","resumed","completed","partial","failed","cancelled","stopping","unknown","reconnecting","approvalPending","approvalAccepted","approvalRejected","approvalExpired"]
copy: ["status"]
events: ["update","approve","revise","stop","retry","restart"]
renderer: schematic
---

# Agent activity

`id: agent-activity` · `scale: surface` · `studio: no dedicated step; asyncFeedback “Step list” renders a progress slot` · `references checked: 2026-10-08`

## Problem and outcome

A person delegating work needs to know what has actually happened, whether intervention is required and what result can be inspected. Agent activity shows a truthful execution ledger and permitted steering actions, not a fictional stream of internal reasoning.

## When to use / When not to use

Use for long-running delegated work with meaningful, observable execution events. A short request needs [async-progress](async-progress.md), not a full console. Conversational exchange is [conversation](conversation.md). Do not expose private prompts, hidden reasoning, credentials or raw sensitive tool output as “transparency.”

## Structure and slots

Required: `header` names task/run and scope; `primary` reports current lifecycle and observable events; `result` links real artifacts/outcomes or explains none; `intervention` offers only supported approve/revise/stop actions; `state` explains failure/connection uncertainty. Optional: step list, bounded event history, input summary, timestamps, resource summaries and sanitized detail disclosure. Bind delegate-work → activity → `primary` to async-progress “Step list” only when genuine named steps exist; `intervention` binds to the product's approval contract, not a decorative button.

## Variants

- **Run summary:** status, latest meaningful update, result and intervention in one compact region. Good for casual oversight; insufficient for diagnosing multistep failures without optional details.
- **Step ledger:** named stages show pending/running/completed/blocked/failed with outcome links. Good for bounded plans; misleads if the task cannot define stages or replans silently. Changed plans retain a visible revision distinction.
- **Event timeline:** timestamped public execution events and related outputs. Good for investigating concurrent/repeated work; noisy for novices and needs grouping/filtering plus restrained announcements. Event order alone must not imply causality.

## States and transitions

Created → queued → running → awaiting input/approval → resumed → completed, partially completed, failed or cancelled, according to real events. Stop enters stopping until acknowledgment; connection loss is unknown/reconnecting, not proof the run stopped. Approval sends an explicit decision and shows pending/accepted/rejected; expired requests cannot be approved. Failure identifies the known failing stage and preserves completed outputs. Retry/restart names whether it resumes or creates a new run and what may repeat. Done means the service reports completion and exposes the result; a success animation is not completion evidence.

## Data and copy contract

Run/task IDs, user-visible scope, lifecycle timestamps, ordered public event IDs/types/summaries, actual step IDs/statuses when available, supported intervention actions and result URLs. Progress percentages require measurable work; estimates have a stated basis. Provide no events, many events, long summaries, partial artifacts and absent timestamps. Copy keys cover each lifecycle, uncertain connection, approval request/consequence, stop/stopping/stopped, partial result, failed stage and recovery. Redact sensitive fields before they reach the UI; the copy deck must not become a raw log dump.

## Accessibility

A named status region and list of events/steps; headings distinguish progress, intervention and results. Announce meaningful phase changes politely, urgent intervention sparingly, never each log/token. New events do not steal focus or scroll from an earlier event. Keyboard/touch can inspect details and perform every steering action. Focus returns from details/approval to the source action or run heading. State uses text/icons beyond color; controls have 44px intended targets, contrast, focus and zoom access.

## Responsive

Status/intervention precede event detail. Step ledgers stack; event timestamps wrap beside summaries. Results become labeled links, not tiny terminal text. Optional logs use labeled local overflow only where necessary; avoid competing full-height panes.

## Motion

Progress animation indicates ongoing work only; it never fabricates checkpoints. Completed steps may switch icons with short response timing. Still/reduced-motion keeps static running/status text, completed marks and all intervention routes. No infinite thinking orb is required.

## Looks

Quiet limits event chrome; editorial organizes summaries/results; playful may accent completion without trivializing failure; brutalist makes lifecycle and scope explicit; print reads as a dated ledger; immersive protects control/status legibility over media. All preserve truthful lifecycle and privacy boundaries.

## References

- [Carbon inline loading](https://www.carbondesignsystem.com/building-blocks/core/components/inline-loading/guidelines) — checked 2026-10-08, documentation read: distinct active/finished/error feedback; not validation of agent claims or execution safety.
- [GOV.UK patterns](https://design-system.service.gov.uk/patterns/) — checked 2026-10-08, public guidance read: user tasks and outcomes lead composition, not a specific agent product.
- [EasyUI](https://easyui.site/) and [PaceUI](https://paceui.com/) — checked 2026-10-06 in earlier public-document research: link-only agent/activity breadth; no fetched private run data or exercised control behavior.

## Code you can use

[Carbon core](https://github.com/carbon-design-system/carbon) local loading/controls are candidates under [Apache-2.0](https://github.com/carbon-design-system/carbon/blob/main/LICENSE), read 2026-10-08. Retain license/attribution, applicable NOTICE and modification notices; audit pinned code/dependencies/assets before reuse. This clears neither an agent runtime nor a complete activity surface. EasyUI/PaceUI remain inspiration-only here under the index posture. No imported code, runtime exercise or accessibility conformance claim.
