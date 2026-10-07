import { useState } from "react";
import { Coffee, Frame, Gem, Heart, Lamp, LayoutGrid, Lock, MessageSquare, Package, Search, Settings, Shirt, ShoppingBag, Star, Store, Truck, type LucideIcon } from "lucide-react";
import { useGallery } from "@/gallery/context";
import { Button, Input, Select, cn } from "@/ui";
import { CARD_CLASSES_BY_STYLE, INPUT_CLASSES_BY_STYLE, NavIcon, iconStroke } from "../kit";

/** Nav icons in `content.app.nav` order. */
export const COMMERCE_ICONS: readonly LucideIcon[] = [Store, LayoutGrid, Package, Heart, MessageSquare, Settings];

const ALL_CATEGORIES = "All categories";

/** Product art per category; unknown categories fall back to the bag. */
const CATEGORY_ICONS: Record<string, LucideIcon> = { Ceramics: Coffee, Textiles: Shirt, Prints: Frame, Jewelry: Gem, Home: Lamp };

/** Cover gradients over the accent ramp, cycled by listing position. */
const COVER_GRADIENTS: readonly string[] = [
  "bg-[linear-gradient(135deg,var(--chart-3),var(--chart-5))]",
  "bg-[radial-gradient(circle_at_75%_25%,var(--chart-2),transparent_65%)]",
  "bg-[linear-gradient(200deg,var(--chart-4),var(--chart-2))]",
  "bg-[radial-gradient(circle_at_20%_80%,var(--chart-1),transparent_60%)]",
  "bg-[conic-gradient(from_210deg_at_70%_70%,var(--chart-3),var(--chart-5),var(--chart-3))]",
];

/** A marketplace storefront: filter bar, a grid of listings and the cart beside it. */
export function CommerceHome() {
  const { choices, content } = useGallery();
  const [category, setCategory] = useState(ALL_CATEGORIES);
  const [flags, setFlags] = useState<string[]>([]);

  const primaryVariant = choices.buttons === "outline" ? "cta" : "primary";
  const secondaryVariant = choices.buttons === "outline" ? "outline" : "ghost";
  const cardClasses = CARD_CLASSES_BY_STYLE[choices.cards];
  const inputClasses = INPUT_CLASSES_BY_STYLE[choices.inputs];
  const rowHover = choices.rowHover === "fill" && "cursor-pointer transition-colors duration-[var(--duration-fast)] ease-[var(--ease)] hover:bg-accent";
  const stroke = iconStroke(choices.iconWeight);

  const items = content.app.items;
  const categories = [ALL_CATEGORIES, ...new Set(items.flatMap((item) => (item.group ? [item.group] : [])))];
  const flagOptions = [...new Set(items.flatMap((item) => (item.badge ? [item.badge] : [])))].slice(0, 3);
  const listings = items
    .map((item, index) => ({ item, index }))
    .filter(({ item }) => (category === ALL_CATEGORIES || item.group === category) && (flags.length === 0 || flags.includes(item.badge ?? "")));

  const cart = items.slice(0, 3);
  const parcels = new Set(cart.map((line) => line.meta)).size;
  const currency = cart[0]?.value?.match(/^\D*/)?.[0] ?? "";
  const subtotal = cart.reduce((sum, line) => sum + (Number.parseFloat(line.value?.replace(/[^0-9.]/g, "") ?? "") || 0), 0);
  const update = content.app.panel.items[0];

  return (
    <>
      <div className="flex shrink-0 items-center gap-2 border-b border-border px-8 py-3">
        <div className="w-[176px] shrink-0">
          <Select options={categories} value={category} onChange={setCategory} className={inputClasses} />
        </div>
        <div className="relative min-w-0 flex-1">
          <Search aria-hidden="true" className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" strokeWidth={stroke} />
          <Input placeholder={content.app.search} className={cn("!pl-9", inputClasses)} />
        </div>
        <div className="flex shrink-0 items-center gap-1.5">
          {flagOptions.map((flag) => {
            const active = flags.includes(flag);
            return (
              <button
                key={flag}
                type="button"
                aria-pressed={active}
                onClick={() => setFlags(active ? flags.filter((current) => current !== flag) : [...flags, flag])}
                className={cn(
                  "h-[calc(var(--control-h)-4px)] shrink-0 rounded-[var(--radius-control)] border px-2.5 text-chrome font-medium transition-colors duration-[var(--duration-fast)] ease-[var(--ease)]",
                  active ? "border-transparent bg-accent-soft text-accent-text" : "border-border text-muted-foreground hover:bg-accent hover:text-foreground",
                )}
              >
                {flag}
              </button>
            );
          })}
        </div>
      </div>

      <div className="flex min-h-0 flex-1 gap-5 px-8 pt-4 pb-6">
        <div className="-m-2 min-h-0 min-w-0 flex-1 overflow-y-auto p-2">
          {listings.length > 0 ? (
            <div className="grid grid-cols-[repeat(auto-fill,minmax(150px,1fr))] gap-4">
              {listings.map(({ item, index }) => {
                const Art = CATEGORY_ICONS[item.group ?? ""] ?? ShoppingBag;
                return (
                  <article
                    key={item.title}
                    className={cn(
                      "flex min-w-0 cursor-pointer flex-col overflow-hidden rounded-lg transition-[transform,box-shadow] duration-[var(--duration-base)] ease-[var(--ease)] hover:-translate-y-0.5",
                      cardClasses,
                    )}
                  >
                    <div className={cn("relative grid aspect-[5/4] place-items-center overflow-hidden bg-accent-soft", COVER_GRADIENTS[index % COVER_GRADIENTS.length])}>
                      <span aria-hidden="true" className="absolute -right-5 -bottom-5 size-20 rounded-full bg-background/25" />
                      <span className={cn("relative grid size-12 place-items-center text-accent-text", choices.iconWeight === "tiles" && "rounded-lg bg-background/80")}>
                        <Art aria-hidden="true" className="size-6" strokeWidth={stroke} />
                      </span>
                      {item.badge ? (
                        <span className="absolute top-2 left-2 max-w-[calc(100%-52px)] truncate rounded-sm bg-background/90 px-1.5 py-0.5 text-chrome font-medium text-foreground">{item.badge}</span>
                      ) : null}
                      <button
                        type="button"
                        aria-label={`Save ${item.title}`}
                        className="absolute top-2 right-2 grid size-7 place-items-center rounded-[var(--radius-control)] bg-background/90 text-foreground transition-colors duration-[var(--duration-fast)] ease-[var(--ease)] hover:bg-accent hover:text-accent-text"
                      >
                        <Heart aria-hidden="true" className="size-3.5" strokeWidth={stroke} />
                      </button>
                    </div>
                    <div className="flex min-w-0 flex-col p-3">
                      <div className="truncate font-medium text-foreground">{item.title}</div>
                      <div className="truncate text-chrome text-muted-foreground">{item.meta}</div>
                      <div className="mt-2 flex items-center justify-between gap-2 whitespace-nowrap">
                        <span className="tabular font-medium text-foreground">{item.value}</span>
                        {item.body ? (
                          <span className="flex min-w-0 items-center gap-1 text-chrome tabular text-muted-foreground">
                            <Star aria-hidden="true" className="size-3.5 shrink-0 fill-current text-warning-text" strokeWidth={stroke} />
                            <span className="truncate">{item.body}</span>
                          </span>
                        ) : null}
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          ) : (
            <div className="flex h-full flex-col items-center justify-center gap-1 text-center">
              <div className="font-medium text-foreground">{content.app.empty.title}</div>
              <p className="max-w-[36ch] text-chrome text-muted-foreground">{content.app.empty.body}</p>
              <Button
                variant={secondaryVariant}
                className="mt-3"
                onClick={() => {
                  setCategory(ALL_CATEGORIES);
                  setFlags([]);
                }}
              >
                {content.app.empty.action}
              </Button>
            </div>
          )}
        </div>

        <aside className="-m-2 flex min-h-0 w-[264px] shrink-0 flex-col gap-3 overflow-y-auto p-2">
          <section className={cn("rounded-lg p-4", cardClasses)}>
            <div className="flex items-baseline justify-between gap-2">
              <h2 className="heading text-body text-foreground">Your cart</h2>
              <span className="tabular text-chrome text-muted-foreground">{cart.length}</span>
            </div>
            <ul className="mt-3 -mx-2 divide-y divide-border border-y border-border">
              {cart.map((line, index) => (
                <li key={line.title} className={cn("flex items-center gap-2.5 px-2 py-2.5", rowHover)}>
                  <span aria-hidden="true" className={cn("size-10 shrink-0 rounded-md bg-accent-soft", COVER_GRADIENTS[index % COVER_GRADIENTS.length])} />
                  <div className="min-w-0 flex-1">
                    <div className="truncate font-medium text-foreground">{line.title}</div>
                    <div className="truncate text-chrome text-muted-foreground">{line.meta}</div>
                  </div>
                  <span className="tabular text-foreground">{line.value}</span>
                </li>
              ))}
            </ul>
            <div className="mt-3 flex items-center justify-between gap-2 text-chrome text-muted-foreground">
              <span className="flex items-center gap-2">
                <NavIcon Icon={Truck} iconWeight={choices.iconWeight} />
                Shipping
              </span>
              <span className="tabular">{parcels} {parcels === 1 ? "parcel" : "parcels"}</span>
            </div>
            <div className="mt-3 flex items-baseline justify-between gap-2 font-medium text-foreground">
              <span>Subtotal</span>
              <span className="tabular text-lg">{currency}{subtotal.toFixed(2)}</span>
            </div>
            <Button variant={primaryVariant} size="lg" className="mt-4 w-full">
              <Lock aria-hidden="true" className="size-4" strokeWidth={stroke} />
              {content.app.form.submit}
            </Button>
          </section>

          {update ? (
            <section className={cn("rounded-lg p-4", cardClasses)}>
              <div className="flex items-center gap-2 text-chrome text-muted-foreground">
                <NavIcon Icon={Package} iconWeight={choices.iconWeight} />
                <span>{content.app.panel.title}</span>
              </div>
              <div className="mt-2 font-medium text-foreground">{update.title}</div>
              <p className="mt-1 line-clamp-3 text-chrome text-muted-foreground">{update.body}</p>
              <div className="mt-3 flex gap-2">
                <Button size="sm" variant={secondaryVariant}>{update.actions[0]}</Button>
                <Button size="sm" variant={secondaryVariant}>{update.actions[1]}</Button>
              </div>
            </section>
          ) : null}
        </aside>
      </div>
    </>
  );
}
