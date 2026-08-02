# Mobee Scents

Premium, fully responsive fragrance e-commerce website for **Mobee Scents** — built with Next.js (App Router), Tailwind CSS v4, Framer Motion, and Lucide icons.

## Tech Stack

- **Next.js 16** (App Router, TypeScript, Turbopack)
- **Tailwind CSS v4** (theme defined in `src/app/globals.css`)
- **Framer Motion** for entrance, scroll-reveal, and drawer/modal animations
- **Lucide React** for icons
- Cart & Wishlist state persisted client-side via `localStorage`

No backend/database is included — this is a front-end storefront. Cart/wishlist data lives in the browser; "Checkout" shows a confirmation message rather than charging a real payment provider.

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

Other scripts:

```bash
npm run build   # production build
npm run start   # run the production build locally
npm run lint    # ESLint
```

## Deploying to Vercel

1. Push this repository to GitHub (already done if you're reading this from the repo).
2. Go to [vercel.com/new](https://vercel.com/new), import the `mobee-scents` GitHub repository.
3. Vercel auto-detects Next.js — no build settings need to change. Click **Deploy**.
4. Every push to the main branch will auto-deploy.

## Project Structure

```
src/
  app/                    Routes (App Router) — one folder per page
    shop/                 Shop listing + filters/sort/search (ShopClient.tsx)
    collections/          Editorial collections page
    about/, contact/      Brand story & contact form
    privacy-policy/, terms-and-conditions/, shipping-policy/, return-policy/
    wishlist/             Saved items page
    layout.tsx            Root layout: fonts, metadata, providers, Header/Footer/CartDrawer
    globals.css           Tailwind v4 theme (colors, fonts) — see @theme block
    sitemap.ts, robots.ts SEO
  components/
    layout/                Header, MobileMenu, Footer, CartDrawer, SearchOverlay, AccountMenu
    home/                   Hero, FeaturedProducts, FragranceNotes, WhyChooseUs, BrandStory, Testimonials, Newsletter
    product/                ProductCard, QuickViewModal, ProductGrid
    contact/                ContactForm
    ui/                     Reusable primitives: Button, SectionHeading, StarRating, Reveal,
                             PerfumeBottle (generated bottle artwork), Logo, Container, PolicyPage
  context/                  CartContext, WishlistContext (localStorage-backed)
  data/                     products.ts, testimonials.ts, fragranceNotes.ts, benefits.ts
  lib/                      types.ts, utils.ts (currency formatting, slugify)
  hooks/                    useLocalStorage.ts
```

## Where to Customize

| What | File |
|---|---|
| **Product images** | Products currently use generated SVG bottle art (`src/components/ui/PerfumeBottle.tsx`) so the site works with zero external assets. To use real photography, add images to `public/images/products/` and swap the `<PerfumeBottle ... />` usages in `ProductCard.tsx`, `QuickViewModal.tsx`, `CartDrawer.tsx`, and `SearchOverlay.tsx` for `next/image`. |
| **Products, prices, sizes, fragrance notes** | `src/data/products.ts` |
| **Currency / price formatting** | `src/lib/utils.ts` → `formatPrice()` (defaults to PKR) |
| **Testimonials** | `src/data/testimonials.ts` |
| **Fragrance note categories** | `src/data/fragranceNotes.ts` |
| **"Why Choose Us" benefits** | `src/data/benefits.ts` |
| **Contact info (email, phone, WhatsApp, address)** | `src/app/contact/page.tsx` (top constants) and `src/components/layout/Footer.tsx` |
| **Social links** | `src/components/layout/Footer.tsx`, `src/components/layout/MobileMenu.tsx`, `src/app/contact/page.tsx` (currently `href="#"` placeholders) |
| **Site metadata / SEO / domain** | `src/app/layout.tsx` (`siteUrl`, `metadata`), `src/app/sitemap.ts`, `src/app/robots.ts` |
| **Colors & fonts (brand theme)** | `src/app/globals.css` → `@theme` block (charcoal / ivory / cream / gold) and `src/app/layout.tsx` (Cormorant Garamond + Jost via `next/font/google`) |
| **Policy page copy** | `src/app/privacy-policy`, `terms-and-conditions`, `shipping-policy`, `return-policy` |

## Notes

- Product photography placeholders: rather than hot-linking third-party stock photos (unreliable licensing, broken links), each product renders bespoke SVG bottle art (`PerfumeBottle.tsx`) tinted per-product. Swap these for real photos any time — see the table above.
- Cart/wishlist persist across refreshes via `localStorage`; they're per-browser, not synced to an account (there's no backend).
- The "Sign In / Create Account" panel in the header is presentational only (no auth backend wired up).
