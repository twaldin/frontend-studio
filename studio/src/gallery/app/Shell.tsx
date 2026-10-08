import { Activity, ChevronDown, CircleUserRound, PanelLeft, Plus, Search } from "lucide-react";
import { useGallery } from "@/gallery/context";
import { Button, Input, Kbd, cn } from "@/ui";
import type { Archetype } from "@/tree/types";
import { SURFACES } from "@/gallery/surfaces";
import { HOME_ICONS, HOMES } from "./homes";
import { INPUT_CLASSES_BY_STYLE, NavIcon, iconStroke } from "./kit";

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
    const icons = HOME_ICONS[choices.archetype as Archetype];
    const Icon = icons[index % icons.length] ?? Activity;
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


function PageHeader() {
  const { choices, content } = useGallery();
  const pageIndex = content.app.nav.findIndex((item) => item.label.toLocaleLowerCase() === content.app.page.title.toLocaleLowerCase());
  const PageIcon = HOME_ICONS[choices.archetype as Archetype][Math.max(pageIndex, 0)] ?? Activity;
  const viewLabels = content.app.topnav
    .filter((item) => item.toLocaleLowerCase() !== content.app.page.title.toLocaleLowerCase())
    .slice(0, 2);
  const primaryVariant = choices.buttons === "outline" ? "cta" : "primary";

  if (choices.pageTitle === "toolbar") {
    return (
      <div className="flex h-10 shrink-0 items-center justify-between gap-3 border-b border-border px-5">
        <h1 className="heading min-w-0 truncate text-[length:var(--title-size)] text-foreground">{content.app.page.title}</h1>
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
            <PageIcon aria-hidden="true" className="size-4" strokeWidth={iconStroke(choices.iconWeight)} />
          </span>
          <div className="min-w-0">
            <h1 className="heading truncate text-[length:var(--title-size)] leading-none text-foreground">{content.app.page.title}</h1>
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
        <h1 className="heading truncate text-[length:var(--title-size)] leading-tight text-foreground">{content.app.page.title}</h1>
        <p className="mt-1 text-chrome text-muted-foreground">{content.product.tagline}</p>
      </div>
      <Button variant={primaryVariant}>{content.app.page.action}</Button>
    </div>
  );
}

/** The page header, then the archetype's home surface, or on a surface step the surface being decided. */
function MainContent() {
  const { choices, surface } = useGallery();
  const Home = surface ? SURFACES[surface].Body : HOMES[choices.archetype as Archetype];
  return (
    <div className="flex min-h-0 flex-1 flex-col">
      <PageHeader />
      <Home />
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
      <div className="surface flex min-w-0 flex-1 flex-col">
        {hasTopNavigation ? <TopNavigation /> : null}
        {hasContextBar ? <ContextBar /> : null}
        <div className={cn("flex min-h-0 flex-1", hasTopNavigation && "mx-auto w-full max-w-[1040px]")}>
          <MainContent />
        </div>
      </div>
    </div>
  );
}
