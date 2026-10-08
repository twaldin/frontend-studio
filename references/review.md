# Review before and after rendering

Agents other than the tree's author review the options twice: as text before anything is built, and over captures before the user walks the tree. Review is the filter between a wide tree and the user's time.

## Reviewers

- Two or three reviewers with distinct lenses:
  - **craft:** accessibility, contrast, layout integrity, states, responsive behavior;
  - **taste:** the brief's posture, the reference products, and the defaults in [options.md](options.md);
  - **domain:** whether each option serves the user's core task.
- Use more than one model family; one family shares its blind spots.
- Give each reviewer the brief, the copy deck, [options.md](options.md), and the tree or the captures. Each writes a file with, per step, keep, change or cut, with the reason and the evidence (an option id, a shot path).

## Before rendering

On the written tree, before building any option:

- Name every pair of options that can't compose, and the rule that resolves it.
- Flag twinges, themes, gimmicks and agent defaults.
- Find product decisions hiding inside a style step, and product decisions with no step.
- Check that every recommendation has a product reason.

Apply the cuts and fixes, then build.

## After rendering

1. Capture every option of every step in both themes: `bun run capture` in `studio/`, or the in-app capture ([in-app-studio.md](in-app-studio.md)), which adds phone and desktop widths and motion clips.
2. Fix capture gaps first. An identical pair means the setup never exercises the option, or the option does nothing. Recapture those steps with `--step`. Options that only differ in the other theme can flag in one theme. The interaction branch uses explicit filmstrip states so its options remain distinguishable in reduced-motion captures; judge timing and interruptibility live with replay as well.
3. Reviewers read the contact sheet (`capture/index.html`) and the shots, and the clips or a live replay for motion steps.
4. Cut true twinges and rule collisions, and make options that look alike visibly different. When reviewers disagree with a recommendation or a cut, record it on the step ("the craft review would cut this"); the user settles it in the studio.
5. Recapture what changed and confirm the flagged pairs are gone.

Review is done when every step's options are visibly different in the capture, the studio logged no errors, and each finding is applied or recorded on its step.
