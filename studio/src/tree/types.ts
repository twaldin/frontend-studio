/**
 * The decision tree. A step is one design decision with a small set of
 * discrete options. The archetype and the reference in the first steps
 * preset every later step; the user then confirms or deviates one step at a time.
 */

export type Branch = "product" | "frame" | "surfaces" | "tokens" | "components" | "interaction" | "landing";

export type { Archetype } from "../model/schema";

export interface Option {
  id: string;
  label: string;
  /** One line: what changes if you pick this. */
  note: string;
}

export interface Step {
  id: StepId;
  branch: Branch;
  /** The question, as asked to the user. */
  question: string;
  /** Why the decision matters, one line. */
  why: string;
  options: readonly Option[];
  /** Which gallery to show while this step is active. */
  gallery: "app" | "landing";
  /** The pattern record in `references/patterns/` that this step's options are the variants of. */
  pattern?: string;
}

export type StepId =
  // product
  | "archetype"
  | "reference"
  | "look"
  // tokens
  | "typeface"
  | "mono"
  | "neutral"
  | "contrast"
  | "accent"
  | "radius"
  | "depth"
  | "themes"
  // frame and components
  | "density"
  | "spacing"
  | "shell"
  | "sidebarTone"
  | "navIcons"
  | "pageTitle"
  | "sidebarCollapse"
  | "stats"
  | "trend"
  | "tables"
  | "rowHover"
  | "cards"
  | "inputs"
  | "buttons"
  | "iconWeight"
  | "menus"
  // surfaces: how each kind of surface is composed
  | "feedLayout"
  | "boardLayout"
  | "conversationLayout"
  | "readerLayout"
  | "commerceLayout"
  // interaction and motion
  | "motion"
  | "layerArrival"
  | "controlResponse"
  | "contentSwap"
  | "asyncFeedback"
  | "routeMotion"
  | "themeMotion"
  // landing
  | "register"
  | "display"
  | "displayCase"
  | "hero"
  | "heroMotion"
  | "background"
  | "rhythm"
  | "frames"
  | "characters"
  | "proof"
  | "cta";

/** stepId → optionId. Partial: unset steps fall back to the reference preset. */
export type Choices = Partial<Record<StepId, string>>;
export type ResolvedChoices = Record<StepId, string>;
