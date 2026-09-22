import { X } from "lucide-react";
import { useGallery } from "@/gallery/context";
import { cn, previewClass, type PreviewState } from "./cn";

export interface ToastProps {
  message: string;
  onDismiss?(): void;
  preview?: PreviewState;
}

export function Toast({ message, onDismiss, preview }: ToastProps) {
  const { choices } = useGallery();
  return (
    <div
      role="status"
      className={cn(
        "flex items-center gap-3 rounded-lg border border-border bg-popover px-3 py-2.5 text-body text-popover-foreground shadow-lg",
        previewClass(preview, {
          hover: "shadow-md",
          active: "opacity-90",
          focus: "ring-2 ring-ring",
          disabled: "pointer-events-none opacity-50",
        }),
      )}
    >
      <span className="min-w-0 flex-1">{message}</span>
      {onDismiss && (
        <button
          type="button"
          aria-label={message}
          onClick={onDismiss}
          className="inline-flex size-6 shrink-0 items-center justify-center rounded-[var(--radius-control)] text-muted-foreground outline-none transition-colors duration-[var(--duration-fast)] hover:bg-accent hover:text-foreground active:bg-muted focus-visible:ring-2 focus-visible:ring-ring"
        >
          <X className="size-3.5" strokeWidth={choices.iconWeight === "regular" ? 2 : 1.5} aria-hidden="true" />
        </button>
      )}
    </div>
  );
}
