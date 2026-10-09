# Review before and after rendering

Agents other than the model or tree's author review the product definition and options before anything is built, then review captures before the user walks the tree. Review is the filter between a checked definition, a wide tree and the user's time.

## Reviewers

- Two or three reviewers with distinct lenses:
  - **craft:** accessibility, contrast, layout integrity, states, responsive behavior;
  - **taste:** the brief's posture, the reference products, and the defaults in [options.md](options.md);
  - **domain:** whether each option serves the user's core task.
- Use more than one model family; one family shares its blind spots.
- Give each reviewer the brief, product model, keyed copy deck, contract/scenario fixtures, pattern bindings and the bound records' contracts, checker diagnostics, [options.md](options.md), and the planned tree or captures. Include evidence for real capabilities and confirmed fixed claims. Each writes findings with keep, change or cut, a reason and evidence: a model path, copy key, fixture scenario, binding target, option ID or shot path as appropriate.

## Before rendering

On the product definition:

- **Real capabilities.** Every executable control and landing claim depends on real behavior; pending, success and failure evidence match the operation, and cancellation/retry/undo exist only when real. `real: false` is an explicit planned gap, not permission to imply working behavior.
- **Fixed confirmations.** Every fixed binding has a product-specific `because`, fits its data and capabilities, and any claim not supplied by the user has confirmation evidence. Proposals are not presented as fixed constraints.
- **MVP cut.** Must-have flows form one coherent, observable core loop. Should-have and Later flows remain a genuine cut for walk choices. Every modeled surface is reached by a flow, and deferred surfaces and keys remain in the full copy-coverage set.
- **Bindings.** Required placements contain meaningful records, mapped data or referenced copy. Nonfixed bindings have at least two effective candidates. `sameAs` followers match status, selected variant and effective candidate sets, ignoring order. Interaction and motion slot bindings have nonempty `on` entries with matching record axes and event kinds.
- **Copy reach.** Every referenced fixed string has a declared role and actual state/setup targets, including hidden and outbound text on deferred surfaces. `always` means present in every allowed target, not anywhere reachable. The generated `Shown when` column matches the references, including restricted slots. Every screen reaches this complete inventory under the [coverage contract](product-model.md#every-screen-coverage).
- **Data and placeholders.** Resolve each placeholder at every placement that references its key. Surface copy reads all its slot contracts, while slot copy reads only its own data. Formatters match field types. Fixtures supply representative counts, long cases and every declared state's scenarios. Every row declares every field, and each optional field has a null case.
- **Disguised copy.** Inspect fixture strings even when they vary. Dates and numbers belong in fixtures. Surrounding product language belongs in the keyed deck.
- **Channels.** Recipient questions, logical template identities and preview widths describe message outcomes, not browser navigation or real delivery. Screen and push surfaces have title roles. Email has subject and body roles; push has a body role. Each required role covers every state and setup. Preheaders and actions are inventoried when present. Studio preview labels do not enter product copy.
- **Warnings.** Resolve or account for imagined capabilities, deferred-only surfaces and keys, rejected entity vocabulary and possibly disguised fixture copy. See the [current boundary](product-model.md#current-boundary) for what a passing model check establishes.

On the written tree, before building any option:

- Name every pair of options that can't compose, and the rule that resolves it.
- Flag twinges, themes, gimmicks and agent defaults.
- Find product decisions hiding inside a style step, and product decisions with no step.
- Check that every recommendation has a product reason.

Apply the model and tree fixes before building; every finding must be resolved or explicitly accounted for with evidence. Recheck the definition after changing model references, copy or fixtures.

## After rendering

1. Capture every option of every step in both themes: `bun run capture` in `studio/`, or the in-app capture ([in-app-studio.md](in-app-studio.md)), which adds phone and desktop widths and motion clips.
2. Fix capture gaps first. An identical pair means the setup never exercises the option, or the option does nothing. Recapture those steps with `--step`. Options that only differ in the other theme can flag in one theme. The interaction branch uses explicit filmstrip states so its options remain distinguishable in reduced-motion captures; judge timing and interruptibility live with replay as well.
3. Reviewers read the contact sheet (`capture/index.html`) and the shots, and the clips or a live replay for motion steps.
4. Cut true twinges and rule collisions, and make options that look alike visibly different. When reviewers disagree with a recommendation or a cut, record it on the step ("the craft review would cut this"); the user settles it in the studio.
5. Recapture what changed and confirm the flagged pairs are gone.

Review is done when every step's options are visibly different in the capture, the studio logged no errors, and each finding is applied or recorded on its step.
