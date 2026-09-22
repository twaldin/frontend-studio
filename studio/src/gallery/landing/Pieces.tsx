import { useEffect, type CSSProperties, type ReactNode } from "react";
import { Bot, Box, Cpu, Play, Shield, Terminal, Zap, type LucideIcon } from "lucide-react";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
  type MotionValue,
} from "motion/react";
import { useGallery } from "@/gallery/context";
import "./characters.css";

const icons: LucideIcon[] = [Box, Bot, Zap, Terminal, Shield, Play, Cpu];
const iconPositions = [
  "left-[4%] top-[20%]",
  "left-[13%] top-[66%]",
  "left-[27%] top-[10%]",
  "right-[25%] top-[14%]",
  "right-[13%] top-[68%]",
  "right-[4%] top-[28%]",
  "right-[34%] top-[78%]",
];
const shapes = [
  { position: "left-[5%] top-[18%] h-20 w-20", look: "rounded-full bg-accent-soft" },
  { position: "left-[17%] top-[70%] h-10 w-28", look: "rounded-xl bg-muted" },
  { position: "left-[34%] top-[8%] h-14 w-8", look: "rounded-lg bg-accent-soft" },
  { position: "right-[27%] top-[16%] h-12 w-24", look: "rounded-full bg-muted" },
  { position: "right-[8%] top-[36%] h-24 w-24", look: "rounded-xl bg-accent-soft" },
  { position: "right-[20%] top-[76%] h-8 w-16", look: "rounded-lg bg-muted" },
];

function Parallax({
  depth,
  x,
  y,
  children,
  className,
}: {
  depth: number;
  x: MotionValue<number>;
  y: MotionValue<number>;
  children: ReactNode;
  className?: string;
}) {
  const translatedX = useTransform(x, (value) => value * depth);
  const translatedY = useTransform(y, (value) => value * depth);

  return (
    <motion.div className={className} style={{ x: translatedX, y: translatedY }}>
      {children}
    </motion.div>
  );
}

function BlockCharacter({ className = "", mining = false }: { className?: string; mining?: boolean }) {
  return (
    <div className={`landing-character ${mining ? "landing-character--mining" : ""} ${className}`} aria-hidden="true">
      <div className="landing-character__figure">
        <div className="landing-character__head" />
        <div className="landing-character__body" />
        <div className="landing-character__arm landing-character__arm--left" />
        <div className="landing-character__arm landing-character__arm--right">
          {mining ? <div className="landing-character__pickaxe" /> : null}
        </div>
        <div className="landing-character__leg landing-character__leg--left" />
        <div className="landing-character__leg landing-character__leg--right" />
      </div>
    </div>
  );
}

export function Pieces({ className = "", preview = false }: { className?: string; preview?: boolean }) {
  const { choices } = useGallery();
  const reducedMotion = useReducedMotion();
  const canAnimate = !reducedMotion && (preview || choices.heroMotion !== "static");
  const ambient = !preview && canAnimate && choices.heroMotion === "ambient";
  const interactive = canAnimate && (preview || choices.heroMotion === "interactive" || choices.heroMotion === "interactiveScroll");
  const selected = choices.characters;
  const cursorX = useMotionValue(0);
  const cursorY = useMotionValue(0);
  const smoothX = useSpring(cursorX, { stiffness: 80, damping: 18 });
  const smoothY = useSpring(cursorY, { stiffness: 80, damping: 18 });

  useEffect(() => {
    if (!interactive) return;

    const move = (event: PointerEvent) => {
      cursorX.set((event.clientX / window.innerWidth - 0.5) * 36);
      cursorY.set((event.clientY / window.innerHeight - 0.5) * 28);
    };
    const reset = () => {
      cursorX.set(0);
      cursorY.set(0);
    };

    window.addEventListener("pointermove", move, { passive: true });
    window.addEventListener("blur", reset);
    return () => {
      window.removeEventListener("pointermove", move);
      window.removeEventListener("blur", reset);
    };
  }, [cursorX, cursorY, interactive]);

  if (selected === "none") return null;

  const drift = (index: number) =>
    ambient
      ? {
          y: [0, index % 2 === 0 ? -14 : 12, 0],
          rotate: [0, index % 2 === 0 ? 5 : -6, 0],
        }
      : undefined;
  const driftTransition = (index: number) =>
    ambient ? { duration: 12 + index, repeat: Infinity, ease: "easeInOut" as const } : undefined;

  if (selected === "icons") {
    return (
      <div aria-hidden="true" className={`pointer-events-none absolute inset-0 z-[1] ${className}`}>
        {icons.map((Icon, index) => (
          <Parallax
            key={Icon.displayName ?? index}
            className={`absolute ${iconPositions[index]}`}
            depth={0.35 + index * 0.08}
            x={smoothX}
            y={smoothY}
          >
            <motion.div
              className="grid h-12 w-12 place-items-center rounded-lg border border-border-card bg-card text-accent-text shadow-md"
              animate={drift(index)}
              transition={driftTransition(index)}
            >
              <Icon size={19} strokeWidth={choices.iconWeight === "regular" ? 2 : 1.5} />
            </motion.div>
          </Parallax>
        ))}
      </div>
    );
  }

  if (selected === "shapes") {
    return (
      <div aria-hidden="true" className={`pointer-events-none absolute inset-0 z-[1] overflow-hidden ${className}`}>
        {shapes.map((shape, index) => (
          <Parallax
            key={shape.position}
            className={`absolute ${shape.position}`}
            depth={0.24 + index * 0.09}
            x={smoothX}
            y={smoothY}
          >
            <motion.div
              className={`h-full w-full border border-border-card opacity-80 shadow-sm ${shape.look}`}
              animate={
                ambient
                  ? { y: [0, index % 2 === 0 ? -18 : 14, 0], rotate: [index * 3, index * 3 + 18, index * 3] }
                  : undefined
              }
              transition={ambient ? { duration: 14 + index, repeat: Infinity, ease: "easeInOut" } : undefined}
            />
          </Parallax>
        ))}
      </div>
    );
  }

  const characterStyle = { "--character-motion": canAnimate ? "running" : "paused" } as CSSProperties;
  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute inset-x-0 bottom-0 z-20 h-[58%] overflow-hidden ${className}`}
      style={characterStyle}
    >
      <div className="absolute inset-x-[5%] bottom-[18%] border-t border-border" />
      <Parallax className="absolute bottom-[18%] left-[5%]" depth={0.55} x={smoothX} y={smoothY}>
        <BlockCharacter className="landing-character--one" />
      </Parallax>
      <Parallax className="absolute bottom-[18%] left-[34%]" depth={0.82} x={smoothX} y={smoothY}>
        <BlockCharacter className="landing-character--two" />
      </Parallax>
      <Parallax className="absolute right-[18%] bottom-[18%]" depth={1.08} x={smoothX} y={smoothY}>
        <BlockCharacter className="landing-character--three" mining />
      </Parallax>
    </div>
  );
}
