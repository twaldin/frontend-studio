import { ArrowRight, BookOpen, Check, Dumbbell, Flame, GraduationCap, Languages, Library, Lock, Play, Settings, Target, Trophy, User, Zap, type LucideIcon } from "lucide-react";
import type { Item } from "@/content/schema";
import { useGallery } from "@/gallery/context";
import { Badge, Button, cn } from "@/ui";
import { CARD_CLASSES_BY_STYLE, NavIcon, iconStroke } from "../kit";

/** Nav icons in `content.app.nav` order. */
export const READER_ICONS: readonly LucideIcon[] = [GraduationCap, Dumbbell, Library, Trophy, User, Settings];

type LessonState = "done" | "current" | "locked";

/** The `items` group that holds the daily goal; every other item is a lesson. */
const GOAL_GROUP = "Today";
const FIGURE_ICONS: readonly LucideIcon[] = [Flame, Zap];
const WEEK = ["M", "T", "W", "T", "F", "S", "S"];
const TODAY_INDEX = 4;

const NODE_ICONS: Record<LessonState, LucideIcon> = { done: Check, current: Play, locked: Lock };
const NODE_CLASSES: Record<LessonState, string> = {
  done: "bg-primary text-primary-foreground",
  current: "bg-background text-accent-text ring-2 ring-primary",
  locked: "border border-border bg-background text-muted-foreground",
};

/** Learning and reading: where you left off, the lesson path, today's streak and goal, and one story from the library. */
export function ReaderHome() {
  const { choices, content } = useGallery();
  const primaryVariant = choices.buttons === "outline" ? "cta" : "primary";
  const secondaryVariant = choices.buttons === "outline" ? "outline" : "ghost";
  const stroke = iconStroke(choices.iconWeight);
  const card = CARD_CLASSES_BY_STYLE[choices.cards];
  const rowHover = choices.rowHover === "fill";
  const { items, prose } = content.app;

  const goal = items.find((item) => item.group === GOAL_GROUP);
  const lessons = items.filter((item) => item.group !== GOAL_GROUP);
  const firstOpen = lessons.findIndex((item) => (item.progress ?? 0) < 1);
  const currentIndex = firstOpen === -1 ? lessons.length : firstOpen;
  const path: { lesson: Item; state: LessonState }[] = lessons.map((lesson, index) => ({
    lesson,
    state: index < currentIndex ? "done" : index === currentIndex ? "current" : "locked",
  }));

  const resume = lessons[currentIndex] ?? lessons.at(-1);
  if (!resume) return null;
  const unitLessons = lessons.filter((item) => item.group === resume.group);
  const unitPercent = Math.round((unitLessons.reduce((sum, item) => sum + (item.progress ?? 0), 0) / unitLessons.length) * 100);
  const unitTitles = [...new Set(lessons.map((item) => item.group ?? ""))];

  return (
    <div className="flex min-h-0 flex-1 gap-5 px-8 pb-6">
      <div className="flex min-w-0 flex-1 flex-col gap-4">
        <section className={cn("flex shrink-0 items-center gap-4 rounded-lg p-5", card)}>
          <div className="grid size-16 shrink-0 place-items-center rounded-lg text-primary-foreground" style={{ background: "linear-gradient(145deg, var(--primary), var(--chart-3))" }}>
            <Languages aria-hidden="true" className="size-7" strokeWidth={stroke} />
          </div>
          <div className="min-w-0 flex-1">
            <div className="text-chrome text-muted-foreground">Continue learning</div>
            <h2 className="heading mt-0.5 truncate text-[20px] leading-tight text-foreground">{resume.group}</h2>
            <div className="mt-0.5 truncate text-chrome text-muted-foreground">
              Lesson {unitLessons.indexOf(resume) + 1} of {unitLessons.length} · {resume.title}
            </div>
            <div className="mt-3 flex items-center gap-3">
              <div className="h-1.5 flex-1 overflow-hidden rounded-[var(--radius-control)] bg-border">
                <div className="h-full bg-primary transition-[width] duration-[var(--duration-base)] ease-[var(--ease)]" style={{ width: `${unitPercent}%` }} />
              </div>
              <span className="tabular text-chrome text-muted-foreground">{unitPercent}%</span>
            </div>
          </div>
          <div className="flex shrink-0 flex-col gap-2">
            <Button variant={primaryVariant}>
              Continue
              <ArrowRight aria-hidden="true" className="size-4" strokeWidth={stroke} />
            </Button>
            <Button variant={secondaryVariant}>Review unit</Button>
          </div>
        </section>

        <section className="flex min-h-0 flex-1 flex-col">
          <div className="mb-2 flex shrink-0 items-center justify-between px-3 text-chrome text-muted-foreground">
            <span>Lesson path</span>
            <span className="tabular">{currentIndex} of {lessons.length} done</span>
          </div>
          <div className="min-h-0 flex-1 space-y-4 overflow-auto pb-2">
            {unitTitles.map((unitTitle) => {
              const steps = path.filter((step) => (step.lesson.group ?? "") === unitTitle);
              return (
                <div key={unitTitle}>
                  <div className="mb-1 flex items-baseline justify-between gap-3 px-3">
                    <h3 className="heading min-w-0 truncate text-body text-foreground">{unitTitle}</h3>
                    <span className="shrink-0 tabular text-chrome text-muted-foreground">{steps.filter((step) => step.state === "done").length} of {steps.length}</span>
                  </div>
                  <div className="relative">
                    <span aria-hidden="true" className="absolute top-6 bottom-6 left-7 w-px bg-border" />
                    {steps.map(({ lesson, state }) => {
                      const NodeIcon = NODE_ICONS[state];
                      return (
                        <div
                          key={lesson.title}
                          className={cn(
                            "flex items-center gap-3 rounded-lg px-3 py-1.5 transition-colors duration-[var(--duration-base)] ease-[var(--ease)]",
                            state === "current" && "bg-accent-soft",
                            rowHover && "cursor-pointer",
                            rowHover && (state === "current" ? "hover:bg-accent-soft-hover" : "hover:bg-accent"),
                          )}
                        >
                          <span className={cn("relative z-10 grid size-8 shrink-0 place-items-center rounded-[var(--radius-control)]", NODE_CLASSES[state])}>
                            <NodeIcon aria-hidden="true" className="size-4" strokeWidth={stroke} />
                          </span>
                          <div className="min-w-0 flex-1">
                            <div className={cn("truncate text-body", state === "locked" ? "text-muted-foreground" : "text-foreground", state === "current" && "font-medium")}>{lesson.title}</div>
                            <div className="truncate text-chrome text-muted-foreground">{lesson.meta}</div>
                          </div>
                          {lesson.badge ? <Badge>{lesson.badge}</Badge> : null}
                          {state === "current" ? (
                            <div className="flex w-24 shrink-0 items-center gap-2">
                              <div className="h-1.5 flex-1 overflow-hidden rounded-[var(--radius-control)] bg-border">
                                <div className="h-full bg-primary" style={{ width: `${Math.round((lesson.progress ?? 0) * 100)}%` }} />
                              </div>
                              <span className="tabular text-chrome text-muted-foreground">{Math.round((lesson.progress ?? 0) * 100)}%</span>
                            </div>
                          ) : (
                            <span className={cn("w-24 shrink-0 text-right tabular text-chrome", state === "done" ? "text-accent-text" : "text-muted-foreground")}>{lesson.value}</span>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      </div>

      <aside className="flex w-[256px] shrink-0 flex-col gap-4">
        <section className={cn("shrink-0 rounded-lg p-4", card)}>
          <div className="grid grid-cols-2 gap-3">
            {content.app.stats.slice(0, 2).map((stat, index) => (
              <div key={stat.label} className="min-w-0">
                <div className="flex items-center gap-2 text-chrome text-muted-foreground">
                  <NavIcon Icon={FIGURE_ICONS[index] ?? Flame} iconWeight={choices.iconWeight} />
                  <span className="truncate">{stat.label}</span>
                </div>
                <div className="mt-2 truncate text-[26px] font-medium leading-none tabular text-foreground">{stat.value}</div>
                {stat.note ? <div className="mt-1.5 truncate text-chrome text-muted-foreground">{stat.note}</div> : null}
              </div>
            ))}
          </div>
          <div className="mt-4 grid grid-cols-7 gap-1 border-t border-border pt-3">
            {WEEK.map((day, index) => (
              <div key={`${day}-${index}`} className="flex flex-col items-center gap-1 text-chrome text-muted-foreground">
                <span>{day}</span>
                <span
                  className={cn(
                    "grid size-6 place-items-center rounded-[var(--radius-control)]",
                    index < TODAY_INDEX ? "bg-primary text-primary-foreground" : index === TODAY_INDEX ? "bg-background ring-2 ring-primary" : "border border-border bg-background",
                  )}
                >
                  {index < TODAY_INDEX ? <Check aria-hidden="true" className="size-3.5" strokeWidth={stroke} /> : null}
                </span>
              </div>
            ))}
          </div>
        </section>

        {goal ? (
          <section className={cn("shrink-0 rounded-lg p-4", card)}>
            <div className="flex items-center gap-2">
              <NavIcon Icon={Target} iconWeight={choices.iconWeight} />
              <span className="min-w-0 flex-1 truncate text-body font-medium text-foreground">{goal.title}</span>
              <span className="tabular text-chrome text-muted-foreground">{goal.value}</span>
            </div>
            <div className="mt-3 h-2 overflow-hidden rounded-[var(--radius-control)] bg-border">
              <div className="h-full bg-primary transition-[width] duration-[var(--duration-base)] ease-[var(--ease)]" style={{ width: `${Math.round((goal.progress ?? 0) * 100)}%` }} />
            </div>
            <div className="mt-2 text-chrome text-muted-foreground">{goal.meta}</div>
          </section>
        ) : null}

        <section className={cn("flex min-h-0 flex-1 flex-col overflow-hidden rounded-lg", card)}>
          <div className="flex h-14 shrink-0 items-end justify-between p-3 text-primary-foreground" style={{ background: "linear-gradient(90deg, var(--chart-1), var(--chart-4))" }}>
            <BookOpen aria-hidden="true" className="size-6" strokeWidth={stroke} />
            <span className="rounded-[var(--radius-control)] bg-background px-1.5 text-chrome text-foreground">A2 · 4 min</span>
          </div>
          <div className="flex min-h-0 flex-1 flex-col p-4">
            <div className="text-chrome text-muted-foreground">From the library</div>
            <h3 className="heading mt-1 text-[17px] leading-snug text-foreground">{prose.title}</h3>
            <p className="mt-2 line-clamp-3 min-h-0 flex-1 text-body leading-relaxed text-muted-foreground">{prose.paragraphs[0]}</p>
            <div className="shrink-0 pt-3">
              <Button size="sm" variant={secondaryVariant}>
                Read story
                <ArrowRight aria-hidden="true" className="size-3.5" strokeWidth={stroke} />
              </Button>
            </div>
          </div>
        </section>
      </aside>
    </div>
  );
}
