import { useState } from "react";
import { useGallery } from "@/gallery/context";
import { MOTION_LANGUAGES } from "@/tokens/motion";
import { Button } from "@/ui";
import { Filmstrip, FilmstripNote, LivePreview } from "./film";
import { SpecimenFrame, StateLabel, interactionOptionLabel } from "./shared";

export function RouteMotionSpecimen() {
  const { choices, content } = useGallery();
  const [back, setBack] = useState(false);
  const language = MOTION_LANGUAGES[choices.motion] ?? MOTION_LANGUAGES.snappy!;
  const duration = choices.routeMotion === "cut" ? 0 : language.route;
  const scene = (value: number) => {
    const progress = Math.min(1, Math.max(0, value));
    const p = back ? 1 - progress : progress;
    const cut = choices.routeMotion === "cut";
    const axis = choices.routeMotion === "axis";
    return (
      <div className="h-60">
        <div className="flex h-9 items-center gap-2 border-b border-border bg-muted px-3 text-chrome"><span className="size-2 rounded-full bg-primary" />{content.product.name}<span className="ml-auto text-muted-foreground">Shell</span></div>
        <div className="relative h-48 overflow-hidden p-3">
          <div className="absolute inset-3" style={{ opacity: cut ? Number(p < 1) : 1 - p, transform: axis ? `translateX(${-32 * p}px)` : undefined }}><StateLabel>{content.app.page.title}</StateLabel>{content.app.items.slice(0, 3).map((item, i) => <div key={item.title} className={`mb-2 truncate rounded-md border border-border p-2 text-chrome ${i === 0 ? "bg-accent-soft text-accent-text" : "bg-card"}`}>{item.title}</div>)}</div>
          <div className="absolute inset-3 rounded-lg border border-border bg-card p-3" style={{ opacity: cut ? Number(p >= 1) : p, transform: axis ? `translateX(${32 * (1 - p)}px)` : undefined }}><StateLabel>Detail page</StateLabel><div className="mt-10 text-chrome text-muted-foreground">{content.app.items[0]?.meta ?? content.product.tagline}</div><div className="mt-4 h-2 w-3/4 rounded bg-muted" /><div className="mt-2 h-2 w-1/2 rounded bg-muted" /></div>
          {choices.routeMotion === "continuity" ? <div className="absolute flex items-center overflow-hidden rounded-md border border-border bg-accent-soft px-2 text-chrome text-accent-text" style={{ left: 12, top: 30 - 12 * p, width: `calc(100% - 24px)`, height: 34 + 36 * p }}>{content.app.items[0]?.title ?? content.app.page.title}</div> : null}
        </div>
      </div>
    );
  };
  return (
    <SpecimenFrame caption="Route motion" detail={`${interactionOptionLabel("routeMotion", choices.routeMotion)} · ${duration} ms`}>
      <FilmstripNote />
      <div className="mb-3 flex flex-wrap items-center justify-between gap-2"><StateLabel>{back ? "Back to the previous view" : "Open an item"} · the shell does not move</StateLabel><Button variant="outline" size="sm" onClick={() => setBack((v) => !v)}>{back ? "Show forward" : "Show back"}</Button></div>
      <Filmstrip duration={duration} easing={language.change} render={scene} geometryOnly={duration === 0 && choices.routeMotion !== "cut"} />
      <LivePreview duration={duration} easing={language.change} render={scene} label="Replay navigation" />
      <p className="mt-4 text-chrome text-muted-foreground">Continuity tracks the one item the user opened into its detail heading; production uses its measured bounds, not this schematic. Update the title and route focus after navigation. If the item cannot be matched, ordinary page feedback still carries the navigation; no invented shared element is required.</p>
    </SpecimenFrame>
  );
}
