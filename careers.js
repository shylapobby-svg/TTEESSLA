/* =========================================
   CAREERS PAGE
   ========================================= */

document.addEventListener("DOMContentLoaded", () => {
    const searchInput = document.getElementById("careerSearch");
    const departmentFilter = document.getElementById("careerDepartment");
    const locationFilter = document.getElementById("careerLocation");
    const clearButton = document.getElementById("clearCareerFilters");

    const careerCards = Array.from(
        document.querySelectorAll(".career-card")
    );

    const resultsStatus = document.getElementById("careerResultsStatus");
    const careerList = document.getElementById("careerList");
    const noResults = document.getElementById("noCareerResults");
    const resetButton = document.getElementById("resetCareerSearch");

    if (!careerCards.length) {
        return;
    }

    function normalize(value) {
        return String(value || "")
            .toLowerCase()
            .trim();
    }

    function updateResults() {
        const searchTerm = normalize(searchInput?.value);
        const department = normalize(departmentFilter?.value);
        const location = normalize(locationFilter?.value);

        let visibleCount = 0;

        careerCards.forEach((card) => {
            const cardText = normalize(card.textContent);
            const cardDepartment = normalize(
                card.dataset.department
            );
            const cardLocation = normalize(
                card.dataset.location
            );

            const matchesSearch =
                !searchTerm || cardText.includes(searchTerm);

            const matchesDepartment =
                !department ||
                cardDepartment === department;

            const matchesLocation =
                !location ||
                cardLocation === location;

            const shouldShow =
                matchesSearch &&
                matchesDepartment &&
                matchesLocation;

            card.style.display = shouldShow ? "" : "none";

            if (shouldShow) {
                visibleCount++;
            }
        });

        if (resultsStatus) {
            resultsStatus.textContent =
                `${visibleCount} position${visibleCount === 1 ? "" : "s"} shown`;
        }

        if (noResults) {
            noResults.classList.toggle(
                "show",
                visibleCount === 0
            );
        }

        if (careerList) {
            careerList.setAttribute(
                "aria-hidden",
                visibleCount === 0 ? "true" : "false"
            );
        }
    }

    function clearFilters() {
        if (searchInput) {
            searchInput.value = "";
        }

        if (departmentFilter) {
            departmentFilter.value = "";
        }

        if (locationFilter) {
            locationFilter.value = "";
        }

        updateResults();

        if (searchInput) {
            searchInput.focus();
        }
    }

    if (searchInput) {
        searchInput.addEventListener(
            "input",
            updateResults
        );
    }

    if (departmentFilter) {
        departmentFilter.addEventListener(
            "change",
            updateResults
        );
    }

    if (locationFilter) {
        locationFilter.addEventListener(
            "change",
            updateResults
        );
    }

    if (clearButton) {
        clearButton.addEventListener(
            "click",
            clearFilters
        );
    }

    if (resetButton) {
        resetButton.addEventListener(
            "click",
            clearFilters
        );
    }

    /* Keyboard accessibility */
    careerCards.forEach((card) => {
        card.setAttribute("tabindex", "0");

        card.addEventListener("keydown", (event) => {
            if (
                event.key === "Enter" ||
                event.key === " "
            ) {
                event.preventDefault();

                const title =
                    card.querySelector("h3")?.textContent ||
                    "this position";

                alert(
                    `Application flow for "${title}" will be connected when the backend is added.`
                );
            }
        });
    });

    /* Initial state */
    updateResults();

    console.log(
        "Careers page initialized successfully."
    );
});