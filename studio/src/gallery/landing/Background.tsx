import { useId } from "react";
import { motion, useReducedMotion } from "motion/react";
import { useGallery } from "@/gallery/context";

export function Background() {
  const { choices } = useGallery();
  const reducedMotion = useReducedMotion();
  const grainId = useId();
  const canAnimate = !reducedMotion && choices.heroMotion !== "static";
  const ambient = canAnimate && choices.heroMotion === "ambient";

  if (choices.background === "flat") return null;

  if (choices.background === "glow") {
    return (
      <motion.div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at 50% 34%, color-mix(in srgb, var(--primary) 18%, transparent) 0%, color-mix(in srgb, var(--background) 0%, transparent) 68%)",
        }}
        animate={ambient ? { x: [0, 24, -16, 0], y: [0, -14, 12, 0], scale: [1, 1.06, 1.02, 1] } : undefined}
        transition={ambient ? { duration: 18, repeat: Infinity, ease: "easeInOut" } : undefined}
      />
    );
  }

  if (choices.background === "grid") {
    return (
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-60"
        style={{
          backgroundImage:
            "linear-gradient(var(--border) 1px, transparent 1px), linear-gradient(90deg, var(--border) 1px, transparent 1px)",
          backgroundSize: "40px 40px",
          maskImage: "radial-gradient(ellipse at 50% 32%, black 12%, transparent 72%)",
        }}
      />
    );
  }

  if (choices.background === "grain") {
    return (
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "linear-gradient(145deg, color-mix(in srgb, var(--accent-soft) 74%, var(--background)), var(--background) 58%, color-mix(in srgb, var(--muted) 70%, var(--background)))",
        }}
      >
        <svg className="absolute inset-0 h-full w-full opacity-[0.06]" preserveAspectRatio="none">
          <filter id={grainId}>
            <feTurbulence type="fractalNoise" baseFrequency="0.82" numOctaves="4" stitchTiles="stitch" />
          </filter>
          <rect width="100%" height="100%" fill="var(--foreground)" filter={`url(#${grainId})`} />
        </svg>
      </div>
    );
  }

  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="absolute inset-x-[-8%] bottom-[-24%] h-[55%] rounded-full bg-muted" />
      <div className="absolute bottom-[-31%] left-[-15%] h-[52%] w-[72%] rotate-[-5deg] rounded-full bg-accent-soft" />
      <div className="absolute right-[-12%] bottom-[-36%] h-[58%] w-[68%] rotate-[7deg] rounded-full bg-card" />
      <div className="absolute inset-x-0 bottom-[25%] border-t border-border" />
    </div>
  );
}
