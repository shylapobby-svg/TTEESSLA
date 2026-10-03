/* =========================================================
   FUTURE CARS PAGE JAVASCRIPT
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

            menuButton.setAttribute(
                "aria-expanded",
                "true"
            );
        });
    }

    if (menuClose && sideMenu) {

        menuClose.addEventListener("click", function () {

            sideMenu.classList.remove("open");

            if (menuButton) {
                menuButton.setAttribute(
                    "aria-expanded",
                    "false"
                );
            }
        });
    }

    /* =====================================================
       NAVIGATION DROPDOWNS
       ===================================================== */

    const navigationGroups =
        document.querySelectorAll(".navigation-group");

    navigationGroups.forEach(function (group) {

        const dropdown =
            group.querySelector(".navigation-dropdown");

        if (!dropdown) {
            return;
        }

        dropdown.addEventListener("click", function (event) {

            event.preventDefault();
            event.stopPropagation();

            const wasOpen =
                group.classList.contains("open");

            navigationGroups.forEach(function (otherGroup) {

                otherGroup.classList.remove("open");

                const otherButton =
                    otherGroup.querySelector(
                        ".navigation-dropdown"
                    );

                if (otherButton) {
                    otherButton.setAttribute(
                        "aria-expanded",
                        "false"
                    );
                }
            });

            if (!wasOpen) {

                group.classList.add("open");

                dropdown.setAttribute(
                    "aria-expanded",
                    "true"
                );
            }
        });
    });

    /* =====================================================
       ACCOUNT MENU
       ===================================================== */

    if (accountButton && accountMenu) {

        accountButton.addEventListener("click", function (event) {

            event.stopPropagation();

            const isOpen =
                accountMenu.classList.contains("open");

            accountMenu.classList.toggle(
                "open",
                !isOpen
            );

            accountButton.setAttribute(
                "aria-expanded",
                String(!isOpen)
            );
        });
    }

    /* =====================================================
       CLOSE MENUS OUTSIDE
       ===================================================== */

    document.addEventListener("click", function (event) {

        if (
            sideMenu &&
            sideMenu.classList.contains("open") &&
            !sideMenu.contains(event.target) &&
            (!menuButton ||
                !menuButton.contains(event.target))
        ) {

            sideMenu.classList.remove("open");

            if (menuButton) {
                menuButton.setAttribute(
                    "aria-expanded",
                    "false"
                );
            }
        }

        if (
            accountMenu &&
            accountMenu.classList.contains("open") &&
            !accountMenu.contains(event.target) &&
            (!accountButton ||
                !accountButton.contains(event.target))
        ) {

            accountMenu.classList.remove("open");

            if (accountButton) {
                accountButton.setAttribute(
                    "aria-expanded",
                    "false"
                );
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

    const savedTheme =
        localStorage.getItem("teslaTheme") || "light";

    applyTheme(savedTheme);

    if (themeToggle) {

        themeToggle.addEventListener("click", function () {

            const isDark =
                document.body.classList.contains(
                    "dark-mode"
                );

            const newTheme =
                isDark ? "light" : "dark";

            localStorage.setItem(
                "teslaTheme",
                newTheme
            );

            applyTheme(newTheme);
        });
    }

    /* =====================================================
       COOKIE NOTICE
       ===================================================== */

    const cookiesAccepted =
        localStorage.getItem(
            "teslaCookiesAccepted"
        );

    if (
        cookieOverlay &&
        cookiesAccepted !== "true"
    ) {
        cookieOverlay.classList.add("show");
    }

    if (acceptCookies) {

        acceptCookies.addEventListener(
            "click",
            function () {

                localStorage.setItem(
                    "teslaCookiesAccepted",
                    "true"
                );

                if (cookieOverlay) {
                    cookieOverlay.classList.remove(
                        "show"
                    );
                }
            }
        );
    }

    if (cookieSettings) {

        cookieSettings.addEventListener(
            "click",
            function () {

                alert(
                    "Cookie settings will be available when the website privacy system is connected."
                );
            }
        );
    }

    /* =====================================================
       BACK TO TOP
       ===================================================== */

    window.addEventListener(
        "scroll",
        function () {

            if (!backToTop) {
                return;
            }

            if (window.scrollY > 500) {

                backToTop.classList.add(
                    "visible"
                );

            } else {

                backToTop.classList.remove(
                    "visible"
                );
            }
        }
    );

    if (backToTop) {

        backToTop.addEventListener(
            "click",
            function () {

                window.scrollTo({
                    top: 0,
                    behavior: "smooth"
                });
            }
        );
    }

    /* =====================================================
       REFRESH BUTTON
       ===================================================== */

    if (refreshButton) {

        refreshButton.addEventListener(
            "click",
            function () {

                window.location.reload();
            }
        );
    }

    /* =====================================================
       SMOOTH INTERNAL LINKS
       ===================================================== */

    const internalLinks =
        document.querySelectorAll(
            'a[href^="#"]'
        );

    internalLinks.forEach(function (link) {

        link.addEventListener(
            "click",
            function (event) {

                const targetId =
                    link.getAttribute("href");

                if (
                    !targetId ||
                    targetId === "#"
                ) {
                    return;
                }

                const target =
                    document.querySelector(
                        targetId
                    );

                if (!target) {
                    return;
                }

                event.preventDefault();

                target.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });

                if (sideMenu) {
                    sideMenu.classList.remove(
                        "open"
                    );
                }
            }
        );
    });

    /* =====================================================
       VEHICLE CARD INTERACTION
       ===================================================== */

    const vehicleCards =
        document.querySelectorAll(
            ".future-vehicle-card"
        );

    vehicleCards.forEach(function (card) {

        card.addEventListener(
            "mouseenter",
            function () {
                card.classList.add(
                    "vehicle-card-hover"
                );
            }
        );

        card.addEventListener(
            "mouseleave",
            function () {
                card.classList.remove(
                    "vehicle-card-hover"
                );
            }
        );
    });

    /* =====================================================
       IMAGE PLACEHOLDERS
       ===================================================== */

    const imagePlaceholders =
        document.querySelectorAll(
            ".image-placeholder"
        );

    imagePlaceholders.forEach(
        function (placeholder) {

            placeholder.setAttribute(
                "data-placeholder",
                "future-vehicle-image"
            );
        }
    );

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

    navigationGroups.forEach(
        function (group) {

            const dropdown =
                group.querySelector(
                    ".navigation-dropdown"
                );

            if (dropdown) {

                dropdown.setAttribute(
                    "aria-expanded",
                    group.classList.contains("open")
                        ? "true"
                        : "false"
                );
            }
        }
    );

    /* =====================================================
       PAGE READY
       ===================================================== */

    document.body.classList.add(
        "future-cars-page-ready"
    );

    console.log(
        "Future Cars page initialized successfully."
    );

});