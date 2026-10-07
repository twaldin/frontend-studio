import { Select as BaseSelect } from "@base-ui/react/select";
import { Check, ChevronDown } from "lucide-react";
import { useGallery } from "@/gallery/context";
import { cn, previewClass, type PreviewState } from "./cn";

export interface SelectProps {
  options: string[];
  value?: string;
  onChange?(value: string): void;
  placeholder?: string;
  className?: string;
  preview?: PreviewState;
}

export function Select({ options, value, onChange, placeholder, className, preview }: SelectProps) {
  const { choices } = useGallery();
  const strokeWidth = choices.iconWeight === "regular" ? 2 : 1.5;
  return (
    <BaseSelect.Root
      value={value}
      onValueChange={(next) => {
        if (next !== null) onChange?.(next);
      }}
    >
      <BaseSelect.Trigger
        className={cn(
          "flex h-control w-full items-center justify-between gap-3 rounded-[var(--radius-control)] border border-input bg-background px-3 text-left text-body text-foreground shadow-sm outline-none transition-colors duration-[var(--duration-fast)] hover:bg-accent focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/30 data-[pressed]:bg-muted",
          className,
          previewClass(preview, {
            hover: "bg-accent",
            active: "bg-muted",
            focus: "border-ring ring-2 ring-ring/30",
            disabled: "pointer-events-none bg-muted opacity-50",
          }),
        )}
      >
        <BaseSelect.Value placeholder={placeholder} className="min-w-0 flex-1 truncate data-[placeholder]:text-muted-foreground" />
        <BaseSelect.Icon className="shrink-0 text-muted-foreground">
          <ChevronDown className="size-4" strokeWidth={strokeWidth} aria-hidden="true" />
        </BaseSelect.Icon>
      </BaseSelect.Trigger>
      <BaseSelect.Positioner sideOffset={4} align="start" alignItemWithTrigger={false} className="z-50">
        <BaseSelect.Popup className="min-w-[var(--anchor-width)] rounded-popover border border-border bg-popover p-1.5 text-popover-foreground shadow-lg outline-none">
          <BaseSelect.List>
            {options.map((option) => (
              <BaseSelect.Item
                key={option}
                value={option}
                className="flex h-control cursor-default items-center gap-2 rounded-md px-2.5 text-body outline-none transition-colors duration-[var(--duration-fast)] data-[highlighted]:bg-accent data-[selected]:text-accent-text data-[disabled]:pointer-events-none data-[disabled]:opacity-50"
              >
                <BaseSelect.ItemText className="min-w-0 flex-1 truncate">{option}</BaseSelect.ItemText>
                <BaseSelect.ItemIndicator className="shrink-0 text-accent-text">
                  <Check className="size-3.5" strokeWidth={strokeWidth} aria-hidden="true" />
                </BaseSelect.ItemIndicator>
              </BaseSelect.Item>
            ))}
          </BaseSelect.List>
        </BaseSelect.Popup>
      </BaseSelect.Positioner>
    </BaseSelect.Root>
  );
}
