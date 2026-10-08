import type { Archetype, Choices, Option, ResolvedChoices, Step, StepId } from "./types";

export const STEPS: readonly Step[] = [
  {
    id: "archetype",
    branch: "product",
    gallery: "app",
    question: "What shape is the product?",
    why: "Decides the home surface and sample content every later step renders on, and which references fit.",
    options: [
      { id: "workspace", label: "Workspace", note: "Records and operations: lists, tables, figures. Linear, Stripe." },
      { id: "feed", label: "Feed", note: "Posts from people or sources, newest first, with replies. Reddit, Bluesky." },
      { id: "commerce", label: "Store or marketplace", note: "Listings to browse, compare and buy. Airbnb, Gumroad." },
      { id: "reader", label: "Course or reader", note: "Lessons or articles, and progress through them. Duolingo, a newspaper." },
      { id: "media", label: "Media library", note: "Albums, shows or videos to play. Spotify." },
      { id: "companion", label: "Game companion", note: "A player's profile, quests, inventory and rankings." },
      { id: "canvas", label: "Editor or canvas", note: "One document or board the user makes. Figma, Notion." },
      { id: "conversation", label: "Conversation", note: "A thread with people or an agent. ChatGPT, Discord." },
      { id: "utility", label: "Utility", note: "One focused tool, used in seconds. Raycast, a converter." },
    ],
  },
  {
    id: "reference",
    branch: "product",
    gallery: "app",
    question: "Which product or genre is the reference?",
    why: "Every later step defaults to what this reference does. References that fit the archetype come first.",
    options: [
      { id: "linear", label: "Linear", note: "Dense, 13px chrome, cool gray, indigo, sidebar, hairlines." },
      { id: "vercel", label: "Vercel", note: "14px, pure neutral, black accent, top nav, soft shadows." },
      { id: "stripe", label: "Stripe", note: "14px, cool neutral, violet, sidebar, shadows, editorial landing." },
      { id: "notion", label: "Notion", note: "15px, warm neutral, black accent, borderless tables, generous." },
      { id: "raycast", label: "Raycast", note: "13px, dark-first, red accent, rounded, dark showcase landing." },
      { id: "ramp", label: "Ramp", note: "Exacting finance UI, acid green, compact density, operational proof." },
      { id: "apple", label: "Apple", note: "Giant centered type, product-led media, full-bleed chapters." },
      { id: "raindrop", label: "Raindrop", note: "Dark agent tooling, green signal, product trace, sticky storytelling." },
      { id: "mercury", label: "Mercury", note: "Warm editorial fintech, generous space, composed product imagery." },
      { id: "cashapp", label: "Cash App", note: "Black and bright green, giant type, rounded mobile-first play." },
      { id: "airbnb", label: "Airbnb", note: "Warm marketplace, photographic cards, soft depth, comfortable density." },
      { id: "figma", label: "Figma", note: "Creative canvas, art-led color, interactive product demonstrations." },
      { id: "cursor", label: "Cursor", note: "Warm dark developer tool, restrained chrome, code-forward product proof." },
      { id: "supabase", label: "Supabase", note: "Dark developer platform, green accent, grid structure, dashboard proof." },
      { id: "posthog", label: "PostHog", note: "Playful developer suite, warm canvas, orange signal, dense product cards." },
      { id: "attio", label: "Attio", note: "Editorial precision, monochrome CRM, compact data surfaces." },
      { id: "resend", label: "Resend", note: "Monochrome developer infrastructure, dark canvas, code and email proof." },
      { id: "agentchat", label: "Agent chat", note: "Centered thread, quiet neutral chrome, one rounded composer. Like ChatGPT." },
      { id: "community", label: "Community", note: "Posts and replies, rounded friendly type, one saturated accent. Like Reddit." },
      { id: "mediaapp", label: "Media app", note: "Dark, cover art leads, big rounded tiles, a now-playing bar. Like Spotify." },
      { id: "learning", label: "Learning app", note: "Bright and rounded, chunky tactile buttons, streaks and progress. Like Duolingo." },
      { id: "gamecompanion", label: "Game companion", note: "Dark HUD panels, amber signal, square corners, grotesk headings." },
      { id: "indieshop", label: "Indie shop", note: "Black outlines, hard offset shadows, pink accent, flat color. Like Gumroad." },
      { id: "utilitarian", label: "Utilitarian", note: "System type, no radius, black on white, links that look like links. Like Craigslist." },
      { id: "newspaper", label: "Newspaper", note: "Serif headlines and text, a paper canvas, column rules, no radius." },
    ],
  },
  {
    id: "look",
    branch: "product",
    gallery: "app",
    question: "What visual language does the app speak?",
    why: "The app's own register, chosen on purpose. A look other than the reference's re-defaults type, shape, depth and texture to match.",
    options: [
      { id: "quiet", label: "Quiet tool", note: "Neutral chrome, one accent, hairlines, medium-weight sans headings. Linear, Stripe." },
      { id: "editorial", label: "Editorial", note: "Serif headings over a sans, warm paper tones, generous space, crisp corners. Magazines and long reads." },
      { id: "playful", label: "Playful", note: "Rounded heavy type, pressed-in buttons, soft corners, springy motion. Duolingo, PostHog." },
      { id: "brutalist", label: "Brutalist", note: "Grotesk type, square corners, high contrast, hard offset shadows. Gumroad." },
      { id: "print", label: "Print", note: "Serif throughout, a grained paper canvas, column rules, no radius. A newspaper." },
      { id: "immersive", label: "Immersive", note: "Dark and media-led, an accent glow, big rounded tiles, heavy headings. Spotify, a game client." },
    ],
  },
  {
    id: "shell",
    branch: "frame",
    gallery: "app",
    question: "App shell?",
    why: "The one layout decision every screen inherits.",
    options: [
      { id: "sidebar", label: "Sidebar", note: "Grouped left nav, content fills. Linear, Stripe." },
      { id: "topnav", label: "Top nav", note: "Horizontal tabs, centered content. Vercel." },
      { id: "both", label: "Sidebar + top bar", note: "Nav left, context and search on top." },
    ],
  },
  {
    id: "sidebarCollapse",
    branch: "frame",
    gallery: "app",
    question: "Does the sidebar collapse?",
    why: "Decides how much screen the content can take and whether nav needs icons.",
    options: [
      { id: "fixed", label: "Fixed", note: "Always expanded. Stripe." },
      { id: "hide", label: "Hide", note: "A toggle hides it fully; nothing on hover. Linear." },
      { id: "peek", label: "Hide, peek on hover", note: "Hidden; hovering the left edge slides it over the content. Notion." },
      { id: "rail", label: "Icon rail", note: "Collapses to a 48px rail; icons are the nav, labels as tooltips. VS Code, Slack." },
      { id: "railExpand", label: "Icon rail, expands on hover", note: "The rail widens over the content when hovered. Supabase." },
    ],
  },
  {
    id: "sidebarTone",
    branch: "frame",
    gallery: "app",
    question: "Sidebar tone?",
    why: "Linear made theirs a few notches dimmer so content wins.",
    options: [
      { id: "same", label: "Same as canvas", note: "Separated by a hairline only." },
      { id: "tinted", label: "Subtle step", note: "The scale's step 2 in both themes: darker in light, lighter in dark. Notion." },
      { id: "dimmer", label: "Dimmer", note: "Darker in both themes; dark-mode content reads as a raised panel. Linear." },
      { id: "dark", label: "Dark", note: "Dark rail in light mode. Slack-like." },
    ],
  },
  {
    id: "navIcons",
    branch: "frame",
    gallery: "app",
    question: "Icons in the nav?",
    why: "Icons speed scanning and add visual weight; text-only reads calmer.",
    options: [
      { id: "icons", label: "Icons", note: "Icon before every item. Linear, Stripe, Notion." },
      { id: "text", label: "Text only", note: "Labels only. Vercel." },
    ],
  },
  {
    id: "pageTitle",
    branch: "frame",
    gallery: "app",
    question: "Page title scale?",
    why: "Decides whether a page reads as a tool view or a document.",
    options: [
      { id: "toolbar", label: "Toolbar", note: "Title in a 40px bar, 14px medium, actions inline. Linear." },
      { id: "standard", label: "Standard", note: "22px title over the content, actions right. Vercel, Stripe." },
      { id: "display", label: "Display", note: "36px title, document-like, generous. Notion." },
    ],
  },
  {
    id: "density",
    branch: "frame",
    gallery: "app",
    question: "App density?",
    why: "Chrome size, control height and row height move together.",
    options: [
      { id: "compact", label: "Compact", note: "13px chrome, 14px body, 28px controls. Linear." },
      { id: "standard", label: "Standard", note: "14px chrome, 15px body, 32px controls. Vercel, Stripe." },
      { id: "comfortable", label: "Comfortable", note: "15px chrome, 16px body, 36px controls. Notion." },
    ],
  },
  {
    id: "spacing",
    branch: "frame",
    gallery: "app",
    question: "Spacing unit?",
    why: "Padding and gaps everywhere scale from one unit. Notion is airy; Linear is tight.",
    options: [
      { id: "tight", label: "Tight", note: "3.5px unit. Dense operator tools. Linear." },
      { id: "regular", label: "Regular", note: "4px unit. The field default." },
      { id: "airy", label: "Airy", note: "5px unit. Generous, document-like. Notion." },
    ],
  },
  {
    id: "feedLayout",
    branch: "surfaces",
    gallery: "app",
    pattern: "feed",
    question: "How does a feed lay out its entries?",
    why: "A feed is read top to bottom many times a day; the entry's shape decides how much each one says before a tap.",
    options: [
      { id: "timeline", label: "Timeline", note: "One column of whole entries: author, text, media and actions. Bluesky, Threads." },
      { id: "cards", label: "Cards", note: "Entries as cards in two columns, media first. Pinterest, Dribbble." },
      { id: "compact", label: "Compact list", note: "One line per entry with its counts; the title is the link. Hacker News." },
      { id: "digest", label: "Digest", note: "Entries grouped under topic headings, a line of summary each. A newsletter or a morning briefing." },
    ],
  },
  {
    id: "boardLayout",
    branch: "surfaces",
    gallery: "app",
    pattern: "board",
    question: "How does a board show work moving through stages?",
    why: "Decides whether people see the flow of work, who owns what, or only what's next.",
    options: [
      { id: "columns", label: "Columns", note: "A column per stage, cards stacked in each. Trello, Linear's board." },
      { id: "swimlanes", label: "Swimlanes", note: "Columns per stage, a row per owner or area. Jira." },
      { id: "grouped", label: "Grouped list", note: "One list under a heading per stage; holds on a phone. Linear's list view." },
      { id: "pipeline", label: "Pipeline", note: "Stage counts in a strip, with one stage's cards open below. Sales pipelines." },
    ],
  },
  {
    id: "conversationLayout",
    branch: "surfaces",
    gallery: "app",
    pattern: "conversation",
    question: "How does a conversation lay out its messages?",
    why: "Says who the conversation is with: a friend, a team, or an agent that writes documents.",
    options: [
      { id: "bubbles", label: "Bubbles", note: "Yours on the right, theirs on the left, in rounded bubbles. iMessage, WhatsApp." },
      { id: "transcript", label: "Transcript", note: "Turns run full width without bubbles, so long answers read as documents. ChatGPT, Claude." },
      { id: "channel", label: "Channel", note: "Dense rows with name and time; consecutive messages group under one name. Slack, Discord." },
      { id: "context", label: "With context", note: "The thread beside a panel about what it discusses: the order, the file, the customer. Support inboxes." },
    ],
  },
  {
    id: "readerLayout",
    branch: "surfaces",
    gallery: "app",
    pattern: "reader",
    question: "How does the reading view hold a long text?",
    why: "Long reads need a steady measure; the space beside the text is for finding your place, or for notes.",
    options: [
      { id: "column", label: "Single column", note: "One centered measure and nothing beside it. Medium, Substack." },
      { id: "outline", label: "With outline", note: "A sticky outline beside the text marks where you are. Documentation sites." },
      { id: "margin", label: "Margin notes", note: "Notes and glossary sit in the margin beside the line they explain. Tufte-style books." },
      { id: "paged", label: "Paged", note: "One page at a time, with page turns and a progress line. Kindle, Apple Books." },
    ],
  },
  {
    id: "commerceLayout",
    branch: "surfaces",
    gallery: "app",
    pattern: "storefront",
    question: "How are things to buy laid out?",
    why: "Browsing by picture, comparing by detail and buying the one you came for need different layouts.",
    options: [
      { id: "grid", label: "Grid", note: "Picture-led tiles with the price under each. Airbnb, Etsy." },
      { id: "list", label: "List", note: "Rows with a thumbnail, details and price, for comparing. Search results on Amazon." },
      { id: "shelves", label: "Shelves", note: "One featured item, then a shelf per category. App Store, Steam." },
      { id: "split", label: "List and detail", note: "The selected item's detail stays beside the list for inspection; purchase follows the product's checkout flow." },
    ],
  },
  {
    id: "typeface",
    branch: "tokens",
    gallery: "app",
    question: "Which typeface?",
    why: "Carries 70–95% of rendered characters. Everything else is tuned to it.",
    options: [
      { id: "inter", label: "Inter", note: "The default of the field. Neutral, huge x-height, great at 13px." },
      { id: "geist", label: "Geist", note: "Vercel's. Slightly narrower and warmer than Inter." },
      { id: "plex", label: "IBM Plex Sans", note: "More character, wider. Reads editorial." },
      { id: "instrument", label: "Instrument Sans", note: "Geometric, friendly. Consumer feel." },
      { id: "system", label: "System", note: "SF on Mac, Segoe on Windows. Zero bytes, native feel." },
      { id: "serif", label: "Newsreader", note: "A text serif with optical sizes. Print and editorial products." },
      { id: "rounded", label: "Nunito", note: "Rounded terminals. Friendly, playful, learning products." },
      { id: "grotesk", label: "Space Grotesk", note: "A quirky grotesk. Brutalist, game and media products." },
    ],
  },
  {
    id: "mono",
    branch: "tokens",
    gallery: "app",
    question: "Which mono, for identifiers and code?",
    why: "Appears in paths, ids, timestamps, code blocks. Must pair with the sans.",
    options: [
      { id: "geist-mono", label: "Geist Mono", note: "Pairs with Inter and Geist." },
      { id: "jetbrains", label: "JetBrains Mono", note: "Taller, more distinct glyphs. Reads as code." },
      { id: "plex-mono", label: "IBM Plex Mono", note: "Pairs with Plex Sans; slab-ish." },
      { id: "system-mono", label: "System mono", note: "SF Mono / Consolas. Zero bytes." },
    ],
  },
  {
    id: "neutral",
    branch: "tokens",
    gallery: "app",
    question: "Neutral temperature?",
    why: "The gray scale is 90% of every screen. Temperature sets the whole mood.",
    options: [
      { id: "cool", label: "Cool", note: "Blue-tinted gray. Linear, Stripe. Reads technical." },
      { id: "neutral", label: "Neutral", note: "True gray. Vercel. Reads exact." },
      { id: "warm", label: "Warm", note: "Sand/stone. Notion. Reads calm, paper-like." },
      { id: "tinted", label: "Tinted", note: "Mauve, carries a hint of the accent. Reads designed." },
    ],
  },
  {
    id: "contrast",
    branch: "tokens",
    gallery: "app",
    question: "Contrast level?",
    why: "Linear generates its theme from base, accent and contrast. This is the third knob.",
    options: [
      { id: "soft", label: "Soft", note: "Tinted canvas, faint borders. Quieter, lower AA margin." },
      { id: "standard", label: "Standard", note: "White canvas, step-6 borders. The field default." },
      { id: "high", label: "High", note: "Pure white/black, strong borders. Accessibility variant." },
    ],
  },
  {
    id: "accent",
    branch: "tokens",
    gallery: "app",
    question: "One accent?",
    why: "Buttons, links, focus, selection. One hue; status colors are separate.",
    options: [
      { id: "indigo", label: "Indigo", note: "Linear." },
      { id: "blue", label: "Blue", note: "Safe, expected." },
      { id: "violet", label: "Violet", note: "Stripe." },
      { id: "teal", label: "Teal", note: "Distinct from status green." },
      { id: "green", label: "Green", note: "Reads 'go'; collides with success." },
      { id: "orange", label: "Orange", note: "Warm, energetic." },
      { id: "crimson", label: "Crimson", note: "Raycast." },
      { id: "pink", label: "Pink", note: "Loud and indie. Gumroad." },
      { id: "amber", label: "Amber", note: "A gold signal, strongest on dark. Games." },
      { id: "neutral", label: "Neutral", note: "Black/white primary. Vercel, Notion." },
    ],
  },
  {
    id: "radius",
    branch: "tokens",
    gallery: "app",
    question: "Corner radius?",
    why: "One value drives controls, cards and menus. Sets tone more than hue does.",
    options: [
      { id: "none", label: "0px", note: "Square corners. Print and brutalist." },
      { id: "sharp", label: "4px", note: "Crisp, tool-like." },
      { id: "medium", label: "6px", note: "Linear, Vercel." },
      { id: "round", label: "8px", note: "Stripe, Raycast." },
      { id: "soft", label: "10px", note: "Consumer, friendly." },
      { id: "pill", label: "16px", note: "Consumer and mobile surfaces with visibly rounded controls." },
    ],
  },
  {
    id: "depth",
    branch: "tokens",
    gallery: "app",
    question: "Depth by border or shadow?",
    why: "Decides how panels, menus and cards separate from the canvas.",
    options: [
      { id: "hairline", label: "Hairlines", note: "1px borders, no shadows except menus. Linear." },
      { id: "soft", label: "Hairlines + soft shadow", note: "Borders plus a 1–2px shadow on cards. Vercel." },
      { id: "shadow", label: "Shadows", note: "Layered shadows, faint borders. Stripe." },
      { id: "offset", label: "Offset shadows", note: "A hard shadow offset down and right, in the text color, under strong borders. Brutalist." },
    ],
  },
  {
    id: "themes",
    branch: "tokens",
    gallery: "app",
    question: "Which themes ship?",
    why: "Dark mode is a full second palette and doubles the review surface.",
    options: [
      { id: "both", label: "Light and dark", note: "Both first-class; system default." },
      { id: "light", label: "Light only", note: "" },
      { id: "dark", label: "Dark only", note: "Raycast." },
    ],
  },
  {
    id: "stats",
    branch: "components",
    gallery: "app",
    question: "Key figures?",
    why: "The most-read numbers on the home screen.",
    options: [
      { id: "strip", label: "Strip", note: "Hairline-separated columns, no containers. Linear." },
      { id: "cards", label: "Cards", note: "Each figure in its own card. Stripe, Vercel." },
      { id: "inline", label: "Inline", note: "One line of label–value pairs under the title. Notion." },
    ],
  },
  {
    id: "trend",
    branch: "components",
    gallery: "app",
    question: "Figures over time?",
    why: "Whether Home shows where a number is going, not just where it is.",
    options: [
      { id: "none", label: "None", note: "The figure only. Linear, Notion." },
      { id: "sparkline", label: "Sparkline", note: "A small line beside each value." },
      { id: "area", label: "Area", note: "A filled area under each figure. Vercel." },
      { id: "chart", label: "One chart", note: "The first figure as a 180px chart, the rest in a row beside it. Stripe." },
      { id: "panel", label: "Chart panel", note: "Figures on top, then a 220px chart with period tabs, axis and a crosshair callout. Analytics-style." },
      { id: "stacked", label: "Stacked by entity", note: "The chart panel, with the first figure split into its entities as a stacked area and a legend; the top edge is the total." },
    ],
  },
  {
    id: "tables",
    branch: "components",
    gallery: "app",
    question: "Table style?",
    why: "Most operator screens are tables.",
    options: [
      { id: "hairline", label: "Hairline rows", note: "1px rules, no fills. Linear, GitHub." },
      { id: "zebra", label: "Zebra", note: "Alternating tint, no rules." },
      { id: "borderless", label: "Borderless", note: "Space only, hover fill. Notion." },
    ],
  },
  {
    id: "rowHover",
    branch: "components",
    gallery: "app",
    question: "Row hover?",
    why: "Fill says rows are targets; none says the table is for reading.",
    options: [
      { id: "fill", label: "Fill", note: "Rows tint on hover and the cursor is a pointer. Linear, Notion." },
      { id: "none", label: "None", note: "No hover state on rows. Vercel." },
    ],
  },
  {
    id: "cards",
    branch: "components",
    gallery: "app",
    question: "Card style?",
    why: "Panels, forms and cards share one treatment.",
    options: [
      { id: "hairline", label: "Bordered", note: "1px border; carries whatever shadow the depth step chose. Linear, Vercel, Stripe." },
      { id: "fill", label: "Filled", note: "Translucent fill, no border. Notion, Raycast." },
    ],
  },
  {
    id: "inputs",
    branch: "components",
    gallery: "app",
    question: "Input style?",
    why: "Every form and the composer.",
    options: [
      { id: "outlined", label: "Outlined", note: "1px border, canvas background. Linear, Vercel." },
      { id: "filled", label: "Filled", note: "Muted background, no border. Notion, Raycast." },
      { id: "underline", label: "Underline", note: "Bottom rule only. Editorial." },
    ],
  },
  {
    id: "buttons",
    branch: "components",
    gallery: "app",
    question: "Button style?",
    why: "Primary is the most-clicked pixel in the product.",
    options: [
      { id: "filled", label: "Filled + ghost", note: "Solid accent primary, ghost secondary. Linear." },
      { id: "outline", label: "Outline-first", note: "Hairline buttons, filled only for the one CTA. Vercel." },
      { id: "soft", label: "Soft", note: "Tinted accent background, accent text. Notion, Raycast." },
    ],
  },
  {
    id: "iconWeight",
    branch: "components",
    gallery: "app",
    question: "Icon weight?",
    why: "Stroke width sets how loud icons are next to 13–15px text.",
    options: [
      { id: "light", label: "Light", note: "1.5px stroke. Linear, Notion." },
      { id: "regular", label: "Regular", note: "2px stroke. Vercel, Stripe." },
      { id: "tiles", label: "Tiles", note: "Icons in small filled rounded tiles. Raycast." },
    ],
  },
  {
    id: "menus",
    branch: "components",
    gallery: "app",
    question: "Menu items?",
    why: "Menus and command lists are where keyboard users live.",
    options: [
      { id: "hints", label: "Icons + shortcuts", note: "Icon left, shortcut right. Linear, Raycast." },
      { id: "plain", label: "Plain", note: "Text only. Vercel, Stripe." },
    ],
  },
  {
    id: "motion",
    branch: "interaction",
    gallery: "app",
    pattern: "motion-language",
    question: "What motion language does the app speak?",
    why: "Timing and easing for every move, set once. Keyboard and many-times-a-day paths stay instant in every language.",
    options: [
      { id: "still", label: "Still", note: "Nothing moves; every state change is a cut. Raycast, utilitarian tools." },
      { id: "snappy", label: "Snappy", note: "Short fades with almost no travel, 80–150 ms, fast-out curves. Linear." },
      { id: "anchored", label: "Anchored", note: "Layers grow from the control that opened them, 100–200 ms, no overshoot. macOS menus." },
      { id: "tactile", label: "Tactile", note: "Springs with a little give: controls squash and settle, layers rise. Consumer and playful apps." },
      { id: "material", label: "Material", note: "Emphasized easing, 150–300 ms, shared-axis moves between related views. Material 3." },
    ],
  },
  {
    id: "layerArrival",
    branch: "interaction",
    gallery: "app",
    pattern: "layer-arrival",
    question: "How do menus, popovers and dialogs arrive?",
    why: "Layers open many times a session; their arrival says where they came from without slowing the next action.",
    options: [
      { id: "cut", label: "Cut", note: "Appear and vanish in place. Keyboard-first tools." },
      { id: "fade", label: "Fade", note: "Opacity only, in place." },
      { id: "anchored", label: "Grow from the trigger", note: "Scales up from the edge of the control that opened it, with a fade." },
      { id: "rise", label: "Rise", note: "Slides up a few pixels while fading in; dialogs rise from below." },
      { id: "reveal", label: "Reveal", note: "The layer's edge unrolls away from the trigger while its content stays still. Material." },
    ],
  },
  {
    id: "controlResponse",
    branch: "interaction",
    gallery: "app",
    pattern: "control-response",
    question: "How does a control answer a press?",
    why: "The press confirms the hit before anything else happens; every button in the product carries it.",
    options: [
      { id: "tone", label: "Tone", note: "The fill darkens while held; nothing moves." },
      { id: "press", label: "Press in", note: "The face shrinks to 97% while held and returns on release." },
      { id: "sink", label: "Sink", note: "The face drops onto its edge or shadow, like a key. Gumroad, Duolingo." },
      { id: "ink", label: "Ink", note: "A wash spreads from the middle of the control while held. Material." },
    ],
  },
  {
    id: "contentSwap",
    branch: "interaction",
    gallery: "app",
    pattern: "content-swap",
    question: "How does content change in place: tabs, filters, pages of results?",
    why: "The swap tells people whether they moved sideways, narrowed what they see, or stayed put.",
    options: [
      { id: "cut", label: "Cut", note: "The new content replaces the old at once." },
      { id: "crossfade", label: "Crossfade", note: "Old and new fade across each other in the same place." },
      { id: "slide", label: "Slide by direction", note: "Content slides the way the tab moved: from the right for the next, from the left for the previous." },
      { id: "resize", label: "Resize and settle", note: "The container grows or shrinks to fit, then the new content fades in." },
    ],
  },
  {
    id: "asyncFeedback",
    branch: "interaction",
    gallery: "app",
    pattern: "async-progress",
    question: "How does work in progress report itself?",
    why: "Waiting is bearable when people can see what is happening and roughly how long is left.",
    options: [
      { id: "spinner", label: "Inline spinner", note: "A spinner and a status line in the control or row that started the work. Carbon's inline loading." },
      { id: "skeleton", label: "Skeleton", note: "Gray shapes of the result hold its place until it arrives." },
      { id: "progress", label: "Progress bar", note: "A bar with the percent and the time left, for work that can measure itself. Uploads, exports." },
      { id: "steps", label: "Step list", note: "Named steps tick off as they finish; a failure stops at its step. Deploy logs, agents." },
    ],
  },
  {
    id: "routeMotion",
    branch: "interaction",
    gallery: "app",
    pattern: "route-transition",
    question: "How does the app move between pages?",
    why: "A page change either cuts, or shows how the new page relates to the one before.",
    options: [
      { id: "cut", label: "Cut", note: "The new page replaces the old; the shell stays put." },
      { id: "fade", label: "Fade", note: "The content area crossfades under a still shell." },
      { id: "axis", label: "Shared axis", note: "Forward slides in from the right and back from the left. Material, iOS navigation." },
      { id: "continuity", label: "Continuity", note: "The item you opened grows into the page it opens." },
    ],
  },
  {
    id: "themeMotion",
    branch: "interaction",
    gallery: "app",
    pattern: "theme-transition",
    question: "How does a change of theme arrive?",
    why: "A small moment people repeat: a cut, or a signature.",
    options: [
      { id: "cut", label: "Cut", note: "The palette swaps in one frame." },
      { id: "fade", label: "Crossfade", note: "The page fades from one palette to the other." },
      { id: "circle", label: "Circular reveal", note: "The new theme spreads in a circle from the toggle." },
      { id: "wipe", label: "Wipe", note: "The new theme sweeps across the page from one edge." },
    ],
  },
  {
    id: "register",
    branch: "landing",
    gallery: "landing",
    question: "Landing register?",
    why: "The landing may carry a different visual language from the app.",
    options: [
      { id: "same", label: "Same as app", note: "The app is the brand. Linear." },
      { id: "dark", label: "Dark showcase", note: "Dark landing, light app. Vercel, Raycast, raindrop." },
      { id: "editorial", label: "Editorial", note: "White, type-led, generous. Stripe." },
      { id: "playful", label: "Playful", note: "Art-led, characters, color. Consumer." },
    ],
  },
  {
    id: "display",
    branch: "landing",
    gallery: "landing",
    question: "Display type?",
    why: "Headlines at 48–72px need their own tracking and weight.",
    options: [
      { id: "same", label: "Same face, tight", note: "UI sans at 500, −2% tracking. Linear." },
      { id: "heavy", label: "Same face, heavy", note: "600–700, −3% tracking. Punchier." },
      { id: "mono", label: "Mono headlines", note: "The mono as display. Reads technical." },
      { id: "giant", label: "Giant display", note: "96–128px centered product statements. Apple, Cash App." },
    ],
  },
  {
    id: "displayCase",
    branch: "landing",
    gallery: "landing",
    question: "Headline case?",
    why: "Independent of weight; lowercase reads indie and craft-led.",
    options: [
      { id: "written", label: "As written", note: "Sentence case as in the copy deck." },
      { id: "lowercase", label: "Lowercase", note: "The whole headline set lowercase. raindrop." },
    ],
  },
  {
    id: "hero",
    branch: "landing",
    gallery: "landing",
    question: "Hero composition?",
    why: "The one screen most visitors see.",
    options: [
      { id: "shot", label: "Headline + product shot", note: "Copy above, the app below. Linear." },
      { id: "split", label: "Split", note: "Copy left, visual right." },
      { id: "device", label: "Device frame", note: "The app inside a laptop or phone." },
      { id: "scene", label: "Animated scene", note: "A bespoke animated piece is the visual." },
      { id: "type", label: "Typographic", note: "Headline only, oversized. No visual." },
      { id: "media", label: "Full-bleed media", note: "Giant copy followed by an edge-to-edge product or photographic stage. Apple, Airbnb." },
    ],
  },
  {
    id: "heroMotion",
    branch: "landing",
    gallery: "landing",
    question: "Hero motion?",
    why: "Motion is the difference between a screenshot and a product that feels alive.",
    options: [
      { id: "static", label: "Static", note: "No motion." },
      { id: "entrance", label: "Entrance", note: "Staggered fade-up once on load." },
      { id: "ambient", label: "Ambient", note: "Slow continuous drift: gradients, floating pieces." },
      { id: "scroll", label: "Scroll-driven", note: "The visual transforms as you scroll." },
      { id: "interactive", label: "Interactive", note: "Responds to the cursor; things walk around." },
      { id: "interactiveScroll", label: "Interactive + scroll", note: "Responds to the cursor, and collapses into the product as you scroll. raindrop." },
    ],
  },
  {
    id: "background",
    branch: "landing",
    gallery: "landing",
    question: "Background treatment?",
    why: "Sets depth behind the hero without competing with it.",
    options: [
      { id: "flat", label: "Flat", note: "Canvas only." },
      { id: "glow", label: "Glow", note: "Accent-tinted radial gradient." },
      { id: "grid", label: "Grid", note: "Faint line grid or dot matrix." },
      { id: "grain", label: "Grain", note: "Noise texture over a gradient." },
      { id: "scene", label: "Scene", note: "Illustrated or 3D backdrop." },
    ],
  },
  {
    id: "rhythm",
    branch: "landing",
    gallery: "landing",
    question: "Section rhythm?",
    why: "How the page reads below the fold.",
    options: [
      { id: "alternating", label: "Alternating", note: "Claim + visual, sides swap each section. Linear." },
      { id: "bento", label: "Bento", note: "Grid of cards, each a feature. Apple, Vercel." },
      { id: "fullbleed", label: "Full-bleed", note: "Each section a full-width showcase." },
      { id: "sticky", label: "Sticky scroll", note: "Visual pinned while claims scroll past." },
      { id: "chapters", label: "Scene chapters", note: "A sticky product stage changes as card-like claims advance. Raindrop, Apple." },
    ],
  },
  {
    id: "frames",
    branch: "landing",
    gallery: "landing",
    question: "Product shots in frames?",
    why: "A frame says 'this is software'; no frame says 'this is the thing itself'.",
    options: [
      { id: "none", label: "Bare", note: "Hairline and radius only. Linear." },
      { id: "browser", label: "Browser chrome", note: "Three dots and a URL bar." },
      { id: "laptop", label: "Laptop", note: "A MacBook outline." },
      { id: "phone", label: "Phone", note: "A phone outline; implies mobile." },
    ],
  },
  {
    id: "characters",
    branch: "landing",
    gallery: "landing",
    question: "Floating pieces or characters?",
    why: "Personality. The pieces must come from the product, never from a stock set.",
    options: [
      { id: "none", label: "None", note: "The product is the only visual." },
      { id: "icons", label: "Floating icons", note: "Product objects drift around the hero." },
      { id: "characters", label: "Characters", note: "Animated figures doing tasks. raindrop." },
      { id: "shapes", label: "Abstract", note: "Geometric shapes and lines." },
    ],
  },
  {
    id: "proof",
    branch: "landing",
    gallery: "landing",
    question: "Proof section?",
    why: "What convinces after the hero.",
    options: [
      { id: "logos", label: "Logos", note: "'Trusted by' row. Linear." },
      { id: "numbers", label: "Numbers", note: "Three big figures." },
      { id: "quotes", label: "Quotes", note: "One or three testimonials." },
      { id: "none", label: "None", note: "" },
    ],
  },
  {
    id: "cta",
    branch: "landing",
    gallery: "landing",
    question: "Call to action?",
    why: "One decision the visitor makes.",
    options: [
      { id: "single", label: "Single", note: "One primary button." },
      { id: "pair", label: "Primary + secondary", note: "Get started, plus a look-first option." },
      { id: "email", label: "Email capture", note: "Waitlist or sign-up field." },
    ],
  },
];

export const STEP_BY_ID: Record<StepId, Step> = Object.fromEntries(STEPS.map((s) => [s.id, s])) as Record<StepId, Step>;

/** Public source record; exported decisions also retain the repository-relative contract path. */
export function patternUrl(pattern: string): string {
  return `https://github.com/twaldin/frontend-studio/blob/main/references/patterns/${pattern}.md`;
}

/** Steps whose defaults come from the archetype or the motion language, unless a preset or look names them. */
type DerivedStep = SurfaceStep | InteractionAxis | "asyncFeedback";
export type SurfaceStep = "feedLayout" | "boardLayout" | "conversationLayout" | "readerLayout" | "commerceLayout";
export type InteractionAxis = "layerArrival" | "controlResponse" | "contentSwap" | "routeMotion" | "themeMotion";
export type PresetChoices = Omit<ResolvedChoices, DerivedStep> & Partial<Pick<ResolvedChoices, DerivedStep>>;

/**
 * What each reference does at every step, including the archetype it fits and its own look.
 * Surface layouts, async feedback and the interaction axes come from the archetype and the
 * motion language (below) unless a preset names its own.
 */
export const PRESETS: Record<string, PresetChoices> = {
  linear: {
    archetype: "workspace", reference: "linear", look: "quiet",
    typeface: "inter", mono: "geist-mono", neutral: "cool", contrast: "standard", accent: "indigo",
    radius: "medium", depth: "hairline", themes: "both",
    density: "compact", spacing: "tight", shell: "sidebar", sidebarTone: "dimmer", sidebarCollapse: "hide", navIcons: "icons", pageTitle: "toolbar",
    stats: "strip", trend: "none", tables: "hairline", rowHover: "fill", cards: "hairline", inputs: "outlined", buttons: "filled",
    iconWeight: "light", menus: "hints", motion: "snappy",
    register: "same", display: "same", displayCase: "written", hero: "shot", heroMotion: "entrance", background: "flat", rhythm: "alternating",
    frames: "none", characters: "none", proof: "logos", cta: "pair",
  },
  vercel: {
    archetype: "workspace", reference: "vercel", look: "quiet",
    typeface: "geist", mono: "geist-mono", neutral: "neutral", contrast: "standard", accent: "neutral",
    radius: "medium", depth: "soft", themes: "both",
    density: "standard", spacing: "regular", shell: "topnav", sidebarTone: "same", sidebarCollapse: "fixed", navIcons: "text", pageTitle: "standard",
    stats: "cards", trend: "area", tables: "hairline", rowHover: "none", cards: "hairline", inputs: "outlined", buttons: "outline",
    iconWeight: "regular", menus: "plain", motion: "snappy",
    register: "dark", display: "heavy", displayCase: "written", hero: "shot", heroMotion: "entrance", background: "grid", rhythm: "bento",
    frames: "none", characters: "none", proof: "logos", cta: "pair",
  },
  stripe: {
    archetype: "workspace", reference: "stripe", look: "quiet",
    typeface: "inter", mono: "jetbrains", neutral: "cool", contrast: "standard", accent: "violet",
    radius: "round", depth: "shadow", themes: "light",
    density: "standard", spacing: "regular", shell: "sidebar", sidebarTone: "same", sidebarCollapse: "fixed", navIcons: "icons", pageTitle: "standard",
    stats: "cards", trend: "chart", tables: "hairline", rowHover: "fill", cards: "hairline", inputs: "outlined", buttons: "filled",
    iconWeight: "regular", menus: "plain", motion: "anchored",
    register: "editorial", display: "heavy", displayCase: "written", hero: "split", heroMotion: "ambient", background: "glow", rhythm: "alternating",
    frames: "browser", characters: "icons", proof: "logos", cta: "pair",
  },
  notion: {
    archetype: "canvas", reference: "notion", look: "quiet",
    typeface: "inter", mono: "system-mono", neutral: "warm", contrast: "soft", accent: "blue",
    radius: "sharp", depth: "hairline", themes: "both",
    density: "comfortable", spacing: "airy", shell: "sidebar", sidebarTone: "tinted", sidebarCollapse: "peek", navIcons: "icons", pageTitle: "display",
    stats: "inline", trend: "none", tables: "borderless", rowHover: "fill", cards: "fill", inputs: "filled", buttons: "filled",
    iconWeight: "light", menus: "plain", motion: "anchored",
    register: "editorial", display: "heavy", displayCase: "written", hero: "split", heroMotion: "static", background: "flat", rhythm: "alternating",
    frames: "none", characters: "characters", proof: "logos", cta: "single",
  },
  raycast: {
    archetype: "utility", reference: "raycast", look: "quiet",
    typeface: "inter", mono: "jetbrains", neutral: "neutral", contrast: "standard", accent: "crimson",
    radius: "round", depth: "soft", themes: "dark",
    density: "compact", spacing: "regular", shell: "sidebar", sidebarTone: "tinted", sidebarCollapse: "rail", navIcons: "icons", pageTitle: "toolbar",
    stats: "strip", trend: "none", tables: "hairline", rowHover: "fill", cards: "fill", inputs: "filled", buttons: "soft",
    iconWeight: "tiles", menus: "hints", motion: "still",
    register: "dark", display: "heavy", displayCase: "written", hero: "device", heroMotion: "scroll", background: "glow", rhythm: "fullbleed",
    frames: "laptop", characters: "none", proof: "numbers", cta: "single",
  },
  ramp: {
    archetype: "workspace", reference: "ramp", look: "quiet",
    typeface: "inter", mono: "geist-mono", neutral: "neutral", contrast: "high", accent: "green",
    radius: "sharp", depth: "hairline", themes: "light",
    density: "compact", spacing: "regular", shell: "topnav", sidebarTone: "same", sidebarCollapse: "fixed", navIcons: "text", pageTitle: "toolbar",
    stats: "strip", trend: "area", tables: "borderless", rowHover: "fill", cards: "fill", inputs: "filled", buttons: "filled",
    iconWeight: "regular", menus: "plain", motion: "snappy",
    register: "editorial", display: "heavy", displayCase: "written", hero: "media", heroMotion: "entrance", background: "grid", rhythm: "bento",
    frames: "none", characters: "none", proof: "numbers", cta: "email",
  },
  apple: {
    archetype: "commerce", reference: "apple", look: "quiet",
    typeface: "system", mono: "system-mono", neutral: "neutral", contrast: "high", accent: "blue",
    radius: "pill", depth: "soft", themes: "light",
    density: "comfortable", spacing: "airy", shell: "topnav", sidebarTone: "same", sidebarCollapse: "fixed", navIcons: "text", pageTitle: "display",
    stats: "cards", trend: "none", tables: "borderless", rowHover: "none", cards: "fill", inputs: "filled", buttons: "filled",
    iconWeight: "regular", menus: "plain", motion: "material",
    register: "editorial", display: "giant", displayCase: "written", hero: "media", heroMotion: "ambient", background: "flat", rhythm: "chapters",
    frames: "none", characters: "none", proof: "none", cta: "pair",
  },
  raindrop: {
    archetype: "workspace", reference: "raindrop", look: "quiet",
    typeface: "inter", mono: "geist-mono", neutral: "neutral", contrast: "standard", accent: "green",
    radius: "medium", depth: "hairline", themes: "dark",
    density: "compact", spacing: "tight", shell: "sidebar", sidebarTone: "dimmer", sidebarCollapse: "rail", navIcons: "icons", pageTitle: "toolbar",
    stats: "strip", trend: "chart", tables: "hairline", rowHover: "fill", cards: "fill", inputs: "filled", buttons: "soft",
    iconWeight: "light", menus: "hints", motion: "snappy",
    register: "dark", display: "heavy", displayCase: "lowercase", hero: "shot", heroMotion: "interactiveScroll", background: "flat", rhythm: "chapters",
    frames: "none", characters: "characters", proof: "numbers", cta: "pair",
  },
  mercury: {
    archetype: "workspace", reference: "mercury", look: "quiet",
    typeface: "instrument", mono: "system-mono", neutral: "warm", contrast: "soft", accent: "orange",
    radius: "round", depth: "shadow", themes: "light",
    density: "comfortable", spacing: "airy", shell: "topnav", sidebarTone: "same", sidebarCollapse: "fixed", navIcons: "text", pageTitle: "display",
    stats: "inline", trend: "area", tables: "borderless", rowHover: "fill", cards: "fill", inputs: "filled", buttons: "filled",
    iconWeight: "light", menus: "plain", motion: "anchored",
    register: "editorial", display: "giant", displayCase: "written", hero: "media", heroMotion: "ambient", background: "grain", rhythm: "alternating",
    frames: "none", characters: "shapes", proof: "quotes", cta: "pair",
  },
  cashapp: {
    archetype: "utility", reference: "cashapp", look: "quiet",
    typeface: "system", mono: "system-mono", neutral: "neutral", contrast: "high", accent: "green",
    radius: "pill", depth: "soft", themes: "both",
    density: "comfortable", spacing: "airy", shell: "topnav", sidebarTone: "same", sidebarCollapse: "fixed", navIcons: "icons", pageTitle: "display",
    stats: "cards", trend: "none", tables: "borderless", rowHover: "none", cards: "fill", inputs: "filled", buttons: "filled",
    iconWeight: "regular", menus: "plain", motion: "tactile",
    register: "playful", display: "giant", displayCase: "written", hero: "device", heroMotion: "ambient", background: "flat", rhythm: "fullbleed",
    frames: "phone", characters: "shapes", proof: "numbers", cta: "single",
  },
  airbnb: {
    archetype: "commerce", reference: "airbnb", look: "quiet",
    typeface: "system", mono: "system-mono", neutral: "warm", contrast: "soft", accent: "crimson",
    radius: "pill", depth: "soft", themes: "light",
    density: "comfortable", spacing: "airy", shell: "topnav", sidebarTone: "same", sidebarCollapse: "fixed", navIcons: "icons", pageTitle: "standard",
    stats: "cards", trend: "none", tables: "borderless", rowHover: "none", cards: "fill", inputs: "filled", buttons: "filled",
    iconWeight: "regular", menus: "plain", motion: "anchored",
    register: "playful", display: "heavy", displayCase: "written", hero: "media", heroMotion: "entrance", background: "flat", rhythm: "bento",
    frames: "none", characters: "icons", proof: "quotes", cta: "pair",
  },
  figma: {
    archetype: "canvas", reference: "figma", look: "quiet",
    typeface: "inter", mono: "jetbrains", neutral: "neutral", contrast: "high", accent: "orange",
    radius: "round", depth: "hairline", themes: "both",
    density: "standard", spacing: "regular", shell: "topnav", sidebarTone: "same", sidebarCollapse: "fixed", navIcons: "icons", pageTitle: "display",
    stats: "inline", trend: "none", tables: "borderless", rowHover: "fill", cards: "fill", inputs: "filled", buttons: "filled",
    iconWeight: "regular", menus: "hints", motion: "tactile",
    register: "playful", display: "giant", displayCase: "written", hero: "media", heroMotion: "interactive", background: "scene", rhythm: "bento",
    frames: "browser", characters: "shapes", proof: "logos", cta: "pair",
  },
  cursor: {
    archetype: "canvas", reference: "cursor", look: "quiet",
    typeface: "geist", mono: "geist-mono", neutral: "warm", contrast: "standard", accent: "neutral",
    radius: "medium", depth: "hairline", themes: "dark",
    density: "compact", spacing: "tight", shell: "sidebar", sidebarTone: "dimmer", sidebarCollapse: "rail", navIcons: "icons", pageTitle: "toolbar",
    stats: "strip", trend: "none", tables: "hairline", rowHover: "fill", cards: "fill", inputs: "filled", buttons: "soft",
    iconWeight: "light", menus: "hints", motion: "snappy",
    register: "dark", display: "heavy", displayCase: "written", hero: "shot", heroMotion: "ambient", background: "grid", rhythm: "alternating",
    frames: "none", characters: "none", proof: "logos", cta: "pair",
  },
  supabase: {
    archetype: "workspace", reference: "supabase", look: "quiet",
    typeface: "inter", mono: "jetbrains", neutral: "cool", contrast: "standard", accent: "green",
    radius: "medium", depth: "hairline", themes: "both",
    density: "compact", spacing: "tight", shell: "sidebar", sidebarTone: "dimmer", sidebarCollapse: "rail", navIcons: "icons", pageTitle: "toolbar",
    stats: "strip", trend: "chart", tables: "hairline", rowHover: "fill", cards: "fill", inputs: "filled", buttons: "soft",
    iconWeight: "light", menus: "hints", motion: "snappy",
    register: "dark", display: "heavy", displayCase: "written", hero: "shot", heroMotion: "entrance", background: "grid", rhythm: "bento",
    frames: "browser", characters: "none", proof: "logos", cta: "pair",
  },
  posthog: {
    archetype: "workspace", reference: "posthog", look: "playful",
    typeface: "inter", mono: "jetbrains", neutral: "warm", contrast: "standard", accent: "orange",
    radius: "round", depth: "hairline", themes: "both",
    density: "compact", spacing: "regular", shell: "sidebar", sidebarTone: "tinted", sidebarCollapse: "rail", navIcons: "icons", pageTitle: "toolbar",
    stats: "strip", trend: "chart", tables: "hairline", rowHover: "fill", cards: "fill", inputs: "filled", buttons: "soft",
    iconWeight: "regular", menus: "hints", motion: "tactile", controlResponse: "sink",
    register: "playful", display: "heavy", displayCase: "written", hero: "shot", heroMotion: "ambient", background: "grain", rhythm: "bento",
    frames: "browser", characters: "characters", proof: "numbers", cta: "pair",
  },
  attio: {
    archetype: "workspace", reference: "attio", look: "quiet",
    typeface: "inter", mono: "geist-mono", neutral: "neutral", contrast: "high", accent: "neutral",
    radius: "sharp", depth: "hairline", themes: "both",
    density: "standard", spacing: "regular", shell: "sidebar", sidebarTone: "same", sidebarCollapse: "hide", navIcons: "icons", pageTitle: "toolbar",
    stats: "inline", trend: "none", tables: "borderless", rowHover: "fill", cards: "hairline", inputs: "outlined", buttons: "filled",
    iconWeight: "light", menus: "hints", motion: "snappy",
    register: "editorial", display: "heavy", displayCase: "written", hero: "shot", heroMotion: "entrance", background: "flat", rhythm: "alternating",
    frames: "none", characters: "none", proof: "logos", cta: "pair",
  },
  resend: {
    archetype: "workspace", reference: "resend", look: "quiet",
    typeface: "geist", mono: "geist-mono", neutral: "neutral", contrast: "high", accent: "neutral",
    radius: "medium", depth: "hairline", themes: "dark",
    density: "compact", spacing: "tight", shell: "topnav", sidebarTone: "same", sidebarCollapse: "fixed", navIcons: "text", pageTitle: "toolbar",
    stats: "strip", trend: "none", tables: "hairline", rowHover: "fill", cards: "hairline", inputs: "outlined", buttons: "outline",
    iconWeight: "light", menus: "plain", motion: "snappy",
    register: "dark", display: "heavy", displayCase: "written", hero: "split", heroMotion: "entrance", background: "grid", rhythm: "bento",
    frames: "browser", characters: "none", proof: "logos", cta: "pair",
  },
  agentchat: {
    archetype: "conversation", reference: "agentchat", look: "quiet",
    typeface: "inter", mono: "geist-mono", neutral: "neutral", contrast: "standard", accent: "neutral",
    radius: "soft", depth: "hairline", themes: "both",
    density: "standard", spacing: "regular", shell: "sidebar", sidebarTone: "tinted", sidebarCollapse: "hide", navIcons: "icons", pageTitle: "toolbar",
    stats: "inline", trend: "none", tables: "borderless", rowHover: "fill", cards: "fill", inputs: "filled", buttons: "filled",
    iconWeight: "regular", menus: "hints", motion: "snappy",
    register: "same", display: "heavy", displayCase: "written", hero: "shot", heroMotion: "entrance", background: "flat", rhythm: "alternating",
    frames: "browser", characters: "none", proof: "logos", cta: "pair",
  },
  community: {
    archetype: "feed", reference: "community", look: "playful",
    typeface: "rounded", mono: "jetbrains", neutral: "cool", contrast: "standard", accent: "orange",
    radius: "pill", depth: "hairline", themes: "both",
    density: "standard", spacing: "regular", shell: "sidebar", sidebarTone: "same", sidebarCollapse: "fixed", navIcons: "icons", pageTitle: "standard",
    stats: "inline", trend: "none", tables: "borderless", rowHover: "fill", cards: "hairline", inputs: "filled", buttons: "filled",
    iconWeight: "regular", menus: "plain", motion: "tactile", controlResponse: "sink",
    register: "playful", display: "heavy", displayCase: "written", hero: "split", heroMotion: "entrance", background: "flat", rhythm: "bento",
    frames: "phone", characters: "shapes", proof: "numbers", cta: "pair",
  },
  mediaapp: {
    archetype: "media", reference: "mediaapp", look: "immersive",
    typeface: "instrument", mono: "system-mono", neutral: "neutral", contrast: "standard", accent: "green",
    radius: "round", depth: "soft", themes: "dark",
    density: "standard", spacing: "regular", shell: "sidebar", sidebarTone: "dimmer", sidebarCollapse: "rail", navIcons: "icons", pageTitle: "display",
    stats: "cards", trend: "none", tables: "borderless", rowHover: "fill", cards: "fill", inputs: "filled", buttons: "filled",
    iconWeight: "regular", menus: "plain", motion: "material",
    register: "same", display: "giant", displayCase: "written", hero: "media", heroMotion: "ambient", background: "glow", rhythm: "fullbleed",
    frames: "none", characters: "none", proof: "numbers", cta: "single",
  },
  learning: {
    archetype: "reader", reference: "learning", look: "playful",
    typeface: "rounded", mono: "system-mono", neutral: "neutral", contrast: "standard", accent: "green",
    radius: "pill", depth: "hairline", themes: "both",
    density: "comfortable", spacing: "airy", shell: "sidebar", sidebarTone: "same", sidebarCollapse: "fixed", navIcons: "icons", pageTitle: "standard",
    stats: "cards", trend: "none", tables: "borderless", rowHover: "fill", cards: "hairline", inputs: "filled", buttons: "filled",
    iconWeight: "regular", menus: "plain", motion: "tactile", controlResponse: "sink",
    register: "playful", display: "giant", displayCase: "written", hero: "device", heroMotion: "ambient", background: "flat", rhythm: "bento",
    frames: "phone", characters: "characters", proof: "numbers", cta: "single",
  },
  gamecompanion: {
    archetype: "companion", reference: "gamecompanion", look: "immersive",
    typeface: "grotesk", mono: "jetbrains", neutral: "cool", contrast: "high", accent: "amber",
    radius: "none", depth: "soft", themes: "dark",
    density: "compact", spacing: "tight", shell: "sidebar", sidebarTone: "dimmer", sidebarCollapse: "rail", navIcons: "icons", pageTitle: "display",
    stats: "cards", trend: "sparkline", tables: "zebra", rowHover: "fill", cards: "fill", inputs: "filled", buttons: "filled",
    iconWeight: "tiles", menus: "hints", motion: "material",
    register: "same", display: "heavy", displayCase: "written", hero: "media", heroMotion: "scroll", background: "glow", rhythm: "chapters",
    frames: "none", characters: "none", proof: "numbers", cta: "single",
  },
  indieshop: {
    archetype: "commerce", reference: "indieshop", look: "brutalist",
    typeface: "grotesk", mono: "jetbrains", neutral: "neutral", contrast: "high", accent: "pink",
    radius: "none", depth: "offset", themes: "light",
    density: "standard", spacing: "regular", shell: "topnav", sidebarTone: "same", sidebarCollapse: "fixed", navIcons: "text", pageTitle: "display",
    stats: "cards", trend: "none", tables: "hairline", rowHover: "fill", cards: "hairline", inputs: "outlined", buttons: "filled",
    iconWeight: "regular", menus: "plain", motion: "still", controlResponse: "sink",
    register: "same", display: "giant", displayCase: "written", hero: "type", heroMotion: "static", background: "flat", rhythm: "bento",
    frames: "none", characters: "shapes", proof: "quotes", cta: "single",
  },
  utilitarian: {
    archetype: "utility", reference: "utilitarian", look: "brutalist",
    typeface: "system", mono: "system-mono", neutral: "neutral", contrast: "high", accent: "blue",
    radius: "none", depth: "hairline", themes: "light",
    density: "compact", spacing: "tight", shell: "topnav", sidebarTone: "same", sidebarCollapse: "fixed", navIcons: "text", pageTitle: "toolbar",
    stats: "inline", trend: "none", tables: "hairline", rowHover: "none", cards: "hairline", inputs: "outlined", buttons: "outline",
    iconWeight: "regular", menus: "plain", motion: "still",
    register: "same", display: "same", displayCase: "written", hero: "type", heroMotion: "static", background: "flat", rhythm: "alternating",
    frames: "none", characters: "none", proof: "none", cta: "email",
  },
  newspaper: {
    archetype: "reader", reference: "newspaper", look: "print",
    typeface: "serif", mono: "plex-mono", neutral: "warm", contrast: "standard", accent: "neutral",
    radius: "none", depth: "hairline", themes: "light",
    density: "comfortable", spacing: "regular", shell: "topnav", sidebarTone: "same", sidebarCollapse: "fixed", navIcons: "text", pageTitle: "display",
    stats: "inline", trend: "none", tables: "hairline", rowHover: "none", cards: "hairline", inputs: "underline", buttons: "outline",
    iconWeight: "light", menus: "plain", motion: "still",
    register: "same", display: "heavy", displayCase: "written", hero: "type", heroMotion: "static", background: "grain", rhythm: "alternating",
    frames: "none", characters: "none", proof: "quotes", cta: "email",
  },
};

/** The reference each archetype starts from when none is picked. */
export const ARCHETYPE_REFERENCE: Record<Archetype, string> = {
  workspace: "linear",
  feed: "community",
  commerce: "airbnb",
  reader: "learning",
  media: "mediaapp",
  companion: "gamecompanion",
  canvas: "figma",
  conversation: "agentchat",
  utility: "raycast",
};

/** How each archetype composes the surfaces it may have, and how its work in progress reports itself. */
export const ARCHETYPE_DEFAULTS: Record<Archetype, Pick<ResolvedChoices, SurfaceStep | "asyncFeedback">> = {
  workspace: { feedLayout: "compact", boardLayout: "columns", conversationLayout: "channel", readerLayout: "outline", commerceLayout: "list", asyncFeedback: "steps" },
  feed: { feedLayout: "timeline", boardLayout: "grouped", conversationLayout: "bubbles", readerLayout: "column", commerceLayout: "grid", asyncFeedback: "spinner" },
  commerce: { feedLayout: "cards", boardLayout: "pipeline", conversationLayout: "context", readerLayout: "column", commerceLayout: "grid", asyncFeedback: "skeleton" },
  reader: { feedLayout: "digest", boardLayout: "grouped", conversationLayout: "bubbles", readerLayout: "margin", commerceLayout: "shelves", asyncFeedback: "skeleton" },
  media: { feedLayout: "cards", boardLayout: "columns", conversationLayout: "bubbles", readerLayout: "paged", commerceLayout: "shelves", asyncFeedback: "skeleton" },
  companion: { feedLayout: "compact", boardLayout: "swimlanes", conversationLayout: "channel", readerLayout: "paged", commerceLayout: "grid", asyncFeedback: "progress" },
  canvas: { feedLayout: "digest", boardLayout: "columns", conversationLayout: "context", readerLayout: "outline", commerceLayout: "grid", asyncFeedback: "progress" },
  conversation: { feedLayout: "digest", boardLayout: "grouped", conversationLayout: "bubbles", readerLayout: "outline", commerceLayout: "list", asyncFeedback: "steps" },
  utility: { feedLayout: "compact", boardLayout: "grouped", conversationLayout: "transcript", readerLayout: "column", commerceLayout: "list", asyncFeedback: "spinner" },
};

/** What each motion language does on every interaction axis. A language picked over the reference's or the look's own re-defaults them. */
export const MOTION_DEFAULTS: Record<string, Pick<ResolvedChoices, InteractionAxis>> = {
  still: { layerArrival: "cut", controlResponse: "tone", contentSwap: "cut", routeMotion: "cut", themeMotion: "cut" },
  snappy: { layerArrival: "fade", controlResponse: "tone", contentSwap: "crossfade", routeMotion: "fade", themeMotion: "cut" },
  anchored: { layerArrival: "anchored", controlResponse: "press", contentSwap: "crossfade", routeMotion: "fade", themeMotion: "fade" },
  tactile: { layerArrival: "rise", controlResponse: "press", contentSwap: "slide", routeMotion: "axis", themeMotion: "circle" },
  material: { layerArrival: "reveal", controlResponse: "ink", contentSwap: "resize", routeMotion: "continuity", themeMotion: "circle" },
};

/**
 * What a look re-defaults when the user picks it over the reference's own look.
 * Steps it doesn't list keep the reference's value, so Linear's frame with a brutalist look stays Linear's frame.
 */
export const LOOK_DEFAULTS: Record<string, Partial<ResolvedChoices>> = {
  quiet: { typeface: "inter", contrast: "standard", radius: "medium", depth: "hairline", cards: "hairline", inputs: "outlined", buttons: "filled", motion: "snappy", display: "same" },
  editorial: { neutral: "warm", contrast: "soft", radius: "sharp", depth: "hairline", density: "comfortable", spacing: "airy", pageTitle: "display", cards: "hairline", inputs: "underline", buttons: "outline", motion: "anchored", display: "heavy" },
  playful: { typeface: "rounded", contrast: "standard", radius: "pill", depth: "soft", cards: "fill", inputs: "filled", buttons: "filled", iconWeight: "regular", motion: "tactile", controlResponse: "sink", display: "giant" },
  brutalist: { typeface: "grotesk", mono: "jetbrains", neutral: "neutral", contrast: "high", radius: "none", depth: "offset", tables: "hairline", cards: "hairline", inputs: "outlined", buttons: "filled", motion: "still", controlResponse: "sink" },
  print: { typeface: "serif", mono: "plex-mono", neutral: "warm", contrast: "standard", radius: "none", depth: "hairline", pageTitle: "display", tables: "hairline", cards: "hairline", inputs: "underline", buttons: "outline", motion: "still" },
  immersive: { typeface: "grotesk", contrast: "standard", radius: "round", depth: "soft", themes: "dark", sidebarTone: "dimmer", cards: "fill", inputs: "filled", motion: "material", display: "giant" },
};

const SURFACE_DEFAULTED: Record<string, true> = { feedLayout: true, boardLayout: true, conversationLayout: true, readerLayout: true, commerceLayout: true, asyncFeedback: true };
const MOTION_DEFAULTED: Record<string, true> = { layerArrival: true, controlResponse: true, contentSwap: true, routeMotion: true, themeMotion: true };

/** The reference, the look picked over it, and the motion language picked over theirs: the three layers of defaults. */
function layers(choices: Choices) {
  const archetype = (choices.archetype ?? PRESETS[choices.reference ?? ""]?.archetype ?? "workspace") as Archetype;
  const reference = choices.reference ?? ARCHETYPE_REFERENCE[archetype] ?? "linear";
  const preset = PRESETS[reference] ?? PRESETS.linear!;
  const look = choices.look !== undefined && choices.look !== preset.look ? LOOK_DEFAULTS[choices.look] : undefined;
  const framed = { ...preset, ...look };
  const language = choices.motion !== undefined && choices.motion !== framed.motion ? MOTION_DEFAULTS[choices.motion] : undefined;
  return { archetype, preset, look, framed, language };
}

/**
 * Every step's default under these choices: the archetype's surfaces and the motion language's axes,
 * then the reference preset (the archetype's reference when none is picked), then a chosen look's
 * re-defaults when it isn't the reference's own, then a chosen motion language's when it isn't theirs.
 */
export function defaultsFor(choices: Choices): ResolvedChoices {
  const { archetype, preset, framed, language } = layers(choices);
  return {
    ...(ARCHETYPE_DEFAULTS[archetype] ?? ARCHETYPE_DEFAULTS.workspace),
    ...(MOTION_DEFAULTS[framed.motion] ?? MOTION_DEFAULTS.snappy!),
    ...framed,
    ...language,
    archetype,
    reference: preset.reference,
  };
}

/** Where a step's default comes from, as a phrase: "Linear", "the playful look", "the tactile motion language", "the feed archetype". */
export function defaultSource(choices: Choices, id: StepId): string {
  const { archetype, preset, look, framed, language } = layers(choices);
  const label = (step: StepId, option: string) => STEP_BY_ID[step].options.find((o) => o.id === option)?.label.toLowerCase() ?? option;
  if (language && MOTION_DEFAULTED[id]) return `the ${label("motion", choices.motion!)} motion language`;
  if (look?.[id] !== undefined) return `the ${label("look", choices.look!)} look`;
  if (preset[id] === undefined && MOTION_DEFAULTED[id]) return `the ${label("motion", framed.motion)} motion language`;
  if (preset[id] === undefined && SURFACE_DEFAULTED[id]) return `the ${label("archetype", archetype)} archetype`;
  return STEP_BY_ID.reference.options.find((o) => o.id === preset.reference)?.label ?? preset.reference;
}

export function resolveChoices(choices: Choices): ResolvedChoices {
  return { ...defaultsFor(choices), ...(choices as Record<StepId, string>) };
}

/** Steps whose user choice differs from its default. The archetype and reference set the defaults, so they never deviate. */
export function deviations(choices: Choices): StepId[] {
  const defaults = defaultsFor(choices);
  return STEPS.filter((s) => s.id !== "archetype" && s.id !== "reference" && choices[s.id] !== undefined && choices[s.id] !== defaults[s.id]).map((s) => s.id);
}

/** A step's options in the order the walk shows them: references that fit the archetype come first. */
export function optionsFor(step: Step, resolved: ResolvedChoices): readonly Option[] {
  if (step.id !== "reference") return step.options;
  const fits = (o: Option) => (PRESETS[o.id]?.archetype === resolved.archetype ? 0 : 1);
  return [...step.options].sort((a, b) => fits(a) - fits(b));
}
