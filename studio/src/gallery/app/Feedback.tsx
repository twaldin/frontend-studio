import { useState } from "react";
import { useGallery } from "@/gallery/context";
import { Button, Dialog, Skeleton, Tabs, Toast, Tooltip, cn } from "@/ui";

export function Feedback() {
  const { choices, content } = useGallery();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [tab, setTab] = useState(content.app.topnav[0]);
  const cardClasses =
    choices.cards === "fill" ? "bg-muted" : "border border-border-card bg-card shadow-md";

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <section className={cn("flex min-h-[190px] flex-col items-center justify-center rounded-lg px-6 py-7 text-center", cardClasses)}>
          <h2 className="font-medium text-foreground">{content.app.empty.title}</h2>
          <p className="mt-2 max-w-[32ch] text-body leading-relaxed text-muted-foreground">{content.app.empty.body}</p>
          <Button type="button" variant="primary" size="sm" className="mt-4">
            {content.app.empty.action}
          </Button>
        </section>

        <section className={cn("flex min-h-[190px] flex-col justify-center rounded-lg px-6 py-7", cardClasses)}>
          <h2 className="font-medium text-destructive">{content.app.error.title}</h2>
          <p className="mt-2 text-body leading-relaxed tabular text-muted-foreground">{content.app.error.detail}</p>
          <div className="mt-4">
            <Button type="button" variant="outline" size="sm">
              {content.app.error.action}
            </Button>
          </div>
        </section>
      </div>

      <Toast message={content.app.toast} />

      <section className={cn("rounded-lg p-5", cardClasses)}>
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <Skeleton className="size-8 shrink-0 rounded-md" />
            <div className="flex-1 space-y-2">
              <Skeleton className="h-2.5 w-2/5" />
              <Skeleton className="h-2 w-4/5" />
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Skeleton className="size-8 shrink-0 rounded-md" />
            <div className="flex-1 space-y-2">
              <Skeleton className="h-2.5 w-1/2" />
              <Skeleton className="h-2 w-3/4" />
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Skeleton className="size-8 shrink-0 rounded-md" />
            <div className="flex-1 space-y-2">
              <Skeleton className="h-2.5 w-1/3" />
              <Skeleton className="h-2 w-2/3" />
            </div>
          </div>
        </div>
      </section>

      <section className={cn("rounded-lg p-5", cardClasses)}>
        <Tabs items={content.app.topnav} value={tab} onChange={setTab} />
        <div className="mt-5 flex flex-wrap items-center gap-2">
          <Button type="button" variant="destructive" onClick={() => setDialogOpen(true)}>
            {content.app.dialog.title}
          </Button>
          <Tooltip content={content.app.empty.body}>
            <Button type="button" variant="outline">
              {content.app.empty.action}
            </Button>
          </Tooltip>
        </div>
      </section>

      <Dialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        title={content.app.dialog.title}
        footer={
          <>
            <Button type="button" variant="ghost" onClick={() => setDialogOpen(false)}>
              {content.app.dialog.cancel}
            </Button>
            <Button type="button" variant="destructive" onClick={() => setDialogOpen(false)}>
              {content.app.dialog.confirm}
            </Button>
          </>
        }
      >
        <p className="text-body leading-relaxed text-muted-foreground">{content.app.dialog.body}</p>
      </Dialog>
    </div>
  );
}
