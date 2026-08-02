/* Renders + wires up: header, mobile menu, account dropdown, search overlay,
   cart drawer, footer. Runs on every page via a `<div id="site-header"></div>`
   / `<div id="site-footer"></div>` pair plus the shared script includes. */

const NAV_LINKS = [
  { label: "Home", href: "index.html", page: "home" },
  { label: "Shop", href: "shop.html", page: "shop" },
  { label: "Collections", href: "collections.html", page: "collections" },
  { label: "About Us", href: "about.html", page: "about" },
  { label: "Contact", href: "contact.html", page: "contact" },
];

function currentPage() {
  return document.body.getAttribute("data-page") || "";
}

function renderHeader() {
  const mount = document.getElementById("site-header");
  if (!mount) return;
  const page = currentPage();

  const navHTML = NAV_LINKS.map(
    (l) => `<a class="nav-link${l.page === page ? " active" : ""}" href="${l.href}">${l.label}</a>`
  ).join("");

  mount.innerHTML = `
    <header class="site-header" id="siteHeader">
      <div class="container header-inner">
        <a class="logo" href="index.html" aria-label="Mobee Scents — home">
          <span id="headerLogoMark"></span>
          <span class="logo-text">Mobee <span class="accent">Scents</span></span>
        </a>
        <nav class="main-nav">${navHTML}</nav>
        <div class="header-icons">
          <button class="icon-btn hide-mobile" id="searchBtn" aria-label="Search">${icon("search")}</button>
          <div class="account-menu-wrap">
            <button class="icon-btn" id="accountBtn" aria-label="Account">${icon("user")}</button>
            <div class="account-menu" id="accountMenu">
              <p class="font-serif">Welcome</p>
              <p>Sign in to track orders, save your wishlist across devices, and checkout faster.</p>
              <button class="btn btn-primary">Sign In</button>
              <button class="btn btn-secondary">Create Account</button>
            </div>
          </div>
          <a class="icon-btn hide-mobile" href="wishlist.html" aria-label="Wishlist" style="position:relative;">
            ${icon("heart")}
            <span class="icon-badge" id="wishlistBadge" hidden>0</span>
          </a>
          <button class="icon-btn" id="cartBtn" aria-label="Open cart" style="position:relative;">
            ${icon("bag")}
            <span class="icon-badge" id="cartBadge" hidden>0</span>
          </button>
          <button class="icon-btn hide-desktop" id="menuBtn" aria-label="Open menu">${icon("menu")}</button>
        </div>
      </div>
    </header>`;

  if (page !== "home") {
    document.getElementById("siteHeader").classList.add("is-solid");
  }
  setHeaderLight(page === "home");
}

function setHeaderLight(isLight) {
  const header = document.getElementById("siteHeader");
  const mark = document.getElementById("headerLogoMark");
  if (!header || !mark) return;
  header.classList.toggle("is-light", isLight);
  mark.innerHTML = logoMarkSVG(isLight);
}

function renderMobileMenu() {
  const mount = document.getElementById("mobile-menu-root");
  if (!mount) return;
  const page = currentPage();
  const linksHTML = NAV_LINKS.map(
    (l) => `<a class="mobile-nav-link${l.page === page ? " active" : ""}" href="${l.href}">${l.label}</a>`
  ).join("");

  mount.innerHTML = `
    <div class="mobile-menu-overlay" id="mobileMenuOverlay">
      <div class="mobile-menu-panel">
        <div class="mobile-menu-head">
          <span class="logo-text" style="display:flex;align-items:center;gap:.6rem;">
            <span id="mobileLogoMark"></span>
            Mobee <span class="accent">Scents</span>
          </span>
          <button class="icon-btn" id="mobileMenuClose" aria-label="Close menu">${icon("x")}</button>
        </div>
        <nav class="mobile-nav">${linksHTML}</nav>
        <div class="mobile-menu-links">
          <a href="shop.html">${icon("search", "")} Search</a>
          <a href="wishlist.html">${icon("heart")} Wishlist</a>
          <span>${icon("user")} Account</span>
        </div>
        <div class="mobile-menu-foot">
          <p>Follow Us</p>
          <div class="social-row">
            <a href="${SITE_CONFIG.social.instagram}" aria-label="Instagram">${icon("instagram")}</a>
            <a href="${SITE_CONFIG.social.facebook}" aria-label="Facebook">${icon("facebook")}</a>
          </div>
        </div>
      </div>
    </div>`;
  document.getElementById("mobileLogoMark").innerHTML = logoMarkSVG(true);
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
            <button id="searchOverlayClose" aria-label="Close search">${icon("x")}</button>
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
        <a class="btn btn-primary" href="shop.html">Shop the Collection ${icon("arrow-right")}</a>
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
      <p class="cart-note">Shipping and taxes calculated at checkout.</p>
      <button class="btn btn-primary btn-full btn-lg" id="cartCheckoutBtn">Checkout</button>
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
      document.querySelector(".cart-summary").innerHTML =
        '<p class="cart-success-msg">Thank you — your order request has been noted. Our team will reach out to confirm delivery details.</p>';
    });
  }
}

function renderFooter() {
  const mount = document.getElementById("site-footer");
  if (!mount) return;
  mount.innerHTML = `
    <footer class="site-footer">
      <div class="container footer-grid">
        <div class="footer-brand">
          <a class="logo" href="index.html"><span id="footerLogoMark"></span><span class="logo-text">Mobee <span class="accent">Scents</span></span></a>
          <p>Mobee Scents is a fragrance house dedicated to compositions that are worn, remembered, and reached for again. Discover your signature scent.</p>
          <div class="footer-social">
            <a href="${SITE_CONFIG.social.instagram}" aria-label="Instagram">${icon("instagram")}</a>
            <a href="${SITE_CONFIG.social.facebook}" aria-label="Facebook">${icon("facebook")}</a>
            <a href="${SITE_CONFIG.social.twitter}" aria-label="Twitter">${icon("twitter")}</a>
          </div>
        </div>
        <div class="footer-col">
          <p class="col-title">Shop</p>
          <ul>
            <li><a href="shop.html">All Fragrances</a></li>
            <li><a href="collections.html">Collections</a></li>
            <li><a href="shop.html?sort=rating">Best Sellers</a></li>
            <li><a href="shop.html">New Arrivals</a></li>
          </ul>
        </div>
        <div class="footer-col">
          <p class="col-title">Support</p>
          <ul>
            <li><a href="contact.html">Contact Us</a></li>
            <li><a href="about.html">About Mobee Scents</a></li>
            <li><a href="wishlist.html">Wishlist</a></li>
            <li><a href="contact.html">Track Order</a></li>
          </ul>
        </div>
        <div class="footer-col">
          <p class="col-title">Policies</p>
          <ul>
            <li><a href="privacy-policy.html">Privacy Policy</a></li>
            <li><a href="terms-and-conditions.html">Terms &amp; Conditions</a></li>
            <li><a href="shipping-policy.html">Shipping Policy</a></li>
            <li><a href="return-policy.html">Return Policy</a></li>
          </ul>
        </div>
      </div>

      <div class="container footer-meta">
        <div class="footer-meta-row">
          <div class="footer-contacts">
            <span>${icon("map-pin")} ${SITE_CONFIG.address}</span>
            <span>${icon("mail")} ${SITE_CONFIG.email}</span>
            <span>${icon("phone")} ${SITE_CONFIG.phone}</span>
          </div>
          <form class="footer-newsletter-form" id="footerNewsletterForm">
            <input type="email" required placeholder="Your email address" id="footerNewsletterInput" />
            <button type="submit">Subscribe ${icon("arrow-right")}</button>
          </form>
        </div>
      </div>

      <div class="footer-bottom">
        <div class="container footer-bottom-row">
          <p>© <span id="footerYear"></span> Mobee Scents. All rights reserved.</p>
          <p>Discover Your Signature Scent</p>
        </div>
      </div>
    </footer>`;

  document.getElementById("footerLogoMark").innerHTML = logoMarkSVG(true);
  document.getElementById("footerYear").textContent = new Date().getFullYear();

  const form = document.getElementById("footerNewsletterForm");
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const input = document.getElementById("footerNewsletterInput");
    if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.value)) {
      form.innerHTML = '<p style="color:var(--color-gold);font-size:.9rem;">Thank you for subscribing.</p>';
    }
  });
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

function initHeaderScroll() {
  const header = document.getElementById("siteHeader");
  if (!header || currentPage() !== "home") return;
  const onScroll = () => {
    const solid = window.scrollY > 40;
    header.classList.toggle("is-solid", solid);
    setHeaderLight(!solid);
  };
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });
}

function openCartDrawer() {
  document.getElementById("cartOverlay").classList.add("is-open");
  document.body.style.overflow = "hidden";
}
function closeCartDrawer() {
  document.getElementById("cartOverlay").classList.remove("is-open");
  document.body.style.overflow = "";
}

function initInteractions() {
  // Mobile menu
  const menuBtn = document.getElementById("menuBtn");
  const mobileOverlay = document.getElementById("mobileMenuOverlay");
  if (menuBtn && mobileOverlay) {
    menuBtn.addEventListener("click", () => {
      mobileOverlay.classList.add("is-open");
      document.body.style.overflow = "hidden";
    });
    const close = () => {
      mobileOverlay.classList.remove("is-open");
      document.body.style.overflow = "";
    };
    document.getElementById("mobileMenuClose").addEventListener("click", close);
    mobileOverlay.addEventListener("click", (e) => {
      if (e.target === mobileOverlay) close();
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
      if (!accountMenu.contains(e.target) && e.target !== accountBtn) {
        accountMenu.classList.remove("is-open");
      }
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
      if (matches.length === 0) {
        resultsEl.innerHTML = `<p class="search-empty">No fragrances found for "${input.value}".</p>`;
        return;
      }
      resultsEl.innerHTML = matches
        .map(
          (p) => `
        <a class="search-result-item" href="shop.html?q=${encodeURIComponent(p.name)}">
          <span class="thumb">${bottleSVG(p.bottleVariant, p.accent, p.accentSoft, { glow: false })}</span>
          <span>
            <span class="name" style="display:block;">${p.name}</span>
            <span class="cat">${p.category}</span>
          </span>
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
  renderHeader();
  renderMobileMenu();
  renderSearchOverlay();
  renderCartDrawer();
  renderFooter();
  initInteractions();
  initHeaderScroll();
  updateCartDrawer();
  updateBadges();
  Store.onChange(() => {
    updateCartDrawer();
    updateBadges();
  });
}

document.addEventListener("DOMContentLoaded", initLayout);
