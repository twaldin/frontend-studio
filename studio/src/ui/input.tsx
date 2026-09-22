import type { ChangeEventHandler, HTMLInputTypeAttribute } from "react";
import { cn, previewClass, type PreviewState } from "./cn";

export interface InputProps {
  placeholder?: string;
  value?: string;
  onChange?: ChangeEventHandler<HTMLInputElement>;
  className?: string;
  type?: HTMLInputTypeAttribute;
  disabled?: boolean;
  preview?: PreviewState;
}

export function Input({ placeholder, value, onChange, className, type = "text", disabled, preview }: InputProps) {
  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      readOnly={value !== undefined && onChange === undefined}
      disabled={disabled}
      className={cn(
        "h-control w-full rounded-[var(--radius-control)] border border-input bg-background px-3 text-body text-foreground shadow-sm outline-none transition-colors duration-[var(--duration-fast)] placeholder:text-muted-foreground hover:border-foreground/30 focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/30 disabled:cursor-not-allowed disabled:bg-muted disabled:opacity-50",
        previewClass(preview, {
          hover: "border-foreground/40!",
          active: "border-foreground/60!",
          focus: "border-ring ring-2 ring-ring/30",
          disabled: "cursor-not-allowed bg-muted opacity-50",
        }),
        className,
      )}
    />
  );
}
