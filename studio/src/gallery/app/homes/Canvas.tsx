import { useState } from "react";
import {
  ChevronDown,
  Component,
  Frame,
  Hand,
  Hexagon,
  Image as ImagePlaceholder,
  LayoutGrid,
  LayoutTemplate,
  MessageCircle,
  MousePointer2,
  PenTool,
  RectangleHorizontal,
  Settings,
  Spline,
  StickyNote,
  TextCursorInput,
  Type,
  Users,
  type LucideIcon,
} from "lucide-react";
import { useGallery } from "@/gallery/context";
import { Button, Select, Switch, Input, cn } from "@/ui";
import { CARD_CLASSES_BY_STYLE, INPUT_CLASSES_BY_STYLE, NavIcon, iconStroke } from "../kit";

/** Nav icons in `content.app.nav` order. */
export const CANVAS_ICONS: readonly LucideIcon[] = [LayoutGrid, Component, LayoutTemplate, MessageCircle, Users, Settings];

const TOOLS: readonly { label: string; Icon: LucideIcon }[] = [
  { label: "Move", Icon: MousePointer2 },
  { label: "Frame", Icon: Frame },
  { label: "Rectangle", Icon: RectangleHorizontal },
  { label: "Pen", Icon: PenTool },
  { label: "Text", Icon: Type },
  { label: "Hand", Icon: Hand },
];

/** Layer icon per object type: the first word of `item.meta`. */
const LAYER_ICONS: Record<string, LucideIcon> = {
  Shape: Hexagon,
  Text: Type,
  Image: ImagePlaceholder,
  Button: RectangleHorizontal,
  Input: TextCursorInput,
  Note: StickyNote,
  Connector: Spline,
};

const ZOOMS = ["50%", "75%", "100%", "150%", "200%"];
const BOX_FIELDS = [["x", "X"], ["y", "Y"], ["w", "W"], ["h", "H"]] as const;
const SWATCHES = ["var(--chart-1)", "var(--chart-2)", "var(--chart-3)", "var(--chart-4)", "var(--chart-5)"] as const;
/** Selection handles: the four corners and four edge midpoints of the selection box. */
const HANDLES = ["left-0 top-0", "left-1/2 top-0", "left-full top-0", "left-0 top-1/2", "left-full top-1/2", "left-0 top-full", "left-1/2 top-full", "left-full top-full"] as const;

const CANVAS_DOTS = {
  backgroundImage: "radial-gradient(color-mix(in srgb, var(--muted-foreground) 40%, transparent) 1px, transparent 1px)",
  backgroundSize: "16px 16px",
};
const HERO_FILL = { background: "linear-gradient(135deg, var(--chart-3), var(--chart-1))" };

type Box = Record<(typeof BOX_FIELDS)[number][0], string>;

/** A design and whiteboard editor: toolbar, layers, a canvas with frames and one selected object, properties. */
export function CanvasHome() {
  const { choices, content } = useGallery();
  const { form, items, thread } = content.app;
  const primaryVariant = choices.buttons === "outline" ? "cta" : "primary";
  const secondaryVariant = choices.buttons === "outline" ? "outline" : "ghost";
  const stroke = iconStroke(choices.iconWeight);
  const rowFill = choices.rowHover === "fill";
  const inputClasses = INPUT_CLASSES_BY_STYLE[choices.inputs];
  const cardClasses = CARD_CLASSES_BY_STYLE[choices.cards];

  const byGroup = new Map<string, typeof items>();
  items.forEach((item) => {
    const name = item.group ?? "";
    byGroup.set(name, [...(byGroup.get(name) ?? []), item]);
  });
  const [welcome = "", signIn = "", notes = ""] = Array.from(byGroup.keys());
  const headline = byGroup.get(welcome)?.find((layer) => layer.meta.startsWith("Text"));
  const continueButton = byGroup.get(signIn)?.find((layer) => layer.meta.startsWith("Button"));
  const stickies = (byGroup.get(notes) ?? []).filter((layer) => layer.meta.startsWith("Note")).slice(0, 2);
  const selected = items.find((layer) => layer.meta.startsWith("Button")) ?? items[0];
  const size = selected?.meta.match(/(\d+) × (\d+)/);
  const collaborators = Array.from(new Set(thread.filter((message) => !message.mine).map((message) => message.author)));
  const selectField = form.fields.find((field) => field.kind === "select");
  const switchField = form.fields.find((field) => field.kind === "switch");

  const [tool, setTool] = useState(0);
  const [zoom, setZoom] = useState("100%");
  const [box, setBox] = useState<Box>({ x: "24", y: "756", w: size?.[1] ?? "342", h: size?.[2] ?? "52" });
  const [resizing, setResizing] = useState(selectField?.options?.[1] ?? "");
  const [clip, setClip] = useState(true);

  return (
    <div className="flex min-h-0 flex-1 flex-col">
      <div className="flex h-12 shrink-0 items-center gap-2 border-t border-b border-border px-3">
        <div role="toolbar" aria-label="Tools" className="flex items-center gap-0.5">
          {TOOLS.map(({ label, Icon }, index) => (
            <button
              key={label}
              type="button"
              aria-label={label}
              aria-pressed={index === tool}
              onClick={() => setTool(index)}
              className={cn(
                "grid h-control w-control place-items-center rounded-[var(--radius-control)] transition-colors duration-[var(--duration-fast)] ease-[var(--ease)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                index === tool ? "bg-accent-soft text-accent-text" : "text-muted-foreground hover:bg-accent hover:text-foreground",
              )}
            >
              <NavIcon Icon={Icon} iconWeight={choices.iconWeight} />
            </button>
          ))}
        </div>
        <div className="ml-auto flex shrink-0 items-center gap-3">
          <div className="flex pl-1.5">
            {collaborators.slice(0, 3).map((name) => (
              <span key={name} className="-ml-1.5 grid size-6 place-items-center rounded-full border-2 border-background bg-accent-soft text-chrome font-medium text-accent-text">
                {name.slice(0, 1)}
              </span>
            ))}
          </div>
          <div className="w-[104px]">
            <Select options={ZOOMS} value={zoom} onChange={setZoom} className={inputClasses} />
          </div>
          <Button variant={secondaryVariant}>Present</Button>
          <Button variant={primaryVariant}>Share</Button>
        </div>
      </div>

      <div className="flex min-h-0 flex-1">
        <aside className="flex w-[208px] shrink-0 flex-col border-r border-border">
          <div className="flex h-10 shrink-0 items-center px-3 text-chrome text-muted-foreground">Layers</div>
          <div className="min-h-0 flex-1 overflow-y-auto px-2 pb-3">
            {Array.from(byGroup, ([name, layers]) => (
              <div key={name} className="mb-1">
                <div className="flex h-row items-center gap-1.5 px-2 text-chrome font-medium text-foreground">
                  <ChevronDown aria-hidden="true" className="size-3.5 shrink-0 text-muted-foreground" strokeWidth={stroke} />
                  <NavIcon Icon={Frame} iconWeight={choices.iconWeight} />
                  <span className="min-w-0 flex-1 truncate">{name}</span>
                </div>
                <ul className="flex flex-col gap-0.5">
                  {layers.map((layer) => {
                    const Icon = LAYER_ICONS[layer.meta.split(" · ")[0] ?? ""] ?? RectangleHorizontal;
                    const active = layer === selected;
                    return (
                      <li key={layer.title}>
                        <button
                          type="button"
                          aria-current={active ? "true" : undefined}
                          className={cn(
                            "flex h-row w-full items-center gap-2 rounded-[var(--radius-control)] pr-2 pl-6 text-left text-body transition-colors duration-[var(--duration-fast)] ease-[var(--ease)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                            active ? "bg-accent-soft text-accent-text" : "text-muted-foreground",
                            !active && rowFill && "cursor-pointer hover:bg-accent",
                          )}
                        >
                          <NavIcon Icon={Icon} iconWeight={choices.iconWeight} />
                          <span className={cn("min-w-0 flex-1 truncate", active ? "text-accent-text" : "text-foreground")}>{layer.title}</span>
                          {layer.badge ? <span className="shrink-0 text-chrome text-muted-foreground">{layer.badge}</span> : null}
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}
          </div>
        </aside>

        <div className="relative min-w-0 flex-1 overflow-hidden bg-background" style={CANVAS_DOTS}>
          <div className="relative mx-auto h-full w-[340px]">
            <div className={cn("absolute top-[28px] left-0 h-[264px] w-[148px] rounded-md p-3", cardClasses)}>
              <span className="absolute -top-5 left-0 text-chrome text-muted-foreground">{welcome}</span>
              <span className="block size-6 rounded-md bg-primary" />
              <p className="heading mt-3 text-body leading-tight text-foreground">{headline?.body ?? headline?.title}</p>
              <div className="mt-3 h-14 rounded-md" style={HERO_FILL} />
              <div className="mt-3 h-2 rounded-full bg-border" />
              <div className="mt-1.5 h-2 w-2/3 rounded-full bg-border" />
              <div className="absolute inset-x-3 bottom-9 h-8">
                <div className="grid h-full place-items-center rounded-[var(--radius-control)] bg-primary text-chrome font-medium text-primary-foreground">{selected?.body ?? selected?.title}</div>
                <div className="pointer-events-none absolute -inset-px border border-primary">
                  {HANDLES.map((position) => (
                    <span key={position} className={cn("absolute size-2 -translate-x-1/2 -translate-y-1/2 border border-primary bg-background", position)} />
                  ))}
                </div>
                <span className="tabular absolute top-full left-1/2 mt-1.5 -translate-x-1/2 rounded-md bg-primary px-1.5 text-chrome whitespace-nowrap text-primary-foreground">
                  {box.w} × {box.h}
                </span>
              </div>
            </div>

            <svg aria-hidden="true" viewBox="0 0 44 12" className="absolute top-[140px] left-[148px] h-3 w-11 text-primary" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M2 6h38M35 2l5 4-5 4" />
            </svg>

            <div className={cn("absolute top-[28px] left-[192px] h-[264px] w-[148px] rounded-md p-3", cardClasses)}>
              <span className="absolute -top-5 left-0 text-chrome text-muted-foreground">{signIn}</span>
              <div className="h-3 w-2/3 rounded-full bg-border" />
              <div className="mt-4 flex h-8 items-center rounded-[var(--radius-control)] border border-border bg-background px-2">
                <div className="h-2 w-1/2 rounded-full bg-border" />
              </div>
              <div className="mt-3 flex h-8 items-center rounded-[var(--radius-control)] border border-border bg-background px-2">
                <div className="h-2 w-2/5 rounded-full bg-border" />
              </div>
              <div className="absolute inset-x-3 bottom-9 grid h-8 place-items-center rounded-[var(--radius-control)] bg-primary text-chrome font-medium text-primary-foreground">
                {continueButton?.body ?? continueButton?.title}
              </div>
            </div>

            <div className={cn("absolute top-[332px] left-0 flex h-[96px] w-[340px] gap-3 rounded-md p-3", cardClasses)}>
              <span className="absolute -top-5 left-0 text-chrome text-muted-foreground">{notes}</span>
              {stickies.map((note, index) => (
                <p
                  key={note.title}
                  className={cn(
                    "line-clamp-3 min-w-0 flex-1 rounded-md p-2 text-chrome shadow-sm",
                    index === 0 ? "bg-accent-soft text-accent-text" : "border border-border bg-background text-foreground",
                  )}
                >
                  {note.body ?? note.title}
                </p>
              ))}
            </div>

            {collaborators[0] ? (
              <div className="pointer-events-none absolute top-[124px] left-[268px] z-10">
                <MousePointer2 aria-hidden="true" className="size-4 fill-foreground text-foreground" strokeWidth={stroke} />
                <span className="absolute top-4 left-3.5 rounded-md rounded-tl-none bg-foreground px-1.5 text-chrome whitespace-nowrap text-background">{collaborators[0]}</span>
              </div>
            ) : null}
          </div>
        </div>

        <aside className="flex w-[216px] shrink-0 flex-col gap-4 overflow-y-auto border-l border-border p-4">
          <div className="min-w-0">
            <div className="truncate font-medium text-foreground">{selected?.title}</div>
            <div className="truncate text-chrome text-muted-foreground">{selected?.meta}</div>
          </div>

          <div>
            <div className="mb-2 text-chrome text-muted-foreground">Position and size</div>
            <div className="grid grid-cols-2 gap-2">
              {BOX_FIELDS.map(([key, label]) => (
                <label key={key} className="flex items-center gap-2 text-chrome text-muted-foreground">
                  <span className="w-3 shrink-0">{label}</span>
                  <Input
                    value={box[key]}
                    onChange={(event) => setBox({ ...box, [key]: event.target.value })}
                    className={cn("min-w-0 tabular", inputClasses)}
                  />
                </label>
              ))}
            </div>
          </div>

          {selectField ? (
            <div className="space-y-1.5 text-chrome text-muted-foreground">
              <div>{selectField.label}</div>
              <Select options={selectField.options ?? []} value={resizing} onChange={setResizing} className={inputClasses} />
            </div>
          ) : null}

          {switchField ? <Switch checked={clip} onChange={setClip} label={switchField.label} /> : null}

          <div>
            <div className="mb-2 text-chrome text-muted-foreground">Fill</div>
            <div className="flex gap-2">
              {SWATCHES.map((color, index) => (
                <button
                  key={color}
                  type="button"
                  aria-label={`Fill ${index + 1}`}
                  aria-pressed={index === 0}
                  className={cn(
                    "size-6 rounded-md border border-border-card transition-shadow duration-[var(--duration-fast)] ease-[var(--ease)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                    index === 0 && "ring-2 ring-primary ring-offset-2 ring-offset-background",
                  )}
                  style={{ background: color }}
                />
              ))}
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
