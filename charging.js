/* =========================================================
   CHARGING PAGE JAVASCRIPT
   ========================================================= */

document.addEventListener("DOMContentLoaded", function () {

    /* =====================================================
       ELEMENTS
       ===================================================== */

    const menuButton = document.getElementById("menuButton");
    const menuClose = document.getElementById("menuClose");
    const sideMenu = document.getElementById("sideMenu");

    const accountButton = document.getElementById("accountButton");
    const accountMenu = document.getElementById("accountMenu");

    const themeToggle = document.getElementById("themeToggle");
    const themeIcon = document.getElementById("themeIcon");

    const cookieOverlay = document.getElementById("cookieOverlay");
    const acceptCookies = document.getElementById("acceptCookies");
    const cookieSettings = document.getElementById("cookieSettings");

    const backToTop = document.getElementById("backToTop");
    const refreshButton = document.getElementById("refreshButton");

    /* =====================================================
       SIDE MENU
       ===================================================== */

    if (menuButton && sideMenu) {
        menuButton.addEventListener("click", function () {
            sideMenu.classList.add("open");
            menuButton.setAttribute("aria-expanded", "true");
        });
    }

    if (menuClose && sideMenu) {
        menuClose.addEventListener("click", function () {
            sideMenu.classList.remove("open");

            if (menuButton) {
                menuButton.setAttribute("aria-expanded", "false");
            }
        });
    }

    /* =====================================================
       NAVIGATION DROPDOWNS
       ===================================================== */

    const navigationGroups = document.querySelectorAll(".navigation-group");

    navigationGroups.forEach(function (group) {

        const dropdown = group.querySelector(".navigation-dropdown");

        if (!dropdown) {
            return;
        }

        dropdown.addEventListener("click", function (event) {
            event.preventDefault();
            event.stopPropagation();

            const wasOpen = group.classList.contains("open");

            navigationGroups.forEach(function (otherGroup) {
                otherGroup.classList.remove("open");

                const otherButton =
                    otherGroup.querySelector(".navigation-dropdown");

                if (otherButton) {
                    otherButton.setAttribute("aria-expanded", "false");
                }
            });

            if (!wasOpen) {
                group.classList.add("open");
                dropdown.setAttribute("aria-expanded", "true");
            }
        });
    });

    /* =====================================================
       ACCOUNT MENU
       ===================================================== */

    if (accountButton && accountMenu) {
        accountButton.addEventListener("click", function (event) {
            event.stopPropagation();

            const isOpen = accountMenu.classList.contains("open");

            accountMenu.classList.toggle("open", !isOpen);
            accountButton.setAttribute(
                "aria-expanded",
                String(!isOpen)
            );
        });
    }

    /* =====================================================
       CLOSE MENUS WHEN CLICKING OUTSIDE
       ===================================================== */

    document.addEventListener("click", function (event) {

        if (
            sideMenu &&
            sideMenu.classList.contains("open") &&
            !sideMenu.contains(event.target) &&
            (!menuButton || !menuButton.contains(event.target))
        ) {
            sideMenu.classList.remove("open");

            if (menuButton) {
                menuButton.setAttribute("aria-expanded", "false");
            }
        }

        if (
            accountMenu &&
            accountMenu.classList.contains("open") &&
            !accountMenu.contains(event.target) &&
            (!accountButton || !accountButton.contains(event.target))
        ) {
            accountMenu.classList.remove("open");

            if (accountButton) {
                accountButton.setAttribute("aria-expanded", "false");
            }
        }
    });

    /* =====================================================
       ESCAPE KEY
       ===================================================== */

    document.addEventListener("keydown", function (event) {

        if (event.key !== "Escape") {
            return;
        }

        if (sideMenu) {
            sideMenu.classList.remove("open");
        }

        if (accountMenu) {
            accountMenu.classList.remove("open");
        }

        navigationGroups.forEach(function (group) {
            group.classList.remove("open");
        });

        if (menuButton) {
            menuButton.setAttribute("aria-expanded", "false");
        }

        if (accountButton) {
            accountButton.setAttribute("aria-expanded", "false");
        }
    });

    /* =====================================================
       THEME
       ===================================================== */

    function applyTheme(theme) {

        if (theme === "dark") {
            document.body.classList.add("dark-mode");

            if (themeIcon) {
                themeIcon.textContent = "☀";
            }

            if (themeToggle) {
                themeToggle.setAttribute(
                    "aria-label",
                    "Switch to light mode"
                );
            }

        } else {
            document.body.classList.remove("dark-mode");

            if (themeIcon) {
                themeIcon.textContent = "☾";
            }

            if (themeToggle) {
                themeToggle.setAttribute(
                    "aria-label",
                    "Switch to dark mode"
                );
            }
        }
    }

    const savedTheme = localStorage.getItem("teslaTheme") || "light";

    applyTheme(savedTheme);

    if (themeToggle) {
        themeToggle.addEventListener("click", function () {

            const isDark =
                document.body.classList.contains("dark-mode");

            const newTheme = isDark ? "light" : "dark";

            localStorage.setItem("teslaTheme", newTheme);

            applyTheme(newTheme);
        });
    }

    /* =====================================================
       COOKIES
       ===================================================== */

    const cookiesAccepted =
        localStorage.getItem("teslaCookiesAccepted");

    if (cookieOverlay && cookiesAccepted !== "true") {
        cookieOverlay.classList.add("show");
    }

    if (acceptCookies) {
        acceptCookies.addEventListener("click", function () {

            localStorage.setItem(
                "teslaCookiesAccepted",
                "true"
            );

            if (cookieOverlay) {
                cookieOverlay.classList.remove("show");
            }
        });
    }

    if (cookieSettings) {
        cookieSettings.addEventListener("click", function () {

            alert(
                "Cookie settings will be available when the website backend and privacy system are connected."
            );
        });
    }

    /* =====================================================
       BACK TO TOP
       ===================================================== */

    window.addEventListener("scroll", function () {

        if (!backToTop) {
            return;
        }

        if (window.scrollY > 500) {
            backToTop.classList.add("visible");
        } else {
            backToTop.classList.remove("visible");
        }
    });

    if (backToTop) {
        backToTop.addEventListener("click", function () {

            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });
        });
    }

    /* =====================================================
       REFRESH
       ===================================================== */

    if (refreshButton) {
        refreshButton.addEventListener("click", function () {
            window.location.reload();
        });
    }

    /* =====================================================
       CHARGING CALCULATOR
       ===================================================== */

    const batteryCapacity =
        document.getElementById("vehicleBatteryCapacity");

    const currentCharge =
        document.getElementById("vehicleCurrentCharge");

    const targetCharge =
        document.getElementById("vehicleTargetCharge");

    const chargingPower =
        document.getElementById("vehicleChargingPower");

    const electricityRate =
        document.getElementById("vehicleElectricityRate");

    const calculateButton =
        document.getElementById("calculateVehicleCharging");

    const energyNeeded =
        document.getElementById("vehicleEnergyNeeded");

    const chargingTime =
        document.getElementById("vehicleChargingTime");

    const chargingCost =
        document.getElementById("vehicleChargingCost");

    function calculateCharging() {

        if (
            !batteryCapacity ||
            !currentCharge ||
            !targetCharge ||
            !chargingPower ||
            !electricityRate
        ) {
            return;
        }

        const capacity = parseFloat(batteryCapacity.value);
        const current = parseFloat(currentCharge.value);
        const target = parseFloat(targetCharge.value);
        const power = parseFloat(chargingPower.value);
        const rate = parseFloat(electricityRate.value);

        if (
            !Number.isFinite(capacity) ||
            !Number.isFinite(current) ||
            !Number.isFinite(target) ||
            !Number.isFinite(power) ||
            !Number.isFinite(rate)
        ) {
            alert("Please enter valid charging information.");
            return;
        }

        if (capacity <= 0 || power <= 0 || rate < 0) {
            alert("Please enter positive values for the required fields.");
            return;
        }

        if (current < 0 || current > 100) {
            alert("Current charge must be between 0% and 100%.");
            return;
        }

        if (target < 0 || target > 100) {
            alert("Target charge must be between 0% and 100%.");
            return;
        }

        if (target <= current) {
            alert("Target charge must be higher than current charge.");
            return;
        }

        /*
         * Energy required:
         * Battery capacity × percentage still needed.
         */

        const percentageNeeded =
            (target - current) / 100;

        const energy =
            capacity * percentageNeeded;

        /*
         * Approximate charging time.
         *
         * This is a simple frontend estimate and does not
         * account for charging curves, temperature,
         * battery conditioning, or charging losses.
         */

        const hours =
            energy / power;

        const minutes =
            Math.round(hours * 60);

        /*
         * Simple estimated charging cost.
         */

        const cost =
            energy * rate;

        if (energyNeeded) {
            energyNeeded.textContent =
                energy.toFixed(1) + " kWh";
        }

        if (chargingTime) {

            if (minutes < 60) {
                chargingTime.textContent =
                    minutes + " min";
            } else {

                const wholeHours =
                    Math.floor(minutes / 60);

                const remainingMinutes =
                    minutes % 60;

                if (remainingMinutes === 0) {
                    chargingTime.textContent =
                        wholeHours + " hr";
                } else {
                    chargingTime.textContent =
                        wholeHours +
                        " hr " +
                        remainingMinutes +
                        " min";
                }
            }
        }

        if (chargingCost) {
            chargingCost.textContent =
                "$" + cost.toFixed(2);
        }
    }

    if (calculateButton) {
        calculateButton.addEventListener(
            "click",
            calculateCharging
        );
    }

    /* =====================================================
       VALIDATE CHARGE INPUTS WHILE TYPING
       ===================================================== */

    [
        batteryCapacity,
        currentCharge,
        targetCharge,
        chargingPower,
        electricityRate
    ].forEach(function (input) {

        if (!input) {
            return;
        }

        input.addEventListener("input", function () {

            if (this.value !== "" && parseFloat(this.value) < 0) {
                this.value = 0;
            }
        });
    });

    /* =====================================================
       HERO BUTTONS / INTERNAL LINKS
       ===================================================== */

    const internalLinks =
        document.querySelectorAll('a[href^="#"]');

    internalLinks.forEach(function (link) {

        link.addEventListener("click", function (event) {

            const targetId =
                link.getAttribute("href");

            if (
                !targetId ||
                targetId === "#"
            ) {
                return;
            }

            const target =
                document.querySelector(targetId);

            if (!target) {
                return;
            }

            event.preventDefault();

            target.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });

            if (sideMenu) {
                sideMenu.classList.remove("open");
            }
        });
    });

    /* =====================================================
       IMAGE PLACEHOLDER SUPPORT
       ===================================================== */

    const imagePlaceholders =
        document.querySelectorAll(".image-placeholder");

    imagePlaceholders.forEach(function (placeholder) {

        placeholder.setAttribute(
            "data-placeholder",
            "charging-image"
        );
    });

    /* =====================================================
       ACCESSIBILITY
       ===================================================== */

    if (menuButton) {
        menuButton.setAttribute(
            "aria-expanded",
            "false"
        );
    }

    if (accountButton) {
        accountButton.setAttribute(
            "aria-expanded",
            "false"
        );
    }

    navigationGroups.forEach(function (group) {

        const dropdown =
            group.querySelector(".navigation-dropdown");

        if (dropdown) {
            dropdown.setAttribute(
                "aria-expanded",
                group.classList.contains("open")
                    ? "true"
                    : "false"
            );
        }
    });

    /* =====================================================
       PAGE READY
       ===================================================== */

    document.body.classList.add("charging-page-ready");

    console.log("Charging page initialized successfully.");

});