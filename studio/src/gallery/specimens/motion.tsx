import { useGallery } from "@/gallery/context";
import { MOTION_LANGUAGES, easeAt } from "@/tokens/motion";
import { Filmstrip, FilmstripNote, LivePreview } from "./film";
import { SpecimenFrame, StateLabel, interactionOptionLabel } from "./shared";
export function MotionSpecimen() {
  const { choices, content } = useGallery();
  const language = MOTION_LANGUAGES[choices.motion] ?? MOTION_LANGUAGES.snappy!;
  const scene = (p: number) => (
    <div className="relative h-36 p-3">
      <div className="mb-3 text-chrome text-muted-foreground">{content.app.page.title}</div>
      <div className="absolute top-14 left-3 right-3 h-10 rounded-md border border-dashed border-border" />
      <div className="absolute top-14 left-3 flex h-10 w-[62%] items-center truncate rounded-md border border-border bg-accent-soft px-2 text-chrome text-accent-text" style={{ transform: `translateX(${48 * p}%)` }}>{content.app.nav[1]?.label ?? content.product.name}</div>
      <div className="absolute bottom-3 left-3 text-chrome text-muted-foreground">{Math.round(p * 100)}% of travel</div>
    </div>
  );
  const points = Array.from({ length: 41 }, (_, i) => `${10 + i * 6},${100 - easeAt(language.change, i / 40) * 75}`).join(" ");
  return (
    <SpecimenFrame caption="Motion language" detail={`${interactionOptionLabel("motion", choices.motion)} · ${language.layer} ms layer / ${language.route} ms page`}>
      <FilmstripNote />
      <div className="mb-5 grid gap-4 sm:grid-cols-[280px_1fr]">
        <div className="rounded-lg border border-border bg-card p-3">
          <StateLabel>Timing curve · {choices.motion === "still" ? "a cut" : "change"}</StateLabel>
          <svg viewBox="0 0 270 120" className="h-28 w-full" role="img" aria-label={choices.motion === "still" ? "Instant change with no intermediate frames" : `Progress over time for ${choices.motion}; tactile can overshoot`}>
            <path d="M10 25V100H250" fill="none" stroke="var(--border)" />
            <polyline points={choices.motion === "still" ? "10,100 10,25 250,25" : points} fill="none" stroke="var(--primary)" strokeWidth="3" />
          </svg>
        </div>
        <div className="grid grid-cols-3 gap-2 rounded-lg border border-border bg-card p-4">
          {([ ["Press", language.press], ["Local", language.local], ["Layer", language.layer], ["Swap", language.swap], ["Route", language.route] ] as const).map(([name, ms]) => <div key={name}><StateLabel>{name}</StateLabel><div className="tabular text-body font-semibold">{ms} ms</div></div>)}
          <div className="col-span-3 break-words font-mono text-chrome text-muted-foreground">Change: {language.change}</div>
        </div>
      </div>
      <StateLabel>Same layout move · the language sets duration and curve</StateLabel>
      <Filmstrip duration={language.layer} easing={language.change} render={scene} />
      <LivePreview duration={language.layer} easing={language.change} render={scene} label="Replay layout move" />
      <p className="mt-4 text-chrome text-muted-foreground">The interaction axes decide geometry separately. Keyboard-triggered and frequent paths can opt into an instant update in every language. Still is the universal baseline; the four moving languages are the record's variants.</p>
    </SpecimenFrame>
  );
}
