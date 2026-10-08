import { useState } from "react";
import { Check, Circle, LoaderCircle, TriangleAlert } from "lucide-react";
import { useGallery } from "@/gallery/context";
import { Button } from "@/ui";
import { SpecimenFrame, StateLabel, iconStroke, interactionOptionLabel } from "./shared";

type WorkState = "pending" | "success" | "error";
export function AsyncFeedbackSpecimen() {
  const { choices, content } = useGallery();
  const [state, setState] = useState<WorkState>("pending");
  const stroke = iconStroke(choices);
  const result = content.app.items[0];
  const pending = () => {
    if (choices.asyncFeedback === "skeleton") return <div><div className="mb-3 flex gap-3" aria-hidden="true"><div className="size-12 rounded-lg bg-muted" /><div className="flex-1 space-y-3"><div className="h-4 w-3/4 rounded bg-muted" /><div className="h-3 w-1/2 rounded bg-muted" /></div></div><p className="text-chrome text-muted-foreground">Loading {content.app.page.title.toLowerCase()}…</p></div>;
    if (choices.asyncFeedback === "progress") return <div><div className="mb-2 flex justify-between text-chrome"><span>Measured sample · 6 of 10</span><span className="tabular">60%</span></div><progress aria-label="Measured sample work completed" className="studio-progress w-full accent-primary" value={6} max={10} /><p className="mt-3 text-chrome text-muted-foreground">Time remaining unknown. No ETA is invented.</p></div>;
    if (choices.asyncFeedback === "steps") return <ol className="space-y-3 text-chrome">{["Prepare", "Process", "Finish"].map((label, i) => { const Icon = i === 0 ? Check : i === 1 ? LoaderCircle : Circle; return <li key={label} className="flex items-center gap-2"><Icon aria-hidden="true" className="size-4" strokeWidth={stroke} /><span>{label}</span><span className="ml-auto text-muted-foreground">{i === 0 ? "Done" : i === 1 ? "Running" : "Not started"}</span></li>; })}</ol>;
    return <div className="flex items-center gap-2 text-body"><LoaderCircle aria-hidden="true" className="size-5" strokeWidth={stroke} /><span>Working…</span><span className="ml-auto text-chrome text-muted-foreground">Duration unknown</span></div>;
  };
  const success = <div><div className="mb-3 flex items-center gap-2 text-success-text"><Check aria-hidden="true" className="size-5" strokeWidth={stroke} /><strong className="text-body">Complete</strong></div><div className="rounded-md border border-border p-3"><div className="text-body font-medium">{result?.title ?? content.app.page.title}</div><p className="mt-1 text-chrome text-muted-foreground">{result?.meta ?? content.app.toast}</p></div></div>;
  const failure = <div><div className="mb-3 flex items-center gap-2 text-destructive-text"><TriangleAlert aria-hidden="true" className="size-5" strokeWidth={stroke} /><strong className="text-body">{content.app.error.title}</strong></div><p className="mb-3 text-chrome text-muted-foreground">{content.app.error.detail}</p>{choices.asyncFeedback === "steps" ? <p className="mb-3 text-chrome">Prepare: done · Process: failed · Finish: not started</p> : null}<Button variant="outline" size="sm" onClick={() => setState("pending")}>{content.app.error.action}</Button></div>;
  return (
    <SpecimenFrame caption="Async feedback" detail={interactionOptionLabel("asyncFeedback", choices.asyncFeedback)}>
      <p className="mb-5 text-chrome text-muted-foreground">Explicit sample states, not an actual request. Use the controls to select an outcome; nothing advances on a timer. Production progress must come from measured work.</p>
      <div className="grid gap-4 md:grid-cols-3">
        <div className="rounded-lg border border-border bg-card p-5"><StateLabel>Pending</StateLabel>{pending()}</div>
        <div className="rounded-lg border border-border bg-card p-5"><StateLabel>Success</StateLabel>{success}</div>
        <div className="rounded-lg border border-border bg-card p-5"><StateLabel>Failure / recovery</StateLabel>{failure}</div>
      </div>
      <div className="mt-5 rounded-lg border border-border p-5">
        <div className="mb-4 flex flex-wrap items-center gap-2"><StateLabel>Interactive state preview</StateLabel>{(["pending", "success", "error"] as const).map((s) => <Button key={s} variant={state === s ? "primary" : "outline"} size="sm" onClick={() => setState(s)}>{s === "pending" ? "Show pending" : s === "success" ? "Show success" : "Show failure"}</Button>)}</div>
        <div role="status" aria-live="polite" className="max-w-lg">{state === "pending" ? pending() : state === "success" ? success : failure}</div>
      </div>
      <p className="mt-4 text-chrome text-muted-foreground">Keep the initiating input and useful results on failure. Announce status changes once, do not announce every progress tick. Reduced motion keeps the spinner still and the status text visible; skeletons do not shimmer.</p>
    </SpecimenFrame>
  );
}
