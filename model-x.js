document.addEventListener("DOMContentLoaded", () => {
    const yearButtons = document.querySelectorAll(".year-button");
    const colorOptions = document.querySelectorAll(".color-option");

    const orderYear = document.getElementById("orderYear");
    const orderColor = document.getElementById("orderColor");
    const selectedColor = document.getElementById("selectedColor");
    const orderButton = document.querySelector(".order-button");
    const orderSection = document.getElementById("order");

    let selectedYear = 2026;
    let selectedVehicleColor = "White";

    function updateOrderLink() {
        if (!orderButton) return;

        const model = "Model X";

        orderButton.href =
            `order.html?model=${encodeURIComponent(model)}` +
            `&year=${encodeURIComponent(selectedYear)}` +
            `&color=${encodeURIComponent(selectedVehicleColor)}`;
    }

    function updateYear(year) {
        selectedYear = year;

        yearButtons.forEach((button) => {
            button.classList.toggle(
                "active",
                Number(button.dataset.year) === selectedYear
            );
        });

        if (orderYear) {
            orderYear.textContent = selectedYear;
        }

        updateOrderLink();
    }

    function updateColor(color) {
        selectedVehicleColor = color;

        colorOptions.forEach((option) => {
            option.classList.toggle(
                "active",
                option.dataset.color === selectedVehicleColor
            );
        });

        if (selectedColor) {
            selectedColor.textContent = selectedVehicleColor;
        }

        if (orderColor) {
            orderColor.textContent = selectedVehicleColor;
        }

        updateOrderLink();
    }

    yearButtons.forEach((button) => {
        button.addEventListener("click", () => {
            const year = Number(button.dataset.year);

            if (!Number.isNaN(year)) {
                updateYear(year);
            }
        });
    });

    colorOptions.forEach((option) => {
        option.addEventListener("click", () => {
            const color = option.dataset.color;

            if (color) {
                updateColor(color);
            }
        });

        option.addEventListener("keydown", (event) => {
            if (event.key === "Enter" || event.key === " ") {
                event.preventDefault();

                const color = option.dataset.color;

                if (color) {
                    updateColor(color);
                }
            }
        });
    });

    if (orderButton && orderSection) {
        orderButton.addEventListener("click", (event) => {
            event.preventDefault();

            updateOrderLink();

            orderSection.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });
        });
    }

    updateYear(2026);
    updateColor("White");

    console.log("Model X page initialized.");
});