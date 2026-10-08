import type { CSSProperties } from "react";
import { useGallery } from "@/gallery/context";
import { MOTION_LANGUAGES } from "@/tokens/motion";
import { resolveTokens } from "@/tokens/resolve";
import { Filmstrip, FilmstripNote, LivePreview } from "./film";
import { SpecimenFrame, StateLabel, interactionOptionLabel } from "./shared";

export function ThemeMotionSpecimen() {
  const { choices, content, mode } = useGallery();
  const language = MOTION_LANGUAGES[choices.motion] ?? MOTION_LANGUAGES.snappy!;
  const duration = choices.themeMotion === "cut" ? 0 : language.layer;
  const tokens = resolveTokens(choices);
  const palette = (dark: boolean) => <div className="absolute inset-0 p-3" style={{ ...(dark ? tokens.dark : tokens.light), background: "var(--background)", color: "var(--foreground)" } as CSSProperties}><div className="flex items-center justify-between border-b border-border pb-2 text-chrome"><span>{content.product.name}</span><span className="rounded border border-input px-1">{dark ? "☾" : "☀"}</span></div><div className="mt-4 rounded-lg border border-border-card bg-card p-3 shadow-sm"><div className="heading text-body">{content.app.page.title}</div><div className="mt-2 text-chrome text-muted-foreground">{content.product.tagline}</div><div className="mt-3 inline-block rounded-md bg-primary px-2 py-1 text-chrome text-primary-foreground">{content.app.page.action}</div></div></div>;
  const scene = (value: number) => {
    const p = Math.min(1, Math.max(0, value));
    const style: CSSProperties = choices.themeMotion === "circle" ? { clipPath: `circle(${140 * p}% at 90% 12%)` } : choices.themeMotion === "wipe" ? { clipPath: `inset(0 ${100 * (1 - p)}% 0 0)` } : { opacity: choices.themeMotion === "cut" ? Number(p >= 1) : p };
    return <div className="relative h-56">{palette(mode === "dark")}<div className="absolute inset-0" style={style}>{palette(mode !== "dark")}</div></div>;
  };
  return (
    <SpecimenFrame caption="Theme change" detail={`${interactionOptionLabel("themeMotion", choices.themeMotion)} · ${duration} ms`}>
      <FilmstripNote />
      <StateLabel>{mode === "dark" ? "Dark → light" : "Light → dark"} · current palette and look</StateLabel>
      <Filmstrip duration={duration} easing={language.enter} render={scene} geometryOnly={duration === 0 && choices.themeMotion !== "cut"} />
      <LivePreview duration={duration} easing={language.enter} render={scene} label="Replay theme change" />
      <p className="mt-4 text-chrome text-muted-foreground">The circular reveal starts at the toggle; a wipe starts at the leading edge. The export helper measures the viewport to cover every corner. A reduced-motion preference, Still language or unsupported view-transition API applies the new palette immediately. {choices.themes !== "both" ? "This product currently ships one theme; the comparison demonstrates the selected transition if a second theme is enabled." : "The host saves the theme preference and keeps the toggle focused."}</p>
    </SpecimenFrame>
  );
}
