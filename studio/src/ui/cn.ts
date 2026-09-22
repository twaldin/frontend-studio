import { clsx, type ClassValue } from "clsx";

export function cn(...inputs: ClassValue[]): string {
  return clsx(inputs);
}

export type PreviewState = "hover" | "active" | "focus" | "disabled";

export function previewClass(
  preview: PreviewState | undefined,
  states: Partial<Record<PreviewState, string>>,
): string | undefined {
  return preview ? states[preview] : undefined;
}
