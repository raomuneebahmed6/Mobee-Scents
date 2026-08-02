"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Check } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";

export function Newsletter() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    if (!valid) {
      setError(true);
      return;
    }
    setError(false);
    setSuccess(true);
    setEmail("");
  };

  return (
    <section className="bg-cream/60 py-24 sm:py-28">
      <Container className="mx-auto max-w-2xl text-center">
        <p className="text-xs font-medium tracking-[0.28em] text-gold uppercase">Stay Connected</p>
        <h2 className="mt-4 font-serif text-3xl text-charcoal sm:text-4xl">Join the Mobee Scents Community</h2>
        <p className="mx-auto mt-4 max-w-md text-[15px] leading-relaxed text-charcoal/60">
          Receive exclusive offers, fragrance recommendations, and updates on new arrivals.
        </p>

        <div className="mx-auto mt-8 max-w-md">
          <AnimatePresence mode="wait">
            {success ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex items-center justify-center gap-2 border border-gold/40 bg-ivory px-6 py-4 text-sm text-charcoal"
              >
                <Check size={17} className="text-gold" /> You&rsquo;re on the list — welcome to Mobee Scents.
              </motion.div>
            ) : (
              <motion.form
                key="form"
                onSubmit={handleSubmit}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex flex-col gap-3 sm:flex-row"
              >
                <div className="flex-1 text-left">
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (error) setError(false);
                    }}
                    placeholder="Enter your email address"
                    className="w-full border border-charcoal/20 bg-ivory px-4 py-3.5 text-sm text-charcoal placeholder:text-charcoal/40 focus:border-gold focus:outline-none"
                  />
                  {error && <p className="mt-1.5 text-xs text-red-700">Please enter a valid email address.</p>}
                </div>
                <Button type="submit" size="lg">
                  Subscribe
                </Button>
              </motion.form>
            )}
          </AnimatePresence>
        </div>
      </Container>
    </section>
  );
}
