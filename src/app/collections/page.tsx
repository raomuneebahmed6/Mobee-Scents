import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { products } from "@/data/products";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { PerfumeBottle } from "@/components/ui/PerfumeBottle";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Collections",
  description: "Browse Mobee Scents fragrance collections by family — warm spicy, woody, aromatic, and leather.",
};

const collections = [
  {
    title: "Warm Spicy",
    description: "Tobacco, cinnamon and saffron — fragrances built for cooler evenings and lasting presence.",
    category: "Warm Spicy",
    product: products.find((p) => p.category === "Warm Spicy")!,
  },
  {
    title: "Woody Spicy",
    description: "Bold, magnetic compositions layered with mandarin, rose and amber.",
    category: "Woody Spicy",
    product: products.find((p) => p.category === "Woody Spicy")!,
  },
  {
    title: "Woody Aromatic",
    description: "Understated sandalwood and cedar for those who prefer quiet confidence.",
    category: "Woody Aromatic",
    product: products.find((p) => p.category === "Woody Aromatic")!,
  },
  {
    title: "Leather",
    description: "Rich, sensual leather accords finished with amber and soft woods.",
    category: "Leather",
    product: products.find((p) => p.category === "Leather")!,
  },
];

export default function CollectionsPage() {
  return (
    <div className="bg-ivory pt-32 pb-24">
      <Container>
        <div className="max-w-2xl">
          <p className="text-xs font-medium tracking-[0.28em] text-gold uppercase">Curated by Character</p>
          <h1 className="mt-3 font-serif text-4xl text-charcoal sm:text-5xl">Our Collections</h1>
          <p className="mt-4 text-[15px] leading-relaxed text-charcoal/60">
            Four fragrance families, each with its own mood. Explore the one that matches yours.
          </p>
        </div>
      </Container>

      <div className="mt-16 space-y-2">
        {collections.map((c, i) => (
          <Reveal key={c.category} delay={i * 0.05}>
            <Container>
              <Link
                href={`/shop?category=${encodeURIComponent(c.category)}`}
                className={cn(
                  "group grid grid-cols-1 items-center gap-8 border-t border-charcoal/10 py-12 lg:grid-cols-12",
                  i % 2 === 1 && "lg:[&>div:first-child]:col-start-8"
                )}
              >
                <div className={cn("col-span-1 flex aspect-[16/10] items-center justify-center bg-cream/60 lg:col-span-5", i % 2 === 1 && "lg:col-start-8")}>
                  <div className="w-[40%] transition-transform duration-700 group-hover:scale-105">
                    <PerfumeBottle
                      variant={c.product.bottleVariant}
                      accent={c.product.accent}
                      accentSoft={c.product.accentSoft}
                    />
                  </div>
                </div>
                <div className={cn("col-span-1 lg:col-span-6", i % 2 === 1 ? "lg:col-start-1 lg:row-start-1" : "lg:col-start-7")}>
                  <span className="text-xs tracking-[0.2em] text-gold uppercase">Collection {String(i + 1).padStart(2, "0")}</span>
                  <h2 className="mt-2 font-serif text-3xl text-charcoal sm:text-4xl">{c.title}</h2>
                  <p className="mt-3 max-w-md text-sm leading-relaxed text-charcoal/60">{c.description}</p>
                  <span className="mt-5 inline-flex items-center gap-2 border-b border-charcoal/30 pb-1 text-sm text-charcoal transition-colors group-hover:border-gold group-hover:text-gold">
                    Shop {c.title} <ArrowRight size={15} strokeWidth={1.5} className="transition-transform duration-300 group-hover:translate-x-1" />
                  </span>
                </div>
              </Link>
            </Container>
          </Reveal>
        ))}
      </div>
    </div>
  );
}
