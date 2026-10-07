import { useState } from "react";
import { ArrowDownUp, ArrowRightLeft, Banknote, Clock, Copy, Droplet, Keyboard, Ruler, Scale, Settings, Star, TrendingUp, type LucideIcon } from "lucide-react";
import { useGallery } from "@/gallery/context";
import { Badge, Button, Input, Kbd, Select, Tabs, cn } from "@/ui";
import { CARD_CLASSES_BY_STYLE, INPUT_CLASSES_BY_STYLE, NavIcon, iconStroke } from "../kit";

/** Nav icons in `content.app.nav` order. */
export const UTILITY_ICONS: readonly LucideIcon[] = [ArrowRightLeft, Clock, Star, TrendingUp, Keyboard, Settings];

/** `items` groups: chips under the result, the footer's shortcuts. Every other item is a past conversion. */
const PRESETS_GROUP = "Presets";
const SHORTCUTS_GROUP = "Shortcuts";

/** Units per category, each as its size in the category's base unit: USD, meter, kilogram, liter. */
const CATEGORIES: Record<string, Record<string, number>> = {
  Currency: { USD: 1, EUR: 1.0842, GBP: 1.2631, JPY: 0.006605, CAD: 0.7345 },
  Length: { km: 1000, mi: 1609.344, m: 1, ft: 0.3048, in: 0.0254 },
  Weight: { kg: 1, lb: 0.45359237, oz: 0.028349523, g: 0.001 },
  Volume: { L: 1, ml: 0.001, cup: 0.2365882, gal: 3.785411784 },
};
const CATEGORY_NAMES = Object.keys(CATEGORIES);
const CATEGORY_ICONS: Record<string, LucideIcon> = { Currency: Banknote, Length: Ruler, Weight: Scale, Volume: Droplet };

/** One focused tool: an amount, two units and a large result, with presets, recent conversions and the keys that drive it. */
export function UtilityHome() {
  const { choices, content } = useGallery();
  const [category, setCategory] = useState("Currency");
  const [from, setFrom] = useState("USD");
  const [to, setTo] = useState("EUR");
  const [amount, setAmount] = useState("250");

  const primaryVariant = choices.buttons === "outline" ? "cta" : "primary";
  const secondaryVariant = choices.buttons === "outline" ? "outline" : "ghost";
  const stroke = iconStroke(choices.iconWeight);
  const hairline = choices.tables === "hairline";
  const zebra = choices.tables === "zebra";

  const presets = content.app.items.filter((item) => item.group === PRESETS_GROUP);
  const shortcuts = content.app.items.filter((item) => item.group === SHORTCUTS_GROUP);
  const history = content.app.items.filter((item) => item.group !== PRESETS_GROUP && item.group !== SHORTCUTS_GROUP);

  const units = CATEGORIES[category] ?? {};
  const rate = (units[from] ?? 1) / (units[to] ?? 1);
  const converted = Number.parseFloat(amount.replaceAll(",", "")) * rate;
  const result = Number.isFinite(converted)
    ? new Intl.NumberFormat("en-US", { maximumFractionDigits: converted !== 0 && Math.abs(converted) < 1 ? 4 : 2 }).format(converted)
    : "—";
  const live = category === "Currency";
  const boxHeight = "!h-[calc(var(--control-h)+12px)]";

  return (
    <div className="flex min-h-0 flex-1 flex-col">
      <div className="flex min-h-0 flex-1 flex-col items-center gap-5 px-8 pt-6 pb-4">
        <section className={cn("w-full max-w-[560px] shrink-0 rounded-xl p-5", CARD_CLASSES_BY_STYLE[choices.cards])}>
          <Tabs
            items={CATEGORY_NAMES}
            value={category}
            onChange={(next) => {
              const [first, second] = Object.keys(CATEGORIES[next] ?? {});
              setCategory(next);
              setFrom(first ?? "");
              setTo(second ?? "");
            }}
          />

          <div className="mt-4">
            <div className="mb-1 text-chrome text-muted-foreground">Amount</div>
            <div className="flex items-center gap-2">
              <Input value={amount} onChange={(event) => setAmount(event.target.value)} className={cn("min-w-0 flex-1 tabular !text-[22px]", boxHeight, INPUT_CLASSES_BY_STYLE[choices.inputs])} />
              <div className="w-[112px] shrink-0">
                <Select options={Object.keys(units)} value={from} onChange={setFrom} className={cn(boxHeight, INPUT_CLASSES_BY_STYLE[choices.inputs])} />
              </div>
            </div>
          </div>

          <div className="my-1 flex items-center gap-3">
            <span aria-hidden="true" className="h-px flex-1 bg-border" />
            <Button
              variant={secondaryVariant}
              size="sm"
              onClick={() => {
                setFrom(to);
                setTo(from);
              }}
            >
              <ArrowDownUp aria-hidden="true" className="size-4" strokeWidth={stroke} />
              Swap
            </Button>
            <span aria-hidden="true" className="h-px flex-1 bg-border" />
          </div>

          <div>
            <div className="mb-1 flex items-center justify-between gap-3 text-chrome text-muted-foreground">
              <span>Result</span>
              <span className="flex min-w-0 items-center gap-2">
                <Badge tone={live ? "ok" : "off"}>{live ? "Live rate" : "Exact"}</Badge>
                <span className="truncate tabular">
                  1 {from} = {new Intl.NumberFormat("en-US", { maximumSignificantDigits: 5 }).format(rate)} {to}
                </span>
              </span>
            </div>
            <div className="flex items-center gap-2">
              <div aria-live="polite" className="min-w-0 flex-1 truncate text-[40px] font-medium leading-none tabular text-foreground">{result}</div>
              <div className="w-[112px] shrink-0">
                <Select options={Object.keys(units)} value={to} onChange={setTo} className={cn(boxHeight, INPUT_CLASSES_BY_STYLE[choices.inputs])} />
              </div>
            </div>
          </div>

          <div className="mt-4 flex items-center justify-between gap-3">
            <div className="flex min-w-0 flex-1 flex-wrap items-center gap-2">
              {presets.map((item) => (
                <button
                  key={item.title}
                  type="button"
                  onClick={() => {
                    const [source, target] = item.title.split(" → ");
                    if (source && target && CATEGORIES[item.meta]?.[source] && CATEGORIES[item.meta]?.[target]) {
                      setCategory(item.meta);
                      setFrom(source);
                      setTo(target);
                    }
                  }}
                  className={cn(
                    "h-[calc(var(--control-h)-6px)] rounded-[var(--radius-control)] border px-2.5 text-chrome transition-colors duration-[var(--duration-fast)] ease-[var(--ease)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                    item.title === `${from} → ${to}` ? "border-transparent bg-accent-soft text-accent-text" : "border-border text-muted-foreground hover:bg-accent hover:text-foreground",
                  )}
                >
                  {item.title}
                </button>
              ))}
            </div>
            <Button variant={primaryVariant} onClick={() => void navigator.clipboard?.writeText(`${result} ${to}`)}>
              <Copy aria-hidden="true" className="size-4" strokeWidth={stroke} />
              Copy result
            </Button>
          </div>
        </section>

        <section className="flex min-h-0 w-full max-w-[560px] flex-1 flex-col">
          <div className="mb-1 flex shrink-0 items-center justify-between px-3 text-chrome text-muted-foreground">
            <span>Recent conversions</span>
            <Button variant="link" size="sm">View all</Button>
          </div>
          <div className={cn("min-h-0 flex-1 overflow-auto", hairline && "divide-y divide-border")}>
            {history.map((item, index) => (
              <div
                key={item.title}
                className={cn(
                  "flex min-h-row items-center gap-3 rounded-md px-3 py-1.5 transition-colors duration-[var(--duration-fast)] ease-[var(--ease)]",
                  zebra && index % 2 === 1 && "bg-muted/50",
                  choices.rowHover === "fill" && "cursor-pointer hover:bg-accent",
                )}
              >
                <NavIcon Icon={CATEGORY_ICONS[item.badge ?? ""] ?? ArrowRightLeft} iconWeight={choices.iconWeight} />
                <div className="min-w-0 flex-1">
                  <div className="truncate text-body tabular text-foreground">{item.title}</div>
                  <div className="truncate text-chrome text-muted-foreground">{item.meta}</div>
                </div>
                <div className="shrink-0 text-right text-body font-medium tabular text-foreground">{item.value}</div>
              </div>
            ))}
          </div>
        </section>
      </div>

      <footer className="flex shrink-0 flex-wrap items-center justify-center gap-x-6 gap-y-2 border-t border-border px-8 py-3 text-chrome text-muted-foreground">
        {shortcuts.map((item) => (
          <span key={item.title} className="flex items-center gap-2">
            {item.title}
            <Kbd keys={item.badge} />
          </span>
        ))}
      </footer>
    </div>
  );
}
