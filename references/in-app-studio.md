# In-app studio

The generic studio in `studio/` renders specimens and a sample shell from `content.json`, which settles the style axes. Product axes, such as how the product's core surface is composed or where added content appears, can only be judged on the product's own surfaces. Build the studio into the product as a dev-only layer:

- once the product's frontend exists or is being built, and the tree has product axes;
- when rebuilding an existing frontend, so options are judged on its real routes.

Before that point, walk the style axes in the generic studio and carry the export over.

## Contract

- **Design config.** One typed object with a key per step, read by the real components through context, CSS variables or `data-design-*` attributes. Each option is a value of its key. Tokens resolve into the product's existing token roles, so a radius or density choice reaches every corner and row.
- **Dev-only gate.** The panel mounts only in development, behind an env flag plus a URL parameter such as `?studio`. A test proves production builds exclude it.
- **Fixtures.** A fixture mode runs every surface without the backend, with every state a step changes: first run, empty, loading, populated with realistic counts, error and permission, plus each interaction the options differ on (a selection, an open menu, pending → done).
- **Panel.** The generic studio's controls (hover preview, `1–9`, step navigation, presets, A/B pins and compare, light and dark), plus viewport frames that render the route in an iframe at phone, laptop and desktop widths, a surface picker, motion replay, a reduced-motion toggle, and a status and note per step. The panel always keeps a visible handle to reopen it.
- **State file.** A dev-server endpoint reads and writes a gitignored JSON file (choices, notes, status, copy edits) and broadcasts changes to every open tab. The agent reads the file, so the user never has to export to be heard. `studio/scripts/state-plugin.ts` is a minimal version.
- **Copy mode.** Strings render from the copy deck. In studio mode they can be edited in place, and the export writes them back to the deck.
- **Export.** The single source of truth: the config the app boots with, a decisions document with the notes, and the brief's Design section written between markers.
- **Capture.** A script renders every option of every step on its surfaces at phone and desktop widths, in both themes, with short clips for motion steps. It reports identical pairs, with the reason when a step legitimately doesn't apply (a desktop-only step at phone width), and motion options whose clips don't move. `studio/scripts/capture.ts` is the generic version.
- **Tests.** Components render in tests with an explicit design config; tests that read the exported defaults break whenever the user decides.
- **Lock-in.** As in [rounds.md](rounds.md): decided keys leave the config, and the code for the options not picked is deleted.

Serving follows [rounds.md](rounds.md): bind an address the reviewer's machine can reach, avoid secure-context-only APIs, and serve a frozen worktree.
