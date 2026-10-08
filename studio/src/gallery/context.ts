import { createContext, useContext } from "react";
import type { Content, Surfaces } from "@/content/schema";
import type { ResolvedChoices } from "@/tree/types";
import type { Density } from "@/tokens/resolve";

/**
 * What every gallery component can read: the copy, the resolved decisions
 * and the density numbers. Colors, fonts, radius and motion arrive as CSS
 * variables on the `.gallery` root and are consumed through Tailwind
 * utilities (bg-background, text-muted-foreground, rounded-md, shadow-sm,
 * text-chrome, h-control, duration-[var(--duration-base)]).
 */
export interface GalleryEnv {
  content: Content;
  choices: ResolvedChoices;
  density: Density;
  /** The theme this gallery root is rendered in. */
  mode: "light" | "dark";
  /** On a surface step: the surface the shell shows in place of the archetype's home. */
  surface?: keyof Surfaces;
}

export const GalleryContext = createContext<GalleryEnv | null>(null);

export function useGallery(): GalleryEnv {
  const env = useContext(GalleryContext);
  if (!env) throw new Error("useGallery outside <GalleryContext.Provider>");
  return env;
}
