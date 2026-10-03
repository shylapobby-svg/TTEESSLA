document.addEventListener("DOMContentLoaded", () => {

    /* =========================================
       MODEL 3 YEAR SELECTION
    ========================================= */

    const yearButtons = document.querySelectorAll(".year-button");
    const orderYear = document.getElementById("orderYear");

    yearButtons.forEach((button) => {

        button.addEventListener("click", () => {

            // Remove active state
            yearButtons.forEach((item) => {
                item.classList.remove("active");
            });

            // Activate selected year
            button.classList.add("active");

            // Get selected year
            const selectedYear =
                button.getAttribute("data-year");

            // Update order summary
            if (orderYear) {
                orderYear.textContent = selectedYear;
            }

        });

    });


    /* =========================================
       MODEL 3 COLOR SELECTION
    ========================================= */

    const colorOptions =
        document.querySelectorAll(".color-option");

    const selectedColor =
        document.getElementById("selectedColor");

    const orderColor =
        document.getElementById("orderColor");


    colorOptions.forEach((option) => {

        option.addEventListener("click", () => {

            // Remove active state
            colorOptions.forEach((item) => {
                item.classList.remove("active");
            });

            // Activate selected color
            option.classList.add("active");

            // Get selected color
            const color =
                option.getAttribute("data-color");

            // Update selected color display
            if (selectedColor) {
                selectedColor.textContent = color;
            }

            // Update order summary
            if (orderColor) {
                orderColor.textContent = color;
            }

        });

    });


    /* =========================================
       ORDER LINK
    ========================================= */

    const orderButton =
        document.querySelector(".order-button");


    if (orderButton) {

        orderButton.addEventListener("click", (event) => {

            const activeYear =
                document.querySelector(
                    ".year-button.active"
                );

            const activeColor =
                document.querySelector(
                    ".color-option.active"
                );


            const year =
                activeYear
                    ? activeYear.getAttribute("data-year")
                    : "2026";


            const color =
                activeColor
                    ? activeColor.getAttribute("data-color")
                    : "White";


            /*
             * Pass the selected configuration
             * to the future order page.
             */

            const orderUrl =
                "order.html" +
                "?model=Model%203" +
                "&year=" +
                encodeURIComponent(year) +
                "&color=" +
                encodeURIComponent(color);


            orderButton.href = orderUrl;

        });

    }


    /* =========================================
       SMOOTH SCROLL TO ORDER
    ========================================= */

    const orderLinks =
        document.querySelectorAll(
            'a[href="#order"]'
        );


    orderLinks.forEach((link) => {

        link.addEventListener("click", (event) => {

            const orderSection =
                document.getElementById("order");

            if (!orderSection) {
                return;
            }

            event.preventDefault();

            orderSection.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });

        });

    });


    /* =========================================
       INITIAL CONFIGURATION
    ========================================= */

    const initialYear =
        document.querySelector(
            ".year-button.active"
        );

    const initialColor =
        document.querySelector(
            ".color-option.active"
        );


    if (initialYear && orderYear) {

        orderYear.textContent =
            initialYear.getAttribute("data-year");

    }


    if (initialColor) {

        const initialColorName =
            initialColor.getAttribute("data-color");


        if (selectedColor) {
            selectedColor.textContent =
                initialColorName;
        }


        if (orderColor) {
            orderColor.textContent =
                initialColorName;
        }

    }


    console.log(
        "Model 3 configuration initialized."
    );

});