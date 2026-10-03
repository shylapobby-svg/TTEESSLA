document.addEventListener("DOMContentLoaded", () => {
    const yearButtons = document.querySelectorAll(".year-button");
    const colorOptions = document.querySelectorAll(".color-option");

    const orderYear = document.getElementById("orderYear");
    const orderColor = document.getElementById("orderColor");
    const selectedColor = document.getElementById("selectedColor");
    const orderButton = document.querySelector(".order-button");

    // -----------------------------
    // YEAR SELECTION
    // -----------------------------
    yearButtons.forEach((button) => {
        button.addEventListener("click", () => {
            yearButtons.forEach((item) => {
                item.classList.remove("active");
            });

            button.classList.add("active");

            const selectedYear = button.dataset.year;

            if (orderYear) {
                orderYear.textContent = selectedYear;
            }

            updateOrderLink();
        });
    });

    // -----------------------------
    // COLOR SELECTION
    // -----------------------------
    colorOptions.forEach((option) => {
        option.addEventListener("click", () => {
            colorOptions.forEach((item) => {
                item.classList.remove("active");
            });

            option.classList.add("active");

            const selectedColorName = option.dataset.color;

            if (selectedColor) {
                selectedColor.textContent = selectedColorName;
            }

            if (orderColor) {
                orderColor.textContent = selectedColorName;
            }

            updateOrderLink();
        });
    });

    // -----------------------------
    // UPDATE ORDER LINK
    // -----------------------------
    function updateOrderLink() {
        if (!orderButton) return;

        const activeYear = document.querySelector(".year-button.active");
        const activeColor = document.querySelector(".color-option.active");

        const year = activeYear
            ? activeYear.dataset.year
            : "2026";

        const color = activeColor
            ? activeColor.dataset.color
            : "White";

        orderButton.href =
            `order.html?model=${encodeURIComponent("Model Y")}` +
            `&year=${encodeURIComponent(year)}` +
            `&color=${encodeURIComponent(color)}`;
    }

    // -----------------------------
    // INITIALIZE ORDER SUMMARY
    // -----------------------------
    const activeYear = document.querySelector(".year-button.active");
    const activeColor = document.querySelector(".color-option.active");

    if (activeYear && orderYear) {
        orderYear.textContent = activeYear.dataset.year;
    }

    if (activeColor) {
        const color = activeColor.dataset.color;

        if (selectedColor) {
            selectedColor.textContent = color;
        }

        if (orderColor) {
            orderColor.textContent = color;
        }
    }

    updateOrderLink();

    // -----------------------------
    // SMOOTH SCROLL TO ORDER
    // -----------------------------
    document.querySelectorAll('a[href="#order"]').forEach((link) => {
        link.addEventListener("click", (event) => {
            const orderSection = document.getElementById("order");

            if (orderSection) {
                event.preventDefault();

                orderSection.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });
            }
        });
    });

    console.log("Model Y configuration initialized.");
});