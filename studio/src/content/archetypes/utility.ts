import type { ArchetypeContent } from "../schema";

/**
 * Utility: a unit and currency converter used in seconds.
 * The home reads `items` by group: "Presets" (title is `FROM → TO`, meta is the category, which the home knows as Currency, Length, Weight or Volume),
 * "Shortcuts" (title is the action, badge is the key combination, such as `mod+e`) and everything else as conversion history (badge is the category).
 */
export const UTILITY_CONTENT: ArchetypeContent = {
  product: { name: "Kilter", tagline: "Convert units and currencies in a keystroke." },
  app: {
    nav: [{ label: "Convert" }, { label: "History" }, { label: "Favorites", badge: 6 }, { label: "Rates" }, { label: "Shortcuts" }, { label: "Settings" }],
    topnav: ["Convert", "History", "Favorites", "Rates", "Settings"],
    page: { title: "Convert", action: "Save favorite" },
    stats: [
      { label: "EUR to USD", value: "1.0842", note: "+0.2% this week", series: [1.062, 1.064, 1.061, 1.066, 1.069, 1.067, 1.071, 1.074, 1.072, 1.077, 1.079, 1.081, 1.083, 1.0842] },
      { label: "GBP to USD", value: "1.2631", note: "+0.1% this week", series: [1.248, 1.251, 1.249, 1.253, 1.255, 1.252, 1.256, 1.258, 1.257, 1.26, 1.259, 1.261, 1.262, 1.2631] },
      { label: "USD to JPY", value: "151.40", note: "-0.3% this week", series: [149.8, 150.2, 150.6, 150.1, 150.9, 151.3, 151.0, 151.8, 152.1, 151.6, 151.2, 151.5, 151.9, 151.4] },
      { label: "Conversions today", value: "38", note: "Most used: USD to EUR", series: [22, 31, 27, 35, 29, 41, 33, 38, 26, 34, 39, 30, 36, 38] },
    ],
    panel: {
      title: "Pinned",
      items: [
        { title: "USD to EUR", body: "250 USD is 230.58 EUR at today's rate. Open it to change the amount.", actions: ["Open", "Unpin"] },
        { title: "Pounds to kilograms", body: "180 lb is 81.65 kg. You converted this pair three times this week.", actions: ["Open", "Unpin"] },
      ],
    },
    table: {
      columns: ["From", "To", "Result", "Source", "When"],
      rows: [
        [{ text: "250 USD", kind: "mono" }, { text: "EUR", kind: "muted" }, { text: "230.58", kind: "num" }, { text: "Live rate", kind: "status", tone: "ok" }, { text: "2 min ago", kind: "muted" }],
        [{ text: "12.5 mi", kind: "mono" }, { text: "km", kind: "muted" }, { text: "20.12", kind: "num" }, { text: "Exact", kind: "status", tone: "off" }, { text: "14 min ago", kind: "muted" }],
        [{ text: "3 cup", kind: "mono" }, { text: "ml", kind: "muted" }, { text: "709.76", kind: "num" }, { text: "Exact", kind: "status", tone: "off" }, { text: "1 h ago", kind: "muted" }],
        [{ text: "1,000 JPY", kind: "mono" }, { text: "USD", kind: "muted" }, { text: "6.61", kind: "num" }, { text: "Cached rate", kind: "status", tone: "warn" }, { text: "Yesterday", kind: "muted" }],
        [{ text: "180 lb", kind: "mono" }, { text: "kg", kind: "muted" }, { text: "81.65", kind: "num" }, { text: "Exact", kind: "status", tone: "off" }, { text: "Yesterday", kind: "muted" }],
        [{ text: "5 gal", kind: "mono" }, { text: "L", kind: "muted" }, { text: "18.93", kind: "num" }, { text: "Exact", kind: "status", tone: "off" }, { text: "2 d ago", kind: "muted" }],
      ],
    },
    form: {
      title: "Save favorite",
      fields: [
        { label: "Name", kind: "text", placeholder: "Flour, cups to milliliters" },
        { label: "Category", kind: "select", options: ["Currency", "Length", "Weight", "Volume"] },
        { label: "Pin to the top of Convert", kind: "switch" },
        { label: "Refresh with live rates", kind: "checkbox" },
      ],
      submit: "Save favorite",
      cancel: "Cancel",
    },
    empty: { title: "No conversions yet.", body: "Type an amount and pick two units. Your last conversions will appear here.", action: "Start converting" },
    error: { title: "Rates are out of date", detail: "The rate service hasn't answered since 14:02, so currency results use the last saved rates.", action: "Refresh rates" },
    toast: "Result copied: 230.58 EUR.",
    dialog: { title: "Clear history?", body: "This removes 38 conversions from this device. Your favorites are kept.", confirm: "Clear history", cancel: "Cancel" },
    prose: {
      title: "How rates are updated",
      paragraphs: [
        "Currency rates refresh every five minutes while Kilter is open and are saved for offline use. A result made from a saved rate is marked Cached.",
        "Length, weight and volume use exact factors, so those results never change.",
      ],
    },
    code: { path: "", lines: [] },
    composer: { placeholder: "Type 250 usd in eur", send: "Convert" },
    search: "Search units and currencies",
    periods: ["24h", "7d", "30d"],
    items: [
      { title: "250 USD → EUR", meta: "Live rate · 2 min ago", value: "230.58 EUR", badge: "Currency", group: "History" },
      { title: "12.5 mi → km", meta: "Exact · 14 min ago", value: "20.12 km", badge: "Length", group: "History" },
      { title: "3 cup → ml", meta: "Exact · 1 h ago", value: "709.76 ml", badge: "Volume", group: "History" },
      { title: "1,000 JPY → USD", meta: "Cached rate · Yesterday", value: "6.61 USD", badge: "Currency", group: "History" },
      { title: "USD → EUR", meta: "Currency", group: "Presets" },
      { title: "mi → km", meta: "Length", group: "Presets" },
      { title: "lb → kg", meta: "Weight", group: "Presets" },
      { title: "cup → ml", meta: "Volume", group: "Presets" },
      { title: "Pick units", meta: "Anywhere in the app", badge: "mod+k", group: "Shortcuts" },
      { title: "Swap", meta: "Anywhere in the app", badge: "mod+e", group: "Shortcuts" },
      { title: "Copy result", meta: "Anywhere in the app", badge: "mod+shift+c", group: "Shortcuts" },
      { title: "Save favorite", meta: "Anywhere in the app", badge: "mod+d", group: "Shortcuts" },
    ],
    thread: [
      { author: "You", text: "How many cups is 500 ml?", mine: true, time: "11:02" },
      { author: "Kilter", text: "500 ml is 2.11 cups.", time: "11:02" },
      { author: "You", text: "And in fluid ounces?", mine: true, time: "11:03" },
      { author: "Kilter", text: "500 ml is 16.91 fluid ounces.", time: "11:03" },
    ],
  },
  landing: {
    nav: ["Features", "Rates", "Pricing", "Changelog"],
    cta: "Download Kilter",
    ctaSecondary: "Try it in the browser",
    emailPlaceholder: "you@example.com",
    h1: "Convert anything in a keystroke.",
    sub: "Kilter converts units and currencies as you type, keeps the last rates for offline use, and gets out of your way.",
    sections: [
      { eyebrow: "Convert", title: "Type an amount. See the result.", body: "Pick two units, or type 250 usd in eur. The result updates with every key and copies with one shortcut." },
      { eyebrow: "Rates", title: "Currency rates with a timestamp.", body: "Rates refresh every five minutes and are saved for offline use. Every result says whether it used a live rate or a cached one." },
      { eyebrow: "Favorites", title: "Pin the conversions you repeat.", body: "Save a pair like cups to milliliters or pounds to kilograms. Favorites sit above your history and open with a single key." },
    ],
    proof: {
      logos: ["Pinecrest Bakery", "Tidewater Logistics", "Orchard Row", "Northgate Labs", "Copperline Travel", "Fieldstone Design"],
      numbers: [
        { value: "1.2M", label: "conversions a week" },
        { value: "5 min", label: "between rate refreshes" },
        { value: "310", label: "units and currencies" },
      ],
      quotes: [{ text: "I used to open a spreadsheet to price in euros. Now I press one key and paste the result.", who: "Priya Nair, buyer at Orchard Row" }],
    },
    footer: "© Kilter. All rights reserved.",
  },
};
