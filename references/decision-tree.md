# Visual decision tree

Generated from `studio/src/tree/steps.ts`; edit there. Ask in this order. Each step lists the options and what every reference product picks, so a text-only run can still say "Linear's default is X".

## Base

### 1. Which product is the reference?

_Every later step defaults to what this product does. You confirm or deviate._

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

### 2. Which typeface?

_Carries 70–95% of rendered characters. Everything else is tuned to it._

- **Inter** `inter` — The default of the field. Neutral, huge x-height, great at 13px. _(default for: linear, stripe, notion, raycast, ramp, raindrop, figma, supabase, posthog, attio)_
- **Geist** `geist` — Vercel's. Slightly narrower and warmer than Inter. _(default for: vercel, cursor, resend)_
- **IBM Plex Sans** `plex` — More character, wider. Reads editorial.
- **Instrument Sans** `instrument` — Geometric, friendly. Consumer feel. _(default for: mercury)_
- **System** `system` — SF on Mac, Segoe on Windows. Zero bytes, native feel. _(default for: apple, cashapp, airbnb)_

### 3. Which mono, for identifiers and code?

_Appears in paths, ids, timestamps, code blocks. Must pair with the sans._

- **Geist Mono** `geist-mono` — Pairs with Inter and Geist. _(default for: linear, vercel, ramp, raindrop, cursor, attio, resend)_
- **JetBrains Mono** `jetbrains` — Taller, more distinct glyphs. Reads as code. _(default for: stripe, raycast, figma, supabase, posthog)_
- **IBM Plex Mono** `plex-mono` — Pairs with Plex Sans; slab-ish.
- **System mono** `system-mono` — SF Mono / Consolas. Zero bytes. _(default for: notion, apple, mercury, cashapp, airbnb)_

### 4. Neutral temperature?

_The gray scale is 90% of every screen. Temperature sets the whole mood._

- **Cool** `cool` — Blue-tinted gray. Linear, Stripe. Reads technical. _(default for: linear, stripe, supabase)_
- **Neutral** `neutral` — True gray. Vercel. Reads exact. _(default for: vercel, raycast, ramp, apple, raindrop, cashapp, figma, attio, resend)_
- **Warm** `warm` — Sand/stone. Notion. Reads calm, paper-like. _(default for: notion, mercury, airbnb, cursor, posthog)_
- **Tinted** `tinted` — Mauve, carries a hint of the accent. Reads designed.

### 5. Contrast level?

_Linear generates its theme from base, accent and contrast. This is the third knob._

- **Soft** `soft` — Tinted canvas, faint borders. Quieter, lower AA margin. _(default for: notion, mercury, airbnb)_
- **Standard** `standard` — White canvas, step-6 borders. The field default. _(default for: linear, vercel, stripe, raycast, raindrop, cursor, supabase, posthog)_
- **High** `high` — Pure white/black, strong borders. Accessibility variant. _(default for: ramp, apple, cashapp, figma, attio, resend)_

### 6. One accent?

_Buttons, links, focus, selection. One hue; status colors are separate._

- **Indigo** `indigo` — Linear. _(default for: linear)_
- **Blue** `blue` — Safe, expected. _(default for: notion, apple)_
- **Violet** `violet` — Stripe. _(default for: stripe)_
- **Teal** `teal` — Distinct from status green.
- **Green** `green` — Reads 'go'; collides with success. _(default for: ramp, raindrop, cashapp, supabase)_
- **Orange** `orange` — Warm, energetic. _(default for: mercury, figma, posthog)_
- **Crimson** `crimson` — Raycast. _(default for: raycast, airbnb)_
- **Neutral** `neutral` — Black/white primary. Vercel, Notion. _(default for: vercel, cursor, attio, resend)_

### 7. Corner radius?

_One value drives controls, cards and menus. Sets tone more than hue does._

- **4px** `sharp` — Crisp, tool-like. _(default for: notion, ramp, attio)_
- **6px** `medium` — Linear, Vercel. _(default for: linear, vercel, raindrop, cursor, supabase, resend)_
- **8px** `round` — Stripe, Raycast. _(default for: stripe, raycast, mercury, figma, posthog)_
- **10px** `soft` — Consumer, friendly.
- **16px** `pill` — Consumer and mobile surfaces with visibly rounded controls. _(default for: apple, cashapp, airbnb)_

### 8. Depth by border or shadow?

_Decides how panels, menus and cards separate from the canvas._

- **Hairlines** `hairline` — 1px borders, no shadows except menus. Linear. _(default for: linear, notion, ramp, raindrop, figma, cursor, supabase, posthog, attio, resend)_
- **Hairlines + soft shadow** `soft` — Borders plus a 1–2px shadow on cards. Vercel. _(default for: vercel, raycast, apple, cashapp, airbnb)_
- **Shadows** `shadow` — Layered shadows, faint borders. Stripe. _(default for: stripe, mercury)_

### 9. Which themes ship?

_Dark mode is a full second palette and doubles the review surface._

- **Light and dark** `both` — Both first-class; system default. _(default for: linear, vercel, notion, cashapp, figma, supabase, posthog, attio)_
- **Light only** `light` —  _(default for: stripe, ramp, apple, mercury, airbnb)_
- **Dark only** `dark` — Raycast. _(default for: raycast, raindrop, cursor, resend)_

## App

### 10. App density?

_Chrome size, control height and row height move together._

- **Compact** `compact` — 13px chrome, 14px body, 28px controls. Linear. _(default for: linear, raycast, ramp, raindrop, cursor, supabase, posthog, resend)_
- **Standard** `standard` — 14px chrome, 15px body, 32px controls. Vercel, Stripe. _(default for: vercel, stripe, figma, attio)_
- **Comfortable** `comfortable` — 15px chrome, 16px body, 36px controls. Notion. _(default for: notion, apple, mercury, cashapp, airbnb)_

### 11. Spacing unit?

_Padding and gaps everywhere scale from one unit. Notion is airy; Linear is tight._

- **Tight** `tight` — 3.5px unit. Dense operator tools. Linear. _(default for: linear, raindrop, cursor, supabase, resend)_
- **Regular** `regular` — 4px unit. The field default. _(default for: vercel, stripe, raycast, ramp, figma, posthog, attio)_
- **Airy** `airy` — 5px unit. Generous, document-like. Notion. _(default for: notion, apple, mercury, cashapp, airbnb)_

### 12. App shell?

_The one layout decision every screen inherits._

- **Sidebar** `sidebar` — Grouped left nav, content fills. Linear, Stripe. _(default for: linear, stripe, notion, raycast, raindrop, cursor, supabase, posthog, attio)_
- **Top nav** `topnav` — Horizontal tabs, centered content. Vercel. _(default for: vercel, ramp, apple, mercury, cashapp, airbnb, figma, resend)_
- **Sidebar + top bar** `both` — Nav left, context and search on top.

### 13. Sidebar tone?

_Linear made theirs a few notches dimmer so content wins._

- **Same as canvas** `same` — Separated by a hairline only. _(default for: vercel, stripe, ramp, apple, mercury, cashapp, airbnb, figma, attio, resend)_
- **Subtle step** `tinted` — The scale's step 2 in both themes: darker in light, lighter in dark. Notion. _(default for: notion, raycast, posthog)_
- **Dimmer** `dimmer` — Darker in both themes; dark-mode content reads as a raised panel. Linear. _(default for: linear, raindrop, cursor, supabase)_
- **Dark** `dark` — Dark rail in light mode. Slack-like.

### 14. Does the sidebar collapse?

_Decides how much screen the content can take and whether nav needs icons._

- **Fixed** `fixed` — Always expanded. Stripe. _(default for: vercel, stripe, ramp, apple, mercury, cashapp, airbnb, figma, resend)_
- **Hide** `hide` — A toggle hides it fully; nothing on hover. Linear. _(default for: linear, attio)_
- **Hide, peek on hover** `peek` — Hidden; hovering the left edge slides it over the content. Notion. _(default for: notion)_
- **Icon rail** `rail` — Collapses to a 48px rail; icons are the nav, labels as tooltips. VS Code, Slack. _(default for: raycast, raindrop, cursor, supabase, posthog)_
- **Icon rail, expands on hover** `railExpand` — The rail widens over the content when hovered. Supabase.

### 15. Icons in the nav?

_Icons speed scanning and add visual weight; text-only reads calmer._

- **Icons** `icons` — Icon before every item. Linear, Stripe, Notion. _(default for: linear, stripe, notion, raycast, raindrop, cashapp, airbnb, figma, cursor, supabase, posthog, attio)_
- **Text only** `text` — Labels only. Vercel. _(default for: vercel, ramp, apple, mercury, resend)_

### 16. Page title scale?

_Decides whether a page reads as a tool view or a document._

- **Toolbar** `toolbar` — Title in a 40px bar, 14px medium, actions inline. Linear. _(default for: linear, raycast, ramp, raindrop, cursor, supabase, posthog, attio, resend)_
- **Standard** `standard` — 22px title over the content, actions right. Vercel, Stripe. _(default for: vercel, stripe, airbnb)_
- **Display** `display` — 36px title, document-like, generous. Notion. _(default for: notion, apple, mercury, cashapp, figma)_

### 17. Key figures?

_The most-read numbers on the home screen._

- **Strip** `strip` — Hairline-separated columns, no containers. Linear. _(default for: linear, raycast, ramp, raindrop, cursor, supabase, posthog, resend)_
- **Cards** `cards` — Each figure in its own card. Stripe, Vercel. _(default for: vercel, stripe, apple, cashapp, airbnb)_
- **Inline** `inline` — One line of label–value pairs under the title. Notion. _(default for: notion, mercury, figma, attio)_

### 18. Figures over time?

_Whether Home shows where a number is going, not just where it is._

- **None** `none` — The figure only. Linear, Notion. _(default for: linear, notion, raycast, apple, cashapp, airbnb, figma, cursor, attio, resend)_
- **Sparkline** `sparkline` — A small line beside each value.
- **Area** `area` — A filled area under each figure. Vercel. _(default for: vercel, ramp, mercury)_
- **One chart** `chart` — The first figure as a 180px chart, the rest in a row beside it. Stripe. _(default for: stripe, raindrop, supabase, posthog)_
- **Chart panel** `panel` — Figures on top, then a 220px chart with period tabs, axis and a crosshair callout. Analytics-style.
- **Stacked by entity** `stacked` — The chart panel, with the first figure split into its entities as a stacked area and a legend; the top edge is the total.

### 19. Table style?

_Most operator screens are tables._

- **Hairline rows** `hairline` — 1px rules, no fills. Linear, GitHub. _(default for: linear, vercel, stripe, raycast, raindrop, cursor, supabase, posthog, resend)_
- **Zebra** `zebra` — Alternating tint, no rules.
- **Borderless** `borderless` — Space only, hover fill. Notion. _(default for: notion, ramp, apple, mercury, cashapp, airbnb, figma, attio)_

### 20. Row hover?

_Fill says rows are targets; none says the table is for reading._

- **Fill** `fill` — Rows tint on hover and the cursor is a pointer. Linear, Notion. _(default for: linear, stripe, notion, raycast, ramp, raindrop, mercury, figma, cursor, supabase, posthog, attio, resend)_
- **None** `none` — No hover state on rows. Vercel. _(default for: vercel, apple, cashapp, airbnb)_

### 21. Card style?

_Panels, forms and cards share one treatment._

- **Bordered** `hairline` — 1px border; carries whatever shadow the depth step chose. Linear, Vercel, Stripe. _(default for: linear, vercel, stripe, attio, resend)_
- **Filled** `fill` — Translucent fill, no border. Notion, Raycast. _(default for: notion, raycast, ramp, apple, raindrop, mercury, cashapp, airbnb, figma, cursor, supabase, posthog)_

### 22. Input style?

_Every form and the composer._

- **Outlined** `outlined` — 1px border, canvas background. Linear, Vercel. _(default for: linear, vercel, stripe, attio, resend)_
- **Filled** `filled` — Muted background, no border. Notion, Raycast. _(default for: notion, raycast, ramp, apple, raindrop, mercury, cashapp, airbnb, figma, cursor, supabase, posthog)_
- **Underline** `underline` — Bottom rule only. Editorial.

### 23. Button style?

_Primary is the most-clicked pixel in the product._

- **Filled + ghost** `filled` — Solid accent primary, ghost secondary. Linear. _(default for: linear, stripe, notion, ramp, apple, mercury, cashapp, airbnb, figma, attio)_
- **Outline-first** `outline` — Hairline buttons, filled only for the one CTA. Vercel. _(default for: vercel, resend)_
- **Soft** `soft` — Tinted accent background, accent text. Notion, Raycast. _(default for: raycast, raindrop, cursor, supabase, posthog)_

### 24. Icon weight?

_Stroke width sets how loud icons are next to 13–15px text._

- **Light** `light` — 1.5px stroke. Linear, Notion. _(default for: linear, notion, raindrop, mercury, cursor, supabase, attio, resend)_
- **Regular** `regular` — 2px stroke. Vercel, Stripe. _(default for: vercel, stripe, ramp, apple, cashapp, airbnb, figma, posthog)_
- **Tiles** `tiles` — Icons in small filled rounded tiles. Raycast. _(default for: raycast)_

### 25. Menu items?

_Menus and command lists are where keyboard users live._

- **Icons + shortcuts** `hints` — Icon left, shortcut right. Linear, Raycast. _(default for: linear, raycast, raindrop, figma, cursor, supabase, posthog, attio)_
- **Plain** `plain` — Text only. Vercel, Stripe. _(default for: vercel, stripe, notion, ramp, apple, mercury, cashapp, airbnb, resend)_

### 26. App motion?

_None on keyboard and many-times-a-day paths; the question is everything else._

- **None** `none` — Instant. Raycast. _(default for: raycast)_
- **Minimal** `minimal` — ≤150ms fades on menus and dialogs. Linear. _(default for: linear, vercel, stripe, notion, ramp, raindrop, mercury, airbnb, cursor, supabase, attio, resend)_
- **Expressive** `expressive` — Springs on overlays and layout. Consumer. _(default for: apple, cashapp, figma, posthog)_

## Landing

### 27. Landing register?

_The landing may carry a different visual language from the app._

- **Same as app** `same` — The app is the brand. Linear. _(default for: linear)_
- **Dark showcase** `dark` — Dark landing, light app. Vercel, Raycast, raindrop. _(default for: vercel, raycast, raindrop, cursor, supabase, resend)_
- **Editorial** `editorial` — White, type-led, generous. Stripe. _(default for: stripe, notion, ramp, apple, mercury, attio)_
- **Playful** `playful` — Art-led, characters, color. Consumer. _(default for: cashapp, airbnb, figma, posthog)_

### 28. Display type?

_Headlines at 48–72px need their own tracking and weight._

- **Same face, tight** `same` — UI sans at 500, −2% tracking. Linear. _(default for: linear)_
- **Same face, heavy** `heavy` — 600–700, −3% tracking. Punchier. _(default for: vercel, stripe, notion, raycast, ramp, raindrop, airbnb, cursor, supabase, posthog, attio, resend)_
- **Mono headlines** `mono` — The mono as display. Reads technical.
- **Giant display** `giant` — 96–128px centered product statements. Apple, Cash App. _(default for: apple, mercury, cashapp, figma)_

### 29. Headline case?

_Independent of weight; lowercase reads indie and craft-led._

- **As written** `written` — Sentence case as in the copy deck. _(default for: linear, vercel, stripe, notion, raycast, ramp, apple, mercury, cashapp, airbnb, figma, cursor, supabase, posthog, attio, resend)_
- **Lowercase** `lowercase` — The whole headline set lowercase. raindrop. _(default for: raindrop)_

### 30. Hero composition?

_The one screen most visitors see._

- **Headline + product shot** `shot` — Copy above, the app below. Linear. _(default for: linear, vercel, raindrop, cursor, supabase, posthog, attio)_
- **Split** `split` — Copy left, visual right. _(default for: stripe, notion, resend)_
- **Device frame** `device` — The app inside a laptop or phone. _(default for: raycast, cashapp)_
- **Animated scene** `scene` — A bespoke animated piece is the visual.
- **Typographic** `type` — Headline only, oversized. No visual.
- **Full-bleed media** `media` — Giant copy followed by an edge-to-edge product or photographic stage. Apple, Airbnb. _(default for: ramp, apple, mercury, airbnb, figma)_

### 31. Hero motion?

_Motion is the difference between a screenshot and a product that feels alive._

- **Static** `static` — No motion. _(default for: notion)_
- **Entrance** `entrance` — Staggered fade-up once on load. _(default for: linear, vercel, ramp, airbnb, supabase, attio, resend)_
- **Ambient** `ambient` — Slow continuous drift: gradients, floating pieces. _(default for: stripe, apple, mercury, cashapp, cursor, posthog)_
- **Scroll-driven** `scroll` — The visual transforms as you scroll. _(default for: raycast)_
- **Interactive** `interactive` — Responds to the cursor; things walk around. _(default for: figma)_
- **Interactive + scroll** `interactiveScroll` — Responds to the cursor, and collapses into the product as you scroll. raindrop. _(default for: raindrop)_

### 32. Background treatment?

_Sets depth behind the hero without competing with it._

- **Flat** `flat` — Canvas only. _(default for: linear, notion, apple, raindrop, cashapp, airbnb, attio)_
- **Glow** `glow` — Accent-tinted radial gradient. _(default for: stripe, raycast)_
- **Grid** `grid` — Faint line grid or dot matrix. _(default for: vercel, ramp, cursor, supabase, resend)_
- **Grain** `grain` — Noise texture over a gradient. _(default for: mercury, posthog)_
- **Scene** `scene` — Illustrated or 3D backdrop. _(default for: figma)_

### 33. Section rhythm?

_How the page reads below the fold._

- **Alternating** `alternating` — Claim + visual, sides swap each section. Linear. _(default for: linear, stripe, notion, mercury, cursor, attio)_
- **Bento** `bento` — Grid of cards, each a feature. Apple, Vercel. _(default for: vercel, ramp, airbnb, figma, supabase, posthog, resend)_
- **Full-bleed** `fullbleed` — Each section a full-width showcase. _(default for: raycast, cashapp)_
- **Sticky scroll** `sticky` — Visual pinned while claims scroll past.
- **Scene chapters** `chapters` — A sticky product stage changes as card-like claims advance. Raindrop, Apple. _(default for: apple, raindrop)_

### 34. Product shots in frames?

_A frame says 'this is software'; no frame says 'this is the thing itself'._

- **Bare** `none` — Hairline and radius only. Linear. _(default for: linear, vercel, notion, ramp, apple, raindrop, mercury, airbnb, cursor, attio)_
- **Browser chrome** `browser` — Three dots and a URL bar. _(default for: stripe, figma, supabase, posthog, resend)_
- **Laptop** `laptop` — A MacBook outline. _(default for: raycast)_
- **Phone** `phone` — A phone outline; implies mobile. _(default for: cashapp)_

### 35. Floating pieces or characters?

_Personality. The pieces must come from the product, never from a stock set._

- **None** `none` — The product is the only visual. _(default for: linear, vercel, raycast, ramp, apple, cursor, supabase, attio, resend)_
- **Floating icons** `icons` — Product objects drift around the hero. _(default for: stripe, airbnb)_
- **Characters** `characters` — Animated figures doing tasks. raindrop. _(default for: notion, raindrop, posthog)_
- **Abstract** `shapes` — Geometric shapes and lines. _(default for: mercury, cashapp, figma)_

### 36. Proof section?

_What convinces after the hero._

- **Logos** `logos` — 'Trusted by' row. Linear. _(default for: linear, vercel, stripe, notion, figma, cursor, supabase, attio, resend)_
- **Numbers** `numbers` — Three big figures. _(default for: raycast, ramp, raindrop, cashapp, posthog)_
- **Quotes** `quotes` — One or three testimonials. _(default for: mercury, airbnb)_
- **None** `none` —  _(default for: apple)_

### 37. Call to action?

_One decision the visitor makes._

- **Single** `single` — One primary button. _(default for: notion, raycast, cashapp)_
- **Primary + secondary** `pair` — Get started, plus a look-first option. _(default for: linear, vercel, stripe, apple, raindrop, mercury, airbnb, figma, cursor, supabase, posthog, attio, resend)_
- **Email capture** `email` — Waitlist or sign-up field. _(default for: ramp)_

## Export

The choices resolve to `theme.css` (shadcn variable names, light and dark), `design-decisions.md` (one line per step, defaults marked), and a `components.json` snippet. With a browser: the studio's Export panel. Without: `bun run export -- <stepId>=<optionId> ...` in `studio/`.
