import type { CSSProperties } from "react";
import { Button, Input } from "@/ui";
import { useGallery } from "@/gallery/context";

export function displayStyle(display: string, oversized = false): CSSProperties {
  const size = oversized
    ? display === "giant"
      ? "128px"
      : display === "mono"
        ? "72px"
        : display === "heavy"
          ? "92px"
          : "88px"
    : display === "giant"
      ? "96px"
      : display === "mono"
        ? "48px"
        : display === "heavy"
          ? "64px"
          : "56px";
  const heavy = display === "heavy" || display === "giant";

  return {
    fontSize: size,
    fontWeight: heavy ? (display === "giant" ? 700 : 650) : 500,
    letterSpacing: display === "giant" ? "-0.045em" : display === "heavy" ? "-0.03em" : display === "mono" ? "-0.01em" : "-0.02em",
    lineHeight: display === "mono" ? 1.04 : display === "giant" ? 0.9 : 0.98,
  };
}

/** Face from the display knob, case from the displayCase knob; callers pass both. */
export function displayClass(display: string, displayCase = "written"): string {
  return `${display === "mono" ? "font-mono" : ""} ${displayCase === "lowercase" ? "lowercase" : ""}`.trim();
}

export function ActionGroup({ centered = false }: { centered?: boolean }) {
  const { choices, content } = useGallery();
  const landing = content.landing;
  const alignment = centered ? "justify-center" : "justify-start";

  if (choices.cta === "email") {
    return (
      <form className={`flex w-full max-w-[430px] gap-2 ${alignment}`} onSubmit={(event) => event.preventDefault()}>
        <Input className="min-w-0 flex-1" type="email" placeholder={landing.emailPlaceholder} />
        <Button type="submit" variant="cta">{landing.cta}</Button>
      </form>
    );
  }

  return (
    <div className={`flex flex-wrap items-center gap-2 ${alignment}`}>
      <Button variant="cta">{landing.cta}</Button>
      {choices.cta === "pair" ? <Button variant="outline">{landing.ctaSecondary}</Button> : null}
    </div>
  );
}
