import { useRef } from "react";
import type { StepId } from "@/tree/types";
import { Cta } from "./Cta";
import { Hero } from "./Hero";
import { Nav } from "./Nav";
import { Proof } from "./Proof";
import { Sections } from "./Sections";

export function LandingGallery() {
  const scrollRef = useRef<HTMLDivElement>(null);

  return (
    <div
      ref={scrollRef}
      data-landing-scroll
      className="mx-auto min-h-[560px] w-full max-w-[1200px] overscroll-contain overflow-y-auto bg-background text-foreground"
      style={{ height: "calc(100vh - 112px)" }}
    >
      <Nav />
      <main>
        <div id="landing-hero">
          <Hero scrollContainer={scrollRef} />
        </div>
        <div id="landing-proof">
          <Proof />
        </div>
        <div id="landing-sections">
          <Sections />
        </div>
        <div id="landing-cta">
          <Cta />
        </div>
      </main>
    </div>
  );
}

export function scrollTargetId(step: StepId): string | null {
  if (step === "cta") return "landing-cta";
  if (step === "proof") return "landing-proof";
  if (step === "rhythm" || step === "frames") return "landing-sections";
  if (
    step === "register"
    || step === "display"
    || step === "displayCase"
    || step === "hero"
    || step === "heroMotion"
    || step === "background"
    || step === "characters"
  ) {
    return "landing-hero";
  }
  return null;
}

export { Frame } from "./Frames";
export { LandingHero } from "./LandingHero";
export { LANDING_SPECIMENS } from "./Specimens";
