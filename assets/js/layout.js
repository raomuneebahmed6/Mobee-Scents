/* Renders + wires up: loader, scroll-progress, top bar, pill header + dropdown nav,
   mobile nav, account dropdown, search overlay, cart drawer, footer, WhatsApp float, to-top.
   Runs on every page via the shared mount points + script includes. */

const NAV_LINKS = [
  { label: "Home", href: "index.html", page: "home" },
  { label: "Shop", href: "shop.html", page: "shop" },
];

const COLLECTION_LINKS = [
  { label: "Men", href: "shop.html?gender=Men" },
  { label: "Women", href: "shop.html?gender=Women" },
  { label: "Unisex", href: "shop.html?gender=Unisex" },
  { label: "Warm Spicy", href: "shop.html?category=Warm+Spicy" },
  { label: "Woody Spicy", href: "shop.html?category=Woody+Spicy" },
  { label: "Woody Aromatic", href: "shop.html?category=Woody+Aromatic" },
  { label: "Leather", href: "shop.html?category=Leather" },
  { label: "Floral", href: "shop.html?category=Floral" },
  { label: "View All Collections", href: "collections.html" },
];

const NAV_LINKS_2 = [
  { label: "About Us", href: "about.html", page: "about" },
  { label: "Contact", href: "contact.html", page: "contact" },
];

function currentPage() {
  return document.body.getAttribute("data-page") || "";
}

function renderChrome() {
  document.body.insertAdjacentHTML(
    "afterbegin",
    `<div class="loader" id="loader"><span class="loader-mark" id="loaderMark"></span></div>
     <div class="scroll-progress" id="scrollProgress" aria-hidden="true"></div>
     <a class="whatsapp-float" id="whatsappFloat" target="_blank" rel="noopener" aria-label="Chat on WhatsApp">${icon("message-circle")}</a>
     <button class="to-top" id="toTop" aria-label="Back to top">${icon("chevron-down", "")}</button>`
  );
  document.getElementById("loaderMark").innerHTML = `<img src="assets/img/logo.png" alt="Mobee Scents" />`;
  const toTopIcon = document.querySelector("#toTop svg");
  if (toTopIcon) toTopIcon.style.transform = "rotate(180deg)";
  document.getElementById("whatsappFloat").href = `https://wa.me/${SITE_CONFIG.whatsappNumber}`;
}

function renderHeader() {
  const mount = document.getElementById("site-header");
  if (!mount) return;
  const page = currentPage();

  const linkHTML = (l) => `<a class="${l.page === page ? "active" : ""}" href="${l.href}">${l.label}</a>`;
  const dropdownHTML = COLLECTION_LINKS.map((l) => `<a href="${l.href}">${l.label}</a>`).join("");

  mount.innerHTML = `
    <header class="site-header" id="siteHeader">
      <a class="brand" href="index.html" aria-label="Mobee Scents — home">
        <span id="headerLogoMark"><img src="assets/img/logo.png" alt="Mobee Scents" /></span>
        <span><strong>Mobee <em>Scents</em></strong><small>Signature Fragrance House</small></span>
      </a>
      <nav class="main-nav" id="mainNav" aria-label="Main navigation">
        ${NAV_LINKS.map(linkHTML).join("")}
        <div class="nav-item"><a href="collections.html">Collections ▾</a>
          <div class="dropdown">${dropdownHTML}</div>
        </div>
        ${NAV_LINKS_2.map(linkHTML).join("")}
        <a class="nav-cta" href="shop.html">${icon("bag")} Shop Now</a>
      </nav>
      <div class="nav-icons">
        <button class="icon-btn" id="searchBtn" aria-label="Search">${icon("search")}</button>
        <div class="account-menu-wrap">
          <button class="icon-btn" id="accountBtn" aria-label="Account">${icon("user")}</button>
          <div class="account-menu" id="accountMenu">
            <p class="font-serif">Welcome</p>
            <p>Sign in to track orders, save your wishlist across devices, and checkout faster.</p>
            <button class="btn primary">Sign In</button>
            <button class="btn soft">Create Account</button>
          </div>
        </div>
        <a class="icon-btn" href="wishlist.html" aria-label="Wishlist">
          ${icon("heart")}<span class="icon-badge" id="wishlistBadge" hidden>0</span>
        </a>
        <button class="icon-btn" id="cartBtn" aria-label="Open cart">
          ${icon("bag")}<span class="icon-badge" id="cartBadge" hidden>0</span>
        </button>
      </div>
      <button class="menu-toggle" id="menuToggle" aria-label="Open menu" aria-expanded="false"><span></span><span></span><span></span></button>
    </header>`;
}

function renderSearchOverlay() {
  const mount = document.getElementById("search-overlay-root");
  if (!mount) return;
  mount.innerHTML = `
    <div class="search-overlay" id="searchOverlay">
      <div class="search-overlay-bg" id="searchOverlayBg"></div>
      <div class="search-overlay-panel">
        <div class="search-inner">
          <div class="search-top-row">
            <p>Search the Collection</p>
            <button class="icon-btn" id="searchOverlayClose" aria-label="Close search">${icon("x")}</button>
          </div>
          <form class="search-field" id="searchOverlayForm">
            ${icon("search")}
            <input type="text" id="searchOverlayInput" placeholder="Search fragrances, notes, categories…" autocomplete="off" />
          </form>
          <div class="search-results" id="searchOverlayResults"></div>
        </div>
      </div>
    </div>`;
}

function renderCartDrawer() {
  const mount = document.getElementById("cart-drawer-root");
  if (!mount) return;
  mount.innerHTML = `
    <div class="cart-overlay" id="cartOverlay">
      <aside class="cart-drawer" aria-label="Shopping cart">
        <div class="cart-head">
          <h2 id="cartHeadTitle">Your Bag</h2>
          <button class="icon-btn" id="cartClose" aria-label="Close cart">${icon("x")}</button>
        </div>
        <div id="cartBody"></div>
      </aside>
    </div>`;
}

function updateCartDrawer() {
  const lines = Store.cartLines();
  const titleEl = document.getElementById("cartHeadTitle");
  const bodyEl = document.getElementById("cartBody");
  if (!bodyEl) return;
  if (titleEl) titleEl.textContent = `Your Bag (${lines.length})`;

  if (lines.length === 0) {
    bodyEl.innerHTML = `
      <div class="cart-empty">
        ${icon("bag")}
        <p>Your bag is empty.</p>
        <a class="btn primary" href="shop.html">Shop the Collection ${icon("arrow-right")}</a>
      </div>`;
    return;
  }

  const linesHTML = lines
    .map((line) => {
      const p = line.product;
      return `
      <div class="cart-line" data-id="${p.id}" data-size="${line.size}">
        <div class="cart-line-img">${bottleSVG(p.bottleVariant, p.accent, p.accentSoft, { glow: false })}</div>
        <div class="cart-line-body">
          <div class="cart-line-top">
            <div>
              <p class="cart-line-name">${p.name}</p>
              <p class="cart-line-size">${line.size}</p>
            </div>
            <button class="cart-line-remove" data-action="remove" aria-label="Remove item">${icon("trash")}</button>
          </div>
          <div class="cart-line-bottom">
            <div class="cart-line-qty">
              <button data-action="dec" aria-label="Decrease quantity">${icon("minus")}</button>
              <span>${line.quantity}</span>
              <button data-action="inc" aria-label="Increase quantity">${icon("plus")}</button>
            </div>
            <span class="cart-line-price">${formatPrice(line.unitPrice * line.quantity)}</span>
          </div>
        </div>
      </div>`;
    })
    .join("");

  bodyEl.innerHTML = `
    <div class="cart-lines no-scrollbar">${linesHTML}</div>
    <div class="cart-summary">
      <div class="cart-subtotal-row"><span>Subtotal</span><span class="value">${formatPrice(Store.cartSubtotal())}</span></div>
      <p class="cart-note">Shipping and taxes calculated at checkout. Payment is confirmed via WhatsApp.</p>
      <button class="btn primary full" id="cartCheckoutBtn">${icon("message-circle")} Checkout via WhatsApp</button>
    </div>`;

  bodyEl.querySelectorAll(".cart-line").forEach((row) => {
    const id = row.getAttribute("data-id");
    const size = row.getAttribute("data-size");
    row.querySelector('[data-action="remove"]').addEventListener("click", () => Store.removeFromCart(id, size));
    row.querySelector('[data-action="dec"]').addEventListener("click", () => {
      const item = Store.cart.find((i) => i.productId === id && i.size === size);
      Store.updateQuantity(id, size, (item ? item.quantity : 1) - 1);
    });
    row.querySelector('[data-action="inc"]').addEventListener("click", () => {
      const item = Store.cart.find((i) => i.productId === id && i.size === size);
      Store.updateQuantity(id, size, (item ? item.quantity : 0) + 1);
    });
  });

  const checkoutBtn = document.getElementById("cartCheckoutBtn");
  if (checkoutBtn) {
    checkoutBtn.addEventListener("click", () => {
      const orderLines = lines
        .map((line) => `• ${line.product.name} (${line.size}) x${line.quantity} — ${formatPrice(line.unitPrice * line.quantity)}`)
        .join("\n");
      const message =
        `Hi Mobee Scents! I'd like to order:\n\n${orderLines}\n\nSubtotal: ${formatPrice(Store.cartSubtotal())}\n\nPlease confirm availability and payment details.`;
      window.open(`https://wa.me/${SITE_CONFIG.whatsappNumber}?text=${encodeURIComponent(message)}`, "_blank", "noopener");
      document.querySelector(".cart-summary").innerHTML =
        '<p class="cart-success-msg">Order sent on WhatsApp — our team will confirm payment and delivery details there.</p>';
    });
  }
}

function renderFooter() {
  const mount = document.getElementById("site-footer");
  if (!mount) return;
  mount.innerHTML = `
    <div class="footer-wave" aria-hidden="true"><svg viewBox="0 0 1440 70" preserveAspectRatio="none"><path d="M0 42C180 74 380 6 640 18s430 52 560 34c110-15 190-24 240-14v32H0Z" fill="#2B1B3D"/></svg></div>
    <footer class="footer">
      <div class="footer-top">
        <div class="footer-brand">
          <div class="footer-brand-mark"><span id="footerLogoMark"><img src="assets/img/logo.png" alt="Mobee Scents" /></span><strong>Mobee <em>Scents</em></strong></div>
          <p>Mobee Scents is a fragrance house dedicated to compositions that are worn, remembered, and reached for again. Discover your signature scent.</p>
          <div class="social-links">
            <a href="${SITE_CONFIG.social.instagram}" aria-label="Instagram">${icon("instagram", "social-svg")}</a>
            <a href="${SITE_CONFIG.social.facebook}" aria-label="Facebook">${icon("facebook", "social-svg")}</a>
            <a href="${SITE_CONFIG.social.twitter}" aria-label="Twitter">${icon("twitter", "social-svg")}</a>
          </div>
        </div>
        <nav class="footer-col" aria-label="Shop"><h3>Shop</h3>
          <a href="shop.html">All Fragrances</a><a href="collections.html">Collections</a><a href="shop.html?sort=rating">Best Sellers</a><a href="shop.html">New Arrivals</a>
        </nav>
        <nav class="footer-col" aria-label="Support"><h3>Support</h3>
          <a href="contact.html">Contact Us</a><a href="about.html">About Mobee Scents</a><a href="wishlist.html">Wishlist</a><a href="contact.html">Track Order</a>
        </nav>
        <nav class="footer-col" aria-label="Policies"><h3>Policies</h3>
          <a href="privacy-policy.html">Privacy Policy</a><a href="terms-and-conditions.html">Terms &amp; Conditions</a><a href="shipping-policy.html">Shipping Policy</a><a href="return-policy.html">Return Policy</a>
        </nav>
        <div class="footer-col"><h3>Contact</h3>
          <a href="https://wa.me/${SITE_CONFIG.whatsappNumber}" target="_blank" rel="noopener">WhatsApp: ${SITE_CONFIG.phone}</a>
          <a href="mailto:${SITE_CONFIG.email}">${SITE_CONFIG.email}</a>
          <span style="font-size:.88rem;">${SITE_CONFIG.address}</span>
        </div>
      </div>
      <div class="footer-bottom"><p>© <span id="footerYear"></span> Mobee Scents. All rights reserved. · Discover Your Signature Scent</p></div>
    </footer>`;

  document.getElementById("footerYear").textContent = new Date().getFullYear();
}

function updateBadges() {
  const cartBadge = document.getElementById("cartBadge");
  const wishlistBadge = document.getElementById("wishlistBadge");
  const count = Store.cartCount();
  const wcount = Store.wishlist.length;
  if (cartBadge) {
    cartBadge.textContent = count;
    cartBadge.hidden = count === 0;
  }
  if (wishlistBadge) {
    wishlistBadge.textContent = wcount;
    wishlistBadge.hidden = wcount === 0;
  }
}

function openCartDrawer() {
  document.getElementById("cartOverlay").classList.add("is-open");
  document.body.style.overflow = "hidden";
}
function closeCartDrawer() {
  document.getElementById("cartOverlay").classList.remove("is-open");
  document.body.style.overflow = "";
}

/* ---------- loader ---------- */
function initLoader() {
  const loader = document.getElementById("loader");
  if (!loader) return;
  const done = () => loader.classList.add("done");
  window.addEventListener("load", done);
  setTimeout(done, 1800);
}

/* ---------- scroll: progress bar, header pill, parallax, timeline, to-top ---------- */
function initScrollEffects() {
  const progress = document.getElementById("scrollProgress");
  const header = document.getElementById("siteHeader");
  const toTop = document.getElementById("toTop");
  const pEls = document.querySelectorAll("[data-parallax]");
  const timeline = document.getElementById("timeline");
  const fill = document.getElementById("timelineFill");
  const steps = timeline ? [...timeline.querySelectorAll(".step")] : [];
  const reduceMotion = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const wantsLightHeader = document.body.dataset.headerTheme === "light";

  function onScroll() {
    const h = document.documentElement;
    const max = h.scrollHeight - h.clientHeight;
    if (progress) progress.style.width = (max > 0 ? (h.scrollTop / max) * 100 : 0) + "%";
    if (header) {
      const scrolled = h.scrollTop > 30;
      header.classList.toggle("scrolled", scrolled);
      if (wantsLightHeader) header.classList.toggle("is-light", !scrolled);
    }
    if (toTop) toTop.classList.toggle("show", h.scrollTop > 600);
    if (!reduceMotion) {
      pEls.forEach((el) => {
        el.style.transform = `translateY(${window.scrollY * parseFloat(el.dataset.parallax || 0)}px)`;
      });
    }
    if (timeline && fill) {
      const rect = timeline.getBoundingClientRect();
      const progressed = Math.min(Math.max(window.innerHeight * 0.65 - rect.top, 0), rect.height);
      fill.style.height = progressed + "px";
      steps.forEach((st) => {
        const top = st.getBoundingClientRect().top - rect.top;
        st.classList.toggle("active", progressed >= top + 10);
      });
    }
  }
  document.addEventListener("scroll", onScroll, { passive: true });
  if (toTop) toTop.addEventListener("click", () => window.scrollTo({ top: 0, behavior: reduceMotion ? "auto" : "smooth" }));
  onScroll();
}

function initInteractions() {
  // Mobile nav toggle
  const menuToggle = document.getElementById("menuToggle");
  const mainNav = document.getElementById("mainNav");
  if (menuToggle && mainNav) {
    menuToggle.addEventListener("click", () => {
      const open = mainNav.classList.toggle("open");
      menuToggle.classList.toggle("open", open);
      menuToggle.setAttribute("aria-expanded", String(open));
      document.body.style.overflow = open ? "hidden" : "";
    });
    mainNav.querySelectorAll(".nav-item > a").forEach((a) => {
      a.addEventListener("click", (e) => {
        if (window.innerWidth <= 1024) {
          e.preventDefault();
          a.closest(".nav-item").classList.toggle("open");
        }
      });
    });
    mainNav.querySelectorAll(":scope > a, .dropdown a, .nav-cta").forEach((a) => {
      a.addEventListener("click", () => {
        mainNav.classList.remove("open");
        menuToggle.classList.remove("open");
        document.body.style.overflow = "";
      });
    });
  }

  // Account dropdown
  const accountBtn = document.getElementById("accountBtn");
  const accountMenu = document.getElementById("accountMenu");
  if (accountBtn && accountMenu) {
    accountBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      accountMenu.classList.toggle("is-open");
    });
    document.addEventListener("click", (e) => {
      if (!accountMenu.contains(e.target) && e.target !== accountBtn) accountMenu.classList.remove("is-open");
    });
  }

  // Search overlay
  const searchBtn = document.getElementById("searchBtn");
  const searchOverlay = document.getElementById("searchOverlay");
  if (searchBtn && searchOverlay) {
    const input = document.getElementById("searchOverlayInput");
    const resultsEl = document.getElementById("searchOverlayResults");
    const openSearch = () => {
      searchOverlay.classList.add("is-open");
      setTimeout(() => input.focus(), 300);
    };
    const closeSearch = () => {
      searchOverlay.classList.remove("is-open");
      input.value = "";
      resultsEl.innerHTML = "";
    };
    searchBtn.addEventListener("click", openSearch);
    document.getElementById("searchOverlayClose").addEventListener("click", closeSearch);
    document.getElementById("searchOverlayBg").addEventListener("click", closeSearch);
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") closeSearch();
    });
    input.addEventListener("input", () => {
      const q = input.value.trim().toLowerCase();
      if (!q) {
        resultsEl.innerHTML = "";
        return;
      }
      const matches = PRODUCTS.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          p.noteFamilies.some((n) => n.toLowerCase().includes(q))
      );
      resultsEl.innerHTML =
        matches.length === 0
          ? `<p class="search-empty">No fragrances found for "${input.value}".</p>`
          : matches
              .map(
                (p) => `
        <a class="search-result-item" href="shop.html?q=${encodeURIComponent(p.name)}">
          <span class="thumb">${bottleSVG(p.bottleVariant, p.accent, p.accentSoft, { glow: false })}</span>
          <span><span class="name" style="display:block;">${p.name}</span><span class="cat">${p.category}</span></span>
          <span class="price">${formatPrice(p.price)}</span>
        </a>`
              )
              .join("");
    });
    document.getElementById("searchOverlayForm").addEventListener("submit", (e) => {
      e.preventDefault();
      if (input.value.trim()) window.location.href = `shop.html?q=${encodeURIComponent(input.value.trim())}`;
    });
  }

  // Cart drawer
  const cartBtn = document.getElementById("cartBtn");
  const cartOverlay = document.getElementById("cartOverlay");
  if (cartBtn && cartOverlay) {
    cartBtn.addEventListener("click", openCartDrawer);
    document.getElementById("cartClose").addEventListener("click", closeCartDrawer);
    cartOverlay.addEventListener("click", (e) => {
      if (e.target === cartOverlay) closeCartDrawer();
    });
  }
}

function initLayout() {
  renderChrome();
  renderHeader();
  renderSearchOverlay();
  renderCartDrawer();
  renderFooter();
  initInteractions();
  initLoader();
  initScrollEffects();
  updateCartDrawer();
  updateBadges();
  Store.onChange(() => {
    updateCartDrawer();
    updateBadges();
  });
}

document.addEventListener("DOMContentLoaded", initLayout);
