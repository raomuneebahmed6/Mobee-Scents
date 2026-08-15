/* Shop page: search, category/note filter, sort. */

function initShopPage() {
  const gridMount = document.getElementById("shopGrid");
  const emptyMount = document.getElementById("shopEmpty");
  if (!gridMount) return;

  const params = new URLSearchParams(window.location.search);
  let state = {
    q: params.get("q") || "",
    category: params.get("category") || null,
    gender: params.get("gender") || null,
    note: params.get("note") || null,
    sort: params.get("sort") || "featured",
  };

  const searchInput = document.getElementById("shopSearchInput");
  const sortSelect = document.getElementById("shopSortSelect");
  const filterRow = document.getElementById("shopFilterRow");
  const genderRow = document.getElementById("shopGenderRow");
  searchInput.value = state.q;
  sortSelect.value = state.sort;

  const genders = ["Men", "Women", "Unisex"];
  if (genderRow) {
    genderRow.innerHTML =
      `<span class="label">Shop for:</span>` +
      `<button class="filter-chip${!state.gender ? " active" : ""}" data-gender="">All</button>` +
      genders.map((g) => `<button class="filter-chip${state.gender === g ? " active" : ""}" data-gender="${g}">${g}</button>`).join("");
  }

  const categories = [...new Set(PRODUCTS.map((p) => p.category))];
  filterRow.innerHTML =
    `<span class="label">Category:</span>` +
    `<button class="filter-chip${!state.category ? " active" : ""}" data-cat="">All</button>` +
    categories.map((c) => `<button class="filter-chip${state.category === c ? " active" : ""}" data-cat="${c}">${c}</button>`).join("") +
    (state.note ? `<button class="filter-chip active" data-note-clear="1">Note: ${state.note} ${icon("x")}</button>` : "");

  function applyAndRender() {
    let list = [...PRODUCTS];
    if (state.q.trim()) {
      const q = state.q.trim().toLowerCase();
      list = list.filter(
        (p) => p.name.toLowerCase().includes(q) || p.category.toLowerCase().includes(q) || p.noteFamilies.some((n) => n.toLowerCase().includes(q))
      );
    }
    if (state.category) list = list.filter((p) => p.category === state.category);
    if (state.gender) list = list.filter((p) => p.gender === state.gender);
    if (state.note) list = list.filter((p) => p.noteFamilies.includes(state.note));

    if (state.sort === "price-asc") list.sort((a, b) => a.price - b.price);
    else if (state.sort === "price-desc") list.sort((a, b) => b.price - a.price);
    else if (state.sort === "rating") list.sort((a, b) => b.rating - a.rating);

    if (list.length === 0) {
      gridMount.style.display = "none";
      emptyMount.hidden = false;
    } else {
      gridMount.style.display = "";
      emptyMount.hidden = true;
      renderProductGrid(gridMount, list);
    }
  }

  searchInput.addEventListener("input", () => {
    state.q = searchInput.value;
    applyAndRender();
  });
  sortSelect.addEventListener("change", () => {
    state.sort = sortSelect.value;
    applyAndRender();
  });
  filterRow.addEventListener("click", (e) => {
    const chip = e.target.closest(".filter-chip");
    if (!chip) return;
    if (chip.hasAttribute("data-note-clear")) {
      state.note = null;
      chip.remove();
      return applyAndRender();
    }
    const cat = chip.getAttribute("data-cat");
    state.category = cat || null;
    filterRow.querySelectorAll(".filter-chip[data-cat]").forEach((c) => c.classList.toggle("active", c === chip));
    applyAndRender();
  });

  if (genderRow) {
    genderRow.addEventListener("click", (e) => {
      const chip = e.target.closest(".filter-chip");
      if (!chip) return;
      const g = chip.getAttribute("data-gender");
      state.gender = g || null;
      genderRow.querySelectorAll(".filter-chip[data-gender]").forEach((c) => c.classList.toggle("active", c === chip));
      applyAndRender();
    });
  }

  document.getElementById("filtersToggleBtn").addEventListener("click", () => {
    filterRow.classList.toggle("is-open");
  });

  document.getElementById("shopClearFilters").addEventListener("click", () => {
    state = { q: "", category: null, gender: null, note: null, sort: "featured" };
    searchInput.value = "";
    sortSelect.value = "featured";
    filterRow.querySelectorAll(".filter-chip[data-cat]").forEach((c) => c.classList.toggle("active", c.getAttribute("data-cat") === ""));
    if (genderRow) genderRow.querySelectorAll(".filter-chip[data-gender]").forEach((c) => c.classList.toggle("active", c.getAttribute("data-gender") === ""));
    const noteChip = filterRow.querySelector("[data-note-clear]");
    if (noteChip) noteChip.remove();
    applyAndRender();
  });

  applyAndRender();
}

document.addEventListener("DOMContentLoaded", initShopPage);
