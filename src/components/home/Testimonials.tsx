"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { testimonials } from "@/data/testimonials";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { StarRating } from "@/components/ui/StarRating";
import { cn } from "@/lib/utils";

export function Testimonials() {
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1);

  const go = (dir: number) => {
    setDirection(dir);
    setIndex((i) => (i + dir + testimonials.length) % testimonials.length);
  };

  useEffect(() => {
    const t = setInterval(() => go(1), 7000);
    return () => clearInterval(t);
  }, []);

  const active = testimonials[index];

  return (
    <section className="bg-charcoal py-24 text-ivory sm:py-28">
      <Container>
        <SectionHeading eyebrow="Client Voices" title="What Our Customers Say" align="center" dark className="mx-auto" />

        <div className="relative mx-auto mt-14 max-w-2xl">
          <Quote size={40} strokeWidth={1} className="mx-auto mb-6 text-gold/50" />

          <div className="relative min-h-[180px]">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={active.id}
                custom={direction}
                initial={{ opacity: 0, x: direction * 40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -direction * 40 }}
                transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                className="text-center"
              >
                <p className="mx-auto max-w-xl font-serif text-2xl leading-relaxed text-ivory/90 sm:text-[1.7rem]">
                  &ldquo;{active.review}&rdquo;
                </p>
                <div className="mt-6 flex flex-col items-center gap-2">
                  <StarRating rating={active.rating} />
                  <div className="flex items-center gap-3">
                    <span className="flex h-9 w-9 items-center justify-center rounded-full bg-ivory/10 font-serif text-xs text-gold">
                      {active.initials}
                    </span>
                    <div className="text-left">
                      <p className="text-sm text-ivory">{active.name}</p>
                      <p className="text-xs text-ivory/45">{active.location}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="mt-10 flex items-center justify-center gap-6">
            <button aria-label="Previous testimonial" onClick={() => go(-1)} className="text-ivory/50 hover:text-gold">
              <ChevronLeft size={20} strokeWidth={1.5} />
            </button>
            <div className="flex gap-2">
              {testimonials.map((t, i) => (
                <button
                  key={t.id}
                  aria-label={`Go to testimonial ${i + 1}`}
                  onClick={() => {
                    setDirection(i > index ? 1 : -1);
                    setIndex(i);
                  }}
                  className={cn("h-1.5 rounded-full transition-all duration-300", i === index ? "w-6 bg-gold" : "w-1.5 bg-ivory/25")}
                />
              ))}
            </div>
            <button aria-label="Next testimonial" onClick={() => go(1)} className="text-ivory/50 hover:text-gold">
              <ChevronRight size={20} strokeWidth={1.5} />
            </button>
          </div>
        </div>
      </Container>
    </section>
  );
}
