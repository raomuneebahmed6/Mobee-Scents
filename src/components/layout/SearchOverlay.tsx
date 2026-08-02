"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Search, X } from "lucide-react";
import { products } from "@/data/products";
import { formatPrice } from "@/lib/utils";
import { PerfumeBottle } from "@/components/ui/PerfumeBottle";

export function SearchOverlay({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  useEffect(() => {
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 350);
    } else {
      // Clear the query once the overlay's exit animation starts.
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setQuery("");
    }
  }, [open]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  const results = query.trim()
    ? products.filter(
        (p) =>
          p.name.toLowerCase().includes(query.toLowerCase()) ||
          p.category.toLowerCase().includes(query.toLowerCase()) ||
          p.noteFamilies.some((n) => n.toLowerCase().includes(query.toLowerCase()))
      )
    : [];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/shop?q=${encodeURIComponent(query.trim())}`);
      onClose();
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-[80] bg-black/60 backdrop-blur-sm"
          />
          <motion.div
            initial={{ opacity: 0, y: -24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -24 }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="fixed top-0 left-0 z-[90] w-full bg-ivory pt-24 pb-10 shadow-2xl"
          >
            <div className="mx-auto max-w-2xl px-6">
              <div className="flex items-center justify-between">
                <p className="text-xs tracking-[0.25em] text-charcoal/50 uppercase">Search the Collection</p>
                <button aria-label="Close search" onClick={onClose} className="rounded-full p-2 hover:bg-charcoal/5">
                  <X size={20} strokeWidth={1.5} />
                </button>
              </div>
              <form onSubmit={handleSubmit} className="mt-4 flex items-center gap-3 border-b border-charcoal/20 pb-3">
                <Search size={20} strokeWidth={1.5} className="text-charcoal/40" />
                <input
                  ref={inputRef}
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  type="text"
                  placeholder="Search fragrances, notes, categories…"
                  className="w-full bg-transparent font-serif text-2xl text-charcoal placeholder:text-charcoal/30 focus:outline-none"
                />
              </form>

              {results.length > 0 && (
                <div className="mt-6 max-h-[50vh] space-y-1 overflow-y-auto">
                  {results.map((p) => (
                    <Link
                      key={p.id}
                      href={`/shop?q=${encodeURIComponent(p.name)}`}
                      onClick={onClose}
                      className="flex items-center gap-4 rounded-lg p-3 transition-colors hover:bg-charcoal/5"
                    >
                      <div className="h-14 w-14 shrink-0 rounded-md bg-charcoal/5 p-1">
                        <PerfumeBottle variant={p.bottleVariant} accent={p.accent} accentSoft={p.accentSoft} glow={false} />
                      </div>
                      <div>
                        <p className="font-serif text-lg text-charcoal">{p.name}</p>
                        <p className="text-xs text-charcoal/50">{p.category}</p>
                      </div>
                      <span className="ml-auto text-sm text-charcoal/70">{formatPrice(p.price)}</span>
                    </Link>
                  ))}
                </div>
              )}
              {query.trim() && results.length === 0 && (
                <p className="mt-6 text-sm text-charcoal/50">No fragrances found for &ldquo;{query}&rdquo;.</p>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
