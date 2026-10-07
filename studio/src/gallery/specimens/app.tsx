import { useLayoutEffect, useRef, useState } from "react";
import { ArrowUp, ChevronRight, Search } from "lucide-react";
import { useGallery } from "@/gallery/context";
import {
  Badge,
  Button,
  Checkbox,
  Input,
  Kbd,
  Select,
  cn,
  type ButtonProps,
  type PreviewState,
} from "@/ui";
import {
  DEMO_ICONS,
  Dimension,
  MENU_ICONS,
  NAV_ICONS,
  CellValue,
  SpecimenFrame,
  StateLabel,
  cardTreatment,
  iconStroke,
  inputTreatment,
} from "./shared";

function TableRows({ hoverRow, selectedRow, selectedHoverRow }: { hoverRow?: number; selectedRow?: number; selectedHoverRow?: number }) {
  const { choices, content } = useGallery();
  const hairline = choices.tables === "hairline";
  const zebra = choices.tables === "zebra";
  return (
    <table className="w-full border-collapse text-left text-body">
      <thead className={cn(hairline && "border-b border-border")}>
        <tr>
          {content.app.table.columns.map((column, index) => (
            <th key={column} className="h-9 px-3 text-chrome font-normal text-muted-foreground">
              <span className="inline-flex items-center gap-1.5">
                {column}
                {index === 0 ? <ArrowUp className="size-3 text-accent-text" strokeWidth={iconStroke(choices)} aria-hidden="true" /> : null}
              </span>
            </th>
          ))}
        </tr>
      </thead>
      <tbody className={cn(hairline && "divide-y divide-border")}>
        {content.app.table.rows.slice(0, 6).map((row, rowIndex) => (
          <tr
            key={rowIndex}
            className={cn(
              "h-row",
              zebra && rowIndex % 2 === 1 && "bg-muted/50",
              hoverRow === rowIndex && choices.rowHover === "fill" && "bg-accent",
              selectedRow === rowIndex && "bg-accent-soft",
              selectedHoverRow === rowIndex && (choices.rowHover === "fill" ? "bg-accent-soft-hover" : "bg-accent-soft"),
            )}
          >
            {row.map((cell, cellIndex) => (
              <td key={cellIndex} className={cn("max-w-[220px] truncate px-3", cell.kind === "num" && "text-right")}>
                <CellValue cell={cell} />
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

function NavList({ count = 4 }: { count?: number }) {
  const { choices, content } = useGallery();
  const stroke = iconStroke(choices);
  return (
    <nav className="space-y-1">
      {content.app.nav.slice(0, count).map((item, index) => {
        const Icon = NAV_ICONS[index % NAV_ICONS.length]!;
        return (
          <div
            key={item.label}
            className={cn(
              "flex h-control items-center gap-2 rounded-[var(--radius-control)] px-3 text-chrome",
              index === 1 ? "bg-accent-soft text-accent-text" : "text-muted-foreground",
            )}
          >
            {choices.navIcons === "icons" ? <Icon className="size-4 shrink-0" strokeWidth={stroke} aria-hidden="true" /> : null}
            <span className="min-w-0 flex-1 truncate">{item.label}</span>
            {item.badge !== undefined ? <span className="tabular">{item.badge}</span> : null}
          </div>
        );
      })}
    </nav>
  );
}

export function DensitySpecimen() {
  const { density, content } = useGallery();
  return (
    <SpecimenFrame caption="Density" detail={`${density.chrome}px chrome · ${density.body}px body`}>
      <div className="grid grid-cols-[minmax(0,1fr)_260px] gap-8">
        <div>
          <div className="overflow-hidden rounded-lg border border-border-card bg-card">
            <table className="w-full text-left text-body">
              <tbody className="divide-y divide-border">
                {content.app.table.rows.slice(0, 3).map((row, rowIndex) => (
                  <tr key={rowIndex} className="h-row">
                    {row.slice(0, 4).map((cell, cellIndex) => <td key={cellIndex} className="px-3"><CellValue cell={cell} /></td>)}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <Dimension label={`${density.row}px row`} />
          <div className="mt-7 grid grid-cols-3 gap-3">
            <Button>{content.app.page.action}</Button>
            <Input placeholder={content.app.form.fields[0]?.placeholder} />
            <Select options={content.app.form.fields[1]?.options ?? []} placeholder={content.app.form.fields[1]?.label} />
          </div>
          <Dimension label={`${density.control}px control`} />
        </div>
        <div>
          <NavList />
          <div className="mt-5 space-y-2 rounded-lg border border-border p-4">
            <div className="text-chrome">{content.app.page.title}</div>
            <div className="text-body">{content.product.tagline}</div>
            <div className="tabular text-chrome text-muted-foreground">Chrome {density.chrome}px · body {density.body}px</div>
          </div>
        </div>
      </div>
    </SpecimenFrame>
  );
}

export function SpacingSpecimen() {
  const { choices, content } = useGallery();
  const rootRef = useRef<HTMLDivElement>(null);
  const [unit, setUnit] = useState("4px");
  useLayoutEffect(() => {
    const gallery = rootRef.current?.closest(".gallery");
    if (gallery) setUnit(getComputedStyle(gallery).getPropertyValue("--spacing").trim() || "4px");
  }, [choices.spacing]);
  const label = (multiple: number) => `${multiple} × ${unit} = ${Number.parseFloat(unit) * multiple}px`;

  return (
    <SpecimenFrame rootRef={rootRef} caption="Spacing unit" detail={unit}>
      <div className="grid grid-cols-3 gap-8">
        <div>
          <StateLabel>Card padding</StateLabel>
          <div className="rounded-lg border border-border-card bg-card p-4 shadow-sm">
            <div className="rounded-md bg-muted p-4 text-body">{content.app.prose.title}</div>
          </div>
          <Dimension label={label(4)} />
        </div>
        <div>
          <StateLabel>Form gap</StateLabel>
          <div className="space-y-3 rounded-lg border border-border-card bg-card p-4 shadow-sm">
            <Input placeholder={content.app.form.fields[0]?.placeholder} />
            <Select options={content.app.form.fields[1]?.options ?? []} placeholder={content.app.form.fields[1]?.label} />
            <Button>{content.app.form.submit}</Button>
          </div>
          <Dimension label={label(3)} />
        </div>
        <div>
          <StateLabel>Stat gap</StateLabel>
          <div className="grid grid-cols-3 gap-5 rounded-lg border border-border-card bg-card p-4 shadow-sm">
            {content.app.stats.slice(0, 3).map((stat) => (
              <div key={stat.label} className="min-w-0"><div className="text-chrome text-muted-foreground">{stat.label}</div><div className="mt-1 tabular text-[22px] font-medium">{stat.value}</div></div>
            ))}
          </div>
          <Dimension label={label(5)} />
        </div>
      </div>
    </SpecimenFrame>
  );
}

export function NavIconsSpecimen() {
  const { choices, content } = useGallery();
  return (
    <SpecimenFrame caption="Navigation" detail={choices.navIcons === "icons" ? "Icons" : "Text only"}>
      <div className="mx-auto max-w-lg rounded-xl border border-sidebar-border bg-sidebar p-4 text-sidebar-foreground shadow-sm">
        <div className="mb-4 flex items-center gap-3 border-b border-sidebar-border px-3 pb-4 text-body font-medium">
          <span className="flex size-7 items-center justify-center rounded-md bg-primary text-primary-foreground">{content.product.name.slice(0, 1)}</span>
          {content.product.name}
        </div>
        <NavList count={6} />
      </div>
    </SpecimenFrame>
  );
}

export function PageTitleSpecimen() {
  const { choices, content } = useGallery();
  const toolbar = choices.pageTitle === "toolbar";
  return (
    <SpecimenFrame caption="Page title" detail={choices.pageTitle}>
      <div className={cn("rounded-xl border border-border bg-background", toolbar ? "p-0" : "p-8")}>
        <header className={cn("flex items-center justify-between gap-6", toolbar ? "h-10 border-b border-border px-4" : "mb-8")}>
          <div>
            <h1 className="font-medium leading-tight text-[length:var(--title-size)]">{content.app.page.title}</h1>
            {!toolbar ? <p className="mt-2 text-body text-muted-foreground">{content.product.tagline}</p> : null}
          </div>
          <Button size={toolbar ? "sm" : "md"}>{content.app.page.action}</Button>
        </header>
        <div className={cn("space-y-3", toolbar ? "p-4" : "")}> 
          <div className="h-24 rounded-lg bg-muted" />
          <div className="grid grid-cols-3 gap-3"><div className="h-20 rounded-lg bg-muted" /><div className="h-20 rounded-lg bg-muted" /><div className="h-20 rounded-lg bg-muted" /></div>
        </div>
      </div>
    </SpecimenFrame>
  );
}

export function StatsSpecimen() {
  const { choices, content } = useGallery();
  const stats = content.app.stats.slice(0, 4);
  return (
    <SpecimenFrame caption="Key figures" detail={choices.stats}>
      {choices.stats === "strip" ? (
        <div className="grid grid-cols-4 divide-x divide-border border-y border-border">
          {stats.map((stat) => <Stat key={stat.label} stat={stat} className="px-6 py-5" />)}
        </div>
      ) : choices.stats === "cards" ? (
        <div className="grid grid-cols-4 gap-4">{stats.map((stat) => <Stat key={stat.label} stat={stat} className="rounded-lg border border-border-card bg-card p-5 shadow-sm" />)}</div>
      ) : (
        <div className="flex flex-wrap items-center gap-x-8 gap-y-4 border-b border-border pb-5">{stats.map((stat) => <div key={stat.label} className="flex items-baseline gap-2"><span className="text-chrome text-muted-foreground">{stat.label}</span><span className="tabular text-[22px] font-medium">{stat.value}</span></div>)}</div>
      )}
    </SpecimenFrame>
  );
}

function Stat({ stat, className }: { stat: { label: string; value: string; note?: string }; className?: string }) {
  return <div className={className}><div className="text-chrome text-muted-foreground">{stat.label}</div><div className="mt-2 tabular text-[28px] font-medium leading-none">{stat.value}</div>{stat.note ? <div className="mt-2 text-chrome text-muted-foreground">{stat.note}</div> : null}</div>;
}

export function TablesSpecimen() {
  const { choices } = useGallery();
  return (
    <SpecimenFrame caption="Table" detail={choices.tables}>
      <div className="overflow-hidden rounded-lg border border-border-card bg-card"><TableRows selectedRow={2} /></div>
    </SpecimenFrame>
  );
}

export function RowHoverSpecimen() {
  const { choices } = useGallery();
  return (
    <SpecimenFrame caption="Row states" detail={choices.rowHover === "none" ? "Hover fill: none · row 4: selected" : "Row 2: hover · row 4: selected · row 5: selected + hover"}>
      <div className="overflow-hidden rounded-lg border border-border-card bg-card"><TableRows hoverRow={1} selectedRow={3} selectedHoverRow={4} /></div>
    </SpecimenFrame>
  );
}

export function CardsSpecimen() {
  const { choices, content } = useGallery();
  const treatment = cardTreatment(choices);
  return (
    <SpecimenFrame caption="Cards" detail={choices.cards}>
      <div className="grid grid-cols-3 gap-5">
        <div className={cn("rounded-lg p-5", treatment)}>
          <h2 className="mb-4 text-body font-semibold">{content.app.form.title}</h2>
          <div className="space-y-3"><Input placeholder={content.app.form.fields[0]?.placeholder} /><Select options={content.app.form.fields[1]?.options ?? []} placeholder={content.app.form.fields[1]?.label} /><Button>{content.app.form.submit}</Button></div>
        </div>
        <div className={cn("rounded-lg p-5", treatment)}><Stat stat={content.app.stats[0]!} /><div className="mt-6 h-[6px] overflow-hidden rounded-[var(--radius-control)] bg-background"><div className="h-full w-[62%] bg-primary" /></div></div>
        <div className={cn("rounded-lg p-3", treatment)}>{content.app.nav.slice(0, 5).map((item, index) => <div key={item.label} className={cn("flex h-row items-center justify-between rounded-md px-3", index === 1 && "bg-accent-soft")}><span>{item.label}</span>{item.badge !== undefined ? <Badge>{item.badge}</Badge> : <ChevronRight className="size-4 text-muted-foreground" strokeWidth={iconStroke(choices)} />}</div>)}</div>
      </div>
    </SpecimenFrame>
  );
}

const INPUT_STATES: readonly { label: string; preview?: PreviewState; value?: string; disabled?: boolean }[] = [
  { label: "Rest" },
  { label: "Hover", preview: "hover" },
  { label: "Focus", preview: "focus" },
  { label: "Filled value", value: "api-gateway" },
  { label: "Error" },
  { label: "Disabled", preview: "disabled", disabled: true },
];

export function InputsSpecimen() {
  const { choices, content } = useGallery();
  const treatment = inputTreatment(choices);
  const placeholder = content.app.form.fields[0]?.placeholder;
  return (
    <SpecimenFrame caption="Input states" detail={choices.inputs}>
      <div className="grid grid-cols-3 gap-5">
        {INPUT_STATES.map((state) => (
          <div key={state.label}>
            <StateLabel>{state.label}</StateLabel>
            <Input
              className={cn(treatment, state.label === "Error" && "border-destructive!")}
              placeholder={placeholder}
              value={state.value}
              disabled={state.disabled}
              preview={state.preview}
            />
            {state.label === "Error" ? <div className="mt-1.5 text-chrome text-destructive">{content.app.error.detail}</div> : null}
          </div>
        ))}
      </div>
      <div className="mt-7 grid grid-cols-2 gap-5">
        <div><StateLabel>Select</StateLabel><Select className={treatment} options={content.app.form.fields[1]?.options ?? []} placeholder={content.app.form.fields[1]?.label} /></div>
        <div><StateLabel>{content.app.prose.title}</StateLabel><Input className={cn("h-24 py-3", treatment)} placeholder={content.app.prose.paragraphs[0]} /></div>
      </div>
    </SpecimenFrame>
  );
}

const BUTTON_VARIANTS: readonly NonNullable<ButtonProps["variant"]>[] = ["primary", "secondary", "outline", "ghost", "destructive", "link"];
const BUTTON_STATES: readonly { label: string; preview?: PreviewState; disabled?: boolean }[] = [
  { label: "Rest" },
  { label: "Hover", preview: "hover" },
  { label: "Active", preview: "active" },
  { label: "Focus", preview: "focus" },
  { label: "Disabled", preview: "disabled", disabled: true },
];

export function ButtonsSpecimen() {
  const { choices, content } = useGallery();
  const copy = [content.app.form.submit, content.app.form.cancel, content.app.page.action, content.app.empty.action, content.app.dialog.confirm, content.landing.ctaSecondary];
  return (
    <SpecimenFrame caption="Button states" detail={choices.buttons}>
      <div className="grid grid-cols-[110px_repeat(5,minmax(0,1fr))] items-center gap-x-3 gap-y-4">
        <span />
        {BUTTON_STATES.map((state) => <span key={state.label} className="text-chrome text-muted-foreground">{state.label}</span>)}
        {BUTTON_VARIANTS.map((variant, row) => (
          <div key={variant} className="contents">
            <span className="text-chrome text-muted-foreground">{variant}</span>
            {BUTTON_STATES.map((state) => <Button key={state.label} variant={variant} preview={state.preview} disabled={state.disabled}>{copy[row]}</Button>)}
          </div>
        ))}
      </div>
      <div className="mt-8 flex items-end gap-5 border-t border-border pt-6">
        {(["sm", "md", "lg"] as const).map((size) => <div key={size}><StateLabel>{size}</StateLabel><Button size={size}>{content.app.page.action}</Button></div>)}
      </div>
    </SpecimenFrame>
  );
}

export function IconWeightSpecimen() {
  const { choices, content } = useGallery();
  const stroke = iconStroke(choices);
  const sizes = [16, 20, 24] as const;
  const tile = choices.iconWeight === "tiles";
  const ButtonIcon = DEMO_ICONS[2] ?? Search;
  return (
    <SpecimenFrame caption="Icon weight" detail={choices.iconWeight}>
      <div className="flex items-end justify-between gap-5 rounded-xl border border-border bg-card p-6">
        {DEMO_ICONS.map((Icon, index) => {
          const size = sizes[index % sizes.length]!;
          return <div key={index} className="flex flex-col items-center gap-3"><span className={cn("inline-flex items-center justify-center", tile && "size-6 rounded-md bg-accent-soft text-accent-text")}><Icon size={tile ? 16 : size} strokeWidth={stroke} aria-hidden="true" /></span><span className="tabular text-chrome text-muted-foreground">{size}px</span></div>;
        })}
      </div>
      <div className="mt-6 flex items-center gap-6">
        <div className="w-64 rounded-lg border border-border p-2"><NavList count={3} /></div>
        <Button><ButtonIcon className={cn("size-4", tile && "rounded-md bg-accent-soft p-0.5 text-accent-text")} strokeWidth={stroke} />{content.app.page.action}</Button>
      </div>
    </SpecimenFrame>
  );
}

export function MenusSpecimen() {
  const { choices, content } = useGallery();
  const stroke = iconStroke(choices);
  const hints = choices.menus === "hints";
  const labels = content.app.nav.slice(0, 6);
  return (
    <SpecimenFrame caption="Menus" detail={choices.menus}>
      <div className="grid grid-cols-2 gap-8">
        <div>
          <StateLabel>{content.app.page.action}</StateLabel>
          <div className="rounded-popover border border-border bg-popover p-1.5 text-popover-foreground shadow-lg">
            {labels.map((item, index) => {
              const Icon = MENU_ICONS[index % MENU_ICONS.length]!;
              return (
                <div key={item.label} className="contents">
                  {index === 4 ? <div className="my-1 h-px bg-border" /> : null}
                  <div className={cn("flex h-control items-center gap-2 rounded-md px-2.5 text-body", index === 1 && "bg-accent")}>
                    {hints ? <Icon className="size-4 text-muted-foreground" strokeWidth={stroke} aria-hidden="true" /> : null}
                    <span className="flex-1">{item.label}</span>
                    {hints ? <Kbd keys={`mod+${index + 1}`} /> : null}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        <div>
          <StateLabel>{content.app.composer.placeholder}</StateLabel>
          <div className="overflow-hidden rounded-xl border border-border bg-popover shadow-lg">
            <div className="flex items-center gap-2 border-b border-border px-3"><Search className="size-4 text-muted-foreground" strokeWidth={stroke} aria-hidden="true" /><Input className="border-0 bg-transparent shadow-none" placeholder={content.app.composer.placeholder} /></div>
            <div className="p-1.5">
              {labels.slice(0, 5).map((item, index) => {
                const Icon = MENU_ICONS[index % MENU_ICONS.length]!;
                return <div key={item.label} className={cn("flex h-control items-center gap-2 rounded-md px-2.5", index === 0 && "bg-accent")}>
                  {hints ? <Icon className="size-4 text-muted-foreground" strokeWidth={stroke} aria-hidden="true" /> : null}
                  <span className="flex-1">{item.label}</span>
                  {hints ? <Kbd>↵</Kbd> : null}
                </div>;
              })}
            </div>
          </div>
        </div>
      </div>
    </SpecimenFrame>
  );
}
