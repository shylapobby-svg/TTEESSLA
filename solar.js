/* =========================================================
   SOLAR PAGE JAVASCRIPT
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

    const solarRequestForm =
        document.getElementById("solarRequestForm");

    const solarFormMessage =
        document.getElementById("solarFormMessage");

    const navigationDropdowns =
        document.querySelectorAll(".navigation-dropdown");

    const solarCardLinks =
        document.querySelectorAll(".solar-card-link");


    /* =====================================================
       SIDE MENU
       ===================================================== */

    function openSideMenu() {

        if (!sideMenu) return;

        sideMenu.classList.add("open");
        sideMenu.setAttribute("aria-hidden", "false");

        if (menuButton) {
            menuButton.setAttribute("aria-expanded", "true");
        }

        document.body.classList.add("menu-open");
    }


    function closeSideMenu() {

        if (!sideMenu) return;

        sideMenu.classList.remove("open");
        sideMenu.setAttribute("aria-hidden", "true");

        if (menuButton) {
            menuButton.setAttribute("aria-expanded", "false");
        }

        document.body.classList.remove("menu-open");
    }


    if (menuButton) {
        menuButton.addEventListener("click", function () {

            if (sideMenu.classList.contains("open")) {
                closeSideMenu();
            } else {
                openSideMenu();
            }

        });
    }


    if (menuClose) {
        menuClose.addEventListener("click", closeSideMenu);
    }


    /* =====================================================
       NAVIGATION DROPDOWNS
       ===================================================== */

    navigationDropdowns.forEach(function (button) {

        button.addEventListener("click", function () {

            const submenu =
                button.nextElementSibling;

            if (!submenu) return;

            const isOpen =
                submenu.classList.contains("open");

            document
                .querySelectorAll(".navigation-submenu.open")
                .forEach(function (otherMenu) {

                    if (otherMenu !== submenu) {
                        otherMenu.classList.remove("open");

                        const otherButton =
                            otherMenu.previousElementSibling;

                        if (otherButton) {
                            otherButton.setAttribute(
                                "aria-expanded",
                                "false"
                            );
                        }
                    }

                });


            if (isOpen) {

                submenu.classList.remove("open");

                button.setAttribute(
                    "aria-expanded",
                    "false"
                );

            } else {

                submenu.classList.add("open");

                button.setAttribute(
                    "aria-expanded",
                    "true"
                );

            }

        });

    });


    /* =====================================================
       ACCOUNT MENU
       ===================================================== */

    if (accountButton) {

        accountButton.addEventListener("click", function (event) {

            event.stopPropagation();

            const isOpen =
                accountMenu.classList.contains("open");

            if (isOpen) {

                accountMenu.classList.remove("open");

                accountButton.setAttribute(
                    "aria-expanded",
                    "false"
                );

                accountMenu.setAttribute(
                    "aria-hidden",
                    "true"
                );

            } else {

                accountMenu.classList.add("open");

                accountButton.setAttribute(
                    "aria-expanded",
                    "true"
                );

                accountMenu.setAttribute(
                    "aria-hidden",
                    "false"
                );

            }

        });

    }


    document.addEventListener("click", function (event) {

        if (
            accountMenu &&
            accountButton &&
            !accountMenu.contains(event.target) &&
            !accountButton.contains(event.target)
        ) {

            accountMenu.classList.remove("open");

            accountButton.setAttribute(
                "aria-expanded",
                "false"
            );

            accountMenu.setAttribute(
                "aria-hidden",
                "true"
            );

        }

    });


    /* =====================================================
       THEME SWITCH
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


    let savedTheme = null;

    try {
        savedTheme =
            localStorage.getItem("teslaTheme");
    } catch (error) {
        savedTheme = null;
    }


    if (savedTheme === "dark") {
        applyTheme("dark");
    } else {
        applyTheme("light");
    }


    if (themeToggle) {

        themeToggle.addEventListener("click", function () {

            const isDark =
                document.body.classList.contains("dark-mode");

            const newTheme =
                isDark ? "light" : "dark";

            applyTheme(newTheme);

            try {
                localStorage.setItem(
                    "teslaTheme",
                    newTheme
                );
            } catch (error) {
                // Local storage unavailable.
            }

        });

    }


    /* =====================================================
       COOKIE NOTICE
       ===================================================== */

    function showCookieNotice() {

        if (!cookieOverlay) return;

        cookieOverlay.classList.add("visible");

        cookieOverlay.setAttribute(
            "aria-hidden",
            "false"
        );

    }


    function hideCookieNotice() {

        if (!cookieOverlay) return;

        cookieOverlay.classList.remove("visible");

        cookieOverlay.setAttribute(
            "aria-hidden",
            "true"
        );

    }


    let cookiesAccepted = false;

    try {
        cookiesAccepted =
            localStorage.getItem("teslaCookiesAccepted") === "true";
    } catch (error) {
        cookiesAccepted = false;
    }


    if (!cookiesAccepted) {

        setTimeout(function () {
            showCookieNotice();
        }, 500);

    }


    if (acceptCookies) {

        acceptCookies.addEventListener("click", function () {

            try {
                localStorage.setItem(
                    "teslaCookiesAccepted",
                    "true"
                );
            } catch (error) {
                // Local storage unavailable.
            }

            hideCookieNotice();

        });

    }


    if (cookieSettings) {

        cookieSettings.addEventListener("click", function () {

            alert(
                "Cookie settings will be connected to the full privacy and cookie system when the backend is added."
            );

        });

    }


    /* =====================================================
       BACK TO TOP
       ===================================================== */

    function updateBackToTop() {

        if (!backToTop) return;

        if (window.scrollY > 600) {
            backToTop.classList.add("visible");
        } else {
            backToTop.classList.remove("visible");
        }

    }


    window.addEventListener(
        "scroll",
        updateBackToTop,
        { passive: true }
    );


    updateBackToTop();


    if (backToTop) {

        backToTop.addEventListener("click", function () {

            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });

        });

    }


    /* =====================================================
       REFRESH BUTTON
       ===================================================== */

    if (refreshButton) {

        refreshButton.addEventListener("click", function () {

            refreshButton.classList.add("refreshing");

            setTimeout(function () {
                window.location.reload();
            }, 250);

        });

    }


    /* =====================================================
       SOLAR FORM
       ===================================================== */

    if (solarRequestForm) {

        solarRequestForm.addEventListener(
            "submit",
            function (event) {

                event.preventDefault();

                const firstName =
                    document.getElementById(
                        "solarFirstName"
                    )?.value.trim();

                const lastName =
                    document.getElementById(
                        "solarLastName"
                    )?.value.trim();

                const email =
                    document.getElementById(
                        "solarEmail"
                    )?.value.trim();

                const phone =
                    document.getElementById(
                        "solarPhone"
                    )?.value.trim();

                const propertyType =
                    document.getElementById(
                        "propertyType"
                    )?.value;


                if (
                    !firstName ||
                    !lastName ||
                    !email ||
                    !phone ||
                    !propertyType
                ) {

                    showSolarMessage(
                        "Please complete the required information before submitting your solar request.",
                        true
                    );

                    return;

                }


                showSolarMessage(
                    "Your solar request has been prepared successfully. Account verification and backend submission will be connected later.",
                    false
                );


                solarRequestForm.reset();


                setTimeout(function () {

                    if (solarFormMessage) {

                        solarFormMessage.scrollIntoView({
                            behavior: "smooth",
                            block: "center"
                        });

                    }

                }, 100);

            }
        );

    }


    function showSolarMessage(message, isError) {

        if (!solarFormMessage) return;

        solarFormMessage.textContent = message;

        solarFormMessage.classList.add("visible");

        if (isError) {

            solarFormMessage.classList.add(
                "form-error"
            );

        } else {

            solarFormMessage.classList.remove(
                "form-error"
            );

        }

    }


    /* =====================================================
       SOLAR CATEGORY LINKS
       ===================================================== */

    solarCardLinks.forEach(function (link) {

        link.addEventListener("click", function (event) {

            const category =
                link.getAttribute("data-category");

            if (!category) return;

            const destination =
                document.getElementById(
                    "system-options"
                );

            if (!destination) return;

            event.preventDefault();

            destination.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });

        });

    });


    /* =====================================================
       ESCAPE KEY
       ===================================================== */

    document.addEventListener("keydown", function (event) {

        if (event.key === "Escape") {

            closeSideMenu();

            if (accountMenu) {

                accountMenu.classList.remove("open");

            }

        }

    });


    /* =====================================================
       CLOSE SIDE MENU WHEN LINK IS SELECTED
       ===================================================== */

    if (sideMenu) {

        const sideLinks =
            sideMenu.querySelectorAll("a");

        sideLinks.forEach(function (link) {

            link.addEventListener("click", function () {

                closeSideMenu();

            });

        });

    }


    /* =====================================================
       IMAGE PLACEHOLDER PREPARATION
       ===================================================== */

    const imagePlaceholders =
        document.querySelectorAll(
            ".solar-image-placeholder"
        );


    imagePlaceholders.forEach(function (placeholder) {

        placeholder.setAttribute(
            "data-image-ready",
            "true"
        );

    });


    /* =====================================================
       PAGE READY
       ===================================================== */

    document.body.classList.add(
        "solar-page-ready"
    );

});