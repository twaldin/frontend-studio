import { useState, type ComponentType, type ReactNode } from "react";
import { ShellPreview } from "@/gallery/app";
import { useGallery } from "@/gallery/context";
import type { StepId } from "@/tree/types";
import { Button } from "@/ui";
import { Background } from "./Background";
import { Frame } from "./Frames";
import { displayClass, displayStyle } from "./helpers";
import { Pieces } from "./Pieces";
import { LandingHero } from "./LandingHero";

function SpecimenShell({ caption, children }: { caption: ReactNode; children: ReactNode }) {
  return (
    <section className="mx-auto w-full max-w-[1152px] bg-background p-4 text-foreground">
      <div className="mb-4 flex min-h-8 items-center justify-between gap-4 text-chrome text-muted-foreground tabular">
        {caption}
      </div>
      {children}
    </section>
  );
}

const displayDetails: Record<string, { label: string; weight: number; tracking: string }> = {
  same: { label: "Same face", weight: 500, tracking: "−2%" },
  heavy: { label: "Heavy", weight: 650, tracking: "−3%" },
  mono: { label: "Mono", weight: 500, tracking: "−1%" },
  giant: { label: "Giant display", weight: 700, tracking: "−4.5%" },
  lower: { label: "Lowercase", weight: 500, tracking: "−2%" },
};

function DisplaySpecimen() {
  const { choices, content } = useGallery();
  const details = displayDetails[choices.display] ?? displayDetails.same!;
  const firstWords = content.landing.h1.split(/\s+/).slice(0, 3).join(" ");
  const cropStyle = { ...displayStyle(choices.display, true), fontSize: "96px" };

  return (
    <SpecimenShell
      caption={(
        <>
          <span>Hero display · {details.label}</span>
          <span>Weight {details.weight} · tracking {details.tracking}</span>
        </>
      )}
    >
      <div className="rounded-xl border border-border-card bg-card p-10 shadow-sm">
        <h1
          className={`max-w-[960px] text-balance text-foreground ${displayClass(choices.display, choices.displayCase)}`}
          style={displayStyle(choices.display)}
        >
          {content.landing.h1}
        </h1>
        <p className="mt-6 max-w-[650px] text-[19px] leading-[1.6] text-muted-foreground">{content.landing.sub}</p>
        <div className="mt-10 border-t border-border pt-8">
          <div className="mb-4 text-chrome text-muted-foreground">96 px crop · first three words</div>
          <div className={`truncate text-foreground ${displayClass(choices.display, choices.displayCase)}`} style={cropStyle}>
            {firstWords}
          </div>
        </div>
      </div>
    </SpecimenShell>
  );
}

const motionDetails: Record<string, string> = {
  static: "Static · no duration",
  entrance: "Entrance · 500 ms · 90 ms stagger",
  ambient: "Ambient · 12–18 s loops",
  scroll: "Scroll-linked · 0.92–1 scale · 8° rotation",
  interactive: "Interactive · cursor spring, 80 stiffness / 18 damping",
};

function HeroMotionSpecimen() {
  const { choices } = useGallery();
  const [replay, setReplay] = useState(0);

  return (
    <SpecimenShell
      caption={(
        <>
          <span>{motionDetails[choices.heroMotion] ?? choices.heroMotion}</span>
          <Button variant="outline" size="sm" onClick={() => setReplay((value) => value + 1)}>Replay</Button>
        </>
      )}
    >
      <div className="overflow-hidden rounded-xl border border-border-card bg-background">
        <LandingHero key={replay} />
      </div>
    </SpecimenShell>
  );
}

const backgroundDetails: Record<string, string> = {
  flat: "Flat · canvas only",
  glow: "Glow · accent stop 18% · transparent by 68%",
  grid: "Grid · 40 px pitch · 60% layer opacity · radial mask",
  grain: "Grain · 145° gradient · 6% noise opacity · 0.82 frequency",
  scene: "Scene · three layered shapes · hairline horizon",
};

function BackgroundSpecimen() {
  const { choices, content } = useGallery();

  return (
    <SpecimenShell caption={<span>{backgroundDetails[choices.background] ?? choices.background}</span>}>
      <div className="relative mx-auto flex h-[360px] w-[1120px] max-w-full items-center justify-center overflow-hidden rounded-xl border border-border-card bg-background px-10">
        <Background />
        <h1
          className={`relative z-10 max-w-[900px] text-center text-balance text-foreground ${displayClass(choices.display, choices.displayCase)}`}
          style={displayStyle(choices.display)}
        >
          {content.landing.h1}
        </h1>
      </div>
    </SpecimenShell>
  );
}

const frameLabels: Record<string, string> = {
  none: "Bare product frame",
  browser: "Browser frame",
  laptop: "Laptop frame",
  phone: "Phone frame",
};

function FrameSpecimen() {
  const { choices } = useGallery();
  const phone = choices.frames === "phone";
  const scale = phone ? 0.32 : choices.frames === "laptop" ? 0.76 : 0.8;
  const previewWidth = Math.round(1120 * scale);

  return (
    <SpecimenShell caption={<span>{frameLabels[choices.frames] ?? choices.frames} · {previewWidth} px preview</span>}>
      <div className="mx-auto max-w-[900px]">
        <Frame kind={choices.frames} scaled={false}>
          <ShellPreview scale={scale} />
        </Frame>
      </div>
    </SpecimenShell>
  );
}

const characterLabels: Record<string, string> = {
  none: "No floating pieces",
  icons: "Floating product icons",
  characters: "Walking and mining characters",
  shapes: "Abstract product shapes",
};

function CharactersSpecimen() {
  const { choices } = useGallery();

  return (
    <SpecimenShell
      caption={(
        <>
          <span>{characterLabels[choices.characters] ?? choices.characters}</span>
          <span>1.5× scale · cursor parallax · live cycles</span>
        </>
      )}
    >
      <div className="relative mx-auto h-[320px] w-[1120px] max-w-full overflow-hidden rounded-xl border border-border-card bg-background">
        <Pieces preview className="origin-center scale-150" />
      </div>
    </SpecimenShell>
  );
}

export const LANDING_SPECIMENS: Partial<Record<StepId, ComponentType>> = {
  display: DisplaySpecimen,
  displayCase: DisplaySpecimen,
  heroMotion: HeroMotionSpecimen,
  background: BackgroundSpecimen,
  frames: FrameSpecimen,
  characters: CharactersSpecimen,
};
