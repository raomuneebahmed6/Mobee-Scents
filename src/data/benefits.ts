export interface Benefit {
  id: string;
  title: string;
  description: string;
  icon: string;
}

export const benefits: Benefit[] = [
  {
    id: "quality",
    title: "Premium Quality",
    description: "Sourced from renowned houses and formulated with high-concentration oils.",
    icon: "Gem",
  },
  {
    id: "longevity",
    title: "Long-Lasting Fragrances",
    description: "Eight-hour-plus wear built on rich, well-balanced compositions.",
    icon: "Clock",
  },
  {
    id: "curation",
    title: "Carefully Selected Scents",
    description: "Every fragrance in our collection is chosen, not just stocked.",
    icon: "Sparkles",
  },
  {
    id: "secure",
    title: "Secure Shopping",
    description: "Encrypted checkout and verified payment partners, every order.",
    icon: "ShieldCheck",
  },
  {
    id: "delivery",
    title: "Fast Delivery",
    description: "Dispatched within 24 hours, tracked from our door to yours.",
    icon: "Truck",
  },
  {
    id: "support",
    title: "Customer Support",
    description: "A real team, ready to help with sizing, notes, or your order.",
    icon: "Headset",
  },
];
