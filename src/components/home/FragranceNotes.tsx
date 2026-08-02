"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  TreePine,
  Flame,
  Layers,
  Cigarette,
  Gem,
  Flower2,
  Droplets,
  Flower,
  type LucideIcon,
} from "lucide-react";
import { fragranceNotes } from "@/data/fragranceNotes";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";

const ICONS: Record<string, LucideIcon> = {
  TreePine,
  Flame,
  Layers,
  Cigarette,
  Gem,
  Flower2,
  Droplets,
  Flower,
};

export function FragranceNotes() {
  return (
    <section className="bg-cream/50 py-24 sm:py-28">
      <Container>
        <SectionHeading
          eyebrow="The Vocabulary of Scent"
          title="Explore Fragrance Notes"
          description="Every Mobee Scents fragrance is built from these eight families. Choose one to browse fragrances built around it."
          align="center"
          className="mx-auto"
        />

        <div className="mt-14 grid grid-cols-2 gap-5 sm:grid-cols-4">
          {fragranceNotes.map((note, i) => {
            const Icon = ICONS[note.icon];
            return (
              <motion.div
                key={note.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.5, delay: (i % 4) * 0.07, ease: [0.22, 1, 0.36, 1] }}
              >
                <Link
                  href={`/shop?note=${encodeURIComponent(note.name)}`}
                  className="group flex flex-col items-center gap-3 border border-charcoal/10 bg-ivory px-4 py-8 text-center transition-all duration-400 hover:-translate-y-1 hover:border-gold/50 hover:shadow-[0_20px_35px_-18px_rgba(28,26,23,0.25)]"
                >
                  <span
                    className="relative flex h-16 w-16 items-center justify-center rounded-full border border-charcoal/10 font-serif text-2xl text-charcoal transition-all duration-500 group-hover:scale-110 group-hover:rotate-[8deg]"
                    style={{ background: `${note.accent}14` }}
                  >
                    {note.name[0]}
                    {Icon && (
                      <Icon
                        size={14}
                        strokeWidth={1.5}
                        className="absolute -right-1 -bottom-1 rounded-full bg-ivory p-0.5 text-gold shadow-sm"
                      />
                    )}
                  </span>
                  <span className="font-serif text-lg text-charcoal">{note.name}</span>
                  <span className="text-xs text-charcoal/50">{note.description}</span>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
