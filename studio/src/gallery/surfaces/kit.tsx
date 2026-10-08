import type { ReactNode } from "react";
import { FileText, ImageIcon, Inbox, Link2, Play, ShoppingBag } from "lucide-react";
import type { Item, SurfacePage } from "@/content/schema";
import { useGallery } from "@/gallery/context";
import { CARD_CLASSES_BY_STYLE, INPUT_CLASSES_BY_STYLE, iconStroke } from "@/gallery/app/kit";
import { SpecimenFrame, StateLabel } from "@/gallery/specimens/shared";
import { Button, Input, Skeleton, cn } from "@/ui";

export type SurfaceState = "populated" | "empty" | "loading";

/** Scroll within the shell; wrapping layouts respond to this surface's width, not the studio viewport. */
export function SurfaceBody({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cn("min-h-0 min-w-0 flex-1 overflow-y-auto px-5 pb-6 pt-2", className)}>{children}</div>;
}

export function SurfaceStates({ page, empty, loading }: { page: SurfacePage; empty: ReactNode; loading: ReactNode }) {
  return (
    <SpecimenFrame caption={`${page.title} · states`} detail="Layout specimens">
      <div className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,320px),1fr))] items-start gap-6">
        <section aria-label={`${page.title} · empty`} className="min-w-0">
          <StateLabel>Empty</StateLabel>
          <div className="rounded-lg border border-border p-4">{empty}</div>
        </section>
        <section aria-label={`${page.title} · loading`} className="min-w-0">
          <StateLabel>Loading</StateLabel>
          <div className="rounded-lg border border-border p-4">
            <span className="sr-only">Loading preview of {page.title}</span>
            {loading}
          </div>
        </section>
      </div>
    </SpecimenFrame>
  );
}

export function SurfaceCard({ children, className }: { children: ReactNode; className?: string }) {
  const { choices } = useGallery();
  return <div className={cn("min-w-0 rounded-lg", CARD_CLASSES_BY_STYLE[choices.cards], className)}>{children}</div>;
}

export function EmptyMessage({ text, className }: { text: string; className?: string }) {
  const { choices } = useGallery();
  return (
    <div className={cn("flex min-h-36 flex-col items-center justify-center gap-3 px-4 py-6 text-center", className)}>
      <Inbox aria-hidden="true" className="size-6 text-muted-foreground" strokeWidth={iconStroke(choices.iconWeight)} />
      <p className="max-w-[36ch] break-words text-body text-muted-foreground">{text}</p>
    </div>
  );
}

export function Placeholder({ className }: { className?: string }) {
  return <Skeleton className={cn("!bg-border motion-reduce:animate-none", className)} />;
}

export function TextPlaceholder({ lines = 2 }: { lines?: number }) {
  return (
    <div aria-hidden="true" className="min-w-0 space-y-2">
      <Placeholder className="h-3 w-2/3" />
      {Array.from({ length: lines }, (_, index) => <Placeholder key={index} className={cn("h-2.5", index === lines - 1 ? "w-4/5" : "w-full")} />)}
    </div>
  );
}

export function Avatar({ name, mine = false }: { name: string; mine?: boolean }) {
  return (
    <span aria-hidden="true" className={cn("grid size-8 shrink-0 place-items-center rounded-full text-chrome font-medium", mine ? "bg-primary text-primary-foreground" : "bg-accent-soft text-accent-text")}>
      {name.slice(0, 1)}
    </span>
  );
}

/** Abstract, token-colored art, not a product photograph or an imported asset. */
export function ItemArt({ item, index = 0, media = false, className }: { item: Item; index?: number; media?: boolean; className?: string }) {
  const { choices } = useGallery();
  const Icon = media ? (item.badge === "Video" ? Play : item.badge === "Link" ? Link2 : item.badge === "Photo" ? ImageIcon : FileText) : ShoppingBag;
  return (
    <div aria-hidden="true" className={cn("relative grid min-w-0 place-items-center overflow-hidden rounded-md bg-accent-soft text-accent-text", className)}>
      <span className="absolute inset-0 bg-primary" style={{ opacity: 0.06 + (index % 3) * 0.05 }} />
      <span className="absolute -top-5 -right-5 size-24 rounded-full border-[12px] border-primary/10" />
      <span className="absolute -bottom-5 left-4 h-20 w-32 rotate-[-20deg] rounded-xl border-[12px] border-primary/10" />
      <Icon className="relative size-7" strokeWidth={iconStroke(choices.iconWeight)} />
    </div>
  );
}

/** Draft fields are editable specimens; send is deliberately disabled, with no network claim. */
export function Composer({ placeholder, send, loading = false }: { placeholder: string; send: string; loading?: boolean }) {
  const { choices } = useGallery();
  return (
    <div className="min-w-0 border-t border-border pt-3">
      <div className="flex flex-wrap items-end gap-2">
        <label className="min-w-0 flex-[1_1_160px]">
          <span className="sr-only">{placeholder}</span>
          <Input placeholder={placeholder} disabled={loading} className={INPUT_CLASSES_BY_STYLE[choices.inputs]} />
        </label>
        <Button disabled>{send}</Button>
      </div>
      <p className="mt-2 text-chrome text-muted-foreground">Composer specimen · nothing is sent.</p>
    </div>
  );
}

export function groupItems(items: Item[]): { name: string; items: Item[] }[] {
  const groups = new Map<string, Item[]>();
  for (const item of items) {
    const name = item.group ?? "";
    const group = groups.get(name);
    if (group) group.push(item);
    else groups.set(name, [item]);
  }
  return Array.from(groups, ([name, grouped]) => ({ name, items: grouped }));
}

export const SELECTABLE_ROW = "rounded-[var(--radius-control)] text-left transition-colors duration-[var(--duration-fast)] ease-[var(--ease)] motion-reduce:transition-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1 focus-visible:ring-offset-background";
