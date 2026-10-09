# Rounds: walk, record, lock in

The visual grill runs in rounds. One round: write the tree, review it, render, capture, review the captures, the user walks it, export, lock in. The next round holds only what the walk left open.

## Serve the studio for the walk

- Ask where the user will look at it. For another machine, bind an address that machine can reach and allow the hostname it will type:

  ```sh
  STUDIO_HOST=<lan or tailnet ip> STUDIO_ALLOWED_HOSTS=<hostname> bun run dev
  ```

  Request the URL yourself, through that IP and that hostname, before sending it. Anyone who can reach that address can read and replace the saved walk through `/__studio/state`, and read the studio's source, so bind a private interface such as a tailnet address, never a public or shared network. `STUDIO_ALLOWED_HOSTS` blocks DNS rebinding; it doesn't authenticate clients.
- Plain http on any host other than localhost isn't a secure context, so the clipboard API, `crypto.randomUUID` and service workers are missing. The generic studio works without them; an in-app studio must too.
- Serve a frozen copy (a git worktree at the commit under review) so ongoing work doesn't change the studio mid-walk. Stop it when the walk ends.
- Send the exact URL that opens the studio, the keys, and the browser you checked it in. Chromium is the supported target; when the user reports a hang, ask which browser before debugging.

## Record the walk

- For each step the user picks an option, sets a status (**Decided** or **Revisit**) and writes a note whenever the options can't say what they want. A step left **Open** is not a decision.
- The dev server saves the walk to `studio/.studio/state.json` as it happens. Read it there rather than asking the user to export; `bun run export` turns it into the export files.
- Notes carry what no option offered: hybrid picks ("this one, with icons"), interaction requirements, cross-step rules, doubts and product questions. Read every one.

## End on Every screen

Finish the round on a page with controls for every modeled surface, declared state and setup, and every referenced fixed string. Include hidden copy roles, email and push parts, and surfaces reached only by Should-have or Later flows. Must-only scope limits walk choices, not copy coverage.

Use the [coverage contract](product-model.md#every-screen-coverage) for the complete target set and the [current boundary](product-model.md#current-boundary) for runtime availability. In-app studios implement this page as part of their [contract](in-app-studio.md#contract).

## Lock in

1. Export, and save the artifacts where SKILL.md says.
2. Sort every note:
   - a requirement on the chosen option becomes an acceptance criterion for the build;
   - a rule that spans steps (concentric radii, alignment with the shell) becomes a rule in the brief;
   - a question about product behavior (how many destinations, how onboarding ends, where content scrolls) goes back to the product grill, one question at a time;
   - doubt or "let's discuss" makes the step a revisit step.
3. Decided steps leave the tree. Their values become the design, and the code, styles and tests for the options not picked are deleted; history keeps them.
4. Revisit steps get a short grill on what the note asked, then new options, reviewed like a first round.
5. Ask about Open steps before locking them.

## The next round

- Its tree opens with the locked values and the requirement each note added, followed by the revisit steps and any new steps.
- The landing gets its own round once the app is locked. It starts from the locked shell and type, with landing references gathered for it, and its proof shows real product states.
- The visual grill is finished when no step is Open or Revisit, every note has become a criterion, a rule, a product decision or a step, and the brief's Design section matches the export.
