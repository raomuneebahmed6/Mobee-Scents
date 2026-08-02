"use client";

import { Heart, Eye, ShoppingBag } from "lucide-react";
import { motion } from "framer-motion";
import type { Product } from "@/lib/types";
import { formatPrice, cn } from "@/lib/utils";
import { StarRating } from "@/components/ui/StarRating";
import { PerfumeBottle } from "@/components/ui/PerfumeBottle";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";

export function ProductCard({
  product,
  onQuickView,
  index = 0,
}: {
  product: Product;
  onQuickView: (product: Product) => void;
  index?: number;
}) {
  const { addItem } = useCart();
  const { isWishlisted, toggle } = useWishlist();
  const wishlisted = isWishlisted(product.id);

  return (
    <motion.article
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: (index % 4) * 0.08 }}
      className="group relative flex flex-col border border-charcoal/10 bg-cream/40 transition-all duration-500 hover:-translate-y-1.5 hover:border-gold/50 hover:shadow-[0_28px_50px_-20px_rgba(28,26,23,0.25)]"
    >
      {product.badge && (
        <span className="absolute top-4 left-4 z-10 bg-charcoal px-3 py-1 text-[10px] font-medium tracking-[0.15em] text-ivory uppercase">
          {product.badge}
        </span>
      )}

      <button
        aria-label={wishlisted ? "Remove from wishlist" : "Add to wishlist"}
        onClick={() => toggle(product.id)}
        className={cn(
          "absolute top-4 right-4 z-10 rounded-full bg-ivory/90 p-2 shadow-sm transition-all duration-300",
          wishlisted ? "opacity-100" : "opacity-0 group-hover:opacity-100"
        )}
      >
        <Heart
          size={16}
          strokeWidth={1.5}
          className={wishlisted ? "fill-gold text-gold" : "text-charcoal/70"}
        />
      </button>

      <button
        onClick={() => onQuickView(product)}
        className="relative aspect-[3/4] w-full overflow-hidden bg-gradient-to-b from-cream to-cream/60 p-8"
        aria-label={`Quick view ${product.name}`}
      >
        <div className="h-full w-full transition-transform duration-700 ease-out group-hover:scale-[1.06]">
          <PerfumeBottle variant={product.bottleVariant} accent={product.accent} accentSoft={product.accentSoft} />
        </div>

        <span
          className={cn(
            "absolute inset-x-4 bottom-4 flex translate-y-full items-center justify-center gap-2 bg-charcoal py-3 text-[11px] font-medium tracking-[0.15em] text-ivory uppercase opacity-0 transition-all duration-400 ease-out group-hover:translate-y-0 group-hover:opacity-100"
          )}
        >
          <Eye size={14} strokeWidth={1.5} /> Quick View
        </span>
      </button>

      <div className="flex flex-1 flex-col px-5 pt-4 pb-5">
        <p className="text-[11px] tracking-[0.15em] text-gold uppercase">{product.category}</p>
        <h3 className="mt-1 font-serif text-xl text-charcoal">{product.name}</h3>
        <p className="mt-1.5 line-clamp-2 text-[13px] leading-relaxed text-charcoal/55">{product.description}</p>

        <div className="mt-3 flex items-center gap-2">
          <StarRating rating={product.rating} />
          <span className="text-xs text-charcoal/45">({product.reviewCount})</span>
        </div>

        <div className="mt-4 flex items-center justify-between">
          <div className="flex items-baseline gap-2">
            <span className="font-serif text-lg text-charcoal">{formatPrice(product.price)}</span>
            {product.compareAtPrice && (
              <span className="text-xs text-charcoal/35 line-through">{formatPrice(product.compareAtPrice)}</span>
            )}
          </div>
          <button
            onClick={() => addItem(product.id, product.sizes[1]?.label ?? product.sizes[0].label)}
            aria-label={`Add ${product.name} to cart`}
            className="flex items-center gap-1.5 border border-charcoal/25 px-3 py-2 text-[11px] font-medium tracking-[0.1em] text-charcoal uppercase transition-colors duration-300 hover:border-charcoal hover:bg-charcoal hover:text-ivory active:scale-95"
          >
            <ShoppingBag size={14} strokeWidth={1.5} /> Add
          </button>
        </div>
      </div>
    </motion.article>
  );
}
