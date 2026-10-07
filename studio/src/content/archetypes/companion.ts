import type { Content } from "../schema";

/** Companion: the second-screen app for a fictional online game: character, quests, gear, clan and rankings. */
export const COMPANION_CONTENT: Content = {
  product: { name: "Hollowmere", tagline: "Quests, gear and clan for Hollowmere, in one app." },
  app: {
    nav: [{ label: "Home" }, { label: "Quests", badge: 4 }, { label: "Inventory" }, { label: "Clan" }, { label: "Rankings" }, { label: "Settings" }],
    topnav: ["Home", "Quests", "Inventory", "Clan", "Rankings"],
    page: { title: "Home", action: "Claim rewards" },
    stats: [
      {
        label: "Gold",
        value: "18,450",
        series: [12100, 12600, 13050, 13400, 14200, 14650, 15100, 15800, 16300, 16750, 17300, 17800, 18100, 18450],
        breakdown: [
          { name: "Quests", series: [5400, 5650, 5850, 6000, 6350, 6550, 6750, 7100, 7300, 7500, 7750, 8000, 8100, 8300] },
          { name: "Raids", series: [3600, 3750, 3900, 4000, 4250, 4350, 4500, 4700, 4850, 5000, 5150, 5300, 5400, 5500] },
          { name: "Market", series: [1800, 1850, 1950, 2000, 2100, 2150, 2250, 2350, 2400, 2500, 2550, 2650, 2700, 2750] },
          { name: "Loot drops", series: [1300, 1350, 1350, 1400, 1500, 1600, 1600, 1650, 1750, 1750, 1850, 1850, 1900, 1900] },
        ],
      },
      { label: "Gems", value: "320", series: [180, 190, 195, 210, 215, 230, 245, 250, 270, 280, 290, 300, 310, 320] },
      { label: "Embers", value: "1,260", series: [640, 700, 760, 810, 870, 930, 980, 1030, 1080, 1120, 1160, 1200, 1230, 1260] },
      { label: "Crests", value: "45", series: [12, 14, 16, 18, 21, 23, 26, 28, 31, 34, 37, 40, 42, 45] },
    ],
    panel: {
      title: "Ready to claim",
      items: [
        { title: "The forge finished your blade", body: "The tempered blade has been ready since 18:30. Collect it before the forge queue resets.", actions: ["Claim", "Later"] },
        { title: "Weekly rankings close tomorrow", body: "You are 3rd in your clan on power. Rewards go out at 00:00 server time on Monday.", actions: ["View rankings", "Dismiss"] },
      ],
    },
    table: {
      columns: ["Rank", "Player", "Class", "Status", "Power"],
      rows: [
        [{ text: "#1", kind: "mono" }, { text: "Voidlark" }, { text: "Pyromancer", kind: "muted" }, { text: "In a match", kind: "status", tone: "ok" }, { text: "14,820", kind: "num" }],
        [{ text: "#2", kind: "mono" }, { text: "Thornwick" }, { text: "Warden", kind: "muted" }, { text: "Online", kind: "status", tone: "ok" }, { text: "11,305", kind: "num" }],
        [{ text: "#3", kind: "mono" }, { text: "Kestrel (you)" }, { text: "Warden", kind: "muted" }, { text: "Online", kind: "status", tone: "ok" }, { text: "9,120", kind: "num" }],
        [{ text: "#4", kind: "mono" }, { text: "Mirelle" }, { text: "Ranger", kind: "muted" }, { text: "Away", kind: "status", tone: "warn" }, { text: "8,870", kind: "num" }],
        [{ text: "#5", kind: "mono" }, { text: "Quillfeather" }, { text: "Ranger", kind: "muted" }, { text: "Offline", kind: "status", tone: "off" }, { text: "8,210", kind: "num" }],
        [{ text: "#6", kind: "mono" }, { text: "Dunmarrow" }, { text: "Pyromancer", kind: "muted" }, { text: "Offline", kind: "status", tone: "off" }, { text: "7,940", kind: "num" }],
      ],
    },
    form: {
      title: "Profile",
      fields: [
        { label: "Player name", kind: "text", placeholder: "Kestrel" },
        { label: "Server", kind: "select", options: ["Hollow Reach (Europe)", "Ashen Coast (North America)", "Veil Isles (Asia)"] },
        { label: "Show my rank to friends", kind: "switch" },
        { label: "Tell me before a quest expires", kind: "checkbox" },
      ],
      submit: "Save profile",
      cancel: "Cancel",
    },
    empty: { title: "No quests on the board.", body: "New daily quests arrive at midnight server time.", action: "Browse story quests" },
    error: { title: "Can't reach the game servers", detail: "The app lost its connection to Hollowmere at 21:04. Your progress is safe.", action: "Reconnect" },
    toast: "Quest reward claimed.",
    dialog: {
      title: "Sell Ash Greatsword?",
      body: "You'll receive 4,200 gold. Epic gear can be bought back for 24 hours.",
      confirm: "Sell",
      cancel: "Keep it",
    },
    prose: {
      title: "How rankings work",
      paragraphs: [
        "Power is the sum of your gear scores, your level and your clan bonus. Rankings reset every Monday at 00:00 server time.",
        "The top 100 players each week earn crests, and crests unlock clan relics.",
      ],
    },
    code: { path: "", lines: [] },
    composer: { placeholder: "Message your clan", send: "Send" },
    search: "Search players and gear",
    periods: ["Today", "Week", "Season"],
    items: [
      { title: "Kestrel", meta: "Warden · Ashen Wardens clan", value: "8,420 / 10,000 XP", badge: "Level 42", progress: 0.84, group: "Player" },
      { title: "Clear the Sunken Crypt", meta: "Hollow Reach · resets in 6 h", value: "+450 XP", body: "800 gold", badge: "Daily", progress: 0.6, group: "Quests" },
      { title: "Collect the tempered blade", meta: "Forge · finished", value: "+150 XP", body: "Tempered blade", badge: "Ready", progress: 1, group: "Quests" },
      { title: "Deliver the lantern to Orrin", meta: "Story · Chapter 7", value: "+900 XP", body: "Lantern skin", badge: "Story", progress: 0.25, group: "Quests" },
      { title: "Win 3 arena matches", meta: "Arena · 1 of 3 · ends in 2 h", value: "+250 XP", body: "40 gems", badge: "Expiring", progress: 0.33, group: "Quests" },
      { title: "Ash Greatsword", meta: "Weapon · +142 power", value: "Lv 18", badge: "Epic", group: "Inventory" },
      { title: "Wraith Lantern", meta: "Trinket · +8% light radius", value: "×1", badge: "Legendary", group: "Inventory" },
      { title: "Cinder Cloak", meta: "Armor · +60 guard", value: "Lv 12", badge: "Rare", group: "Inventory" },
      { title: "Ember Charm", meta: "Charm · +5% XP", value: "×4", badge: "Uncommon", group: "Inventory" },
      { title: "Hollow Rations", meta: "Consumable · heals 40", value: "×12", badge: "Common", group: "Inventory" },
      { title: "Warden's Sigil", meta: "Relic · +12 crests a day", value: "×1", badge: "Epic", group: "Inventory" },
    ],
    thread: [
      { author: "Thornwick", text: "Raid starts at 20:00. We still need one healer for the Sunken Crypt.", time: "19:41" },
      { author: "Mirelle", text: "I can heal. What power do we need?", time: "19:43" },
      { author: "Thornwick", text: "9,000 or higher. Bring ember charms.", time: "19:44" },
      { author: "You", text: "I'm at 9,120 with two charms. See you in the lobby.", mine: true, time: "19:46" },
    ],
  },
  landing: {
    nav: ["Features", "Quests", "Clans", "Support"],
    cta: "Link your account",
    ctaSecondary: "See the rankings",
    emailPlaceholder: "you@example.com",
    h1: "Your Hollowmere character, wherever you are.",
    sub: "Check quests, swap gear and message your clan between sessions. Everything syncs with your game account.",
    sections: [
      { eyebrow: "Quests", title: "Claim rewards while you're away from the game.", body: "Quest progress syncs every minute. Tap Claim and the reward waits in your inventory when you log in." },
      { eyebrow: "Inventory", title: "Swap gear before the raid starts.", body: "Compare power, guard and set bonuses side by side, then equip the loadout from your phone." },
      { eyebrow: "Clan", title: "Plan the week with your clan.", body: "See who is online, who is in a match and who can fill the last raid slot. Messages reach the whole roster at once." },
    ],
    proof: {
      logos: ["Ashen Wardens", "Hollow Court", "Pale Lanterns", "Ember Guild", "Veil Runners", "Stonebriar"],
      numbers: [
        { value: "2.1M", label: "linked characters" },
        { value: "58 s", label: "median time to claim a quest" },
        { value: "4.7", label: "store rating" },
      ],
      quotes: [{ text: "I run raid night from the bus now. Rosters, gear checks and the lobby timer are all in my pocket.", who: "Thornwick, leader of the Ashen Wardens" }],
    },
    footer: "© Hollowmere. All rights reserved.",
  },
};
