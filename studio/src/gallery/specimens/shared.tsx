import type { ReactNode, Ref } from "react";
import {
  Activity,
  Bell,
  Boxes,
  CircleUserRound,
  Home,
  Rocket,
  Search,
  Settings,
  ShieldAlert,
  Users,
  type LucideIcon,
} from "lucide-react";
import type { Cell } from "@/content/schema";
import type { ResolvedChoices } from "@/tree/types";
import { Badge, cn } from "@/ui";

export const NAV_ICONS: readonly LucideIcon[] = [Home, Rocket, Boxes, ShieldAlert, Users, Settings];
export const DEMO_ICONS: readonly LucideIcon[] = [Home, Search, Rocket, Boxes, Bell, ShieldAlert, Users, CircleUserRound];

export function iconStroke(choices: ResolvedChoices): number {
  return choices.iconWeight === "regular" ? 2 : 1.5;
}

export function SpecimenFrame({
  caption,
  detail,
  children,
  className,
  rootRef,
}: {
  caption: string;
  detail?: string;
  children: ReactNode;
  className?: string;
  rootRef?: Ref<HTMLDivElement>;
}) {
  return (
    <section
      ref={rootRef}
      className={cn("mx-auto w-full max-w-[1120px] bg-background p-8 text-foreground", className)}
    >
      <div className="mb-6 flex items-center justify-between gap-4 border-b border-border pb-3 text-chrome text-muted-foreground">
        <span>{caption}</span>
        {detail ? <span className="tabular">{detail}</span> : null}
      </div>
      {children}
    </section>
  );
}

export function StateLabel({ children }: { children: ReactNode }) {
  return <div className="mb-2 text-chrome text-muted-foreground">{children}</div>;
}

export function CellValue({ cell }: { cell: Cell }) {
  if (cell.kind === "status") return <Badge tone={cell.tone ?? "unknown"}>{cell.text}</Badge>;
  return (
    <span
      className={cn(
        cell.kind === "mono" && "font-mono",
        cell.kind === "muted" && "text-muted-foreground",
        cell.kind === "num" && "tabular",
      )}
    >
      {cell.text}
    </span>
  );
}

export function cardTreatment(choices: ResolvedChoices): string {
  if (choices.cards === "fill") return "border border-transparent bg-muted shadow-none";
  return "border border-border-card bg-card shadow-md";
}

export function inputTreatment(choices: ResolvedChoices): string {
  if (choices.inputs === "filled") return "border-transparent bg-muted shadow-none";
  if (choices.inputs === "underline") return "rounded-none border-x-0 border-t-0 bg-transparent px-0 shadow-none";
  return "border-input bg-background shadow-sm";
}

export function Dimension({ label, vertical = false }: { label: string; vertical?: boolean }) {
  return vertical ? (
    <div className="flex items-center gap-2 text-chrome text-muted-foreground">
      <span className="h-full min-h-8 w-px bg-border" />
      <span className="tabular whitespace-nowrap">{label}</span>
    </div>
  ) : (
    <div className="flex items-center gap-2 text-chrome text-muted-foreground">
      <span className="h-px min-w-5 flex-1 bg-border" />
      <span className="tabular whitespace-nowrap">{label}</span>
      <span className="h-px min-w-5 flex-1 bg-border" />
    </div>
  );
}

export function SurfaceStack({ large = false }: { large?: boolean }) {
  return (
    <div className={cn("rounded-xl border border-border bg-background", large ? "p-7" : "p-5")}>
      <div className="text-body font-medium text-foreground">Canvas</div>
      <div className="mt-1 text-chrome text-muted-foreground">Background · foreground · muted foreground</div>
      <div className={cn("mt-4 rounded-lg border border-border-card bg-card shadow-sm", large ? "p-6" : "p-4")}>
        <div className="text-body font-medium text-card-foreground">Card</div>
        <div className="mt-1 text-chrome text-muted-foreground">Card foreground · muted foreground</div>
        <div className={cn("mt-4 rounded-lg border border-border bg-popover shadow-lg", large ? "p-5" : "p-3")}>
          <div className="text-body font-medium text-popover-foreground">Popover</div>
          <div className="mt-1 text-chrome text-muted-foreground">Popover foreground · muted foreground</div>
        </div>
      </div>
    </div>
  );
}

export const MENU_ICONS: readonly LucideIcon[] = [Search, Rocket, Boxes, Bell, Settings, Activity];
