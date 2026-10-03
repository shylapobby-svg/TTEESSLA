/* =========================================
   DASHBOARD
   ========================================= */

document.addEventListener("DOMContentLoaded", () => {

    const profileKey = "teslaAccountProfile";
    const sessionKey = "teslaUserLoggedIn";

    const userName = document.getElementById("dashboardUserName");
    const userEmail = document.getElementById("dashboardUserEmail");

    const signOutButton =
        document.getElementById("dashboardSignOut");

    const investmentButton =
        document.getElementById("investmentButton");

    const swipeCards =
        document.querySelectorAll(".dashboard-swipe-card");

    /* =========================================
       LOAD USER
       ========================================= */

    function loadUser() {
        let profile = null;

        try {
            profile = JSON.parse(
                sessionStorage.getItem(profileKey) ||
                localStorage.getItem(profileKey) ||
                "null"
            );
        } catch (error) {
            console.warn(
                "Unable to read account profile."
            );
        }

        if (profile) {
            if (userName) {
                userName.textContent =
                    profile.firstName ||
                    profile.name ||
                    "Tesla Owner";
            }

            if (userEmail) {
                userEmail.textContent =
                    profile.email || "";
            }
        } else {
            if (userName) {
                userName.textContent =
                    "Welcome";
            }
        }
    }

    /* =========================================
       INVESTMENT BUTTON
       ========================================= */

    if (investmentButton) {
        investmentButton.addEventListener(
            "click",
            () => {
                window.location.href =
                    "investment.html";
            }
        );
    }

    /* =========================================
       SIGN OUT
       ========================================= */

    if (signOutButton) {
        signOutButton.addEventListener(
            "click",
            () => {
                sessionStorage.removeItem(
                    sessionKey
                );

                sessionStorage.removeItem(
                    "teslaLoggedIn"
                );

                window.location.href =
                    "login.html";
            }
        );
    }

    /* =========================================
       SWIPE / DRAG CARDS
       ========================================= */

    swipeCards.forEach((card) => {

        let isDragging = false;
        let startX = 0;
        let scrollStart = 0;

        card.addEventListener(
            "pointerdown",
            (event) => {
                isDragging = true;
                startX = event.clientX;
                scrollStart = card.scrollLeft;

                card.setPointerCapture(
                    event.pointerId
                );

                card.classList.add(
                    "is-dragging"
                );
            }
        );

        card.addEventListener(
            "pointermove",
            (event) => {
                if (!isDragging) {
                    return;
                }

                const distance =
                    event.clientX - startX;

                card.scrollLeft =
                    scrollStart - distance;
            }
        );

        function stopDragging() {
            isDragging = false;

            card.classList.remove(
                "is-dragging"
            );
        }

        card.addEventListener(
            "pointerup",
            stopDragging
        );

        card.addEventListener(
            "pointercancel",
            stopDragging
        );

        card.addEventListener(
            "pointerleave",
            stopDragging
        );
    });

    /* =========================================
       ACCESSIBILITY
       ========================================= */

    swipeCards.forEach((card) => {
        card.setAttribute(
            "tabindex",
            "0"
        );

        card.addEventListener(
            "keydown",
            (event) => {

                if (event.key === "ArrowRight") {
                    card.scrollBy({
                        left: 300,
                        behavior: "smooth"
                    });
                }

                if (event.key === "ArrowLeft") {
                    card.scrollBy({
                        left: -300,
                        behavior: "smooth"
                    });
                }
            }
        );
    });

    /* =========================================
       INITIALIZE
       ========================================= */

    loadUser();

    console.log(
        "Dashboard initialized successfully."
    );
});