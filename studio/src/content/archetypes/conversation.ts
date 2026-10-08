import type { ArchetypeContent } from "../schema";

/** Conversation: a chat with an AI agent that also holds team threads. */
export const CONVERSATION_CONTENT: ArchetypeContent = {
  product: { name: "Plover", tagline: "Ask an agent, or pull your team into the thread." },
  app: {
    nav: [{ label: "Chats", badge: 3 }, { label: "Agents" }, { label: "Projects" }, { label: "Files" }, { label: "Search" }, { label: "Settings" }],
    topnav: ["Chats", "Agents", "Projects", "Files", "Settings"],
    page: { title: "Chats", action: "New chat" },
    stats: [
      { label: "Messages today", value: "128", series: [64, 71, 68, 82, 77, 60, 38, 90, 95, 92, 104, 99, 112, 128] },
      { label: "Median reply", value: "3.8 s", series: [5.1, 4.9, 5, 4.7, 4.6, 4.8, 4.4, 4.5, 4.3, 4.2, 4.1, 4, 3.9, 3.8] },
      { label: "Tool calls", value: "312", series: [190, 204, 198, 221, 236, 210, 142, 248, 262, 255, 281, 290, 301, 312] },
      { label: "Open threads", value: "9", series: [14, 13, 15, 12, 13, 11, 12, 11, 10, 12, 11, 10, 10, 9] },
    ],
    panel: {
      title: "Waiting on you",
      items: [
        { title: "Plover wants to run a query", body: "It needs read access to the accounts table to split signups by plan.", actions: ["Allow once", "Deny"] },
        { title: "Priya asked for the Team numbers", body: "She tagged you in Signups by week and is waiting on the plan split.", actions: ["Reply", "Dismiss"] },
      ],
    },
    table: {
      columns: ["Agent", "Status", "Runs today", "Median reply", "Last active"],
      rows: [
        [{ text: "analyst", kind: "mono" }, { text: "Active", kind: "status", tone: "ok" }, { text: "42", kind: "num" }, { text: "3.1 s", kind: "num" }, { text: "1 min ago", kind: "muted" }],
        [{ text: "writer", kind: "mono" }, { text: "Active", kind: "status", tone: "ok" }, { text: "27", kind: "num" }, { text: "5.4 s", kind: "num" }, { text: "8 min ago", kind: "muted" }],
        [{ text: "researcher", kind: "mono" }, { text: "Idle", kind: "status", tone: "off" }, { text: "11", kind: "num" }, { text: "9.2 s", kind: "num" }, { text: "2 h ago", kind: "muted" }],
        [{ text: "triage", kind: "mono" }, { text: "Needs access", kind: "status", tone: "warn" }, { text: "6", kind: "num" }, { text: "2.7 s", kind: "num" }, { text: "3 h ago", kind: "muted" }],
        [{ text: "scheduler", kind: "mono" }, { text: "Failing", kind: "status", tone: "bad" }, { text: "0", kind: "num" }, { text: "—", kind: "muted" }, { text: "Yesterday", kind: "muted" }],
        [{ text: "translator", kind: "mono" }, { text: "Paused", kind: "status", tone: "off" }, { text: "0", kind: "num" }, { text: "—", kind: "muted" }, { text: "1 w ago", kind: "muted" }],
      ],
    },
    form: {
      title: "New agent",
      fields: [
        { label: "Name", kind: "text", placeholder: "researcher" },
        { label: "Speed", kind: "select", options: ["Fast", "Balanced", "Thorough"] },
        { label: "Ask before running tools", kind: "switch" },
        { label: "Share with the team", kind: "checkbox" },
      ],
      submit: "Create agent",
      cancel: "Cancel",
    },
    empty: { title: "No chats yet.", body: "Start a chat with an agent, or pull a teammate into a thread.", action: "New chat" },
    error: { title: "Plover couldn't reply", detail: "The query timed out after 30 s, so no results came back.", action: "Try again" },
    toast: "Thread shared with Priya.",
    dialog: { title: "Delete this chat?", body: "The messages and the files the agent made in this chat are removed for everyone in it.", confirm: "Delete", cancel: "Cancel" },
    prose: {
      title: "How agents use tools",
      paragraphs: [
        "Plover asks before it runs a tool that reads your data. You see the exact call, allow it once or always, and the result lands in the thread.",
        "Teammates in a thread see the same calls and results, so nobody has to ask what the agent did.",
      ],
    },
    code: {
      path: "signups_by_week.sql",
      lines: [
        "select date_trunc('week', created_at) as week,",
        "       count(*) as signups",
        "from accounts",
        "where created_at >= now() - interval '8 weeks'",
        "group by 1",
        "order by 1;",
      ],
    },
    composer: { placeholder: "Message Plover, or @ a teammate", send: "Send" },
    search: "Search chats",
    periods: ["Today", "7d", "30d"],
    items: [
      { title: "Signups by week", meta: "You and Plover · 9:45 AM", badge: "Agent", group: "Today" },
      { title: "Launch checklist", meta: "Priya, Marcus · 9:12 AM", badge: "Team", value: "3", group: "Today" },
      { title: "Rewrite the pricing FAQ", meta: "You and Plover · 8:30 AM", badge: "Agent", group: "Today" },
      { title: "Support queue review", meta: "Dana, Plover · 8:05 AM", badge: "Team", value: "1", group: "Today" },
      { title: "Churn by plan", meta: "You and Plover · 4:50 PM", badge: "Agent", group: "Yesterday" },
      { title: "Board deck feedback", meta: "Marcus, Priya · 3:20 PM", badge: "Team", group: "Yesterday" },
      { title: "Draft the Q4 hiring plan", meta: "You and Plover · 11:02 AM", badge: "Agent", group: "Yesterday" },
      { title: "Onboarding email copy", meta: "You and Plover · Tuesday", badge: "Agent", group: "This week" },
      { title: "Vendor contract summary", meta: "You and Plover · Monday", badge: "Agent", group: "This week" },
      { title: "Offsite planning", meta: "Marcus, Dana, Priya · Monday", badge: "Team", group: "This week" },
    ],
    thread: [
      { author: "You", text: "Pull signups by week for the last two months. I'm writing the Monday update.", mine: true, time: "9:41" },
      { author: "Plover", text: "Done. Weeks start on Monday and the counts come from the accounts table. This is the query I ran.", time: "9:41" },
      { author: "Plover", text: "Signups grew from 212 to 301 a week, up 42%. The biggest jump was the week the new pricing page shipped.", time: "9:42" },
      { author: "Priya", text: "Can you split those by plan? Finance wants the Team numbers.", time: "9:44" },
      { author: "You", text: "@Plover yes, and add cancellations for the same weeks.", mine: true, time: "9:44" },
      { author: "Plover", text: "Splitting by plan now. I'll post the table here in a minute.", time: "9:45" },
    ],
  },
  landing: {
    nav: ["Product", "Agents", "Pricing", "Changelog"],
    cta: "Start chatting",
    ctaSecondary: "See a thread",
    emailPlaceholder: "you@company.com",
    h1: "Chat with an agent. Bring your team into the thread.",
    sub: "Plover answers in the same thread your team is in, shows every tool it runs, and asks before it touches your data.",
    sections: [
      { eyebrow: "Agents", title: "An agent that shows its work.", body: "Every query and tool call appears in the thread with its result. Allow it once, always, or never." },
      { eyebrow: "Threads", title: "Your team joins the same conversation.", body: "Tag a teammate into any chat. They see the agent's calls and results, and can reply to either." },
      { eyebrow: "Projects", title: "Keep a project's chats and files together.", body: "Pin the files an agent should read. Every chat in the project starts with them in context." },
    ],
    proof: {
      logos: ["Alder & Finch", "Brightwater", "Calloway", "Dunmore", "Eastgate", "Fernhill"],
      numbers: [
        { value: "3.8 s", label: "median agent reply" },
        { value: "1.8M", label: "messages a week" },
        { value: "92%", label: "of tool calls approved first time" },
      ],
      quotes: [{ text: "I stopped forwarding query results. The agent runs it in the thread and everyone sees the same numbers.", who: "Dana Ortiz, head of growth at Alder & Finch" }],
    },
    footer: "© Plover. All rights reserved.",
  },
};
