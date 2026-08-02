document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll("[data-collection-bottle]").forEach((el) => {
    const category = el.getAttribute("data-collection-bottle");
    const product = PRODUCTS.find((p) => p.category === category);
    if (product) el.innerHTML = bottleSVG(product.bottleVariant, product.accent, product.accentSoft);
  });
  initReveal();
});
