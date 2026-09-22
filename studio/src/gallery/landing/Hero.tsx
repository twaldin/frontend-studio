import { type ReactNode, type RefObject, useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from "motion/react";
import { ShellScene } from "@/gallery/app";
import { useGallery } from "@/gallery/context";
import { Background } from "./Background";
import { Frame, type FrameKind } from "./Frames";
import { ActionGroup, displayClass, displayStyle } from "./helpers";
import { Pieces } from "./Pieces";

function Reveal({ children, order, className = "" }: { children: ReactNode; order: number; className?: string }) {
  const { choices } = useGallery();
  const reducedMotion = useReducedMotion();
  const entrance = !reducedMotion && choices.heroMotion === "entrance";

  return (
    <motion.div
      className={className}
      initial={entrance ? { opacity: 0, y: 22 } : false}
      animate={{ opacity: 1, y: 0 }}
      transition={entrance ? { duration: 0.5, delay: order * 0.09, ease: "easeOut" } : { duration: 0 }}
    >
      {children}
    </motion.div>
  );
}

function HeroCopy({ centered = false, oversized = false }: { centered?: boolean; oversized?: boolean }) {
  const { choices, content } = useGallery();
  const alignment = centered ? "items-center text-center" : "items-start text-left";
  const titleStyle = displayStyle(choices.display, oversized);
  if (choices.register === "editorial" && !oversized) {
    titleStyle.fontSize = choices.display === "mono" ? "64px" : "76px";
  }
  return (
    <div className={`relative z-10 flex flex-col ${alignment}`}>
      <Reveal order={0}>
        <h1
          className={`max-w-[960px] text-balance text-foreground ${displayClass(choices.display, choices.displayCase)}`}
          style={titleStyle}
        >
          {content.landing.h1}
        </h1>
      </Reveal>
      <Reveal order={1} className="mt-6">
        <p className="max-w-[650px] text-[19px] leading-[1.6] text-muted-foreground">{content.landing.sub}</p>
      </Reveal>
      <Reveal order={2} className="mt-8 w-full">
        <ActionGroup centered={centered} />
      </Reveal>
    </div>
  );
}

function ProductVisual({
  kind,
  order,
  scale,
  rotateX,
  className = "",
}: {
  kind: FrameKind | string;
  order: number;
  scale: MotionValue<number>;
  rotateX: MotionValue<number>;
  className?: string;
}) {
  return (
    <Reveal order={order} className={className}>
      <motion.div style={{ scale, rotateX, transformPerspective: 1400 }}>
        <Frame kind={kind}>
          <ShellScene />
        </Frame>
      </motion.div>
    </Reveal>
  );
}

export function Hero({ scrollContainer }: { scrollContainer?: RefObject<HTMLElement | null> }) {
  const { choices } = useGallery();
  const reducedMotion = useReducedMotion();
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    container: scrollContainer,
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const scrollMotion = !reducedMotion && (choices.heroMotion === "scroll" || choices.heroMotion === "interactiveScroll");
  const scale = useTransform(scrollYProgress, [0, 0.8], scrollMotion ? [0.92, 1] : [1, 1]);
  const rotateX = useTransform(scrollYProgress, [0, 0.8], scrollMotion ? [8, 0] : [0, 0]);
  const editorial = choices.register === "editorial";
  const playful = choices.register === "playful";
  const sectionSpacing = editorial ? "py-36" : "py-24";
  const surface = playful ? "mx-4 mt-4 rounded-2xl bg-accent-soft" : "bg-background";
  if (choices.hero === "split") {
    return (
      <section ref={heroRef} className={`relative isolate overflow-hidden ${sectionSpacing} ${surface}`}>
        <Background />
        <Pieces />
        <div className="relative z-10 mx-auto grid min-h-[620px] max-w-[1200px] items-center gap-14 px-8 md:grid-cols-[0.82fr_1.18fr]">
          <HeroCopy />
          <ProductVisual kind={choices.frames} order={3} scale={scale} rotateX={rotateX} />
        </div>
      </section>
    );
  }

  if (choices.hero === "device") {
    const deviceKind: FrameKind = choices.frames === "phone" ? "phone" : "laptop";
    return (
      <section ref={heroRef} className={`relative isolate overflow-hidden ${sectionSpacing} ${surface}`}>
        <Background />
        <Pieces />
        <div className="relative z-10 mx-auto flex max-w-[1200px] flex-col items-center px-8">
          <HeroCopy centered />
          <ProductVisual
            kind={deviceKind}
            order={3}
            scale={scale}
            rotateX={rotateX}
            className="mt-16 w-full"
          />
        </div>
      </section>
    );
  }

  if (choices.hero === "scene") {
    return (
      <section ref={heroRef} className={`relative isolate flex min-h-[720px] items-center overflow-hidden py-28 ${surface}`}>
        <Background />
        <Pieces />
        <div className={`relative z-10 mx-auto w-full px-8 ${editorial ? "max-w-[1000px]" : "max-w-[880px]"}`}>
          <HeroCopy centered />
        </div>
      </section>
    );
  }

  if (choices.hero === "media") {
    return (
      <section ref={heroRef} className={`relative isolate overflow-hidden ${sectionSpacing} ${surface}`}>
        <Background />
        <Pieces />
        <div className="relative z-10 mx-auto flex max-w-[1280px] flex-col items-center px-8">
          <HeroCopy centered oversized />
          <ProductVisual
            kind={choices.frames}
            order={3}
            scale={scale}
            rotateX={rotateX}
            className="mt-20 w-full xl:-mx-16 xl:w-[calc(100%+8rem)]"
          />
        </div>
      </section>
    );
  }

  if (choices.hero === "type") {
    return (
      <section ref={heroRef} className={`relative isolate flex min-h-[660px] items-center overflow-hidden ${sectionSpacing} ${surface}`}>
        <Background />
        <Pieces />
        <div className={`relative z-10 mx-auto w-full px-8 ${editorial ? "max-w-[1000px]" : "max-w-[1120px]"}`}>
          <HeroCopy centered={false} oversized />
        </div>
      </section>
    );
  }

  return (
    <section ref={heroRef} className={`relative isolate overflow-hidden ${sectionSpacing} ${surface}`}>
      <Background />
      <Pieces />
      <div className="relative z-10 mx-auto flex max-w-[1200px] flex-col items-center px-8">
        <HeroCopy centered />
        <ProductVisual
          kind={choices.frames}
          order={3}
          scale={scale}
          rotateX={rotateX}
          className="mt-16 w-full"
        />
      </div>
    </section>
  );
}
