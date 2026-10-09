import { z } from "zod";

// Keep structural rules JSON-Schema representable; cross-file rules live in check.ts.
// Unlike `$`, this end-of-input assertion does not accept a final newline.
export const idSchema = z.string().regex(/^[a-z][A-Za-z0-9]*(?![\s\S])/, "Use a camelCase identifier starting with a lowercase letter");
const contractId = z.string().regex(/^[A-Za-z][A-Za-z0-9]*(?![\s\S])/, "Use an identifier, not a path");
export const copyKeySchema = z.string().regex(/^[a-z][A-Za-z0-9]*(?:\.[A-Za-z0-9]+)+(?![\s\S])/, "Use a dotted copy key, such as catalog.empty.title");
const text = z.string().min(1);
const reachLabel = z.string().regex(/^\S(?:[^\r\n\u2028\u2029]*\S)?(?![\s\S])/, "Use a single-line label without surrounding whitespace");
const ids = z.array(idSchema);
export const archetypeSchema = z.enum(["workspace", "feed", "commerce", "reader", "media", "companion", "canvas", "conversation", "utility"]);
export const interactionAxisSchema = z.enum(["layerArrival", "controlResponse", "contentSwap", "asyncFeedback", "routeMotion", "themeMotion"]);
export const bindingSchema = z.strictObject({
  record: z.string().regex(/^[a-z][a-z0-9]*(?:-[a-z0-9]+)*(?![\s\S])/),
  status: z.enum(["open", "proposed", "fixed"]),
  variant: text.optional(), candidates: z.array(text).min(1).optional(), because: text.optional(),
  sameAs: z.string().regex(/^(?:flow:[a-z][A-Za-z0-9]*|surface:[a-z][A-Za-z0-9]*|slot:[a-z][A-Za-z0-9]*\/[a-z][A-Za-z0-9]*)(?![\s\S])/).optional(),
});
const copyRefs = z.record(copyKeySchema, z.union([z.literal("always"), ids.min(1)]));
export const dataContractSchema = z.strictObject({
  fields: z.record(contractId, z.enum(["text", "longText", "number", "money", "date", "image", "enum", "ref"])),
  enums: z.record(contractId, z.array(text).min(1)).optional(),
  typical: z.number().int().min(0), max: z.number().int().min(0).optional(), long: z.array(contractId).optional(),
});
const slotSchema = z.strictObject({
  ...bindingSchema.partial().shape,
  id: idSchema,
  data: z.strictObject({ contract: contractId, many: z.boolean().optional(), map: z.record(contractId, contractId) }).optional(),
  copy: copyRefs, states: ids.min(1).optional(),
  on: z.array(z.strictObject({ event: idSchema, axis: interactionAxisSchema })).optional(),
});
export const productModelSchema = z.strictObject({
  $schema: text.optional(), model: z.literal(1),
  product: z.strictObject({ id: idSchema, outcome: text, archetype: archetypeSchema.optional(), users: z.array(z.strictObject({ id: idSchema, who: text, device: z.enum(["phone", "desktop", "both"]), surfaces: ids.min(1) })).min(1) }),
  entities: z.array(z.strictObject({ id: idSchema, words: z.array(text).min(1), never: z.array(text).optional(), contract: contractId })),
  capabilities: z.array(z.strictObject({ id: idSchema, real: z.boolean(), note: text.optional() })),
  data: z.record(contractId, dataContractSchema),
  states: z.record(idSchema, z.strictObject({ label: reachLabel, rule: text, kind: z.enum(["data", "auth", "connectivity", "operation", "firstRun"]), fixtures: z.record(contractId, text) })),
  events: z.record(idSchema, z.strictObject({ label: text, kind: z.enum(["press", "submit", "operation", "layer", "swap", "route", "theme"]), needs: idSchema.optional() })),
  nav: z.strictObject({ items: z.array(z.strictObject({ surface: idSchema, copy: copyKeySchema })), menu: ids.optional(), globalAction: idSchema.optional(), inAYear: z.number().int().min(0) }),
  flows: z.array(z.strictObject({ id: idSchema, goal: text, priority: z.enum(["must", "should", "later"]), binding: bindingSchema.optional(), stages: z.array(z.strictObject({ id: idSchema, surface: idSchema, state: idSchema.optional(), next: ids.optional() })).min(1), ends: text, needs: ids })).min(1),
  surfaces: z.array(z.strictObject({ id: idSchema, question: text, route: text, channel: z.enum(["screen", "email", "push"]).optional(), binding: bindingSchema.optional(), slots: z.array(slotSchema), states: ids.min(1), setups: z.array(z.strictObject({ id: idSchema, label: reachLabel, event: idSchema, state: idSchema.optional() })).optional(), viewports: z.array(z.enum(["phone", "desktop"])).min(1), copy: copyRefs })).min(1),
  axes: z.array(z.strictObject({ id: idSchema, question: text, why: text, surfaces: ids.min(1), options: z.array(z.strictObject({ id: idSchema, label: text, note: text })).min(2) })).optional(),
  files: z.strictObject({ copy: text, fixtures: text }),
}).meta({ title: "Frontend Studio product model", description: "Version 1 product structure. Run model:check for cross-file references, fixed-copy reach and fixture contracts." });

export type ProductModel = z.infer<typeof productModelSchema>;
export type Binding = z.infer<typeof bindingSchema>;
export type DataContract = z.infer<typeof dataContractSchema>;
export type CopyRefs = ProductModel["surfaces"][number]["copy"];
export type InteractionAxis = z.infer<typeof interactionAxisSchema>;
