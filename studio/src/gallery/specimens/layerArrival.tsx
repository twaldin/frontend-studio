import { useGallery } from "@/gallery/context";
import { MOTION_LANGUAGES } from "@/tokens/motion";
import { layerFrame } from "@/tokens/axes/layerArrival";
import { Filmstrip, FilmstripNote, LivePreview } from "./film";
import { SpecimenFrame, StateLabel, interactionOptionLabel } from "./shared";

export function LayerArrivalSpecimen() {
  const { choices, content } = useGallery();
  const language = MOTION_LANGUAGES[choices.motion] ?? MOTION_LANGUAGES.snappy!;
  const duration = choices.layerArrival === "cut" ? 0 : language.layer;
  const scene = (p: number) => (
    <div className="relative h-52 p-3">
      <div className="inline-block rounded-[var(--radius-control)] border border-input bg-card px-2 py-1 text-chrome">{content.app.page.action} ▾</div>
      <div className="absolute top-11 left-3 right-3 rounded-popover border border-border bg-popover p-2 shadow-lg" style={layerFrame(choices.layerArrival, p)}>
        {content.app.nav.slice(0, 3).map((item, i) => <div key={item.label} className={`truncate rounded-md px-2 py-2 text-chrome ${i === 1 ? "bg-accent-soft text-accent-text" : "text-popover-foreground"}`}>{item.label}</div>)}
      </div>
      <div className="absolute bottom-3 left-3 text-chrome text-muted-foreground">Trigger stays put</div>
    </div>
  );
  return (
    <SpecimenFrame caption="Layer arrival" detail={`${interactionOptionLabel("layerArrival", choices.layerArrival)} · ${duration} ms · ${choices.motion}`}>
      <FilmstripNote />
      <StateLabel>Opening from the trigger · fade, scale, travel or an unrolling edge</StateLabel>
      <Filmstrip duration={duration} easing={language.enter} render={scene} geometryOnly={duration === 0 && choices.layerArrival !== "cut"} />
      <LivePreview duration={duration} easing={language.enter} render={scene} label="Replay opening" />
      <div className="mt-5 grid gap-4 sm:grid-cols-3">
        <div className="rounded-lg border border-border p-4"><StateLabel>Open</StateLabel><strong className="text-body">Ready for input</strong><p className="mt-2 text-chrome text-muted-foreground">Focus moves only when required by the layer's role; a menu and a modal have different focus contracts.</p></div>
        <div className="rounded-lg border border-border p-4"><StateLabel>Dismiss</StateLabel><strong className="text-body">Escape / outside click</strong><p className="mt-2 text-chrome text-muted-foreground">Use the reverse geometry with the exit curve. Return focus to the initiating control.</p></div>
        <div className="rounded-lg border border-border p-4"><StateLabel>Reduced motion / frequent path</StateLabel><strong className="text-body">Immediate arrival</strong><p className="mt-2 text-chrome text-muted-foreground">The final layer is fully visible; no opacity or clipping hides its content.</p></div>
      </div>
      <p className="mt-4 text-chrome text-muted-foreground">Cut is the universal baseline; the other four arrivals are the record's variants. A Still language makes every arrival immediate while retaining your selected geometry for moving languages.</p>
    </SpecimenFrame>
  );
}
