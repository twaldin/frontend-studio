import type { MouseEventHandler, ReactNode } from "react";
import { useGallery } from "@/gallery/context";
import { cn, previewClass, type PreviewState } from "./cn";

export interface ButtonProps {
  variant?: "primary" | "cta" | "secondary" | "ghost" | "outline" | "destructive" | "link";
  size?: "sm" | "md" | "lg";
  children: ReactNode;
  className?: string;
  disabled?: boolean;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  type?: "button" | "submit" | "reset";
  preview?: PreviewState;
}

const variants = {
  cta: "bg-primary text-primary-foreground hover:opacity-90 active:opacity-80",
  secondary: "bg-secondary text-secondary-foreground hover:bg-accent active:opacity-80",
  ghost: "text-foreground hover:bg-accent active:bg-muted",
  outline: "border border-input bg-background text-foreground hover:bg-accent active:bg-muted",
  destructive: "border border-destructive bg-background text-destructive hover:bg-muted active:opacity-80",
  link: "text-accent-text underline-offset-4 hover:underline active:opacity-70",
} as const;

const heights = {
  sm: "h-[calc(var(--control-h)-4px)]",
  md: "h-control",
  lg: "h-[calc(var(--control-h)+8px)]",
} as const;

const paddings = {
  sm: "px-2.5",
  md: "px-3",
  lg: "px-4",
} as const;

/** Variants with a fill or an outline: they take the look's button edge (an offset or a pressed lip). */
const EDGED: Record<string, true> = { cta: true, soft: true, outline: true, secondary: true, destructive: true };

export function Button({
  variant = "primary",
  size = "md",
  children,
  className,
  disabled,
  onClick,
  type = "button",
  preview,
}: ButtonProps) {
  const { choices } = useGallery();
  // A soft primary is a tinted accent; with a neutral accent there is no tint, so it is filled.
  const soft = choices.buttons === "soft" && choices.accent !== "neutral";
  const primary =
    choices.buttons === "outline"
      ? variants.outline
      : soft
        ? "bg-accent-soft text-accent-text hover:bg-accent-soft-hover active:opacity-80"
        : variants.cta;
  const resolvedVariant = variant === "primary" ? (choices.buttons === "outline" ? "outline" : soft ? "soft" : "cta") : variant;
  const forcedState = previewClass(preview, {
    hover:
      resolvedVariant === "cta"
        ? "opacity-90"
        : resolvedVariant === "soft"
          ? "bg-accent-soft-hover"
          : resolvedVariant === "secondary" || resolvedVariant === "ghost" || resolvedVariant === "outline"
            ? "bg-accent"
            : resolvedVariant === "destructive"
              ? "bg-muted"
              : "underline",
    active:
      resolvedVariant === "ghost" || resolvedVariant === "outline"
        ? "bg-muted"
        : resolvedVariant === "link"
          ? "opacity-70 underline"
          : "opacity-80",
    focus: "ring-2 ring-ring ring-offset-1 ring-offset-background",
    disabled: "pointer-events-none opacity-50",
  });

  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={cn(
        "inline-flex shrink-0 items-center justify-center gap-2 whitespace-nowrap rounded-[var(--radius-control)] text-chrome font-medium transition-colors duration-[var(--duration-fast)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-50",
        heights[size],
        variant === "link" ? "px-0" : paddings[size],
        variant === "primary" ? primary : variants[variant],
        EDGED[resolvedVariant] && "shadow-[var(--button-edge)]",
        className,
        forcedState,
      )}
    >
      {children}
    </button>
  );
}
