import type { Archetype } from "@/tree/types";
import type { Surfaces } from "../schema";
import { surfaceMap } from "./seeds";

const COPY: Record<Archetype, { action: string; term: string; note: string; sections: { heading: string; paragraphs: string[] }[] }> = {
  workspace: { action: "Save guide", term: "rollout", note: "A staged replacement of running instances.", sections: [
    { heading: "Prepare a change", paragraphs: ["Before a rollout, check the service's health endpoint and decide what a successful batch means. Keep the previous artifact available until the new version has served ordinary traffic.", "A small first batch gives the team a chance to inspect latency and errors without moving every request to the new version."] },
    { heading: "Watch each batch", paragraphs: ["Traffic follows healthy instances. A failed check stops the next batch, leaving the last healthy version available while the team investigates.", "Record the changed setting beside the incident timeline so the person on call can connect an observation with the deploy that preceded it."] },
    { heading: "Recover safely", paragraphs: ["Choose the previous artifact to restore a known version. Check recovery using the same health signal that stopped the rollout; a completed command alone does not establish that the service is healthy."] },
  ] },
  feed: { action: "Save guidelines", term: "moderators", note: "Community members responsible for enforcing the house rules.", sections: [
    { heading: "Add useful context", paragraphs: ["A photo of a loaf is more helpful with the hydration, flour and proof time beside it. People can then compare their own process without guessing what changed.", "Keep links to the work you discuss. A reader should be able to reach the original and distinguish your interpretation from its author's words."] },
    { heading: "Reply with care", paragraphs: ["Ask a concrete question and leave room for the author to disagree. A reply about a technique should not become a judgment of the person using it.", "Use a topic mute when a conversation is not for you. Reports go to moderators rather than turning a public thread into an argument about moderation."] },
    { heading: "Keep the thread useful", paragraphs: ["Update the original post when an answer changes your process. Later readers can find the outcome without reading every reply."] },
  ] },
  commerce: { action: "Save policy", term: "made to order", note: "A piece the maker begins after the buyer places an order.", sections: [
    { heading: "Before checkout", paragraphs: ["Check dimensions, material and the maker's dispatch window before you order. Small variations in a handmade piece are different from a missing feature or an incorrect size.", "A maker can answer a question about care or finish in the order thread. Keep that conversation with the order so both sides have the same record."] },
    { heading: "Track each parcel", paragraphs: ["Each studio packs its own work and supplies its own tracking link. The order page groups parcels by maker and shows which pieces belong to each shipment.", "If a parcel is delayed, contact the maker from that shipment rather than opening a new message without the order context."] },
    { heading: "Arrange a return", paragraphs: ["Check the piece's return terms and tell the maker what went wrong. Keep the packaging until the return is accepted, especially for ceramics and framed prints."] },
  ] },
  reader: { action: "Save story", term: "padaria", note: "Portuguese for bakery.", sections: [
    { heading: "The first customer", paragraphs: ["At half past six, a woman in a blue coat asks for two rolls. Rosa puts a third in the bag and tells her that the first batch is always smaller than the second.", "The woman laughs. She has come to this window every Thursday for ten years and still pretends to be surprised."] },
    { heading: "A quiet hour", paragraphs: ["Between the school run and the lunchtime queue, the bakery becomes quiet. Rosa wipes the counter and writes the next day's flour order in a small notebook.", "Her apprentice asks why she never uses a timer for the final proof. Rosa points to the dough: the room is warmer today, and a clock cannot feel that."] },
    { heading: "Before tomorrow", paragraphs: ["When the shutters close, one loaf remains on the shelf. Rosa carries it home for dinner and sets her alarm for three. The street will sleep through the first hour of another day's bread."] },
  ] },
  media: { action: "Save guide", term: "Downloads", note: "Copies stored on this device for offline playback.", sections: [
    { heading: "Choose what to keep", paragraphs: ["Download a playlist before a journey or keep the next episodes of a series you follow. The library shows which files are already available on this device.", "A track in a playlist is not necessarily downloaded. Look for the download state rather than assuming a saved title will play offline."] },
    { heading: "Manage device space", paragraphs: ["Completed episodes can be removed without losing your place in the series. Remove a file from this device when you need space; keep its title in your library if you want to find it again.", "Large downloads are easier to finish on a stable connection. A paused download keeps its state and can continue when the connection returns."] },
    { heading: "Resume anywhere", paragraphs: ["Your listening position belongs to the library entry, not the local file. Reopening an episode restores the saved position when the device has synchronized."] },
  ] },
  companion: { action: "Save rules", term: "crests", note: "Weekly ranking rewards used to unlock clan relics.", sections: [
    { heading: "Build your power", paragraphs: ["Compare the power gain of a new item with its other bonuses before replacing a piece of gear. A light-radius trinket may be useful in the crypt even when it adds less raw power.", "The character sheet separates gear, level and clan contributions so a change in ranking can be understood rather than guessed."] },
    { heading: "Join a raid", paragraphs: ["Read the party's required power and supplies before joining. Tell the clan which role you can fill and whether you can stay for the full run.", "A tracked quest and a raid reservation are different commitments. Tracking a quest keeps it on your board but does not reserve a place in another player's party."] },
    { heading: "Claim the weekly reward", paragraphs: ["Check the completed ranking period before claiming crests. The next period starts with a new table; the previous reward remains a separate entry in your history."] },
  ] },
  canvas: { action: "Save guide", term: "frame", note: "A bounded screen or section containing positioned layers.", sections: [
    { heading: "Organize a flow", paragraphs: ["Use a frame for each screen and a connector for the transition between screens. A nearby note can explain a branch without becoming part of the exported interface.", "Name frames by the work they support, such as Welcome or Sign in, so teammates can find them in the layer list."] },
    { heading: "Review at small widths", paragraphs: ["Check text, art and controls at the narrowest supported frame width. A clipped hero and a hidden continue button are different layout problems and should have separate comments.", "Pin a comment to the layer it concerns. When the layer moves, the review context remains with the object rather than an old canvas coordinate."] },
    { heading: "Share a handoff", paragraphs: ["Mark the reviewed frames and explain any deliberate exceptions. The exported image cannot carry every interaction rule, so keep the flow notes beside the screens."] },
  ] },
  conversation: { action: "Save guide", term: "tool", note: "An operation the agent asks permission to run.", sections: [
    { heading: "Inspect the request", paragraphs: ["Before allowing a tool, read the operation and the data it needs. A description of a task is not a substitute for the call that will actually run.", "Use a one-time permission when the operation should not become a standing rule. The thread keeps the decision beside its result."] },
    { heading: "Read the result", paragraphs: ["Separate the data returned by a tool from the agent's interpretation. A weekly trend needs a date range and a definition of its counts before it can support a business decision.", "Ask for a split or a revised range in the same thread so teammates can see why the second result differs from the first."] },
    { heading: "Share useful context", paragraphs: ["Invite a teammate to the thread containing the work rather than copying an isolated answer. They can inspect the request, permission and result together."] },
  ] },
  utility: { action: "Save guide", term: "Cached", note: "A currency result computed using a previously saved rate.", sections: [
    { heading: "Read the units", paragraphs: ["An amount without its units is ambiguous. Keep the source and destination units visible when copying a result or saving it as a favorite.", "Kitchen volumes depend on the chosen cup or fluid-ounce definition. Select the intended unit rather than treating every regional measure as interchangeable."] },
    { heading: "Use saved rates", paragraphs: ["A cached currency rate is useful offline but may differ from a later live rate. The timestamp identifies the rate used in the calculation.", "If a refresh fails, keep the last result and label its rate state. Do not silently present an old rate as current."] },
    { heading: "Keep a calculation", paragraphs: ["Save the amount, units and rate context when a result will be used again. A favorite stores a convenient unit pair; a history entry records a particular calculation."] },
  ] },
};

export const READER_SURFACE = surfaceMap<Surfaces["reader"]>((archetype, seed) => {
  const copy = COPY[archetype];
  return { title: seed.app.prose.title, action: copy.action, empty: "No reading content yet. Choose a guide or story from the library.", byline: `${seed.product.name} · Sample guide`,
    sections: [{ heading: seed.app.prose.title, paragraphs: seed.app.prose.paragraphs }, ...copy.sections], notes: [{ term: copy.term, note: copy.note }],
  };
});
