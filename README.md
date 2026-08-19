# Mobee Scents

Premium, fully responsive fragrance e-commerce website for **Mobee Scents** — built with plain **HTML, CSS, and JavaScript**. No framework, no build step, no npm install required.

The layout (top announcement + service bars, sticky header with dropdown nav, split hero, category pills, product grid with quick-add, dark feature spotlight, editorial collection cards, trust strip, quote band, newsletter, and a slide-in cart drawer) is a restrained, ecommerce-first storefront design. The colour palette — deep navy ink, rose wine, and muted gold on warm ivory — is taken directly from the Mobee Scents logo artwork.

## Tech Stack

- Static multi-page HTML site (one `.html` file per route, markup duplicated per page — no build step needed)
- Vanilla CSS (`styles.css`) — theme colours live as custom properties in the `:root` block at the top
- Vanilla JavaScript (`script.js`, no libraries/dependencies) — cart drawer, mobile nav, quick-add, shop filters, accordions, scroll reveal, and form toasts
- Google Fonts (DM Serif Display + Manrope) loaded via `<link>` tag
- Cart persisted client-side via `localStorage`
- Product photography: real Mobee Scents bottle shots for every product in `assets/img/` (Dior Sauvage, Creed Aventus, Dunhill Desire, Janan Gold, Janan Sports, Tuscan Leather, Red Tobacco, Silk Musk) — no stock/placeholder imagery

No backend/database — this is a front-end storefront. "Checkout" and "Track Order" show a confirmation message rather than talking to a real payment/logistics provider.

## Running locally

Because the site uses dependency-free JavaScript, you can just open `index.html` directly in a browser. For the smoothest local experience, serve it with any static file server, e.g.:

```bash
npx serve .
# or
python3 -m http.server 8000
```

Then open the printed local URL.

## Deploying to Vercel

1. Push this repository to GitHub (already done if you're reading this from the repo).
2. Go to [vercel.com/new](https://vercel.com/new) and import the repository.
3. Framework preset: **Other** (static site) — no build command, no output directory override needed since every file is already static HTML/CSS/JS at the repo root.
4. Click **Deploy**. Every push to `main` will auto-deploy.

This also works unmodified on GitHub Pages, Netlify, or any static host.

## Project Structure

```
index.html                   Home page
shop.html                    Shop with search/filter/sort
product.html                 Sample product detail page
collections.html             Editorial collections page
about.html, contact.html     Brand story & contact form
track.html                   Order tracking form (demo)
privacy-policy.html, terms-and-conditions.html,
shipping-policy.html, return-policy.html

styles.css                   All styling — theme tokens live in :root at the top
script.js                    Cart, mobile nav, quick-add, shop filters, accordions, reveal animation, form toasts

assets/img/
  logo.png                   Brand logo (used in header/footer/mobile nav)
  favicon.png, favicon-32.png
  dior-sauvage*.png, creed-aventus.png, dunhill-desire.png,
  janan-gold.png, janan-sports.png, tuscan-leather.png,
  red-tobacco.png, silk-musk.png    Real product photography
```

## Where to Customize

| What | File |
|---|---|
| **Colours & fonts (brand theme)** | `styles.css` → `:root` block at the top |
| **Products, prices, notes, images** | Product card markup repeated inside `index.html`, `shop.html`, `product.html` (each `<article class="product-card">`) |
| **Contact info (WhatsApp, email, hours, address)** | `contact.html` → `.contact-list`, and the footer `.brand` block on every page |
| **Site metadata / SEO / domain** | `<title>`/`<meta>` tags at the top of each `.html` file, plus `sitemap.xml` and `robots.txt` |
| **Policy page copy** | `privacy-policy.html`, `terms-and-conditions.html`, `shipping-policy.html`, `return-policy.html` |

## Notes

- Cart persists across refreshes via `localStorage` (key `mobeeScentsCart`); it's per-browser, not synced to an account (there's no backend).
- Because each page is a standalone HTML file, header/footer/nav markup is repeated per page rather than injected by JavaScript — update shared bits (logo, nav links, footer) across all pages when changing them.
