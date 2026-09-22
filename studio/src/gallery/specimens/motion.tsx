import { useLayoutEffect, useRef, useState } from "react";
import { GripVertical } from "lucide-react";
import { motion } from "motion/react";
import { useGallery } from "@/gallery/context";
import { Button, cn } from "@/ui";
import { SpecimenFrame, StateLabel, iconStroke } from "./shared";

export function MotionSpecimen() {
  const { choices, content } = useGallery();
  const rootRef = useRef<HTMLDivElement>(null);
  const [durations, setDurations] = useState({ fast: 0, base: 0 });
  const [menuReplay, setMenuReplay] = useState(0);
  const [dialogReplay, setDialogReplay] = useState(0);
  const [promoted, setPromoted] = useState(false);

  useLayoutEffect(() => {
    const gallery = rootRef.current?.closest(".gallery");
    if (!gallery) return;
    const style = getComputedStyle(gallery);
    setDurations({
      fast: Number.parseFloat(style.getPropertyValue("--duration-fast")) || 0,
      base: Number.parseFloat(style.getPropertyValue("--duration-base")) || 0,
    });
  }, [choices.motion]);

  const replayList = () => {
    setPromoted(false);
    requestAnimationFrame(() => requestAnimationFrame(() => setPromoted(true)));
  };
  const rows = content.app.nav.slice(0, 5);
  const orderedRows = promoted && rows.length > 1 ? [rows.at(-1)!, ...rows.slice(0, -1)] : rows;
  const instant = choices.motion === "none";
  const transition = { duration: durations.fast / 1000, ease: [0.22, 1, 0.36, 1] as const };
  const dialogTransition = { duration: durations.base / 1000, ease: [0.22, 1, 0.36, 1] as const };

  return (
    <SpecimenFrame
      rootRef={rootRef}
      caption="Motion"
      detail={instant ? "0ms · instant" : `${durations.fast}ms fast · ${durations.base}ms base`}
    >
      <div className="grid grid-cols-3 gap-6">
        <div className="flex min-h-[330px] flex-col rounded-xl border border-border bg-card p-5 shadow-sm">
          <div className="flex items-center justify-between gap-3"><StateLabel>Menu entrance · {durations.fast}ms</StateLabel><Button size="sm" variant="outline" onClick={() => setMenuReplay((value) => value + 1)}>Replay</Button></div>
          <div className="flex flex-1 items-center justify-center">
            <motion.div
              key={menuReplay}
              initial={instant ? false : { opacity: 0, scale: 0.96, y: -4 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={transition}
              className="w-56 rounded-lg border border-border bg-popover p-1.5 shadow-lg"
            >
              {content.app.nav.slice(0, 4).map((item, index) => <div key={item.label} className={cn("flex h-control items-center rounded-md px-3 text-body", index === 1 && "bg-accent")}>{item.label}</div>)}
            </motion.div>
          </div>
        </div>

        <div className="flex min-h-[330px] flex-col rounded-xl border border-border bg-card p-5 shadow-sm">
          <div className="flex items-center justify-between gap-3"><StateLabel>Dialog entrance · {durations.base}ms</StateLabel><Button size="sm" variant="outline" onClick={() => setDialogReplay((value) => value + 1)}>Replay</Button></div>
          <div className="relative flex flex-1 items-center justify-center overflow-hidden rounded-lg bg-background">
            <motion.div key={`backdrop-${dialogReplay}`} initial={instant ? false : { opacity: 0 }} animate={{ opacity: 1 }} transition={transition} className="absolute inset-0 bg-foreground/10" />
            <motion.div
              key={`dialog-${dialogReplay}`}
              initial={instant ? false : { opacity: 0, scale: 0.96, y: 8 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={dialogTransition}
              className="relative z-10 w-[88%] rounded-xl border border-border bg-popover shadow-lg"
            >
              <div className="border-b border-border p-4 text-body font-semibold">{content.app.dialog.title}</div>
              <div className="p-4 text-chrome text-muted-foreground">{content.app.dialog.body}</div>
            </motion.div>
          </div>
        </div>

        <div className="flex min-h-[330px] flex-col rounded-xl border border-border bg-card p-5 shadow-sm">
          <div className="flex items-center justify-between gap-3"><StateLabel>Layout move · {durations.base}ms</StateLabel><Button size="sm" variant="outline" onClick={replayList}>Replay</Button></div>
          <div className="mt-4 space-y-1">
            {orderedRows.map((item, index) => (
              <motion.div
                layout
                key={item.label}
                transition={dialogTransition}
                className={cn("flex h-row items-center gap-2 rounded-md border border-border px-3 text-body", promoted && index === 0 ? "bg-accent-soft text-accent-text" : "bg-background")}
              >
                <GripVertical className="size-4 text-muted-foreground" strokeWidth={iconStroke(choices)} aria-hidden="true" />
                {item.label}
              </motion.div>
            ))}
          </div>
        </div>
      </div>
      {instant ? <div className="mt-5 text-chrome text-muted-foreground">Motion is disabled; every replay switches instantly at 0ms.</div> : null}
    </SpecimenFrame>
  );
}
