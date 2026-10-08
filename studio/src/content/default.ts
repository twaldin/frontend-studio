import type { Content } from "./schema";
import { surfaceMap } from "./surfaces/seeds";
import { BOARD_SURFACE } from "./surfaces/board";
import { COMMERCE_SURFACE } from "./surfaces/commerce";
import { CONVERSATION_SURFACE } from "./surfaces/conversation";
import { FEED_SURFACE } from "./surfaces/feed";
import { READER_SURFACE } from "./surfaces/reader";


/**
 * Sample content per archetype: its own sample, plus each surface written in its vocabulary.
 * A project's `content.json` deep-merges over the chosen archetype's.
 */
export const CONTENT_BY_ARCHETYPE = surfaceMap<Content>((archetype, seed) => ({
  ...seed,
  surfaces: {
    feed: FEED_SURFACE[archetype],
    board: BOARD_SURFACE[archetype],
    conversation: CONVERSATION_SURFACE[archetype],
    reader: READER_SURFACE[archetype],
    commerce: COMMERCE_SURFACE[archetype],
  },
}));
