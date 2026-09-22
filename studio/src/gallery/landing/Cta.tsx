import { useGallery } from "@/gallery/context";
import { ActionGroup, displayClass, displayStyle } from "./helpers";

export function Cta() {
  const { choices, content } = useGallery();
  const editorial = choices.register === "editorial";
  const playful = choices.register === "playful";
  const surface = playful ? "mx-4 mb-4 rounded-2xl border border-border-card bg-accent-soft" : "border-t border-border";
  return (
    <>
      <section className={`px-8 text-center ${surface} ${editorial ? "py-36" : "py-24"}`}>
        <h2
          className={`mx-auto max-w-[900px] text-balance text-foreground ${displayClass(choices.display, choices.displayCase)}`}
          style={displayStyle(choices.display)}
        >
          {content.product.tagline}
        </h2>
        <div className="mt-8 flex justify-center">
          <ActionGroup centered />
        </div>
      </section>
      <footer className="border-t border-border px-8 py-7 text-center text-chrome text-muted-foreground">
        {content.landing.footer}
      </footer>
    </>
  );
}
