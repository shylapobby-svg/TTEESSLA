/* =========================================
   STORES PAGE
========================================= */

document.addEventListener("DOMContentLoaded", () => {
    const searchInput = document.getElementById("storeSearch");
    const searchButton = document.getElementById("storeSearchButton");
    const searchStatus = document.getElementById("storeSearchStatus");
    const locationGrid = document.getElementById("locationGrid");
    const locationCount = document.getElementById("locationCount");
    const noResults = document.getElementById("noStoreResults");

    if (!searchInput || !locationGrid) {
        return;
    }

    const locationCards = Array.from(
        locationGrid.querySelectorAll(".location-card")
    );

    function updateLocationCount(count) {
        if (!locationCount) {
            return;
        }

        locationCount.textContent =
            `${count} ${count === 1 ? "location" : "locations"}`;
    }

    function searchLocations() {
        const query = searchInput.value.trim().toLowerCase();

        let visibleCount = 0;

        locationCards.forEach((card) => {
            const locationText = (
                card.dataset.location ||
                card.textContent ||
                ""
            ).toLowerCase();

            const typeText = (
                card.dataset.type ||
                ""
            ).toLowerCase();

            const matches =
                !query ||
                locationText.includes(query) ||
                typeText.includes(query);

            card.hidden = !matches;

            if (matches) {
                visibleCount++;
            }
        });

        updateLocationCount(visibleCount);

        if (noResults) {
            noResults.hidden = visibleCount !== 0;
        }

        if (searchStatus) {
            if (!query) {
                searchStatus.textContent = "";
            } else if (visibleCount === 0) {
                searchStatus.textContent =
                    `No locations matched "${searchInput.value.trim()}".`;
            } else {
                searchStatus.textContent =
                    `${visibleCount} ${visibleCount === 1 ? "location" : "locations"} found.`;
            }
        }
    }

    if (searchButton) {
        searchButton.addEventListener("click", searchLocations);
    }

    searchInput.addEventListener("input", () => {
        searchLocations();
    });

    searchInput.addEventListener("keydown", (event) => {
        if (event.key === "Enter") {
            event.preventDefault();
            searchLocations();
        }
    });

    /*
     * Demonstration directions behavior.
     * Replace the placeholder href with verified
     * map/location URLs for each store later.
     */
    const directionsLinks = document.querySelectorAll(".directions-link");

    directionsLinks.forEach((link) => {
        link.addEventListener("click", (event) => {
            event.preventDefault();

            const card = link.closest(".location-card");

            if (!card) {
                return;
            }

            const locationName =
                card.querySelector("h3")?.textContent.trim() ||
                "this location";

            alert(
                `Directions for ${locationName} will be connected to your verified map/location service.`
            );
        });
    });

    /*
     * Accessibility:
     * Keep hidden location cards unavailable to keyboard users.
     */
    locationCards.forEach((card) => {
        const links = card.querySelectorAll("a");

        links.forEach((link) => {
            link.addEventListener("focus", () => {
                if (card.hidden) {
                    link.blur();
                }
            });
        });
    });

    updateLocationCount(locationCards.length);

    console.log("Stores page initialized.");
});