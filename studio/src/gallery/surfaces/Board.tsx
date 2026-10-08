import { useId, useState } from "react";
import type { Item } from "@/content/schema";
import { useGallery } from "@/gallery/context";
import { Badge, cn } from "@/ui";
import { EmptyMessage, Placeholder, SELECTABLE_ROW, SurfaceBody, SurfaceCard, SurfaceStates, TextPlaceholder, groupItems, type SurfaceState } from "./kit";

function BoardCard({ item, showGroup = true, row = false }: { item: Item; showGroup?: boolean; row?: boolean }) {
  return (
    <article className="min-w-0">
      <SurfaceCard className={cn("p-3", row && "flex flex-wrap items-start gap-x-5 gap-y-2")}>
        <div className="min-w-0 flex-[1_1_160px]">
          <h3 className="heading break-words text-body">{item.title}</h3>
          {item.body ? <p className="mt-1 break-words text-chrome leading-relaxed text-muted-foreground">{item.body}</p> : null}
          <p className="mt-2 break-words text-chrome text-muted-foreground">{item.meta}</p>
        </div>
        <div className={cn("flex flex-wrap items-center gap-x-3 gap-y-1 text-chrome", !row && "mt-3")}>
          {item.badge ? <Badge>{item.badge}</Badge> : null}
          {showGroup && item.group ? <span className="text-muted-foreground">{item.group}</span> : null}
          {item.value ? <span className="ml-auto tabular text-muted-foreground">{item.value}</span> : null}
        </div>
        {item.progress !== undefined ? <progress aria-label={`${item.title} progress`} value={item.progress} max={1} className="mt-2 h-1.5 w-full accent-[var(--primary)]" /> : null}
      </SurfaceCard>
    </article>
  );
}

function LaneContents({ cards, emptyText, state, row = false, showGroup = true }: { cards: Item[]; emptyText: string; state: SurfaceState; row?: boolean; showGroup?: boolean }) {
  if (state === "loading") {
    return <div className="space-y-3">{[0, 1].map((index) => <SurfaceCard key={index} className="p-3"><TextPlaceholder lines={row ? 1 : 2} /><Placeholder className="mt-4 h-2 w-1/3" /></SurfaceCard>)}</div>;
  }
  if (cards.length === 0 || state === "empty") return <EmptyMessage text={emptyText} className={row ? "min-h-20 items-start px-0 text-left" : "min-h-28 px-2"} />;
  return <ul className="space-y-3">{cards.map((item, index) => <li key={`${item.title}-${index}`}><BoardCard item={item} row={row} showGroup={showGroup} /></li>)}</ul>;
}

function BoardView({ state = "populated" }: { state?: SurfaceState }) {
  const { content, choices } = useGallery();
  const page = content.surfaces.board;
  const [selectedStage, setSelectedStage] = useState(0);
  const panelId = useId();
  const activeStage = Math.min(selectedStage, Math.max(0, page.lanes.length - 1));
  // An unstaged card belongs to the first stage; keep every supplied card visible.
  const cardsByLane = page.lanes.map((_, lane) => page.cards.filter((card) => Math.min(Math.max(Math.trunc(card.stage ?? 0), 0), page.lanes.length - 1) === lane));
  const count = (lane: number) => state === "empty" ? 0 : cardsByLane[lane]?.length ?? 0;

  if (page.lanes.length === 0) return <EmptyMessage text={page.empty} />;

  if (choices.boardLayout === "pipeline") {
    return (
      <div className="min-w-0">
        <div role="group" aria-label={page.title} className="mb-5 flex gap-2 overflow-x-auto pb-2">
          {page.lanes.map((lane, index) => (
            <button key={`${lane}-${index}`} type="button" aria-pressed={index === activeStage} aria-controls={panelId} disabled={state === "loading"} onClick={() => setSelectedStage(index)} className={cn("min-w-[140px] flex-1 border px-4 py-3 disabled:opacity-50", SELECTABLE_ROW, index === activeStage ? "border-primary bg-accent-soft text-accent-text" : "border-border text-muted-foreground hover:bg-accent")}>
              <span className="block break-words text-chrome">{lane}</span>
              {state === "loading" ? <Placeholder className="mt-2 h-6 w-8" /> : <span className="mt-1 block text-xl tabular">{count(index)}</span>}
            </button>
          ))}
        </div>
        <section id={panelId} aria-label={page.lanes[activeStage]}>
          <h2 className="heading mb-3 text-body">{page.lanes[activeStage]}</h2>
          <LaneContents cards={cardsByLane[activeStage] ?? []} emptyText={page.empty} state={state} row />
        </section>
      </div>
    );
  }

  if (choices.boardLayout === "grouped") {
    return (
      <div className="space-y-5">
        {page.lanes.map((lane, index) => (
          <section key={`${lane}-${index}`}>
            <header className="mb-2 flex items-center gap-2 border-b border-border pb-2">
              <h2 className="heading text-body">{lane}</h2>
              {state === "loading" ? <Placeholder className="h-3 w-5" /> : <span className="text-chrome tabular text-muted-foreground">{count(index)}</span>}
            </header>
            <LaneContents cards={cardsByLane[index] ?? []} emptyText={page.empty} state={state} row />
          </section>
        ))}
      </div>
    );
  }

  if (choices.boardLayout === "swimlanes") {
    const groups = state === "populated" ? groupItems(page.cards) : [];
    return (
      <div role="region" aria-label={`${page.title} by group and stage`} tabIndex={0} className="min-w-0 overflow-x-auto rounded-md focus-visible:ring-2 focus-visible:ring-ring">
        <div className="grid gap-px overflow-hidden rounded-lg border border-border bg-border" style={{ gridTemplateColumns: `minmax(120px, 0.7fr) repeat(${page.lanes.length}, minmax(180px, 1fr))`, minWidth: 120 + page.lanes.length * 180 }}>
          <div className="bg-background p-3 text-chrome text-muted-foreground">{page.title}</div>
          {page.lanes.map((lane, index) => <div key={`${lane}-${index}`} className="flex items-center gap-2 bg-background p-3"><h2 className="heading text-chrome">{lane}</h2>{state === "loading" ? <Placeholder className="h-3 w-5" /> : <span className="text-chrome tabular text-muted-foreground">{count(index)}</span>}</div>)}
          {state === "loading" ? [0, 1].map((group) => (
            <div key={group} className="contents">
              <div className="bg-background p-3"><Placeholder className="h-3 w-4/5" /></div>
              {page.lanes.map((lane, index) => <div key={`${lane}-${index}`} className="bg-background p-3"><SurfaceCard className="p-3"><TextPlaceholder lines={2} /></SurfaceCard></div>)}
            </div>
          )) : null}
          {state === "empty" || (state === "populated" && groups.length === 0) ? <><div aria-hidden="true" className="bg-background" /><div className="bg-background" style={{ gridColumn: `span ${page.lanes.length}` }}><EmptyMessage text={page.empty} /></div></> : null}
          {groups.map((group) => (
            <div key={group.name} className="contents">
              <h3 className="heading bg-background p-3 text-chrome">{group.name || page.title}</h3>
              {page.lanes.map((lane, index) => <section key={`${lane}-${index}`} aria-label={`${group.name || page.title} · ${lane}`} className="min-w-0 bg-background p-3"><LaneContents cards={(cardsByLane[index] ?? []).filter((card) => (card.group ?? "") === group.name)} emptyText={page.empty} state={state} showGroup={false} /></section>)}
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div role="region" aria-label={page.title} tabIndex={0} className="min-w-0 overflow-x-auto rounded-md pb-2 focus-visible:ring-2 focus-visible:ring-ring">
      <div className="grid items-start gap-3" style={{ gridTemplateColumns: `repeat(${page.lanes.length}, minmax(180px, 1fr))`, minWidth: page.lanes.length * 180 }}>
        {page.lanes.map((lane, index) => (
          <section key={`${lane}-${index}`} className="min-w-0 rounded-lg bg-muted/40 p-3">
            <header className="mb-3 flex items-center gap-2">
              <h2 className="heading min-w-0 flex-1 break-words text-chrome">{lane}</h2>
              {state === "loading" ? <Placeholder className="h-3 w-5" /> : <span className="text-chrome tabular text-muted-foreground">{count(index)}</span>}
            </header>
            <LaneContents cards={cardsByLane[index] ?? []} emptyText={page.empty} state={state} />
          </section>
        ))}
      </div>
    </div>
  );
}

export function BoardBody() {
  return <SurfaceBody><BoardView /></SurfaceBody>;
}

export function BoardStates() {
  const { content } = useGallery();
  return <SurfaceStates page={content.surfaces.board} empty={<BoardView state="empty" />} loading={<BoardView state="loading" />} />;
}
