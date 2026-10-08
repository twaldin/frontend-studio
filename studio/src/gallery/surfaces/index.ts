import type { ComponentType } from "react";
import type { Surfaces } from "@/content/schema";
import type { StepId } from "@/tree/types";
import { BoardBody, BoardStates } from "./Board";
import { CommerceBody, CommerceStates } from "./Commerce";
import { ConversationBody, ConversationStates } from "./Conversation";
import { FeedBody, FeedStates } from "./Feed";
import { ReaderBody, ReaderStates } from "./Reader";

export interface SurfaceView {
  /** The surface's page under the shell's page header, in the layout its step chose, on `content.surfaces`. */
  Body: ComponentType;
  /** The surface's empty and loading states side by side, in the same layout. */
  States: ComponentType;
}

/**
 * The surface galleries. A surface step shows its surface in the shell, in place of the archetype's
 * home, on the archetype's own content for that surface; every frame, token and component step still restyles it.
 */
export const SURFACES: Record<keyof Surfaces, SurfaceView> = {
  feed: { Body: FeedBody, States: FeedStates },
  board: { Body: BoardBody, States: BoardStates },
  conversation: { Body: ConversationBody, States: ConversationStates },
  reader: { Body: ReaderBody, States: ReaderStates },
  commerce: { Body: CommerceBody, States: CommerceStates },
};

/** The surface each surface step decides. */
export const SURFACE_OF_STEP: Partial<Record<StepId, keyof Surfaces>> = {
  feedLayout: "feed",
  boardLayout: "board",
  conversationLayout: "conversation",
  readerLayout: "reader",
  commerceLayout: "commerce",
};
