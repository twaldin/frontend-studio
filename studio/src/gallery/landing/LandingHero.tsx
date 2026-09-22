import { Hero } from "./Hero";
import { Nav } from "./Nav";

export function LandingHero() {
  return (
    <div className="bg-background text-foreground">
      <Nav />
      <Hero />
    </div>
  );
}
