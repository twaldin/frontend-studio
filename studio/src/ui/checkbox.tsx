import { Checkbox as BaseCheckbox } from "@base-ui/react/checkbox";
import { Check } from "lucide-react";
import { useGallery } from "@/gallery/context";
import { cn, previewClass, type PreviewState } from "./cn";

export interface CheckboxProps {
  checked?: boolean;
  onChange?(value: boolean): void;
  label?: string;
  disabled?: boolean;
  preview?: PreviewState;
}

export function Checkbox({ checked, onChange, label, disabled, preview }: CheckboxProps) {
  const { choices } = useGallery();
  return (
    <label className="flex min-h-control cursor-pointer items-center gap-2.5 text-body text-foreground">
      <BaseCheckbox.Root
        checked={checked}
        disabled={disabled || preview === "disabled"}
        onCheckedChange={(next) => onChange?.(next)}
        className={cn(
          "inline-flex size-4 shrink-0 items-center justify-center rounded-[var(--radius-control)] border border-input bg-background text-primary-foreground outline-none transition-colors duration-[var(--duration-fast)] hover:bg-accent active:opacity-80 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1 focus-visible:ring-offset-background data-[checked]:border-primary data-[checked]:bg-primary data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
          previewClass(preview, {
            hover: "bg-accent",
            active: "opacity-80",
            focus: "ring-2 ring-ring ring-offset-1 ring-offset-background",
            disabled: "pointer-events-none opacity-50",
          }),
        )}
      >
        <BaseCheckbox.Indicator className="flex items-center justify-center">
          <Check className="size-3" strokeWidth={choices.iconWeight === "regular" ? 2 : 1.5} aria-hidden="true" />
        </BaseCheckbox.Indicator>
      </BaseCheckbox.Root>
      {label && <span>{label}</span>}
    </label>
  );
}
