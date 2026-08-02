import type { Product } from "@/lib/types";

/**
 * Sample product catalogue.
 *
 * TO CUSTOMIZE:
 * - Replace `price` / `sizes` with your real pricing (currency format lives in src/lib/utils.ts).
 * - `bottleVariant` + `accent` / `accentSoft` control the generated bottle artwork in
 *   src/components/ui/PerfumeBottle.tsx — swap in real product photography instead by
 *   editing src/components/product/ProductCard.tsx and QuickViewModal.tsx to render an
 *   <Image src="/images/products/your-photo.jpg" /> when one is available.
 */
export const products: Product[] = [
  {
    id: "red-tobacco",
    slug: "red-tobacco",
    name: "Red Tobacco",
    category: "Warm Spicy",
    noteFamilies: ["Tobacco", "Spicy", "Amber", "Vanilla", "Woody"],
    description:
      "A powerful blend of tobacco, cinnamon, oud, saffron, amber, vanilla and precious woods. Bold, smoky and unmistakably confident.",
    notes: {
      top: ["Saffron", "Cinnamon"],
      heart: ["Tobacco Leaf", "Oud"],
      base: ["Amber", "Vanilla", "Precious Woods"],
    },
    price: 12500,
    compareAtPrice: 14900,
    rating: 4.8,
    reviewCount: 214,
    badge: "Best Seller",
    sizes: [
      { label: "30ml", price: 8200 },
      { label: "50ml", price: 12500 },
      { label: "100ml", price: 17900 },
    ],
    bottleVariant: "flask",
    accent: "#8a2f1f",
    accentSoft: "#c97a5c",
  },
  {
    id: "1-million",
    slug: "1-million",
    name: "1 Million",
    category: "Woody Spicy",
    noteFamilies: ["Woody", "Spicy", "Amber", "Leather", "Floral"],
    description:
      "A bold fragrance featuring blood mandarin, cinnamon, rose, leather, amber and patchouli — audacious, magnetic, and made to be noticed.",
    notes: {
      top: ["Blood Mandarin", "Cinnamon"],
      heart: ["Rose", "Leather"],
      base: ["Amber", "Patchouli"],
    },
    price: 15900,
    compareAtPrice: 18500,
    rating: 4.9,
    reviewCount: 342,
    badge: "Popular",
    sizes: [
      { label: "30ml", price: 10200 },
      { label: "50ml", price: 15900 },
      { label: "100ml", price: 21900 },
    ],
    bottleVariant: "facet",
    accent: "#a3812c",
    accentSoft: "#e0c069",
  },
  {
    id: "santal-33",
    slug: "santal-33",
    name: "Santal 33",
    category: "Woody Aromatic",
    noteFamilies: ["Woody", "Leather", "Floral"],
    description:
      "A sophisticated combination of sandalwood, cedarwood, cardamom, violet, leather and musk. Understated, refined, and endlessly wearable.",
    notes: {
      top: ["Cardamom", "Violet"],
      heart: ["Sandalwood", "Cedarwood"],
      base: ["Leather", "Musk"],
    },
    price: 24500,
    rating: 4.7,
    reviewCount: 176,
    badge: "Premium Choice",
    sizes: [
      { label: "30ml", price: 15900 },
      { label: "50ml", price: 24500 },
      { label: "100ml", price: 34900 },
    ],
    bottleVariant: "round",
    accent: "#6b4a2f",
    accentSoft: "#c9a876",
  },
  {
    id: "tuscan-leather",
    slug: "tuscan-leather",
    name: "Tuscan Leather",
    category: "Leather",
    noteFamilies: ["Leather", "Amber", "Floral", "Woody"],
    description:
      "A rich fragrance combining raspberry, saffron, jasmine, leather, suede, amber and woods — sensual, opulent, and deeply memorable.",
    notes: {
      top: ["Raspberry", "Saffron"],
      heart: ["Jasmine", "Leather"],
      base: ["Suede", "Amber", "Woods"],
    },
    price: 26900,
    rating: 4.9,
    reviewCount: 128,
    badge: "Luxury Pick",
    sizes: [
      { label: "30ml", price: 17500 },
      { label: "50ml", price: 26900 },
      { label: "100ml", price: 37900 },
    ],
    bottleVariant: "rect",
    accent: "#2b1c14",
    accentSoft: "#8a5a3b",
  },
];

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}
