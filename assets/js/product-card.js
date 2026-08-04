/* Renders a grid of product cards into a container element. */

function productCardHTML(p, index) {
  const wishlisted = Store.isWishlisted(p.id);
  const delay = (index % 4) + 1;
  return `
  <article class="product-card reveal" data-delay="${delay}" data-id="${p.id}">
    ${p.badge ? `<span class="product-badge">${p.badge}</span>` : ""}
    <button class="wishlist-toggle${wishlisted ? " is-active" : ""}" data-action="wishlist" aria-label="Toggle wishlist">${icon("heart")}</button>
    <button class="product-image" data-action="quickview" aria-label="Quick view ${p.name}">
      <span class="bottle-wrap">${bottleSVG(p.bottleVariant, p.accent, p.accentSoft)}</span>
      <span class="quickview-strip">${icon("eye")} Quick View</span>
    </button>
    <div class="product-info">
      <p class="product-category">${p.category}</p>
      <h3 class="product-name">${p.name}</h3>
      <p class="product-desc">${p.description}</p>
      <div class="product-rating">${starsMarkup(p.rating)}<span>(${p.reviewCount})</span></div>
      <div class="product-footer">
        <div class="price-row">
          <span class="price">${formatPrice(p.price)}</span>
          ${p.compareAtPrice ? `<span class="price-compare">${formatPrice(p.compareAtPrice)}</span>` : ""}
        </div>
        <button class="add-btn" data-action="add" aria-label="Add ${p.name} to cart">${icon("bag")} Add</button>
      </div>
    </div>
  </article>`;
}

function renderProductGrid(container, products) {
  if (!container) return;
  container.innerHTML = products.map((p, i) => productCardHTML(p, i)).join("");
  initReveal(container);

  container.querySelectorAll(".product-card").forEach((card) => {
    const id = card.getAttribute("data-id");
    const product = getProductById(id);

    card.querySelector('[data-action="quickview"]').addEventListener("click", () => openQuickView(id));

    card.querySelector('[data-action="wishlist"]').addEventListener("click", () => {
      Store.toggleWishlist(id);
      card.querySelector('[data-action="wishlist"]').classList.toggle("is-active", Store.isWishlisted(id));
    });

    card.querySelector('[data-action="add"]').addEventListener("click", () => {
      const size = product.sizes[1] ? product.sizes[1].label : product.sizes[0].label;
      Store.addToCart(id, size, 1);
      openCartDrawer();
    });
  });
}
