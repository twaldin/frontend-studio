import { useGallery } from "@/gallery/context";

export function Proof() {
  const { choices, content } = useGallery();
  const proof = content.landing.proof;
  const playful = choices.register === "playful";
  const editorial = choices.register === "editorial";
  const surface = playful ? "mx-4 rounded-2xl border border-border-card bg-accent-soft" : "border-y border-border";
  if (choices.proof === "none") return null;

  if (choices.proof === "numbers") {
    return (
      <section className={surface}>
        <div className="mx-auto grid max-w-[1100px] grid-cols-1 px-8 sm:grid-cols-3">
          {proof.numbers.map((item, index) => (
            <div
              key={item.label}
              className={`py-12 text-center ${index > 0 ? "border-t border-border sm:border-t-0 sm:border-l" : ""}`}
            >
              <div className="tabular text-[40px] leading-none font-[500] text-foreground">{item.value}</div>
              <div className="mt-3 text-body text-muted-foreground">{item.label}</div>
            </div>
          ))}
        </div>
      </section>
    );
  }

  if (choices.proof === "quotes") {
    return (
      <section className={`${surface} ${editorial ? "py-24" : "py-16"}`}>
        <div className="mx-auto max-w-[820px] px-8 text-center">
          {proof.quotes.slice(0, 1).map((quote) => (
            <figure key={quote.who}>
              <blockquote className="text-[22px] leading-[1.55] font-[500] text-foreground">“{quote.text}”</blockquote>
              <figcaption className="mt-5 text-chrome text-muted-foreground">{quote.who}</figcaption>
            </figure>
          ))}
        </div>
      </section>
    );
  }

  return (
    <section className={`${surface} ${editorial ? "py-16" : "py-12"}`}>
      <div className="mx-auto flex max-w-[1100px] flex-wrap items-center justify-center gap-x-12 gap-y-6 px-8">
        {proof.logos.map((logo) => (
          <span key={logo} className="text-[15px] font-[500] text-muted-foreground/70">
            {logo}
          </span>
        ))}
      </div>
    </section>
  );
}
