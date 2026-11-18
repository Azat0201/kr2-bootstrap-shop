document.addEventListener("DOMContentLoaded", () => {
  const searchForm = document.getElementById("siteSearchForm");
  const searchInput = document.getElementById("siteSearchInput");

  if (!searchForm || !searchInput) return;

  const programCards = document.querySelectorAll(".program-item");
  const emptyMessage = document.getElementById("emptyCatalogMessage");
  const isCatalogPage = programCards.length > 0;

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

  const filterBySearchQuery = (rawQuery) => {
    const query = rawQuery.trim().toLowerCase();

    programCards.forEach((card) => {
      const cardText = card.innerText.toLowerCase();
      const matchesSearch = !query || cardText.includes(query);

      card.setAttribute("data-hidden-by-search", String(!matchesSearch));
      updateCardVisibility(card);
    });

    checkEmptyState();
  };

  searchForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const query = searchInput.value.trim();

    if (isCatalogPage) {
      filterBySearchQuery(query);
    } else {
      const isSubfolder = window.location.pathname.includes("/programms/");
      const catalogPath = isSubfolder ? "../catalog.html" : "catalog.html";
      window.location.href = query
        ? `${catalogPath}?search=${encodeURIComponent(query)}`
        : catalogPath;
    }
  });

  if (isCatalogPage) {
    searchInput.addEventListener("input", () => {
      filterBySearchQuery(searchInput.value);
    });

    const urlParams = new URLSearchParams(window.location.search);
    const initialSearch = urlParams.get("search");
    if (initialSearch) {
      searchInput.value = initialSearch;
      filterBySearchQuery(initialSearch);
    }
  }
});
