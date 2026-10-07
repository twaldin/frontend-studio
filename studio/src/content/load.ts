import { useEffect, useState } from "react";

export interface LoadedContent {
  /** The project's copy deck, possibly partial; the caller merges it over the archetype's sample content. */
  project: unknown;
  /** `default`, a path under the studio's public dir (`/content.json`), or an absolute http(s) URL. */
  source: string;
}

/**
 * Project copy: `?content=<url>` wins, then `/content.json` in the studio's
 * public dir, else none and the archetype's sample content shows as is. Partial
 * JSON deep-merges over the sample content, so a project can supply only the
 * landing block. The file is re-read every few seconds and on focus, so edits
 * show without a reload.
 */
export function useContent(): LoadedContent {
  const [loaded, setLoaded] = useState<LoadedContent>({ project: null, source: "default" });
  useEffect(() => {
    // A queryless same-origin source stays a path into public/; anything else (another origin,
    // `//cdn…/copy.json`, an endpoint with a query) becomes the absolute URL, so `bun run export`
    // reads the file or repeats the same request.
    let url: string;
    try {
      const resolved = new URL(new URLSearchParams(location.search).get("content") ?? "/content.json", location.href);
      url = resolved.origin === location.origin && !resolved.search ? resolved.pathname : resolved.href;
    } catch {
      return; // A malformed `?content=`: the default content stays.
    }
    let last = "";
    let cancelled = false;
    const load = async () => {
      try {
        const r = await fetch(url, { cache: "no-store" });
        if (!r.ok || !r.headers.get("content-type")?.includes("json")) return;
        const text = await r.text();
        if (cancelled || text === last) return;
        last = text;
        setLoaded({ project: JSON.parse(text), source: url });
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
