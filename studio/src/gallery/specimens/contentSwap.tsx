import { useGallery } from "@/gallery/context";
import { MOTION_LANGUAGES } from "@/tokens/motion";
import { swapFrame } from "@/tokens/axes/contentSwap";
import { Filmstrip, FilmstripNote, LivePreview } from "./film";
import { SpecimenFrame, StateLabel, interactionOptionLabel } from "./shared";

export function ContentSwapSpecimen() {
  const { choices, content } = useGallery();
  const language = MOTION_LANGUAGES[choices.motion] ?? MOTION_LANGUAGES.snappy!;
  const duration = choices.contentSwap === "cut" ? 0 : language.swap;
  const scene = (p: number) => (
    <div className="h-56 p-3">
      <div className="mb-3 flex gap-3 text-chrome"><span className={p < .5 ? "font-semibold text-accent-text" : "text-muted-foreground"}>All</span><span className={p >= .5 ? "font-semibold text-accent-text" : "text-muted-foreground"}>Saved</span></div>
      <div className="relative overflow-hidden rounded-md border border-border bg-card" style={{ height: choices.contentSwap === "resize" ? 90 + 70 * Math.min(1, Math.max(0, p)) : 160 }}>
        <div className="absolute inset-0 p-3" style={swapFrame(choices.contentSwap, p, false)}><div className="text-body font-medium">{content.app.items[0]?.title ?? content.app.page.title}</div><div className="mt-2 text-chrome text-muted-foreground">All results · 1 item</div></div>
        <div className="absolute inset-0 p-3" style={swapFrame(choices.contentSwap, p, true)}>{content.app.items.slice(1, 4).map((item) => <div key={item.title} className="mb-2 truncate border-b border-border pb-2 text-chrome">{item.title}</div>)}<div className="text-chrome text-accent-text">Saved results</div></div>
      </div>
    </div>
  );
  return (
    <SpecimenFrame caption="Content swap" detail={`${interactionOptionLabel("contentSwap", choices.contentSwap)} · ${duration} ms`}>
      <FilmstripNote />
      <StateLabel>Switching a result view · shell and initiating control stay put</StateLabel>
      <Filmstrip duration={duration} easing={language.change} render={scene} geometryOnly={duration === 0 && choices.contentSwap !== "cut"} />
      <LivePreview duration={duration} easing={language.change} render={scene} label="Replay swap" />
      <p className="mt-4 text-chrome text-muted-foreground">Resize uses illustrative 90 → 160 px bounds here; production view transitions measure the real content. The resize and fade occupy one duration, with new content settling in the second half. Slide reverses on back/previous. Keep current results during a real request and show failures where the filter can be retried.</p>
    </SpecimenFrame>
  );
}
