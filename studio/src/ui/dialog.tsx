import { Dialog as BaseDialog } from "@base-ui/react/dialog";
import { useRef, type ReactNode } from "react";
import { cn, previewClass, type PreviewState } from "./cn";

export interface DialogProps {
  open: boolean;
  onOpenChange(value: boolean): void;
  title: string;
  children: ReactNode;
  footer?: ReactNode;
  preview?: PreviewState;
}

export function Dialog({ open, onOpenChange, title, children, footer, preview }: DialogProps) {
  const portalContainer = useRef<HTMLDivElement>(null);

  return (
    <div ref={portalContainer} className="contents">
      <BaseDialog.Root open={open} onOpenChange={(next) => onOpenChange(next)}>
        <BaseDialog.Portal container={portalContainer}>
          <BaseDialog.Backdrop className="fixed inset-0 z-40 bg-black/40" />
          <BaseDialog.Viewport className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto p-4">
            <BaseDialog.Popup
              className={cn(
                "studio-layer w-full max-w-md rounded-lg border border-border bg-popover text-popover-foreground shadow-lg outline-none focus-visible:ring-2 focus-visible:ring-ring",
                previewClass(preview, {
                  hover: "shadow-md",
                  active: "opacity-90",
                  focus: "ring-2 ring-ring",
                  disabled: "pointer-events-none opacity-50",
                }),
              )}
            >
              <div className="border-b border-border px-5 py-4">
                <BaseDialog.Title className="text-body font-semibold text-foreground">{title}</BaseDialog.Title>
              </div>
              <div className="px-5 py-4 text-body text-muted-foreground">{children}</div>
              {footer && <div className="flex items-center justify-end gap-2 border-t border-border px-5 py-3">{footer}</div>}
            </BaseDialog.Popup>
          </BaseDialog.Viewport>
        </BaseDialog.Portal>
      </BaseDialog.Root>
    </div>
  );
}
