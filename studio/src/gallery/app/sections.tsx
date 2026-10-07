import { useGallery } from "@/gallery/context";
import { Badge, Button, cn } from "@/ui";
import { CARD_CLASSES_BY_STYLE } from "./kit";
import { AreaChart, STACK_OPACITY, Sparkline } from "./Trend";

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
export function Panel() {
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

/** `content.app.table` per the table and row-hover steps. `className` adjusts the scrolling wrapper. */
export function DataTable({ className }: { className?: string }) {
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
    <div className={cn("min-h-0 flex-1 overflow-auto px-8 py-3", className)}>
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
