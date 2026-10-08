import { useGallery } from "@/gallery/context";
import { cn, previewClass, type PreviewState } from "./cn";

export interface SkeletonProps {
  className?: string;
  preview?: PreviewState;
}

export function Skeleton({ className, preview }: SkeletonProps) {
  const { choices } = useGallery();
  return (
    <div
      aria-hidden="true"
      className={cn(
        "rounded-md bg-muted",
        choices.motion !== "still" && "animate-pulse",
        previewClass(preview, {
          hover: "bg-accent",
          active: "opacity-70",
          focus: "ring-2 ring-ring",
          disabled: "opacity-50",
        }),
        className,
      )}
    />
  );
}
