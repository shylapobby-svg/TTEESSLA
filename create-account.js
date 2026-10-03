document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("createAccountForm");

    if (!form) {
        return;
    }

    const firstName = document.getElementById("firstName");
    const lastName = document.getElementById("lastName");
    const email = document.getElementById("accountEmail");
    const phone = document.getElementById("phone");
    const password = document.getElementById("accountPassword");
    const passwordToggle = document.getElementById("passwordToggle");
    const confirmPassword = document.getElementById("confirmPassword");
    const acceptTerms = document.getElementById("acceptTerms");
    const submitButton = document.getElementById("createAccountButton");
    const statusMessage = document.getElementById("accountFormStatus");

    const passwordStrength = document.getElementById("passwordStrength");
    const strengthBars = passwordStrength
        ? passwordStrength.querySelectorAll(".strength-bar")
        : [];

    const errors = {
        firstName: document.getElementById("firstNameError"),
        lastName: document.getElementById("lastNameError"),
        email: document.getElementById("accountEmailError"),
        phone: document.getElementById("phoneError"),
        password: document.getElementById("accountPasswordError"),
        confirmPassword: document.getElementById("confirmPasswordError"),
        terms: document.getElementById("termsError")
    };

    function showError(field, message) {
        if (field) {
            field.textContent = message;
        }
    }

    function clearError(field) {
        if (field) {
            field.textContent = "";
        }
    }

    function clearAllErrors() {
        Object.values(errors).forEach((error) => {
            clearError(error);
        });

        if (statusMessage) {
            statusMessage.textContent = "";
            statusMessage.className = "account-form-status";
        }
    }

    function isValidEmail(value) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
    }

    function isValidPhone(value) {
        if (!value.trim()) {
            return true;
        }

        const digits = value.replace(/\D/g, "");
        return digits.length >= 7 && digits.length <= 15;
    }

    function getPasswordScore(value) {
        let score = 0;

        if (value.length >= 8) score++;
        if (/[A-Z]/.test(value)) score++;
        if (/[a-z]/.test(value)) score++;
        if (/[0-9]/.test(value)) score++;
        if (/[^A-Za-z0-9]/.test(value)) score++;

        return score;
    }

    function updatePasswordStrength() {
        if (!passwordStrength || !strengthBars.length) {
            return;
        }

        const value = password.value;
        const score = getPasswordScore(value);

        strengthBars.forEach((bar) => {
            bar.classList.remove(
                "weak",
                "medium",
                "strong",
                "very-strong"
            );
        });

        if (!value) {
            return;
        }

        let strengthClass = "weak";

        if (score >= 5) {
            strengthClass = "very-strong";
        } else if (score >= 4) {
            strengthClass = "strong";
        } else if (score >= 3) {
            strengthClass = "medium";
        }

        strengthBars.forEach((bar, index) => {
            if (index < score) {
                bar.classList.add(strengthClass);
            }
        });
    }

    function validateForm() {
        let valid = true;

        clearAllErrors();

        if (!firstName.value.trim()) {
            showError(errors.firstName, "Please enter your first name.");
            valid = false;
        }

        if (!lastName.value.trim()) {
            showError(errors.lastName, "Please enter your last name.");
            valid = false;
        }

        if (!email.value.trim()) {
            showError(errors.email, "Please enter your email address.");
            valid = false;
        } else if (!isValidEmail(email.value.trim())) {
            showError(errors.email, "Please enter a valid email address.");
            valid = false;
        }

        if (!isValidPhone(phone.value)) {
            showError(
                errors.phone,
                "Please enter a valid phone number."
            );
            valid = false;
        }

        const passwordValue = password.value;

        if (!passwordValue) {
            showError(
                errors.password,
                "Please create a password."
            );
            valid = false;
        } else if (getPasswordScore(passwordValue) < 5) {
            showError(
                errors.password,
                "Use at least 8 characters, including uppercase, lowercase, a number, and a special character."
            );
            valid = false;
        }

        if (!confirmPassword.value) {
            showError(
                errors.confirmPassword,
                "Please confirm your password."
            );
            valid = false;
        } else if (passwordValue !== confirmPassword.value) {
            showError(
                errors.confirmPassword,
                "Passwords do not match."
            );
            valid = false;
        }

        if (!acceptTerms.checked) {
            showError(
                errors.terms,
                "Please accept the terms to continue."
            );
            valid = false;
        }

        return valid;
    }

    if (passwordToggle) {
        passwordToggle.addEventListener("click", () => {
            const isPassword = password.type === "password";

            password.type = isPassword ? "text" : "password";
            passwordToggle.textContent = isPassword
                ? "Hide"
                : "Show";
            passwordToggle.setAttribute(
                "aria-label",
                isPassword
                    ? "Hide password"
                    : "Show password"
            );
        });
    }

    password.addEventListener("input", () => {
        updatePasswordStrength();
        clearError(errors.password);
    });

    confirmPassword.addEventListener("input", () => {
        clearError(errors.confirmPassword);
    });

    firstName.addEventListener("input", () => {
        clearError(errors.firstName);
    });

    lastName.addEventListener("input", () => {
        clearError(errors.lastName);
    });

    email.addEventListener("input", () => {
        clearError(errors.email);
    });

    phone.addEventListener("input", () => {
        clearError(errors.phone);
    });

    acceptTerms.addEventListener("change", () => {
        clearError(errors.terms);
    });

    form.addEventListener("submit", (event) => {
        event.preventDefault();

        if (!validateForm()) {
            return;
        }

        submitButton.disabled = true;
        submitButton.textContent = "Creating account...";

        const accountProfile = {
            firstName: firstName.value.trim(),
            lastName: lastName.value.trim(),
            email: email.value.trim().toLowerCase(),
            phone: phone.value.trim(),
            createdAt: new Date().toISOString()
        };

        /*
         * FRONTEND DEMO ONLY
         * No real password is stored here.
         * Real authentication will be connected to the backend later.
         */
        sessionStorage.setItem(
            "teslaAccountProfile",
            JSON.stringify(accountProfile)
        );

        sessionStorage.setItem(
            "teslaAccountCreated",
            "true"
        );

        sessionStorage.setItem(
            "teslaLoginEmail",
            accountProfile.email
        );

        if (statusMessage) {
            statusMessage.textContent =
                "Account created successfully. Redirecting to sign in...";
            statusMessage.className =
                "account-form-status success";
        }

        setTimeout(() => {
            window.location.href = "login.html";
        }, 1000);
    });

    updatePasswordStrength();

    console.log("Create account page initialized.");
});