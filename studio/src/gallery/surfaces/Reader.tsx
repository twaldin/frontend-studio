import { useId, useState } from "react";
import type { Surfaces } from "@/content/schema";
import { useGallery } from "@/gallery/context";
import { Button, cn } from "@/ui";
import { EmptyMessage, Placeholder, SELECTABLE_ROW, SurfaceBody, SurfaceCard, SurfaceStates, TextPlaceholder, type SurfaceState } from "./kit";

type ReaderSection = Surfaces["reader"]["sections"][number];
type ReaderNote = Surfaces["reader"]["notes"][number];

function SectionText({ section, id }: { section: ReaderSection; id: string }) {
  return (
    <section className="min-w-0">
      <h2 id={id} tabIndex={-1} className="heading scroll-mt-5 break-words text-lg leading-snug">{section.heading}</h2>
      <div className="mt-3 space-y-4">{section.paragraphs.map((paragraph, index) => <p key={index} className="whitespace-pre-wrap break-words text-body leading-[1.85]">{paragraph}</p>)}</div>
    </section>
  );
}

function Notes({ notes }: { notes: ReaderNote[] }) {
  if (notes.length === 0) return null;
  return (
    <dl className="space-y-4 text-chrome leading-relaxed">
      {notes.map((note, index) => <div key={`${note.term}-${index}`}><dt className="font-medium text-accent-text">{note.term}</dt><dd className="mt-1 break-words text-muted-foreground">{note.note}</dd></div>)}
    </dl>
  );
}

function LoadingText() {
  return <div className="space-y-7"><Placeholder className="h-5 w-2/3" /><TextPlaceholder lines={5} /><TextPlaceholder lines={4} /><Placeholder className="h-4 w-1/2" /><TextPlaceholder lines={4} /></div>;
}

function ReaderView({ state = "populated" }: { state?: SurfaceState }) {
  const { content, choices } = useGallery();
  const page = content.surfaces.reader;
  const [selectedSection, setSelectedSection] = useState(0);
  const readerId = useId();
  const loading = state === "loading";
  const empty = state === "empty" || (state === "populated" && page.sections.length === 0);
  const sectionIndex = Math.min(selectedSection, Math.max(0, page.sections.length - 1));
  const header = <header className="mb-6 border-b border-border pb-3">{loading ? <Placeholder className="h-2.5 w-1/2" /> : <p className="break-words text-chrome text-muted-foreground">{page.byline}</p>}</header>;
  const article = choices.readerLayout !== "margin" && choices.readerLayout !== "paged" ? (
    <article className="min-w-0">
      {header}
      {empty ? <EmptyMessage text={page.empty} /> : loading ? <LoadingText /> : <>
        <div className="space-y-8">{page.sections.map((section, index) => <SectionText key={`${section.heading}-${index}`} section={section} id={`${readerId}-${index}`} />)}</div>
        {page.notes.length > 0 ? <details className="mt-8 border-t border-border pt-4"><summary className={cn("cursor-pointer px-1 py-1 text-chrome font-medium", SELECTABLE_ROW)}>Notes</summary><div className="mt-4"><Notes notes={page.notes} /></div></details> : null}
      </>}
    </article>
  ) : null;

  if (choices.readerLayout === "outline") {
    return (
      <div className="mx-auto flex min-w-0 max-w-[960px] flex-wrap items-start gap-x-8 gap-y-5">
        <nav aria-label={`${page.title} contents`} className="sticky top-0 min-w-0 flex-[1_1_170px] rounded-md bg-background p-2">
          <h2 className="heading mb-3 text-chrome text-muted-foreground">Contents</h2>
          {loading ? <div className="space-y-4">{[0, 1, 2, 3].map((index) => <Placeholder key={index} className="h-3 w-4/5" />)}</div> : empty ? <div aria-hidden="true" className="h-20 border-l border-dashed border-border" /> : <ol className="space-y-1">
            {page.sections.map((section, index) => <li key={`${section.heading}-${index}`}><a href={`#${readerId}-${index}`} aria-current={index === sectionIndex ? "location" : undefined} onClick={() => setSelectedSection(index)} className={cn("block break-words border-l-2 px-3 py-2 text-chrome", SELECTABLE_ROW, index === sectionIndex ? "border-primary bg-accent-soft text-accent-text" : "border-transparent text-muted-foreground hover:bg-accent hover:text-foreground")}>{section.heading}</a></li>)}
          </ol>}
        </nav>
        <div className="min-w-0 flex-[3_1_360px] max-w-[68ch]">{article}</div>
      </div>
    );
  }

  if (choices.readerLayout === "margin") {
    const locatedNotes = page.notes.map((note) => ({ note, section: page.sections.findIndex((section) => `${section.heading} ${section.paragraphs.join(" ")}`.toLocaleLowerCase().includes(note.term.toLocaleLowerCase())) }));
    const unmatchedNotes = locatedNotes.filter((entry) => entry.section < 0).map((entry) => entry.note);
    return (
      <article className="mx-auto min-w-0 max-w-[960px]">
        <div className="max-w-[65ch]">{header}</div>
        {empty || loading ? <div className="flex flex-wrap items-start gap-x-8 gap-y-5"><div className="min-w-0 flex-[3_1_360px] max-w-[65ch]">{empty ? <EmptyMessage text={page.empty} /> : <LoadingText />}</div><aside aria-label="Margin notes" className="min-w-0 flex-[1_1_180px] border-l border-border pl-4">{loading ? <div className="space-y-6"><TextPlaceholder lines={2} /><TextPlaceholder lines={3} /></div> : <div aria-hidden="true" className="min-h-36" />}</aside></div> : <>
          <div className="space-y-8">
            {page.sections.map((section, index) => {
              const notes = locatedNotes.filter((entry) => entry.section === index).map((entry) => entry.note);
              return <div key={`${section.heading}-${index}`} className="flex flex-wrap items-start gap-x-8 gap-y-4"><div className="min-w-0 flex-[3_1_360px] max-w-[65ch]"><SectionText section={section} id={`${readerId}-${index}`} /></div>{notes.length > 0 ? <aside aria-label={`${section.heading} notes`} className="min-w-0 flex-[1_1_180px] border-l border-border pl-4"><Notes notes={notes} /></aside> : <div aria-hidden="true" className="flex-[1_1_180px]" />}</div>;
            })}
          </div>
          {unmatchedNotes.length > 0 ? <aside aria-label="Additional notes" className="mt-8 max-w-[65ch] border-t border-border pt-4"><Notes notes={unmatchedNotes} /></aside> : null}
        </>}
      </article>
    );
  }

  if (choices.readerLayout === "paged") {
    const section = page.sections[sectionIndex];
    return (
      <div className="mx-auto min-w-0 max-w-[72ch]">
        <SurfaceCard className="min-h-72 p-5">
          <article>
            {header}
            {empty ? <EmptyMessage text={page.empty} /> : loading ? <LoadingText /> : section ? <SectionText section={section} id={`${readerId}-${sectionIndex}`} /> : null}
            {!empty && !loading && page.notes.length > 0 ? <details className="mt-6 border-t border-border pt-3"><summary className={cn("cursor-pointer px-1 py-1 text-chrome", SELECTABLE_ROW)}>Notes</summary><div className="mt-3"><Notes notes={page.notes} /></div></details> : null}
          </article>
        </SurfaceCard>
        <div className="mt-4">
          <progress aria-label="Reading progress" value={empty || loading ? 0 : sectionIndex + 1} max={Math.max(1, page.sections.length)} className="h-1.5 w-full accent-[var(--primary)]" />
          <div className="mt-2 flex flex-wrap items-center justify-between gap-2">
            <Button variant="ghost" disabled={empty || loading || sectionIndex === 0} onClick={() => setSelectedSection(sectionIndex - 1)}>Previous page</Button>
            <span role="status" className="text-chrome tabular text-muted-foreground">{loading ? "Loading preview" : `${empty ? 0 : sectionIndex + 1} / ${empty ? 0 : page.sections.length}`}</span>
            <Button variant="ghost" disabled={empty || loading || sectionIndex === page.sections.length - 1} onClick={() => setSelectedSection(sectionIndex + 1)}>Next page</Button>
          </div>
        </div>
      </div>
    );
  }

  return <div className="mx-auto min-w-0 max-w-[65ch]">{article}</div>;
}

export function ReaderBody() {
  return <SurfaceBody><ReaderView /></SurfaceBody>;
}

export function ReaderStates() {
  const { content } = useGallery();
  return <SurfaceStates page={content.surfaces.reader} empty={<ReaderView state="empty" />} loading={<ReaderView state="loading" />} />;
}
