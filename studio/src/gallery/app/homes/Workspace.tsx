import { Boxes, Home, Rocket, Settings, ShieldAlert, Users, type LucideIcon } from "lucide-react";
import { useGallery } from "@/gallery/context";
import { Button, Input, cn } from "@/ui";
import { INPUT_CLASSES_BY_STYLE } from "../kit";
import { DataTable, Panel, Stats } from "../sections";

/** Nav icons in `content.app.nav` order. */
export const WORKSPACE_ICONS: readonly LucideIcon[] = [Home, Rocket, Boxes, ShieldAlert, Users, Settings];

/** Records and operations: key figures, what needs attention, the main table, a task composer. */
export function WorkspaceHome() {
  const { choices, content } = useGallery();
  const primaryVariant = choices.buttons === "outline" ? "cta" : "primary";

  return (
    <>
      <Stats />
      <Panel />
      <DataTable />
      <div className="flex shrink-0 items-center gap-2 border-t border-border px-8 py-3">
        <Input placeholder={content.app.composer.placeholder} className={cn("min-w-0 flex-1", INPUT_CLASSES_BY_STYLE[choices.inputs])} />
        <Button variant={primaryVariant}>{content.app.composer.send}</Button>
      </div>
    </>
  );
}
