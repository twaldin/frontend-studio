import type { Archetype } from "@/tree/types";
import type { Surfaces } from "../schema";
import { surfaceMap } from "./seeds";

const COPY: Record<Archetype, { title: string; action: string; empty: string; lanes: string[]; groups: string[] }> = {
  workspace: { title: "Rollout board", action: "Plan rollout", empty: "No rollouts planned. Add a service to the rollout board.", lanes: ["Planned", "Building", "Checking", "Live"], groups: ["Platform", "Payments", "Identity"] },
  feed: { title: "Post ideas", action: "New idea", empty: "No ideas yet. Save a draft to begin.", lanes: ["Ideas", "Drafting", "Ready", "Published"], groups: ["Baking", "Writing", "Gardening"] },
  commerce: { title: "Order board", action: "New order", empty: "No orders yet. New orders appear here when a buyer checks out.", lanes: ["Ordered", "Making", "Packed", "Shipped"], groups: ["Ceramics", "Textiles", "Home"] },
  reader: { title: "Study board", action: "Add lesson", empty: "No lessons on your board. Choose a unit to start.", lanes: ["To learn", "Practicing", "Review", "Complete"], groups: ["Dialogue", "Vocabulary", "Listening"] },
  media: { title: "Listening queue", action: "Add to queue", empty: "Nothing queued. Add an album or episode from your library.", lanes: ["Saved", "Next up", "Playing", "Finished"], groups: ["Albums", "Songs", "Podcasts"] },
  companion: { title: "Quest board", action: "Track quest", empty: "No tracked quests. Pick a daily or story quest.", lanes: ["Available", "In progress", "Ready to claim", "Claimed"], groups: ["Daily", "Story", "Arena"] },
  canvas: { title: "Design review", action: "Add frame", empty: "No frames in review. Send a frame to this board.", lanes: ["Draft", "In review", "Changes", "Approved"], groups: ["Welcome", "Sign in", "Flow notes"] },
  conversation: { title: "Thread work", action: "Add task", empty: "No thread tasks yet. Turn a message into a task.", lanes: ["Queued", "Working", "Needs input", "Done"], groups: ["Analysis", "Launch", "Support"] },
  utility: { title: "Saved calculations", action: "Save calculation", empty: "No saved calculations. Save a conversion to begin.", lanes: ["Saved", "Checking", "Ready", "Archived"], groups: ["Currency", "Length", "Volume"] },
};

export const BOARD_SURFACE = surfaceMap<Surfaces["board"]>((archetype, seed) => {
  const copy = COPY[archetype];
  const items = archetype === "companion" ? seed.app.items.filter((item) => item.group === "Quests") : archetype === "feed" ? seed.app.items.filter((item) => item.group === "Posts") : seed.app.items.slice(0, 8);
  return { title: copy.title, action: copy.action, empty: copy.empty, lanes: copy.lanes,
    cards: items.map((item, index) => ({ ...item, body: item.body ?? item.meta, stage: index % copy.lanes.length, badge: copy.lanes[index % copy.lanes.length], group: copy.groups[index % copy.groups.length] })),
  };
});
