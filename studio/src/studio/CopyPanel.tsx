import { useMemo, useState } from "react";
import type { Content } from "@/content/schema";
import { copyFields } from "@/content/copy";
import type { Studio } from "./state";

/**
 * Every string in the content, editable beside the gallery. Edits overlay the
 * loaded content.json, so the gallery shows them at once; they persist with
 * the walk and export as content.json for the copy deck.
 */
export function CopyPanel({ studio, content }: { studio: Studio; content: Content }) {
  const [query, setQuery] = useState("");
  const [editedOnly, setEditedOnly] = useState(false);
  const fields = useMemo(() => copyFields(content), [content]);
  const edits = studio.record.copy;
  const editCount = Object.keys(edits).length;
  const q = query.trim().toLowerCase();
  const shown = fields.filter(
    (f) => (!editedOnly || f.path in edits) && (!q || f.path.toLowerCase().includes(q) || (edits[f.path] ?? f.text).toLowerCase().includes(q)),
  );

  return (
    <aside className="flex h-full w-[420px] shrink-0 flex-col border-r border-[var(--studio-line)] bg-[var(--studio-panel)]">
      <div className="flex flex-col gap-2 border-b border-[var(--studio-line)] p-3">
        <input
          aria-label="Filter copy"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Filter by text or path"
          className="rounded-md border border-[var(--studio-line)] bg-transparent px-2.5 py-1.5 text-[12px] text-[var(--studio-fg)] placeholder:text-[var(--studio-muted)] focus:border-[var(--studio-muted)] focus:outline-none"
        />
        <label className="flex items-center gap-2 text-[12px] text-[var(--studio-muted)]">
          <input type="checkbox" checked={editedOnly} onChange={(e) => setEditedOnly(e.target.checked)} />
          Edited only ({editCount})
        </label>
      </div>
      <ol className="flex min-h-0 flex-1 flex-col gap-3 overflow-y-auto p-3">
        {shown.map((f) => {
          const value = edits[f.path] ?? f.text;
          const edited = f.path in edits;
          return (
            <li key={f.path} className="flex flex-col gap-1">
              <div className="flex items-center gap-2 text-[11px] text-[var(--studio-muted)]">
                <span className={`truncate font-mono ${edited ? "text-[var(--studio-accent)]" : ""}`}>{f.path}</span>
                {edited ? (
                  <button className="ml-auto shrink-0 hover:text-[var(--studio-fg)]" onClick={() => studio.setCopy(f.path, undefined)}>
                    Revert
                  </button>
                ) : null}
              </div>
              <textarea
                aria-label={f.path}
                value={value}
                rows={value.length > 60 ? 3 : 1}
                onChange={(e) => studio.setCopy(f.path, e.target.value === f.text ? undefined : e.target.value)}
                className="w-full resize-y rounded-md border border-[var(--studio-line)] bg-transparent px-2.5 py-1.5 text-[12px] leading-[1.45] text-[var(--studio-fg)] focus:border-[var(--studio-muted)] focus:outline-none"
              />
            </li>
          );
        })}
        {shown.length === 0 ? <li className="text-[12px] text-[var(--studio-muted)]">No strings match.</li> : null}
      </ol>
    </aside>
  );
}
