import type { ReactNode } from "react";
import { ChevronRight, Download, Heart, Home, Library, ListMusic, Pause, Play, Plus, Radio, Repeat, Search, Settings, Shuffle, SkipBack, SkipForward, Volume2, type LucideIcon } from "lucide-react";
import { useGallery } from "@/gallery/context";
import { Button, cn } from "@/ui";
import { CARD_CLASSES_BY_STYLE, NavIcon, iconStroke } from "../kit";

/** Nav icons in `content.app.nav` order. */
export const MEDIA_ICONS: readonly LucideIcon[] = [Home, Search, Library, Radio, Download, Settings];

/** Cover fills: the accent at falling opacity, so the accent and the look restyle every cover. */
const COVER_GRADIENTS = [
  "linear-gradient(135deg, var(--chart-2), var(--primary))",
  "linear-gradient(210deg, var(--primary), var(--chart-3))",
  "linear-gradient(160deg, var(--chart-4), var(--chart-1))",
  "linear-gradient(300deg, var(--chart-1), var(--chart-4))",
  "linear-gradient(45deg, var(--chart-3), var(--primary))",
] as const;

/** Cover art on a 100×100 viewBox, drawn in `currentColor` over the gradient: a record, a waveform, a sunset, stripes. */
const COVER_ART: readonly ReactNode[] = [
  <g fill="none" stroke="currentColor" strokeOpacity=".35" strokeWidth="1.5">
    <circle cx="66" cy="66" r="36" />
    <circle cx="66" cy="66" r="24" />
    <circle cx="66" cy="66" r="12" fill="currentColor" fillOpacity=".3" stroke="none" />
  </g>,
  <g fill="currentColor" fillOpacity=".3">
    {[30, 52, 22, 62, 38, 46].map((height, bar) => (
      <rect key={bar} x={12 + bar * 13} y={100 - height} width="8" height={height} rx="2" />
    ))}
  </g>,
  <g fill="currentColor" fillOpacity=".28">
    <circle cx="50" cy="56" r="26" />
    <rect x="0" y="74" width="100" height="26" fillOpacity=".2" />
  </g>,
  <path d="M-10 70 L70 -10 M10 110 L110 10 M44 110 L110 44" fill="none" stroke="currentColor" strokeOpacity=".3" strokeWidth="9" />,
];

/** Transport controls either side of the play button. */
const TRANSPORT_BEFORE: readonly { Icon: LucideIcon; label: string }[] = [
  { Icon: Shuffle, label: "Shuffle" },
  { Icon: SkipBack, label: "Previous" },
];
const TRANSPORT_AFTER: readonly { Icon: LucideIcon; label: string }[] = [
  { Icon: SkipForward, label: "Next" },
  { Icon: Repeat, label: "Repeat" },
];

/** Track-level actions at the right end of the now-playing bar. */
const TRACK_TOOLS: readonly { Icon: LucideIcon; label: string }[] = [
  { Icon: Heart, label: "Like" },
  { Icon: ListMusic, label: "Queue" },
];

const ICON_BUTTON =
  "grid size-8 shrink-0 place-items-center rounded-[var(--radius-control)] text-muted-foreground transition-colors duration-[var(--duration-fast)] ease-[var(--ease)] hover:bg-accent hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring";

const PLAY_BUTTON =
  "grid shrink-0 place-items-center rounded-full bg-primary text-primary-foreground shadow-md transition-[opacity,translate] duration-[var(--duration-base)] ease-[var(--ease)]";

/** Seconds as m:ss, or h:mm:ss from an hour up. */
function formatClock(seconds: number): string {
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const rest = String(seconds % 60).padStart(2, "0");
  return hours > 0 ? `${hours}:${String(minutes).padStart(2, "0")}:${rest}` : `${minutes}:${rest}`;
}

/** A square cover. `seed` varies the gradient and the art per item; `children` overlay it. */
function Cover({ seed, className, children }: { seed: number; className?: string; children?: ReactNode }) {
  return (
    <div
      className={cn("relative aspect-square overflow-hidden bg-accent-soft", className)}
      style={{ backgroundImage: COVER_GRADIENTS[seed % COVER_GRADIENTS.length] }}
    >
      <svg viewBox="0 0 100 100" preserveAspectRatio="xMidYMid slice" aria-hidden="true" className="absolute inset-0 size-full text-primary-foreground">
        {COVER_ART[seed % COVER_ART.length]}
      </svg>
      {children}
    </div>
  );
}

/** A media library to play from: a featured release, two shelves of covers, and the now-playing bar pinned underneath. */
export function MediaHome() {
  const { choices, content } = useGallery();
  const primaryVariant = choices.buttons === "outline" ? "cta" : "primary";
  const secondaryVariant = choices.buttons === "outline" ? "outline" : "ghost";
  const card = CARD_CLASSES_BY_STYLE[choices.cards];
  const stroke = iconStroke(choices.iconWeight);
  const listRow = choices.rowHover === "fill" && "cursor-pointer hover:bg-accent";

  const { items } = content.app;
  const [featuredGroup, ...shelfGroups] = [...new Set(items.map((item) => item.group))];
  const featured = items.find((item) => item.group === featuredGroup);
  const shelves = shelfGroups.slice(0, 2).map((group) => ({ group, items: items.filter((item) => item.group === group).slice(0, 5) }));

  const playing = items.find((item) => item.progress !== undefined);
  const progress = playing?.progress ?? 0;
  const total = (playing?.value ?? "").split(":").reduce((sum, part) => sum * 60 + Number(part), 0);
  const timed = Number.isFinite(total) && total > 0;

  return (
    <div className="flex min-h-0 flex-1 flex-col">
      <div className="min-h-0 flex-1 space-y-6 overflow-y-auto px-8 pb-4 pt-1.5">
        {featured ? (
          <section aria-label={featuredGroup} className={cn("flex shrink-0 gap-5 rounded-xl p-4", card)}>
            <Cover seed={items.indexOf(featured)} className="size-40 shrink-0 rounded-lg" />
            <div className="flex min-w-0 flex-1 flex-col justify-center">
              <div className="flex items-center gap-2 text-chrome">
                <span className="text-muted-foreground">{featuredGroup}</span>
                {featured.badge ? <span className="font-medium text-accent-text">{featured.badge}</span> : null}
              </div>
              <h2 className="heading mt-1 text-[length:calc(var(--text-body)*2)] leading-tight text-foreground">{featured.title}</h2>
              <p className="mt-1 text-chrome text-muted-foreground">
                {featured.meta}
                {featured.value ? ` · ${featured.value}` : null}
              </p>
              {featured.body ? <p className="mt-2 line-clamp-2 max-w-[52ch] text-muted-foreground">{featured.body}</p> : null}
              <div className="mt-4 flex items-center gap-2">
                <Button variant={primaryVariant} size="lg">
                  <Play aria-hidden="true" className="size-4 fill-current" strokeWidth={stroke} />
                  Play
                </Button>
                <Button variant={secondaryVariant} size="lg">
                  <Plus aria-hidden="true" className="size-4" strokeWidth={stroke} />
                  Save
                </Button>
              </div>
            </div>
          </section>
        ) : null}

        {shelves.map((shelf) => (
          <section key={shelf.group} aria-label={shelf.group}>
            <div className="mb-1 flex items-center justify-between">
              <h2 className="heading text-[length:calc(var(--text-body)+3px)] text-foreground">{shelf.group}</h2>
              <button type="button" aria-label="See all" className={ICON_BUTTON}>
                <NavIcon Icon={ChevronRight} iconWeight={choices.iconWeight} />
              </button>
            </div>
            <ul className="-mx-2 grid grid-cols-5 gap-1">
              {shelf.items.map((item) => {
                const active = item === playing;
                return (
                  <li key={item.title} className={cn("group min-w-0 rounded-lg p-2 transition-colors duration-[var(--duration-fast)] ease-[var(--ease)]", listRow)}>
                    <Cover seed={items.indexOf(item)} className="w-full rounded-md">
                      {item.badge ? (
                        <span className="absolute left-2 top-2 rounded-sm bg-background/85 px-1.5 py-0.5 text-chrome text-foreground">{item.badge}</span>
                      ) : null}
                      <span
                        className={cn(
                          PLAY_BUTTON,
                          "absolute bottom-2 right-2 size-8",
                          active ? "opacity-100" : "translate-y-1 opacity-0 group-hover:translate-y-0 group-hover:opacity-100",
                        )}
                      >
                        {active ? (
                          <Pause aria-hidden="true" className="size-4 fill-current" strokeWidth={stroke} />
                        ) : (
                          <Play aria-hidden="true" className="size-4 fill-current" strokeWidth={stroke} />
                        )}
                      </span>
                    </Cover>
                    <div className={cn("mt-2 truncate font-medium", active ? "text-accent-text" : "text-foreground")}>{item.title}</div>
                    <div className="truncate text-chrome text-muted-foreground">{item.meta}</div>
                    {item.progress !== undefined ? (
                      <div className="mt-2 h-1 overflow-hidden rounded-sm bg-foreground/15">
                        <div className="h-full rounded-sm bg-primary" style={{ width: `${item.progress * 100}%` }} />
                      </div>
                    ) : null}
                  </li>
                );
              })}
            </ul>
          </section>
        ))}
      </div>

      {playing ? (
        <div className="shrink-0 px-8 pb-4 pt-2">
          <div className={cn("flex items-center gap-4 rounded-xl p-2.5", card)}>
            <div className="flex w-52 shrink-0 items-center gap-3">
              <Cover seed={items.indexOf(playing)} className="size-12 shrink-0 rounded-md" />
              <div className="min-w-0 flex-1 leading-tight">
                <div className="truncate font-medium text-foreground">{playing.title}</div>
                <div className="truncate text-chrome text-muted-foreground">{playing.meta}</div>
              </div>
            </div>

            <div className="flex min-w-0 flex-1 flex-col items-center gap-1.5">
              <div className="flex items-center gap-1">
                {TRANSPORT_BEFORE.map(({ Icon, label }) => (
                  <button key={label} type="button" aria-label={label} className={ICON_BUTTON}>
                    <NavIcon Icon={Icon} iconWeight={choices.iconWeight} />
                  </button>
                ))}
                <button type="button" aria-label="Pause" className={cn(PLAY_BUTTON, "mx-1 size-9 hover:opacity-90")}>
                  <Pause aria-hidden="true" className="size-4 fill-current" strokeWidth={stroke} />
                </button>
                {TRANSPORT_AFTER.map(({ Icon, label }) => (
                  <button key={label} type="button" aria-label={label} className={ICON_BUTTON}>
                    <NavIcon Icon={Icon} iconWeight={choices.iconWeight} />
                  </button>
                ))}
              </div>
              <div className="flex w-full items-center gap-2 text-chrome text-muted-foreground">
                {timed ? <span className="tabular w-10 shrink-0 text-right">{formatClock(Math.round(total * progress))}</span> : null}
                <div className="h-1 flex-1 overflow-hidden rounded-sm bg-foreground/15">
                  <div className="h-full rounded-sm bg-primary" style={{ width: `${progress * 100}%` }} />
                </div>
                {timed ? <span className="tabular w-10 shrink-0">{formatClock(total)}</span> : null}
              </div>
            </div>

            <div className="flex w-44 shrink-0 items-center justify-end gap-1">
              {TRACK_TOOLS.map(({ Icon, label }) => (
                <button key={label} type="button" aria-label={label} className={ICON_BUTTON}>
                  <NavIcon Icon={Icon} iconWeight={choices.iconWeight} />
                </button>
              ))}
              <NavIcon Icon={Volume2} iconWeight={choices.iconWeight} />
              <div className="h-1 w-14 overflow-hidden rounded-sm bg-foreground/15">
                <div className="h-full w-3/5 rounded-sm bg-primary" />
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
