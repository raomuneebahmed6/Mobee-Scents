"use client";

import { useRef } from "react";
import { motion, useMotionValue, useScroll, useSpring, useTransform } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { PerfumeBottle } from "@/components/ui/PerfumeBottle";

const HEADLINE = "Find a Fragrance That Defines You";

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const bottleX = useSpring(useTransform(mouseX, [-1, 1], [-14, 14]), { stiffness: 60, damping: 20 });
  const bottleY = useSpring(useTransform(mouseY, [-1, 1], [-10, 10]), { stiffness: 60, damping: 20 });

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end start"] });
  const parallaxY = useTransform(scrollYProgress, [0, 1], [0, 140]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const rect = sectionRef.current?.getBoundingClientRect();
    if (!rect) return;
    mouseX.set(((e.clientX - rect.left) / rect.width) * 2 - 1);
    mouseY.set(((e.clientY - rect.top) / rect.height) * 2 - 1);
  };

  const words = HEADLINE.split(" ");

  return (
    <section
      ref={sectionRef}
      onMouseMove={handleMouseMove}
      className="relative flex h-[100svh] min-h-[640px] w-full items-center overflow-hidden bg-charcoal"
    >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_75%_50%,rgba(179,146,79,0.14),transparent_55%)]" />

      <motion.div style={{ y: parallaxY }} className="pointer-events-none absolute inset-0">
        <div className="absolute right-[-8%] bottom-[1%] h-[34%] w-[52%] opacity-40 sm:top-1/2 sm:right-[2%] sm:bottom-auto sm:h-[85%] sm:w-[55%] sm:-translate-y-1/2 sm:opacity-90 lg:right-[6%] lg:w-[42%]">
          <motion.div
            style={{ x: bottleX, y: bottleY }}
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
            className="h-full w-full"
          >
            <motion.div
              animate={{ scale: [1, 1.035, 1] }}
              transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
              className="h-full w-full"
            >
              <PerfumeBottle variant="facet" accent="#a3812c" accentSoft="#e0c069" className="h-full w-full drop-shadow-[0_40px_60px_rgba(0,0,0,0.45)]" />
            </motion.div>
          </motion.div>
        </div>
      </motion.div>

      <motion.div style={{ opacity: contentOpacity }} className="relative z-10 mx-auto w-full max-w-[1400px] px-6 md:px-10 lg:px-16">
        <div className="max-w-xl">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="mb-5 text-xs font-medium tracking-[0.32em] text-gold uppercase"
          >
            Discover Your Signature Scent
          </motion.p>

          <h1 className="font-serif text-[2.6rem] leading-[1.08] text-ivory sm:text-6xl md:text-[4.2rem]">
            {words.map((word, i) => (
              <span key={i} className="inline-block overflow-hidden pb-1 align-bottom">
                <motion.span
                  initial={{ y: "110%" }}
                  animate={{ y: 0 }}
                  transition={{ duration: 0.8, delay: 0.3 + i * 0.09, ease: [0.22, 1, 0.36, 1] }}
                  className="inline-block"
                >
                  {word}
                  {i < words.length - 1 ? " " : ""}
                </motion.span>
              </span>
            ))}
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.85 }}
            className="mt-6 max-w-md text-[15px] leading-relaxed text-ivory/65"
          >
            Explore a carefully selected collection of iconic fragrances designed to leave a lasting impression.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 1.05 }}
            className="mt-9 flex flex-wrap items-center gap-4"
          >
            <Button href="/shop" size="lg" withArrow>
              Shop Collection
            </Button>
            <Button href="/collections" size="lg" variant="ghost">
              Explore Scents
            </Button>
          </motion.div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-2 text-ivory/50"
      >
        <span className="text-[10px] tracking-[0.25em] uppercase">Scroll</span>
        <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}>
          <ChevronDown size={16} strokeWidth={1.5} />
        </motion.div>
      </motion.div>
    </section>
  );
}
