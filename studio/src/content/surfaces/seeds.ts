import type { Archetype } from "@/tree/types";
import type { ArchetypeContent } from "../schema";
import { CANVAS_CONTENT } from "../archetypes/canvas";
import { COMMERCE_CONTENT } from "../archetypes/commerce";
import { COMPANION_CONTENT } from "../archetypes/companion";
import { CONVERSATION_CONTENT } from "../archetypes/conversation";
import { FEED_CONTENT } from "../archetypes/feed";
import { MEDIA_CONTENT } from "../archetypes/media";
import { READER_CONTENT } from "../archetypes/reader";
import { UTILITY_CONTENT } from "../archetypes/utility";
import { WORKSPACE_CONTENT } from "../archetypes/workspace";

/** Every surface supplies all nine keys, checked without an Object.fromEntries type assertion. */
export function surfaceMap<T>(build: (archetype: Archetype, content: ArchetypeContent) => T): Record<Archetype, T> {
  return {
    workspace: build("workspace", WORKSPACE_CONTENT), feed: build("feed", FEED_CONTENT), commerce: build("commerce", COMMERCE_CONTENT),
    reader: build("reader", READER_CONTENT), media: build("media", MEDIA_CONTENT), companion: build("companion", COMPANION_CONTENT),
    canvas: build("canvas", CANVAS_CONTENT), conversation: build("conversation", CONVERSATION_CONTENT), utility: build("utility", UTILITY_CONTENT),
  };
}
