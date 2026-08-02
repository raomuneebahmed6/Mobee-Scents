import type { Metadata } from "next";
import { Gem, Leaf, HeartHandshake } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { Button } from "@/components/ui/Button";
import { PerfumeBottle } from "@/components/ui/PerfumeBottle";

export const metadata: Metadata = {
  title: "About Us",
  description: "The story behind Mobee Scents — a fragrance house built around composition, character, and lasting impressions.",
};

const values = [
  {
    icon: Gem,
    title: "Composition Over Trend",
    description: "We choose fragrances for how they develop over hours, not how they photograph on a shelf.",
  },
  {
    icon: Leaf,
    title: "Considered Sourcing",
    description: "Every note in our collection is selected for quality of material, not just cost.",
  },
  {
    icon: HeartHandshake,
    title: "A Real Team",
    description: "Questions about a scent, a size, or an order reach a person — not a queue.",
  },
];

export default function AboutPage() {
  return (
    <div className="bg-ivory">
      <section className="bg-charcoal pt-40 pb-24 text-ivory">
        <Container className="max-w-3xl">
          <p className="text-xs font-medium tracking-[0.28em] text-gold uppercase">About Mobee Scents</p>
          <h1 className="mt-4 font-serif text-4xl leading-tight sm:text-5xl">The Art of Making an Impression</h1>
          <p className="mt-6 max-w-xl text-[15px] leading-relaxed text-ivory/65">
            At Mobee Scents, we believe fragrance is more than a scent. It is a memory, a mood, and a personal
            statement. Our collection brings together distinctive fragrances for people who want their presence to
            be remembered.
          </p>
        </Container>
      </section>

      <section className="py-24 sm:py-28">
        <Container>
          <div className="grid grid-cols-1 items-center gap-14 lg:grid-cols-12">
            <Reveal className="col-span-1 lg:col-span-5">
              <div className="flex aspect-[4/5] items-center justify-center bg-cream/60">
                <div className="w-[45%]">
                  <PerfumeBottle variant="flask" accent="#8a2f1f" accentSoft="#c97a5c" />
                </div>
              </div>
            </Reveal>
            <div className="col-span-1 lg:col-span-6 lg:col-start-7">
              <Reveal>
                <p className="text-xs font-medium tracking-[0.28em] text-gold uppercase">How We Started</p>
                <h2 className="mt-4 font-serif text-3xl text-charcoal sm:text-4xl">Built From a Simple Frustration</h2>
              </Reveal>
              <Reveal delay={0.1}>
                <p className="mt-5 max-w-md text-[15px] leading-relaxed text-charcoal/65">
                  Too many fragrance retailers optimize for shelf appeal — bright packaging, loud marketing, thin
                  compositions. We wanted something different: a small, focused catalogue of fragrances we would
                  actually wear ourselves, described honestly, and backed by people who know the notes by heart.
                </p>
              </Reveal>
              <Reveal delay={0.18}>
                <p className="mt-4 max-w-md text-[15px] leading-relaxed text-charcoal/65">
                  Today, Mobee Scents ships across Pakistan with a growing collection built around four families —
                  warm spicy, woody spicy, woody aromatic, and leather — each chosen for its longevity and character.
                </p>
              </Reveal>
            </div>
          </div>
        </Container>
      </section>

      <section className="bg-cream/50 py-24 sm:py-28">
        <Container>
          <Reveal>
            <p className="text-xs font-medium tracking-[0.28em] text-gold uppercase">What Guides Us</p>
            <h2 className="mt-4 max-w-lg font-serif text-3xl text-charcoal sm:text-4xl">Our Values</h2>
          </Reveal>
          <div className="mt-14 grid grid-cols-1 gap-10 sm:grid-cols-3">
            {values.map((v, i) => (
              <Reveal key={v.title} delay={i * 0.1}>
                <v.icon size={24} strokeWidth={1.4} className="text-gold" />
                <h3 className="mt-4 font-serif text-xl text-charcoal">{v.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-charcoal/60">{v.description}</p>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <section className="py-24 text-center">
        <Container className="mx-auto max-w-lg">
          <Reveal>
            <h2 className="font-serif text-3xl text-charcoal sm:text-4xl">Find Your Signature Scent</h2>
            <p className="mt-4 text-[15px] text-charcoal/60">
              Explore the full collection and discover the fragrance that speaks for you.
            </p>
            <Button href="/shop" size="lg" withArrow className="mt-8">
              Shop Collection
            </Button>
          </Reveal>
        </Container>
      </section>
    </div>
  );
}
