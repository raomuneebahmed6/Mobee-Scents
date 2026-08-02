document.addEventListener("DOMContentLoaded", () => {
  const grid = document.getElementById("wishlistGrid");
  const empty = document.getElementById("wishlistEmpty");
  if (!grid) return;

  function render() {
    const items = PRODUCTS.filter((p) => Store.isWishlisted(p.id));
    if (items.length === 0) {
      grid.style.display = "none";
      empty.hidden = false;
    } else {
      grid.style.display = "";
      empty.hidden = true;
      renderProductGrid(grid, items);
    }
  }
  render();
  Store.onChange(render);
});
