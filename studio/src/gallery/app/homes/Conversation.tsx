import { Bot, Check, Database, FileText, Folder, MessageSquare, Paperclip, Search, Settings, Sparkles, Users, type LucideIcon } from "lucide-react";
import { useGallery } from "@/gallery/context";
import type { Item } from "@/content/schema";
import { Button, Input, cn } from "@/ui";
import { CARD_CLASSES_BY_STYLE, INPUT_CLASSES_BY_STYLE, NavIcon, iconStroke } from "../kit";

/** Nav icons in `content.app.nav` order. */
export const CONVERSATION_ICONS: readonly LucideIcon[] = [MessageSquare, Bot, Folder, FileText, Search, Settings];

/** Leading icon per kind of conversation, keyed by `item.badge`. */
const KIND_ICONS: Record<string, LucideIcon> = { Agent: Bot, Team: Users };

const AVATAR_CLASSES = { agent: "bg-primary text-primary-foreground", person: "bg-accent-soft text-accent-text" } as const;

/** A chat with an agent that also holds team threads: the conversation list, the open thread, a composer. */
export function ConversationHome() {
  const { choices, content } = useGallery();
  const { code, composer, items, thread } = content.app;
  const agentName = content.product.name;
  const primaryVariant = choices.buttons === "outline" ? "cta" : "primary";
  const stroke = iconStroke(choices.iconWeight);
  const rowFill = choices.rowHover === "fill";
  const open = items[0];
  const people = Array.from(new Set(thread.map((message) => message.author)));

  // The tool-call card sits in the first message the agent wrote; without an agent message, the first one from anyone else.
  const agentIndex = thread.findIndex((message) => !message.mine && message.author === agentName);
  const cardIndex = agentIndex >= 0 ? agentIndex : thread.findIndex((message) => !message.mine);

  const shelves = new Map<string, { item: Item; active: boolean }[]>();
  items.forEach((item, index) => {
    const name = item.group ?? "";
    shelves.set(name, [...(shelves.get(name) ?? []), { item, active: index === 0 }]);
  });

  return (
    <div className="flex min-h-0 flex-1 border-t border-border">
      <aside className="flex w-[248px] shrink-0 flex-col border-r border-border">
        <div className="shrink-0 p-3">
          <Input placeholder={content.app.search} className={INPUT_CLASSES_BY_STYLE[choices.inputs]} />
        </div>
        <nav className="min-h-0 flex-1 overflow-y-auto px-2 pb-3">
          {Array.from(shelves, ([name, entries]) => (
            <div key={name} className="mb-2">
              {name ? <div className="px-2.5 pt-2 pb-1 text-chrome text-muted-foreground">{name}</div> : null}
              <ul className="flex flex-col gap-0.5">
                {entries.map(({ item, active }) => {
                  const Icon = KIND_ICONS[item.badge ?? ""] ?? MessageSquare;
                  return (
                    <li key={item.title}>
                      <button
                        type="button"
                        aria-current={active ? "true" : undefined}
                        className={cn(
                          "flex w-full items-center gap-2.5 rounded-[var(--radius-control)] px-2.5 py-2 text-left transition-colors duration-[var(--duration-fast)] ease-[var(--ease)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                          active ? "bg-accent-soft text-accent-text" : "text-muted-foreground",
                          !active && rowFill && "cursor-pointer hover:bg-accent",
                        )}
                      >
                        <NavIcon Icon={Icon} iconWeight={choices.iconWeight} />
                        <span className="min-w-0 flex-1">
                          <span className={cn("block truncate text-body", active ? "font-medium text-accent-text" : "text-foreground", item.value && !active && "font-medium")}>{item.title}</span>
                          <span className="block truncate text-chrome text-muted-foreground">{item.meta}</span>
                        </span>
                        {item.value ? (
                          <span className="tabular grid min-w-5 shrink-0 place-items-center rounded-full bg-primary px-1.5 text-chrome text-primary-foreground">{item.value}</span>
                        ) : null}
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </nav>
      </aside>

      <section className="flex min-w-0 flex-1 flex-col">
        <header className="flex h-12 shrink-0 items-center justify-between gap-3 border-b border-border px-5">
          <div className="min-w-0">
            <h2 className="heading truncate text-body leading-tight text-foreground">{open?.title}</h2>
            <p className="truncate text-chrome text-muted-foreground">{people.join(", ")}</p>
          </div>
          <div className="flex shrink-0 -space-x-1.5">
            {people.slice(0, 3).map((name) => (
              <span
                key={name}
                className={cn("grid size-6 place-items-center rounded-full border-2 border-background text-chrome font-medium", AVATAR_CLASSES[name === agentName ? "agent" : "person"])}
              >
                {name.slice(0, 1)}
              </span>
            ))}
          </div>
        </header>

        <div className="flex min-h-0 flex-1 flex-col-reverse overflow-y-auto">
          <div className="flex shrink-0 flex-col gap-3 px-5 py-4">
            {thread.map((message, index) => {
              const previous = thread[index - 1];
              const continued = previous !== undefined && previous.author === message.author && previous.mine === message.mine;
              const fromAgent = message.author === agentName;

              if (message.mine) {
                return (
                  <div key={`${message.author}-${index}`} className={cn("flex justify-end", continued && "-mt-2")}>
                    <p className="max-w-[72%] rounded-lg bg-primary px-3 py-2 text-body text-primary-foreground">{message.text}</p>
                  </div>
                );
              }

              return (
                <div key={`${message.author}-${index}`} className={cn("flex items-start gap-2.5", continued && "-mt-2")}>
                  <div className="size-7 shrink-0">
                    {continued ? null : (
                      <span className={cn("grid size-7 place-items-center rounded-full text-chrome font-medium", AVATAR_CLASSES[fromAgent ? "agent" : "person"])}>
                        {fromAgent ? <Sparkles aria-hidden="true" className="size-3.5" strokeWidth={stroke} /> : message.author.slice(0, 1)}
                      </span>
                    )}
                  </div>
                  <div className="min-w-0 max-w-[80%]">
                    {continued ? null : (
                      <div className="mb-1 flex items-baseline gap-2 text-chrome">
                        <span className="font-medium text-foreground">{message.author}</span>
                        {message.time ? <span className="tabular text-muted-foreground">{message.time}</span> : null}
                      </div>
                    )}
                    <p className="rounded-lg bg-muted px-3 py-2 text-body text-foreground">{message.text}</p>
                    {index === cardIndex && code.lines.length > 0 ? (
                      <div className={cn("mt-2 w-[360px] max-w-full overflow-hidden rounded-lg", CARD_CLASSES_BY_STYLE[choices.cards])}>
                        <div className="flex h-9 items-center gap-2 border-b border-border px-3 text-chrome">
                          <NavIcon Icon={Database} iconWeight={choices.iconWeight} />
                          <span className="min-w-0 flex-1 truncate font-mono text-foreground">{code.path}</span>
                          <Check aria-hidden="true" className="size-4 shrink-0 text-success-text" strokeWidth={stroke} />
                        </div>
                        <pre className="tabular overflow-x-auto px-3 py-2 font-mono text-chrome leading-relaxed text-foreground">
                          <code>{code.lines.join("\n")}</code>
                        </pre>
                      </div>
                    ) : null}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="flex shrink-0 items-center gap-2 border-t border-border px-4 py-3">
          <button
            type="button"
            aria-label="Attach a file"
            className="grid h-control w-control shrink-0 place-items-center rounded-[var(--radius-control)] text-muted-foreground transition-colors duration-[var(--duration-fast)] ease-[var(--ease)] hover:bg-accent hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            <NavIcon Icon={Paperclip} iconWeight={choices.iconWeight} />
          </button>
          <Input placeholder={composer.placeholder} className={cn("min-w-0 flex-1", INPUT_CLASSES_BY_STYLE[choices.inputs])} />
          <Button variant={primaryVariant}>{composer.send}</Button>
        </div>
      </section>
    </div>
  );
}
