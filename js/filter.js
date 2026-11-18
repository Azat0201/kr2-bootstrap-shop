document.addEventListener("DOMContentLoaded", () => {
  const cuisineSelect = document.getElementById("filterCuisine");
  const categorySelect = document.getElementById("filterCategory");
  const budgetSelect = document.getElementById("filterBudget");
  const resetBtn = document.getElementById("resetFiltersBtn");

  const programCards = document.querySelectorAll(".program-item");
  const emptyMessage = document.getElementById("emptyCatalogMessage");

  if (programCards.length === 0) return;

  const updateCardVisibility = (card) => {
    const hiddenByFilter = card.getAttribute("data-hidden-by-filter") === "true";
    const hiddenBySearch = card.getAttribute("data-hidden-by-search") === "true";
    card.classList.toggle("d-none", hiddenByFilter || hiddenBySearch);
  };

  const checkEmptyState = () => {
    if (!emptyMessage) return;
    const visibleCards = document.querySelectorAll(".program-item:not(.d-none)");
    emptyMessage.classList.toggle("d-none", visibleCards.length > 0);
  };

  const applyCatalogFilter = () => {
    const selectedCuisine = cuisineSelect ? cuisineSelect.value : "all";
    const selectedCategory = categorySelect ? categorySelect.value : "all";
    const maxBudget = budgetSelect && budgetSelect.value !== "all" ? Number(budgetSelect.value) : Infinity;

    programCards.forEach((card) => {
      const cardCuisine = card.getAttribute("data-cuisine") || "";
      const cardCategory = card.getAttribute("data-category") || "";
      const cardPrice = Number(card.getAttribute("data-price")) || 0;

      const matchesCuisine = selectedCuisine === "all" || cardCuisine === selectedCuisine;
      const matchesCategory = selectedCategory === "all" || cardCategory === selectedCategory;
      const matchesBudget = cardPrice <= maxBudget;

      const isVisible = matchesCuisine && matchesCategory && matchesBudget;
      card.setAttribute("data-hidden-by-filter", String(!isVisible));
      updateCardVisibility(card);
    });

    checkEmptyState();
  };

  if (cuisineSelect) cuisineSelect.addEventListener("change", applyCatalogFilter);
  if (categorySelect) categorySelect.addEventListener("change", applyCatalogFilter);
  if (budgetSelect) budgetSelect.addEventListener("change", applyCatalogFilter);

  if (resetBtn) {
    resetBtn.addEventListener("click", () => {
      if (cuisineSelect) cuisineSelect.value = "all";
      if (categorySelect) categorySelect.value = "all";
      if (budgetSelect) budgetSelect.value = "all";

      const searchInput = document.getElementById("siteSearchInput");
      if (searchInput) {
        searchInput.value = "";
        searchInput.dispatchEvent(new Event("input"));
      }

      applyCatalogFilter();
    });
  }

  applyCatalogFilter();
});
