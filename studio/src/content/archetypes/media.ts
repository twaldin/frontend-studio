import type { ArchetypeContent } from "../schema";

/**
 * Media: a library to play music and podcasts from.
 *
 * `items` are laid out in three groups, in this order: one featured release for the hero, then two
 * shelves of five. The now-playing bar shows the first item that has a `progress`, and reads its
 * duration from `value` ("4:12") to put elapsed and total time beside the bar.
 */
export const MEDIA_CONTENT: ArchetypeContent = {
  product: { name: "Marigold", tagline: "Music, podcasts and radio, with your place saved." },
  app: {
    nav: [{ label: "Home" }, { label: "Search" }, { label: "Library" }, { label: "Radio" }, { label: "Downloads", badge: 2 }, { label: "Settings" }],
    topnav: ["Home", "Search", "Library", "Radio", "Downloads"],
    page: { title: "Home", action: "New playlist" },
    stats: [
      {
        label: "Listening today",
        value: "118 min",
        series: [64, 72, 58, 81, 95, 88, 102, 76, 84, 97, 110, 93, 105, 118],
        breakdown: [
          { name: "Music", series: [38, 42, 35, 46, 55, 50, 60, 44, 49, 56, 64, 52, 60, 70] },
          { name: "Podcasts", series: [18, 22, 16, 25, 28, 27, 30, 22, 25, 29, 32, 29, 31, 34] },
          { name: "Radio", series: [8, 8, 7, 10, 12, 11, 12, 10, 10, 12, 14, 12, 14, 14] },
        ],
      },
      { label: "Songs played", value: "46", series: [31, 34, 28, 40, 44, 41, 49, 35, 38, 43, 52, 41, 45, 46] },
      { label: "Episodes finished", value: "3", series: [1, 2, 1, 3, 2, 2, 4, 1, 2, 3, 4, 2, 3, 3] },
      { label: "Downloaded", value: "6.2 GB", series: [3.1, 3.1, 3.4, 3.6, 3.9, 4.0, 4.4, 4.5, 4.9, 5.1, 5.4, 5.6, 5.9, 6.2] },
    ],
    panel: {
      title: "Picked for you",
      items: [
        { title: "Three new episodes of Field Notes", body: "Dr. Imani Cole released a three-part series on tide pools. Add them to your queue in order?", actions: ["Add to queue", "Skip"] },
        { title: "Your downloads are 94% full", body: "Marigold can remove 11 finished episodes and free 1.8 GB. Your songs and playlists stay.", actions: ["Free up space", "Keep all"] },
      ],
    },
    table: {
      columns: ["Title", "Artist", "Length", "Download", "Last played"],
      rows: [
        [{ text: "Salt Flats" }, { text: "The Quiet Harbors", kind: "muted" }, { text: "4:12", kind: "num" }, { text: "Downloaded", kind: "status", tone: "ok" }, { text: "Now playing", kind: "muted" }],
        [{ text: "Sundial" }, { text: "Oko & Fern", kind: "muted" }, { text: "3:26", kind: "num" }, { text: "Downloading", kind: "status", tone: "warn" }, { text: "Yesterday", kind: "muted" }],
        [{ text: "Field Notes, Ep. 31" }, { text: "Dr. Imani Cole", kind: "muted" }, { text: "38:20", kind: "num" }, { text: "Downloaded", kind: "status", tone: "ok" }, { text: "2 h ago", kind: "muted" }],
        [{ text: "Glass Orchard" }, { text: "Mirabel Ashe", kind: "muted" }, { text: "41:08", kind: "num" }, { text: "Not downloaded", kind: "status", tone: "off" }, { text: "—", kind: "muted" }],
        [{ text: "Harbor Lights Live" }, { text: "The Quiet Harbors", kind: "muted" }, { text: "1:12:30", kind: "num" }, { text: "Downloaded", kind: "status", tone: "ok" }, { text: "Last week", kind: "muted" }],
        [{ text: "Paper Lanterns" }, { text: "Juno Vasquez", kind: "muted" }, { text: "37:15", kind: "num" }, { text: "Unavailable", kind: "status", tone: "bad" }, { text: "3 d ago", kind: "muted" }],
      ],
    },
    form: {
      title: "New playlist",
      fields: [
        { label: "Name", kind: "text", placeholder: "Slow mornings" },
        { label: "Visibility", kind: "select", options: ["Private", "Friends", "Public"] },
        { label: "Download for offline", kind: "switch" },
        { label: "Add songs I play next", kind: "checkbox" },
      ],
      submit: "Create playlist",
      cancel: "Cancel",
    },
    empty: { title: "Nothing downloaded yet.", body: "Download songs and episodes and they play without a connection.", action: "Browse your library" },
    error: { title: "Can't play Paper Lanterns", detail: "You're offline and this album isn't downloaded.", action: "Go to downloads" },
    toast: "Added to Slow mornings.",
    dialog: { title: "Remove downloads?", body: "Eleven finished episodes are deleted from this device. You can download them again later.", confirm: "Remove", cancel: "Keep" },
    prose: {
      title: "Offline listening",
      paragraphs: [
        "Downloaded songs and episodes play without a connection and use no mobile data. Downloads finish while your device charges on Wi-Fi.",
        "Remove a download to free space. Your playlists and your place in each episode stay in your library.",
      ],
    },
    code: { path: "", lines: [] },
    composer: { placeholder: "Name your new playlist", send: "Create" },
    search: "Search songs, podcasts and artists",
    periods: ["Today", "Week", "Month"],
    items: [
      {
        title: "Night Shift",
        meta: "Mirabel Ashe · Album · 11 songs",
        body: "Slow synth pieces recorded between midnight and four, with field recordings from the loading dock next door.",
        value: "42 min",
        badge: "New release",
        group: "Featured",
      },
      { title: "Salt Flats", meta: "The Quiet Harbors · Song", value: "4:12", progress: 0.38, group: "Jump back in" },
      { title: "Field Notes, Ep. 31", meta: "Dr. Imani Cole · Podcast", value: "38:20", progress: 0.72, group: "Jump back in" },
      { title: "Low Tide Sessions", meta: "Oko & Fern · Album", value: "52 min", progress: 0.15, group: "Jump back in" },
      { title: "The Long Way Round", meta: "Ruth Adeyemi · Podcast", value: "46:10", progress: 0.9, group: "Jump back in" },
      { title: "Paper Lanterns", meta: "Juno Vasquez · Album", value: "37 min", progress: 0.5, group: "Jump back in" },
      { title: "Glass Orchard", meta: "Mirabel Ashe · Album", value: "41 min", badge: "New", group: "New this week" },
      { title: "Open Door Policy", meta: "Tomás Reyes · Podcast", value: "58 min", group: "New this week" },
      { title: "Sundial", meta: "Oko & Fern · Single", value: "3:26", badge: "New", group: "New this week" },
      { title: "Harbor Lights Live", meta: "The Quiet Harbors · Live", value: "1 h 12 min", group: "New this week" },
      { title: "Slow Mornings", meta: "Playlist · 24 songs", value: "1 h 36 min", group: "New this week" },
    ],
    thread: [
      { author: "Dana", text: "The tide pool section is the best twenty minutes of the series.", time: "2 d ago" },
      { author: "Dr. Imani Cole", text: "Thank you. The recording took three low tides to get.", time: "2 d ago" },
      { author: "You", text: "Is there a list of the species you mention in part two?", mine: true, time: "1 d ago" },
      { author: "Dr. Imani Cole", text: "Yes, it's linked in the episode notes.", time: "1 d ago" },
    ],
  },
  landing: {
    nav: ["Listen", "Podcasts", "Offline", "Plans"],
    cta: "Start listening",
    ctaSecondary: "See plans",
    emailPlaceholder: "you@example.com",
    h1: "Your music and podcasts, in one library.",
    sub: "Marigold keeps your place in every song and episode, downloads what you'll want offline, and picks up on any device you sign in to.",
    sections: [
      { eyebrow: "Library", title: "Songs, shows and radio in one place.", body: "Save an album, follow a podcast or pin a station, and find all three under Library. Search covers everything you have saved." },
      { eyebrow: "Offline", title: "Download once, play anywhere.", body: "Downloads finish while your device charges on Wi-Fi. Finished episodes can be removed automatically when space runs low." },
      { eyebrow: "Queue", title: "Pick up where you stopped.", body: "Marigold remembers your position in every episode and album. Start on your phone and keep going on your laptop." },
    ],
    proof: {
      logos: ["Harborline Records", "Pinecone Audio", "Tidepool Media", "Brightwater FM", "Sable Podcasts", "Northlight Music"],
      numbers: [
        { value: "9M", label: "songs and episodes" },
        { value: "310K", label: "podcast feeds" },
        { value: "1.8 GB", label: "average offline library" },
      ],
      quotes: [{ text: "I stopped keeping a note of which episode I was on. Marigold already knows.", who: "Ruth Adeyemi, host of The Long Way Round" }],
    },
    footer: "© Marigold. All rights reserved.",
  },
};
