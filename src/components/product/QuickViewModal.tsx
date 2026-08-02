"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { X, Minus, Plus, Heart, Check } from "lucide-react";
import type { Product } from "@/lib/types";
import { formatPrice, cn } from "@/lib/utils";
import { StarRating } from "@/components/ui/StarRating";
import { PerfumeBottle } from "@/components/ui/PerfumeBottle";
import { Button } from "@/components/ui/Button";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";

export function QuickViewModal({ product, onClose }: { product: Product | null; onClose: () => void }) {
  const { addItem } = useCart();
  const { isWishlisted, toggle } = useWishlist();
  const [sizeIndex, setSizeIndex] = useState(1);
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);

  useEffect(() => {
    if (product) {
      // Selection state lives above the AnimatePresence-tracked JSX (see render below),
      // so it must be reset here each time a new product opens rather than on mount.
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setSizeIndex(Math.min(1, product.sizes.length - 1));
      setQuantity(1);
      setAdded(false);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [product]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  if (!product) return null;
  const size = product.sizes[sizeIndex];
  const wishlisted = isWishlisted(product.id);

  const handleAddToCart = () => {
    addItem(product.id, size.label, quantity);
    setAdded(true);
    setTimeout(() => onClose(), 900);
  };

  return (
    <AnimatePresence>
      {product && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-[80] bg-black/60 backdrop-blur-sm"
          />
          <div className="fixed inset-0 z-[90] flex items-center justify-center p-4 sm:p-8">
            <motion.div
              initial={{ opacity: 0, scale: 0.94, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 10 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="relative grid max-h-[90vh] w-full max-w-3xl grid-cols-1 overflow-y-auto bg-ivory shadow-2xl sm:grid-cols-2 sm:overflow-visible"
              role="dialog"
              aria-modal="true"
              aria-label={`${product.name} quick view`}
            >
              <button
                aria-label="Close quick view"
                onClick={onClose}
                className="absolute top-4 right-4 z-10 rounded-full bg-ivory/90 p-2 text-charcoal shadow-sm hover:bg-ivory"
              >
                <X size={18} strokeWidth={1.5} />
              </button>

              <div className="flex items-center justify-center bg-gradient-to-b from-cream to-cream/60 p-10 sm:p-12">
                <div className="w-full max-w-[240px]">
                  <PerfumeBottle variant={product.bottleVariant} accent={product.accent} accentSoft={product.accentSoft} />
                </div>
              </div>

              <div className="flex flex-col p-6 sm:overflow-y-auto sm:p-8">
                <p className="text-xs tracking-[0.2em] text-gold uppercase">{product.category}</p>
                <h2 className="mt-1 font-serif text-3xl text-charcoal">{product.name}</h2>
                <div className="mt-2 flex items-center gap-2">
                  <StarRating rating={product.rating} />
                  <span className="text-xs text-charcoal/50">
                    {product.rating} ({product.reviewCount} reviews)
                  </span>
                </div>

                <p className="mt-4 text-sm leading-relaxed text-charcoal/65">{product.description}</p>

                <div className="mt-5 grid grid-cols-3 gap-3 border-y border-charcoal/10 py-4 text-xs">
                  <NoteColumn label="Top" notes={product.notes.top} />
                  <NoteColumn label="Heart" notes={product.notes.heart} />
                  <NoteColumn label="Base" notes={product.notes.base} />
                </div>

                <div className="mt-5">
                  <p className="mb-2 text-xs font-medium tracking-[0.15em] text-charcoal/60 uppercase">Size</p>
                  <div className="flex gap-2">
                    {product.sizes.map((s, i) => (
                      <button
                        key={s.label}
                        onClick={() => setSizeIndex(i)}
                        className={cn(
                          "border px-4 py-2 text-sm transition-colors",
                          i === sizeIndex
                            ? "border-charcoal bg-charcoal text-ivory"
                            : "border-charcoal/25 text-charcoal/70 hover:border-charcoal"
                        )}
                      >
                        {s.label}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="mt-5 flex items-center gap-6">
                  <div>
                    <p className="mb-2 text-xs font-medium tracking-[0.15em] text-charcoal/60 uppercase">Quantity</p>
                    <div className="flex items-center gap-4 border border-charcoal/20 px-3 py-2">
                      <button
                        aria-label="Decrease quantity"
                        onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                        className="text-charcoal/60 hover:text-charcoal"
                      >
                        <Minus size={14} strokeWidth={1.5} />
                      </button>
                      <span className="w-4 text-center text-sm">{quantity}</span>
                      <button
                        aria-label="Increase quantity"
                        onClick={() => setQuantity((q) => q + 1)}
                        className="text-charcoal/60 hover:text-charcoal"
                      >
                        <Plus size={14} strokeWidth={1.5} />
                      </button>
                    </div>
                  </div>
                  <div className="ml-auto text-right">
                    <p className="text-xs text-charcoal/50">Price</p>
                    <p className="font-serif text-2xl text-charcoal">{formatPrice(size.price * quantity)}</p>
                  </div>
                </div>

                <div className="mt-6 flex items-center gap-3">
                  <Button onClick={handleAddToCart} size="lg" className="flex-1 justify-center" disabled={added}>
                    {added ? (
                      <span className="flex items-center gap-2">
                        <Check size={16} /> Added
                      </span>
                    ) : (
                      "Add to Cart"
                    )}
                  </Button>
                  <button
                    aria-label={wishlisted ? "Remove from wishlist" : "Add to wishlist"}
                    onClick={() => toggle(product.id)}
                    className={cn(
                      "flex h-[50px] w-[50px] shrink-0 items-center justify-center border transition-colors",
                      wishlisted ? "border-gold bg-gold/10" : "border-charcoal/25 hover:border-charcoal"
                    )}
                  >
                    <Heart size={18} strokeWidth={1.5} className={wishlisted ? "fill-gold text-gold" : "text-charcoal/70"} />
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}

function NoteColumn({ label, notes }: { label: string; notes: string[] }) {
  return (
    <div>
      <p className="mb-1.5 font-medium tracking-[0.1em] text-charcoal/45 uppercase">{label}</p>
      <ul className="space-y-0.5 text-charcoal/70">
        {notes.map((n) => (
          <li key={n}>{n}</li>
        ))}
      </ul>
    </div>
  );
}
