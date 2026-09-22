import type { ReactNode } from "react";
import { cn, previewClass, type PreviewState } from "./cn";

export interface KbdProps {
  /** Literal content; used when `keys` is absent. */
  children?: ReactNode;
  /** Logical shortcut such as `mod+k` or `mod+shift+p`; rendered per platform. */
  keys?: string;
  preview?: PreviewState;
}

const IS_MAC = typeof navigator !== "undefined" && /Mac|iPhone|iPad/.test(navigator.platform);

/** `mod+k` → `⌘K` on macOS, `Ctrl+K` elsewhere; other modifiers follow suit. */
export function shortcutLabel(keys: string): string {
  const parts = keys.toLowerCase().split("+").map((p) => p.trim());
  const glyph: Record<string, [string, string]> = {
    mod: ["⌘", "Ctrl"],
    shift: ["⇧", "Shift"],
    alt: ["⌥", "Alt"],
    ctrl: ["⌃", "Ctrl"],
    enter: ["↩", "Enter"],
    esc: ["⎋", "Esc"],
  };
  const rendered = parts.map((p) => (glyph[p] ? glyph[p]![IS_MAC ? 0 : 1] : p.length === 1 ? p.toUpperCase() : p));
  return IS_MAC ? rendered.join("") : rendered.join("+");
}

export function Kbd({ children, keys, preview }: KbdProps) {
  return (
    <kbd
      className={cn(
        "inline-flex min-h-5 items-center rounded-md border border-border bg-muted px-1.5 font-mono text-chrome text-muted-foreground shadow-sm",
        previewClass(preview, {
          hover: "bg-accent",
          active: "opacity-70",
          focus: "ring-2 ring-ring",
          disabled: "opacity-50",
        }),
      )}
    >
      {keys ? shortcutLabel(keys) : children}
    </kbd>
  );
}
