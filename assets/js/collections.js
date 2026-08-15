document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll("[data-collection-bottle]").forEach((el) => {
    const category = el.getAttribute("data-collection-bottle");
    const product = PRODUCTS.find((p) => p.category === category);
    if (product) el.innerHTML = bottleSVG(product.bottleVariant, product.accent, product.accentSoft);
  });
  document.querySelectorAll("[data-collection-bottle-gender]").forEach((el) => {
    const gender = el.getAttribute("data-collection-bottle-gender");
    const product = PRODUCTS.find((p) => p.gender === gender);
    if (product) el.innerHTML = bottleSVG(product.bottleVariant, product.accent, product.accentSoft);
  });
  initReveal();
});
