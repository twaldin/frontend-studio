import type { Archetype } from "@/tree/types";
import type { Surfaces } from "../schema";
import { surfaceMap } from "./seeds";

const COPY: Record<Archetype, { title: string; action: string; empty: string; topics: string[] }> = {
  workspace: { title: "Service activity", action: "Post update", empty: "No service updates yet. Deploy or post an update to start the timeline.", topics: ["Deploys", "Incidents", "Services"] },
  feed: { title: "Following", action: "New post", empty: "No posts yet. Follow a person or topic to build your feed.", topics: ["Baking", "Writing", "Gardening", "Ceramics"] },
  commerce: { title: "Maker updates", action: "Share an update", empty: "No maker updates yet. Follow a shop to hear about its next batch.", topics: ["Ceramics", "Textiles", "Home"] },
  reader: { title: "Class activity", action: "Share progress", empty: "No class updates yet. Finish a lesson or join a class.", topics: ["At the market", "Getting around", "Stories"] },
  media: { title: "Listening notes", action: "Post a note", empty: "No listening notes yet. Follow an artist or a podcast.", topics: ["Songs", "Podcasts", "Albums"] },
  companion: { title: "Clan activity", action: "Post to clan", empty: "No clan updates yet. Join a clan or post a quest result.", topics: ["Raids", "Quests", "Gear"] },
  canvas: { title: "Board activity", action: "Post an update", empty: "No board updates yet. Add a comment to a frame.", topics: ["Welcome", "Sign in", "Flow notes"] },
  conversation: { title: "Project activity", action: "Post an update", empty: "No project updates yet. Share a thread with the project.", topics: ["Analysis", "Launch", "Support"] },
  utility: { title: "Conversion notes", action: "Add a note", empty: "No conversion notes yet. Save a result and add some context.", topics: ["Currency", "Length", "Volume"] },
};

export const FEED_SURFACE = surfaceMap<Surfaces["feed"]>((archetype, seed) => {
  const copy = COPY[archetype];
  const items = archetype === "feed" ? seed.app.items.filter((item) => item.group === "Posts") : seed.app.items.slice(0, 4);
  return {
    title: copy.title, action: copy.action, empty: copy.empty, composer: seed.app.composer.placeholder,
    entries: [
      ...seed.app.thread.slice().reverse().map((message, index) => ({ title: message.author, meta: `${message.author}${message.time ? ` · ${message.time}` : ""}`, body: message.text, group: copy.topics[index % copy.topics.length] })),
      ...items.map((item, index) => ({ title: item.title, meta: item.meta, body: item.body ?? `A saved update about ${item.title.toLowerCase()}.`, group: copy.topics[index % copy.topics.length], ...(archetype === "feed" ? { badge: item.badge, value: item.value } : {}) })),
    ],
  };
});
