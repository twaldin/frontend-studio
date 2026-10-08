import type { ArchetypeContent } from "../schema";

/** Canvas: a shared design and whiteboard editor for screens, flows and notes. */
export const CANVAS_CONTENT: ArchetypeContent = {
  product: { name: "Tilework", tagline: "Draw screens, flows and ideas on one shared canvas." },
  app: {
    nav: [{ label: "Boards" }, { label: "Components" }, { label: "Templates" }, { label: "Comments", badge: 4 }, { label: "Team" }, { label: "Settings" }],
    topnav: ["Boards", "Components", "Templates", "Team", "Settings"],
    page: { title: "Boards", action: "New board" },
    stats: [
      { label: "Boards", value: "48", series: [38, 38, 39, 40, 40, 41, 41, 42, 43, 44, 44, 46, 47, 48] },
      { label: "Open comments", value: "14", series: [9, 11, 10, 13, 12, 15, 17, 16, 18, 15, 16, 13, 15, 14] },
      { label: "Collaborators", value: "12", series: [7, 8, 8, 9, 9, 9, 10, 10, 11, 11, 11, 12, 12, 12] },
      { label: "Exports this week", value: "86", series: [52, 58, 61, 55, 49, 63, 70, 66, 72, 68, 75, 79, 83, 86] },
    ],
    panel: {
      title: "Open comments",
      items: [
        { title: "Priya on Sign in", body: "Can the continue button stay visible when the keyboard opens?", actions: ["Resolve", "Reply"] },
        { title: "Marcus on Welcome", body: "The hero crops at 320 px wide. Should it scale instead?", actions: ["Resolve", "Reply"] },
      ],
    },
    table: {
      columns: ["Board", "Owner", "Frames", "Edited", "Status"],
      rows: [
        [{ text: "Onboarding flow" }, { text: "Priya", kind: "muted" }, { text: "12", kind: "num" }, { text: "2 min ago", kind: "muted" }, { text: "Shared", kind: "status", tone: "ok" }],
        [{ text: "Pricing page" }, { text: "Marcus", kind: "muted" }, { text: "6", kind: "num" }, { text: "1 h ago", kind: "muted" }, { text: "In review", kind: "status", tone: "warn" }],
        [{ text: "Settings redesign" }, { text: "Dana", kind: "muted" }, { text: "9", kind: "num" }, { text: "Yesterday", kind: "muted" }, { text: "Draft", kind: "status", tone: "off" }],
        [{ text: "Checkout v2" }, { text: "Ines", kind: "muted" }, { text: "14", kind: "num" }, { text: "Yesterday", kind: "muted" }, { text: "Changes requested", kind: "status", tone: "bad" }],
        [{ text: "Icon set" }, { text: "Marcus", kind: "muted" }, { text: "3", kind: "num" }, { text: "3 d ago", kind: "muted" }, { text: "Shared", kind: "status", tone: "ok" }],
        [{ text: "Offsite brainstorm" }, { text: "Dana", kind: "muted" }, { text: "1", kind: "num" }, { text: "1 w ago", kind: "muted" }, { text: "Archived", kind: "status", tone: "unknown" }],
      ],
    },
    form: {
      title: "Layer",
      fields: [
        { label: "Name", kind: "text", placeholder: "Get started button" },
        { label: "Resizing", kind: "select", options: ["Fixed", "Hug contents", "Fill container"] },
        { label: "Clip content", kind: "switch" },
        { label: "Include in exports", kind: "checkbox" },
      ],
      submit: "Apply",
      cancel: "Reset",
    },
    empty: { title: "No boards yet.", body: "Start from a blank canvas or a template.", action: "New board" },
    error: { title: "Couldn't save changes", detail: "You were offline for 40 s. Your last 3 edits are kept on this device.", action: "Retry" },
    toast: "Link copied.",
    dialog: { title: "Delete this frame?", body: "The frame and the 4 layers inside it are removed from the board. Everyone on the board loses it.", confirm: "Delete frame", cancel: "Cancel" },
    prose: {
      title: "Frames and layers",
      paragraphs: [
        "A frame is a screen or a section of the board. Layers inside a frame move with it and keep their position relative to its edges.",
        "Everyone on the board sees edits as they happen. Cursors show who is where, and comments pin to the layer they are about.",
      ],
    },
    code: { path: "", lines: [] },
    composer: { placeholder: "Add a comment", send: "Post" },
    search: "Search layers",
    periods: ["Today", "7d", "30d"],
    items: [
      { title: "Logo", meta: "Shape · 40 × 40", group: "Welcome" },
      { title: "Headline", meta: "Text · 26 px", body: "Plan your week, together.", group: "Welcome" },
      { title: "Hero art", meta: "Image · 342 × 220", badge: "Locked", group: "Welcome" },
      { title: "Get started button", meta: "Button · 342 × 52", body: "Get started", group: "Welcome" },
      { title: "Email field", meta: "Input · 342 × 48", group: "Sign in" },
      { title: "Password field", meta: "Input · 342 × 48", group: "Sign in" },
      { title: "Continue button", meta: "Button · 342 × 52", body: "Continue", group: "Sign in" },
      { title: "Returning users", meta: "Note · 160 × 96", body: "Skip this screen for returning users.", group: "Flow notes" },
      { title: "Notifications", meta: "Note · 160 × 96", body: "Ask for notifications after day 7.", badge: "Hidden", group: "Flow notes" },
      { title: "Link to Sign in", meta: "Connector", group: "Flow notes" },
    ],
    thread: [
      { author: "Priya", text: "Can the continue button stay visible when the keyboard opens?", time: "10:12" },
      { author: "You", text: "Good catch. I'll pin it to the bottom of the frame.", mine: true, time: "10:14" },
      { author: "Marcus", text: "The hero crops at 320 px wide. Should it scale instead?", time: "10:20" },
      { author: "You", text: "It scales now. Take another look at the Welcome frame.", mine: true, time: "10:31" },
    ],
  },
  landing: {
    nav: ["Product", "Components", "Pricing", "Changelog"],
    cta: "Open a board",
    ctaSecondary: "See a template",
    emailPlaceholder: "you@company.com",
    h1: "Draw the whole product on one canvas.",
    sub: "Frames for screens, room for ideas, and everyone's cursor in the same place.",
    sections: [
      { eyebrow: "Frames", title: "Screens, flows and notes side by side.", body: "Lay out a flow, pin a sticky next to the screen it is about, and link frames with connectors." },
      { eyebrow: "Components", title: "Change it once, everywhere.", body: "Turn a button into a component. Edits to the main copy update every frame that uses it." },
      { eyebrow: "Comments", title: "Feedback that stays on its layer.", body: "Pin a comment to the layer it is about, resolve it when it ships, and keep the history with the board." },
    ],
    proof: {
      logos: ["Alder & Finch", "Brightwater", "Calloway", "Dunmore", "Eastgate", "Fernhill"],
      numbers: [
        { value: "3.1M", label: "layers drawn a day" },
        { value: "80 ms", label: "typical edit sync" },
        { value: "18", label: "people on the busiest board" },
      ],
      quotes: [{ text: "We moved the whole redesign onto one board. Nobody asks which file is current anymore.", who: "Ines Marlowe, design lead at Brightwater" }],
    },
    footer: "© Tilework. All rights reserved.",
  },
};
