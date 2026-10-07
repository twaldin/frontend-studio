import { Bookmark, Flame, Heart, Home, ImageIcon, Link2, MessageCircle, Play, Repeat2, Settings, Smile, TrendingUp, UserPlus, Users, type LucideIcon } from "lucide-react";
import { useGallery } from "@/gallery/context";
import { Button, Input, cn } from "@/ui";
import { CARD_CLASSES_BY_STYLE, INPUT_CLASSES_BY_STYLE, NavIcon, iconStroke } from "../kit";

/** Nav icons in `content.app.nav` order. */
export const FEED_ICONS: readonly LucideIcon[] = [Home, Flame, Users, MessageCircle, Bookmark, Settings];

/** The action row under a post. Counts come from `item.value` ("replies · reposts · likes"), in this order. */
const POST_ACTIONS: readonly { Icon: LucideIcon; label: string }[] = [
  { Icon: MessageCircle, label: "Reply" },
  { Icon: Repeat2, label: "Repost" },
  { Icon: Heart, label: "Like" },
];

/** What the composer can attach. */
const COMPOSER_TOOLS: readonly { Icon: LucideIcon; label: string }[] = [
  { Icon: ImageIcon, label: "Add photo" },
  { Icon: Link2, label: "Add link" },
  { Icon: Smile, label: "Add emoji" },
];

/** The glyph on a post's media tile, keyed by `item.badge`. */
const POST_MEDIA_ICONS: Record<string, LucideIcon> = { Photo: ImageIcon, Video: Play, Link: Link2 };

/** Media tile art: the accent at falling opacity, so the accent and the look restyle every tile. */
const POST_MEDIA_GRADIENTS = [
  "linear-gradient(135deg, var(--chart-2), var(--primary))",
  "linear-gradient(200deg, var(--primary), var(--chart-3))",
  "linear-gradient(160deg, var(--chart-4), var(--chart-1))",
] as const;

const ICON_BUTTON =
  "grid size-8 shrink-0 place-items-center rounded-[var(--radius-control)] text-muted-foreground transition-colors duration-[var(--duration-fast)] ease-[var(--ease)] hover:bg-accent hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring";

/** A person's initial on a soft accent disc; the signed-in user's is solid. */
function Avatar({ name, mine = false, className }: { name: string; mine?: boolean; className?: string }) {
  return (
    <span
      aria-hidden="true"
      className={cn(
        "grid shrink-0 place-items-center rounded-full font-medium",
        mine ? "bg-primary text-primary-foreground" : "bg-accent-soft text-accent-text",
        className,
      )}
    >
      {name.charAt(0)}
    </span>
  );
}

/** A community feed: a composer, posts from people newest first with replies under the first, and a rail of topics and people. */
export function FeedHome() {
  const { choices, content } = useGallery();
  const primaryVariant = choices.buttons === "outline" ? "cta" : "primary";
  const secondaryVariant = choices.buttons === "outline" ? "outline" : "ghost";
  const card = CARD_CLASSES_BY_STYLE[choices.cards];
  const listRow = choices.rowHover === "fill" && "cursor-pointer hover:bg-accent";

  // Posts are the first group (or the ungrouped items); the rail's sections exist only when their own groups do.
  const [postGroup, trendingGroup, peopleGroup] = [...new Set(content.app.items.map((item) => item.group))];
  const posts = content.app.items.filter((item) => item.group === postGroup).slice(0, 4);
  const trending = trendingGroup === undefined ? [] : content.app.items.filter((item) => item.group === trendingGroup).slice(0, 4);
  const people = peopleGroup === undefined ? [] : content.app.items.filter((item) => item.group === peopleGroup).slice(0, 3);
  const me = content.app.thread.find((message) => message.mine)?.author ?? "You";

  return (
    <div className="flex min-h-0 flex-1 gap-6 px-8">
      <section aria-label={postGroup} className="-mx-1.5 flex min-w-0 flex-1 flex-col gap-3 overflow-y-auto px-1.5 pb-6 pt-1.5">
        <div className={cn("shrink-0 rounded-lg p-4", card)}>
          <div className="flex items-center gap-3">
            <Avatar name={me} mine className="size-9 text-body" />
            <Input placeholder={content.app.composer.placeholder} className={cn("min-w-0 flex-1", INPUT_CLASSES_BY_STYLE[choices.inputs])} />
          </div>
          <div className="mt-3 flex items-center gap-1 pl-12">
            {COMPOSER_TOOLS.map(({ Icon, label }) => (
              <button key={label} type="button" aria-label={label} className={ICON_BUTTON}>
                <NavIcon Icon={Icon} iconWeight={choices.iconWeight} />
              </button>
            ))}
            <Button variant={primaryVariant} size="sm" className="ml-auto">{content.app.composer.send}</Button>
          </div>
        </div>

        {posts.map((post, postIndex) => {
          const [author = "", time = ""] = post.meta.split(" · ");
          const counts = (post.value ?? "").split(" · ");
          const MediaIcon = post.badge ? (POST_MEDIA_ICONS[post.badge] ?? ImageIcon) : undefined;
          return (
            <article key={post.title} className={cn("shrink-0 rounded-lg p-4", card)}>
              <header className="flex items-center gap-3">
                <Avatar name={author} className="size-9 text-body" />
                <div className="min-w-0 flex-1 leading-tight">
                  <div className="truncate font-medium text-foreground">{author}</div>
                  <div className="text-chrome text-muted-foreground">{time}</div>
                </div>
              </header>

              <h3 className="heading mt-3 text-body text-foreground">{post.title}</h3>
              {post.body ? <p className="mt-1 leading-relaxed text-foreground">{post.body}</p> : null}

              {MediaIcon ? (
                <div
                  className="relative mt-3 h-32 overflow-hidden rounded-md bg-accent-soft"
                  style={{ backgroundImage: POST_MEDIA_GRADIENTS[postIndex % POST_MEDIA_GRADIENTS.length] }}
                >
                  <span className="absolute -right-6 -top-8 size-32 rounded-full bg-primary-foreground/15" />
                  <span className="absolute -bottom-10 left-1/3 size-28 rounded-full bg-background/25" />
                  <span className="absolute inset-0 grid place-items-center">
                    <span className="grid size-11 place-items-center rounded-full bg-background/85 text-foreground shadow-md">
                      <MediaIcon aria-hidden="true" className="size-5" strokeWidth={iconStroke(choices.iconWeight)} />
                    </span>
                  </span>
                  <span className="absolute bottom-2 left-2 rounded-sm bg-background/85 px-1.5 py-0.5 text-chrome text-foreground">{post.badge}</span>
                </div>
              ) : null}

              <div className="mt-3 flex items-center gap-1 border-t border-border pt-2">
                {POST_ACTIONS.map(({ Icon, label }, actionIndex) => (
                  <button
                    key={label}
                    type="button"
                    aria-label={label}
                    className="flex h-[calc(var(--control-h)-4px)] items-center gap-1.5 rounded-[var(--radius-control)] px-2 text-chrome text-muted-foreground transition-colors duration-[var(--duration-fast)] ease-[var(--ease)] hover:bg-accent hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  >
                    <NavIcon Icon={Icon} iconWeight={choices.iconWeight} />
                    {counts[actionIndex] ? <span className="tabular">{counts[actionIndex]}</span> : null}
                  </button>
                ))}
                <button type="button" aria-label="Save" className={cn(ICON_BUTTON, "ml-auto")}>
                  <NavIcon Icon={Bookmark} iconWeight={choices.iconWeight} />
                </button>
              </div>

              {postIndex === 0 ? (
                <ul className="mt-3 space-y-3 border-t border-border pt-3">
                  {content.app.thread.map((reply, replyIndex) => (
                    <li key={`${reply.author}-${replyIndex}`} className="flex gap-2.5">
                      <Avatar name={reply.author} mine={reply.mine} className="size-6 text-chrome" />
                      <div className="min-w-0 flex-1">
                        <div className="flex items-baseline gap-2 text-chrome">
                          <span className={cn("font-medium", reply.mine ? "text-accent-text" : "text-foreground")}>{reply.author}</span>
                          <span className="text-muted-foreground">{reply.time}</span>
                        </div>
                        <p className="text-foreground">{reply.text}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              ) : null}
            </article>
          );
        })}
      </section>

      <aside className="-mx-1.5 flex w-[272px] shrink-0 flex-col gap-4 overflow-y-auto px-1.5 pb-6 pt-1.5">
        {trending.length > 0 ? (
          <section aria-label={trendingGroup} className={cn("shrink-0 rounded-lg p-4", card)}>
            <h2 className="heading flex items-center gap-2 text-body text-foreground">
              <NavIcon Icon={TrendingUp} iconWeight={choices.iconWeight} />
              {trendingGroup}
            </h2>
            <ul className="-mx-2 mt-2">
              {trending.map((topic, topicIndex) => (
                <li
                  key={topic.title}
                  className={cn("flex items-center gap-3 rounded-md px-2 py-1.5 transition-colors duration-[var(--duration-fast)] ease-[var(--ease)]", listRow)}
                >
                  <span className="tabular w-3 shrink-0 text-chrome text-muted-foreground">{topicIndex + 1}</span>
                  <div className="min-w-0 flex-1">
                    <div className="truncate font-medium text-foreground">{topic.title}</div>
                    <div className="truncate text-chrome text-muted-foreground">{topic.meta}</div>
                  </div>
                </li>
              ))}
            </ul>
          </section>
        ) : null}

        {people.length > 0 ? (
          <section aria-label={peopleGroup} className={cn("shrink-0 rounded-lg p-4", card)}>
            <h2 className="heading flex items-center gap-2 text-body text-foreground">
              <NavIcon Icon={UserPlus} iconWeight={choices.iconWeight} />
              {peopleGroup}
            </h2>
            <ul className="mt-3 space-y-3">
              {people.map((person) => (
                <li key={person.title} className="flex items-center gap-2.5">
                  <Avatar name={person.title} className="size-8 text-chrome" />
                  <div className="min-w-0 flex-1 leading-tight">
                    <div className="truncate font-medium text-foreground">{person.title}</div>
                    <div className="line-clamp-2 text-chrome text-muted-foreground">{person.meta}</div>
                  </div>
                  {person.badge ? <Button variant={secondaryVariant} size="sm">{person.badge}</Button> : null}
                </li>
              ))}
            </ul>
          </section>
        ) : null}
      </aside>
    </div>
  );
}
