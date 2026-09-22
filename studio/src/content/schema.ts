/**
 * Everything the galleries display. A project overrides this with its own
 * copy deck by placing `content.json` in the studio's `public/` directory;
 * the shape below is the contract.
 */

export type CellKind = "text" | "muted" | "mono" | "status" | "num";
export interface Cell {
  text: string;
  kind?: CellKind;
  /** For `status`: one of "ok" | "warn" | "bad" | "off" | "unknown". */
  tone?: "ok" | "warn" | "bad" | "off" | "unknown";
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
  };
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
