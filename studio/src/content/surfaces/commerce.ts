import type { Archetype } from "@/tree/types";
import type { Item, Surfaces } from "../schema";
import { surfaceMap } from "./seeds";

const CATALOG: Record<Exclude<Archetype, "commerce">, { title: string; action: string; listings: Item[] }> = {
  workspace: { title: "Service add-ons", action: "Manage plan", listings: [
    { title: "Log retention", meta: "Relay · 30-day retention", value: "$12 / mo", body: "Keep deploy and request logs available for a longer investigation window.", group: "Operations" },
    { title: "Backup storage", meta: "Relay · 100 GB", value: "$8 / mo", body: "Store scheduled backups with a visible restore history.", group: "Storage" },
    { title: "Team seats", meta: "Relay · 5 seats", value: "$25 / mo", body: "Give a small team shared service and incident access.", badge: "Popular", group: "Team" },
    { title: "Extended metrics", meta: "Relay · 90-day history", value: "$16 / mo", body: "Compare a service's current behavior with earlier release cycles.", group: "Operations" },
  ] },
  feed: { title: "Community shop", action: "View purchases", listings: [
    { title: "Proofing notebook", meta: "Porchlight makers · 48 pages", value: "$12", body: "Record flour, hydration and proof time for each loaf.", group: "Baking" },
    { title: "Balcony garden labels", meta: "Hana's studio · Set of 12", value: "$9", body: "Reusable plant markers for a small container garden.", badge: "New", group: "Gardening" },
    { title: "Short story zine", meta: "Community press · Issue 3", value: "$8", body: "A collection of original stories from community writers.", group: "Writing" },
    { title: "Ceramic glaze cards", meta: "Kiln notes · Set of 20", value: "$14", body: "Printed reference cards for organizing your own glaze samples.", group: "Ceramics" },
  ] },
  reader: { title: "Course library", action: "View access", listings: [
    { title: "At the market", meta: "Tessel · Portuguese · 6 lessons", value: "$8", body: "Practice greetings, quantities and prices in short dialogues.", badge: "Popular", group: "Courses" },
    { title: "Getting around", meta: "Tessel · Portuguese · 4 lessons", value: "$6", body: "Buy a ticket, ask for directions and read a timetable.", group: "Courses" },
    { title: "The baker who never sleeps", meta: "Tessel readers · Graded story", value: "$3", body: "A morning at Rosa's bakery, with a small vocabulary guide.", group: "Stories" },
    { title: "Everyday listening", meta: "Tessel · Audio practice pack", value: "$10", body: "Short recordings paired with transcripts and practice questions.", badge: "New", group: "Practice" },
  ] },
  media: { title: "Artist store", action: "View purchases", listings: [
    { title: "Night Shift", meta: "Mirabel Ashe · Digital album", value: "$9", body: "Eleven slow synth pieces, with notes from the recording sessions.", badge: "New", group: "Albums" },
    { title: "Paper Lanterns", meta: "Juno Vasquez · Digital album", value: "$8", body: "The complete release with a downloadable track list.", group: "Albums" },
    { title: "Field Notes booklet", meta: "Dr. Imani Cole · PDF companion", value: "$5", body: "Species notes for the tide pool episode and further reading.", group: "Companions" },
    { title: "Harbor Lights Live", meta: "The Quiet Harbors · Live recording", value: "$12", body: "The full concert recording with a set list.", group: "Live" },
  ] },
  companion: { title: "Item shop", action: "View wallet", listings: [
    { title: "Ember Charm", meta: "Hollowmere · Consumable", value: "120 gold", body: "A temporary experience bonus for your next run.", group: "Supplies" },
    { title: "Hollow Rations", meta: "Hollowmere · Pack of 12", value: "240 gold", body: "Restores health between encounters.", group: "Supplies" },
    { title: "Lantern skin", meta: "Hollowmere · Cosmetic", value: "40 gems", body: "Change the lantern's appearance without changing its stats.", badge: "New", group: "Cosmetics" },
    { title: "Warden banner", meta: "Hollowmere · Clan decoration", value: "80 crests", body: "A decoration for the clan hall.", group: "Clan" },
  ] },
  canvas: { title: "Template library", action: "Manage templates", listings: [
    { title: "Welcome flow", meta: "Tilework · 6 editable frames", value: "$12", body: "A blank onboarding sequence with flow-note slots.", badge: "Popular", group: "Flows" },
    { title: "Review board", meta: "Tilework · Team template", value: "$8", body: "A board organized around open questions and accepted changes.", group: "Boards" },
    { title: "Form components", meta: "Tilework · 24 editable parts", value: "$15", body: "Input, help and validation slots for building your own forms.", group: "Components" },
    { title: "Journey map", meta: "Tilework · Workshop template", value: "$10", body: "Map tasks, observations and handoffs without a fixed product layout.", badge: "New", group: "Boards" },
  ] },
  conversation: { title: "Agent library", action: "Manage access", listings: [
    { title: "Analysis assistant", meta: "Plover · Monthly access", value: "$12 / mo", body: "Work through tables and ask for measured comparisons.", group: "Analysis" },
    { title: "Writing assistant", meta: "Plover · Monthly access", value: "$8 / mo", body: "Revise a supplied draft while retaining its source context.", group: "Writing" },
    { title: "Team thread pack", meta: "Plover · 5 shared seats", value: "$20 / mo", body: "Invite teammates to the same tool calls and results.", badge: "Popular", group: "Team" },
    { title: "Document assistant", meta: "Plover · Monthly access", value: "$10 / mo", body: "Compare supplied documents and retain links to their evidence.", group: "Analysis" },
  ] },
  utility: { title: "Utility packs", action: "View licenses", listings: [
    { title: "Kitchen measures", meta: "Kilter · One-time purchase", value: "$4", body: "Convenient favorites for regional volume definitions.", group: "Units" },
    { title: "Travel currencies", meta: "Kilter · One-time purchase", value: "$6", body: "A saved set of currency pairs with visible rate timestamps.", group: "Currency" },
    { title: "Engineering units", meta: "Kilter · One-time purchase", value: "$8", body: "Extra unit groups for energy, pressure and power.", badge: "New", group: "Units" },
    { title: "Shared favorites", meta: "Kilter · Team access", value: "$5 / mo", body: "Keep a common set of named conversions for your team.", group: "Team" },
  ] },
};

export const COMMERCE_SURFACE = surfaceMap<Surfaces["commerce"]>((archetype, seed) => {
  const catalog = archetype === "commerce" ? { title: "Shop", action: "List an item", listings: seed.app.items } : CATALOG[archetype];
  return { ...catalog, empty: "No listings match. Clear a filter or choose another category.", buy: "Add to cart", cart: "Cart", checkout: "Checkout" };
});
