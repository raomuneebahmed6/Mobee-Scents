export type BottleVariant = "rect" | "facet" | "round" | "flask";

export interface ProductSize {
  label: string;
  price: number;
}

export interface ProductNotes {
  top: string[];
  heart: string[];
  base: string[];
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  category: string;
  noteFamilies: string[];
  description: string;
  notes: ProductNotes;
  price: number;
  compareAtPrice?: number;
  rating: number;
  reviewCount: number;
  badge?: string;
  sizes: ProductSize[];
  bottleVariant: BottleVariant;
  accent: string;
  accentSoft: string;
}

export interface CartItem {
  productId: string;
  size: string;
  quantity: number;
}

export interface Testimonial {
  id: string;
  name: string;
  location: string;
  rating: number;
  review: string;
  initials: string;
}

export interface FragranceNote {
  id: string;
  name: string;
  description: string;
  icon: string;
  accent: string;
}
