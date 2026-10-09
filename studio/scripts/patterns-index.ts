/** Generate references/patterns/index.json from record headers, or fail on drift with --check. */
import { readFile, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { readPatternCatalog } from "../src/model/patterns";

const args = process.argv.slice(2);
if (args.length > 1 || (args.length === 1 && args[0] !== "--check")) {
  console.error("Usage: bun run patterns:index [--check]");
  process.exitCode = 1;
} else {
  try {
    const directory = fileURLToPath(new URL("../../references/patterns/", import.meta.url));
    const catalog = await readPatternCatalog(directory);
    const records = Object.keys(catalog).sort().map((id) => catalog[id]!);
    const generated = `${JSON.stringify({ version: 1, records }, null, 2)}\n`;
    const destination = new URL("../../references/patterns/index.json", import.meta.url);
    if (args[0] === "--check") {
      let existing: string | undefined;
      try {
        existing = await readFile(destination, "utf8");
      } catch (error) {
        if ((error as NodeJS.ErrnoException).code !== "ENOENT") throw error;
      }
      if (existing !== generated) {
        console.error("references/patterns/index.json is missing or out of date; run bun run patterns:index in studio/.");
        process.exitCode = 1;
      } else console.log(`references/patterns/index.json is current (${records.length} records)`);
    } else {
      await writeFile(destination, generated);
      console.log(`wrote references/patterns/index.json (${records.length} records)`);
    }
  } catch (error) {
    console.error(error instanceof Error ? error.message : String(error));
    process.exitCode = 1;
  }
}
