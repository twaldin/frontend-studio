# Sign in

`id: sign-in` · scale: flow · studio: no studio step · references checked: 2026-10-08 (new primary guidance); 2026-10-06 (inherited link-only inspiration)

## Problem and outcome

A person needs access to their saved work or an action requiring proof of identity. They may not know whether they already have an account, may lack their usual device, or may have forgotten a credential. The flow makes the requested proof understandable, supplies a workable recovery path and returns them to the intended task after authentication. Creating an account and signing into an existing account are distinct outcomes.

## When to use / When not to use

Use at a genuine access boundary: personal data, durable ownership or a risk-sensitive action. Keep as much public browsing available beforehand as the product permits. Reauthentication for a sensitive action should explain why another proof is needed.

Do not require an account merely to see public content or obtain a one-off receipt. [Confirmation](confirmation.md) with a reference can be sufficient for a one-time transaction. Do not confuse authentication with onboarding: optional setup belongs in [first-run](first-run.md). Permission denial after successful sign-in belongs in a clearly explained access state, not an endless credential loop.

## Structure and slots

- **Required — identity/task context:** product name, an unambiguous sign-in heading and the task that will resume.
- **Required — proof method:** labelled credential fields or an explicit device/provider action, with only the proof required for this attempt.
- **Required — submission/status:** an action named for the method and visible working, error and success outcomes.
- **Required — recovery and exit:** recover access, change method where supported, and return without losing the original destination.
- **Required when offered — account creation:** a separate, clearly labelled route explaining that it creates new access rather than finding an existing account.
- **Optional — secondary factor:** a separate challenge with its own reason, expiry, alternative and recovery.
- **Optional — remembered identity:** a masked identifier and an explicit switch-account action; never expose another person's private work before proof.

## Variants

| Variant | Gain | Cost and choice |
| --- | --- | --- |
| Password form | Familiar, compatible with password managers and independent of a single provider. | Forgotten credentials and recovery need real support; choose when established account credentials are appropriate. |
| Email link or code | Avoids remembering a product-specific password. | Delivery delay, expired links and inbox access become failure points; choose when possession of email meets the risk model. Allow code paste into one field. |
| Device or federated sign-in | Uses a device credential or an existing identity provider. | Provider/device availability, account linking and fallback need explicit handling; choose only with supported recovery, not as a decorative extra button. |

## States and transitions

**Signed out → entering/choosing → verifying → signed in** returns to the saved destination. **Malformed input** uses [validation](validation.md). **Proof rejected** gives a useful method-level message without asserting whether an undisclosed account exists. **Challenge sent** describes its masked destination, expiry and available resend/change actions. Resending creates the provider-defined challenge state; do not imply that every older code still works. **Expired/cancelled challenge** offers a new attempt, retaining the identifier where safe. **Secondary factor required** opens a separate step without claiming completion. **Temporarily limited** displays the real retry condition and another supported recovery route. **Provider unavailable** keeps the return destination and offers a supported method. **Session expired** preserves non-secret drafts according to policy before reauthentication. **Authenticated but denied** explains access, not bad credentials. A successful reset returns to sign-in or establishes a session only if the identity system actually does so.

## Data and copy contract

The identity adapter supplies enabled methods, challenge ID, masked delivery address, expiry, retry availability, session outcome and an allowlisted return destination. It owns proof verification; a UI state is not authentication. Never persist passwords or one-time codes in a copy deck, analytics payload or ordinary draft store. Preserve email spelling for display and use identity-provider rules for lookup; do not invent normalization rules for passwords. Support long identifiers, international names and an unavailable delivery channel.

Every visible string comes from the copy deck: `signIn.title`, `taskContext`, `identifierLabel`, `passwordLabel`, `showPassword`, `hidePassword`, `continue`, `providerAction`, `recover`, `createAccount`, `challengeSent`, `codeLabel`, `resend`, `expires`, `rejected`, `limited`, `methodUnavailable`, `sessionExpired`, `accessDenied`, `switchAccount`. Error text distinguishes correction, recovery and waiting. Do not promise email delivery or successful verification before acknowledgment.

## Accessibility

Use a semantic form with visible labels and the correct autocomplete purposes, including username/current-password or one-time-code as appropriate. Support paste and password managers; do not require memorized fragments or a puzzle as the only path. A show-password button has a changing accessible name and does not clear or refocus the field. Keep codes in one pasteable field unless a segmented implementation genuinely supports whole-code paste and coherent navigation. Focus the challenge heading on a new step and the error summary on rejected form submission. Announce sent/expired status once, not every second of a countdown. All methods and recovery actions work with keyboard and touch. Keep visible focus, 4.5:1 text contrast, 3:1 control/focus contrast and reflow at 400% zoom; target at least 24 by 24 CSS pixels with comfortable spacing, preferably 44 by 44 for primary touch actions. These are requirements, not a conformance result.

## Responsive

Use one column with recovery and switch-method actions in the normal reading order. Do not place essential help behind hover. Let the mobile keyboard coexist with the submit action and visible errors. Provider/device handoffs must return to a recognisable step; the narrow layout must not hide another supported method.

## Motion

Use brief control acknowledgment and a moderate step transition from identity entry to a challenge. Never shake a rejected field or animate countdown urgency. Under reduced motion, show the new heading and status immediately. Spinners can become static working text; success does not wait for a flourish. Use [async-progress](async-progress.md) for a real wait.

## Looks

**Quiet:** compact, neutral form. **Editorial:** strong task heading without a promotional detour. **Playful:** warm helper copy, never jokes about failed proof. **Brutalist:** clear blocks separating sign-in, account creation and recovery. **Print:** labelled fields, explicit method descriptions and ruled errors. **Immersive:** stable opaque form and visible focus over restrained background media. None may disguise provider identity or make recovery low contrast.

## References

- [GOV.UK: create accounts](https://design-system.service.gov.uk/patterns/create-accounts/) — checked 2026-10-08; supports avoiding unnecessary accounts and clearly separating creation from sign-in.
- [GOV.UK: create a username](https://design-system.service.gov.uk/patterns/create-a-username/) — checked 2026-10-08; supports memorable identifiers and a way to retrieve/change them. Its email guidance is not a universal identity-provider specification.
- [W3C: accessible authentication minimum](https://www.w3.org/WAI/WCAG22/Understanding/accessible-authentication-minimum.html) — checked 2026-10-08; supports password-manager/paste mechanisms and accessible alternatives across authentication steps. Explanatory guidance, not an audit of this studio.
- [EasyUI](https://easyui.site/) — inherited public-source research dated 2026-10-06; link-only UI-category inspiration. No authentication implementation or asset rights are inferred.

## Code you can use

Candidate, not imported: [GOV.UK Frontend](https://github.com/alphagov/govuk-frontend) password-input, text-input, button and error-summary controls under [MIT](https://github.com/alphagov/govuk-frontend/blob/main/LICENSE.txt), checked 2026-10-08. Retain Crown copyright and the full permission/warranty notice. Candidate, not imported: [Carbon React](https://github.com/carbon-design-system/carbon/tree/main/packages/react) text/password inputs under [Apache-2.0](https://github.com/carbon-design-system/carbon/blob/main/LICENSE), checked 2026-10-08; include the license, applicable notices/NOTICE attribution and change notices for modified files.

Neither is an identity backend, secure session implementation or provider clearance. Review dependency, provider mark and media licenses separately. EasyUI remains link-only here: a general MIT description does not clear a particular snippet, its dependencies or its assets. This record contains original prose, no imported code/assets and no exercised authentication or accessibility claim.
