/**
 * Everything the galleries display. Each archetype ships its own sample content
 * (`content/archetypes/`); a project overrides it with its own copy deck by
 * placing `content.json` in the studio's `public/` directory. The shape below is the contract.
 */

export type CellKind = "text" | "muted" | "mono" | "status" | "num";
export interface Cell {
  text: string;
  kind?: CellKind;
  /** For `status`: one of "ok" | "warn" | "bad" | "off" | "unknown". */
  tone?: "ok" | "warn" | "bad" | "off" | "unknown";
}

/**
 * One of the product's main objects, as a home surface lays it out: a listing, a lesson,
 * a post, a track, a quest, a file. Every field but `title` and `meta` is optional.
 */
export interface Item {
  title: string;
  /** One short line under the title: seller, author and time, duration, rarity. */
  meta: string;
  body?: string;
  /** Price, score, duration or count, shown prominently. */
  value?: string;
  badge?: string;
  /** 0–1: lesson or quest progress, a playback position. */
  progress?: number;
  /** Shelf, category or section the item belongs to; a board's swimlane. */
  group?: string;
  /** On a board: the index into `surfaces.board.lanes` of the stage the item is in. */
  stage?: number;
}

/** One message. `mine` marks the user's own; the rest come from people or an agent. */
export interface Message {
  author: string;
  text: string;
  mine?: boolean;
  time?: string;
}

/** A surface's page header and its one-line empty state, in the archetype's vocabulary. */
export interface SurfacePage {
  title: string;
  action: string;
  /** What the surface says when it has nothing to show. */
  empty: string;
}

/**
 * What the surface galleries lay out: feed, board, conversation, reader and storefront,
 * each in the archetype's own vocabulary (a learning app's feed is classmates' progress,
 * a game companion's storefront is the item shop).
 */
export interface Surfaces {
  /** Entries newest first. `meta` is the author and time, `body` the text, `badge` Photo, Video or Link for a media tile, `value` the counts ("replies · reposts · likes"), `group` the topic a digest groups by. */
  feed: SurfacePage & { entries: Item[]; composer: string };
  /** Work moving through stages: `lanes` name the stages in order, each card's `stage` indexes them, and its `group` is its swimlane (an owner or an area). */
  board: SurfacePage & { lanes: string[]; cards: Item[] };
  /** The thread is `app.thread` and the composer `app.composer`; `context` is the thing the conversation is about. */
  conversation: SurfacePage & { context: { title: string; body: string; facts: { label: string; value: string }[] } };
  /** A long read. `notes` gloss a `term` that appears in the text. */
  reader: SurfacePage & { byline: string; sections: { heading: string; paragraphs: string[] }[]; notes: { term: string; note: string }[] };
  /** Things to buy: `value` is the price, `meta` the seller or a spec line, `badge` a flag (New, Sale), `group` the shelf, `body` the detail. */
  commerce: SurfacePage & { listings: Item[]; buy: string; cart: string; checkout: string };
}

export interface Content {
  product: { name: string; tagline: string };
  app: {
    nav: { label: string; badge?: number }[];
    topnav: string[];
    page: { title: string; action: string };
    /** `series` is the figure over time, oldest first; drives the trend knob. */
    stats: {
      label: string;
      value: string;
      note?: string;
      series?: number[];
      /** The figure split by entity, each summing to `series`; drives the stacked treatment. */
      breakdown?: { name: string; series: number[] }[];
    }[];
    /** A titled section of cards between the figures and the table, e.g. "Waiting on you". */
    panel: { title: string; items: { title: string; body: string; actions: [string, string] }[] };
    table: { columns: string[]; rows: Cell[][] };
    form: {
      title: string;
      fields: { label: string; kind: "text" | "select" | "switch" | "checkbox"; placeholder?: string; options?: string[] }[];
      submit: string;
      cancel: string;
    };
    empty: { title: string; body: string; action: string };
    error: { title: string; detail: string; action: string };
    toast: string;
    dialog: { title: string; body: string; confirm: string; cancel: string };
    prose: { title: string; paragraphs: string[] };
    code: { path: string; lines: string[] };
    composer: { placeholder: string; send: string };
    /** Placeholder of the global search field in the top bar. */
    search: string;
    /** Period tabs on the chart panel, e.g. 7d / 30d / 90d. */
    periods: string[];
    /** The main objects the home lays out. The workspace home ignores them; every other home is built on them. */
    items: Item[];
    /** A conversation, oldest first: the conversation home's thread, replies elsewhere. */
    thread: Message[];
  };
  surfaces: Surfaces;
  landing: {
    nav: string[];
    cta: string;
    ctaSecondary: string;
    emailPlaceholder: string;
    h1: string;
    sub: string;
    sections: { eyebrow: string; title: string; body: string }[];
    proof: {
      logos: string[];
      numbers: { value: string; label: string }[];
      quotes: { text: string; who: string }[];
    };
    footer: string;
  };
}

/** An archetype's own sample: everything but the surfaces, which `content/surfaces/` writes per archetype. */
export type ArchetypeContent = Omit<Content, "surfaces">;
