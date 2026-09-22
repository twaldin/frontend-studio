import { useEffect, useState } from "react";
import { DEFAULT_CONTENT } from "./default";
import type { Content } from "./schema";

/**
 * Project copy: `?content=<url>` wins, then `/content.json` in the studio's
 * public dir, then the generic default. Partial JSON deep-merges over the
 * default so a project can supply only the landing block. The file is
 * re-read every few seconds and on focus, so edits show without a reload.
 */
function merge<T>(base: T, over: unknown): T {
  if (!over || typeof over !== "object" || Array.isArray(over)) return (over as T) ?? base;
  const out: Record<string, unknown> = { ...(base as Record<string, unknown>) };
  for (const [k, v] of Object.entries(over as Record<string, unknown>)) {
    const b = out[k];
    out[k] = b && typeof b === "object" && !Array.isArray(b) && v && typeof v === "object" && !Array.isArray(v) ? merge(b, v) : v;
  }
  return out as T;
}

export interface LoadedContent {
  content: Content;
  source: string;
}

export function useContent(): LoadedContent {
  const [loaded, setLoaded] = useState<LoadedContent>({ content: DEFAULT_CONTENT, source: "default" });
  useEffect(() => {
    const url = new URLSearchParams(location.search).get("content") ?? "/content.json";
    let last = "";
    let cancelled = false;
    const load = async () => {
      try {
        const r = await fetch(url, { cache: "no-store" });
        if (!r.ok || !r.headers.get("content-type")?.includes("json")) return;
        const text = await r.text();
        if (cancelled || text === last) return;
        last = text;
        setLoaded({ content: merge(DEFAULT_CONTENT, JSON.parse(text)), source: url });
      } catch {
        // The default content stays in place.
      }
    };
    void load();
    const timer = setInterval(() => {
      if (document.visibilityState === "visible") void load();
    }, 4000);
    window.addEventListener("focus", load);
    return () => {
      cancelled = true;
      clearInterval(timer);
      window.removeEventListener("focus", load);
    };
  }, []);
  return loaded;
}
