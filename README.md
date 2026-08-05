# Mobee Scents

Premium, fully responsive fragrance e-commerce website for **Mobee Scents** — built with plain **HTML, CSS, and JavaScript**. No framework, no build step, no npm install required.

The component/motion system (top announcement bar, floating pill header with dropdown nav, hero with parallax blobs + stat banner card, marquee ticker, service cards, dark scrollytelling "journey" section, wave footer, WhatsApp float, etc.) is modeled on lmshandling.com. The palette (deep plum + gold on warm ivory) and the "MS" monogram are taken from the brand's own promotional artwork.

## Tech Stack

- Static multi-page HTML site (one `.html` file per route)
- Vanilla CSS (`assets/css/style.css`) — custom properties for the ivory/charcoal/gold theme
- Vanilla JavaScript (no libraries, no dependencies) — header/top-bar/footer/menus/modals are rendered into placeholder `<div>`s by `assets/js/layout.js` so markup isn't duplicated across pages
- Google Fonts (Cormorant Garamond + Jost) loaded via `<link>` tag
- Cart & wishlist persisted client-side via `localStorage`
- Product imagery is hand-coded SVG bottle art (`assets/js/icons.js` → `bottleSVG()`) so the site works with zero external image assets

No backend/database — this is a front-end storefront. "Checkout" shows a confirmation message rather than charging a real payment provider.

## Running locally

Because the site uses `fetch`-free, dependency-free JavaScript, you can just open `index.html` directly in a browser. For the smoothest local experience (and to match how it'll behave once deployed), serve it with any static file server, e.g.:

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
shop.html                    Shop with search/filter/sort (assets/js/shop.js)
collections.html             Editorial collections page
about.html, contact.html     Brand story & contact form
wishlist.html                Saved items page
privacy-policy.html, terms-and-conditions.html,
shipping-policy.html, return-policy.html

assets/
  css/style.css              All styling — theme tokens live in :root at the top
  js/
    data.js                  Product/testimonial/note/benefit data + SITE_CONFIG (contact info)
    icons.js                 Inline SVG icon set, logo mark, and bottleSVG() product art generator
    storage.js                Cart + wishlist state (localStorage), pub/sub via Store.onChange()
    reveal.js                 Generic scroll-reveal (IntersectionObserver adds .in)
    layout.js                 Renders loader, scroll progress, top bar, header + dropdown nav,
                               mobile nav, account dropdown, search overlay, cart drawer, footer,
                               WhatsApp float / back-to-top, and all their scroll/click interactions
    product-card.js           renderProductGrid() — used by home/shop/wishlist
    quickview.js              Quick View modal (shared)
    home.js, shop.js, collections.js, contact.js, wishlist.js   Page-specific logic
  img/favicon.svg
```

## Where to Customize

| What | File |
|---|---|
| **Product images** | Products render generated SVG bottle art. To use real photography, add images to `assets/img/products/` and replace the `bottleSVG(...)` calls in `product-card.js`, `quickview.js`, `layout.js` (cart drawer), and `layout.js`/search overlay with `<img>` tags. |
| **Products, prices, sizes, fragrance notes** | `assets/js/data.js` → `PRODUCTS` |
| **Currency / price formatting** | `assets/js/data.js` → `formatPrice()` (defaults to PKR) |
| **Testimonials** | `assets/js/data.js` → `TESTIMONIALS` |
| **Fragrance note categories** | `assets/js/data.js` → `FRAGRANCE_NOTES` |
| **"Why Choose Us" benefits** | `assets/js/data.js` → `BENEFITS` |
| **Contact info (email, phone, WhatsApp, address, hours)** | `assets/js/data.js` → `SITE_CONFIG` |
| **Social links** | `assets/js/data.js` → `SITE_CONFIG.social` |
| **Site metadata / SEO / domain** | `<title>`/`<meta>` tags at the top of each `.html` file, plus `sitemap.xml` and `robots.txt` |
| **Colors & fonts (brand theme)** | `assets/css/style.css` → `:root` block at the top, and the Google Fonts `<link>` in each page's `<head>` |
| **Policy page copy** | `privacy-policy.html`, `terms-and-conditions.html`, `shipping-policy.html`, `return-policy.html` |

## Notes

- Product photography placeholders: rather than hot-linking third-party stock photos (unreliable licensing, broken links), each product renders bespoke SVG bottle art tinted per-product. Swap these for real photos any time — see the table above.
- Cart/wishlist persist across refreshes via `localStorage`; they're per-browser, not synced to an account (there's no backend).
- The "Sign In / Create Account" panel in the header is presentational only (no auth backend wired up).
