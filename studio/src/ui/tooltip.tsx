import { Tooltip as BaseTooltip } from "@base-ui/react/tooltip";
import { useRef, type ReactElement } from "react";
import { cn, previewClass, type PreviewState } from "./cn";

export interface TooltipProps {
  content: string;
  children: ReactElement;
  preview?: PreviewState;
}

export function Tooltip({ content, children, preview }: TooltipProps) {
  const portalContainer = useRef<HTMLSpanElement>(null);

  return (
    <span ref={portalContainer} className="contents">
      <BaseTooltip.Root open={preview ? true : undefined}>
        <BaseTooltip.Trigger render={children} />
        <BaseTooltip.Portal container={portalContainer}>
          <BaseTooltip.Positioner sideOffset={6} className="z-50">
            <BaseTooltip.Popup
              className={cn(
                "max-w-64 rounded-lg border border-border bg-popover px-2.5 py-1.5 text-chrome text-popover-foreground shadow-lg",
                previewClass(preview, {
                  hover: "shadow-md",
                  active: "opacity-90",
                  focus: "ring-2 ring-ring",
                  disabled: "pointer-events-none opacity-50",
                }),
              )}
            >
              {content}
            </BaseTooltip.Popup>
          </BaseTooltip.Positioner>
        </BaseTooltip.Portal>
      </BaseTooltip.Root>
    </span>
  );
}
