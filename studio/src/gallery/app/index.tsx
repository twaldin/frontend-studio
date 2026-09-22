import { useGallery } from "@/gallery/context";
import { Content } from "./Content";
import { Feedback } from "./Feedback";
import { Forms } from "./Forms";
import { ShellScene, type SidebarState } from "./Shell";

function SectionLabel({ children }: { children: string }) {
  return <div className="mb-2 text-chrome text-muted-foreground">{children}</div>;
}

export function AppGallery() {
  const { content } = useGallery();

  return (
    <div className="bg-background p-6 text-foreground">
      <SectionLabel>{content.app.page.title}</SectionLabel>
      <div className="w-full overflow-x-auto rounded-lg border border-border">
        <ShellScene />
      </div>

      <div className="mt-8">
        <SectionLabel>{content.app.form.title}</SectionLabel>
        <div className="grid grid-cols-2 items-start gap-6">
          <Forms />
          <Feedback />
        </div>
      </div>

      <div className="mt-8">
        <SectionLabel>{content.app.prose.title}</SectionLabel>
        <Content />
      </div>
    </div>
  );
}

export function ShellPreview({ scale, sidebarState = "expanded" }: { scale: number; sidebarState?: SidebarState }) {
  return (
    <div
      className="shrink-0 overflow-hidden bg-background"
      style={{ width: 1120 * scale, height: 760 * scale }}
    >
      <div style={{ transform: `scale(${scale})`, transformOrigin: "top left" }}>
        <ShellScene sidebarState={sidebarState} />
      </div>
    </div>
  );
}

export { ShellScene, type SidebarState } from "./Shell";
