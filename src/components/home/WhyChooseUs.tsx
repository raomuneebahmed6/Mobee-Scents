"use client";

import { motion } from "framer-motion";
import { Gem, Clock, Sparkles, ShieldCheck, Truck, Headset, type LucideIcon } from "lucide-react";
import { benefits } from "@/data/benefits";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";

const ICONS: Record<string, LucideIcon> = { Gem, Clock, Sparkles, ShieldCheck, Truck, Headset };

export function WhyChooseUs() {
  return (
    <section className="py-24 sm:py-28">
      <Container>
        <SectionHeading eyebrow="Why Mobee Scents" title="Why Choose Mobee Scents" align="center" className="mx-auto" />

        <div className="mt-14 grid grid-cols-1 gap-x-10 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
          {benefits.map((benefit, i) => {
            const Icon = ICONS[benefit.icon];
            return (
              <motion.div
                key={benefit.id}
                initial={{ opacity: 0, y: 22 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.6, delay: (i % 3) * 0.1, ease: [0.22, 1, 0.36, 1] }}
                className="flex gap-5"
              >
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-gold/40 text-gold">
                  {Icon && <Icon size={19} strokeWidth={1.4} />}
                </span>
                <div>
                  <h3 className="font-serif text-lg text-charcoal">{benefit.title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-charcoal/60">{benefit.description}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
