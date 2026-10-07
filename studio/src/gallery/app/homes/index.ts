import type { ComponentType } from "react";
import type { LucideIcon } from "lucide-react";
import type { Archetype } from "@/tree/types";
import { CANVAS_ICONS, CanvasHome } from "./Canvas";
import { COMMERCE_ICONS, CommerceHome } from "./Commerce";
import { COMPANION_ICONS, CompanionHome } from "./Companion";
import { CONVERSATION_ICONS, ConversationHome } from "./Conversation";
import { FEED_ICONS, FeedHome } from "./Feed";
import { MEDIA_ICONS, MediaHome } from "./Media";
import { READER_ICONS, ReaderHome } from "./Reader";
import { UTILITY_ICONS, UtilityHome } from "./Utility";
import { WORKSPACE_ICONS, WorkspaceHome } from "./Workspace";

/**
 * The home surface per archetype: what fills the shell below the page header.
 * The frame (sidebar, top nav, page header) is shared; the home is the product's main object.
 */
export const HOMES: Record<Archetype, ComponentType> = {
  workspace: WorkspaceHome,
  feed: FeedHome,
  commerce: CommerceHome,
  reader: ReaderHome,
  media: MediaHome,
  companion: CompanionHome,
  canvas: CanvasHome,
  conversation: ConversationHome,
  utility: UtilityHome,
};

/** Nav icons per archetype, in `content.app.nav` order. */
export const HOME_ICONS: Record<Archetype, readonly LucideIcon[]> = {
  workspace: WORKSPACE_ICONS,
  feed: FEED_ICONS,
  commerce: COMMERCE_ICONS,
  reader: READER_ICONS,
  media: MEDIA_ICONS,
  companion: COMPANION_ICONS,
  canvas: CANVAS_ICONS,
  conversation: CONVERSATION_ICONS,
  utility: UTILITY_ICONS,
};
