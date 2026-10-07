import type { Content } from "../schema";

/**
 * Feed: a community feed of posts from people, newest first.
 *
 * `items` are laid out in three groups, in this order: the posts in the main column, the trending
 * topics, and the people to follow. A post's `meta` is "Author · time", its `value` is the reply,
 * repost and like counts as "42 · 18 · 231", and its `badge` (Photo, Video or Link) adds a media tile.
 * A person's `badge` is the label of their follow button.
 */
export const FEED_CONTENT: Content = {
  product: { name: "Porchlight", tagline: "Posts from the people and topics you follow, newest first." },
  app: {
    nav: [{ label: "Home" }, { label: "Popular" }, { label: "Following" }, { label: "Messages", badge: 4 }, { label: "Saved" }, { label: "Settings" }],
    topnav: ["Home", "Popular", "Following", "Saved", "Settings"],
    page: { title: "Home", action: "New post" },
    stats: [
      {
        label: "Post reach",
        value: "18.4K",
        series: [9.1, 9.6, 8.8, 10.2, 11.5, 10.9, 12.4, 13.8, 12.9, 14.6, 15.2, 16.9, 17.5, 18.4],
        breakdown: [
          { name: "Followers", series: [5.2, 5.4, 5.0, 5.6, 6.1, 5.8, 6.3, 6.9, 6.5, 7.2, 7.4, 8.1, 8.3, 8.7] },
          { name: "Topics", series: [2.6, 2.8, 2.5, 3.0, 3.4, 3.3, 3.7, 4.1, 3.9, 4.4, 4.6, 5.0, 5.3, 5.6] },
          { name: "Shares", series: [1.3, 1.4, 1.3, 1.6, 2.0, 1.8, 2.4, 2.8, 2.5, 3.0, 3.2, 3.8, 3.9, 4.1] },
        ],
      },
      { label: "Followers", value: "2,418", series: [2204, 2212, 2219, 2231, 2240, 2246, 2259, 2271, 2290, 2318, 2341, 2366, 2392, 2418] },
      { label: "Replies", value: "126", series: [48, 52, 61, 57, 66, 72, 70, 81, 88, 84, 97, 104, 113, 126] },
      { label: "Saves", value: "342", series: [140, 152, 161, 158, 176, 189, 201, 214, 228, 245, 266, 291, 317, 342] },
    ],
    panel: {
      title: "Suggested for you",
      items: [
        { title: "Sketch Saturday needs a host", body: "Dana Whitlock stepped down last week. Hosting takes about an hour a week, and the group has 1,200 members.", actions: ["Volunteer", "Not now"] },
        { title: "Your bread draft is three days old", body: "\"Sourdough crumb at 78% hydration\" is still unpublished, and #baking is trending. Post it while people are looking.", actions: ["Open draft", "Discard"] },
      ],
    },
    table: {
      columns: ["Post", "Topic", "Status", "Replies", "Posted"],
      rows: [
        [{ text: "Sourdough crumb at 78% hydration" }, { text: "#baking", kind: "mono" }, { text: "Live", kind: "status", tone: "ok" }, { text: "42", kind: "num" }, { text: "12 min ago", kind: "muted" }],
        [{ text: "Week 3 of the balcony garden" }, { text: "#gardening", kind: "mono" }, { text: "Live", kind: "status", tone: "ok" }, { text: "18", kind: "num" }, { text: "Yesterday", kind: "muted" }],
        [{ text: "Looking for a test reader" }, { text: "#writing", kind: "mono" }, { text: "Scheduled", kind: "status", tone: "off" }, { text: "0", kind: "num" }, { text: "Tomorrow 09:00", kind: "muted" }],
        [{ text: "Which fonts do you ship with?" }, { text: "#design", kind: "mono" }, { text: "Under review", kind: "status", tone: "warn" }, { text: "7", kind: "num" }, { text: "3 d ago", kind: "muted" }],
        [{ text: "Kiln day, unedited" }, { text: "#ceramics", kind: "mono" }, { text: "Removed", kind: "status", tone: "bad" }, { text: "3", kind: "num" }, { text: "5 d ago", kind: "muted" }],
        [{ text: "Notes on a slow editing week" }, { text: "#writing", kind: "mono" }, { text: "Draft", kind: "status", tone: "unknown" }, { text: "—", kind: "muted" }, { text: "—", kind: "muted" }],
      ],
    },
    form: {
      title: "New post",
      fields: [
        { label: "Title", kind: "text", placeholder: "Sourdough crumb at 78% hydration" },
        { label: "Audience", kind: "select", options: ["Everyone", "Followers only", "Close friends"] },
        { label: "Allow replies", kind: "switch" },
        { label: "Email me when someone replies", kind: "checkbox" },
      ],
      submit: "Publish post",
      cancel: "Cancel",
    },
    empty: { title: "Your feed is empty.", body: "Follow a few people or topics and their posts will show up here, newest first.", action: "Find people to follow" },
    error: { title: "Post not published", detail: "Your post is 14 characters over the 500 character limit.", action: "Edit post" },
    toast: "Your post is live.",
    dialog: { title: "Delete this post?", body: "Its replies and likes are deleted with it. This cannot be undone.", confirm: "Delete post", cancel: "Keep post" },
    prose: {
      title: "House rules",
      paragraphs: [
        "Post as yourself and link to what you quote. Disagree with the idea, not with the person who posted it.",
        "Moderators remove spam, doxxing and harassment. Everything else stays up, and you can mute any account or topic from its menu.",
      ],
    },
    code: { path: "", lines: [] },
    composer: { placeholder: "What are you making this week?", send: "Post" },
    search: "Search people and topics",
    periods: ["Today", "Week", "Month"],
    items: [
      {
        title: "Sourdough crumb at 78% hydration",
        meta: "Priya Nair · 12 min ago",
        body: "Third loaf this month and the first with an open crumb. A longer autolyse and a colder final proof made the difference. Timings are in the replies.",
        value: "42 · 18 · 231",
        badge: "Photo",
        group: "Posts",
      },
      {
        title: "Looking for a test reader",
        meta: "Tomás Reyes · 1 h ago",
        body: "My short story collection is at 62,000 words. I need two readers who will mark where they got bored. Reply here and I'll send the draft this weekend.",
        value: "27 · 6 · 94",
        group: "Posts",
      },
      {
        title: "Week 3 of the balcony garden",
        meta: "Hana Sato · 3 h ago",
        body: "The shiso survived the wind and the basil did not. Everything moves to the sheltered corner, and the peas get a trellis.",
        value: "18 · 4 · 157",
        badge: "Photo",
        group: "Posts",
      },
      {
        title: "Studio move, in forty seconds",
        meta: "Odile Fournier · 5 h ago",
        body: "Forty boxes, one broken shelf and a kiln that took four people. Packed in six hours, unpacked in two days.",
        value: "63 · 31 · 188",
        badge: "Video",
        group: "Posts",
      },
      { title: "#sourdough", meta: "Baking · 1.2K posts", group: "Trending" },
      { title: "#balconygarden", meta: "Gardening · 860 posts", group: "Trending" },
      { title: "#novelwriting", meta: "Writing · 3.4K posts", group: "Trending" },
      { title: "#kilnday", meta: "Ceramics · 410 posts", group: "Trending" },
      { title: "Wren Okafor", meta: "Ceramics · 4.1K followers", badge: "Follow", group: "Who to follow" },
      { title: "Matteo Bianchi", meta: "Bread and pastry · 2.7K followers", badge: "Follow", group: "Who to follow" },
      { title: "Ines Calderón", meta: "Illustration · 1.9K followers", badge: "Follow", group: "Who to follow" },
    ],
    thread: [
      { author: "Hana Sato", text: "What was your final proof time? Mine always collapse past 14 hours.", time: "8 min ago" },
      { author: "Priya Nair", text: "Twelve hours in the fridge at 4°C, then 40 minutes at room temperature before baking.", time: "6 min ago" },
      { author: "You", text: "Saving this. Did the longer autolyse change the flavor?", mine: true, time: "4 min ago" },
      { author: "Matteo Bianchi", text: "It softens the sourness a little. I go 90 minutes.", time: "2 min ago" },
    ],
  },
  landing: {
    nav: ["Explore", "Topics", "Guidelines", "Sign in"],
    cta: "Join Porchlight",
    ctaSecondary: "Browse topics",
    emailPlaceholder: "you@example.com",
    h1: "A feed made of the people you chose to follow.",
    sub: "Porchlight shows posts from the people and topics you follow, newest first, with every reply kept under the post it answers.",
    sections: [
      { eyebrow: "Home", title: "Posts appear in the order they were written.", body: "Your home feed lists what the people and topics you follow posted, newest first. Nothing is reordered, and nothing is inserted between them." },
      { eyebrow: "Replies", title: "Replies stay under the post they answer.", body: "Every conversation is one thread under its post. Reply, mute the thread, or save it to read later." },
      { eyebrow: "Topics", title: "Follow a subject, not just a person.", body: "A topic collects posts from everyone. Follow #baking for the loaves, or mute it when the feed fills with starter talk." },
    ],
    proof: {
      logos: ["Ashgrove Press", "Tidewater Pottery", "Larkspur Collective", "Kestrel Books", "Oakhill Studio", "Marrow Bakery"],
      numbers: [
        { value: "180K", label: "members" },
        { value: "2.1M", label: "posts a month" },
        { value: "14 min", label: "median time to first reply" },
      ],
      quotes: [{ text: "I post once and the right six people answer within the hour.", who: "Priya Nair, baker and writer" }],
    },
    footer: "© Porchlight. All rights reserved.",
  },
};
