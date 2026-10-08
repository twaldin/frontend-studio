import type { ArchetypeContent } from "../schema";

/** Commerce: a marketplace where independent makers sell small-batch goods. */
export const COMMERCE_CONTENT: ArchetypeContent = {
  product: { name: "Loomlane", tagline: "Small-batch goods from independent makers." },
  app: {
    nav: [{ label: "Shop" }, { label: "Categories" }, { label: "Orders", badge: 2 }, { label: "Saved" }, { label: "Messages", badge: 3 }, { label: "Settings" }],
    topnav: ["Shop", "Categories", "Orders", "Saved", "Messages"],
    page: { title: "Shop", action: "List an item" },
    stats: [
      {
        label: "Daily sales",
        value: "$18.4K",
        series: [11, 12, 12, 13, 12, 14, 15, 14, 16, 15, 17, 16, 18, 18],
        breakdown: [
          { name: "Ceramics", series: [4, 4, 4, 5, 4, 5, 5, 5, 6, 5, 6, 6, 6, 6] },
          { name: "Textiles", series: [3, 4, 3, 3, 4, 4, 4, 4, 4, 4, 5, 4, 5, 5] },
          { name: "Prints", series: [2, 2, 3, 2, 2, 3, 3, 2, 3, 3, 3, 3, 3, 3] },
          { name: "Jewelry", series: [2, 2, 2, 3, 2, 2, 3, 3, 3, 3, 3, 3, 4, 4] },
        ],
      },
      { label: "Orders", value: "412", series: [270, 288, 301, 295, 320, 333, 341, 338, 360, 371, 380, 392, 401, 412] },
      { label: "Active makers", value: "612", series: [540, 548, 552, 560, 565, 571, 575, 580, 588, 593, 598, 603, 608, 612] },
      { label: "Average rating", value: "4.8", series: [4.6, 4.6, 4.7, 4.6, 4.7, 4.7, 4.7, 4.8, 4.7, 4.8, 4.8, 4.8, 4.8, 4.8] },
    ],
    panel: {
      title: "Updates",
      items: [
        { title: "Your wool throw has shipped", body: "Haldene Textile Co. sent order #4182 on Tuesday. The tracking link is ready.", actions: ["Track parcel", "Message maker"] },
        { title: "A saved vase dropped in price", body: "The ash-glazed bud vase from Kiln Hollow is now $36, down from $42.", actions: ["View item", "Dismiss"] },
      ],
    },
    table: {
      columns: ["Order", "Item", "Maker", "Status", "Total"],
      rows: [
        [{ text: "#4182", kind: "mono" }, { text: "Hand-woven wool throw" }, { text: "Haldene Textile Co.", kind: "muted" }, { text: "Shipped", kind: "status", tone: "ok" }, { text: "$180.00", kind: "num" }],
        [{ text: "#4177", kind: "mono" }, { text: "Speckled stoneware mug" }, { text: "Tern & Clay", kind: "muted" }, { text: "Delivered", kind: "status", tone: "ok" }, { text: "$34.00", kind: "num" }],
        [{ text: "#4169", kind: "mono" }, { text: "Beeswax taper candles" }, { text: "Wick & Thistle", kind: "muted" }, { text: "Packing", kind: "status", tone: "warn" }, { text: "$18.00", kind: "num" }],
        [{ text: "#4163", kind: "mono" }, { text: "Hammered silver ring" }, { text: "Orrin Metalworks", kind: "muted" }, { text: "Delayed", kind: "status", tone: "bad" }, { text: "$72.00", kind: "num" }],
        [{ text: "#4151", kind: "mono" }, { text: "Risograph city map" }, { text: "Press Fennel", kind: "muted" }, { text: "Refunded", kind: "status", tone: "off" }, { text: "$28.00", kind: "num" }],
        [{ text: "#4148", kind: "mono" }, { text: "Waxed canvas tote" }, { text: "Rook & Rope", kind: "muted" }, { text: "Awaiting payment", kind: "status", tone: "unknown" }, { text: "$88.00", kind: "num" }],
      ],
    },
    form: {
      title: "Delivery details",
      fields: [
        { label: "Ship to", kind: "text", placeholder: "Full name and street address" },
        { label: "Delivery", kind: "select", options: ["Standard, 3 to 5 days", "Express, 1 to 2 days", "Pick up from the maker"] },
        { label: "Gift wrap", kind: "switch" },
        { label: "Email me tracking updates", kind: "checkbox" },
      ],
      submit: "Checkout",
      cancel: "Back to cart",
    },
    empty: { title: "No listings match these filters.", body: "Pick another category or turn off a filter to see more pieces.", action: "Clear filters" },
    error: { title: "Your payment didn't go through", detail: "The card was declined. No order was placed and you were not charged.", action: "Try another card" },
    toast: "Added to your cart.",
    dialog: {
      title: "Remove this item from your cart?",
      body: "The speckled stoneware mug goes back on the shelf, and another buyer can claim it.",
      confirm: "Remove",
      cancel: "Keep it",
    },
    prose: {
      title: "Shipping and returns",
      paragraphs: [
        "Every maker ships from their own studio, so a cart with items from three makers arrives as three parcels. Each parcel has its own tracking link.",
        "You can return anything that isn't made to order within 30 days. Made-to-order pieces can be cancelled until the maker starts work.",
      ],
    },
    code: { path: "", lines: [] },
    composer: { placeholder: "Message the maker", send: "Send" },
    search: "Search mugs, linens and prints",
    periods: ["24h", "7d", "30d"],
    items: [
      { title: "Speckled stoneware mug", meta: "Tern & Clay", body: "4.9 (212)", value: "$34", badge: "Bestseller", group: "Ceramics" },
      { title: "Indigo linen napkins", meta: "Haldene Textile Co.", body: "4.7 (58)", value: "$42", badge: "New", group: "Textiles" },
      { title: "Beeswax taper candles", meta: "Wick & Thistle", body: "4.9 (310)", value: "$18", badge: "Bestseller", group: "Home" },
      { title: "Risograph city map", meta: "Press Fennel", body: "4.9 (74)", value: "$28", badge: "New", group: "Prints" },
      { title: "Recycled brass hoops", meta: "Orrin Metalworks", body: "4.8 (143)", value: "$54", badge: "Bestseller", group: "Jewelry" },
      { title: "Walnut-glaze serving bowl", meta: "Tern & Clay", body: "4.8 (96)", value: "$68", badge: "Made to order", group: "Ceramics" },
      { title: "Hand-woven wool throw", meta: "Haldene Textile Co.", body: "5.0 (31)", value: "$180", badge: "Made to order", group: "Textiles" },
      { title: "Botanical linocut, framed", meta: "Fenn Studio", body: "4.8 (47)", value: "$96", badge: "New", group: "Prints" },
      { title: "Hammered silver ring", meta: "Orrin Metalworks", body: "4.9 (65)", value: "$72", badge: "Made to order", group: "Jewelry" },
      { title: "Oak serving board", meta: "Birchwright", body: "4.8 (88)", value: "$58", badge: "Bestseller", group: "Home" },
      { title: "Ash-glazed bud vase", meta: "Kiln Hollow", body: "4.6 (22)", value: "$36", badge: "New", group: "Ceramics" },
      { title: "Waxed canvas tote", meta: "Rook & Rope", body: "4.7 (119)", value: "$88", badge: "Bestseller", group: "Textiles" },
    ],
    thread: [
      { author: "Tern & Clay", text: "Thanks for your order. Do you want the mug in the speckled white or the oat glaze?", time: "10:42" },
      { author: "You", text: "Oat, please. Is it dishwasher safe?", mine: true, time: "10:44" },
      { author: "Tern & Clay", text: "Yes, dishwasher and microwave safe. I ship on Thursday and will post the tracking link here.", time: "10:51" },
      { author: "You", text: "Perfect, thank you.", mine: true, time: "10:52" },
    ],
  },
  landing: {
    nav: ["Shop", "Makers", "Sell", "Journal"],
    cta: "Start shopping",
    ctaSecondary: "Open a shop",
    emailPlaceholder: "you@example.com",
    h1: "Buy directly from the person who made it.",
    sub: "Loomlane lists ceramics, textiles, prints and jewelry from independent makers. Every order ships from the maker's own studio.",
    sections: [
      { eyebrow: "Makers", title: "Every listing comes from one studio.", body: "A shop page shows who made the piece, where it ships from and how long a made-to-order item takes." },
      { eyebrow: "Orders", title: "Track each parcel on its own.", body: "A cart with three makers ships as three parcels. Each one has its own tracking link and its own return window." },
      { eyebrow: "Messages", title: "Ask the maker before you buy.", body: "Message a shop about glaze colors, sizes or custom orders. The reply stays attached to your order." },
    ],
    proof: {
      logos: ["Tern & Clay", "Haldene", "Orrin Metalworks", "Press Fennel", "Wick & Thistle", "Birchwright"],
      numbers: [
        { value: "612", label: "active makers" },
        { value: "4.8", label: "average rating" },
        { value: "4 days", label: "median delivery" },
      ],
      quotes: [{ text: "I used to spend every weekend at craft fairs. Now I fire the kiln on Monday and pack boxes on Thursday.", who: "Marisol Ortega, potter at Tern & Clay" }],
    },
    footer: "© Loomlane. All rights reserved.",
  },
};
