/* Home page: hero bottle art, marquee, services, about, testimonials rail, newsletter. */

function initFeaturedProducts() {
  const mount = document.getElementById("featuredGrid");
  if (mount) renderProductGrid(mount, PRODUCTS);
}

function initFragranceNotes() {
  const mount = document.getElementById("notesGrid");
  if (!mount) return;
  mount.innerHTML = FRAGRANCE_NOTES.map(
    (n, i) => `
    <a class="note-card reveal" data-delay="${(i % 4) + 1}" href="shop.html?note=${encodeURIComponent(n.name)}">
      <span class="note-icon">${n.name[0]}${icon(n.icon)}</span>
      <span class="note-name">${n.name}</span>
      <span class="note-desc">${n.description}</span>
    </a>`
  ).join("");
  initReveal(mount);
}

const HOME_BENEFITS = [
  { title: "Premium Quality", description: "Sourced from renowned houses and formulated with high-concentration oils.", icon: "gem" },
  { title: "Long-Lasting Fragrances", description: "Eight-hour-plus wear built on rich, well-balanced compositions.", icon: "clock" },
  { title: "Secure Shopping", description: "Encrypted checkout and verified payment partners, every order.", icon: "shield-check" },
  { title: "Fast Delivery", description: "Dispatched within 24 hours, tracked from our door to yours.", icon: "truck" },
];

function initServices() {
  const mount = document.getElementById("servicesGrid");
  if (!mount) return;
  mount.innerHTML = HOME_BENEFITS.map(
    (b, i) => `
    <article class="service-card reveal" data-delay="${i}">
      <div class="icon">${icon(b.icon)}</div>
      <h3>${b.title}</h3>
      <p>${b.description}</p>
    </article>`
  ).join("");
  initReveal(mount);
}

const FEATURE_STRIP_ITEMS = [
  { label: "Premium Ingredients", icon: "gem" },
  { label: "Long-Lasting Wear", icon: "clock" },
  { label: "Secure Checkout", icon: "shield-check" },
  { label: "Fast Delivery", icon: "truck" },
];

function initFeatureStrip() {
  const mount = document.getElementById("featureStrip");
  if (!mount) return;
  mount.innerHTML = FEATURE_STRIP_ITEMS.map(
    (f) => `<div class="feature-strip-item">${icon(f.icon)}<span>${f.label}</span></div>`
  ).join("");
}

const SHOP_CATEGORIES = [
  { label: "Men", desc: "Bold & confident", href: "shop.html?gender=Men", icon: "flame" },
  { label: "Women", desc: "Soft & elegant", href: "shop.html?gender=Women", icon: "flower" },
  { label: "Unisex", desc: "For everyone", href: "shop.html?gender=Unisex", icon: "sparkles" },
  { label: "Best Sellers", desc: "Customer favorites", href: "shop.html?sort=rating", icon: "star" },
];

function initCategoryGrid() {
  const mount = document.getElementById("categoryGrid");
  if (!mount) return;
  mount.innerHTML = SHOP_CATEGORIES.map(
    (c, i) => `
    <a class="category-card reveal" data-delay="${i}" href="${c.href}">
      <span class="category-icon">${icon(c.icon)}</span>
      <strong>${c.label}</strong>
      <span>${c.desc}</span>
    </a>`
  ).join("");
  initReveal(mount);
}

function initCtaWhatsapp() {
  const link = document.getElementById("ctaWhatsappLink");
  if (!link) return;
  const message = "Hi! I'd like to ask about a custom gift set or bulk order.";
  link.href = `https://wa.me/${SITE_CONFIG.whatsappNumber}?text=${encodeURIComponent(message)}`;
}

function initMarquee() {
  const track = document.getElementById("marqueeTrack");
  if (!track) return;
  const notes = FRAGRANCE_NOTES.map((n) => n.name.toUpperCase());
  const items = notes
    .map((n) => `<a href="shop.html?note=${encodeURIComponent(n[0] + n.slice(1).toLowerCase())}"><b>✧</b> ${n}</a>`)
    .join("");
  track.innerHTML = items + items; // duplicate for seamless loop
}

function initCounters() {
  const statsEl = document.getElementById("stats");
  if (!statsEl) return;
  const reduceMotion = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  function run() {
    statsEl.querySelectorAll("[data-count]").forEach((n) => {
      const target = +n.dataset.count || 0;
      const suffix = n.dataset.suffix || "";
      const dur = 1400;
      const t0 = performance.now();
      (function tick(t) {
        const p = Math.min((t - t0) / dur, 1);
        n.textContent = Math.floor(target * (1 - Math.pow(1 - p, 3))) + (p === 1 ? suffix : "");
        if (p < 1) requestAnimationFrame(tick);
      })(t0);
    });
  }
  if (!("IntersectionObserver" in window) || reduceMotion) return run();
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          io.unobserve(e.target);
          run();
        }
      });
    },
    { threshold: 0.5 }
  );
  io.observe(statsEl);
}

function initTestimonialRail() {
  const rail = document.getElementById("testimonialRail");
  if (!rail) return;
  const cardHTML = (t) => `
    <div class="quote-card">
      ${starsMarkup(t.rating)}
      <p class="quote">&ldquo;${t.review}&rdquo;</p>
      <div class="who">
        <span class="avatar">${t.initials}</span>
        <div><p class="name">${t.name}</p><p class="loc">${t.location}</p></div>
      </div>
    </div>`;
  const cards = TESTIMONIALS.map(cardHTML).join("");
  rail.innerHTML = cards + cards; // duplicate for seamless loop
}

function initNewsletter() {
  const form = document.getElementById("newsletterForm");
  if (!form) return;
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const input = document.getElementById("newsletterInput");
    const errorEl = document.getElementById("newsletterError");
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.value)) {
      errorEl.hidden = false;
      return;
    }
    errorEl.hidden = true;
    document.getElementById("newsletterWrap").innerHTML = `
      <div class="newsletter-success">${icon("check")} You&rsquo;re on the list — welcome to Mobee Scents.</div>`;
  });
}

document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("heroBottle") && (document.getElementById("heroBottle").innerHTML = bottleSVG("facet", "#a3812c", "#e0c069"));
  initFeaturedProducts();
  initFragranceNotes();
  initServices();
  initFeatureStrip();
  initCategoryGrid();
  initCtaWhatsapp();
  initMarquee();
  initCounters();
  initTestimonialRail();
  initNewsletter();
});
