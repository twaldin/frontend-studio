/**
 * Persists the studio's decision record (choices, notes, status, copy edits)
 * to a JSON file next to the studio, so the agent reads the user's picks and
 * notes directly instead of asking for an export. Dev server only.
 */
import type { IncomingMessage, ServerResponse } from "node:http";
import { mkdir, readFile, rename, writeFile } from "node:fs/promises";
import { dirname } from "node:path";
import type { Plugin } from "vite";
import { STATE_ROUTE } from "../src/studio/route.ts";

const MAX_BYTES = 1_000_000;

async function readBody(req: IncomingMessage): Promise<string> {
  let size = 0;
  const chunks: Buffer[] = [];
  for await (const chunk of req as AsyncIterable<Buffer>) {
    size += chunk.length;
    if (size > MAX_BYTES) throw new Error("state is larger than 1 MB");
    chunks.push(chunk);
  }
  return Buffer.concat(chunks).toString("utf8");
}

export function studioState(file: string): Plugin {
  // Writes run one at a time, in arrival order, so two tabs saving at once can't interleave.
  let writes: Promise<void> = Promise.resolve();
  let sequence = 0;
  const write = (state: object) => {
    const run = writes.then(async () => {
      await mkdir(dirname(file), { recursive: true });
      const tmp = `${file}.${process.pid}.${(sequence += 1)}.tmp`;
      await writeFile(tmp, `${JSON.stringify(state, null, 2)}\n`);
      await rename(tmp, file);
    });
    writes = run.catch(() => {});
    return run;
  };

  const handle = async (req: IncomingMessage, res: ServerResponse) => {
    try {
      if (req.method === "GET") {
        await writes;
        const text = await readFile(file, "utf8").catch(() => "{}");
        res.setHeader("content-type", "application/json");
        res.setHeader("cache-control", "no-store");
        res.end(text);
      } else if (req.method === "PUT") {
        const parsed: unknown = JSON.parse(await readBody(req));
        if (!parsed || typeof parsed !== "object" || Array.isArray(parsed)) throw new Error("state must be a JSON object");
        await write(parsed);
        res.statusCode = 204;
        res.end();
      } else {
        res.statusCode = 405;
        res.end();
      }
    } catch (error) {
      res.statusCode = 400;
      res.end(error instanceof Error ? error.message : String(error));
    }
  };
  return {
    name: "frontend-studio-state",
    configureServer(server) {
      server.middlewares.use(STATE_ROUTE, (req, res) => void handle(req, res));
    },
  };
}
