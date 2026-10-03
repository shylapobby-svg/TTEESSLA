/* =========================================================
   COOKIE SETTINGS
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {
    const functionalCookies = document.getElementById("functionalCookies");
    const analyticsCookies = document.getElementById("analyticsCookies");
    const marketingCookies = document.getElementById("marketingCookies");

    const saveButton = document.getElementById("saveCookiePreferences");
    const rejectButton = document.getElementById("rejectOptionalCookies");
    const acceptAllButton = document.getElementById("acceptAllCookies");
    const statusMessage = document.getElementById("cookieSettingsStatus");

    const STORAGE_KEY = "teslaCookiePreferences";
    const ACCEPTED_KEY = "teslaCookiesAccepted";

    function showStatus(message) {
        if (!statusMessage) return;

        statusMessage.textContent = message;
        statusMessage.classList.add("success");

        window.setTimeout(() => {
            statusMessage.textContent = "";
            statusMessage.classList.remove("success");
        }, 4000);
    }

    function getPreferences() {
        try {
            const saved = localStorage.getItem(STORAGE_KEY);

            if (!saved) {
                return {
                    functional: true,
                    analytics: false,
                    marketing: false
                };
            }

            const parsed = JSON.parse(saved);

            return {
                functional: parsed.functional === true,
                analytics: parsed.analytics === true,
                marketing: parsed.marketing === true
            };
        } catch (error) {
            console.warn("Unable to read cookie preferences.", error);

            return {
                functional: true,
                analytics: false,
                marketing: false
            };
        }
    }

    function loadPreferences() {
        const preferences = getPreferences();

        if (functionalCookies) {
            functionalCookies.checked = preferences.functional;
        }

        if (analyticsCookies) {
            analyticsCookies.checked = preferences.analytics;
        }

        if (marketingCookies) {
            marketingCookies.checked = preferences.marketing;
        }
    }

    function savePreferences(preferences, message = "Cookie preferences saved.") {
        try {
            localStorage.setItem(
                STORAGE_KEY,
                JSON.stringify(preferences)
            );

            localStorage.setItem(ACCEPTED_KEY, "true");

            showStatus(message);

            console.log("Cookie preferences:", preferences);
        } catch (error) {
            console.error("Unable to save cookie preferences.", error);
            showStatus("Your preferences could not be saved on this device.");
        }
    }

    function getCurrentPreferences() {
        return {
            functional: functionalCookies
                ? functionalCookies.checked
                : true,

            analytics: analyticsCookies
                ? analyticsCookies.checked
                : false,

            marketing: marketingCookies
                ? marketingCookies.checked
                : false
        };
    }

    /* Save selected preferences */

    if (saveButton) {
        saveButton.addEventListener("click", () => {
            savePreferences(
                getCurrentPreferences(),
                "Your cookie preferences have been saved."
            );
        });
    }

    /* Reject optional cookies */

    if (rejectButton) {
        rejectButton.addEventListener("click", () => {
            const preferences = {
                functional: false,
                analytics: false,
                marketing: false
            };

            if (functionalCookies) {
                functionalCookies.checked = false;
            }

            if (analyticsCookies) {
                analyticsCookies.checked = false;
            }

            if (marketingCookies) {
                marketingCookies.checked = false;
            }

            savePreferences(
                preferences,
                "Optional cookies have been disabled."
            );
        });
    }

    /* Accept all cookies */

    if (acceptAllButton) {
        acceptAllButton.addEventListener("click", () => {
            const preferences = {
                functional: true,
                analytics: true,
                marketing: true
            };

            if (functionalCookies) {
                functionalCookies.checked = true;
            }

            if (analyticsCookies) {
                analyticsCookies.checked = true;
            }

            if (marketingCookies) {
                marketingCookies.checked = true;
            }

            savePreferences(
                preferences,
                "All available cookie preferences have been accepted."
            );
        });
    }

    loadPreferences();

    /* Accessibility */

    [functionalCookies, analyticsCookies, marketingCookies].forEach(
        (control) => {
            if (!control) return;

            control.addEventListener("keydown", (event) => {
                if (event.key === "Enter" || event.key === " ") {
                    event.preventDefault();
                    control.checked = !control.checked;
                }
            });
        }
    );

    console.log("Cookie settings initialized.");
});