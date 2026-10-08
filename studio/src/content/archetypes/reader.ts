import type { ArchetypeContent } from "../schema";

/**
 * Reader: a language course with a reading library.
 * The home reads `items` in two ways: lessons grouped by unit (in path order; the first one that isn't finished is the current lesson)
 * and a single item in the "Today" group, the daily goal.
 */
export const READER_CONTENT: ArchetypeContent = {
  product: { name: "Tessel", tagline: "Short Portuguese lessons and a library of stories you can read." },
  app: {
    nav: [{ label: "Learn" }, { label: "Practice", badge: 12 }, { label: "Library" }, { label: "Leaderboard" }, { label: "Profile" }, { label: "Settings" }],
    topnav: ["Learn", "Practice", "Library", "Leaderboard", "Settings"],
    page: { title: "Learn", action: "Review words" },
    stats: [
      { label: "Streak", value: "23", note: "Best: 31 days", series: [10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23] },
      { label: "XP", value: "1,240", note: "200 XP today", series: [60, 120, 90, 150, 40, 180, 210, 110, 150, 185, 160, 215, 220, 200] },
      { label: "Words learned", value: "412", note: "38 this month", series: [310, 318, 326, 331, 340, 349, 356, 366, 375, 383, 391, 399, 406, 412] },
      { label: "Accuracy", value: "91%", note: "Last 7 days", series: [84, 85, 87, 86, 88, 89, 88, 90, 89, 91, 90, 92, 91, 91] },
    ],
    panel: {
      title: "Today",
      items: [
        { title: "12 words are fading", body: "These Unit 2 words haven't come up in five days. A five-minute review keeps them from slipping.", actions: ["Review now", "Later"] },
        { title: "Weekend challenge", body: "Earn 300 XP by Sunday to move up to the Copper league.", actions: ["Start challenge", "Not now"] },
      ],
    },
    table: {
      columns: ["Word", "Meaning", "Strength", "Reviews", "Next review"],
      rows: [
        [{ text: "desculpe" }, { text: "sorry, excuse me", kind: "muted" }, { text: "Strong", kind: "status", tone: "ok" }, { text: "18", kind: "num" }, { text: "In 6 days", kind: "muted" }],
        [{ text: "esquina" }, { text: "street corner", kind: "muted" }, { text: "Fading", kind: "status", tone: "warn" }, { text: "7", kind: "num" }, { text: "Today", kind: "muted" }],
        [{ text: "emprestar" }, { text: "to lend", kind: "muted" }, { text: "Weak", kind: "status", tone: "bad" }, { text: "3", kind: "num" }, { text: "Today", kind: "muted" }],
        [{ text: "devagar" }, { text: "slowly", kind: "muted" }, { text: "Strong", kind: "status", tone: "ok" }, { text: "14", kind: "num" }, { text: "In 4 days", kind: "muted" }],
        [{ text: "troco" }, { text: "change (money)", kind: "muted" }, { text: "New", kind: "status", tone: "unknown" }, { text: "1", kind: "num" }, { text: "Tomorrow", kind: "muted" }],
        [{ text: "balcão" }, { text: "counter", kind: "muted" }, { text: "Strong", kind: "status", tone: "ok" }, { text: "11", kind: "num" }, { text: "In 9 days", kind: "muted" }],
      ],
    },
    form: {
      title: "New word list",
      fields: [
        { label: "List name", kind: "text", placeholder: "Market vocabulary" },
        { label: "Daily goal", kind: "select", options: ["5 minutes", "10 minutes", "15 minutes", "30 minutes"] },
        { label: "Remind me to practice at 19:00", kind: "switch" },
        { label: "Show translations while reading", kind: "checkbox" },
      ],
      submit: "Create list",
      cancel: "Cancel",
    },
    empty: { title: "No lessons yet.", body: "Choose a course and Tessel builds a path of short lessons for your level.", action: "Choose a course" },
    error: { title: "Lesson didn't load", detail: "The audio for Unit 3, lesson 4 couldn't be downloaded. Check your connection and try again.", action: "Try again" },
    toast: "Lesson complete. You earned 20 XP.",
    dialog: { title: "Leave this lesson?", body: "You'll lose the six answers you've given so far. Your streak is not affected.", confirm: "Leave lesson", cancel: "Keep going" },
    prose: {
      title: "The baker who never sleeps",
      paragraphs: [
        "Rosa opens the padaria at four in the morning, long before the street wakes up. By six the first loaves are cooling on the counter, and the neighbors start knocking on the window.",
        "Rosa says the dough decides when the bread is ready. All she does is wait, and she has had thirty years of practice.",
      ],
    },
    code: { path: "", lines: [] },
    composer: { placeholder: "Type your answer in Portuguese", send: "Check" },
    search: "Search lessons and stories",
    periods: ["7d", "30d", "90d"],
    items: [
      { title: "Greetings at the stall", meta: "6 min · 8 new words", value: "+20 XP", badge: "Dialogue", progress: 1, group: "Unit 3 · At the market" },
      { title: "Numbers and prices", meta: "5 min · 10 new words", value: "+20 XP", badge: "Vocabulary", progress: 1, group: "Unit 3 · At the market" },
      { title: "Asking for what you want", meta: "7 min · 9 new words", value: "+20 XP", badge: "Speaking", progress: 1, group: "Unit 3 · At the market" },
      { title: "Weights and quantities", meta: "7 min · 9 new words", value: "+20 XP", badge: "Listening", progress: 0.4, group: "Unit 3 · At the market" },
      { title: "Haggling politely", meta: "8 min · 11 new words", value: "+20 XP", badge: "Dialogue", progress: 0, group: "Unit 3 · At the market" },
      { title: "Unit 3 checkpoint", meta: "10 min · 20 questions", value: "+50 XP", badge: "Quiz", progress: 0, group: "Unit 3 · At the market" },
      { title: "Buying a tram ticket", meta: "6 min · 8 new words", value: "+20 XP", badge: "Dialogue", progress: 0, group: "Unit 4 · Getting around" },
      { title: "Asking for directions", meta: "7 min · 12 new words", value: "+20 XP", badge: "Speaking", progress: 0, group: "Unit 4 · Getting around" },
      { title: "Reading the timetable", meta: "6 min · 9 new words", value: "+20 XP", badge: "Reading", progress: 0, group: "Unit 4 · Getting around" },
      { title: "Unit 4 checkpoint", meta: "10 min · 20 questions", value: "+50 XP", badge: "Quiz", progress: 0, group: "Unit 4 · Getting around" },
      { title: "Daily goal", meta: "9 of 15 minutes", value: "60%", progress: 0.6, group: "Today" },
    ],
    thread: [
      { author: "Tessel", text: "Bom dia! O que deseja comprar hoje?", time: "09:14" },
      { author: "You", text: "Eu quero dois quilos de laranjas, por favor.", mine: true, time: "09:15" },
      { author: "Tessel", text: "Muito bem. Dois quilos de laranjas custam quatro euros. Deseja mais alguma coisa?", time: "09:15" },
      { author: "You", text: "Não, obrigado. Só isso.", mine: true, time: "09:16" },
    ],
  },
  landing: {
    nav: ["Courses", "Library", "Pricing", "Teachers"],
    cta: "Start learning",
    ctaSecondary: "Browse the library",
    emailPlaceholder: "you@example.com",
    h1: "Learn Portuguese ten minutes at a time.",
    sub: "Short lessons build your vocabulary, and a graded library lets you read real stories as soon as you know enough words.",
    sections: [
      { eyebrow: "Lessons", title: "One unit at a time, with a clear next step.", body: "Each unit covers one everyday situation, like buying bread or asking for directions. You finish six short lessons and a checkpoint, then the next unit opens." },
      { eyebrow: "Practice", title: "Review the words that are about to fade.", body: "Tessel tracks how well you know each word and schedules a review before you forget it. A session takes about five minutes." },
      { eyebrow: "Library", title: "Stories written for your level.", body: "Every story is tagged from A1 to B2. Tap a word you don't know to see its meaning and save it to a review list." },
    ],
    proof: {
      logos: ["Harbor School", "Fernwood Academy", "Alder Institute", "Marlow College", "Brightwater Library", "Kestrel Language Lab"],
      numbers: [
        { value: "1.8M", label: "lessons finished each month" },
        { value: "9 min", label: "average daily study time" },
        { value: "86%", label: "of learners still active after 30 days" },
      ],
      quotes: [{ text: "I read my first full story in week six. I didn't need a dictionary for most of it.", who: "Daniel Reyes, learning Portuguese" }],
    },
    footer: "© Tessel. All rights reserved.",
  },
};
