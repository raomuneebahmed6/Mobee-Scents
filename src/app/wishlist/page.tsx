"use client";

import { Heart } from "lucide-react";
import { products } from "@/data/products";
import { useWishlist } from "@/context/WishlistContext";
import { Container } from "@/components/ui/Container";
import { ProductGrid } from "@/components/product/ProductGrid";
import { Button } from "@/components/ui/Button";

export default function WishlistPage() {
  const { ids } = useWishlist();
  const items = products.filter((p) => ids.includes(p.id));

  return (
    <div className="bg-ivory pt-32 pb-24">
      <Container>
        <p className="text-xs font-medium tracking-[0.28em] text-gold uppercase">Saved for Later</p>
        <h1 className="mt-3 font-serif text-4xl text-charcoal sm:text-5xl">Your Wishlist</h1>

        {items.length === 0 ? (
          <div className="mt-16 flex flex-col items-center gap-4 text-center">
            <Heart size={40} strokeWidth={1} className="text-charcoal/25" />
            <p className="text-charcoal/60">You haven&rsquo;t saved any fragrances yet.</p>
            <Button href="/shop" withArrow>
              Browse the Collection
            </Button>
          </div>
        ) : (
          <ProductGrid products={items} className="mt-12" />
        )}
      </Container>
    </div>
  );
}
