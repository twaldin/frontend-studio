/** Pieces every app surface shares: icon stroke, and the input and card treatments per their steps. */
import type { LucideIcon } from "lucide-react";

export function iconStroke(iconWeight: string): number {
  return iconWeight === "regular" ? 2 : 1.5;
}

export const INPUT_CLASSES_BY_STYLE: Record<string, string> = {
  outlined: "!border-input !bg-background",
  filled: "!border-transparent !bg-muted !shadow-none",
  underline: "!rounded-none !border-0 !border-b !border-input !bg-transparent !shadow-none",
};

export const CARD_CLASSES_BY_STYLE: Record<string, string> = {
  hairline: "border border-border-card bg-card shadow-md",
  fill: "bg-muted",
};

export function NavIcon({ Icon, iconWeight }: { Icon: LucideIcon; iconWeight: string }) {
  const icon = <Icon aria-hidden="true" className={iconWeight === "tiles" ? "size-3" : "size-4"} strokeWidth={iconStroke(iconWeight)} />;

  return iconWeight === "tiles" ? (
    <span className="grid size-5 shrink-0 place-items-center rounded-md bg-accent-soft text-accent-text">{icon}</span>
  ) : (
    <span className="shrink-0">{icon}</span>
  );
}
