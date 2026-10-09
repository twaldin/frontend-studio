import { productModelSchema, type Binding, type CopyRefs, type ProductModel } from "./schema";
import type { PatternCatalog } from "./patterns";

export interface ModelIssue { path: string; message: string }
export interface CopyEntry { text: string; shownWhen: string; line: number }
export interface CopyDeck { entries: Record<string, CopyEntry>; errors: ModelIssue[] }
export interface ModelInputs { catalog: PatternCatalog; deck: CopyDeck; fixtures: unknown }
export interface ModelCheckResult { model?: ProductModel; errors: ModelIssue[]; warnings: ModelIssue[] }

// Models use user-authored names: prototype properties are never declared references.
function own<T>(record: Record<string, T>, key: string): T | undefined {
  return Object.hasOwn(record, key) ? record[key] : undefined;
}

function copyReference(ref: CopyRefs[string]): { when: "always" | string[]; as: string } {
  return typeof ref === "object" && !Array.isArray(ref) ? { when: ref.when, as: ref.as ?? "text" } : { when: ref, as: "text" };
}

function copyTargets(surface: ProductModel["surfaces"][number], when: "always" | string[], slotStates?: string[]): string[] {
  const ids = when === "always" ? slotStates ?? surface.states : when;
  return ids.flatMap((id) => surface.states.includes(id)
    ? [id, ...(surface.setups ?? []).filter((setup) => (setup.state ?? surface.states[0]) === id).map((setup) => setup.id)]
    : [id]);
}

/** Parse the keyed table without treating escaped copy pipes as column separators. */
export function readCopyDeck(markdown: string): CopyDeck {
  const entries: CopyDeck["entries"] = {};
  const errors: ModelIssue[] = [];
  let table = false;
  for (const [i, line] of markdown.split(/\r?\n/).entries()) {
    if (!line.trimStart().startsWith("|")) { table = false; continue; }
    const cells: string[] = [];
    let cell = "";
    const row = line.trim();
    for (let n = 1; n < row.length; n++) {
      const char = row[n]!;
      if (char === "\\" && (row[n + 1] === "|" || row[n + 1] === "\\")) { cell += row[++n]; continue; }
      if (char === "|") { cells.push(cell.trim()); cell = ""; } else cell += char;
    }
    if (cell.trim()) cells.push(cell.trim());
    if (cells.join("|") === "Key|Copy|Shown when") { table = true; continue; }
    if (!table || cells.every((c) => /^:?-+:?$/.test(c))) continue;
    const path = `copy.md:${i + 1}`;
    if (cell.length > 0) { errors.push({ path, message: "Copy deck row is missing its trailing pipe; end the row with | before updating Shown when." }); continue; }
    if (cells.length !== 3) { errors.push({ path, message: "Use exactly Key | Copy | Shown when; escape literal pipes as \\|." }); continue; }
    const [key, text, shown] = cells as [string, string, string];
    if (!/^[a-z][A-Za-z0-9]*(?:\.[A-Za-z0-9]+)+$/.test(key)) { errors.push({ path, message: `Invalid copy key ${JSON.stringify(key)}; use a dotted key.` }); continue; }
    if (Object.hasOwn(entries, key)) { errors.push({ path, message: `duplicate copy key ${key}; keep one row per key.` }); continue; }
    if (!text) errors.push({ path, message: `Copy for ${key} is empty; write the fixed string.` });
    entries[key] = { text, shownWhen: shown, line: i + 1 };
  }
  if (!Object.keys(entries).length) errors.push({ path: "copy.md", message: "Add a Key | Copy | Shown when table with the fixed product strings." });
  return { entries, errors };
}

/** Canonical deck reach column, in surface and model declaration order. */
export function shownWhen(model: ProductModel): Record<string, string> {
  const targets: Record<string, Set<string>> = {};
  for (const surface of model.surfaces) {
    for (const { copy, states } of [{ copy: surface.copy, states: undefined }, ...surface.slots]) {
      for (const [key, ref] of Object.entries(copy)) {
        const { when } = copyReference(ref);
        const stateIds = when === "always" ? states : when;
        const labels = stateIds ? copyTargets(surface, stateIds).map((id) => {
          const label = surface.states.includes(id) ? own(model.states, id)?.label : surface.setups?.find((setup) => setup.id === id)?.label;
          return `${surface.id} · ${label ?? id}`;
        }) : [surface.id];
        const set = targets[key] ??= new Set();
        for (const label of labels) set.add(label);
      }
    }
  }
  return Object.fromEntries(Object.entries(targets).map(([key, values]) => [key, [...values].join("; ")]));
}

/** Replace only the generated reach cells, preserving copy, prose and row order. */
export function writeShownWhen(markdown: string, model: ProductModel): string {
  const reach = shownWhen(model);
  const entries = new Map(Object.entries(readCopyDeck(markdown).entries).map(([key, entry]) => [entry.line, key] as const));
  return markdown.split(/(?<=\n)/).map((line, index) => {
    const key = entries.get(index + 1);
    if (!key || !Object.hasOwn(reach, key)) return line;
    const pipes: number[] = [];
    for (let n = 0; n < line.length; n++) {
      if (line[n] === "\\" && (line[n + 1] === "|" || line[n + 1] === "\\")) n++;
      else if (line[n] === "|") pipes.push(n);
    }
    const escaped = reach[key]!.replace(/\\/g, "\\\\").replace(/\|/g, "\\|");
    return `${line.slice(0, pipes[2]! + 1)} ${escaped} ${line.slice(pipes[3]!)}`;
  }).join("");
}

/** Structural and cross-file validation. Errors prevent a walk; warnings report product scope. */
export function checkModel(raw: unknown, inputs: ModelInputs): ModelCheckResult {
  const reserved: ModelIssue[] = [];
  const pending = [{ value: raw, path: "$" }];
  while (pending.length) {
    const { value, path } = pending.pop()!;
    if (!value || typeof value !== "object") continue;
    for (const [key, child] of Object.entries(value)) {
      const childPath = `${path}[${JSON.stringify(key)}]`;
      if (key === "__proto__") reserved.push({ path: childPath, message: "Reserved key __proto__; use a declared identifier instead." });
      else if (child && typeof child === "object") pending.push({ value: child, path: childPath });
    }
  }
  if (reserved.length) return { errors: reserved, warnings: [] };
  const parsed = productModelSchema.safeParse(raw);
  if (!parsed.success) return { errors: parsed.error.issues.map((issue) => ({ path: "$" + issue.path.map((p) => typeof p === "number" ? `[${p}]` : /^[A-Za-z][A-Za-z0-9]*$/.test(String(p)) ? `.${String(p)}` : `[${JSON.stringify(p)}]`).join(""), message: issue.message })), warnings: [] };
  const model = parsed.data;
  const errors = [...inputs.deck.errors];
  const warnings: ModelIssue[] = [];
  const fail = (path: string, message: string) => { errors.push({ path, message }); };
  const warn = (path: string, message: string) => { warnings.push({ path, message }); };
  const unique = (values: string[], path: string) => { const seen = new Set<string>(); for (const id of values) { if (seen.has(id)) fail(path, `Duplicate identifier ${id}; use unique names.`); seen.add(id); } };
  const surfaceById = new Map(model.surfaces.map((s) => [s.id, s]));
  const capabilities = new Map(model.capabilities.map((c) => [c.id, c]));
  const globalIds = new Map<string, string>();
  for (const [id, path] of [...model.flows.map((f, i) => [f.id, `$.flows[${i}].id`] as const), ...model.surfaces.map((s, i) => [s.id, `$.surfaces[${i}].id`] as const), ...Object.keys(model.states).map((id) => [id, `$.states.${id}`] as const), ...Object.keys(model.events).map((id) => [id, `$.events.${id}`] as const)]) {
    if (globalIds.has(id)) fail(path, `Identifier ${id} is already used at ${globalIds.get(id)}; flows, surfaces, states and events need distinct names.`);
    globalIds.set(id, path);
  }
  unique(model.capabilities.map((c) => c.id), "$.capabilities");
  unique(model.entities.map((e) => e.id), "$.entities");
  unique(model.product.users.map((u) => u.id), "$.product.users");
  for (const [i, user] of model.product.users.entries()) for (const id of user.surfaces) if (!surfaceById.has(id)) fail(`$.product.users[${i}].surfaces`, `Unknown surface ${id}; declare it in surfaces.`);
  for (const [i, entity] of model.entities.entries()) if (!Object.hasOwn(model.data, entity.contract)) fail(`$.entities[${i}].contract`, `Unknown data contract ${entity.contract}; declare it in data.`);
  for (const [i, item] of model.nav.items.entries()) {
    if (!surfaceById.has(item.surface)) fail(`$.nav.items[${i}].surface`, `Unknown surface ${item.surface}; declare it in surfaces.`);
    if (!Object.hasOwn(inputs.deck.entries, item.copy)) fail(`$.nav.items[${i}].copy`, `Missing copy key ${item.copy}; add it to the deck.`);
  }
  for (const id of model.nav.menu ?? []) if (!surfaceById.has(id)) fail("$.nav.menu", `Unknown surface ${id}; menu entries are surface ids.`);
  if (model.nav.globalAction && !Object.hasOwn(model.events, model.nav.globalAction)) fail("$.nav.globalAction", `Unknown event ${model.nav.globalAction}; declare the global action in events.`);
  const checkCapability = (id: string, path: string) => { const c = capabilities.get(id); if (!c) fail(path, `Unknown capability ${id}; declare it in capabilities.`); else if (!c.real) warn(path, `Capability ${id} is imagined; do not imply the operation works.`); };
  const keysBySurface = new Map(model.surfaces.map((surface) => [surface.id, [...Object.keys(surface.copy), ...surface.slots.flatMap((slot) => Object.keys(slot.copy))]]));
  const bindings = new Map<string, { binding: Binding; path: string; copyPath: string; keys: string[]; on?: ProductModel["surfaces"][number]["slots"][number]["on"] }>();
  const mustSurfaces = new Set<string>();
  const deferredSurfaces = new Set<string>();
  for (const [i, flow] of model.flows.entries()) {
    const path = `$.flows[${i}]`;
    if (flow.binding) bindings.set(`flow:${flow.id}`, { binding: flow.binding, path: `${path}.binding`, copyPath: `${path}.stages`, keys: flow.stages.flatMap((stage) => keysBySurface.get(stage.surface) ?? []) });
    unique(flow.stages.map((s) => s.id), `${path}.stages`);
    for (const [n, stage] of flow.stages.entries()) {
      const p = `${path}.stages[${n}]`;
      const surface = surfaceById.get(stage.surface);
      if (!surface) fail(`${p}.surface`, `Unknown surface ${stage.surface}; declare it in surfaces.`);
      else if (stage.state && !surface.states.includes(stage.state)) fail(`${p}.state`, `State ${stage.state} is not rendered by ${stage.surface}; add it to that surface or choose one of its states.`);
      for (const next of stage.next ?? []) if (!flow.stages.some((s) => s.id === next)) fail(`${p}.next`, `Unknown stage ${next}; next references a stage in this flow.`);
      (flow.priority === "must" ? mustSurfaces : deferredSurfaces).add(stage.surface);
    }
    for (const need of flow.needs) checkCapability(need, `${path}.needs`);
  }
  for (const [id, event] of Object.entries(model.events)) if (event.needs) checkCapability(event.needs, `$.events.${id}.needs`);
  const mustCopy = new Set([...mustSurfaces].flatMap((id) => keysBySurface.get(id) ?? []));
  const deferredCopy = new Set([...deferredSurfaces].flatMap((id) => keysBySurface.get(id) ?? []));
  const expectedReach = shownWhen(model);
  const referencedCopy = new Set<string>();
  const formatterKinds: Record<string, readonly string[]> = { relative: ["date"], time: ["date"], date: ["date"], currency: ["money"], number: ["number", "money"] };
  const requiredRoles: Record<NonNullable<ProductModel["surfaces"][number]["channel"]>, readonly string[]> = { screen: ["title"], email: ["subject", "body"], push: ["title", "body"] };
  type DataSource = NonNullable<ProductModel["surfaces"][number]["slots"][number]["data"]>;
  const validateCopy = (refs: CopyRefs, surface: ProductModel["surfaces"][number], path: string, sources: DataSource[], slotStates?: string[]) => {
    for (const [key, ref] of Object.entries(refs)) {
      const { when } = copyReference(ref);
      referencedCopy.add(key);
      const p = `${path}[${JSON.stringify(key)}]`;
      if (!Object.hasOwn(inputs.deck.entries, key)) fail(p, `Missing copy key ${key}; add it to the keyed deck.`);
      if (when !== "always") for (const id of when) {
        const setup = surface.setups?.find((s) => s.id === id);
        if (!surface.states.includes(id) && !setup) fail(p, `${id} is not a state or setup of ${surface.id}; use a reachable shown-when id.`);
        else if (slotStates && !slotStates.includes(setup?.state ?? (setup ? surface.states[0]! : id))) fail(p, `${key} is declared in ${id}, but its slot is hidden there; include that state in the slot.`);
      }
      const entry = own(inputs.deck.entries, key);
      for (const match of entry?.text.matchAll(/\{([^{}]+)\}/g) ?? []) {
        const [name, formatter, extra] = match[1]!.split(":");
        const kinds = sources.flatMap((source) => {
          const contract = own(model.data, source.contract);
          const field = own(source.map, name!) ?? name!;
          const kind = contract && own(contract.fields, field);
          return kind ? [kind] : [];
        });
        if (!kinds.length) fail(p, `Unknown placeholder ${name} in ${key}; map it to a declared contract field read by this placement.`);
        if (formatter !== undefined) {
          const allowed = own(formatterKinds, formatter);
          if (!allowed || extra !== undefined) fail(p, `Unknown formatter ${match[1]} in ${key}; choose ${Object.keys(formatterKinds).join(", ")}.`);
          else if (kinds.length && !kinds.some((kind) => allowed.includes(kind))) fail(p, `Formatter ${formatter} needs a ${allowed.join("/")} field; use the matching source field for ${key}.`);
        }
      }
    }
  };
  const axisKinds: Record<string, string[]> = { layerArrival: ["layer"], controlResponse: ["press", "submit"], contentSwap: ["swap"], asyncFeedback: ["operation"], routeMotion: ["route"], themeMotion: ["theme"] };
  for (const [i, surface] of model.surfaces.entries()) {
    const path = `$.surfaces[${i}]`;
    if (surface.binding) bindings.set(`surface:${surface.id}`, { binding: surface.binding, path: `${path}.binding`, copyPath: `${path}.copy`, keys: keysBySurface.get(surface.id)! });
    if (!mustSurfaces.has(surface.id) && !deferredSurfaces.has(surface.id)) fail(path, `No flow reaches surface ${surface.id}; add a stage in a must/should/later flow.`);
    else if (!mustSurfaces.has(surface.id)) warn(path, `Surface ${surface.id} is reached only by should/later flows; not designed this round.`);
    unique(surface.states, `${path}.states`);
    unique(surface.viewports, `${path}.viewports`);
    unique(surface.slots.map((s) => s.id), `${path}.slots`);
    unique((surface.setups ?? []).map((s) => s.id), `${path}.setups`);
    for (const [n, setup] of (surface.setups ?? []).entries()) {
      if (surface.states.includes(setup.id)) fail(`${path}.setups[${n}].id`, `Setup ${setup.id} collides with a state; choose a distinct setup id.`);
      if (!Object.hasOwn(model.events, setup.event)) fail(`${path}.setups[${n}].event`, `Unknown event ${setup.event}; declare it in events.`);
      if (setup.state && !surface.states.includes(setup.state)) fail(`${path}.setups[${n}].state`, `Setup state ${setup.state} must be rendered by ${surface.id}.`);
    }
    const surfaceSources = surface.slots.flatMap((slot) => slot.data ? [slot.data] : []);
    validateCopy(surface.copy, surface, `${path}.copy`, surfaceSources);
    const roles = new Map<string, Set<string>>();
    for (const { copy, states } of [{ copy: surface.copy, states: undefined }, ...surface.slots]) {
      for (const ref of Object.values(copy)) {
        const { when, as } = copyReference(ref);
        const targets = roles.get(as) ?? new Set<string>();
        for (const id of copyTargets(surface, when, states)) targets.add(id);
        roles.set(as, targets);
      }
    }
    const channel = surface.channel ?? "screen";
    for (const role of requiredRoles[channel]) {
      const missing = [...surface.states, ...(surface.setups ?? []).map((setup) => setup.id)].filter((id) => !roles.get(role)?.has(id));
      if (missing.length) fail(`${path}.copy`, `A ${channel} surface needs a ${role} copy reference in ${missing.join(", ")}; declare { when, as: "${role}" } on its surface or slot.`);
    }
    const contracts = new Set<string>();
    for (const [n, slot] of surface.slots.entries()) {
      const p = `${path}.slots[${n}]`;
      if (slot.record) {
        if (!slot.status) fail(`${p}.status`, "Set a bound slot's status to open, proposed or fixed.");
        else bindings.set(`slot:${surface.id}/${slot.id}`, { binding: slot as Binding, path: p, copyPath: `${p}.copy`, keys: Object.keys(slot.copy), on: slot.on });
      } else if ([slot.status, slot.variant, slot.candidates, slot.because, slot.sameAs].some((v) => v !== undefined)) fail(p, "A plain copy/data slot cannot carry binding decisions; add a record or remove binding fields.");
      for (const id of slot.states ?? []) if (!surface.states.includes(id)) fail(`${p}.states`, `Slot state ${id} is not rendered by ${surface.id}; use a surface state.`);
      validateCopy(slot.copy, surface, `${p}.copy`, slot.data ? [slot.data] : [], slot.states);
      if (slot.data) {
        contracts.add(slot.data.contract);
        const contract = own(model.data, slot.data.contract);
        if (!contract) fail(`${p}.data.contract`, `Unknown data contract ${slot.data.contract}; declare it in data.`);
        else for (const [field, target] of Object.entries(slot.data.map)) if (!Object.hasOwn(contract.fields, target)) fail(`${p}.data.map.${field}`, `Unknown contract field ${target} in ${slot.data.contract}; map to a declared field.`);
      }
      for (const [j, on] of (slot.on ?? []).entries()) {
        const event = own(model.events, on.event);
        if (!event) fail(`${p}.on[${j}].event`, `Unknown event ${on.event}; declare it in events.`);
        else if (!axisKinds[on.axis]?.includes(event.kind)) fail(`${p}.on[${j}].axis`, `Interaction axis ${on.axis} does not treat ${event.kind}; bind it to the matching semantic event.`);
      }
    }
    for (const id of surface.states) {
      const state = own(model.states, id);
      if (!state) { fail(`${path}.states`, `undefined state ${id}; add its rendering rule and fixtures to states.`); continue; }
      for (const contract of contracts) if (!Object.hasOwn(state.fixtures, contract)) fail(`$.states.${id}.fixtures`, `Add a fixture scenario for ${contract}; surface ${surface.id} reads that contract in this state.`);
    }
    const header = surface.binding && own(inputs.catalog, surface.binding.record);
    if (header) {
      for (const required of header.slots.required) {
        const slot = surface.slots.find((slot) => slot.id === required);
        if (!slot) fail(`${path}.slots`, `Fill required slot ${required} from pattern record ${header.id}.`);
        else if (!slot.record && !Object.keys(slot.copy).length && (!slot.data || !Object.keys(slot.data.map).length)) fail(`${path}.slots`, `Required slot ${required} is empty; supply its real copy, mapped data or pattern binding.`);
      }
      for (const slot of surface.slots) if (![...header.slots.required, ...header.slots.optional].includes(slot.id)) fail(`${path}.slots`, `Slot ${slot.id} is not declared by pattern record ${header.id}; use its header slot ids.`);
    }
  }
  for (const [i, axis] of (model.axes ?? []).entries()) {
    for (const id of axis.surfaces) if (!surfaceById.has(id)) fail(`$.axes[${i}].surfaces`, `Unknown surface ${id}; declare it in surfaces.`);
    unique(axis.options.map((o) => o.id), `$.axes[${i}].options`);
  }
  unique((model.axes ?? []).map((a) => a.id), "$.axes");
  const bannedWords = model.entities.flatMap((entity) => (entity.never ?? []).map((word) => ({
    entity: entity.id,
    word,
    pattern: new RegExp(`(?<![\\p{L}\\p{N}_])${word.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}(?![\\p{L}\\p{N}_])`, "iu"),
  })));
  for (const [key, entry] of Object.entries(inputs.deck.entries)) {
    if (!referencedCopy.has(key)) fail(`copy.md:${entry.line}`, `orphan copy key ${key}; reference it from a surface or slot, including hidden and channel copy.`);
    else if (entry.shownWhen !== expectedReach[key]) fail(`copy.md:${entry.line}`, `Stale Shown when for ${key}; expected ${JSON.stringify(expectedReach[key])}. Run model:check --write-shown-when.`);
    if (deferredCopy.has(key) && !mustCopy.has(key)) warn(`copy.md:${entry.line}`, `${key} is reached only by should/later surfaces; Every screen must still reach this fixed string.`);
    for (const { entity, word, pattern } of bannedWords) if (pattern.test(entry.text)) warn(`copy.md:${entry.line}`, `${key} uses banned word ${JSON.stringify(word)} for ${entity}; use its declared entity words instead.`);
  }
  for (const [address, { binding, path, copyPath, keys, on }] of bindings) {
    const header = own(inputs.catalog, binding.record);
    if (!header) { fail(`${path}.record`, `Unknown pattern record ${binding.record}; choose an id from patterns/index.json.`); continue; }
    if (address.startsWith("flow:") && header.scale !== "flow") fail(`${path}.record`, `A flow binding needs a flow record, not ${header.scale} record ${header.id}.`);
    if (address.startsWith("surface:") && !["flow", "surface"].includes(header.scale)) fail(`${path}.record`, `A surface binding needs a surface/flow record, not ${header.scale} record ${header.id}.`);
    if (address.startsWith("slot:") && header.scale === "surface") fail(`${path}.record`, `Surface record ${header.id} belongs on the surface binding; use a local flow/component/interaction record in this slot.`);
    const variants = header.variants.map((v) => v.id);
    if (binding.status === "open" && binding.variant) fail(`${path}.variant`, "An open binding has no selected variant; keep candidates, or mark the pick proposed/fixed.");
    if (binding.status !== "open" && !binding.variant) fail(`${path}.variant`, `A ${binding.status} binding needs a variant from ${binding.record}.`);
    if (binding.status === "fixed" && !binding.because?.trim()) fail(`${path}.because`, "A fixed decision needs its product reason or confirmed constraint.");
    if (binding.variant && !variants.includes(binding.variant)) fail(`${path}.variant`, `Unknown variant ${binding.variant} for ${binding.record}; choose ${variants.join(", ")}.`);
    if (binding.candidates) {
      unique(binding.candidates, `${path}.candidates`);
      for (const candidate of binding.candidates) if (!variants.includes(candidate)) fail(`${path}.candidates`, `Unknown candidate ${candidate} for ${binding.record}; choose ${variants.join(", ")}.`);
      if (binding.variant && !binding.candidates.includes(binding.variant)) fail(`${path}.variant`, `Variant ${binding.variant} is outside candidates; include the proposed/fixed pick or change it.`);
    }
    if (binding.status !== "fixed" && (binding.candidates ?? variants).length < 2) fail(`${path}.candidates`, "A non-fixed binding needs at least two fitting candidates; make it fixed with a reason or add fitting variants.");
    const linked = binding.sameAs ? bindings.get(binding.sameAs) : undefined;
    if (binding.sameAs) {
      if (!linked) fail(`${path}.sameAs`, `Unknown sameAs target ${binding.sameAs}; target an existing bound flow, surface or slot.`);
      else {
        const other = own(inputs.catalog, linked.binding.record);
        const shared = header.id === other?.id || header.sharesVariants === other?.id || other?.sharesVariants === header.id;
        const idsMatch = other && variants.length === other.variants.length && variants.every((id) => other.variants.some((v) => v.id === id));
        if (!shared || !idsMatch) fail(`${path}.sameAs`, `sameAs ${binding.sameAs} does not share the record's variant ids; use the same record or a declared sharesVariants relation.`);
        if (binding.status !== linked.binding.status) fail(`${path}.status`, `Shared decision disagrees with ${binding.sameAs}; use status ${linked.binding.status}.`);
        if (binding.variant !== linked.binding.variant) fail(`${path}.variant`, `Shared decision disagrees with ${binding.sameAs}; use variant ${linked.binding.variant ?? "none for an open decision"}.`);
        const candidates = binding.candidates ?? variants;
        const otherCandidates = linked.binding.candidates ?? other?.variants.map((variant) => variant.id) ?? [];
        if (candidates.length !== otherCandidates.length || !candidates.every((candidate) => otherCandidates.includes(candidate))) fail(`${path}.candidates`, `Shared decision disagrees with ${binding.sameAs}; use candidates ${otherCandidates.join(", ")}.`);
      }
    }
    if (header.renderer === "schematic" && binding.status !== "fixed" && !(linked && own(inputs.catalog, linked.binding.record)?.renderer === "variants" && header.sharesVariants === linked.binding.record)) fail(`${path}.status`, `Pattern ${binding.record} has a schematic renderer; make it fixed with a reason, or share a compatible variant-rendered decision.`);
    if (address.startsWith("slot:")) {
      const slotId = address.split("/")[1]!;
      if (![...header.slots.required, ...header.slots.optional].includes(slotId)) fail(`${path}.id`, `Slot ${slotId} is not a supported placement in pattern ${header.id}; use a declared slot id.`);
      if (header.scale === "interaction" || header.scale === "motion") {
        if (!on?.length) fail(`${path}.on`, `Interaction/motion pattern ${header.id} needs on; bind it to a matching semantic event and interaction axis.`);
        else if (header.studio && Object.hasOwn(axisKinds, header.studio)) for (const [i, event] of on.entries()) {
          if (event.axis !== header.studio) fail(`${path}.on[${i}].axis`, `Pattern ${header.id} needs interaction axis ${header.studio}; bind its matching semantic event.`);
        }
      }
    }
    for (const family of header.copy) if (!keys.some((key) => key.split(".").includes(family))) fail(copyPath, `Missing required copy family ${family} from ${header.id}; reference a deck key containing the .${family} segment in this placement's surface/slot copy.`);
    const visited = new Set<string>();
    let current: string | undefined = address;
    while (current && bindings.has(current)) {
      if (visited.has(current)) { fail(`${path}.sameAs`, `sameAs cycle reaches ${current}; share one independent binding instead.`); break; }
      visited.add(current); current = bindings.get(current)!.binding.sameAs;
    }
  }
  const fixtureObject = inputs.fixtures !== null && typeof inputs.fixtures === "object" && !Array.isArray(inputs.fixtures) ? inputs.fixtures as Record<string, unknown> : undefined;
  if (!fixtureObject) fail("$.files.fixtures", "Fixtures must be an object of contract → scenario → rows.");
  else {
    for (const name of Object.keys(fixtureObject)) if (!Object.hasOwn(model.data, name)) fail(`fixtures.${name}`, `Unknown data contract ${name}; remove it or declare it in data.`);
    for (const [name, contract] of Object.entries(model.data)) {
      const path = `$.data.${name}`;
      if (!Object.keys(contract.fields).length) fail(`${path}.fields`, "Declare the fields this contract supplies.");
      if (contract.max !== undefined && contract.typical > contract.max) fail(`${path}.max`, "max must be at least typical.");
      for (const [field, kind] of Object.entries(contract.fields)) if (kind === "enum" && (!contract.enums || !own(contract.enums, field))) fail(`${path}.enums.${field}`, "Declare the enum's allowed values.");
      for (const field of Object.keys(contract.enums ?? {})) if (own(contract.fields, field) !== "enum") fail(`${path}.enums.${field}`, "Declare this field as enum or remove its enum values.");
      for (const field of contract.long ?? []) if (!["text", "longText"].includes(own(contract.fields, field) ?? "")) fail(`${path}.long`, `Long case field ${field} must be a declared text/longText field.`);
      unique(contract.optional ?? [], `${path}.optional`);
      for (const field of contract.optional ?? []) if (!Object.hasOwn(contract.fields, field)) fail(`${path}.optional`, `Optional field ${field} must be declared in fields; declare it or remove it from optional.`);
      const scenarios = own(fixtureObject, name);
      if (!scenarios || typeof scenarios !== "object" || Array.isArray(scenarios)) { fail(`fixtures.${name}`, `Add named fixture scenarios for contract ${name}.`); continue; }
      const rowsByScenario = scenarios as Record<string, unknown>;
      const populated = rowsByScenario.populated;
      if (!Array.isArray(populated) || populated.length !== contract.typical) fail(`fixtures.${name}.populated`, `populated must contain exactly typical (${contract.typical}) rows.`);
      const values = new Map<string, Set<string>>();
      const nullFields = new Set<string>();
      let rowCount = 0;
      for (const [scenario, rows] of Object.entries(rowsByScenario)) {
        const p = `fixtures.${name}.${scenario}`;
        if (!Array.isArray(rows)) { fail(p, "A fixture scenario must be an array of rows (use [] for absence)."); continue; }
        rowCount += rows.length;
        if (contract.max !== undefined && rows.length > contract.max) fail(p, `Scenario count exceeds max (${contract.max}).`);
        for (const [i, rawRow] of rows.entries()) {
          if (!rawRow || typeof rawRow !== "object" || Array.isArray(rawRow)) { fail(`${p}[${i}]`, "A fixture row must be an object satisfying the contract."); continue; }
          const row = rawRow as Record<string, unknown>;
          for (const key of Object.keys(row)) if (!Object.hasOwn(contract.fields, key)) fail(`${p}[${i}].${key}`, `Unknown contract field ${key}; declare it or remove it.`);
          for (const [field, kind] of Object.entries(contract.fields)) {
            const value = own(row, field);
            if (value === null && contract.optional?.includes(field)) { nullFields.add(field); continue; }
            const enumValues = contract.enums ? own(contract.enums, field) : undefined;
            let ok = kind === "number" || kind === "money" ? typeof value === "number" && Number.isFinite(value) : typeof value === "string";
            if (ok && kind === "enum") ok = enumValues?.includes(value as string) ?? false;
            if (ok && kind === "date") {
              const date = value as string;
              const day = date.slice(0, 10);
              const dayTime = Date.parse(day);
              ok = /^\d{4}-\d{2}-\d{2}(?:T.*)?$/.test(date) && Number.isFinite(Date.parse(date)) && Number.isFinite(dayTime) && new Date(dayTime).toISOString().slice(0, 10) === day;
            }
            if (!ok) fail(`${p}[${i}].${field}`, `Expected ${kind}${kind === "enum" ? ` (${enumValues?.join(", ") ?? "declare values"})` : ""}; supply the contract field with the correct type.`);
            if ((kind === "text" || kind === "longText") && typeof value === "string" && value.trim()) { const set = values.get(field) ?? new Set<string>(); set.add(value); values.set(field, set); }
          }
        }
      }
      for (const field of contract.optional ?? []) if (!nullFields.has(field)) fail(`fixtures.${name}`, `Add a scenario with null for optional field ${field}; exercise its absent-value rendering rule.`);
      for (const field of contract.long ?? []) {
        const rows = rowsByScenario.long;
        const normalMax = Array.isArray(populated) ? Math.max(0, ...populated.map((r) => typeof r?.[field] === "string" ? r[field].length : 0)) : 0;
        if (!Array.isArray(rows) || !rows.some((row) => typeof row?.[field] === "string" && row[field].length >= 40 && row[field].length > normalMax)) fail(`fixtures.${name}.long`, `Add a long case for ${field}: at least 40 characters and longer than populated values.`);
      }
      for (const [field, set] of values) if (set.size === 1 && rowCount > 1) warn(`${path}.fields.${field}`, `Fixture value for ${name}.${field} is identical across fixture rows; this may be fixed copy. Move fixed strings to the keyed deck.`);
    }
    for (const [id, state] of Object.entries(model.states)) for (const [name, scenario] of Object.entries(state.fixtures)) {
      if (!Object.hasOwn(model.data, name)) fail(`$.states.${id}.fixtures.${name}`, `Unknown data contract ${name}; declare it in data.`);
      const scenarios = own(fixtureObject, name);
      if (!scenarios || typeof scenarios !== "object" || !Object.hasOwn(scenarios, scenario)) fail(`$.states.${id}.fixtures.${name}`, `Missing fixture scenario ${name}.${scenario}; add it to the fixtures file.`);
    }
  }
  return { model, errors, warnings };
}
