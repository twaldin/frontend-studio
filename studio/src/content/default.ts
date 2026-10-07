import type { Archetype } from "@/tree/types";
import type { Content } from "./schema";
import { CANVAS_CONTENT } from "./archetypes/canvas";
import { COMMERCE_CONTENT } from "./archetypes/commerce";
import { COMPANION_CONTENT } from "./archetypes/companion";
import { CONVERSATION_CONTENT } from "./archetypes/conversation";
import { FEED_CONTENT } from "./archetypes/feed";
import { MEDIA_CONTENT } from "./archetypes/media";
import { READER_CONTENT } from "./archetypes/reader";
import { UTILITY_CONTENT } from "./archetypes/utility";
import { WORKSPACE_CONTENT } from "./archetypes/workspace";

/** Sample content per archetype. A project's `content.json` deep-merges over the chosen archetype's. */
export const CONTENT_BY_ARCHETYPE: Record<Archetype, Content> = {
  workspace: WORKSPACE_CONTENT,
  feed: FEED_CONTENT,
  commerce: COMMERCE_CONTENT,
  reader: READER_CONTENT,
  media: MEDIA_CONTENT,
  companion: COMPANION_CONTENT,
  canvas: CANVAS_CONTENT,
  conversation: CONVERSATION_CONTENT,
  utility: UTILITY_CONTENT,
};
