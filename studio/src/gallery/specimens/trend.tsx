import { useGallery } from "@/gallery/context";
import { Stats } from "@/gallery/app/Shell";

const NOTE: Record<string, string> = {
  none: "Figures only.",
  sparkline: "A 64×20 line beside each value, accent stroke.",
  area: "A 36px filled area under each figure.",
  chart: "The first figure as a 180px chart; the rest as a row beside it.",
  panel: "Figures on top; a 220px chart with period tabs, axis lines and a crosshair callout.",
  stacked: "The chart panel with the first figure stacked by entity; one hue in stepped tints, legend with current values.",
};

/** The figures block exactly as the shell renders it, at full width. */
export function TrendSpecimen() {
  const { choices } = useGallery();
  return (
    <div className="rounded-lg border border-border bg-background">
      <div className="flex items-baseline justify-between border-b border-border px-5 py-3">
        <span className="font-medium">Figures over time</span>
        <span className="text-chrome text-muted-foreground">{NOTE[choices.trend] ?? choices.trend}</span>
      </div>
      <div className="w-[1120px] max-w-full">
        <Stats />
      </div>
    </div>
  );
}
