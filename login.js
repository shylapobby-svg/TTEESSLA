document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("loginForm");

    if (!form) {
        return;
    }

    const emailInput = document.getElementById("loginEmail");
    const passwordInput = document.getElementById("loginPassword");
    const passwordToggle = document.getElementById("loginPasswordToggle");
    const rememberMe = document.getElementById("rememberMe");
    const forgotPassword = document.getElementById("forgotPassword");
    const loginButton = document.getElementById("loginButton");
    const statusMessage = document.getElementById("loginStatus");

    const emailError = document.getElementById("loginEmailError");
    const passwordError = document.getElementById("loginPasswordError");

    const MAX_ATTEMPTS = 3;
    const LOCKOUT_TIME = 60 * 1000;

    function showError(element, message) {
        if (element) {
            element.textContent = message;
        }
    }

    function clearError(element) {
        if (element) {
            element.textContent = "";
        }
    }

    function showStatus(message, type = "") {
        if (!statusMessage) {
            return;
        }

        statusMessage.textContent = message;
        statusMessage.className = "login-status";

        if (type) {
            statusMessage.classList.add(type);
        }
    }

    function isValidEmail(value) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
    }

    function getStoredProfile() {
        try {
            const profile = sessionStorage.getItem(
                "teslaAccountProfile"
            );

            return profile ? JSON.parse(profile) : null;
        } catch (error) {
            console.error("Unable to read demo account profile.", error);
            return null;
        }
    }

    function getAttempts() {
        return Number(
            sessionStorage.getItem("teslaLoginAttempts") || "0"
        );
    }

    function getLockoutTime() {
        return Number(
            sessionStorage.getItem("teslaLoginLockout") || "0"
        );
    }

    function isLockedOut() {
        const lockoutTime = getLockoutTime();

        if (!lockoutTime) {
            return false;
        }

        if (Date.now() < lockoutTime) {
            return true;
        }

        sessionStorage.removeItem("teslaLoginAttempts");
        sessionStorage.removeItem("teslaLoginLockout");

        return false;
    }

    function getRemainingLockoutSeconds() {
        const remaining =
            getLockoutTime() - Date.now();

        return Math.max(
            0,
            Math.ceil(remaining / 1000)
        );
    }

    function lockLogin() {
        sessionStorage.setItem(
            "teslaLoginAttempts",
            String(MAX_ATTEMPTS)
        );

        sessionStorage.setItem(
            "teslaLoginLockout",
            String(Date.now() + LOCKOUT_TIME)
        );

        loginButton.disabled = true;

        showStatus(
            "Too many unsuccessful attempts. Please try again in 60 seconds.",
            "error"
        );
    }

    function clearLoginAttempts() {
        sessionStorage.removeItem("teslaLoginAttempts");
        sessionStorage.removeItem("teslaLoginLockout");
    }

    function validateInputs() {
        let valid = true;

        clearError(emailError);
        clearError(passwordError);
        showStatus("");

        const email = emailInput.value.trim();
        const password = passwordInput.value;

        if (!email) {
            showError(
                emailError,
                "Please enter your email address."
            );
            valid = false;
        } else if (!isValidEmail(email)) {
            showError(
                emailError,
                "Please enter a valid email address."
            );
            valid = false;
        }

        if (!password) {
            showError(
                passwordError,
                "Please enter your password."
            );
            valid = false;
        }

        return valid;
    }

    /* Restore email from account creation */
    const savedEmail = sessionStorage.getItem(
        "teslaLoginEmail"
    );

    if (savedEmail && !emailInput.value) {
        emailInput.value = savedEmail;
    }

    /* Password visibility */
    if (passwordToggle) {
        passwordToggle.addEventListener("click", () => {
            const showingPassword =
                passwordInput.type === "text";

            passwordInput.type =
                showingPassword ? "password" : "text";

            passwordToggle.textContent =
                showingPassword ? "Show" : "Hide";

            passwordToggle.setAttribute(
                "aria-label",
                showingPassword
                    ? "Show password"
                    : "Hide password"
            );
        });
    }

    /* Clear errors while typing */
    emailInput.addEventListener("input", () => {
        clearError(emailError);
        showStatus("");
    });

    passwordInput.addEventListener("input", () => {
        clearError(passwordError);
        showStatus("");
    });

    /* Demo forgot-password action */
    if (forgotPassword) {
        forgotPassword.addEventListener("click", (event) => {
            event.preventDefault();

            showStatus(
                "Password recovery will be connected when backend authentication is added.",
                "error"
            );
        });
    }

    /* Login */
    form.addEventListener("submit", (event) => {
        event.preventDefault();

        if (isLockedOut()) {
            showStatus(
                `Too many unsuccessful attempts. Please try again in ${getRemainingLockoutSeconds()} seconds.`,
                "error"
            );

            loginButton.disabled = true;
            return;
        }

        if (!validateInputs()) {
            return;
        }

        const profile = getStoredProfile();
        const enteredEmail =
            emailInput.value.trim().toLowerCase();

        /*
         * FRONTEND DEMO ONLY
         *
         * Passwords are intentionally NOT stored or compared here.
         * Real authentication will be handled securely by the backend.
         *
         * For now, a created demo account can proceed using its
         * registered email address.
         */
        if (!profile) {
            showStatus(
                "No demo account was found. Please create an account first.",
                "error"
            );

            return;
        }

        if (enteredEmail !== profile.email.toLowerCase()) {
            const attempts = getAttempts() + 1;

            sessionStorage.setItem(
                "teslaLoginAttempts",
                String(attempts)
            );

            if (attempts >= MAX_ATTEMPTS) {
                lockLogin();
            } else {
                const remaining =
                    MAX_ATTEMPTS - attempts;

                showStatus(
                    `Email does not match the demo account. ${remaining} attempt${remaining === 1 ? "" : "s"} remaining.`,
                    "error"
                );
            }

            return;
        }

        clearLoginAttempts();

        sessionStorage.setItem(
            "teslaLoggedIn",
            "true"
        );

        sessionStorage.setItem(
            "teslaCurrentUser",
            JSON.stringify(profile)
        );

        if (rememberMe && rememberMe.checked) {
            localStorage.setItem(
                "teslaRememberedEmail",
                enteredEmail
            );
        } else {
            localStorage.removeItem(
                "teslaRememberedEmail"
            );
        }

        loginButton.disabled = true;
        loginButton.textContent = "Signing In...";

        showStatus(
            "Sign in successful. Opening your dashboard...",
            "success"
        );

        setTimeout(() => {
            window.location.href = "dashboard.html";
        }, 900);
    });

    /* Restore remembered email */
    const rememberedEmail = localStorage.getItem(
        "teslaRememberedEmail"
    );

    if (rememberedEmail && !emailInput.value) {
        emailInput.value = rememberedEmail;

        if (rememberMe) {
            rememberMe.checked = true;
        }
    }

    /* Check existing lockout on page load */
    if (isLockedOut()) {
        loginButton.disabled = true;

        showStatus(
            `Too many unsuccessful attempts. Please try again in ${getRemainingLockoutSeconds()} seconds.`,
            "error"
        );

        const lockoutTimer = setInterval(() => {
            if (!isLockedOut()) {
                clearInterval(lockoutTimer);

                loginButton.disabled = false;

                showStatus(
                    "You can try signing in again.",
                    "success"
                );
            } else {
                showStatus(
                    `Too many unsuccessful attempts. Please try again in ${getRemainingLockoutSeconds()} seconds.`,
                    "error"
                );
            }
        }, 1000);
    }

    console.log("Login page initialized.");
});