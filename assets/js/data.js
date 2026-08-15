/* Mobee Scents — sample data.
   TO CUSTOMIZE: edit PRODUCTS (prices/sizes/notes), TESTIMONIALS, FRAGRANCE_NOTES, BENEFITS below. */

const CURRENCY_SYMBOL = "Rs.";

function formatPrice(value) {
  return `${CURRENCY_SYMBOL} ${value.toLocaleString("en-PK")}`;
}

const PRODUCTS = [
  {
    id: "red-tobacco",
    slug: "red-tobacco",
    name: "Red Tobacco",
    category: "Warm Spicy",
    gender: "Men",
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
    gender: "Men",
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
    gender: "Unisex",
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
    gender: "Unisex",
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
  {
    id: "rose-vanille",
    slug: "rose-vanille",
    name: "Rose Vanille",
    category: "Floral",
    gender: "Women",
    noteFamilies: ["Floral", "Vanilla", "Amber", "Fresh"],
    description:
      "A graceful blend of Bulgarian rose, bergamot, jasmine, vanilla, amber and soft musk — elegant, warm, and effortlessly feminine.",
    notes: {
      top: ["Bergamot", "Pink Pepper"],
      heart: ["Bulgarian Rose", "Jasmine"],
      base: ["Vanilla", "Amber", "Musk"],
    },
    price: 16900,
    compareAtPrice: 19500,
    rating: 4.8,
    reviewCount: 96,
    badge: "New Arrival",
    sizes: [
      { label: "30ml", price: 10900 },
      { label: "50ml", price: 16900 },
      { label: "100ml", price: 22900 },
    ],
    bottleVariant: "round",
    accent: "#9c2b4e",
    accentSoft: "#e8a8bd",
  },
  {
    id: "velvet-bloom",
    slug: "velvet-bloom",
    name: "Velvet Bloom",
    category: "Floral",
    gender: "Women",
    noteFamilies: ["Floral", "Fresh", "Vanilla"],
    description:
      "A luminous composition of peony, lychee, white musk and vanilla — soft, radiant, and made for everyday wear.",
    notes: {
      top: ["Lychee", "Mandarin"],
      heart: ["Peony", "Freesia"],
      base: ["White Musk", "Vanilla"],
    },
    price: 14500,
    rating: 4.6,
    reviewCount: 61,
    badge: "Editor's Pick",
    sizes: [
      { label: "30ml", price: 9500 },
      { label: "50ml", price: 14500 },
      { label: "100ml", price: 19900 },
    ],
    bottleVariant: "facet",
    accent: "#7a4a8a",
    accentSoft: "#d9b8e8",
  },
];

function getProductById(id) {
  return PRODUCTS.find((p) => p.id === id);
}

const TESTIMONIALS = [
  {
    id: "t1",
    name: "Ayesha Raza",
    location: "Lahore, PK",
    rating: 5,
    review:
      "Red Tobacco lasts from morning meetings well into the evening. The packaging alone feels like a gift — this is my third bottle.",
    initials: "AR",
  },
  {
    id: "t2",
    name: "Hamza Tariq",
    location: "Karachi, PK",
    rating: 5,
    review:
      "I've tried a lot of oud-forward scents and 1 Million still gets the most compliments. Mobee Scents ships fast and the bottle arrived perfectly packed.",
    initials: "HT",
  },
  {
    id: "t3",
    name: "Sara Khalid",
    location: "Islamabad, PK",
    rating: 4,
    review:
      "Santal 33 is exactly the understated luxury I was looking for. Subtle in the room, noticeable up close. Customer support was also genuinely helpful.",
    initials: "SK",
  },
  {
    id: "t4",
    name: "Bilal Ahmed",
    location: "Faisalabad, PK",
    rating: 5,
    review:
      "Tuscan Leather is unlike anything else in my collection — warm, rich, and it wears differently through the day. Worth every rupee.",
    initials: "BA",
  },
];

const FRAGRANCE_NOTES = [
  { id: "woody", name: "Woody", description: "Sandalwood, cedar & vetiver", icon: "tree-pine" },
  { id: "spicy", name: "Spicy", description: "Cinnamon, cardamom & saffron", icon: "flame" },
  { id: "leather", name: "Leather", description: "Suede, leather & tobacco flower", icon: "layers" },
  { id: "tobacco", name: "Tobacco", description: "Cured leaf & dried fruit", icon: "cigarette" },
  { id: "amber", name: "Amber", description: "Warm resin & labdanum", icon: "gem" },
  { id: "vanilla", name: "Vanilla", description: "Bourbon vanilla & musk", icon: "flower-2" },
  { id: "fresh", name: "Fresh", description: "Citrus, bergamot & sea salt", icon: "droplets" },
  { id: "floral", name: "Floral", description: "Jasmine, rose & violet", icon: "flower" },
];

const BENEFITS = [
  { id: "quality", title: "Premium Quality", description: "Sourced from renowned houses and formulated with high-concentration oils.", icon: "gem" },
  { id: "longevity", title: "Long-Lasting Fragrances", description: "Eight-hour-plus wear built on rich, well-balanced compositions.", icon: "clock" },
  { id: "curation", title: "Carefully Selected Scents", description: "Every fragrance in our collection is chosen, not just stocked.", icon: "sparkles" },
  { id: "secure", title: "Secure Shopping", description: "Encrypted checkout and verified payment partners, every order.", icon: "shield-check" },
  { id: "delivery", title: "Fast Delivery", description: "Dispatched within 24 hours, tracked from our door to yours.", icon: "truck" },
  { id: "support", title: "Customer Support", description: "A real team, ready to help with sizing, notes, or your order.", icon: "headset" },
];

// TO CUSTOMIZE: contact details, used across contact.html and layout.js footer.
const SITE_CONFIG = {
  whatsappNumber: "923006622266",
  email: "support@mobeescents.com",
  phone: "+92 300 6622266",
  address: "Gulberg III, Lahore, Pakistan",
  hours: "Mon – Sat, 10:00 AM – 8:00 PM PKT",
  social: { instagram: "#", facebook: "#", twitter: "#" },
};
