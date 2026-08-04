/* Quick View modal: shared across every page that renders product cards. */

let __qvProduct = null;
let __qvSizeIndex = 1;
let __qvQty = 1;

function renderQuickViewShell() {
  const mount = document.getElementById("quickview-root");
  if (!mount) return;
  mount.innerHTML = `
    <div class="modal" id="qvOverlay">
      <div class="modal-card" role="dialog" aria-modal="true" id="qvModal">
        <button class="modal-close" id="qvClose" aria-label="Close quick view">${icon("x")}</button>
        <div class="modal-visual"><span class="bottle-wrap" id="qvBottle"></span></div>
        <div class="modal-body" id="qvBody"></div>
      </div>
    </div>`;

  document.getElementById("qvOverlay").addEventListener("click", (e) => {
    if (e.target.id === "qvOverlay") closeQuickView();
  });
  document.getElementById("qvClose").addEventListener("click", closeQuickView);
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeQuickView();
  });
}

function openQuickView(id) {
  __qvProduct = getProductById(id);
  if (!__qvProduct) return;
  __qvSizeIndex = Math.min(1, __qvProduct.sizes.length - 1);
  __qvQty = 1;
  renderQuickViewBody();
  document.getElementById("qvBottle").innerHTML = bottleSVG(__qvProduct.bottleVariant, __qvProduct.accent, __qvProduct.accentSoft);
  document.getElementById("qvOverlay").classList.add("open");
  document.body.style.overflow = "hidden";
}

function closeQuickView() {
  const overlay = document.getElementById("qvOverlay");
  if (overlay) overlay.classList.remove("open");
  document.body.style.overflow = "";
}

function renderQuickViewBody() {
  const p = __qvProduct;
  const size = p.sizes[__qvSizeIndex];
  const wishlisted = Store.isWishlisted(p.id);
  const body = document.getElementById("qvBody");

  body.innerHTML = `
    <p class="product-category">${p.category}</p>
    <h2>${p.name}</h2>
    <div class="modal-rating">${starsMarkup(p.rating)}<span>${p.rating} (${p.reviewCount} reviews)</span></div>
    <p class="modal-desc">${p.description}</p>
    <div class="notes-cols">
      <div><p class="col-label">Top</p><ul>${p.notes.top.map((n) => `<li>${n}</li>`).join("")}</ul></div>
      <div><p class="col-label">Heart</p><ul>${p.notes.heart.map((n) => `<li>${n}</li>`).join("")}</ul></div>
      <div><p class="col-label">Base</p><ul>${p.notes.base.map((n) => `<li>${n}</li>`).join("")}</ul></div>
    </div>
    <div style="margin-top:1.25rem;">
      <p class="modal-section-label">Size</p>
      <div class="size-selector" id="qvSizeSelector">
        ${p.sizes.map((s, i) => `<button class="size-btn${i === __qvSizeIndex ? " active" : ""}" data-i="${i}">${s.label}</button>`).join("")}
      </div>
    </div>
    <div class="modal-qty-row">
      <div>
        <p class="modal-section-label">Quantity</p>
        <div class="qty-selector">
          <button id="qvQtyDec" aria-label="Decrease quantity">${icon("minus")}</button>
          <span id="qvQtyVal">${__qvQty}</span>
          <button id="qvQtyInc" aria-label="Increase quantity">${icon("plus")}</button>
        </div>
      </div>
      <div class="modal-price-block">
        <p class="label">Price</p>
        <p class="value" id="qvPriceVal">${formatPrice(size.price * __qvQty)}</p>
      </div>
    </div>
    <div class="modal-actions">
      <button class="btn primary" id="qvAddBtn">Add to Cart</button>
      <button class="modal-wishlist-btn${wishlisted ? " is-active" : ""}" id="qvWishlistBtn" aria-label="Toggle wishlist">${icon("heart")}</button>
    </div>`;

  body.querySelectorAll(".size-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      __qvSizeIndex = Number(btn.getAttribute("data-i"));
      renderQuickViewBody();
    });
  });
  document.getElementById("qvQtyDec").addEventListener("click", () => {
    __qvQty = Math.max(1, __qvQty - 1);
    renderQuickViewBody();
  });
  document.getElementById("qvQtyInc").addEventListener("click", () => {
    __qvQty += 1;
    renderQuickViewBody();
  });
  document.getElementById("qvWishlistBtn").addEventListener("click", () => {
    Store.toggleWishlist(p.id);
    renderQuickViewBody();
  });
  document.getElementById("qvAddBtn").addEventListener("click", () => {
    Store.addToCart(p.id, size.label, __qvQty);
    const btn = document.getElementById("qvAddBtn");
    btn.innerHTML = `${icon("check")} Added`;
    btn.disabled = true;
    setTimeout(() => {
      closeQuickView();
      openCartDrawer();
    }, 900);
  });
}

document.addEventListener("DOMContentLoaded", renderQuickViewShell);
