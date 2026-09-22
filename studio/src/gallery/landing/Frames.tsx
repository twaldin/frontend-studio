import { useLayoutEffect, useRef, useState, type ReactNode } from "react";
import { useGallery } from "@/gallery/context";

export type FrameKind = "none" | "browser" | "laptop" | "phone";

function ScaledStage({ children }: { children: ReactNode }) {
  const hostRef = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(0);

  useLayoutEffect(() => {
    const host = hostRef.current;
    if (!host) return;

    const resize = () => setWidth(host.clientWidth);
    resize();
    const observer = new ResizeObserver(resize);
    observer.observe(host);
    return () => observer.disconnect();
  }, []);

  const scale = width / 1120;

  return (
    <div ref={hostRef} className="relative w-full overflow-hidden bg-background" style={{ height: width ? 680 * scale : 0 }}>
      <div
        className="absolute top-0 left-0 h-[680px] w-[1120px] origin-top-left"
        style={{ transform: `scale(${scale})` }}
      >
        {children}
      </div>
    </div>
  );
}

function FrameStage({ children, scaled }: { children: ReactNode; scaled: boolean }) {
  return scaled ? <ScaledStage>{children}</ScaledStage> : <div className="flex justify-center overflow-hidden bg-background">{children}</div>;
}

export function Frame({ kind, children, scaled = true }: { kind: FrameKind | string; children: ReactNode; scaled?: boolean }) {
  const { content } = useGallery();

  if (kind === "browser") {
    return (
      <div className="mx-auto w-full max-w-[1000px] overflow-hidden rounded-xl border border-border-card bg-card shadow-lg">
        <div className="flex h-10 items-center gap-3 border-b border-border bg-muted/70 px-4">
          <div className="flex gap-1.5" aria-hidden="true">
            <span className="h-2.5 w-2.5 rounded-full bg-muted-foreground/30" />
            <span className="h-2.5 w-2.5 rounded-full bg-muted-foreground/30" />
            <span className="h-2.5 w-2.5 rounded-full bg-muted-foreground/30" />
          </div>
          <div className="mx-auto flex h-6 w-[48%] items-center justify-center rounded-md border border-border bg-background px-3 text-[11px] text-muted-foreground">
            {content.product.name}
          </div>
          <div className="w-11" />
        </div>
        <FrameStage scaled={scaled}>{children}</FrameStage>
      </div>
    );
  }

  if (kind === "laptop") {
    return (
      <div className="mx-auto w-full max-w-[1000px] px-5 pb-5">
        <div className="overflow-hidden rounded-xl border-[7px] border-foreground bg-background shadow-lg">
          <FrameStage scaled={scaled}>{children}</FrameStage>
        </div>
        <div className="relative mx-auto h-3 w-[106%] -translate-x-[3%] rounded-b-xl border border-border-card bg-muted shadow-md">
          <div className="absolute top-0 left-1/2 h-1 w-20 -translate-x-1/2 rounded-b-md bg-border" />
        </div>
      </div>
    );
  }

  if (kind === "phone") {
    return (
      <div className="mx-auto w-full max-w-[390px] rounded-2xl border-[8px] border-foreground bg-card p-1 shadow-lg">
        <div className="relative overflow-hidden rounded-xl bg-background pt-5">
          <div className="absolute top-1.5 left-1/2 z-10 h-2 w-16 -translate-x-1/2 rounded-full bg-foreground" />
          <FrameStage scaled={scaled}>{children}</FrameStage>
          <div className="flex h-8 items-center justify-center border-t border-border bg-card">
            <span className="h-1 w-14 rounded-full bg-muted-foreground/30" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto w-full max-w-[1000px] overflow-hidden rounded-xl border border-border-card bg-background shadow-lg">
      <FrameStage scaled={scaled}>{children}</FrameStage>
    </div>
  );
}
