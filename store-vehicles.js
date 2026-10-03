/* =========================================================
   STORE VEHICLES
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

  const searchInput = document.getElementById("vehicleSearch");
  const modelFilter = document.getElementById("vehicleModelFilter");
  const locationFilter = document.getElementById("vehicleLocationFilter");

  const clearButton = document.getElementById("clearVehicleFilters");
  const resetButton = document.getElementById("resetInventory");

  const inventoryGrid = document.getElementById("vehicleInventoryGrid");
  const inventoryStatus = document.getElementById("inventoryStatus");
  const noResults = document.getElementById("noInventoryResults");

  if (
    !searchInput ||
    !modelFilter ||
    !locationFilter ||
    !inventoryGrid
  ) {
    return;
  }


  const inventoryCards = Array.from(
    inventoryGrid.querySelectorAll(".inventory-card")
  );


  /* =======================================================
     FORMAT LOCATION
     ======================================================= */

  function formatLocation(value) {

    const locations = {
      houston: "Houston",
      austin: "Austin",
      dallas: "Dallas",
      "los-angeles": "Los Angeles",
      "new-york": "New York",
      miami: "Miami"
    };

    return locations[value] || value;

  }


  /* =======================================================
     FILTER INVENTORY
     ======================================================= */

  function filterInventory() {

    const searchTerm = searchInput.value
      .trim()
      .toLowerCase();

    const selectedModel = modelFilter.value;
    const selectedLocation = locationFilter.value;

    let visibleCount = 0;


    inventoryCards.forEach((card) => {

      const model = card.dataset.model || "";
      const location = card.dataset.location || "";

      const searchableText = card.textContent
        .toLowerCase()
        .replace(/\s+/g, " ");


      const matchesSearch =
        !searchTerm ||
        searchableText.includes(searchTerm) ||
        model.includes(searchTerm) ||
        location.includes(searchTerm) ||
        formatLocation(location)
          .toLowerCase()
          .includes(searchTerm);


      const matchesModel =
        selectedModel === "all" ||
        model === selectedModel;


      const matchesLocation =
        selectedLocation === "all" ||
        location === selectedLocation;


      const shouldShow =
        matchesSearch &&
        matchesModel &&
        matchesLocation;


      card.hidden = !shouldShow;


      if (shouldShow) {
        visibleCount++;
      }

    });


    updateInventoryStatus(
      visibleCount,
      searchTerm,
      selectedModel,
      selectedLocation
    );


    noResults.hidden = visibleCount !== 0;

  }


  /* =======================================================
     UPDATE STATUS
     ======================================================= */

  function updateInventoryStatus(
    count,
    searchTerm,
    selectedModel,
    selectedLocation
  ) {

    if (!inventoryStatus) {
      return;
    }


    if (count === 0) {

      inventoryStatus.textContent =
        "No vehicles match your current search.";

      return;

    }


    let message =
      `${count} ${count === 1 ? "vehicle" : "vehicles"} available`;


    const filters = [];


    if (selectedModel !== "all") {

      const modelNames = {
        "model-3": "Model 3",
        "model-y": "Model Y",
        "model-s": "Model S",
        "model-x": "Model X",
        cybertruck: "Cybertruck"
      };

      filters.push(modelNames[selectedModel] || selectedModel);

    }


    if (selectedLocation !== "all") {

      filters.push(
        formatLocation(selectedLocation)
      );

    }


    if (searchTerm) {
      filters.push(`"${searchTerm}"`);
    }


    if (filters.length) {

      message += ` • Filtered by ${filters.join(" • ")}`;

    }


    inventoryStatus.textContent = message;

  }


  /* =======================================================
     CLEAR FILTERS
     ======================================================= */

  function clearFilters() {

    searchInput.value = "";
    modelFilter.value = "all";
    locationFilter.value = "all";

    filterInventory();

    searchInput.focus();

  }


  /* =======================================================
     RESET SEARCH
     ======================================================= */

  function resetInventory() {

    clearFilters();

    const inventorySection =
      document.getElementById("inventory");

    if (inventorySection) {

      inventorySection.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });

    }

  }


  /* =======================================================
     EVENTS
     ======================================================= */

  searchInput.addEventListener(
    "input",
    filterInventory
  );

  modelFilter.addEventListener(
    "change",
    filterInventory
  );

  locationFilter.addEventListener(
    "change",
    filterInventory
  );


  if (clearButton) {

    clearButton.addEventListener(
      "click",
      clearFilters
    );

  }


  if (resetButton) {

    resetButton.addEventListener(
      "click",
      resetInventory
    );

  }


  /* =======================================================
     KEYBOARD ACCESSIBILITY
     ======================================================= */

  inventoryCards.forEach((card) => {

    card.addEventListener("keydown", (event) => {

      if (
        event.key === "Enter" ||
        event.key === " "
      ) {

        const link =
          card.querySelector(".card-link");

        if (link) {

          event.preventDefault();
          link.click();

        }

      }

    });

  });


  /* =======================================================
     INITIAL FILTER
     ======================================================= */

  filterInventory();


  /* =======================================================
     CONSOLE
     ======================================================= */

  console.log(
    "Store vehicles inventory initialized."
  );

});