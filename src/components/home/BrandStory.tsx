"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { PerfumeBottle } from "@/components/ui/PerfumeBottle";

export function BrandStory() {
  return (
    <section className="overflow-hidden py-24 sm:py-32">
      <Container>
        <div className="grid grid-cols-1 items-center gap-14 lg:grid-cols-12 lg:gap-6">
          <div className="relative col-span-1 aspect-[4/5] overflow-hidden lg:col-span-5">
            <div className="absolute inset-0 flex items-center justify-center bg-charcoal">
              <div className="w-[55%]">
                <PerfumeBottle variant="round" accent="#6b4a2f" accentSoft="#c9a876" />
              </div>
              <span className="absolute top-6 left-6 font-serif text-sm tracking-[0.2em] text-ivory/40 uppercase">
                Est. Mobee Scents
              </span>
            </div>
            <motion.div
              initial={{ scaleY: 1 }}
              whileInView={{ scaleY: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              style={{ originY: 0 }}
              className="absolute inset-0 bg-ivory"
            />
          </div>

          <div className="col-span-1 lg:col-span-6 lg:col-start-7">
            <p className="text-xs font-medium tracking-[0.28em] text-gold uppercase">Our Story</p>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="mt-4 max-w-lg font-serif text-4xl leading-tight text-charcoal sm:text-5xl"
            >
              The Art of Making an Impression
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="mt-6 max-w-md text-[15px] leading-relaxed text-charcoal/65"
            >
              At Mobee Scents, we believe fragrance is more than a scent. It is a memory, a mood, and a personal
              statement. Our collection brings together distinctive fragrances for people who want their presence
              to be remembered.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, delay: 0.32 }}
            >
              <Link
                href="/about"
                className="mt-8 inline-flex items-center gap-2 border-b border-charcoal/30 pb-1 text-sm tracking-[0.05em] text-charcoal transition-colors hover:border-gold hover:text-gold"
              >
                Read Our Story <ArrowRight size={15} strokeWidth={1.5} />
              </Link>
            </motion.div>
          </div>
        </div>
      </Container>
    </section>
  );
}
