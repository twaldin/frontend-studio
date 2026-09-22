import {
  Activity,
  Boxes,
  ChevronDown,
  CircleUserRound,
  Home,
  PanelLeft,
  Plus,
  Rocket,
  Search,
  Settings,
  ShieldAlert,
  Users,
  type LucideIcon,
} from "lucide-react";
import { useGallery } from "@/gallery/context";
import { Badge, Button, Input, Kbd, cn } from "@/ui";
import { AreaChart, STACK_OPACITY, Sparkline } from "./Trend";

const NAV_ICONS: readonly LucideIcon[] = [Home, Rocket, Boxes, ShieldAlert, Users, Settings];

function iconStroke(iconWeight: string): number {
  return iconWeight === "regular" ? 2 : 1.5;
}

const INPUT_CLASSES_BY_STYLE: Record<string, string> = {
  outlined: "!border-input !bg-background",
  filled: "!border-transparent !bg-muted !shadow-none",
  underline: "!rounded-none !border-0 !border-b !border-input !bg-transparent !shadow-none",
};

const CARD_CLASSES_BY_STYLE: Record<string, string> = {
  hairline: "border border-border-card bg-card shadow-md",
  fill: "bg-muted",
};

function NavIcon({ Icon, iconWeight }: { Icon: LucideIcon; iconWeight: string }) {
  const icon = <Icon aria-hidden="true" className={iconWeight === "tiles" ? "size-3" : "size-4"} strokeWidth={iconStroke(iconWeight)} />;

  return iconWeight === "tiles" ? (
    <span className="grid size-5 shrink-0 place-items-center rounded-md bg-accent-soft text-accent-text">{icon}</span>
  ) : (
    <span className="shrink-0">{icon}</span>
  );
}

export type SidebarState = "expanded" | "collapsed" | "hover";

/**
 * The sidebar in one of three states. What `collapsed` and `hover` look like
 * depends on the collapse knob: `hide` and `peek` shrink to a 6px edge (peek
 * overlays the full sidebar on hover); `rail` and `railExpand` shrink to a
 * 48px icon rail (railExpand overlays the full sidebar on hover; rail shows a
 * label tooltip); `fixed` never collapses.
 */
function Sidebar({ state = "expanded", asOverlay = false }: { state?: SidebarState; asOverlay?: boolean }) {
  const { choices, content } = useGallery();
  const mode = choices.sidebarCollapse;
  const primaryItems = content.app.nav.slice(0, -1);
  const settingsItem = content.app.nav.at(-1);
  const activeLabel = content.app.page.title.toLocaleLowerCase();
  const pageStem = activeLabel.endsWith("s") ? activeLabel.slice(0, -1) : activeLabel;
  const collapsedish = state !== "expanded" && mode !== "fixed" && !asOverlay;
  const rail = collapsedish && (mode === "rail" || mode === "railExpand");
  const hidden = collapsedish && (mode === "hide" || mode === "peek");
  const overlay = state === "hover" && (mode === "peek" || mode === "railExpand");
  const tooltip = state === "hover" && mode === "rail";
  const showIcons = choices.navIcons === "icons" || rail;
  const showMenuHints = choices.menus === "hints";
  const canCollapse = mode !== "fixed";

  if (hidden) {
    return (
      <aside className="relative w-1.5 shrink-0 border-r border-sidebar-border bg-sidebar">
        <button
          type="button"
          aria-label="Show sidebar"
          className="absolute top-3 left-2 z-10 grid size-7 place-items-center rounded-[var(--radius-control)] border border-border bg-popover text-muted-foreground shadow-md transition-colors duration-[var(--duration-fast)] hover:text-foreground"
        >
          <PanelLeft aria-hidden="true" className="size-4" strokeWidth={iconStroke(choices.iconWeight)} />
        </button>
        {overlay ? (
          <div className="absolute inset-y-2 left-2 z-20 flex w-[232px] overflow-hidden rounded-lg border border-border shadow-lg">
            <Sidebar state="expanded" asOverlay />
          </div>
        ) : null}
      </aside>
    );
  }
  const renderNavItem = (
    item: (typeof content.app.nav)[number],
    index: number,
    active = false,
  ) => {
    const Icon = NAV_ICONS[index % NAV_ICONS.length] ?? Activity;
    return (
      <div key={`${item.label}-${index}`} className="relative">
        <button
          type="button"
          title={rail ? item.label : undefined}
          className={cn(
            "group flex h-control w-full items-center gap-2 rounded-[var(--radius-control)] text-left text-chrome transition-colors duration-[var(--duration-fast)] ease-[var(--ease)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring active:bg-sidebar-hover",
            rail ? "justify-center px-0" : "px-2.5",
            active
              ? "bg-sidebar-hover text-sidebar-foreground"
              : "text-sidebar-muted hover:bg-sidebar-hover hover:text-sidebar-foreground",
          )}
        >
          {showIcons ? <NavIcon Icon={Icon} iconWeight={choices.iconWeight} /> : null}
          {rail ? null : <span className="min-w-0 flex-1 truncate">{item.label}</span>}
          {!rail && item.badge !== undefined ? <span className="tabular text-sidebar-muted">{item.badge}</span> : null}
        </button>
        {tooltip && rail && active ? (
          <span className="pointer-events-none absolute top-1/2 left-full z-20 ml-2 -translate-y-1/2 whitespace-nowrap rounded-md border border-border bg-popover px-2 py-1 text-chrome text-popover-foreground shadow-md">
            {item.label}
          </span>
        ) : null}
      </div>
    );
  };

  return (
    <aside
      className={cn(
        "relative flex shrink-0 flex-col border-r border-sidebar-border bg-sidebar py-3 text-sidebar-foreground",
        rail ? "w-12 items-stretch px-1.5" : asOverlay ? "w-full px-3" : "w-[232px] px-3",
      )}
    >
      {rail && overlay ? (
        <div className="absolute inset-y-2 left-2 z-20 flex w-[232px] overflow-hidden rounded-lg border border-border shadow-lg">
          <Sidebar state="expanded" asOverlay />
        </div>
      ) : null}
      <div className="flex items-center gap-1">
        <button
          type="button"
          className={cn(
            "flex h-8 min-w-0 flex-1 items-center gap-2 rounded-[var(--radius-control)] text-left font-medium transition-colors duration-[var(--duration-fast)] hover:bg-sidebar-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
            rail ? "justify-center px-0" : "px-2.5",
          )}
        >
          <span className="grid size-5 shrink-0 place-items-center rounded-md bg-primary text-chrome text-primary-foreground">
            {content.product.name.slice(0, 1)}
          </span>
          {rail ? null : <span className="min-w-0 flex-1 truncate">{content.product.name}</span>}
          {rail ? null : <ChevronDown aria-hidden="true" className="size-3.5 text-sidebar-muted" strokeWidth={iconStroke(choices.iconWeight)} />}
        </button>
        {canCollapse && !rail ? (
          <button
            type="button"
            aria-label="Hide sidebar"
            className="grid size-7 shrink-0 place-items-center rounded-[var(--radius-control)] text-sidebar-muted transition-colors duration-[var(--duration-fast)] hover:bg-sidebar-hover hover:text-sidebar-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          >
            <PanelLeft aria-hidden="true" className="size-4" strokeWidth={iconStroke(choices.iconWeight)} />
          </button>
        ) : null}
      </div>

      <button
        type="button"
        className={cn(
          "mt-2 flex h-control w-full items-center gap-2 rounded-[var(--radius-control)] text-left text-chrome text-sidebar-foreground transition-colors duration-[var(--duration-fast)] ease-[var(--ease)] hover:bg-sidebar-hover focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring active:bg-sidebar-hover",
          rail ? "justify-center px-0" : "px-2.5",
          choices.pageTitle === "display" ? "text-sidebar-muted" : "border border-sidebar-border shadow-sm",
        )}
      >
        <Plus aria-hidden="true" className="size-4 shrink-0" strokeWidth={iconStroke(choices.iconWeight)} />
        {rail ? null : <span className="truncate">{content.app.page.action}</span>}
      </button>

      <nav className="mt-4 flex min-h-0 flex-1 flex-col gap-0.5">
        {primaryItems.map((item, index) => {
          const itemLabel = item.label.toLocaleLowerCase();
          const itemStem = itemLabel.endsWith("s") ? itemLabel.slice(0, -1) : itemLabel;
          return renderNavItem(item, index, itemLabel === activeLabel || itemStem === pageStem);
        })}
      </nav>

      {settingsItem
        ? renderNavItem(
            settingsItem,
            content.app.nav.length - 1,
            settingsItem.label.toLocaleLowerCase() === activeLabel,
          )
        : null}

      <button
        type="button"
        className={cn(
          "mt-2 flex h-control w-full items-center gap-2 border-t border-sidebar-border pt-2 text-left text-chrome text-sidebar-muted transition-colors duration-[var(--duration-fast)] hover:text-sidebar-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
          rail ? "justify-center px-0" : "px-2.5",
        )}
      >
        {showMenuHints || rail ? (
          <CircleUserRound aria-hidden="true" className="size-4 shrink-0" strokeWidth={iconStroke(choices.iconWeight)} />
        ) : null}
        {rail ? null : <span className="min-w-0 flex-1 truncate">{content.product.name}</span>}
        {showMenuHints && !rail ? (
          <ChevronDown aria-hidden="true" className="size-3.5 shrink-0" strokeWidth={iconStroke(choices.iconWeight)} />
        ) : null}
      </button>
    </aside>
  );
}

function TopNavigation() {
  const { choices, content } = useGallery();
  const activeIndex = Math.max(
    0,
    content.app.topnav.findIndex((item) => item.toLocaleLowerCase() === content.app.page.title.toLocaleLowerCase()),
  );
  const homeLabel = content.app.nav[0]?.label;

  return (
    <header className="h-12 shrink-0 border-b border-border bg-background px-6">
      <div className="mx-auto flex h-full w-full max-w-[1040px] items-center gap-8">
        <div className="flex shrink-0 items-center gap-2 font-medium">
          <span>{content.product.name}</span>
          {homeLabel ? (
            <>
              <span aria-hidden="true" className="text-muted-foreground">/</span>
              <span className="text-muted-foreground">{homeLabel}</span>
            </>
          ) : null}
        </div>
        <nav className="flex h-full min-w-0 flex-1 items-center gap-5 overflow-hidden">
          {content.app.topnav.map((item, index) => (
            <button
              key={`${item}-${index}`}
              type="button"
              className={cn(
                "relative flex h-full shrink-0 items-center text-chrome transition-colors duration-[var(--duration-fast)] ease-[var(--ease)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                index === activeIndex ? "text-foreground" : "text-muted-foreground hover:text-foreground",
              )}
            >
              {item}
              {index === activeIndex ? <span className="absolute inset-x-0 bottom-0 h-px bg-primary" /> : null}
            </button>
          ))}
        </nav>
        <CircleUserRound
          aria-hidden="true"
          className="size-5 text-muted-foreground"
          strokeWidth={iconStroke(choices.iconWeight)}
        />
      </div>
    </header>
  );
}

function ContextBar() {
  const { choices, content } = useGallery();

  return (
    <header className="flex h-10 shrink-0 items-center justify-between border-b border-border bg-background px-5">
      <div className="flex w-[320px] items-center gap-2">
        <Search
          aria-hidden="true"
          className="size-4 shrink-0 text-muted-foreground"
          strokeWidth={iconStroke(choices.iconWeight)}
        />
        <Input
          placeholder={content.app.search}
          className={cn("border-0 bg-transparent shadow-none", INPUT_CLASSES_BY_STYLE[choices.inputs])}
        />
        {choices.menus === "hints" ? <Kbd keys="mod+k" /> : null}
      </div>
      <button
        type="button"
        aria-label={content.product.name}
        className="flex size-7 items-center justify-center rounded-[var(--radius-control)] border border-border text-muted-foreground transition-colors duration-[var(--duration-fast)] ease-[var(--ease)] hover:bg-accent hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring active:bg-accent"
      >
        <CircleUserRound aria-hidden="true" className="size-4" strokeWidth={iconStroke(choices.iconWeight)} />
      </button>
    </header>
  );
}

/** One figure: label, value, optional note, and its trend per the trend knob. */
function Figure({ stat, size = 22 }: { stat: { label: string; value: string; note?: string; series?: number[] }; size?: number }) {
  const { choices } = useGallery();
  const trend = choices.trend;
  const series = stat.series ?? [];
  return (
    <div className="min-w-0">
      <div className="truncate text-chrome text-muted-foreground">{stat.label}</div>
      <div className="mt-1 flex items-end gap-3">
        <div className="truncate font-medium leading-none tabular text-foreground" style={{ fontSize: size }}>{stat.value}</div>
        {trend === "sparkline" ? <Sparkline series={series} className="mb-0.5 shrink-0" /> : null}
      </div>
      {stat.note ? <div className="mt-1 truncate text-chrome text-muted-foreground">{stat.note}</div> : null}
      {trend === "area" ? <AreaChart series={series} height={36} className="mt-3 block" /> : null}
    </div>
  );
}

/** The figures block per the figures and trend knobs; also the trend specimen. */
export function Stats() {
  const { choices, content } = useGallery();
  const stats = content.app.stats.slice(0, 4);
  const lead = stats[0];
  const figuresOnly = stats.map((s) => ({ ...s, series: undefined }));

  if ((choices.trend === "panel" || choices.trend === "stacked") && lead) {
    const series = lead.series ?? [];
    const last = series.length - 1;
    const stacked = choices.trend === "stacked" && (lead.breakdown?.length ?? 0) > 0;
    const layers = stacked ? lead.breakdown!.map((b) => b.series) : undefined;
    const chartCard = choices.stats === "cards" ? cn("rounded-lg p-5", CARD_CLASSES_BY_STYLE[choices.cards]) : "border-t border-border pt-4";
    return (
      <div className="shrink-0">
        <div className="grid grid-cols-4 divide-x divide-border border-y border-border">
          {figuresOnly.map((stat, index) => (
            <div key={`${stat.label}-${index}`} className="min-w-0 px-5 py-4">
              <Figure stat={stat} />
            </div>
          ))}
        </div>
        <div className={cn("mx-8 my-4", chartCard)}>
          <div className="flex items-center justify-between">
            <div className="flex items-baseline gap-3">
              <span className="font-medium">{lead.label}</span>
              <span className="tabular text-chrome text-muted-foreground">{content.app.periods[1] ?? content.app.periods[0]}</span>
            </div>
            <div className="flex items-center gap-0.5 rounded-[var(--radius-control)] bg-muted p-0.5 text-chrome">
              {content.app.periods.map((p, i) => (
                <span key={p} className={cn("rounded-[calc(var(--radius-control)-2px)] px-2 py-0.5 tabular", i === 1 ? "bg-background text-foreground shadow-sm" : "text-muted-foreground")}>
                  {p}
                </span>
              ))}
            </div>
          </div>
          <div className="relative mt-4">
            <AreaChart series={series} stacks={layers} width={960} height={220} axis callout={{ index: last - 3, label: lead.value }} className="block" />
            <div className="pointer-events-none absolute top-2 right-[26%] rounded-md border border-border bg-popover px-2 py-1 text-chrome shadow-md">
              <span className="text-muted-foreground">{lead.label}</span> <span className="tabular font-medium">{series[last - 3] ?? lead.value}</span>
            </div>
          </div>
          <div className="mt-2 flex justify-between text-chrome tabular text-muted-foreground">
            {[0, 1, 2, 3].map((i) => (
              <span key={i}>{Math.round(((series.length - 1) * i) / 3) - (series.length - 1)}d</span>
            ))}
          </div>
          {stacked ? (
            <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 text-chrome">
              {lead.breakdown!.map((b, i) => (
                <span key={b.name} className="flex items-center gap-1.5">
                  <span className="size-2.5 rounded-sm bg-primary" style={{ opacity: STACK_OPACITY[Math.min(i, STACK_OPACITY.length - 1)] }} />
                  <span className="text-muted-foreground">{b.name}</span>
                  <span className="tabular">{b.series[last] ?? ""}</span>
                </span>
              ))}
            </div>
          ) : null}
        </div>
      </div>
    );
  }

  if (choices.trend === "chart" && lead) {
    const rest = figuresOnly.slice(1);
    return (
      <div className={cn("mx-8 my-4 shrink-0 rounded-lg", choices.stats === "cards" ? cn("p-5", CARD_CLASSES_BY_STYLE[choices.cards]) : "border-y border-border py-4")}>
        <div className="flex items-end justify-between">
          <Figure stat={{ ...lead, series: undefined }} size={26} />
          <div className="flex gap-6">
            {rest.map((stat, index) => (
              <Figure key={`${stat.label}-${index}`} stat={stat} size={16} />
            ))}
          </div>
        </div>
        <AreaChart series={lead.series ?? []} width={960} height={180} axis className="mt-4 block" />
      </div>
    );
  }

  if (choices.stats === "inline") {
    return (
      <div className="flex shrink-0 flex-wrap items-center gap-2 border-b border-border px-8 py-3 text-chrome text-muted-foreground">
        {stats.map((stat, index) => (
          <span key={`${stat.label}-${index}`} className="flex items-center gap-1.5">
            {index > 0 ? <span aria-hidden="true">·</span> : null}
            <span>{stat.label}</span>
            <span className="tabular text-foreground">{stat.value}</span>
            {choices.trend !== "none" ? <Sparkline series={stat.series ?? []} width={40} height={14} /> : null}
          </span>
        ))}
      </div>
    );
  }

  if (choices.stats === "cards") {
    return (
      <div className="grid shrink-0 grid-cols-4 gap-3 px-8 py-4">
        {stats.map((stat, index) => (
          <div key={`${stat.label}-${index}`} className={cn("min-w-0 rounded-lg p-4", CARD_CLASSES_BY_STYLE[choices.cards])}>
            <Figure stat={stat} />
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid shrink-0 grid-cols-4 divide-x divide-border border-y border-border">
      {stats.map((stat, index) => (
        <div key={`${stat.label}-${index}`} className="min-w-0 px-5 py-4">
          <Figure stat={stat} />
        </div>
      ))}
    </div>
  );
}

/** Cards needing the user's attention, between the figures and the table. */
function Panel() {
  const { choices, content } = useGallery();
  const primaryVariant = choices.buttons === "outline" ? "cta" : "primary";
  const secondaryVariant = choices.buttons === "outline" ? "outline" : "ghost";
  const items = content.app.panel.items.slice(0, 2);
  if (items.length === 0) return null;
  return (
    <div className="shrink-0 px-8 pt-5 pb-2">
      <div className="mb-2 flex items-center gap-2 text-chrome text-muted-foreground">
        <span>{content.app.panel.title}</span>
        <span className="tabular">{items.length}</span>
      </div>
      <div className="grid grid-cols-2 gap-3">
        {items.map((item) => (
          <div key={item.title} className={cn("min-w-0 rounded-lg p-4", CARD_CLASSES_BY_STYLE[choices.cards])}>
            <div className="truncate font-medium text-foreground">{item.title}</div>
            <p className="mt-1 line-clamp-2 text-chrome text-muted-foreground">{item.body}</p>
            <div className="mt-3 flex gap-2">
              <Button size="sm" variant={primaryVariant}>{item.actions[0]}</Button>
              <Button size="sm" variant={secondaryVariant}>{item.actions[1]}</Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function DataTable() {
  const { choices, content } = useGallery();
  const numericColumns = new Set<number>();
  content.app.table.rows.forEach((row) => {
    row.forEach((cell, index) => {
      if (cell.kind === "num") numericColumns.add(index);
    });
  });

  const hairline = choices.tables === "hairline";
  const zebra = choices.tables === "zebra";
  const interactiveRows = choices.rowHover === "fill";

  return (
    <div className="min-h-0 flex-1 overflow-auto px-8 py-3">
      <table className="w-full border-collapse text-left text-body">
        <thead className={cn(hairline && "border-b border-border")}>
          <tr>
            {content.app.table.columns.map((column, index) => (
              <th
                key={`${column}-${index}`}
                scope="col"
                className={cn(
                  "h-8 px-3 font-normal text-chrome text-muted-foreground",
                  numericColumns.has(index) && "text-right",
                )}
              >
                {column}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className={cn(hairline && "divide-y divide-border")}>
          {content.app.table.rows.map((row, rowIndex) => (
            <tr
              key={rowIndex}
              className={cn(
                "h-row transition-colors duration-[var(--duration-fast)] ease-[var(--ease)]",
                zebra && "even:bg-muted/50",
                interactiveRows && (rowIndex === 2 ? "cursor-pointer bg-accent-soft hover:bg-accent-soft-hover" : "cursor-pointer hover:bg-accent"),
              )}
            >
              {row.map((cell, cellIndex) => (
                <td
                  key={cellIndex}
                  className={cn(
                    "max-w-[220px] truncate px-3",
                    cell.kind === "mono" && "font-mono",
                    cell.kind === "muted" && "text-muted-foreground",
                    cell.kind === "num" && "text-right tabular",
                  )}
                >
                  {cell.kind === "status" ? <Badge tone={cell.tone ?? "unknown"}>{cell.text}</Badge> : cell.text}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function PageHeader() {
  const { choices, content } = useGallery();
  const viewLabels = content.app.topnav
    .filter((item) => item.toLocaleLowerCase() !== content.app.page.title.toLocaleLowerCase())
    .slice(0, 2);
  const primaryVariant = choices.buttons === "outline" ? "cta" : "primary";

  if (choices.pageTitle === "toolbar") {
    return (
      <div className="flex h-10 shrink-0 items-center justify-between gap-3 border-b border-border px-5">
        <h1 className="min-w-0 truncate text-[length:var(--title-size)] font-medium text-foreground">{content.app.page.title}</h1>
        <div className="flex shrink-0 items-center gap-1">
          {viewLabels.map((label, index) => (
            <Button key={`${label}-${index}`} variant="ghost" size="sm">{label}</Button>
          ))}
          <Button variant={primaryVariant} size="sm">{content.app.page.action}</Button>
        </div>
      </div>
    );
  }

  if (choices.pageTitle === "display") {
    return (
      <div className="flex shrink-0 items-end justify-between gap-6 px-8 pb-6 pt-10">
        <div className="flex min-w-0 items-start gap-3">
          <span className="grid size-8 shrink-0 place-items-center rounded-lg bg-muted text-muted-foreground">
            <Boxes aria-hidden="true" className="size-4" strokeWidth={iconStroke(choices.iconWeight)} />
          </span>
          <div className="min-w-0">
            <h1 className="truncate text-[length:var(--title-size)] font-medium leading-none text-foreground">{content.app.page.title}</h1>
            <p className="mt-2 text-chrome text-muted-foreground">{content.product.tagline}</p>
          </div>
        </div>
        <Button variant={primaryVariant}>{content.app.page.action}</Button>
      </div>
    );
  }

  return (
    <div className="flex shrink-0 items-center justify-between gap-6 px-8 pb-5 pt-6">
      <div className="min-w-0">
        <h1 className="truncate text-[length:var(--title-size)] font-medium leading-tight text-foreground">{content.app.page.title}</h1>
        <p className="mt-1 text-chrome text-muted-foreground">{content.product.tagline}</p>
      </div>
      <Button variant={primaryVariant}>{content.app.page.action}</Button>
    </div>
  );
}

function MainContent() {
  const { choices, content } = useGallery();
  const primaryVariant = choices.buttons === "outline" ? "cta" : "primary";

  return (
    <div className="flex min-h-0 flex-1 flex-col">
      <PageHeader />
      <Stats />
      <Panel />
      <DataTable />

      <div className="flex shrink-0 items-center gap-2 border-t border-border px-8 py-3">
        <Input
          placeholder={content.app.composer.placeholder}
          className={cn("min-w-0 flex-1", INPUT_CLASSES_BY_STYLE[choices.inputs])}
        />
        <Button variant={primaryVariant}>{content.app.composer.send}</Button>
      </div>
    </div>
  );
}

export function ShellScene({ width = 1120, height = 760, sidebarState = "expanded" }: { width?: number; height?: number; sidebarState?: SidebarState }) {
  const { choices } = useGallery();
  const hasSidebar = choices.shell === "sidebar" || choices.shell === "both";
  const hasTopNavigation = choices.shell === "topnav";
  const hasContextBar = choices.shell === "both";

  return (
    <div
      className="flex shrink-0 overflow-hidden bg-background font-sans text-foreground"
      style={{ width, height }}
    >
      {hasSidebar ? <Sidebar state={sidebarState} /> : null}
      <div className="flex min-w-0 flex-1 flex-col bg-background">
        {hasTopNavigation ? <TopNavigation /> : null}
        {hasContextBar ? <ContextBar /> : null}
        <div className={cn("flex min-h-0 flex-1", hasTopNavigation && "mx-auto w-full max-w-[1040px]")}>
          <MainContent />
        </div>
      </div>
    </div>
  );
}
