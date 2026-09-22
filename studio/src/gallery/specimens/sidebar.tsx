import { useGallery } from "@/gallery/context";
import { ShellPreview, type SidebarState } from "@/gallery/app";

const NOTE: Record<string, string> = {
  fixed: "Never collapses; the toggle is absent.",
  hide: "The toggle hides it; hovering the edge does nothing.",
  peek: "Hidden; hovering the left edge overlays it on the content.",
  rail: "Icons stay usable; the hovered item shows its label.",
  railExpand: "Hovering the rail overlays the full sidebar on the content.",
};

/** The three sidebar states side by side for the chosen collapse behavior. */
export function SidebarCollapseSpecimen() {
  const { choices } = useGallery();
  const mode = choices.sidebarCollapse;
  const frames: { state: SidebarState; label: string }[] = [
    { state: "expanded", label: "Expanded" },
    { state: "collapsed", label: mode === "fixed" ? "Collapsed (never)" : "Collapsed" },
    { state: "hover", label: mode === "hide" || mode === "fixed" ? "On hover (nothing)" : "On hover" },
  ];
  return (
    <div className="rounded-lg border border-border bg-background p-5">
      <div className="mb-4 flex items-baseline justify-between border-b border-border pb-3">
        <span className="font-medium">Sidebar collapse</span>
        <span className="text-chrome text-muted-foreground">{NOTE[mode] ?? mode}</span>
      </div>
      <div className="grid grid-cols-3 gap-4">
        {frames.map((f) => (
          <div key={f.state}>
            <div className="mb-2 text-chrome text-muted-foreground">{f.label}</div>
            <div className="overflow-hidden rounded-md border border-border">
              <ShellPreview scale={0.31} sidebarState={f.state} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
