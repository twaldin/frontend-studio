import { Switch as BaseSwitch } from "@base-ui/react/switch";
import { cn, previewClass, type PreviewState } from "./cn";
export interface SwitchProps {
  checked?: boolean;
  onChange?(value: boolean): void;
  label?: string;
  disabled?: boolean;
  preview?: PreviewState;
}

export function Switch({ checked, onChange, label, disabled, preview }: SwitchProps) {
  return (
    <label className="flex min-h-control cursor-pointer items-center gap-2.5 text-body text-foreground">
      <BaseSwitch.Root
        checked={checked}
        disabled={disabled || preview === "disabled"}
        onCheckedChange={(next) => onChange?.(next)}
        className={cn(
          "group relative inline-flex h-5 w-9 shrink-0 items-center rounded-[var(--radius-control)] bg-muted p-0.5 outline-none transition-colors duration-[var(--duration-fast)] hover:bg-accent active:opacity-80 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1 focus-visible:ring-offset-background data-[checked]:bg-primary data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
          previewClass(preview, {
            hover: "bg-accent",
            active: "opacity-80",
            focus: "ring-2 ring-ring ring-offset-1 ring-offset-background",
            disabled: "pointer-events-none opacity-50",
          }),
        )}
      >
        <BaseSwitch.Thumb className="size-4 rounded-[var(--radius-control)] bg-background shadow-sm transition-transform duration-[var(--duration-fast)] data-[checked]:translate-x-4" />
      </BaseSwitch.Root>
      {label && <span>{label}</span>}
    </label>
  );
}
