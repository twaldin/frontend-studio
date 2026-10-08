import { useEffect, useRef, useState, type ReactNode } from "react";
import { easeAt } from "@/tokens/motion";
import { Button, cn } from "@/ui";

/** Computed, fixed-time samples of the chosen easing, never a claim of recorded browser timing. */
export function Filmstrip({ duration, easing, frames = 5, render, className, geometryOnly = false }: {
  duration: number;
  easing: string;
  frames?: number;
  render: (progress: number) => ReactNode;
  className?: string;
  /** A normalized geometry study when the active Still language has no intermediate times. */
  geometryOnly?: boolean;
}) {
  const count = Math.max(2, frames);
  const times = duration > 0 || geometryOnly ? Array.from({ length: count }, (_, i) => i / (count - 1)) : [0, 1];
  return (
    <div className={cn("grid gap-2", className)} style={{ gridTemplateColumns: `repeat(${times.length}, minmax(0, 1fr))` }}>
      {times.map((t) => (
        <figure key={t} className="flex min-w-0 flex-col gap-1.5">
          <div className="relative overflow-hidden rounded-md border border-border bg-background">{render(duration > 0 ? easeAt(easing, t) : t)}</div>
          <figcaption className="tabular text-center text-chrome text-muted-foreground">{geometryOnly ? `${Math.round(t * 100)}% geometry` : duration > 0 ? `${Math.round(t * duration)} ms` : t === 0 ? "Before" : "After · instant"}</figcaption>
        </figure>
      ))}
    </div>
  );
}

/** Replay only when requested. Reduced-motion replays show the destination immediately. */
export function LivePreview({ duration, easing, render, label = "Replay" }: {
  duration: number;
  easing: string;
  render: (progress: number) => ReactNode;
  label?: string;
}) {
  const [replay, setReplay] = useState(0);
  const [progress, setProgress] = useState(1);
  const [message, setMessage] = useState("Live preview · ready");
  const renderRef = useRef(0);
  useEffect(() => {
    if (replay === 0) return;
    const reduced = matchMedia("(prefers-reduced-motion: reduce)");
    const finish = () => {
      cancelAnimationFrame(renderRef.current);
      setProgress(1);
      setMessage(reduced.matches ? "Reduced motion · switched instantly" : duration === 0 ? "Cut · switched instantly" : "Replay complete");
    };
    if (duration === 0 || reduced.matches) { finish(); return; }
    setProgress(0);
    setMessage("Replaying the selected timing");
    let start: number | undefined;
    const tick = (now: number) => {
      start ??= now;
      const t = Math.min(1, (now - start) / duration);
      setProgress(easeAt(easing, t));
      if (t < 1) renderRef.current = requestAnimationFrame(tick);
      else finish();
    };
    renderRef.current = requestAnimationFrame(tick);
    const onPreference = () => { if (reduced.matches) finish(); };
    reduced.addEventListener("change", onPreference);
    return () => { cancelAnimationFrame(renderRef.current); reduced.removeEventListener("change", onPreference); };
  }, [replay, duration, easing]);
  return (
    <div className="mt-4 rounded-lg border border-border bg-card p-4">
      <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
        <span role="status" className="text-chrome text-muted-foreground">{message}</span>
        <Button variant="outline" size="sm" onClick={() => setReplay((n) => n + 1)}>{label}</Button>
      </div>
      <div className="mx-auto max-w-[340px] overflow-hidden rounded-md border border-border bg-background">{render(progress)}</div>
    </div>
  );
}

export function FilmstripNote() {
  return <p className="mb-5 text-chrome text-muted-foreground">Computed snapshots, not a recording. Time labels sample the selected duration and curve. With a Still language, moving options instead show a percentage-labeled geometry study, not an active transition; Cut has only before and after. Live replay respects reduced motion.</p>;
}
