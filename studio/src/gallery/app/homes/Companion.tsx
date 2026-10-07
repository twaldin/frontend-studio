import { Backpack, Check, Clock, Coins, Crown, Flame, FlaskConical, Gem, House, Scroll, Search, Settings, Shield, Shirt, Sparkles, Sword, Trophy, Zap, type LucideIcon } from "lucide-react";
import { useGallery } from "@/gallery/context";
import { Badge, Button, Input, cn, type BadgeProps } from "@/ui";
import { CARD_CLASSES_BY_STYLE, INPUT_CLASSES_BY_STYLE, NavIcon, iconStroke } from "../kit";
import { DataTable, Figures } from "../sections";

/** Nav icons in `content.app.nav` order. */
export const COMPANION_ICONS: readonly LucideIcon[] = [House, Scroll, Backpack, Shield, Trophy, Settings];

/** The `group` of each kind of item the home lays out. */
const GROUP = { player: "Player", quests: "Quests", inventory: "Inventory" } as const;

/** XP and quest progress share one track; the fill is sized inline. */
const BAR_TRACK = "overflow-hidden rounded-sm border border-border bg-background";

const CURRENCY_ICONS: Record<string, LucideIcon> = { Gold: Coins, Gems: Gem, Embers: Flame, Crests: Shield };
const QUEST_ICONS: Record<string, LucideIcon> = { Daily: Clock, Story: Scroll, Expiring: Zap, Ready: Check };
const QUEST_TONES: Record<string, BadgeProps["tone"]> = { Ready: "ok", Expiring: "warn" };
/** The slot is the first word of an inventory item's `meta`. */
const SLOT_ICONS: Record<string, LucideIcon> = { Weapon: Sword, Armor: Shirt, Trinket: Flame, Charm: Sparkles, Consumable: FlaskConical, Relic: Crown };

/** Token tile per rarity: the accent gets stronger as the item gets rarer. */
interface RarityTile {
  tile: string;
  icon: string;
}
const COMMON_TILE: RarityTile = { tile: "border-border bg-background", icon: "text-muted-foreground" };
const RARITY_TILES: Record<string, RarityTile> = {
  Common: COMMON_TILE,
  Uncommon: { tile: "border-border bg-accent-soft", icon: "text-accent-text" },
  Rare: { tile: "border-border bg-accent-soft bg-[linear-gradient(160deg,var(--chart-4),var(--chart-5))]", icon: "text-accent-text" },
  Epic: { tile: "border-border bg-[linear-gradient(160deg,var(--chart-2),var(--chart-4))]", icon: "text-foreground" },
  Legendary: { tile: "border-primary bg-[linear-gradient(145deg,var(--chart-1),var(--chart-2))]", icon: "text-primary-foreground" },
};

/** A game companion: the player card, the quest board, the inventory and the clan rankings. */
export function CompanionHome() {
  const { choices, content } = useGallery();
  const primaryVariant = choices.buttons === "outline" ? "cta" : "primary";
  const cardClasses = CARD_CLASSES_BY_STYLE[choices.cards];
  const inputClasses = INPUT_CLASSES_BY_STYLE[choices.inputs];
  const rowHover = choices.rowHover === "fill" && "cursor-pointer transition-colors duration-[var(--duration-fast)] ease-[var(--ease)] hover:bg-accent";
  const stroke = iconStroke(choices.iconWeight);

  const items = content.app.items;
  const player = items.find((item) => item.group === GROUP.player);
  const quests = items.filter((item) => item.group === GROUP.quests);
  const gear = items.filter((item) => item.group === GROUP.inventory);
  const currencies = content.app.stats.slice(0, 4);

  return (
    <div className="flex min-h-0 flex-1 flex-col gap-3 px-8 pt-3 pb-6">
      {player ? (
        <section className={cn("flex shrink-0 items-center gap-5 rounded-lg p-3.5", cardClasses)}>
          <div className="heading grid size-14 shrink-0 place-items-center rounded-xl bg-[linear-gradient(135deg,var(--primary),var(--chart-2))] text-2xl text-primary-foreground">
            {player.title.slice(0, 1)}
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2">
              <h2 className="heading truncate text-lg leading-tight text-foreground">{player.title}</h2>
              {player.badge ? (
                <span className="shrink-0 rounded-sm bg-accent-soft px-1.5 py-0.5 text-chrome font-medium text-accent-text">{player.badge}</span>
              ) : null}
            </div>
            <div className="truncate text-chrome text-muted-foreground">{player.meta}</div>
            <div className="mt-2 flex items-center gap-3">
              <div className={cn("h-2.5 min-w-0 flex-1", BAR_TRACK)}>
                <div className="h-full bg-primary" style={{ width: `${Math.round((player.progress ?? 0) * 100)}%` }} />
              </div>
              <span className="shrink-0 text-chrome tabular text-muted-foreground">{player.value}</span>
            </div>
          </div>
          <div className="w-[360px] shrink-0 border-l border-border pl-5">
            <Figures stats={currencies} icons={currencies.map((currency) => CURRENCY_ICONS[currency.label] ?? Coins)} />
          </div>
        </section>
      ) : null}

      <div className="grid min-h-0 flex-[6] grid-cols-[minmax(0,1fr)_minmax(0,1fr)] grid-rows-1 gap-3">
        <section className={cn("flex min-h-0 flex-col rounded-lg", cardClasses)}>
          <div className="flex shrink-0 items-center justify-between px-4 pt-3 pb-1.5">
            <h2 className="heading text-body text-foreground">{GROUP.quests}</h2>
            <span className="tabular text-chrome text-muted-foreground">{quests.length}</span>
          </div>
          <ul className="min-h-0 flex-1 divide-y divide-border overflow-y-auto px-2">
            {quests.map((quest) => {
              const done = (quest.progress ?? 0) >= 1;
              return (
                <li key={quest.title} className={cn("flex items-center gap-3 rounded-md px-2 py-2", rowHover)}>
                  <NavIcon Icon={QUEST_ICONS[quest.badge ?? ""] ?? Scroll} iconWeight={choices.iconWeight} />
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <span className="truncate font-medium text-foreground">{quest.title}</span>
                      {quest.badge ? <Badge tone={QUEST_TONES[quest.badge] ?? "neutral"}>{quest.badge}</Badge> : null}
                    </div>
                    <div className="truncate text-chrome text-muted-foreground">{quest.meta}</div>
                    <div className={cn("mt-1.5 h-2", BAR_TRACK)}>
                      <div className="h-full bg-primary" style={{ width: `${Math.round((quest.progress ?? 0) * 100)}%` }} />
                    </div>
                  </div>
                  <div className="flex shrink-0 flex-col items-end gap-1">
                    <span className="font-medium tabular text-foreground">{quest.value}</span>
                    {done ? (
                      <Button size="sm" variant={primaryVariant}>Claim</Button>
                    ) : (
                      <span className="text-chrome text-muted-foreground">{quest.body}</span>
                    )}
                  </div>
                </li>
              );
            })}
          </ul>
        </section>

        <section className={cn("flex min-h-0 flex-col rounded-lg", cardClasses)}>
          <div className="flex shrink-0 items-center justify-between px-4 pt-3 pb-1.5">
            <h2 className="heading text-body text-foreground">{GROUP.inventory}</h2>
            <span className="tabular text-chrome text-muted-foreground">{gear.length}</span>
          </div>
          <div className="grid min-h-0 flex-1 grid-cols-3 content-start gap-1 overflow-y-auto px-2 pb-2">
            {gear.map((item) => {
              const rarity = RARITY_TILES[item.badge ?? ""] ?? COMMON_TILE;
              const Slot = SLOT_ICONS[item.meta.split(" · ")[0] ?? ""] ?? Gem;
              return (
                <div key={item.title} className={cn("min-w-0 rounded-md p-1.5", rowHover)}>
                  <div className={cn("relative grid aspect-[3/2] place-items-center rounded-md border", rarity.tile)}>
                    <Slot aria-hidden="true" className={cn("size-6", rarity.icon)} strokeWidth={stroke} />
                    {item.badge ? (
                      <span className="absolute top-1 left-1 rounded-sm bg-background/90 px-1 text-chrome font-medium text-foreground">{item.badge}</span>
                    ) : null}
                    <span className="absolute right-1 bottom-1 rounded-sm bg-background/90 px-1 text-chrome tabular text-foreground">{item.value}</span>
                  </div>
                  <div className="mt-1.5 truncate font-medium text-foreground">{item.title}</div>
                  <div className="truncate text-chrome text-muted-foreground">{item.meta}</div>
                </div>
              );
            })}
          </div>
        </section>
      </div>

      <section className={cn("flex min-h-0 flex-[5] flex-col rounded-lg", cardClasses)}>
        <div className="flex shrink-0 items-center justify-between gap-3 px-4 pt-2.5 pb-1">
          <h2 className="heading text-body text-foreground">Rankings</h2>
          <div className="relative w-52">
            <Search aria-hidden="true" className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" strokeWidth={stroke} />
            <Input placeholder={content.app.search} className={cn("!pl-9", inputClasses)} />
          </div>
        </div>
        <DataTable className="px-2! py-1!" />
      </section>
    </div>
  );
}
