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
  surfaces: [{ id: "catalog", question: "Which object fits?", route: "/objects", binding: { record: "collection", status: "open", candidates: ["list", "grid"] }, states: ["ready", "absent"], viewports: ["phone", "desktop"], copy: { "catalog.title": "always" }, slots: [{ id: "primary", data: { contract: "Object", many: true, map: { title: "name", price: "price" } }, copy: {}, on: [{ event: "filter", axis: "contentSwap" }] }, { id: "state", record: "absence", status: "fixed", variant: "cue", because: "Only one structure is needed.", states: ["absent"], copy: { "catalog.empty": ["absent"] } }] }],
  files: { copy: "copy.md", fixtures: "fixtures.json" },
};
const fixture = { Object: { populated: [{ name: "Spade", price: 4 }, { name: "Drill", price: 8 }], long: [{ name: "A deliberately long object name that wraps across several lines in a narrow viewport", price: 9 }], none: [] } };
const deckText = "| Key | Copy | Shown when |\n|---|---|---|\n| catalog.title | Objects | catalog |\n| catalog.empty | No objects yet | catalog · Empty |\n";
const run = (change?: (m: ProductModel) => void) => { const m = structuredClone(base); change?.(m); return checkModel(m, { catalog, deck: readCopyDeck(deckText), fixtures: structuredClone(fixture) }); };
const errors = (r: ModelCheckResult) => r.errors.map((e) => `${e.path}: ${e.message}`).join("\n");

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
