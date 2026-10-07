import { useGallery } from "@/gallery/context";
import { cn } from "@/ui";

export function Content() {
  const { choices, content } = useGallery();
  const cardClasses =
    choices.cards === "fill" ? "bg-muted" : "border border-border-card bg-card shadow-md";

  // Products without code or config ship `code.lines: []`; the prose then takes the whole card.
  const hasCode = content.app.code.lines.length > 0;

  return (
    <div className={cn("grid gap-6 rounded-lg p-6", hasCode && "grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]", cardClasses)}>
      <article className="max-w-[62ch]">
        <h2 className="heading text-[18px] text-foreground">{content.app.prose.title}</h2>
        <div className="mt-3 space-y-3 text-body leading-relaxed text-muted-foreground">
          {content.app.prose.paragraphs.map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </div>
      </article>

      {hasCode ? (
        <div className="min-w-0">
          <div className="mb-2 truncate font-mono text-chrome text-muted-foreground">{content.app.code.path}</div>
          <pre className="tabular overflow-auto rounded-md bg-muted p-3 font-mono text-chrome leading-relaxed text-foreground">
            <code>{content.app.code.lines.join("\n")}</code>
          </pre>
        </div>
      ) : null}
    </div>
  );
}
