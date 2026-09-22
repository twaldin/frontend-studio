import type { ReactNode } from "react";
import { cn, previewClass, type PreviewState } from "./cn";

export interface BadgeProps {
  tone?: "ok" | "warn" | "bad" | "off" | "unknown" | "neutral";
  children: ReactNode;
  preview?: PreviewState;
}

const tones = {
  ok: "text-success",
  warn: "text-warning",
  bad: "text-destructive",
  off: "text-muted-foreground",
  unknown: "text-muted-foreground",
  neutral: "text-muted-foreground",
} as const;

export function Badge({ tone = "neutral", children, preview }: BadgeProps) {
  return (
    <span
      className={cn(
        "text-chrome font-medium",
        tones[tone],
        previewClass(preview, {
          hover: "bg-accent",
          active: "opacity-70",
          focus: "ring-2 ring-ring",
          disabled: "opacity-50",
        }),
      )}
    >
      {children}
    </span>
  );
}
