import { describe, expect, test } from "bun:test";
import { mkdir, mkdtemp, readFile, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";
import { fileURLToPath } from "node:url";
import { checkModel, readCopyDeck, shownWhen, writeShownWhen, type ModelCheckResult } from "../src/model/check";
import { checkModelFile, companionPath } from "../src/model/load";
import type { ProductModel } from "../src/model/schema";
import { readPatternCatalog, type PatternCatalog, type PatternRecord } from "../src/model/patterns";

const catalog: PatternCatalog = {
  collection: { id: "collection", scale: "surface", studio: null, slots: { required: ["primary"], optional: ["state"] }, variants: [{ id: "list", label: "List" }, { id: "grid", label: "Grid" }], states: ["ready", "empty"], copy: ["title"], events: [], renderer: "variants" },
  absence: { id: "absence", scale: "component", studio: null, slots: { required: ["state"], optional: [] }, variants: [{ id: "cue", label: "Cue" }], states: ["empty"], copy: ["empty"], events: [], renderer: "schematic" },
};
const base: ProductModel = {
  model: 1, product: { id: "example", outcome: "Find a useful object.", users: [{ id: "visitor", who: "A visitor finding one object", device: "both", surfaces: ["catalog"] }] },
  entities: [{ id: "object", words: ["object"], contract: "Object" }], capabilities: [{ id: "search", real: true }],
  data: { Object: { fields: { name: "text", price: "money" }, typical: 2, max: 10, long: ["name"] } },
  states: { ready: { label: "Ready", kind: "data", rule: "Show the objects.", fixtures: { Object: "populated" } }, absent: { label: "Empty", kind: "data", rule: "Offer a next step.", fixtures: { Object: "none" } } },
  events: { filter: { label: "Filter objects", kind: "swap", needs: "search" } },
  nav: { items: [{ surface: "catalog", copy: "catalog.title" }], inAYear: 1 },
  flows: [{ id: "browse", goal: "Find an object", priority: "must", stages: [{ id: "choose", surface: "catalog" }], ends: "An object is selected.", needs: ["search"] }],
  surfaces: [{ id: "catalog", question: "Which object fits?", route: "/objects", binding: { record: "collection", status: "open", candidates: ["list", "grid"] }, states: ["ready", "absent"], viewports: ["phone", "desktop"], copy: { "catalog.title": { when: "always", as: "title" }, "catalog.intro": "always" }, slots: [{ id: "primary", data: { contract: "Object", many: true, map: { title: "name", price: "price" } }, copy: {}, on: [{ event: "filter", axis: "contentSwap" }] }, { id: "state", record: "absence", status: "fixed", variant: "cue", because: "Only one structure is needed.", states: ["absent"], copy: { "catalog.empty": ["absent"] } }] }],
  files: { copy: "copy.md", fixtures: "fixtures.json" },
};
const fixture = { Object: { populated: [{ name: "Spade", price: 4 }, { name: "Drill", price: 8 }], long: [{ name: "A deliberately long object name that wraps across several lines in a narrow viewport", price: 9 }], none: [] } };
const deckText = "| Key | Copy | Shown when |\n|---|---|---|\n| catalog.title | Objects | catalog |\n| catalog.empty | No objects yet | catalog · Empty |\n| catalog.intro | Choose an object | catalog |\n";
const run = (change?: (m: ProductModel) => void) => { const m = structuredClone(base); change?.(m); return checkModel(m, { catalog, deck: readCopyDeck(deckText), fixtures: structuredClone(fixture) }); };
const errors = (r: ModelCheckResult) => r.errors.map((e) => `${e.path}: ${e.message}`).join("\n");
const expectIssue = (result: ModelCheckResult, path: string, ...messages: string[]) => {
  const issue = result.errors.find((error) => error.path === path);
  expect(issue, errors(result)).toBeDefined();
  for (const message of messages) expect(issue!.message).toContain(message);
};

describe("model checking through its public interface", () => {
  test("accepts a coherent model and derives copy targets", () => { expect(run().errors).toEqual([]); expect(shownWhen(base)["catalog.empty"]).toBe("catalog · Empty"); });
  test("reports schema errors with the JSON path", () => { const r = run((m) => { m.model = 2 as 1; }); expect(errors(r)).toContain("$.model"); expect(errors(r)).toContain("1"); });
  test("rejects final newlines in identifiers and non-round-trippable reach labels", () => {
    expect(errors(run((m) => { m.product.id = "example\n"; }))).toContain("$.product.id");
    for (const label of [" Empty", "Empty ", "Empty\n", "Empty\r\n", "Empty\nstate"]) {
      const result = run((m) => { m.states.absent!.label = label; });
      expect(errors(result)).toContain("$.states.absent.label");
      expect(errors(result)).toContain("single-line label");
    }
    expect(errors(run((m) => { m.surfaces[0]!.setups = [{ id: "menu", label: "Menu\n", event: "filter" }]; }))).toContain("$.surfaces[0].setups[0].label");
  });
  test("rejects ambiguous global identifiers", () => { expect(errors(run((m) => { m.flows[0]!.id = "catalog"; }))).toContain("already used"); });
  test("names a missing surface and the stage needing it", () => { const r = run((m) => { m.flows[0]!.stages[0]!.surface = "missing"; }); expect(errors(r)).toContain("$.flows[0].stages[0].surface"); expect(errors(r)).toContain("missing"); });
  test("rejects unknown records and variants", () => { expect(errors(run((m) => { m.surfaces[0]!.binding!.record = "missing"; }))).toContain("pattern record"); expect(errors(run((m) => { m.surfaces[0]!.binding!.variant = "tiles"; }))).toContain("tiles"); });
  test("requires schematic choices to be fixed", () => { const r = run((m) => { m.surfaces[0]!.slots[1]!.status = "open"; }); expect(errors(r)).toContain("schematic"); expect(errors(r)).toContain("fixed"); });
  test("open bindings carry candidates, not a selected variant", () => {
    const result = run((m) => { m.surfaces[0]!.binding!.variant = "list"; });
    expect(errors(result)).toContain("$.surfaces[0].binding.variant");
    expect(errors(result)).toContain("An open binding has no selected variant");
    expect(run((m) => { m.surfaces[0]!.binding!.status = "proposed"; m.surfaces[0]!.binding!.variant = "list"; }).errors).toEqual([]);
  });
  test("rejects missing and orphaned copy keys", () => { const r = run((m) => { m.surfaces[0]!.copy = { "catalog.unknown": "always" }; }); expect(errors(r)).toContain("catalog.unknown"); expect(errors(r)).toContain("orphan"); });
  test("rejects unreachable copy and a stale Shown when column", () => { expect(errors(run((m) => { m.surfaces[0]!.slots[1]!.copy["catalog.empty"] = ["missing"]; }))).toContain("state or setup"); const r = checkModel(base, { catalog, deck: readCopyDeck(deckText.replace("catalog · Empty", "elsewhere")), fixtures: fixture }); expect(errors(r)).toContain("Shown when"); });
  test("always in a state-restricted slot reaches only that slot's states", () => {
    const m = structuredClone(base);
    m.surfaces[0]!.slots[1]!.copy["catalog.empty"] = "always";
    expect(shownWhen(m)["catalog.empty"]).toBe("catalog · Empty");
    expect(checkModel(m, { catalog, deck: readCopyDeck(deckText), fixtures: fixture }).errors).toEqual([]);
  });
  test("state copy survives its setups, while setup copy remains specific", () => {
    const m = structuredClone(base);
    m.surfaces[0]!.setups = [
      { id: "filterMenu", label: "Filter menu", event: "filter" },
      { id: "emptyHelp", label: "Empty help", event: "filter", state: "absent" },
      { id: "emptyConfirm", label: "Confirm from empty", event: "filter", state: "absent" },
    ];
    m.surfaces[0]!.copy["catalog.filter"] = ["ready"];
    m.surfaces[0]!.copy["catalog.help"] = ["emptyHelp"];
    m.surfaces[0]!.slots[1]!.copy["catalog.empty"] = "always";
    const reach = shownWhen(m);
    expect(reach["catalog.filter"]).toBe("catalog · Ready; catalog · Filter menu");
    expect(reach["catalog.help"]).toBe("catalog · Empty help");
    expect(reach["catalog.empty"]).toBe("catalog · Empty; catalog · Empty help; catalog · Confirm from empty");
    const deck = writeShownWhen(deckText + "| catalog.filter | Filter | stale |\n| catalog.help | Help | stale |\n", m);
    expect(checkModel(m, { catalog, deck: readCopyDeck(deck), fixtures: fixture }).errors).toEqual([]);
  });
  test("setup labels are scoped to their surface even when another global state shares the id", () => {
    const m = structuredClone(base);
    m.states.confirm = { label: "Unrelated state", kind: "data", rule: "Display another surface's state.", fixtures: { Object: "none" } };
    m.surfaces[0]!.setups = [{ id: "confirm", label: "Confirm choice", event: "filter", state: "absent" }];
    m.surfaces[0]!.slots[1]!.copy["catalog.empty"] = ["confirm"];
    expect(shownWhen(m)["catalog.empty"]).toBe("catalog · Confirm choice");
    expect(checkModel(m, { catalog, deck: readCopyDeck(deckText.replace("catalog · Empty", "catalog · Confirm choice")), fixtures: fixture }).errors).toEqual([]);
  });
  test("rewrites only reach cells, escaping labels and preserving copy and CRLF", () => {
    const m = structuredClone(base);
    m.states.absent!.label = "Empty | unavailable \\ recovery";
    const original = deckText.replace("Objects", "Tools \\| supplies").replace("catalog · Empty", "stale").replace(/\n/g, "\r\n");
    const updated = writeShownWhen(original, m);
    const deck = readCopyDeck(updated);
    expect(deck.errors).toEqual([]);
    expect(deck.entries["catalog.title"]!.text).toBe("Tools | supplies");
    expect(deck.entries["catalog.empty"]!.shownWhen).toBe("catalog · Empty | unavailable \\ recovery");
    expect(updated).toContain("\r\n");
    expect(updated.replace(/\r\n/g, "")).not.toContain("\n");
    expect(writeShownWhen(updated, m)).toBe(updated);
  });
  test("leaves matching key rows in unrelated tables unchanged", () => {
    const note = "\n| Key | Note | Owner |\n|---|---|---|\n| catalog.empty | Keep this note | Original owner |\n";
    const updated = writeShownWhen(deckText.replace("catalog · Empty", "stale") + note, base);
    expect(updated.endsWith(note)).toBe(true);
    expect(readCopyDeck(updated).entries["catalog.empty"]!.shownWhen).toBe("catalog · Empty");
  });
  test("flags disguised fixed copy even when only populated has rows", () => {
    const m = structuredClone(base);
    delete m.data.Object!.long;
    const result = checkModel(m, { catalog, deck: readCopyDeck(deckText), fixtures: { Object: { populated: [{ name: "Fixed explanatory message", price: 4 }, { name: "Fixed explanatory message", price: 8 }], none: [] } } });
    expect(result.errors).toEqual([]);
    expect(result.warnings.some((w) => w.path === "$.data.Object.fields.name" && w.message.includes("fixed copy"))).toBe(true);
  });
  test("does not misclassify repeated enum, date, reference or image values as copy", () => {
    const m = structuredClone(base);
    m.data.Object!.fields = { name: "text", price: "money", status: "enum", date: "date", owner: "ref", image: "image" };
    m.data.Object!.enums = { status: ["ready"] };
    const rows = structuredClone(fixture.Object);
    const common = { status: "ready", date: "2026-10-08", owner: "person1", image: "data:image/svg+xml,illustration" };
    const fixtures = Object.fromEntries(Object.entries(rows).map(([scenario, items]) => [scenario, items.map((item) => ({ ...item, ...common }))]));
    const result = checkModel(m, { catalog, deck: readCopyDeck(deckText), fixtures: { Object: fixtures } });
    expect(result.errors).toEqual([]);
    expect(result.warnings).toEqual([]);
  });
  test("rejects undefined states and scenarios", () => { expect(errors(run((m) => { m.surfaces[0]!.states.push("missing"); }))).toContain("undefined state"); expect(errors(run((m) => { m.states.ready!.fixtures.Object = "missing"; }))).toContain("fixture scenario"); });
  test("checks field maps, fixture types, realistic counts and long cases", () => { expect(errors(run((m) => { m.surfaces[0]!.slots[0]!.data!.map.title = "missing"; }))).toContain("contract field"); const wrong = structuredClone(fixture); wrong.Object.populated[0]!.price = "free" as unknown as number; const r = checkModel(base, { catalog, deck: readCopyDeck(deckText), fixtures: wrong }); expect(errors(r)).toContain("money"); expect(errors(run((m) => { m.data.Object!.typical = 5; }))).toContain("typical"); const noLong = { Object: { populated: fixture.Object.populated, none: [] } }; expect(checkModel(base, { catalog, deck: readCopyDeck(deckText), fixtures: noLong }).errors.some((e) => e.message.includes("long"))).toBe(true); });
  test("checks required slots and copy families", () => { expect(errors(run((m) => { m.surfaces[0]!.slots.shift(); }))).toContain("required slot"); expect(errors(run((m) => { m.surfaces[0]!.copy = { "catalog.heading": "always" }; }))).toContain("copy family"); });
  test("validates event references and interaction axes", () => { expect(errors(run((m) => { m.surfaces[0]!.slots[0]!.on![0]!.event = "missing"; }))).toContain("event"); expect(errors(run((m) => { m.surfaces[0]!.slots[0]!.on![0]!.axis = "fake" as "contentSwap"; }))).toContain("axis"); });
  test("rejects a valid interaction axis bound to the wrong event kind", () => {
    const result = run((m) => { m.surfaces[0]!.slots[0]!.on![0]!.axis = "layerArrival"; });
    expect(errors(result)).toContain("$.surfaces[0].slots[0].on[0].axis");
    expect(errors(result)).toContain("does not treat swap");
  });
  test("rejects required empty placements and decisions in the wrong scale", () => {
    expect(errors(run((m) => { m.surfaces[0]!.slots[0]!.data = undefined; }))).toContain("Required slot primary is empty");
    expect(errors(run((m) => { m.flows[0]!.binding = { record: "collection", status: "open" }; }))).toContain("A flow binding needs a flow record");
    expect(errors(run((m) => { m.surfaces[0]!.slots[1]!.because = undefined; }))).toContain("$.surfaces[0].slots[1].because");
    expect(errors(run((m) => { m.surfaces[0]!.binding!.variant = "list"; m.surfaces[0]!.binding!.candidates = ["grid"]; }))).toContain("outside candidates");
  });
  test("rejects broken or cyclic shared decisions", () => { expect(errors(run((m) => { m.surfaces[0]!.binding!.sameAs = "surface:missing"; }))).toContain("sameAs"); expect(errors(run((m) => { m.surfaces[0]!.binding!.sameAs = "surface:catalog"; }))).toContain("cycle"); });
  test("treats prototype-shaped names as undeclared references rather than runtime properties", () => {
    expect(errors(run((m) => { m.surfaces[0]!.binding!.record = "constructor"; }))).toContain("Unknown pattern record constructor");
    expect(errors(run((m) => { m.surfaces[0]!.slots[0]!.data!.contract = "constructor"; }))).toContain("Unknown data contract constructor");
    expect(errors(run((m) => { m.surfaces[0]!.states.push("constructor"); }))).toContain("undefined state constructor");
  });
  test("rejects reserved keys before record parsing can silently drop them", () => {
    const raw = JSON.parse(JSON.stringify(base));
    raw.states = JSON.parse('{"__proto__":{"label":"Reserved","kind":"data","rule":"Never accept this.","fixtures":{}}}');
    expect(checkModel(raw, { catalog, deck: readCopyDeck(deckText), fixtures: fixture }).errors[0]!.message).toContain("Reserved key __proto__");
  });
  test("shared surface/flow variants remain open without creating an independent schematic choice", () => {
    const m = structuredClone(base);
    m.flows[0]!.binding = { record: "browse", status: "open", sameAs: "surface:catalog" };
    const sharedCatalog: PatternCatalog = { ...catalog, browse: { ...catalog.collection!, id: "browse", scale: "flow", slots: { required: [], optional: [] }, renderer: "schematic", sharesVariants: "collection" } };
    expect(checkModel(m, { catalog: sharedCatalog, deck: readCopyDeck(deckText), fixtures: fixture }).errors).toEqual([]);
    m.flows[0]!.binding.sameAs = "slot:catalog/state";
    expect(checkModel(m, { catalog: sharedCatalog, deck: readCopyDeck(deckText), fixtures: fixture }).errors.some((e) => e.path.endsWith(".sameAs"))).toBe(true);
  });
  test("reports imagined capabilities, excluded surfaces and disguised copy without failing", () => { const r = run((m) => { m.capabilities[0]!.real = false; m.flows[0]!.priority = "later"; m.data.Object!.fields.constant = "text"; }); const f = structuredClone(fixture) as Record<string, Record<string, Record<string, unknown>[]>>; for (const rows of Object.values(f.Object!)) for (const row of rows) row.constant = "Always the same"; const result = checkModel(r.model!, { catalog, deck: readCopyDeck(deckText), fixtures: f }); expect(result.errors).toEqual([]); expect(result.warnings.map((w) => w.message).join("\n")).toContain("imagined"); expect(result.warnings.map((w) => w.message).join("\n")).toContain("not designed this round"); expect(result.warnings.map((w) => w.message).join("\n")).toContain("fixed copy"); });
  test("parses escaped table pipes and rejects duplicate keys", () => { expect(readCopyDeck(deckText.replace("Objects", "Tools \\| supplies")).entries["catalog.title"]!.text).toBe("Tools | supplies"); expect(readCopyDeck(deckText + "| catalog.title | Duplicate | catalog |\n").errors[0]!.message).toContain("duplicate"); });
});

describe("reviewer regressions for flow reach and derived copy", () => {
  test("reviewer probe rejects a surface after its last flow stage is removed", () => {
    const m = structuredClone(base);
    m.surfaces.push({ ...structuredClone(m.surfaces[0]!), id: "detail", route: "/detail" });
    m.flows[0]!.stages.push({ id: "inspect", surface: "detail" });
    const deck = readCopyDeck(writeShownWhen(deckText, m));
    expect(checkModel(m, { catalog, deck, fixtures: fixture }).errors).toEqual([]);
    m.flows[0]!.stages.pop();
    expectIssue(checkModel(m, { catalog, deck, fixtures: fixture }), "$.surfaces[1]", "No flow reaches surface detail", "add a stage");
  });

  for (const priority of ["should", "later"] as const) test(`warns for ${priority}-only deck keys but excludes keys shared with must surfaces`, () => {
    const m = structuredClone(base);
    const notice = { ...structuredClone(m.surfaces[0]!), id: "notice", route: "/notice" };
    notice.copy = { "notice.title": { when: "always", as: "title" }, "catalog.intro": "always" };
    m.surfaces.push(notice);
    m.flows.push({ id: "notify", goal: "Read a notice", priority: "must", stages: [{ id: "read", surface: "notice" }], ends: "The notice is read.", needs: [] });
    const deck = readCopyDeck(writeShownWhen(deckText + "| notice.title | Notice | stale |\n", m));
    expect(checkModel(m, { catalog, deck, fixtures: fixture }).warnings).toEqual([]);
    m.flows[1]!.priority = priority;
    const result = checkModel(m, { catalog, deck, fixtures: fixture });
    expect(result.errors).toEqual([]);
    expect(result.warnings.filter((warning) => warning.path.startsWith("copy.md:"))).toEqual([
      { path: "copy.md:6", message: expect.stringContaining("notice.title is reached only by should/later surfaces") },
    ]);
    expect(result.warnings.find((warning) => warning.path === "copy.md:6")!.message).toContain("Every screen must still reach");
  });

  test("surface copy reads fields and aliases from every slot contract", () => {
    const m = structuredClone(base);
    m.data.Category = { fields: { label: "text" }, typical: 1 };
    m.states.ready!.fixtures.Category = "populated";
    m.states.absent!.fixtures.Category = "none";
    m.surfaces[0]!.slots[1]!.data = { contract: "Category", map: { category: "label" } };
    const fixtures = { ...fixture, Category: { populated: [{ label: "Garden" }], none: [] } };
    const deck = readCopyDeck(deckText.replace("Choose an object", "Choose {name} in {category}"));
    expect(checkModel(m, { catalog, deck, fixtures }).errors).toEqual([]);
    delete m.surfaces[0]!.slots[1]!.data;
    expectIssue(checkModel(m, { catalog, deck, fixtures }), '$.surfaces[0].copy["catalog.intro"]', "Unknown placeholder category", "read by this placement");
  });

  test("slot copy cannot borrow a sibling slot's data contract", () => {
    const m = structuredClone(base);
    m.surfaces[0]!.slots[0]!.copy["catalog.detail"] = "always";
    const text = deckText + "| catalog.detail | Inspect {name} | stale |\n";
    expect(checkModel(m, { catalog, deck: readCopyDeck(writeShownWhen(text, m)), fixtures: fixture }).errors).toEqual([]);
    delete m.surfaces[0]!.slots[0]!.copy["catalog.detail"];
    m.surfaces[0]!.slots[1]!.copy["catalog.detail"] = "always";
    expectIssue(checkModel(m, { catalog, deck: readCopyDeck(writeShownWhen(text, m)), fixtures: fixture }), '$.surfaces[0].slots[1].copy["catalog.detail"]', "Unknown placeholder name", "read by this placement");
  });

  test("placeholder map aliases resolve only while their placement declares them", () => {
    const m = structuredClone(base);
    const deck = readCopyDeck(deckText.replace("Choose an object", "Choose {title}"));
    expect(checkModel(m, { catalog, deck, fixtures: fixture }).errors).toEqual([]);
    m.surfaces[0]!.slots[0]!.data!.map = { heading: "name", price: "price" };
    expectIssue(checkModel(m, { catalog, deck, fixtures: fixture }), '$.surfaces[0].copy["catalog.intro"]', "Unknown placeholder title", "map");
  });

  test("reviewer probe rejects a misspelled placeholder rather than accepting fixed copy", () => {
    const valid = deckText.replace("Choose an object", "Price {price:currency}");
    expect(checkModel(base, { catalog, deck: readCopyDeck(valid), fixtures: fixture }).errors).toEqual([]);
    const result = checkModel(base, { catalog, deck: readCopyDeck(valid.replace("{price:currency}", "{prcie:currency}")), fixtures: fixture });
    expectIssue(result, '$.surfaces[0].copy["catalog.intro"]', "Unknown placeholder prcie", "declared contract field");
  });

  test("a shared deck key must resolve its placeholders on every referencing surface", () => {
    const m = structuredClone(base);
    m.surfaces.push({ ...structuredClone(m.surfaces[0]!), id: "detail", route: "/detail" });
    m.flows[0]!.stages.push({ id: "inspect", surface: "detail" });
    const deck = readCopyDeck(writeShownWhen(deckText.replace("Choose an object", "Choose {name}"), m));
    expect(checkModel(m, { catalog, deck, fixtures: fixture }).errors).toEqual([]);
    delete m.surfaces[1]!.slots[0]!.data;
    m.surfaces[1]!.slots[0]!.copy["catalog.intro"] = "always";
    const result = checkModel(m, { catalog, deck, fixtures: fixture });
    expectIssue(result, '$.surfaces[1].copy["catalog.intro"]', "Unknown placeholder name", "read by this placement");
    expect(result.errors.some((error) => error.path === '$.surfaces[0].copy["catalog.intro"]')).toBe(false);
  });

  test("rejects an unknown derived formatter with the supported choices", () => {
    const valid = deckText.replace("Choose an object", "Price {price:currency}");
    expect(checkModel(base, { catalog, deck: readCopyDeck(valid), fixtures: fixture }).errors).toEqual([]);
    expectIssue(checkModel(base, { catalog, deck: readCopyDeck(valid.replace(":currency}", ":coins}")), fixtures: fixture }), '$.surfaces[0].copy["catalog.intro"]', "Unknown formatter price:coins", "relative, time, date, currency, number");
  });

  test("rejects an extra formatter segment after a supported formatter", () => {
    const valid = deckText.replace("Choose an object", "Price {price:currency}");
    expect(checkModel(base, { catalog, deck: readCopyDeck(valid), fixtures: fixture }).errors).toEqual([]);
    const invalid = valid.replace("{price:currency}", "{price:currency:extra}");
    expect(checkModel(base, { catalog, deck: readCopyDeck(invalid), fixtures: fixture }).errors).toEqual([
      { path: '$.surfaces[0].copy["catalog.intro"]', message: "Unknown formatter price:currency:extra in catalog.intro; choose relative, time, date, currency, number." },
    ]);
  });

  for (const [formatter, field, kind] of [
    ["relative", "editedAt", "date"], ["time", "editedAt", "date"], ["date", "editedAt", "date"],
    ["currency", "price", "money"], ["number", "price", "number"],
  ] as const) test(`rejects ${formatter} formatting on a text field`, () => {
    const m = structuredClone(base);
    m.data.Object!.fields.editedAt = "date";
    const fixtures = { Object: Object.fromEntries(Object.entries(fixture.Object).map(([scenario, rows]) => [scenario, rows.map((row) => ({ ...row, editedAt: "2026-10-08T12:00:00Z" }))])) };
    const valid = deckText.replace("Choose an object", `Value {${field}:${formatter}}`);
    expect(checkModel(m, { catalog, deck: readCopyDeck(valid), fixtures }).errors).toEqual([]);
    const invalid = valid.replace(`{${field}:${formatter}}`, `{name:${formatter}}`);
    expectIssue(checkModel(m, { catalog, deck: readCopyDeck(invalid), fixtures }), '$.surfaces[0].copy["catalog.intro"]', `Formatter ${formatter}`, kind);
  });

  test("number formatting accepts both numeric fields and money aliases", () => {
    const m = structuredClone(base);
    m.data.Object!.fields.count = "number";
    m.surfaces[0]!.slots[0]!.data!.map.cost = "price";
    const fixtures = { Object: Object.fromEntries(Object.entries(fixture.Object).map(([scenario, rows]) => [scenario, rows.map((row, index) => ({ ...row, count: index + 1 }))])) };
    const valid = deckText.replace("Choose an object", "{count:number} objects at {cost:number}");
    expect(checkModel(m, { catalog, deck: readCopyDeck(valid), fixtures }).errors).toEqual([]);
    expectIssue(checkModel(m, { catalog, deck: readCopyDeck(valid.replace("{cost:number}", "{title:number}")), fixtures }), '$.surfaces[0].copy["catalog.intro"]', "Formatter number", "number");
  });
});

describe("copy roles and optional fixture fields", () => {
  for (const [channel, role] of [
    ["screen", "title"], ["email", "subject"], ["email", "body"], ["push", "title"], ["push", "body"],
  ] as const) test(`${channel} surfaces require an explicit ${role} copy role`, () => {
    const m = structuredClone(base);
    m.surfaces[0]!.channel = channel;
    m.surfaces[0]!.copy["catalog.title"] = { when: "always", as: channel === "email" ? "subject" : "title" };
    if (channel !== "screen") m.surfaces[0]!.copy["catalog.intro"] = { when: "always", as: "body" };
    expect(checkModel(m, { catalog, deck: readCopyDeck(deckText), fixtures: fixture }).errors).toEqual([]);
    const key = role === "body" ? "catalog.intro" : "catalog.title";
    m.surfaces[0]!.copy[key] = "always";
    expect(checkModel(m, { catalog, deck: readCopyDeck(deckText), fixtures: fixture }).errors).toEqual([
      { path: "$.surfaces[0].copy", message: `A ${channel} surface needs a ${role} copy reference in ready, absent; declare { when, as: "${role}" } on its surface or slot.` },
    ]);
  });

  test("all copy roles preserve state and setup reach while shorthand forms remain text", () => {
    const m = structuredClone(base);
    m.surfaces[0]!.setups = [{ id: "confirm", label: "Confirm choice", event: "filter", state: "ready" }];
    let text = deckText;
    for (const role of ["text", "label", "title", "alt", "announce", "subject", "preheader", "body", "action"] as const) {
      m.surfaces[0]!.copy[`catalog.role.${role}`] = { when: ["ready"], as: role };
      text += `| catalog.role.${role} | ${role} copy | stale |\n`;
    }
    m.surfaces[0]!.copy["catalog.defaultText"] = { when: ["confirm"] };
    text += "| catalog.defaultText | Confirm selection | stale |\n";
    const result = checkModel(m, { catalog, deck: readCopyDeck(writeShownWhen(text, m)), fixtures: fixture });
    expect(result.errors).toEqual([]);
    const reach = shownWhen(result.model!);
    expect(reach["catalog.intro"]).toBe("catalog");
    expect(reach["catalog.empty"]).toBe("catalog · Empty");
    expect(reach["catalog.defaultText"]).toBe("catalog · Confirm choice");
    for (const role of ["text", "label", "title", "alt", "announce", "subject", "preheader", "body", "action"]) expect(reach[`catalog.role.${role}`]).toBe("catalog · Ready; catalog · Confirm choice");
  });

  test("an absent-only slot title leaves the ready state uncovered", () => {
    const m = structuredClone(base);
    m.surfaces[0]!.copy["catalog.title"] = "always";
    m.surfaces[0]!.slots[1]!.copy["catalog.empty"] = { when: ["absent"], as: "title" };
    expect(checkModel(m, { catalog, deck: readCopyDeck(deckText), fixtures: fixture }).errors).toEqual([
      { path: "$.surfaces[0].copy", message: 'A screen surface needs a title copy reference in ready; declare { when, as: "title" } on its surface or slot.' },
    ]);
    m.surfaces[0]!.slots[1]!.copy["catalog.empty"] = { when: ["ready"], as: "title" };
    expectIssue(checkModel(m, { catalog, deck: readCopyDeck(writeShownWhen(deckText, m)), fixtures: fixture }), '$.surfaces[0].slots[1].copy["catalog.empty"]', "slot is hidden there", "include that state");
  });

  test("state-specific title references jointly cover every state and inherited setup", () => {
    const m = structuredClone(base);
    m.surfaces[0]!.setups = [
      { id: "filterMenu", label: "Filter menu", event: "filter" },
      { id: "emptyHelp", label: "Empty help", event: "filter", state: "absent" },
    ];
    m.surfaces[0]!.copy["catalog.title"] = { when: ["ready"], as: "title" };
    m.surfaces[0]!.slots[1]!.copy["catalog.empty"] = { when: "always", as: "title" };
    const text = deckText
      .replace("| catalog.title | Objects | catalog |", "| catalog.title | Objects | catalog · Ready; catalog · Filter menu |")
      .replace("catalog · Empty |", "catalog · Empty; catalog · Empty help |");
    expect(checkModel(m, { catalog, deck: readCopyDeck(text), fixtures: fixture }).errors).toEqual([]);
    m.surfaces[0]!.slots[1]!.copy["catalog.empty"] = ["absent"];
    expect(checkModel(m, { catalog, deck: readCopyDeck(text), fixtures: fixture }).errors).toEqual([
      { path: "$.surfaces[0].copy", message: 'A screen surface needs a title copy reference in absent, emptyHelp; declare { when, as: "title" } on its surface or slot.' },
    ]);
  });

  test("a setup-only title does not cover the setup's default state", () => {
    const m = structuredClone(base);
    m.surfaces[0]!.setups = [{ id: "confirm", label: "Confirm choice", event: "filter" }];
    m.surfaces[0]!.copy["catalog.title"] = { when: ["confirm"], as: "title" };
    m.surfaces[0]!.slots[1]!.copy["catalog.empty"] = { when: ["absent"], as: "title" };
    const text = deckText.replace("| catalog.title | Objects | catalog |", "| catalog.title | Objects | catalog · Confirm choice |");
    expect(checkModel(m, { catalog, deck: readCopyDeck(text), fixtures: fixture }).errors).toEqual([
      { path: "$.surfaces[0].copy", message: 'A screen surface needs a title copy reference in ready; declare { when, as: "title" } on its surface or slot.' },
    ]);
  });

  test("reports an uncovered setup alongside its invalid base-state diagnostic", () => {
    const m = structuredClone(base);
    m.states.other = { label: "Other", kind: "data", rule: "Show another view.", fixtures: { Object: "none" } };
    m.surfaces[0]!.setups = [{ id: "confirm", label: "Confirm choice", event: "filter", state: "other" }];
    expect(checkModel(m, { catalog, deck: readCopyDeck(deckText), fixtures: fixture }).errors).toEqual([
      { path: "$.surfaces[0].setups[0].state", message: "Setup state other must be rendered by catalog." },
      { path: "$.surfaces[0].copy", message: 'A screen surface needs a title copy reference in confirm; declare { when, as: "title" } on its surface or slot.' },
    ]);
  });

  for (const [channel, role, key, copy] of [
    ["screen", "title", "catalog.title", "Objects"],
    ["email", "subject", "catalog.title", "Objects"],
    ["email", "body", "catalog.intro", "Choose an object"],
    ["push", "title", "catalog.title", "Objects"],
    ["push", "body", "catalog.intro", "Choose an object"],
  ] as const) test(`${channel} ${role} reach respects slot states and their setups`, () => {
    const m = structuredClone(base);
    m.surfaces[0]!.channel = channel;
    m.surfaces[0]!.setups = [
      { id: "filterMenu", label: "Filter menu", event: "filter" },
      { id: "emptyHelp", label: "Empty help", event: "filter", state: "absent" },
    ];
    m.surfaces[0]!.copy["catalog.title"] = { when: "always", as: channel === "email" ? "subject" : "title" };
    if (channel !== "screen") m.surfaces[0]!.copy["catalog.intro"] = { when: "always", as: "body" };
    delete m.surfaces[0]!.copy[key];
    m.surfaces[0]!.slots[0]!.copy[key] = { when: "always", as: role };
    m.surfaces[0]!.slots[0]!.states = ["ready", "absent"];
    const text = deckText.replace("catalog · Empty |", "catalog · Empty; catalog · Empty help |");
    const fullReach = text.replace(`| ${key} | ${copy} | catalog |`, `| ${key} | ${copy} | catalog · Ready; catalog · Filter menu; catalog · Empty; catalog · Empty help |`);
    expect(checkModel(m, { catalog, deck: readCopyDeck(fullReach), fixtures: fixture }).errors).toEqual([]);
    m.surfaces[0]!.slots[0]!.states = ["ready"];
    const partialReach = text.replace(`| ${key} | ${copy} | catalog |`, `| ${key} | ${copy} | catalog · Ready; catalog · Filter menu |`);
    expect(checkModel(m, { catalog, deck: readCopyDeck(partialReach), fixtures: fixture }).errors).toEqual([
      { path: "$.surfaces[0].copy", message: `A ${channel} surface needs a ${role} copy reference in absent, emptyHelp; declare { when, as: "${role}" } on its surface or slot.` },
    ]);
  });

  test("rejects optional declarations for unknown contract fields", () => {
    expect(run().errors).toEqual([]);
    expectIssue(run((m) => { m.data.Object!.optional = ["missing"]; }), "$.data.Object.optional", "missing", "declared");
  });

  test("rejects duplicate optional field declarations", () => {
    const m = structuredClone(base);
    m.data.Object!.optional = ["price"];
    const fixtures = { Object: { ...fixture.Object, unobserved: [{ name: "Rake", price: null }] } };
    expect(checkModel(m, { catalog, deck: readCopyDeck(deckText), fixtures }).errors).toEqual([]);
    m.data.Object!.optional.push("price");
    expectIssue(checkModel(m, { catalog, deck: readCopyDeck(deckText), fixtures }), "$.data.Object.optional", "Duplicate", "unique");
  });

  test("reviewer probe requires a null scenario for every optional field", () => {
    const m = structuredClone(base);
    m.data.Object!.optional = ["price"];
    const fixtures = { Object: { ...fixture.Object, unobserved: [{ name: "Rake", price: null }] } };
    expect(checkModel(m, { catalog, deck: readCopyDeck(deckText), fixtures }).errors).toEqual([]);
    expectIssue(checkModel(m, { catalog, deck: readCopyDeck(deckText), fixtures: fixture }), "fixtures.Object", "null", "optional field price", "Add a scenario");
  });

  test("every optional field needs its own null case even when another field has one", () => {
    const m = structuredClone(base);
    m.data.Object!.optional = ["name", "price"];
    const fixtures = { Object: { ...fixture.Object, unobserved: [{ name: null, price: null }] } };
    expect(checkModel(m, { catalog, deck: readCopyDeck(deckText), fixtures }).errors).toEqual([]);
    expectIssue(checkModel(m, { catalog, deck: readCopyDeck(deckText), fixtures: { Object: { ...fixture.Object, unobserved: [{ name: "Rake", price: null }] } } }), "fixtures.Object", "optional field name", "Add a scenario");
  });

  test("optional fixture fields must still be declared in every row", () => {
    const m = structuredClone(base);
    m.data.Object!.optional = ["price"];
    const fixtures: Record<string, Record<string, Record<string, unknown>[]>> = { Object: { ...structuredClone(fixture.Object), unobserved: [{ name: "Rake", price: null }] } };
    expect(checkModel(m, { catalog, deck: readCopyDeck(deckText), fixtures }).errors).toEqual([]);
    delete fixtures.Object!.populated![0]!.price;
    expectIssue(checkModel(m, { catalog, deck: readCopyDeck(deckText), fixtures }), "fixtures.Object.populated[0].price", "Expected money", "correct type");
  });

  test("null is rejected when its field is not optional", () => {
    const m = structuredClone(base);
    m.data.Object!.optional = ["price"];
    const fixtures = { Object: { ...fixture.Object, unobserved: [{ name: "Rake", price: null }] } };
    expect(checkModel(m, { catalog, deck: readCopyDeck(deckText), fixtures }).errors).toEqual([]);
    delete m.data.Object!.optional;
    expectIssue(checkModel(m, { catalog, deck: readCopyDeck(deckText), fixtures }), "fixtures.Object.unobserved[0].price", "Expected money", "correct type");
  });

  test("optional fields still reject non-null values of the wrong kind", () => {
    const m = structuredClone(base);
    m.data.Object!.optional = ["price"];
    const fixtures: Record<string, Record<string, Record<string, unknown>[]>> = { Object: { ...structuredClone(fixture.Object), unobserved: [{ name: "Rake", price: null }] } };
    expect(checkModel(m, { catalog, deck: readCopyDeck(deckText), fixtures }).errors).toEqual([]);
    fixtures.Object!.populated![0]!.price = "unobserved";
    expectIssue(checkModel(m, { catalog, deck: readCopyDeck(deckText), fixtures }), "fixtures.Object.populated[0].price", "Expected money", "correct type");
  });

  test("optional null works for every field kind without exempting typed values", () => {
    const m = structuredClone(base);
    m.data.Object!.fields = { name: "text", price: "money", note: "longText", count: "number", date: "date", photo: "image", status: "enum", owner: "ref" };
    m.data.Object!.enums = { status: ["ready"] };
    m.data.Object!.optional = Object.keys(m.data.Object!.fields);
    const common = { note: "A useful note", count: 3, date: "2026-10-08", photo: "data:image/svg+xml,illustration", status: "ready", owner: "person1" };
    const fixtures: Record<string, Record<string, Record<string, unknown>[]>> = { Object: Object.fromEntries(Object.entries(fixture.Object).map(([scenario, rows]) => [scenario, rows.map((row) => ({ ...row, ...common }))])) };
    fixtures.Object!.unobserved = [Object.fromEntries(Object.keys(m.data.Object!.fields).map((field) => [field, null]))];
    expect(checkModel(m, { catalog, deck: readCopyDeck(deckText), fixtures }).errors).toEqual([]);
    fixtures.Object!.populated![0]!.count = "three";
    expectIssue(checkModel(m, { catalog, deck: readCopyDeck(deckText), fixtures }), "fixtures.Object.populated[0].count", "Expected number", "correct type");
  });
});

describe("reviewer regressions for shared decisions and event-bound records", () => {
  const sharedCatalog: PatternCatalog = {
    ...catalog,
    collection: { ...catalog.collection!, variants: [...catalog.collection!.variants, { id: "table", label: "Table" }] },
    browse: { ...catalog.collection!, id: "browse", scale: "flow", slots: { required: [], optional: [] }, variants: [...catalog.collection!.variants, { id: "table", label: "Table" }], renderer: "schematic", sharesVariants: "collection" },
  };

  test("reviewer probe reconciles a sameAs follower's status with its leader", () => {
    const m = structuredClone(base);
    m.surfaces[0]!.binding = { record: "collection", status: "proposed", variant: "list", candidates: ["list", "grid"] };
    m.flows[0]!.binding = { record: "browse", status: "proposed", variant: "list", candidates: ["grid", "list"], sameAs: "surface:catalog" };
    expect(checkModel(m, { catalog: sharedCatalog, deck: readCopyDeck(deckText), fixtures: fixture }).errors).toEqual([]);
    m.flows[0]!.binding.status = "fixed";
    m.flows[0]!.binding.because = "Keep this structure.";
    expectIssue(checkModel(m, { catalog: sharedCatalog, deck: readCopyDeck(deckText), fixtures: fixture }), "$.flows[0].binding.status", "Shared decision disagrees with surface:catalog", "proposed");
  });

  test("sameAs followers must select their leader's variant", () => {
    const m = structuredClone(base);
    m.surfaces[0]!.binding = { record: "collection", status: "proposed", variant: "list", candidates: ["list", "grid"] };
    m.flows[0]!.binding = { record: "browse", status: "proposed", variant: "list", candidates: ["grid", "list"], sameAs: "surface:catalog" };
    expect(checkModel(m, { catalog: sharedCatalog, deck: readCopyDeck(deckText), fixtures: fixture }).errors).toEqual([]);
    m.flows[0]!.binding.variant = "grid";
    expectIssue(checkModel(m, { catalog: sharedCatalog, deck: readCopyDeck(deckText), fixtures: fixture }), "$.flows[0].binding.variant", "Shared decision disagrees with surface:catalog", "use variant list");
  });

  test("reviewer probe compares sameAs candidate sets without depending on their order", () => {
    const m = structuredClone(base);
    m.surfaces[0]!.binding = { record: "collection", status: "open", candidates: ["list", "grid"] };
    m.flows[0]!.binding = { record: "browse", status: "open", candidates: ["grid", "list"], sameAs: "surface:catalog" };
    expect(checkModel(m, { catalog: sharedCatalog, deck: readCopyDeck(deckText), fixtures: fixture }).errors).toEqual([]);
    m.flows[0]!.binding.candidates = ["list", "table"];
    expectIssue(checkModel(m, { catalog: sharedCatalog, deck: readCopyDeck(deckText), fixtures: fixture }), "$.flows[0].binding.candidates", "Shared decision disagrees with surface:catalog", "use");
  });

  test("omitted sameAs candidates mean every header variant, not the leader's subset", () => {
    const m = structuredClone(base);
    m.surfaces[0]!.binding = { record: "collection", status: "open", candidates: ["table", "grid", "list"] };
    m.flows[0]!.binding = { record: "browse", status: "open", sameAs: "surface:catalog" };
    expect(checkModel(m, { catalog: sharedCatalog, deck: readCopyDeck(deckText), fixtures: fixture }).errors).toEqual([]);
    m.surfaces[0]!.binding!.candidates = ["list", "grid"];
    expectIssue(checkModel(m, { catalog: sharedCatalog, deck: readCopyDeck(deckText), fixtures: fixture }), "$.flows[0].binding.candidates", "Shared decision disagrees with surface:catalog", "use");
  });

  for (const status of ["open", "proposed"] as const) test(`reviewer probe requires a singleton ${status} decision to be fixed`, () => {
    const m = structuredClone(base);
    m.surfaces[0]!.binding!.status = status;
    if (status === "proposed") m.surfaces[0]!.binding!.variant = "list";
    expect(checkModel(m, { catalog, deck: readCopyDeck(deckText), fixtures: fixture }).errors).toEqual([]);
    m.surfaces[0]!.binding!.candidates = ["list"];
    expectIssue(checkModel(m, { catalog, deck: readCopyDeck(deckText), fixtures: fixture }), "$.surfaces[0].binding.candidates", "at least two fitting candidates", "make it fixed with a reason");
    m.surfaces[0]!.binding = { record: "collection", status: "fixed", variant: "list", candidates: ["list"], because: "Only a list fits this product." };
    expect(checkModel(m, { catalog, deck: readCopyDeck(deckText), fixtures: fixture }).errors).toEqual([]);
  });

  test("a nonfixed binding cannot hide a singleton header by omitting candidates", () => {
    const m = structuredClone(base);
    delete m.surfaces[0]!.binding!.candidates;
    expect(checkModel(m, { catalog, deck: readCopyDeck(deckText), fixtures: fixture }).errors).toEqual([]);
    const singleton = { ...catalog, collection: { ...catalog.collection!, variants: [catalog.collection!.variants[0]!] } };
    expectIssue(checkModel(m, { catalog: singleton, deck: readCopyDeck(deckText), fixtures: fixture }), "$.surfaces[0].binding.candidates", "at least two fitting candidates", "make it fixed");
  });

  for (const [scale, axis, event, kind] of [
    ["interaction", "asyncFeedback", "load", "operation"],
    ["motion", "routeMotion", "navigate", "route"],
  ] as const) {
    for (const absent of ["missing", "empty"] as const) test(`${scale} record slots reject ${absent} on bindings`, () => {
      const m = structuredClone(base);
      m.events[event] = { label: "Complete the operation", kind };
      m.surfaces[0]!.slots[1]!.record = "feedback";
      m.surfaces[0]!.slots[1]!.variant = "cue";
      m.surfaces[0]!.slots[1]!.on = [{ event, axis }];
      const records: PatternCatalog = { ...catalog, feedback: { ...catalog.absence!, id: "feedback", scale, studio: axis, events: ["progress"] } };
      expect(checkModel(m, { catalog: records, deck: readCopyDeck(deckText), fixtures: fixture }).errors).toEqual([]);
      if (absent === "missing") delete m.surfaces[0]!.slots[1]!.on;
      else m.surfaces[0]!.slots[1]!.on = [];
      expectIssue(checkModel(m, { catalog: records, deck: readCopyDeck(deckText), fixtures: fixture }), "$.surfaces[0].slots[1].on", "needs on", "matching");
    });

    test(`${scale} records reject an event-valid axis that disagrees with their header`, () => {
      const m = structuredClone(base);
      m.events[event] = { label: "Complete the operation", kind };
      m.surfaces[0]!.slots[1]!.record = "feedback";
      m.surfaces[0]!.slots[1]!.variant = "cue";
      m.surfaces[0]!.slots[1]!.on = [{ event, axis }];
      const records: PatternCatalog = { ...catalog, feedback: { ...catalog.absence!, id: "feedback", scale, studio: axis, events: ["progress"] } };
      expect(checkModel(m, { catalog: records, deck: readCopyDeck(deckText), fixtures: fixture }).errors).toEqual([]);
      m.surfaces[0]!.slots[1]!.on = [{ event: "filter", axis: "contentSwap" }];
      expectIssue(checkModel(m, { catalog: records, deck: readCopyDeck(deckText), fixtures: fixture }), "$.surfaces[0].slots[1].on[0].axis", `needs interaction axis ${axis}`, "matching semantic event");
    });
  }

  test("reports a duplicate surface id without looking up its interaction slot on the duplicate", () => {
    const m = structuredClone(base);
    m.events.load = { label: "Load objects", kind: "operation" };
    m.surfaces[0]!.slots[1]!.record = "feedback";
    m.surfaces[0]!.slots[1]!.on = [{ event: "load", axis: "asyncFeedback" }];
    const records: PatternCatalog = { ...catalog, feedback: { ...catalog.absence!, id: "feedback", scale: "interaction", studio: "asyncFeedback", events: ["progress"] } };
    expect(checkModel(m, { catalog: records, deck: readCopyDeck(deckText), fixtures: fixture }).errors).toEqual([]);
    const duplicate = structuredClone(base.surfaces[0]!);
    duplicate.slots.splice(1, 1);
    duplicate.copy["catalog.empty"] = ["absent"];
    m.surfaces.push(duplicate);
    expect(checkModel(m, { catalog: records, deck: readCopyDeck(deckText), fixtures: fixture }).errors).toEqual([
      { path: "$.surfaces[1].id", message: "Identifier catalog is already used at $.surfaces[0].id; flows, surfaces, states and events need distinct names." },
    ]);
  });

  test("duplicate slot ids do not borrow on bindings from the first slot", () => {
    const m = structuredClone(base);
    m.events.load = { label: "Load objects", kind: "operation" };
    m.surfaces[0]!.slots[1]!.record = "feedback";
    m.surfaces[0]!.slots[1]!.on = [{ event: "load", axis: "asyncFeedback" }];
    const records: PatternCatalog = { ...catalog, feedback: { ...catalog.absence!, id: "feedback", scale: "interaction", studio: "asyncFeedback", events: ["progress"] } };
    expect(checkModel(m, { catalog: records, deck: readCopyDeck(deckText), fixtures: fixture }).errors).toEqual([]);
    const duplicate = structuredClone(m.surfaces[0]!.slots[1]!);
    delete duplicate.on;
    m.surfaces[0]!.slots.push(duplicate);
    expect(checkModel(m, { catalog: records, deck: readCopyDeck(deckText), fixtures: fixture }).errors).toEqual([
      { path: "$.surfaces[0].slots", message: "Duplicate identifier state; use unique names." },
      { path: "$.surfaces[0].slots[2].on", message: "Interaction/motion pattern feedback needs on; bind it to a matching semantic event and interaction axis." },
    ]);
  });

  for (const [axis, kind, wrongKind] of [
    ["layerArrival", "layer", "swap"],
    ["controlResponse", "press", "swap"],
    ["contentSwap", "swap", "operation"],
    ["asyncFeedback", "operation", "swap"],
    ["routeMotion", "route", "swap"],
    ["themeMotion", "theme", "swap"],
  ] as const) test(`a non-axis motion-language studio accepts semantically valid ${axis} bindings`, () => {
    const m = structuredClone(base);
    m.events.respond = { label: "Respond to the change", kind };
    m.surfaces[0]!.slots[1]!.record = "motion-language";
    m.surfaces[0]!.slots[1]!.on = [{ event: "respond", axis }];
    const records: PatternCatalog = { ...catalog, "motion-language": { ...catalog.absence!, id: "motion-language", scale: "motion", studio: "motion", events: ["change"] } };
    expect(checkModel(m, { catalog: records, deck: readCopyDeck(deckText), fixtures: fixture }).errors).toEqual([]);
    m.events.respond!.kind = wrongKind;
    expect(checkModel(m, { catalog: records, deck: readCopyDeck(deckText), fixtures: fixture }).errors).toEqual([
      { path: "$.surfaces[0].slots[1].on[0].axis", message: `Interaction axis ${axis} does not treat ${wrongKind}; bind it to the matching semantic event.` },
    ]);
  });

  test("never words match declared forms case-insensitively but not fragments", () => {
    const m = structuredClone(base);
    m.entities[0]!.never = ["listing"];
    const plural = deckText.replace("Choose an object", "View listings and relisting history");
    expect(checkModel(m, { catalog, deck: readCopyDeck(plural), fixtures: fixture }).warnings).toEqual([]);
    m.entities[0]!.never = ["listing", "listings"];
    const fragment = deckText.replace("Choose an object", "View relisting history");
    expect(checkModel(m, { catalog, deck: readCopyDeck(fragment), fixtures: fixture }).warnings).toEqual([]);
    for (const [copy, word] of [["View LISTING.", "listing"], ["View LISTINGS and relisting history", "listings"]] as const) {
      const result = checkModel(m, { catalog, deck: readCopyDeck(deckText.replace("Choose an object", copy)), fixtures: fixture });
      expect(result.errors).toEqual([]);
      expect(result.warnings).toEqual([
        { path: "copy.md:5", message: `catalog.intro uses banned word "${word}" for object; use its declared entity words instead.` },
      ]);
    }
  });
});

describe("previously uncovered model validation branches", () => {
  test("a slot-bound record rejects an unsupported placement id", () => {
    const m = structuredClone(base);
    const records = { ...catalog, collection: { ...catalog.collection!, slots: { required: ["primary"], optional: ["state", "outcome"] } } };
    expect(checkModel(m, { catalog: records, deck: readCopyDeck(deckText), fixtures: fixture }).errors).toEqual([]);
    m.surfaces[0]!.slots[1]!.id = "outcome";
    expectIssue(checkModel(m, { catalog: records, deck: readCopyDeck(deckText), fixtures: fixture }), "$.surfaces[0].slots[1].id", "not a supported placement", "use a declared slot id");
  });

  test("a surface-scale record belongs on the surface rather than a slot", () => {
    const m = structuredClone(base);
    const records: PatternCatalog = { ...catalog, panel: { ...catalog.collection!, id: "panel", slots: { required: ["state"], optional: [] }, copy: [] } };
    expect(checkModel(m, { catalog: records, deck: readCopyDeck(deckText), fixtures: fixture }).errors).toEqual([]);
    m.surfaces[0]!.slots[1]!.record = "panel";
    m.surfaces[0]!.slots[1]!.variant = "list";
    expectIssue(checkModel(m, { catalog: records, deck: readCopyDeck(deckText), fixtures: fixture }), "$.surfaces[0].slots[1].record", "belongs on the surface binding", "use a local");
  });

  const navCases: { name: string; path: string; message: string; correction: string; change: (model: ProductModel) => void }[] = [
    { name: "item surface", path: "$.nav.items[0].surface", message: "Unknown surface missing", correction: "declare it in surfaces", change: (m) => { m.nav.items[0]!.surface = "missing"; } },
    { name: "item copy", path: "$.nav.items[0].copy", message: "Missing copy key nav.missing", correction: "add it to the deck", change: (m) => { m.nav.items[0]!.copy = "nav.missing"; } },
    { name: "menu surface", path: "$.nav.menu", message: "Unknown surface missing", correction: "menu entries are surface ids", change: (m) => { m.nav.menu = ["missing"]; } },
    { name: "global action", path: "$.nav.globalAction", message: "Unknown event missing", correction: "declare the global action in events", change: (m) => { m.nav.globalAction = "missing"; } },
  ];
  for (const item of navCases) test(`navigation rejects an undeclared ${item.name}`, () => {
    const m = structuredClone(base);
    m.nav.menu = ["catalog"];
    m.nav.globalAction = "filter";
    expect(checkModel(m, { catalog, deck: readCopyDeck(deckText), fixtures: fixture }).errors).toEqual([]);
    item.change(m);
    expectIssue(checkModel(m, { catalog, deck: readCopyDeck(deckText), fixtures: fixture }), item.path, item.message, item.correction);
  });

  test("setup ids cannot collide with a state on the same surface", () => {
    const m = structuredClone(base);
    m.surfaces[0]!.setups = [{ id: "confirm", label: "Confirm choice", event: "filter", state: "absent" }];
    expect(checkModel(m, { catalog, deck: readCopyDeck(writeShownWhen(deckText, m)), fixtures: fixture }).errors).toEqual([]);
    m.surfaces[0]!.setups[0]!.id = "absent";
    expectIssue(checkModel(m, { catalog, deck: readCopyDeck(writeShownWhen(deckText, m)), fixtures: fixture }), "$.surfaces[0].setups[0].id", "collides with a state", "choose a distinct setup id");
  });

  test("enum fields require declared allowed values", () => {
    const m = structuredClone(base);
    m.data.Object!.fields.status = "enum";
    m.data.Object!.enums = { status: ["ready"] };
    const fixtures = { Object: Object.fromEntries(Object.entries(fixture.Object).map(([scenario, rows]) => [scenario, rows.map((row) => ({ ...row, status: "ready" }))])) };
    expect(checkModel(m, { catalog, deck: readCopyDeck(deckText), fixtures }).errors).toEqual([]);
    delete m.data.Object!.enums;
    expectIssue(checkModel(m, { catalog, deck: readCopyDeck(deckText), fixtures }), "$.data.Object.enums.status", "Declare the enum's allowed values");
  });

  test("enum declarations cannot target a non-enum field", () => {
    expect(run().errors).toEqual([]);
    expectIssue(run((m) => { m.data.Object!.enums = { name: ["Spade", "Drill"] }; }), "$.data.Object.enums.name", "Declare this field as enum or remove");
  });

  test("enum fixture values must be one of the declared options", () => {
    const m = structuredClone(base);
    m.data.Object!.fields.status = "enum";
    m.data.Object!.enums = { status: ["ready", "pending"] };
    const fixtures = { Object: Object.fromEntries(Object.entries(fixture.Object).map(([scenario, rows]) => [scenario, rows.map((row) => ({ ...row, status: "ready" }))])) };
    expect(checkModel(m, { catalog, deck: readCopyDeck(deckText), fixtures }).errors).toEqual([]);
    fixtures.Object.populated![0]!.status = "missing";
    expectIssue(checkModel(m, { catalog, deck: readCopyDeck(deckText), fixtures }), "fixtures.Object.populated[0].status", "Expected enum (ready, pending)", "correct type");
  });

  for (const date of ["not-a-date", "2026-02-30"]) test(`date fixtures reject ${date}`, () => {
    const m = structuredClone(base);
    m.data.Object!.fields.editedAt = "date";
    const fixtures = { Object: Object.fromEntries(Object.entries(fixture.Object).map(([scenario, rows]) => [scenario, rows.map((row) => ({ ...row, editedAt: "2026-10-08" }))])) };
    expect(checkModel(m, { catalog, deck: readCopyDeck(deckText), fixtures }).errors).toEqual([]);
    fixtures.Object.populated![0]!.editedAt = date;
    expectIssue(checkModel(m, { catalog, deck: readCopyDeck(deckText), fixtures }), "fixtures.Object.populated[0].editedAt", "Expected date", "correct type");
  });

  test("a contract max cannot be lower than its typical count", () => {
    expect(run().errors).toEqual([]);
    expectIssue(run((m) => { m.data.Object!.max = 1; }), "$.data.Object.max", "max must be at least typical");
  });

  test("fixture scenario counts cannot exceed the declared max", () => {
    const m = structuredClone(base);
    m.data.Object!.max = 2;
    const fixtures = { Object: { ...fixture.Object, crowded: [{ name: "Rake", price: 1 }, { name: "Saw", price: 2 }] } };
    expect(checkModel(m, { catalog, deck: readCopyDeck(deckText), fixtures }).errors).toEqual([]);
    fixtures.Object.crowded.push({ name: "Hoe", price: 3 });
    expectIssue(checkModel(m, { catalog, deck: readCopyDeck(deckText), fixtures }), "fixtures.Object.crowded", "Scenario count exceeds max (2)");
  });
});

describe("file and command behavior", () => {
  test("loads model-relative companions and reports malformed fixture JSON", async () => { const dir = await mkdtemp(join(tmpdir(), "studio-model-test-")); try { await Promise.all([writeFile(join(dir, "product.json"), JSON.stringify(base)), writeFile(join(dir, "copy.md"), deckText), writeFile(join(dir, "fixtures.json"), JSON.stringify(fixture))]); expect((await checkModelFile(join(dir, "product.json"), catalog)).errors).toEqual([]); await writeFile(join(dir, "fixtures.json"), "{broken"); expect((await checkModelFile(join(dir, "product.json"), catalog)).errors[0]!.path).toBe("$.files.fixtures"); } finally { await rm(dir, { recursive: true, force: true }); } });
  test("resolves conventional docs paths from project root and rejects absolute companions", async () => {
    const dir = await mkdtemp(join(tmpdir(), "studio-model-docs-"));
    try {
      await mkdir(join(dir, "docs"));
      const path = join(dir, "docs", "product.json");
      const m = structuredClone(base);
      m.files = { copy: "docs/copy.md", fixtures: "docs/product.fixtures.json" };
      await Promise.all([writeFile(path, JSON.stringify(m)), writeFile(join(dir, "docs", "copy.md"), deckText), writeFile(join(dir, "docs", "product.fixtures.json"), JSON.stringify(fixture))]);
      expect(companionPath(path, "docs/copy.md")).toBe(join(dir, "docs", "copy.md"));
      expect((await checkModelFile(path, catalog)).errors).toEqual([]);
      m.files.copy = join(dir, "docs", "copy.md");
      await writeFile(path, JSON.stringify(m));
      expect((await checkModelFile(path, catalog)).errors[0]!.path).toBe("$.files.copy");
    } finally { await rm(dir, { recursive: true, force: true }); }
  });
  test("refreshes stale reach only after validation and leaves invalid decks untouched", async () => {
    const dir = await mkdtemp(join(tmpdir(), "studio-model-write-"));
    try {
      const path = join(dir, "product.json");
      const deckPath = join(dir, "copy.md");
      const stale = deckText.replace("catalog · Empty", "stale");
      await Promise.all([writeFile(path, JSON.stringify(base)), writeFile(deckPath, stale), writeFile(join(dir, "fixtures.json"), JSON.stringify(fixture))]);
      expect((await checkModelFile(path, catalog)).errors.some((e) => e.message.includes("Shown when"))).toBe(true);
      expect((await checkModelFile(path, catalog, { writeShownWhen: true })).errors).toEqual([]);
      expect(readCopyDeck(await readFile(deckPath, "utf8")).entries["catalog.empty"]!.shownWhen).toBe("catalog · Empty");
      const invalid = structuredClone(base);
      invalid.surfaces[0]!.slots[1]!.copy["catalog.empty"] = ["missing"];
      await Promise.all([writeFile(path, JSON.stringify(invalid)), writeFile(deckPath, stale)]);
      expect((await checkModelFile(path, catalog, { writeShownWhen: true })).errors.some((e) => e.message.includes("state or setup"))).toBe(true);
      expect(await readFile(deckPath, "utf8")).toBe(stale);
    } finally { await rm(dir, { recursive: true, force: true }); }
  });
  test("CLI help and usage have stable exit codes", async () => {
    const cwd = fileURLToPath(new URL("..", import.meta.url));
    for (const [args, expected] of [[["--help"], 0], [[], 1], [["--unknown"], 1]] as const) {
      const proc = Bun.spawn([process.execPath, "scripts/model-check.ts", ...args], { cwd, stdout: "ignore", stderr: "ignore" });
      expect(await proc.exited).toBe(expected);
    }
  });
  test("CLI passes samples and exits 1 with useful paths for six broken model kinds", async () => {
    const cwd = fileURLToPath(new URL("..", import.meta.url));
    const good = Bun.spawn([process.execPath, "scripts/model-check.ts", "--samples"], { cwd, stdout: "ignore", stderr: "pipe" });
    const [goodCode, goodErrors] = await Promise.all([good.exited, new Response(good.stderr).text()]);
    expect(goodCode, goodErrors).toBe(0);
    const sampleDir = new URL("../samples/shed/", import.meta.url);
    const sample = JSON.parse(await readFile(new URL("product.json", sampleDir), "utf8")) as ProductModel;
    const cases: { name: string; path: string; message: string; change: (model: ProductModel) => void }[] = [
      { name: "schema", path: "$.model", message: "1", change: (m) => { m.model = 9 as 1; } },
      { name: "surface", path: "$.flows[0].stages[0].surface", message: "Unknown surface", change: (m) => { m.flows[0]!.stages[0]!.surface = "missing"; } },
      { name: "variant", path: ".variant", message: "Unknown variant", change: (m) => { const s = m.surfaces.find((s) => s.binding)!; s.binding!.variant = "missing"; } },
      { name: "state", path: ".states", message: "undefined state", change: (m) => { m.surfaces[0]!.states.push("missing"); } },
      { name: "copy", path: ".copy", message: "Missing copy key", change: (m) => { m.surfaces[0]!.copy["broken.fixed"] = "always"; } },
      { name: "data", path: ".data.map", message: "Unknown contract field", change: (m) => { const s = m.surfaces.flatMap((s) => s.slots).find((s) => s.data)!; const key = Object.keys(s.data!.map)[0]!; s.data!.map[key] = "missing"; } },
    ];
    const dir = await mkdtemp(join(tmpdir(), "studio-model-cli-"));
    try {
      await Promise.all([writeFile(join(dir, "copy.md"), await readFile(new URL("copy.md", sampleDir))), writeFile(join(dir, "fixtures.json"), await readFile(new URL("fixtures.json", sampleDir)))]);
      for (const item of cases) {
        const model = structuredClone(sample);
        model.files = { copy: "copy.md", fixtures: "fixtures.json" };
        item.change(model);
        const path = join(dir, "product.json");
        await writeFile(path, JSON.stringify(model));
        const proc = Bun.spawn([process.execPath, "scripts/model-check.ts", path], { cwd, stdout: "ignore", stderr: "pipe" });
        const [code, stderr] = await Promise.all([proc.exited, new Response(proc.stderr).text()]);
        expect(code, item.name).toBe(1);
        expect(stderr, item.name).toContain(item.path);
        expect(stderr, item.name).toContain(item.message);
      }
    } finally { await rm(dir, { recursive: true, force: true }); }
  });
});

describe("reviewer regressions at file and CLI boundaries", () => {
  for (const [name, ending] of [
    ["missing trailing pipe", "stale"],
    ["escaped final pipe without a trailing delimiter", "stale \\|"],
  ] as const) test(`rejects a ${name} without a write repair loop`, async () => {
    const dir = await mkdtemp(join(tmpdir(), "studio-model-pipe-"));
    try {
      const path = join(dir, "product.json");
      const deckPath = join(dir, "copy.md");
      await Promise.all([writeFile(path, JSON.stringify(base)), writeFile(deckPath, deckText), writeFile(join(dir, "fixtures.json"), JSON.stringify(fixture))]);
      expect((await checkModelFile(path, catalog)).errors).toEqual([]);
      const invalid = deckText.replace("catalog · Empty |", ending);
      await writeFile(deckPath, invalid);
      for (let attempt = 0; attempt < 2; attempt++) {
        const result = await checkModelFile(path, catalog, { writeShownWhen: true });
        expect(result.errors).toEqual([
          { path: "copy.md:4", message: "Copy deck row is missing its trailing pipe; end the row with | before updating Shown when." },
          { path: '$.surfaces[0].slots[1].copy["catalog.empty"]', message: "Missing copy key catalog.empty; add it to the keyed deck." },
        ]);
        expect(await readFile(deckPath, "utf8")).toBe(invalid);
      }
    } finally { await rm(dir, { recursive: true, force: true }); }
  });

  for (const { name, whitespace } of [{ name: "NBSP", whitespace: "\u00a0" }, { name: "line separator", whitespace: "\u2028" }, { name: "paragraph separator", whitespace: "\u2029" }]) test(`repairs stale reach with ${name} whitespace idempotently`, async () => {
    const dir = await mkdtemp(join(tmpdir(), "studio-model-whitespace-"));
    try {
      const path = join(dir, "product.json");
      const deckPath = join(dir, "copy.md");
      const expected = "\u00a0| Key | Copy | Shown when |\u00a0\n\u00a0|---|---|---|\u00a0\n\u00a0| catalog.title | Objects | catalog |\u00a0\n\u00a0| catalog.empty | No objects yet | catalog · Empty |\u00a0\n\u00a0| catalog.intro | Choose an object | catalog |\u00a0\n".replaceAll("\u00a0", whitespace);
      await Promise.all([writeFile(path, JSON.stringify(base)), writeFile(deckPath, expected.replace("catalog · Empty", "stale")), writeFile(join(dir, "fixtures.json"), JSON.stringify(fixture))]);
      expect((await checkModelFile(path, catalog)).errors).toEqual([
        { path: "copy.md:4", message: 'Stale Shown when for catalog.empty; expected "catalog · Empty". Run model:check --write-shown-when.' },
      ]);
      for (let attempt = 0; attempt < 2; attempt++) {
        expect((await checkModelFile(path, catalog, { writeShownWhen: true })).errors).toEqual([]);
        expect(await readFile(deckPath, "utf8")).toBe(expected);
      }
      expect((await checkModelFile(path, catalog)).errors).toEqual([]);
    } finally { await rm(dir, { recursive: true, force: true }); }
  });

  const duplicateCases: { name: string; path: string; change: (json: string, model: ProductModel) => string }[] = [
    { name: "top-level duplicate", path: '$["model"]', change: (json) => json.replace('"model":1', '"model":1,"model":1') },
    { name: "nested duplicate", path: '$.product["id"]', change: (json, model) => json.replace('"product":{', `"product":{"id":${JSON.stringify(model.product.id)},`) },
    { name: "escaped equivalent key", path: '$.product["id"]', change: (json, model) => json.replace('"product":{', `"product":{"\\u0069d":${JSON.stringify(model.product.id)},`) },
    { name: "duplicate inside an array object", path: '$.product.users[0]["id"]', change: (json) => json.replace('"users":[{', '"users":[{"id":"duplicate",') },
  ];
  for (const item of duplicateCases) test(`file loading and CLI reject a ${item.name} before its last value wins`, async () => {
    const cwd = fileURLToPath(new URL("..", import.meta.url));
    const sampleDir = new URL("../samples/shed/", import.meta.url);
    const model = JSON.parse(await readFile(new URL("product.json", sampleDir), "utf8")) as ProductModel;
    model.files = { copy: "copy.md", fixtures: "fixtures.json" };
    const records = await readPatternCatalog(fileURLToPath(new URL("../../references/patterns/", import.meta.url)));
    const dir = await mkdtemp(join(tmpdir(), "studio-model-duplicate-"));
    try {
      const path = join(dir, "product.json");
      const text = JSON.stringify(model);
      await Promise.all([writeFile(path, text), writeFile(join(dir, "copy.md"), await readFile(new URL("copy.md", sampleDir))), writeFile(join(dir, "fixtures.json"), await readFile(new URL("fixtures.json", sampleDir)))]);
      expect((await checkModelFile(path, records)).errors).toEqual([]);
      const baseline = Bun.spawn([process.execPath, "scripts/model-check.ts", path], { cwd, stdout: "ignore", stderr: "pipe" });
      const [baselineCode, baselineErrors] = await Promise.all([baseline.exited, new Response(baseline.stderr).text()]);
      expect(baselineCode, baselineErrors).toBe(0);
      await writeFile(path, item.change(text, model));
      const result = await checkModelFile(path, records);
      expectIssue(result, item.path, "Duplicate JSON key", "keep one declaration");
      const proc = Bun.spawn([process.execPath, "scripts/model-check.ts", path], { cwd, stdout: "ignore", stderr: "pipe" });
      const [code, stderr] = await Promise.all([proc.exited, new Response(proc.stderr).text()]);
      expect(code).toBe(1);
      expect(stderr).toContain(item.path);
      expect(stderr).toContain("Duplicate JSON key");
      expect(stderr).toContain("keep one declaration");
    } finally { await rm(dir, { recursive: true, force: true }); }
  });
});

describe("machine record behavior", () => {
  const collection = catalog.collection!;
  const browse: PatternRecord = { ...collection, id: "browse", scale: "flow", renderer: "schematic", sharesVariants: "collection" };
  const scenarios: { name: string; records: { file: string; record: PatternRecord; prose?: string[] }[]; expected?: string }[] = [
    { name: "accepts matching headers and shared surface variants", records: [{ file: "collection", record: collection }, { file: "browse", record: browse }] },
    { name: "reports missing prose label", records: [{ file: "collection", record: collection, prose: ["List", "Tiles"] }], expected: 'header variant label "Grid"' },
    { name: "reports header filename mismatch", records: [{ file: "wrong", record: collection }], expected: "id must match filename" },
    { name: "reports studio option drift", records: [{ file: "feed", record: { ...collection, id: "feed", studio: "feedLayout" } }], expected: "requires variant timeline" },
    { name: "reports wrong shared-record scale", records: [{ file: "collection", record: collection }, { file: "browse", record: { ...browse, scale: "component" } }], expected: "must connect a flow record to a surface record" },
    { name: "reports shared variant label drift", records: [{ file: "collection", record: collection }, { file: "browse", record: { ...browse, variants: [{ id: "list", label: "List" }, { id: "grid", label: "Tiles" }] } }], expected: "exactly the variant ids and labels" },
    { name: "reports duplicate variant ids", records: [{ file: "collection", record: { ...collection, variants: [collection.variants[0]!, collection.variants[0]!] } }], expected: "variants.id contains duplicate" },
    { name: "reports a newline in a variant identifier", records: [{ file: "collection", record: { ...collection, variants: [{ id: "list\n", label: "List" }, collection.variants[1]!] } }], expected: "must be a camelCase id" },
  ];
  for (const scenario of scenarios) test(scenario.name, async () => {
    const dir = await mkdtemp(join(tmpdir(), "studio-pattern-test-"));
    try {
      for (const { file, record, prose } of scenario.records) {
        const header = Object.entries(record).map(([key, value]) => `${key}: ${JSON.stringify(value)}`).join("\n");
        const labels = prose ?? record.variants.map((v) => v.label);
        await writeFile(join(dir, `${file}.md`), `---\n${header}\n---\n# Pattern\n\n## Variants\n\n${labels.map((label) => `- **${label}:** A distinct structure.`).join("\n")}\n`);
      }
      if (scenario.expected) await expect(readPatternCatalog(dir)).rejects.toThrow(scenario.expected);
      else expect(Object.keys(await readPatternCatalog(dir))).toEqual(["browse", "collection"]);
    } finally { await rm(dir, { recursive: true, force: true }); }
  });
});
