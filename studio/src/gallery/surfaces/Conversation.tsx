import type { Message } from "@/content/schema";
import { useGallery } from "@/gallery/context";
import { cn } from "@/ui";
import { Avatar, Composer, EmptyMessage, Placeholder, SurfaceBody, SurfaceCard, SurfaceStates, TextPlaceholder, type SurfaceState } from "./kit";

function MessageMeta({ message, continued = false }: { message: Message; continued?: boolean }) {
  return (
    <header className={cn("mb-1 flex flex-wrap items-baseline gap-x-2 gap-y-0.5 text-chrome", continued && "sr-only")}>
      <span className="font-medium">{message.author}</span>
      {message.time ? <span className="tabular text-muted-foreground">{message.time}</span> : null}
    </header>
  );
}

function ThreadContents({ layout, state }: { layout: string; state: SurfaceState }) {
  const { content, choices } = useGallery();
  const page = content.surfaces.conversation;
  const thread = content.app.thread;
  const empty = state === "empty" || (state === "populated" && thread.length === 0);

  if (empty) {
    return (
      <div className={cn("min-h-44", layout === "bubbles" ? "rounded-lg bg-muted/40" : layout === "transcript" ? "border-y border-border" : "border-l-2 border-border")}>
        <EmptyMessage text={page.empty} className={layout === "channel" ? "items-start text-left" : undefined} />
      </div>
    );
  }

  if (state === "loading") {
    return (
      <div className={cn("space-y-4", layout === "transcript" && "space-y-6")}>
        {[0, 1, 2, 3].map((index) => (
          <div key={index} className={cn("flex gap-2.5", layout === "bubbles" && index % 2 === 1 && "justify-end")}>
            {layout !== "bubbles" || index % 2 === 0 ? <Placeholder className="size-8 shrink-0 rounded-full" /> : null}
            <div className={cn("min-w-0", layout === "bubbles" ? "w-4/5 rounded-lg border border-border p-3" : "flex-1", layout === "transcript" && "border-b border-border pb-5")}>
              <Placeholder className="mb-3 h-2.5 w-1/3" />
              <TextPlaceholder lines={layout === "transcript" ? 3 : 1} />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (layout === "bubbles") {
    return (
      <ol aria-label={page.title} className="flex flex-col gap-4">
        {thread.map((message, index) => (
          <li key={`${message.author}-${index}`} className={cn("flex items-start gap-2.5", message.mine && "justify-end")}>
            {message.mine ? null : <Avatar name={message.author} />}
            <article className="min-w-0 max-w-[85%]">
              <MessageMeta message={message} />
              <p className={cn("whitespace-pre-wrap break-words rounded-lg px-3 py-2 text-body leading-relaxed", message.mine ? "bg-primary text-primary-foreground" : "bg-muted text-foreground")}>{message.text}</p>
            </article>
          </li>
        ))}
      </ol>
    );
  }

  if (layout === "transcript") {
    return (
      <ol aria-label={page.title} className="space-y-6">
        {thread.map((message, index) => (
          <li key={`${message.author}-${index}`} className="border-b border-border pb-6 last:border-b-0">
            <article>
              <div className="mb-3 flex items-center gap-2.5"><Avatar name={message.author} mine={message.mine} /><MessageMeta message={message} /></div>
              <p className="whitespace-pre-wrap break-words text-body leading-[1.8]">{message.text}</p>
            </article>
          </li>
        ))}
      </ol>
    );
  }

  return (
    <ol aria-label={page.title} className="space-y-1">
      {thread.map((message, index) => {
        const previous = thread[index - 1];
        const continued = previous !== undefined && previous.author === message.author && previous.mine === message.mine;
        return (
          <li key={`${message.author}-${index}`} className={cn("rounded-md px-1 py-1", !continued && index > 0 && "pt-4", choices.rowHover === "fill" && "hover:bg-accent")}>
            <article className="flex gap-2.5">
              <div className="w-8 shrink-0">{continued ? null : <Avatar name={message.author} mine={message.mine} />}</div>
              <div className="min-w-0 flex-1"><MessageMeta message={message} continued={continued} /><p className="whitespace-pre-wrap break-words text-body leading-relaxed">{message.text}</p></div>
            </article>
          </li>
        );
      })}
    </ol>
  );
}

function ConversationContext({ loading = false }: { loading?: boolean }) {
  const { content } = useGallery();
  const context = content.surfaces.conversation.context;
  return (
    <aside className="min-w-0 flex-[1_1_220px]">
      <SurfaceCard className="p-4">
        {loading ? <><TextPlaceholder lines={3} /><div className="mt-5 space-y-4"><TextPlaceholder lines={1} /><TextPlaceholder lines={1} /></div></> : <>
          <h2 className="heading break-words text-body">{context.title}</h2>
          <p className="mt-2 whitespace-pre-wrap break-words text-body leading-relaxed text-muted-foreground">{context.body}</p>
          <dl className="mt-4 divide-y divide-border">
            {context.facts.map((fact, index) => <div key={`${fact.label}-${index}`} className="flex flex-wrap justify-between gap-x-4 gap-y-1 py-2"><dt className="text-chrome text-muted-foreground">{fact.label}</dt><dd className="break-words text-chrome font-medium">{fact.value}</dd></div>)}
          </dl>
        </>}
      </SurfaceCard>
    </aside>
  );
}

function ConversationView({ state = "populated" }: { state?: SurfaceState }) {
  const { content, choices } = useGallery();
  const page = content.surfaces.conversation;
  const context = choices.conversationLayout === "context";
  const layout = context ? "channel" : choices.conversationLayout;
  const thread = (
    <section className={cn("min-w-0", context && "flex-[2_1_360px]")}>
      {!context ? <header className="mb-4 border-b border-border pb-3"><h2 className="heading break-words text-body">{page.context.title}</h2></header> : null}
      <ThreadContents layout={layout} state={state} />
      <div className="mt-5"><Composer placeholder={content.app.composer.placeholder} send={content.app.composer.send} loading={state === "loading"} /></div>
    </section>
  );
  if (context) return <div className="flex min-w-0 flex-wrap items-start gap-5">{thread}<ConversationContext loading={state === "loading"} /></div>;
  return <div className={cn("mx-auto min-w-0", layout === "transcript" ? "max-w-[72ch]" : "max-w-[760px]")}>{thread}</div>;
}

export function ConversationBody() {
  return <SurfaceBody><ConversationView /></SurfaceBody>;
}

export function ConversationStates() {
  const { content } = useGallery();
  return <SurfaceStates page={content.surfaces.conversation} empty={<ConversationView state="empty" />} loading={<ConversationView state="loading" />} />;
}
