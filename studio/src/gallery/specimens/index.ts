import type { ComponentType } from "react";
import type { StepId } from "@/tree/types";
import {
  AccentSpecimen,
  ContrastSpecimen,
  DepthSpecimen,
  MonoSpecimen,
  NeutralSpecimen,
  RadiusSpecimen,
  TypefaceSpecimen,
} from "./base";
import {
  ButtonsSpecimen,
  CardsSpecimen,
  DensitySpecimen,
  IconWeightSpecimen,
  InputsSpecimen,
  MenusSpecimen,
  NavIconsSpecimen,
  PageTitleSpecimen,
  RowHoverSpecimen,
  SpacingSpecimen,
  StatsSpecimen,
  TablesSpecimen,
} from "./app";
import { AsyncFeedbackSpecimen } from "./asyncFeedback";
import { ContentSwapSpecimen } from "./contentSwap";
import { ControlResponseSpecimen } from "./controlResponse";
import { LayerArrivalSpecimen } from "./layerArrival";
import { MotionSpecimen } from "./motion";
import { RouteMotionSpecimen } from "./routeMotion";
import { SidebarCollapseSpecimen } from "./sidebar";
import { ThemeMotionSpecimen } from "./themeMotion";
import { TrendSpecimen } from "./trend";
/**
 * A specimen renders the thing one step decides, large, with every state
 * shown statically, so the option can be judged without hunting for it in
 * the shell. The gallery shows the active step's specimen above the shell.
 */
export const SPECIMENS: Partial<Record<StepId, ComponentType>> = {
  typeface: TypefaceSpecimen,
  mono: MonoSpecimen,
  neutral: NeutralSpecimen,
  contrast: ContrastSpecimen,
  accent: AccentSpecimen,
  radius: RadiusSpecimen,
  depth: DepthSpecimen,
  density: DensitySpecimen,
  spacing: SpacingSpecimen,
  sidebarCollapse: SidebarCollapseSpecimen,
  navIcons: NavIconsSpecimen,
  pageTitle: PageTitleSpecimen,
  stats: StatsSpecimen,
  trend: TrendSpecimen,
  tables: TablesSpecimen,
  rowHover: RowHoverSpecimen,
  cards: CardsSpecimen,
  inputs: InputsSpecimen,
  buttons: ButtonsSpecimen,
  iconWeight: IconWeightSpecimen,
  menus: MenusSpecimen,
  motion: MotionSpecimen,
  layerArrival: LayerArrivalSpecimen,
  controlResponse: ControlResponseSpecimen,
  contentSwap: ContentSwapSpecimen,
  asyncFeedback: AsyncFeedbackSpecimen,
  routeMotion: RouteMotionSpecimen,
  themeMotion: ThemeMotionSpecimen,
};
