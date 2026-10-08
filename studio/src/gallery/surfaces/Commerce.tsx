import { useId, useState, type ReactNode } from "react";
import { ShoppingBag } from "lucide-react";
import type { Item } from "@/content/schema";
import { useGallery } from "@/gallery/context";
import { iconStroke } from "@/gallery/app/kit";
import { Badge, Button, cn } from "@/ui";
import { EmptyMessage, ItemArt, Placeholder, SELECTABLE_ROW, SurfaceBody, SurfaceCard, SurfaceStates, TextPlaceholder, groupItems, type SurfaceState } from "./kit";

function Listing({ item, index, row = false, nested = false }: { item: Item; index: number; row?: boolean; nested?: boolean }) {
  const { content } = useGallery();
  const Heading = nested ? "h3" : "h2";
  return (
    <article className="min-w-0">
      <SurfaceCard className={cn("overflow-hidden", row && "flex flex-wrap items-center gap-4 p-3")}>
        <ItemArt item={item} index={index} className={row ? "size-20 shrink-0" : "aspect-[5/4] rounded-none"} />
        <div className={cn("min-w-0", row ? "flex-[1_1_180px]" : "p-3")}>
          <div className="mb-1 flex flex-wrap items-center gap-2">{item.badge ? <Badge>{item.badge}</Badge> : null}{item.group ? <span className="text-chrome text-muted-foreground">{item.group}</span> : null}</div>
          <Heading className="heading break-words text-body">{item.title}</Heading>
          <p className="mt-1 break-words text-chrome text-muted-foreground">{item.meta}</p>
          {item.body ? <p className="mt-2 break-words text-chrome leading-relaxed text-muted-foreground">{item.body}</p> : null}
          <div className="mt-3 flex flex-wrap items-center justify-between gap-2">
            {item.value ? <span className="font-medium tabular">{item.value}</span> : null}
            <Button size="sm" disabled>{content.surfaces.commerce.buy}</Button>
          </div>
        </div>
      </SurfaceCard>
    </article>
  );
}

function LoadingListing({ row = false }: { row?: boolean }) {
  return (
    <SurfaceCard className={cn("overflow-hidden", row && "flex items-start gap-4 p-3")}>
      <Placeholder className={row ? "size-20 shrink-0" : "aspect-[5/4] rounded-none"} />
      <div className={cn("min-w-0", row ? "flex-1" : "p-3")}><TextPlaceholder lines={2} /><div className="mt-4 flex justify-between gap-3"><Placeholder className="h-4 w-14" /><Placeholder className="h-control w-20" /></div></div>
    </SurfaceCard>
  );
}

function FeaturedListing({ item, index, loading = false }: { item?: Item; index: number; loading?: boolean }) {
  const { content } = useGallery();
  return (
    <SurfaceCard className="flex flex-wrap overflow-hidden">
      {loading ? <Placeholder className="min-h-44 flex-[1_1_240px] rounded-none" /> : item ? <ItemArt item={item} index={index} className="min-h-44 flex-[1_1_240px] rounded-none" /> : <div aria-hidden="true" className="min-h-44 flex-[1_1_240px] bg-muted/40" />}
      <div className="min-w-0 flex-[1_1_240px] p-5">
        {loading ? <><TextPlaceholder lines={4} /><Placeholder className="mt-5 h-control w-24" /></> : item ? <>
          {item.badge ? <Badge>{item.badge}</Badge> : null}
          <h2 className="heading mt-2 break-words text-xl">{item.title}</h2>
          <p className="mt-2 break-words text-chrome text-muted-foreground">{item.meta}</p>
          {item.body ? <p className="mt-3 whitespace-pre-wrap break-words text-body leading-relaxed">{item.body}</p> : null}
          <div className="mt-5 flex flex-wrap items-center gap-4">{item.value ? <span className="text-lg font-medium tabular">{item.value}</span> : null}<Button disabled>{content.surfaces.commerce.buy}</Button></div>
        </> : <EmptyMessage text={content.surfaces.commerce.empty} className="min-h-32" />}
      </div>
    </SurfaceCard>
  );
}

function CommerceView({ state = "populated" }: { state?: SurfaceState }) {
  const { content, choices } = useGallery();
  const page = content.surfaces.commerce;
  const [selectedListing, setSelectedListing] = useState(0);
  const detailId = useId();
  const loading = state === "loading";
  const empty = state === "empty" || (state === "populated" && page.listings.length === 0);
  const selectedIndex = Math.min(selectedListing, Math.max(0, page.listings.length - 1));
  const selected = page.listings[selectedIndex];

  let listings: ReactNode;
  if (choices.commerceLayout === "list") {
    listings = <div className="space-y-3 border-t border-border pt-3">{empty ? <div className="border-b border-border"><EmptyMessage text={page.empty} className="items-start text-left" /></div> : loading ? [0, 1, 2].map((index) => <LoadingListing key={index} row />) : page.listings.map((item, index) => <Listing key={`${item.title}-${index}`} item={item} index={index} row />)}</div>;
  } else if (choices.commerceLayout === "shelves") {
    listings = <div className="space-y-6">
      <FeaturedListing item={empty ? undefined : page.listings[0]} index={0} loading={loading} />
      {empty ? <div aria-hidden="true" className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,150px),1fr))] gap-3 border-t border-border pt-4">{[0, 1, 2].map((index) => <div key={index} className="h-24 rounded-lg border border-dashed border-border" />)}</div> : loading ? [0, 1].map((group) => <section key={group}><Placeholder className="mb-3 h-4 w-1/3" /><div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,150px),1fr))] gap-3">{[0, 1, 2].map((index) => <LoadingListing key={index} />)}</div></section>) : groupItems(page.listings.slice(1)).map((group) => <section key={group.name}>{group.name ? <h2 className="heading mb-3 text-body">{group.name}</h2> : null}<div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,150px),1fr))] items-start gap-3">{group.items.map((item, index) => <Listing key={`${item.title}-${index}`} item={item} index={index + 1} nested={Boolean(group.name)} />)}</div></section>)}
    </div>;
  } else if (choices.commerceLayout === "split") {
    listings = <div className="flex min-w-0 flex-wrap items-start gap-5">
      <section aria-label={page.title} className="min-w-0 flex-[1_1_220px]">
        {empty ? <div className="min-h-56 rounded-lg border border-border"><EmptyMessage text={page.empty} /></div> : loading ? <div className="space-y-3">{[0, 1, 2].map((index) => <div key={index} className="flex gap-3 rounded-lg border border-border p-3"><Placeholder className="size-12 shrink-0" /><div className="min-w-0 flex-1"><TextPlaceholder lines={1} /></div></div>)}</div> : <ul className="space-y-1">
          {page.listings.map((item, index) => <li key={`${item.title}-${index}`}><button type="button" aria-pressed={index === selectedIndex} aria-controls={detailId} onClick={() => setSelectedListing(index)} className={cn("flex w-full items-start gap-3 border p-3", SELECTABLE_ROW, index === selectedIndex ? "border-primary bg-accent-soft text-accent-text" : "border-transparent hover:bg-accent")}><ItemArt item={item} index={index} className="size-12 shrink-0" /><span className="min-w-0 flex-1"><span className="block break-words font-medium">{item.title}</span><span className="mt-1 block break-words text-chrome text-muted-foreground">{item.meta}</span>{item.value ? <span className="mt-1 block text-chrome tabular">{item.value}</span> : null}</span></button></li>)}
        </ul>}
      </section>
      <section id={detailId} aria-label={selected && !empty && !loading ? selected.title : `${page.title} detail`} className="min-w-0 flex-[2_1_320px]">
        {empty ? <div aria-hidden="true" className="min-h-56 rounded-lg border border-dashed border-border bg-muted/20" /> : <FeaturedListing item={selected} index={selectedIndex} loading={loading} />}
      </section>
    </div>;
  } else {
    listings = <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,170px),1fr))] items-start gap-4">{empty ? <><SurfaceCard><EmptyMessage text={page.empty} /></SurfaceCard><div aria-hidden="true" className="min-h-36 rounded-lg border border-dashed border-border" /></> : loading ? [0, 1, 2, 3].map((index) => <LoadingListing key={index} />) : page.listings.map((item, index) => <Listing key={`${item.title}-${index}`} item={item} index={index} />)}</div>;
  }

  return (
    <div className="min-w-0">
      <header className="mb-4 flex flex-wrap items-center justify-between gap-3 border-b border-border pb-3">
        <p className="min-w-0 text-chrome text-muted-foreground">Storefront specimen · buying and checkout are disabled.</p>
        <div className="flex flex-wrap items-center gap-3"><span className="flex items-center gap-2 text-chrome"><ShoppingBag aria-hidden="true" className="size-4" strokeWidth={iconStroke(choices.iconWeight)} />{page.cart}</span><Button variant="outline" size="sm" disabled>{page.checkout}</Button></div>
      </header>
      {listings}
    </div>
  );
}

export function CommerceBody() {
  return <SurfaceBody><CommerceView /></SurfaceBody>;
}

export function CommerceStates() {
  const { content } = useGallery();
  return <SurfaceStates page={content.surfaces.commerce} empty={<CommerceView state="empty" />} loading={<CommerceView state="loading" />} />;
}
