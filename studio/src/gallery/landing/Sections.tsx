import { useEffect, useRef, useState } from "react";
import { Boxes, Gauge, ShieldCheck, type LucideIcon } from "lucide-react";
import { ShellScene } from "@/gallery/app";
import { useGallery } from "@/gallery/context";
import { Frame } from "./Frames";

function ProductShot({ className = "" }: { className?: string }) {
  const { choices } = useGallery();

  return (
    <div className={className}>
      <Frame kind={choices.frames}>
        <ShellScene />
      </Frame>
    </div>
  );
}

function Claim({ section, centered = false }: { section: { eyebrow: string; title: string; body: string }; centered?: boolean }) {
  const { choices } = useGallery();
  const editorial = choices.register === "editorial";

  return (
    <div className={centered ? `mx-auto text-center ${editorial ? "max-w-[800px]" : "max-w-[680px]"}` : editorial ? "max-w-[560px]" : "max-w-[470px]"}>
      <div className="text-chrome font-[500] text-muted-foreground">{section.eyebrow}</div>
      <h2 className={`mt-3 leading-[1.14] font-[500] tracking-[-0.02em] text-foreground ${editorial ? "text-[36px]" : "text-[28px]"}`}>{section.title}</h2>
      <p className={`mt-4 text-body text-muted-foreground ${editorial ? "leading-[1.85]" : "leading-[1.7]"}`}>{section.body}</p>
    </div>
  );
}

function StickySections({ chapters = false }: { chapters?: boolean }) {
  const { choices, content } = useGallery();
  const playful = choices.register === "playful";
  const [active, setActive] = useState(0);
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const list = listRef.current;
    if (!list) return;

    const claims = Array.from(list.querySelectorAll<HTMLElement>("[data-claim]"));
    const root = list.closest<HTMLElement>("[data-landing-scroll]");
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActive(Number((visible.target as HTMLElement).dataset.claim));
      },
      { root, rootMargin: "-28% 0px -42% 0px", threshold: [0.2, 0.55, 0.85] },
    );
    claims.forEach((claim) => observer.observe(claim));
    return () => observer.disconnect();
  }, []);

  return (
    <section className={`mx-auto grid max-w-[1160px] items-start gap-16 px-8 py-28 md:grid-cols-[0.72fr_1.28fr] ${chapters ? "border-y border-border bg-card" : ""}`}>
      <div ref={listRef}>
        {content.landing.sections.map((section, index) => (
          <article
            key={section.title}
            data-claim={index}
            className={`flex items-center transition-opacity duration-[var(--duration-base)] ease-[var(--ease)] ${chapters ? "my-10 min-h-[44vh] rounded-2xl border border-border-card bg-background px-8 shadow-sm" : "min-h-[52vh]"} ${active === index ? "opacity-100" : "opacity-40"} ${playful ? "my-8 rounded-2xl bg-accent-soft px-8" : ""}`}
          >
            <Claim section={section} />
          </article>
        ))}
      </div>
      <div className={`sticky top-24 hidden self-start md:block ${chapters ? "rounded-2xl bg-accent-soft p-5" : ""}`}>
        <div className="transition-transform duration-[var(--duration-base)] ease-[var(--ease)]" style={{ transform: `translateY(${active * 6}px)` }}>
          <ProductShot />
        </div>
      </div>
    </section>
  );
}

const featureIcons: LucideIcon[] = [ShieldCheck, Gauge, Boxes];

export function Sections() {
  const { choices, content } = useGallery();
  const sections = content.landing.sections;
  const editorial = choices.register === "editorial";
  const playful = choices.register === "playful";
  const rounded = playful ? "rounded-2xl" : "rounded-xl";

  if (choices.rhythm === "bento") {
    return (
      <section className={`mx-auto max-w-[1160px] px-8 ${editorial ? "py-36" : "py-24"} ${playful ? "my-4 rounded-2xl bg-accent-soft" : ""}`}>
        <div className="grid gap-5 md:auto-rows-fr md:grid-cols-3">
          {sections.map((section, index) => {
            const Icon = featureIcons[index % featureIcons.length]!;
            const featured = index === 0;
            return (
              <article
                key={section.title}
                className={`${rounded} border border-border-card bg-card shadow-sm ${featured ? "p-8 md:col-span-2 md:row-span-2" : "flex min-h-[280px] flex-col p-7"}`}
              >
                {featured ? (
                  <>
                    <Claim section={section} />
                    <ProductShot className="mt-8" />
                  </>
                ) : (
                  <>
                    <div className="mb-8 grid size-12 place-items-center rounded-xl border border-border bg-accent-soft text-accent-text shadow-sm">
                      <Icon aria-hidden="true" className="size-5" strokeWidth={choices.iconWeight === "regular" ? 2 : 1.5} />
                    </div>
                    <Claim section={section} />
                  </>
                )}
              </article>
            );
          })}
        </div>
      </section>
    );
  }

  if (choices.rhythm === "fullbleed") {
    return (
      <div>
        {sections.map((section, index) => (
          <section
            key={section.title}
            className={`border-b border-border px-8 ${editorial ? "py-40" : "py-28"} ${playful && index % 2 === 0 ? "bg-accent-soft" : ""}`}
          >
            <Claim section={section} centered />
            <ProductShot className="mx-auto mt-14 max-w-[1120px]" />
          </section>
        ))}
      </div>
    );
  }

  if (choices.rhythm === "sticky") return <StickySections />;
  if (choices.rhythm === "chapters") return <StickySections chapters />;

  return (
    <div className={editorial ? "py-12" : ""}>
      {sections.map((section, index) => (
        <section
          key={section.title}
          className={`mx-auto grid max-w-[1160px] items-center gap-16 px-8 ${editorial ? "py-32" : "py-24"} md:grid-cols-2 ${playful && index % 2 === 0 ? `${rounded} bg-accent-soft` : ""}`}
        >
          <div className={index % 2 === 1 ? "md:order-2" : ""}>
            <Claim section={section} />
          </div>
          <ProductShot className={index % 2 === 1 ? "md:order-1" : ""} />
        </section>
      ))}
    </div>
  );
}
