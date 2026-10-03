/* =========================================
   NEWS PAGE
   ========================================= */

document.addEventListener("DOMContentLoaded", () => {
    const searchInput = document.getElementById("newsSearch");
    const categoryFilter = document.getElementById("newsCategory");
    const clearButton = document.getElementById("clearNewsFilters");

    const newsCards = Array.from(
        document.querySelectorAll(".news-card")
    );

    const resultsStatus =
        document.getElementById("newsResultsStatus");

    const noResults =
        document.getElementById("noNewsResults");

    const resetButton =
        document.getElementById("resetNewsSearch");

    const readButtons =
        document.querySelectorAll(".news-read-button");

    function normalize(value) {
        return String(value || "")
            .toLowerCase()
            .trim();
    }

    function updateNews() {
        const searchTerm = normalize(
            searchInput ? searchInput.value : ""
        );

        const selectedCategory = normalize(
            categoryFilter ? categoryFilter.value : ""
        );

        let visibleCount = 0;

        newsCards.forEach((card) => {
            const cardText = normalize(
                card.textContent
            );

            const cardCategory = normalize(
                card.dataset.category
            );

            const matchesSearch =
                !searchTerm ||
                cardText.includes(searchTerm);

            const matchesCategory =
                !selectedCategory ||
                cardCategory
                    .split(" ")
                    .includes(selectedCategory);

            const shouldShow =
                matchesSearch &&
                matchesCategory;

            card.style.display =
                shouldShow ? "" : "none";

            if (shouldShow) {
                visibleCount++;
            }
        });

        if (resultsStatus) {
            resultsStatus.textContent =
                `${visibleCount} stor${visibleCount === 1 ? "y" : "ies"} shown`;
        }

        if (noResults) {
            noResults.classList.toggle(
                "show",
                visibleCount === 0
            );
        }
    }

    function clearFilters() {
        if (searchInput) {
            searchInput.value = "";
        }

        if (categoryFilter) {
            categoryFilter.value = "";
        }

        updateNews();

        if (searchInput) {
            searchInput.focus();
        }
    }

    /* Search */
    if (searchInput) {
        searchInput.addEventListener(
            "input",
            updateNews
        );
    }

    /* Category */
    if (categoryFilter) {
        categoryFilter.addEventListener(
            "change",
            updateNews
        );
    }

    /* Clear */
    if (clearButton) {
        clearButton.addEventListener(
            "click",
            clearFilters
        );
    }

    /* Reset */
    if (resetButton) {
        resetButton.addEventListener(
            "click",
            clearFilters
        );
    }

    /* Read Story buttons */
    readButtons.forEach((button) => {
        button.addEventListener("click", () => {
            const title =
                button.dataset.newsTitle ||
                "this news story";

            alert(
                `The full article for "${title}" will be connected when the news backend/content system is added.`
            );
        });
    });

    /* Keyboard accessibility */
    newsCards.forEach((card) => {
        card.setAttribute(
            "tabindex",
            "0"
        );

        card.addEventListener(
            "keydown",
            (event) => {
                if (
                    event.key === "Enter" ||
                    event.key === " "
                ) {
                    event.preventDefault();

                    const button =
                        card.querySelector(
                            ".news-read-button"
                        );

                    if (button) {
                        button.click();
                    }
                }
            }
        );
    });

    /* Initial filtering */
    updateNews();

    console.log(
        "News page initialized successfully."
    );
});