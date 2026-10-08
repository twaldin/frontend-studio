import { useState } from "react";
import { useGallery } from "@/gallery/context";
import { MOTION_LANGUAGES } from "@/tokens/motion";
import { controlFrame } from "@/tokens/axes/controlResponse";
import { Button } from "@/ui";
import { Filmstrip, FilmstripNote, LivePreview } from "./film";
import { SpecimenFrame, StateLabel, interactionOptionLabel } from "./shared";

export function ControlResponseSpecimen() {
  const { choices, content } = useGallery();
  const [pressed, setPressed] = useState(0);
  const language = MOTION_LANGUAGES[choices.motion] ?? MOTION_LANGUAGES.snappy!;
  const scene = (p: number) => (
    <div className="grid h-32 place-items-center p-3">
      <div className="relative isolate max-w-full overflow-hidden rounded-[var(--radius-control)] bg-primary px-4 py-3 text-chrome font-medium text-primary-foreground shadow-[var(--button-edge)]" style={controlFrame(choices.controlResponse, Math.min(1, Math.max(0, p)))}>
        <span className="relative">{content.app.form.submit}</span>
        {choices.controlResponse === "ink" ? <span className="pointer-events-none absolute inset-0 bg-current opacity-[.18]" style={{ clipPath: `circle(${75 * Math.min(1, Math.max(0, p))}% at 50% 50%)` }} /> : null}
      </div>
    </div>
  );
  return (
    <SpecimenFrame caption="Control response" detail={`${interactionOptionLabel("controlResponse", choices.controlResponse)} · ${language.press} ms press`}>
      <FilmstripNote />
      <StateLabel>Rest → held · no waiting for the request</StateLabel>
      <Filmstrip duration={language.press} easing={language.change} render={scene} geometryOnly={language.press === 0} />
      <LivePreview duration={language.press} easing={language.change} render={scene} label="Replay press" />
      <div className="mt-5 flex flex-wrap items-center gap-5 rounded-lg border border-border bg-card p-5">
        <div><StateLabel>Try the real press / release</StateLabel><Button onClick={() => setPressed((n) => n + 1)}>{content.app.form.submit}</Button></div>
        <div><StateLabel>Disabled</StateLabel><Button disabled>{content.app.form.submit}</Button></div>
        <div><StateLabel>Keyboard focus</StateLabel><Button preview="focus">{content.app.form.cancel}</Button></div>
        <p role="status" className="text-chrome text-muted-foreground">{pressed ? `Demo control activated ${pressed} time${pressed === 1 ? "" : "s"}. No request was sent.` : "Press and release, or focus and use Space."}</p>
      </div>
      <p className="mt-4 text-chrome text-muted-foreground">Release restores the resting face. Reduced motion removes travel while retaining a tonal acknowledgment; disabled controls do not respond. Feedback does not imply the operation succeeded.</p>
    </SpecimenFrame>
  );
}
