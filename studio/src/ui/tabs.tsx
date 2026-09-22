import { Tabs as BaseTabs } from "@base-ui/react/tabs";
import { cn, previewClass, type PreviewState } from "./cn";

export interface TabsProps {
  items: string[];
  value?: string;
  onChange?(value: string): void;
  className?: string;
  preview?: PreviewState;
}

export function Tabs({ items, value, onChange, className, preview }: TabsProps) {
  return (
    <BaseTabs.Root
      value={value}
      defaultValue={value === undefined ? items[0] : undefined}
      onValueChange={(next) => {
        if (typeof next === "string") onChange?.(next);
      }}
      className={className}
    >
      <BaseTabs.List className="relative flex border-b border-border" activateOnFocus>
        {items.map((item) => (
          <BaseTabs.Tab
            key={item}
            value={item}
            className={cn(
              "relative z-10 h-control px-3 text-chrome font-medium text-muted-foreground outline-none transition-colors duration-[var(--duration-fast)] hover:text-foreground active:opacity-70 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-inset data-[active]:text-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
              previewClass(preview, {
                hover: "text-foreground",
                active: "opacity-70",
                focus: "ring-2 ring-ring ring-inset",
                disabled: "pointer-events-none opacity-50",
              }),
            )}
          >
            {item}
          </BaseTabs.Tab>
        ))}
        <BaseTabs.Indicator className="absolute inset-x-0 bottom-[-1px] h-0.5 bg-primary transition-[translate,width] duration-[var(--duration-fast)]" />
      </BaseTabs.List>
    </BaseTabs.Root>
  );
}
