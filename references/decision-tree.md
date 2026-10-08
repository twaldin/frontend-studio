# Visual decision tree

Generated from `studio/src/tree/steps.ts`; edit there. Ask in this order. Each step lists the options and what every reference picks, so a text-only run can still say "Linear's default is X". The archetype picks the reference to start from and the surface layouts; a look other than the reference's own re-defaults the steps it lists, and so does a motion language for the interaction steps. Read each linked pattern record in `references/patterns/` for its variants and contract; Still and Cut are universal baselines beside the motion variants.

## Product

### 1. What shape is the product?

_Decides the home surface and sample content every later step renders on, and which references fit._

- **Workspace** `workspace` — Records and operations: lists, tables, figures. Linear, Stripe. Starts from linear; surfaces: feedLayout compact, boardLayout columns, conversationLayout channel, readerLayout outline, commerceLayout list, asyncFeedback steps. _(default for: linear, vercel, stripe, ramp, raindrop, mercury, supabase, posthog, attio, resend)_
- **Feed** `feed` — Posts from people or sources, newest first, with replies. Reddit, Bluesky. Starts from community; surfaces: feedLayout timeline, boardLayout grouped, conversationLayout bubbles, readerLayout column, commerceLayout grid, asyncFeedback spinner. _(default for: community)_
- **Store or marketplace** `commerce` — Listings to browse, compare and buy. Airbnb, Gumroad. Starts from airbnb; surfaces: feedLayout cards, boardLayout pipeline, conversationLayout context, readerLayout column, commerceLayout grid, asyncFeedback skeleton. _(default for: apple, airbnb, indieshop)_
- **Course or reader** `reader` — Lessons or articles, and progress through them. Duolingo, a newspaper. Starts from learning; surfaces: feedLayout digest, boardLayout grouped, conversationLayout bubbles, readerLayout margin, commerceLayout shelves, asyncFeedback skeleton. _(default for: learning, newspaper)_
- **Media library** `media` — Albums, shows or videos to play. Spotify. Starts from mediaapp; surfaces: feedLayout cards, boardLayout columns, conversationLayout bubbles, readerLayout paged, commerceLayout shelves, asyncFeedback skeleton. _(default for: mediaapp)_
- **Game companion** `companion` — A player's profile, quests, inventory and rankings. Starts from gamecompanion; surfaces: feedLayout compact, boardLayout swimlanes, conversationLayout channel, readerLayout paged, commerceLayout grid, asyncFeedback progress. _(default for: gamecompanion)_
- **Editor or canvas** `canvas` — One document or board the user makes. Figma, Notion. Starts from figma; surfaces: feedLayout digest, boardLayout columns, conversationLayout context, readerLayout outline, commerceLayout grid, asyncFeedback progress. _(default for: notion, figma, cursor)_
- **Conversation** `conversation` — A thread with people or an agent. ChatGPT, Discord. Starts from agentchat; surfaces: feedLayout digest, boardLayout grouped, conversationLayout bubbles, readerLayout outline, commerceLayout list, asyncFeedback steps. _(default for: agentchat)_
- **Utility** `utility` — One focused tool, used in seconds. Raycast, a converter. Starts from raycast; surfaces: feedLayout compact, boardLayout grouped, conversationLayout transcript, readerLayout column, commerceLayout list, asyncFeedback spinner. _(default for: raycast, cashapp, utilitarian)_

### 2. Which product or genre is the reference?

_Every later step defaults to what this reference does. References that fit the archetype come first._

- **Linear** `linear` — Dense, 13px chrome, cool gray, indigo, sidebar, hairlines.
- **Vercel** `vercel` — 14px, pure neutral, black accent, top nav, soft shadows.
- **Stripe** `stripe` — 14px, cool neutral, violet, sidebar, shadows, editorial landing.
- **Notion** `notion` — 15px, warm neutral, black accent, borderless tables, generous.
- **Raycast** `raycast` — 13px, dark-first, red accent, rounded, dark showcase landing.
- **Ramp** `ramp` — Exacting finance UI, acid green, compact density, operational proof.
- **Apple** `apple` — Giant centered type, product-led media, full-bleed chapters.
- **Raindrop** `raindrop` — Dark agent tooling, green signal, product trace, sticky storytelling.
- **Mercury** `mercury` — Warm editorial fintech, generous space, composed product imagery.
- **Cash App** `cashapp` — Black and bright green, giant type, rounded mobile-first play.
- **Airbnb** `airbnb` — Warm marketplace, photographic cards, soft depth, comfortable density.
- **Figma** `figma` — Creative canvas, art-led color, interactive product demonstrations.
- **Cursor** `cursor` — Warm dark developer tool, restrained chrome, code-forward product proof.
- **Supabase** `supabase` — Dark developer platform, green accent, grid structure, dashboard proof.
- **PostHog** `posthog` — Playful developer suite, warm canvas, orange signal, dense product cards.
- **Attio** `attio` — Editorial precision, monochrome CRM, compact data surfaces.
- **Resend** `resend` — Monochrome developer infrastructure, dark canvas, code and email proof.
- **Agent chat** `agentchat` — Centered thread, quiet neutral chrome, one rounded composer. Like ChatGPT.
- **Community** `community` — Posts and replies, rounded friendly type, one saturated accent. Like Reddit.
- **Media app** `mediaapp` — Dark, cover art leads, big rounded tiles, a now-playing bar. Like Spotify.
- **Learning app** `learning` — Bright and rounded, chunky tactile buttons, streaks and progress. Like Duolingo.
- **Game companion** `gamecompanion` — Dark HUD panels, amber signal, square corners, grotesk headings.
- **Indie shop** `indieshop` — Black outlines, hard offset shadows, pink accent, flat color. Like Gumroad.
- **Utilitarian** `utilitarian` — System type, no radius, black on white, links that look like links. Like Craigslist.
- **Newspaper** `newspaper` — Serif headlines and text, a paper canvas, column rules, no radius.

### 3. What visual language does the app speak?

_The app's own register, chosen on purpose. A look other than the reference's re-defaults type, shape, depth and texture to match._

- **Quiet tool** `quiet` — Neutral chrome, one accent, hairlines, medium-weight sans headings. Linear, Stripe. Re-defaults: typeface inter, contrast standard, radius medium, depth hairline, cards hairline, inputs outlined, buttons filled, motion snappy, display same. _(default for: linear, vercel, stripe, notion, raycast, ramp, apple, raindrop, mercury, cashapp, airbnb, figma, cursor, supabase, attio, resend, agentchat)_
- **Editorial** `editorial` — Serif headings over a sans, warm paper tones, generous space, crisp corners. Magazines and long reads. Re-defaults: neutral warm, contrast soft, radius sharp, depth hairline, density comfortable, spacing airy, pageTitle display, cards hairline, inputs underline, buttons outline, motion anchored, display heavy.
- **Playful** `playful` — Rounded heavy type, pressed-in buttons, soft corners, springy motion. Duolingo, PostHog. Re-defaults: typeface rounded, contrast standard, radius pill, depth soft, cards fill, inputs filled, buttons filled, iconWeight regular, motion tactile, controlResponse sink, display giant. _(default for: posthog, community, learning)_
- **Brutalist** `brutalist` — Grotesk type, square corners, high contrast, hard offset shadows. Gumroad. Re-defaults: typeface grotesk, mono jetbrains, neutral neutral, contrast high, radius none, depth offset, tables hairline, cards hairline, inputs outlined, buttons filled, motion still, controlResponse sink. _(default for: indieshop, utilitarian)_
- **Print** `print` — Serif throughout, a grained paper canvas, column rules, no radius. A newspaper. Re-defaults: typeface serif, mono plex-mono, neutral warm, contrast standard, radius none, depth hairline, pageTitle display, tables hairline, cards hairline, inputs underline, buttons outline, motion still. _(default for: newspaper)_
- **Immersive** `immersive` — Dark and media-led, an accent glow, big rounded tiles, heavy headings. Spotify, a game client. Re-defaults: typeface grotesk, contrast standard, radius round, depth soft, themes dark, sidebarTone dimmer, cards fill, inputs filled, motion material, display giant. _(default for: mediaapp, gamecompanion)_

## Frame

### 4. App shell?

_The one layout decision every screen inherits._

- **Sidebar** `sidebar` — Grouped left nav, content fills. Linear, Stripe. _(default for: linear, stripe, notion, raycast, raindrop, cursor, supabase, posthog, attio, agentchat, community, mediaapp, learning, gamecompanion)_
- **Top nav** `topnav` — Horizontal tabs, centered content. Vercel. _(default for: vercel, ramp, apple, mercury, cashapp, airbnb, figma, resend, indieshop, utilitarian, newspaper)_
- **Sidebar + top bar** `both` — Nav left, context and search on top.

### 5. Does the sidebar collapse?

_Decides how much screen the content can take and whether nav needs icons._

- **Fixed** `fixed` — Always expanded. Stripe. _(default for: vercel, stripe, ramp, apple, mercury, cashapp, airbnb, figma, resend, community, learning, indieshop, utilitarian, newspaper)_
- **Hide** `hide` — A toggle hides it fully; nothing on hover. Linear. _(default for: linear, attio, agentchat)_
- **Hide, peek on hover** `peek` — Hidden; hovering the left edge slides it over the content. Notion. _(default for: notion)_
- **Icon rail** `rail` — Collapses to a 48px rail; icons are the nav, labels as tooltips. VS Code, Slack. _(default for: raycast, raindrop, cursor, supabase, posthog, mediaapp, gamecompanion)_
- **Icon rail, expands on hover** `railExpand` — The rail widens over the content when hovered. Supabase.

### 6. Sidebar tone?

_Linear made theirs a few notches dimmer so content wins._

- **Same as canvas** `same` — Separated by a hairline only. _(default for: vercel, stripe, ramp, apple, mercury, cashapp, airbnb, figma, attio, resend, community, learning, indieshop, utilitarian, newspaper)_
- **Subtle step** `tinted` — The scale's step 2 in both themes: darker in light, lighter in dark. Notion. _(default for: notion, raycast, posthog, agentchat)_
- **Dimmer** `dimmer` — Darker in both themes; dark-mode content reads as a raised panel. Linear. _(default for: linear, raindrop, cursor, supabase, mediaapp, gamecompanion)_
- **Dark** `dark` — Dark rail in light mode. Slack-like.

### 7. Icons in the nav?

_Icons speed scanning and add visual weight; text-only reads calmer._

- **Icons** `icons` — Icon before every item. Linear, Stripe, Notion. _(default for: linear, stripe, notion, raycast, raindrop, cashapp, airbnb, figma, cursor, supabase, posthog, attio, agentchat, community, mediaapp, learning, gamecompanion)_
- **Text only** `text` — Labels only. Vercel. _(default for: vercel, ramp, apple, mercury, resend, indieshop, utilitarian, newspaper)_

### 8. Page title scale?

_Decides whether a page reads as a tool view or a document._

- **Toolbar** `toolbar` — Title in a 40px bar, 14px medium, actions inline. Linear. _(default for: linear, raycast, ramp, raindrop, cursor, supabase, posthog, attio, resend, agentchat, utilitarian)_
- **Standard** `standard` — 22px title over the content, actions right. Vercel, Stripe. _(default for: vercel, stripe, airbnb, community, learning)_
- **Display** `display` — 36px title, document-like, generous. Notion. _(default for: notion, apple, mercury, cashapp, figma, mediaapp, gamecompanion, indieshop, newspaper)_

### 9. App density?

_Chrome size, control height and row height move together._

- **Compact** `compact` — 13px chrome, 14px body, 28px controls. Linear. _(default for: linear, raycast, ramp, raindrop, cursor, supabase, posthog, resend, gamecompanion, utilitarian)_
- **Standard** `standard` — 14px chrome, 15px body, 32px controls. Vercel, Stripe. _(default for: vercel, stripe, figma, attio, agentchat, community, mediaapp, indieshop)_
- **Comfortable** `comfortable` — 15px chrome, 16px body, 36px controls. Notion. _(default for: notion, apple, mercury, cashapp, airbnb, learning, newspaper)_

### 10. Spacing unit?

_Padding and gaps everywhere scale from one unit. Notion is airy; Linear is tight._

- **Tight** `tight` — 3.5px unit. Dense operator tools. Linear. _(default for: linear, raindrop, cursor, supabase, resend, gamecompanion, utilitarian)_
- **Regular** `regular` — 4px unit. The field default. _(default for: vercel, stripe, raycast, ramp, figma, posthog, attio, agentchat, community, mediaapp, indieshop, newspaper)_
- **Airy** `airy` — 5px unit. Generous, document-like. Notion. _(default for: notion, apple, mercury, cashapp, airbnb, learning)_

## Surfaces

### 11. How does a feed lay out its entries?

_A feed is read top to bottom many times a day; the entry's shape decides how much each one says before a tap._

Pattern: [feed](patterns/feed.md).

- **Timeline** `timeline` — One column of whole entries: author, text, media and actions. Bluesky, Threads. _(default for: community)_
- **Cards** `cards` — Entries as cards in two columns, media first. Pinterest, Dribbble. _(default for: apple, airbnb, mediaapp, indieshop)_
- **Compact list** `compact` — One line per entry with its counts; the title is the link. Hacker News. _(default for: linear, vercel, stripe, raycast, ramp, raindrop, mercury, cashapp, supabase, posthog, attio, resend, gamecompanion, utilitarian)_
- **Digest** `digest` — Entries grouped under topic headings, a line of summary each. A newsletter or a morning briefing. _(default for: notion, figma, cursor, agentchat, learning, newspaper)_

### 12. How does a board show work moving through stages?

_Decides whether people see the flow of work, who owns what, or only what's next._

Pattern: [board](patterns/board.md).

- **Columns** `columns` — A column per stage, cards stacked in each. Trello, Linear's board. _(default for: linear, vercel, stripe, notion, ramp, raindrop, mercury, figma, cursor, supabase, posthog, attio, resend, mediaapp)_
- **Swimlanes** `swimlanes` — Columns per stage, a row per owner or area. Jira. _(default for: gamecompanion)_
- **Grouped list** `grouped` — One list under a heading per stage; holds on a phone. Linear's list view. _(default for: raycast, cashapp, agentchat, community, learning, utilitarian, newspaper)_
- **Pipeline** `pipeline` — Stage counts in a strip, with one stage's cards open below. Sales pipelines. _(default for: apple, airbnb, indieshop)_

### 13. How does a conversation lay out its messages?

_Says who the conversation is with: a friend, a team, or an agent that writes documents._

Pattern: [conversation](patterns/conversation.md).

- **Bubbles** `bubbles` — Yours on the right, theirs on the left, in rounded bubbles. iMessage, WhatsApp. _(default for: agentchat, community, mediaapp, learning, newspaper)_
- **Transcript** `transcript` — Turns run full width without bubbles, so long answers read as documents. ChatGPT, Claude. _(default for: raycast, cashapp, utilitarian)_
- **Channel** `channel` — Dense rows with name and time; consecutive messages group under one name. Slack, Discord. _(default for: linear, vercel, stripe, ramp, raindrop, mercury, supabase, posthog, attio, resend, gamecompanion)_
- **With context** `context` — The thread beside a panel about what it discusses: the order, the file, the customer. Support inboxes. _(default for: notion, apple, airbnb, figma, cursor, indieshop)_

### 14. How does the reading view hold a long text?

_Long reads need a steady measure; the space beside the text is for finding your place, or for notes._

Pattern: [reader](patterns/reader.md).

- **Single column** `column` — One centered measure and nothing beside it. Medium, Substack. _(default for: raycast, apple, cashapp, airbnb, community, indieshop, utilitarian)_
- **With outline** `outline` — A sticky outline beside the text marks where you are. Documentation sites. _(default for: linear, vercel, stripe, notion, ramp, raindrop, mercury, figma, cursor, supabase, posthog, attio, resend, agentchat)_
- **Margin notes** `margin` — Notes and glossary sit in the margin beside the line they explain. Tufte-style books. _(default for: learning, newspaper)_
- **Paged** `paged` — One page at a time, with page turns and a progress line. Kindle, Apple Books. _(default for: mediaapp, gamecompanion)_

### 15. How are things to buy laid out?

_Browsing by picture, comparing by detail and buying the one you came for need different layouts._

Pattern: [storefront](patterns/storefront.md).

- **Grid** `grid` — Picture-led tiles with the price under each. Airbnb, Etsy. _(default for: notion, apple, airbnb, figma, cursor, community, gamecompanion, indieshop)_
- **List** `list` — Rows with a thumbnail, details and price, for comparing. Search results on Amazon. _(default for: linear, vercel, stripe, raycast, ramp, raindrop, mercury, cashapp, supabase, posthog, attio, resend, agentchat, utilitarian)_
- **Shelves** `shelves` — One featured item, then a shelf per category. App Store, Steam. _(default for: mediaapp, learning, newspaper)_
- **List and detail** `split` — The list beside the selected item's detail and buy box; buying never leaves the list.

## Tokens

### 16. Which typeface?

_Carries 70–95% of rendered characters. Everything else is tuned to it._

- **Inter** `inter` — The default of the field. Neutral, huge x-height, great at 13px. _(default for: linear, stripe, notion, raycast, ramp, raindrop, figma, supabase, posthog, attio, agentchat)_
- **Geist** `geist` — Vercel's. Slightly narrower and warmer than Inter. _(default for: vercel, cursor, resend)_
- **IBM Plex Sans** `plex` — More character, wider. Reads editorial.
- **Instrument Sans** `instrument` — Geometric, friendly. Consumer feel. _(default for: mercury, mediaapp)_
- **System** `system` — SF on Mac, Segoe on Windows. Zero bytes, native feel. _(default for: apple, cashapp, airbnb, utilitarian)_
- **Newsreader** `serif` — A text serif with optical sizes. Print and editorial products. _(default for: newspaper)_
- **Nunito** `rounded` — Rounded terminals. Friendly, playful, learning products. _(default for: community, learning)_
- **Space Grotesk** `grotesk` — A quirky grotesk. Brutalist, game and media products. _(default for: gamecompanion, indieshop)_

### 17. Which mono, for identifiers and code?

_Appears in paths, ids, timestamps, code blocks. Must pair with the sans._

- **Geist Mono** `geist-mono` — Pairs with Inter and Geist. _(default for: linear, vercel, ramp, raindrop, cursor, attio, resend, agentchat)_
- **JetBrains Mono** `jetbrains` — Taller, more distinct glyphs. Reads as code. _(default for: stripe, raycast, figma, supabase, posthog, community, gamecompanion, indieshop)_
- **IBM Plex Mono** `plex-mono` — Pairs with Plex Sans; slab-ish. _(default for: newspaper)_
- **System mono** `system-mono` — SF Mono / Consolas. Zero bytes. _(default for: notion, apple, mercury, cashapp, airbnb, mediaapp, learning, utilitarian)_

### 18. Neutral temperature?

_The gray scale is 90% of every screen. Temperature sets the whole mood._

- **Cool** `cool` — Blue-tinted gray. Linear, Stripe. Reads technical. _(default for: linear, stripe, supabase, community, gamecompanion)_
- **Neutral** `neutral` — True gray. Vercel. Reads exact. _(default for: vercel, raycast, ramp, apple, raindrop, cashapp, figma, attio, resend, agentchat, mediaapp, learning, indieshop, utilitarian)_
- **Warm** `warm` — Sand/stone. Notion. Reads calm, paper-like. _(default for: notion, mercury, airbnb, cursor, posthog, newspaper)_
- **Tinted** `tinted` — Mauve, carries a hint of the accent. Reads designed.

### 19. Contrast level?

_Linear generates its theme from base, accent and contrast. This is the third knob._

- **Soft** `soft` — Tinted canvas, faint borders. Quieter, lower AA margin. _(default for: notion, mercury, airbnb)_
- **Standard** `standard` — White canvas, step-6 borders. The field default. _(default for: linear, vercel, stripe, raycast, raindrop, cursor, supabase, posthog, agentchat, community, mediaapp, learning, newspaper)_
- **High** `high` — Pure white/black, strong borders. Accessibility variant. _(default for: ramp, apple, cashapp, figma, attio, resend, gamecompanion, indieshop, utilitarian)_

### 20. One accent?

_Buttons, links, focus, selection. One hue; status colors are separate._

- **Indigo** `indigo` — Linear. _(default for: linear)_
- **Blue** `blue` — Safe, expected. _(default for: notion, apple, utilitarian)_
- **Violet** `violet` — Stripe. _(default for: stripe)_
- **Teal** `teal` — Distinct from status green.
- **Green** `green` — Reads 'go'; collides with success. _(default for: ramp, raindrop, cashapp, supabase, mediaapp, learning)_
- **Orange** `orange` — Warm, energetic. _(default for: mercury, figma, posthog, community)_
- **Crimson** `crimson` — Raycast. _(default for: raycast, airbnb)_
- **Pink** `pink` — Loud and indie. Gumroad. _(default for: indieshop)_
- **Amber** `amber` — A gold signal, strongest on dark. Games. _(default for: gamecompanion)_
- **Neutral** `neutral` — Black/white primary. Vercel, Notion. _(default for: vercel, cursor, attio, resend, agentchat, newspaper)_

### 21. Corner radius?

_One value drives controls, cards and menus. Sets tone more than hue does._

- **0px** `none` — Square corners. Print and brutalist. _(default for: gamecompanion, indieshop, utilitarian, newspaper)_
- **4px** `sharp` — Crisp, tool-like. _(default for: notion, ramp, attio)_
- **6px** `medium` — Linear, Vercel. _(default for: linear, vercel, raindrop, cursor, supabase, resend)_
- **8px** `round` — Stripe, Raycast. _(default for: stripe, raycast, mercury, figma, posthog, mediaapp)_
- **10px** `soft` — Consumer, friendly. _(default for: agentchat)_
- **16px** `pill` — Consumer and mobile surfaces with visibly rounded controls. _(default for: apple, cashapp, airbnb, community, learning)_

### 22. Depth by border or shadow?

_Decides how panels, menus and cards separate from the canvas._

- **Hairlines** `hairline` — 1px borders, no shadows except menus. Linear. _(default for: linear, notion, ramp, raindrop, figma, cursor, supabase, posthog, attio, resend, agentchat, community, learning, utilitarian, newspaper)_
- **Hairlines + soft shadow** `soft` — Borders plus a 1–2px shadow on cards. Vercel. _(default for: vercel, raycast, apple, cashapp, airbnb, mediaapp, gamecompanion)_
- **Shadows** `shadow` — Layered shadows, faint borders. Stripe. _(default for: stripe, mercury)_
- **Offset shadows** `offset` — A hard shadow offset down and right, in the text color, under strong borders. Brutalist. _(default for: indieshop)_

### 23. Which themes ship?

_Dark mode is a full second palette and doubles the review surface._

- **Light and dark** `both` — Both first-class; system default. _(default for: linear, vercel, notion, cashapp, figma, supabase, posthog, attio, agentchat, community, learning)_
- **Light only** `light` —  _(default for: stripe, ramp, apple, mercury, airbnb, indieshop, utilitarian, newspaper)_
- **Dark only** `dark` — Raycast. _(default for: raycast, raindrop, cursor, resend, mediaapp, gamecompanion)_

## Components

### 24. Key figures?

_The most-read numbers on the home screen._

- **Strip** `strip` — Hairline-separated columns, no containers. Linear. _(default for: linear, raycast, ramp, raindrop, cursor, supabase, posthog, resend)_
- **Cards** `cards` — Each figure in its own card. Stripe, Vercel. _(default for: vercel, stripe, apple, cashapp, airbnb, mediaapp, learning, gamecompanion, indieshop)_
- **Inline** `inline` — One line of label–value pairs under the title. Notion. _(default for: notion, mercury, figma, attio, agentchat, community, utilitarian, newspaper)_

### 25. Figures over time?

_Whether Home shows where a number is going, not just where it is._

- **None** `none` — The figure only. Linear, Notion. _(default for: linear, notion, raycast, apple, cashapp, airbnb, figma, cursor, attio, resend, agentchat, community, mediaapp, learning, indieshop, utilitarian, newspaper)_
- **Sparkline** `sparkline` — A small line beside each value. _(default for: gamecompanion)_
- **Area** `area` — A filled area under each figure. Vercel. _(default for: vercel, ramp, mercury)_
- **One chart** `chart` — The first figure as a 180px chart, the rest in a row beside it. Stripe. _(default for: stripe, raindrop, supabase, posthog)_
- **Chart panel** `panel` — Figures on top, then a 220px chart with period tabs, axis and a crosshair callout. Analytics-style.
- **Stacked by entity** `stacked` — The chart panel, with the first figure split into its entities as a stacked area and a legend; the top edge is the total.

### 26. Table style?

_Most operator screens are tables._

- **Hairline rows** `hairline` — 1px rules, no fills. Linear, GitHub. _(default for: linear, vercel, stripe, raycast, raindrop, cursor, supabase, posthog, resend, indieshop, utilitarian, newspaper)_
- **Zebra** `zebra` — Alternating tint, no rules. _(default for: gamecompanion)_
- **Borderless** `borderless` — Space only, hover fill. Notion. _(default for: notion, ramp, apple, mercury, cashapp, airbnb, figma, attio, agentchat, community, mediaapp, learning)_

### 27. Row hover?

_Fill says rows are targets; none says the table is for reading._

- **Fill** `fill` — Rows tint on hover and the cursor is a pointer. Linear, Notion. _(default for: linear, stripe, notion, raycast, ramp, raindrop, mercury, figma, cursor, supabase, posthog, attio, resend, agentchat, community, mediaapp, learning, gamecompanion, indieshop)_
- **None** `none` — No hover state on rows. Vercel. _(default for: vercel, apple, cashapp, airbnb, utilitarian, newspaper)_

### 28. Card style?

_Panels, forms and cards share one treatment._

- **Bordered** `hairline` — 1px border; carries whatever shadow the depth step chose. Linear, Vercel, Stripe. _(default for: linear, vercel, stripe, attio, resend, community, learning, indieshop, utilitarian, newspaper)_
- **Filled** `fill` — Translucent fill, no border. Notion, Raycast. _(default for: notion, raycast, ramp, apple, raindrop, mercury, cashapp, airbnb, figma, cursor, supabase, posthog, agentchat, mediaapp, gamecompanion)_

### 29. Input style?

_Every form and the composer._

- **Outlined** `outlined` — 1px border, canvas background. Linear, Vercel. _(default for: linear, vercel, stripe, attio, resend, indieshop, utilitarian)_
- **Filled** `filled` — Muted background, no border. Notion, Raycast. _(default for: notion, raycast, ramp, apple, raindrop, mercury, cashapp, airbnb, figma, cursor, supabase, posthog, agentchat, community, mediaapp, learning, gamecompanion)_
- **Underline** `underline` — Bottom rule only. Editorial. _(default for: newspaper)_

### 30. Button style?

_Primary is the most-clicked pixel in the product._

- **Filled + ghost** `filled` — Solid accent primary, ghost secondary. Linear. _(default for: linear, stripe, notion, ramp, apple, mercury, cashapp, airbnb, figma, attio, agentchat, community, mediaapp, learning, gamecompanion, indieshop)_
- **Outline-first** `outline` — Hairline buttons, filled only for the one CTA. Vercel. _(default for: vercel, resend, utilitarian, newspaper)_
- **Soft** `soft` — Tinted accent background, accent text. Notion, Raycast. _(default for: raycast, raindrop, cursor, supabase, posthog)_

### 31. Icon weight?

_Stroke width sets how loud icons are next to 13–15px text._

- **Light** `light` — 1.5px stroke. Linear, Notion. _(default for: linear, notion, raindrop, mercury, cursor, supabase, attio, resend, newspaper)_
- **Regular** `regular` — 2px stroke. Vercel, Stripe. _(default for: vercel, stripe, ramp, apple, cashapp, airbnb, figma, posthog, agentchat, community, mediaapp, learning, indieshop, utilitarian)_
- **Tiles** `tiles` — Icons in small filled rounded tiles. Raycast. _(default for: raycast, gamecompanion)_

### 32. Menu items?

_Menus and command lists are where keyboard users live._

- **Icons + shortcuts** `hints` — Icon left, shortcut right. Linear, Raycast. _(default for: linear, raycast, raindrop, figma, cursor, supabase, posthog, attio, agentchat, gamecompanion)_
- **Plain** `plain` — Text only. Vercel, Stripe. _(default for: vercel, stripe, notion, ramp, apple, mercury, cashapp, airbnb, resend, community, mediaapp, learning, indieshop, utilitarian, newspaper)_

## Interaction

### 33. What motion language does the app speak?

_Timing and easing for every move, set once. Keyboard and many-times-a-day paths stay instant in every language._

Pattern: [motion-language](patterns/motion-language.md).

- **Still** `still` — Nothing moves; every state change is a cut. Raycast, utilitarian tools. Re-defaults: layerArrival cut, controlResponse tone, contentSwap cut, routeMotion cut, themeMotion cut. _(default for: raycast, indieshop, utilitarian, newspaper)_
- **Snappy** `snappy` — Short fades with almost no travel, 80–150 ms, fast-out curves. Linear. Re-defaults: layerArrival fade, controlResponse tone, contentSwap crossfade, routeMotion fade, themeMotion cut. _(default for: linear, vercel, ramp, raindrop, cursor, supabase, attio, resend, agentchat)_
- **Anchored** `anchored` — Layers grow from the control that opened them, 100–200 ms, no overshoot. macOS menus. Re-defaults: layerArrival anchored, controlResponse press, contentSwap crossfade, routeMotion fade, themeMotion fade. _(default for: stripe, notion, mercury, airbnb)_
- **Tactile** `tactile` — Springs with a little give: controls squash and settle, layers rise. Consumer and playful apps. Re-defaults: layerArrival rise, controlResponse press, contentSwap slide, routeMotion axis, themeMotion circle. _(default for: cashapp, figma, posthog, community, learning)_
- **Material** `material` — Emphasized easing, 150–300 ms, shared-axis moves between related views. Material 3. Re-defaults: layerArrival reveal, controlResponse ink, contentSwap resize, routeMotion continuity, themeMotion circle. _(default for: apple, mediaapp, gamecompanion)_

### 34. How do menus, popovers and dialogs arrive?

_Layers open many times a session; their arrival says where they came from without slowing the next action._

Pattern: [layer-arrival](patterns/layer-arrival.md).

- **Cut** `cut` — Appear and vanish in place. Keyboard-first tools. _(default for: raycast, indieshop, utilitarian, newspaper)_
- **Fade** `fade` — Opacity only, in place. _(default for: linear, vercel, ramp, raindrop, cursor, supabase, attio, resend, agentchat)_
- **Grow from the trigger** `anchored` — Scales up from the edge of the control that opened it, with a fade. _(default for: stripe, notion, mercury, airbnb)_
- **Rise** `rise` — Slides up a few pixels while fading in; dialogs rise from below. _(default for: cashapp, figma, posthog, community, learning)_
- **Reveal** `reveal` — The layer's edge unrolls away from the trigger while its content stays still. Material. _(default for: apple, mediaapp, gamecompanion)_

### 35. How does a control answer a press?

_The press confirms the hit before anything else happens; every button in the product carries it._

Pattern: [control-response](patterns/control-response.md).

- **Tone** `tone` — The fill darkens while held; nothing moves. _(default for: linear, vercel, raycast, ramp, raindrop, cursor, supabase, attio, resend, agentchat, utilitarian, newspaper)_
- **Press in** `press` — The face shrinks to 97% while held and returns on release. _(default for: stripe, notion, mercury, cashapp, airbnb, figma)_
- **Sink** `sink` — The face drops onto its edge or shadow, like a key. Gumroad, Duolingo. _(default for: posthog, community, learning, indieshop)_
- **Ink** `ink` — A wash spreads from the middle of the control while held. Material. _(default for: apple, mediaapp, gamecompanion)_

### 36. How does content change in place: tabs, filters, pages of results?

_The swap tells people whether they moved sideways, narrowed what they see, or stayed put._

Pattern: [content-swap](patterns/content-swap.md).

- **Cut** `cut` — The new content replaces the old at once. _(default for: raycast, indieshop, utilitarian, newspaper)_
- **Crossfade** `crossfade` — Old and new fade across each other in the same place. _(default for: linear, vercel, stripe, notion, ramp, raindrop, mercury, airbnb, cursor, supabase, attio, resend, agentchat)_
- **Slide by direction** `slide` — Content slides the way the tab moved: from the right for the next, from the left for the previous. _(default for: cashapp, figma, posthog, community, learning)_
- **Resize and settle** `resize` — The container grows or shrinks to fit, then the new content fades in. _(default for: apple, mediaapp, gamecompanion)_

### 37. How does work in progress report itself?

_Waiting is bearable when people can see what is happening and roughly how long is left._

Pattern: [async-progress](patterns/async-progress.md).

- **Inline spinner** `spinner` — A spinner and a status line in the control or row that started the work. Carbon's inline loading. _(default for: raycast, cashapp, community, utilitarian)_
- **Skeleton** `skeleton` — Gray shapes of the result hold its place until it arrives. _(default for: apple, airbnb, mediaapp, learning, indieshop, newspaper)_
- **Progress bar** `progress` — A bar with the percent and the time left, for work that can measure itself. Uploads, exports. _(default for: notion, figma, cursor, gamecompanion)_
- **Step list** `steps` — Named steps tick off as they finish; a failure stops at its step. Deploy logs, agents. _(default for: linear, vercel, stripe, ramp, raindrop, mercury, supabase, posthog, attio, resend, agentchat)_

### 38. How does the app move between pages?

_A page change either cuts, or shows how the new page relates to the one before._

Pattern: [route-transition](patterns/route-transition.md).

- **Cut** `cut` — The new page replaces the old; the shell stays put. _(default for: raycast, indieshop, utilitarian, newspaper)_
- **Fade** `fade` — The content area crossfades under a still shell. _(default for: linear, vercel, stripe, notion, ramp, raindrop, mercury, airbnb, cursor, supabase, attio, resend, agentchat)_
- **Shared axis** `axis` — Forward slides in from the right and back from the left. Material, iOS navigation. _(default for: cashapp, figma, posthog, community, learning)_
- **Continuity** `continuity` — The item you opened grows into the page it opens. _(default for: apple, mediaapp, gamecompanion)_

### 39. How does a change of theme arrive?

_A small moment people repeat: a cut, or a signature._

Pattern: [theme-transition](patterns/theme-transition.md).

- **Cut** `cut` — The palette swaps in one frame. _(default for: linear, vercel, raycast, ramp, raindrop, cursor, supabase, attio, resend, agentchat, indieshop, utilitarian, newspaper)_
- **Crossfade** `fade` — The page fades from one palette to the other. _(default for: stripe, notion, mercury, airbnb)_
- **Circular reveal** `circle` — The new theme spreads in a circle from the toggle. _(default for: apple, cashapp, figma, posthog, community, mediaapp, learning, gamecompanion)_
- **Wipe** `wipe` — The new theme sweeps across the page from one edge.

## Landing

### 40. Landing register?

_The landing may carry a different visual language from the app._

- **Same as app** `same` — The app is the brand. Linear. _(default for: linear, agentchat, mediaapp, gamecompanion, indieshop, utilitarian, newspaper)_
- **Dark showcase** `dark` — Dark landing, light app. Vercel, Raycast, raindrop. _(default for: vercel, raycast, raindrop, cursor, supabase, resend)_
- **Editorial** `editorial` — White, type-led, generous. Stripe. _(default for: stripe, notion, ramp, apple, mercury, attio)_
- **Playful** `playful` — Art-led, characters, color. Consumer. _(default for: cashapp, airbnb, figma, posthog, community, learning)_

### 41. Display type?

_Headlines at 48–72px need their own tracking and weight._

- **Same face, tight** `same` — UI sans at 500, −2% tracking. Linear. _(default for: linear, utilitarian)_
- **Same face, heavy** `heavy` — 600–700, −3% tracking. Punchier. _(default for: vercel, stripe, notion, raycast, ramp, raindrop, airbnb, cursor, supabase, posthog, attio, resend, agentchat, community, gamecompanion, newspaper)_
- **Mono headlines** `mono` — The mono as display. Reads technical.
- **Giant display** `giant` — 96–128px centered product statements. Apple, Cash App. _(default for: apple, mercury, cashapp, figma, mediaapp, learning, indieshop)_

### 42. Headline case?

_Independent of weight; lowercase reads indie and craft-led._

- **As written** `written` — Sentence case as in the copy deck. _(default for: linear, vercel, stripe, notion, raycast, ramp, apple, mercury, cashapp, airbnb, figma, cursor, supabase, posthog, attio, resend, agentchat, community, mediaapp, learning, gamecompanion, indieshop, utilitarian, newspaper)_
- **Lowercase** `lowercase` — The whole headline set lowercase. raindrop. _(default for: raindrop)_

### 43. Hero composition?

_The one screen most visitors see._

- **Headline + product shot** `shot` — Copy above, the app below. Linear. _(default for: linear, vercel, raindrop, cursor, supabase, posthog, attio, agentchat)_
- **Split** `split` — Copy left, visual right. _(default for: stripe, notion, resend, community)_
- **Device frame** `device` — The app inside a laptop or phone. _(default for: raycast, cashapp, learning)_
- **Animated scene** `scene` — A bespoke animated piece is the visual.
- **Typographic** `type` — Headline only, oversized. No visual. _(default for: indieshop, utilitarian, newspaper)_
- **Full-bleed media** `media` — Giant copy followed by an edge-to-edge product or photographic stage. Apple, Airbnb. _(default for: ramp, apple, mercury, airbnb, figma, mediaapp, gamecompanion)_

### 44. Hero motion?

_Motion is the difference between a screenshot and a product that feels alive._

- **Static** `static` — No motion. _(default for: notion, indieshop, utilitarian, newspaper)_
- **Entrance** `entrance` — Staggered fade-up once on load. _(default for: linear, vercel, ramp, airbnb, supabase, attio, resend, agentchat, community)_
- **Ambient** `ambient` — Slow continuous drift: gradients, floating pieces. _(default for: stripe, apple, mercury, cashapp, cursor, posthog, mediaapp, learning)_
- **Scroll-driven** `scroll` — The visual transforms as you scroll. _(default for: raycast, gamecompanion)_
- **Interactive** `interactive` — Responds to the cursor; things walk around. _(default for: figma)_
- **Interactive + scroll** `interactiveScroll` — Responds to the cursor, and collapses into the product as you scroll. raindrop. _(default for: raindrop)_

### 45. Background treatment?

_Sets depth behind the hero without competing with it._

- **Flat** `flat` — Canvas only. _(default for: linear, notion, apple, raindrop, cashapp, airbnb, attio, agentchat, community, learning, indieshop, utilitarian)_
- **Glow** `glow` — Accent-tinted radial gradient. _(default for: stripe, raycast, mediaapp, gamecompanion)_
- **Grid** `grid` — Faint line grid or dot matrix. _(default for: vercel, ramp, cursor, supabase, resend)_
- **Grain** `grain` — Noise texture over a gradient. _(default for: mercury, posthog, newspaper)_
- **Scene** `scene` — Illustrated or 3D backdrop. _(default for: figma)_

### 46. Section rhythm?

_How the page reads below the fold._

- **Alternating** `alternating` — Claim + visual, sides swap each section. Linear. _(default for: linear, stripe, notion, mercury, cursor, attio, agentchat, utilitarian, newspaper)_
- **Bento** `bento` — Grid of cards, each a feature. Apple, Vercel. _(default for: vercel, ramp, airbnb, figma, supabase, posthog, resend, community, learning, indieshop)_
- **Full-bleed** `fullbleed` — Each section a full-width showcase. _(default for: raycast, cashapp, mediaapp)_
- **Sticky scroll** `sticky` — Visual pinned while claims scroll past.
- **Scene chapters** `chapters` — A sticky product stage changes as card-like claims advance. Raindrop, Apple. _(default for: apple, raindrop, gamecompanion)_

### 47. Product shots in frames?

_A frame says 'this is software'; no frame says 'this is the thing itself'._

- **Bare** `none` — Hairline and radius only. Linear. _(default for: linear, vercel, notion, ramp, apple, raindrop, mercury, airbnb, cursor, attio, mediaapp, gamecompanion, indieshop, utilitarian, newspaper)_
- **Browser chrome** `browser` — Three dots and a URL bar. _(default for: stripe, figma, supabase, posthog, resend, agentchat)_
- **Laptop** `laptop` — A MacBook outline. _(default for: raycast)_
- **Phone** `phone` — A phone outline; implies mobile. _(default for: cashapp, community, learning)_

### 48. Floating pieces or characters?

_Personality. The pieces must come from the product, never from a stock set._

- **None** `none` — The product is the only visual. _(default for: linear, vercel, raycast, ramp, apple, cursor, supabase, attio, resend, agentchat, mediaapp, gamecompanion, utilitarian, newspaper)_
- **Floating icons** `icons` — Product objects drift around the hero. _(default for: stripe, airbnb)_
- **Characters** `characters` — Animated figures doing tasks. raindrop. _(default for: notion, raindrop, posthog, learning)_
- **Abstract** `shapes` — Geometric shapes and lines. _(default for: mercury, cashapp, figma, community, indieshop)_

### 49. Proof section?

_What convinces after the hero._

- **Logos** `logos` — 'Trusted by' row. Linear. _(default for: linear, vercel, stripe, notion, figma, cursor, supabase, attio, resend, agentchat)_
- **Numbers** `numbers` — Three big figures. _(default for: raycast, ramp, raindrop, cashapp, posthog, community, mediaapp, learning, gamecompanion)_
- **Quotes** `quotes` — One or three testimonials. _(default for: mercury, airbnb, indieshop, newspaper)_
- **None** `none` —  _(default for: apple, utilitarian)_

### 50. Call to action?

_One decision the visitor makes._

- **Single** `single` — One primary button. _(default for: notion, raycast, cashapp, mediaapp, learning, gamecompanion, indieshop)_
- **Primary + secondary** `pair` — Get started, plus a look-first option. _(default for: linear, vercel, stripe, apple, raindrop, mercury, airbnb, figma, cursor, supabase, posthog, attio, resend, agentchat, community)_
- **Email capture** `email` — Waitlist or sign-up field. _(default for: ramp, utilitarian, newspaper)_

## Export

The choices resolve to `theme.css` (shadcn variable names, light and dark, motion durations and curves, and interaction CSS), `interaction.js` (a dependency-free DOM helper for content, route and theme transitions around real updates), `design-decisions.md` (one line per decision, defaults marked, pattern contracts and host lifecycle duties), and a `components.json` snippet. A walk in the studio also yields `studio-notes.md` (notes, the revisit list, open steps) and `content.json` (the copy with its edits). With a browser: the studio's Export panel, or `bun run export` in `studio/` for the saved walk. Without one: `bun run export -- <stepId>=<optionId> ...`, and record notes and revisit steps in the conversation.
