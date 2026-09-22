import { Button } from "@/ui";
import { useGallery } from "@/gallery/context";

export function Nav() {
  const { choices, content } = useGallery();
  const playful = choices.register === "playful";
  const editorial = choices.register === "editorial";

  return (
    <header
      className={`sticky top-0 z-50 backdrop-blur-xl ${playful ? "mx-4 mt-4 rounded-2xl border border-border-card bg-card/90" : editorial ? "border-b border-border/60 bg-background/90" : "border-b border-border bg-background/90"}`}
    >
      <div className={`mx-auto grid max-w-[1200px] grid-cols-[1fr_auto_1fr] items-center px-6 ${editorial ? "h-20" : "h-16"}`}>
        <a
          href="#"
          className="justify-self-start rounded-md text-body font-[600] text-foreground transition-colors duration-[var(--duration-fast)] ease-[var(--ease)] hover:text-accent-text active:opacity-70 focus-visible:ring-2 focus-visible:ring-ring"
        >
          {content.product.name}
        </a>
        <nav className="hidden items-center gap-7 md:flex" aria-label={content.product.name}>
          {content.landing.nav.map((item) => (
            <a
              key={item}
              href="#"
              className="rounded-md text-chrome text-muted-foreground transition-colors duration-[var(--duration-fast)] ease-[var(--ease)] hover:text-foreground active:opacity-70 focus-visible:ring-2 focus-visible:ring-ring"
            >
              {item}
            </a>
          ))}
        </nav>
        <div className="justify-self-end">
          <Button variant="cta" size="sm">{content.landing.cta}</Button>
        </div>
      </div>
    </header>
  );
}
