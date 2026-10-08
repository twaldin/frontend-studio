import type { Item } from "@/content/schema";
import { useGallery } from "@/gallery/context";
import { Badge, cn } from "@/ui";
import { Avatar, Composer, EmptyMessage, ItemArt, Placeholder, SELECTABLE_ROW, SurfaceBody, SurfaceCard, SurfaceStates, TextPlaceholder, groupItems, type SurfaceState } from "./kit";

function Entry({ item, index, mediaFirst = false }: { item: Item; index: number; mediaFirst?: boolean }) {
  return (
    <article className="min-w-0">
      <SurfaceCard className="overflow-hidden">
        {mediaFirst ? <ItemArt item={item} index={index} media className="aspect-[3/2] rounded-none" /> : null}
        <div className="p-4">
          <header className="flex items-center gap-2.5">
            {mediaFirst ? null : <Avatar name={item.meta} />}
            <p className="min-w-0 break-words text-chrome text-muted-foreground">{item.meta}</p>
            {item.badge ? <span className="ml-auto shrink-0"><Badge>{item.badge}</Badge></span> : null}
          </header>
          <h2 className="heading mt-3 break-words text-body">{item.title}</h2>
          {item.body ? <p className="mt-2 whitespace-pre-wrap break-words text-body leading-relaxed">{item.body}</p> : null}
          {!mediaFirst && item.badge ? <ItemArt item={item} index={index} media className="mt-3 h-32" /> : null}
          {item.value ? <footer className="mt-3 border-t border-border pt-2 text-chrome tabular text-muted-foreground">{item.value}</footer> : null}
        </div>
      </SurfaceCard>
    </article>
  );
}

function LoadingEntry({ mediaFirst = false }: { mediaFirst?: boolean }) {
  return (
    <SurfaceCard className="overflow-hidden">
      {mediaFirst ? <Placeholder className="aspect-[3/2] rounded-none" /> : null}
      <div className="space-y-4 p-4">
        <div className="flex items-center gap-2.5">
          {mediaFirst ? null : <Placeholder className="size-8 shrink-0 rounded-full" />}
          <Placeholder className="h-2.5 w-2/5" />
        </div>
        <TextPlaceholder lines={2} />
        <Placeholder className="h-2 w-1/3" />
      </div>
    </SurfaceCard>
  );
}

function CompactEntry({ item, index }: { item: Item; index: number }) {
  const { choices } = useGallery();
  return (
    <li className="min-w-0 border-b border-border py-2.5 last:border-b-0">
      <details className="min-w-0">
        <summary className={cn("flex cursor-pointer list-none items-baseline gap-3 px-1 py-1", SELECTABLE_ROW, choices.rowHover === "fill" && "hover:bg-accent")}>
          <span aria-hidden="true" className="w-5 shrink-0 text-right text-chrome tabular text-muted-foreground">{index + 1}</span>
          <span className="min-w-0 flex-1">
            <span className="block break-words font-medium text-accent-text underline-offset-4 hover:underline">{item.title}</span>
            <span className="mt-1 block break-words text-chrome text-muted-foreground">{item.meta}</span>
          </span>
          {item.value ? <span className="max-w-[30%] shrink-0 text-right text-chrome tabular text-muted-foreground">{item.value}</span> : null}
        </summary>
        <div className="ml-9 space-y-2 pb-2 pt-3">
          {item.badge ? <Badge>{item.badge}</Badge> : null}
          {item.body ? <p className="whitespace-pre-wrap break-words leading-relaxed">{item.body}</p> : null}
        </div>
      </details>
    </li>
  );
}

function FeedView({ state = "populated" }: { state?: SurfaceState }) {
  const { choices, content } = useGallery();
  const page = content.surfaces.feed;
  const empty = state === "empty" || (state === "populated" && page.entries.length === 0);
  const loading = state === "loading";
  const layout = choices.feedLayout;
  const composer = <SurfaceCard className="mb-4 p-4"><Composer placeholder={page.composer} send={page.action} loading={loading} /></SurfaceCard>;

  if (layout === "cards") {
    return (
      <div className="min-w-0">
        {composer}
        <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,220px),1fr))] items-start gap-4">
          {empty ? <><SurfaceCard><EmptyMessage text={page.empty} /></SurfaceCard><div aria-hidden="true" className="min-h-36 rounded-lg border border-dashed border-border" /></> : null}
          {loading ? [0, 1, 2, 3].map((index) => <LoadingEntry key={index} mediaFirst />) : null}
          {!empty && !loading ? page.entries.map((item, index) => <Entry key={`${item.title}-${index}`} item={item} index={index} mediaFirst />) : null}
        </div>
      </div>
    );
  }

  if (layout === "compact") {
    return (
      <div className="min-w-0">
        {composer}
        <div className="border-y border-border">
          {empty ? <EmptyMessage text={page.empty} className="min-h-24 items-start text-left" /> : null}
          {loading ? <div className="divide-y divide-border">{[0, 1, 2, 3].map((index) => <div key={index} className="flex gap-3 py-3"><Placeholder className="h-3 w-5 shrink-0" /><div className="min-w-0 flex-1"><TextPlaceholder lines={1} /></div><Placeholder className="h-3 w-12 shrink-0" /></div>)}</div> : null}
          {!empty && !loading ? <ol>{page.entries.map((item, index) => <CompactEntry key={`${item.title}-${index}`} item={item} index={index} />)}</ol> : null}
        </div>
      </div>
    );
  }

  if (layout === "digest") {
    return (
      <div className="mx-auto min-w-0 max-w-[76ch]">
        {composer}
        {empty ? <section className="border-l-2 border-border pl-4"><h2 className="heading text-body">{page.title}</h2><EmptyMessage text={page.empty} className="items-start px-0 text-left" /></section> : null}
        {loading ? [0, 1].map((group) => <div key={group} className="mb-6 border-l-2 border-border pl-4"><Placeholder className="mb-4 h-4 w-1/3" /><div className="space-y-5"><TextPlaceholder lines={2} /><TextPlaceholder lines={1} /></div></div>) : null}
        {!empty && !loading ? groupItems(page.entries).map((group) => (
          <section key={group.name} className="mb-6 border-l-2 border-border pl-4">
            {group.name ? <h2 className="heading mb-3 text-body text-accent-text">{group.name}</h2> : null}
            <ul className="space-y-4">
              {group.items.map((item, index) => (
                <li key={`${item.title}-${index}`}>
                  <article>
                    <h3 className="heading break-words text-body">{item.title}</h3>
                    {item.body ? <p className="mt-1 break-words text-body leading-relaxed text-muted-foreground">{item.body}</p> : null}
                    <p className="mt-1 break-words text-chrome text-muted-foreground">{item.meta}{item.value ? ` · ${item.value}` : ""}</p>
                    {item.badge ? <Badge>{item.badge}</Badge> : null}
                  </article>
                </li>
              ))}
            </ul>
          </section>
        )) : null}
      </div>
    );
  }

  return (
    <div className="mx-auto min-w-0 max-w-[680px]">
      {composer}
      <div className="space-y-4">
        {empty ? <div className="border-y border-border"><EmptyMessage text={page.empty} /></div> : null}
        {loading ? [0, 1, 2].map((index) => <LoadingEntry key={index} />) : null}
        {!empty && !loading ? page.entries.map((item, index) => <Entry key={`${item.title}-${index}`} item={item} index={index} />) : null}
      </div>
    </div>
  );
}

export function FeedBody() {
  return <SurfaceBody><FeedView /></SurfaceBody>;
}

export function FeedStates() {
  const { content } = useGallery();
  return <SurfaceStates page={content.surfaces.feed} empty={<FeedView state="empty" />} loading={<FeedView state="loading" />} />;
}
