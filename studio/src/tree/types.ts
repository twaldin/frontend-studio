/**
 * The decision tree. A step is one design decision with a small set of
 * discrete options. Choosing a reference in the first step presets every
 * later step; the user then confirms or deviates one step at a time.
 */

export type Branch = "base" | "app" | "landing";

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
}

export type StepId =
  // base
  | "reference"
  | "typeface"
  | "mono"
  | "neutral"
  | "contrast"
  | "accent"
  | "radius"
  | "depth"
  | "themes"
  // app
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
  | "motion"
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
