document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("investmentForm");

    const firstNameInput =
        document.getElementById("investmentFirstName");

    const lastNameInput =
        document.getElementById("investmentLastName");

    const emailInput =
        document.getElementById("investmentEmail");

    const interestInput =
        document.getElementById("investmentInterest");

    const contactInput =
        document.getElementById("investmentContact");

    const messageInput =
        document.getElementById("investmentMessage");

    const termsInput =
        document.getElementById("investmentTerms");

    const status =
        document.getElementById("investmentFormStatus");

    const signOutButton =
        document.getElementById("investmentSignOut");


    /* =========================================
       LOAD EXISTING ACCOUNT INFORMATION
    ========================================== */

    const storedProfile =
        sessionStorage.getItem("teslaAccountProfile");

    if (storedProfile) {

        try {

            const profile =
                JSON.parse(storedProfile);

            if (profile.firstName) {
                firstNameInput.value =
                    profile.firstName;
            }

            if (profile.lastName) {
                lastNameInput.value =
                    profile.lastName;
            }

            if (profile.email) {
                emailInput.value =
                    profile.email;
            }

        } catch (error) {

            console.error(
                "Unable to load account profile:",
                error
            );
        }
    }


    /* =========================================
       FIELD HELPERS
    ========================================== */

    function setError(input, errorId, message) {

        const error =
            document.getElementById(errorId);

        if (error) {
            error.textContent = message || "";
        }

        if (input) {
            input.setAttribute(
                "aria-invalid",
                message ? "true" : "false"
            );
        }
    }


    function clearErrors() {

        setError(
            firstNameInput,
            "investmentFirstNameError",
            ""
        );

        setError(
            lastNameInput,
            "investmentLastNameError",
            ""
        );

        setError(
            emailInput,
            "investmentEmailError",
            ""
        );

        setError(
            interestInput,
            "investmentInterestError",
            ""
        );

        setError(
            contactInput,
            "investmentContactError",
            ""
        );

        setError(
            termsInput,
            "investmentTermsError",
            ""
        );
    }


    /* =========================================
       VALIDATION
    ========================================== */

    function validateForm() {

        clearErrors();

        let valid = true;

        const firstName =
            firstNameInput.value.trim();

        const lastName =
            lastNameInput.value.trim();

        const email =
            emailInput.value.trim();

        const interest =
            interestInput.value;

        const contactMethod =
            contactInput.value;


        if (!firstName) {

            setError(
                firstNameInput,
                "investmentFirstNameError",
                "Please enter your first name."
            );

            valid = false;
        }


        if (!lastName) {

            setError(
                lastNameInput,
                "investmentLastNameError",
                "Please enter your last name."
            );

            valid = false;
        }


        if (!email) {

            setError(
                emailInput,
                "investmentEmailError",
                "Please enter your email address."
            );

            valid = false;

        } else {

            const emailPattern =
                /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

            if (!emailPattern.test(email)) {

                setError(
                    emailInput,
                    "investmentEmailError",
                    "Please enter a valid email address."
                );

                valid = false;
            }
        }


        if (!interest) {

            setError(
                interestInput,
                "investmentInterestError",
                "Please select an investment interest."
            );

            valid = false;
        }


        if (!contactMethod) {

            setError(
                contactInput,
                "investmentContactError",
                "Please select a contact method."
            );

            valid = false;
        }


        if (!termsInput.checked) {

            setError(
                termsInput,
                "investmentTermsError",
                "Please acknowledge the demonstration notice."
            );

            valid = false;
        }


        return valid;
    }


    /* =========================================
       FORM SUBMISSION
    ========================================== */

    form.addEventListener("submit", (event) => {

        event.preventDefault();

        status.textContent = "";
        status.className =
            "investment-form-status";

        if (!validateForm()) {

            status.textContent =
                "Please review the highlighted fields.";

            status.className =
                "investment-form-status error";

            return;
        }


        const requestData = {
            firstName:
                firstNameInput.value.trim(),

            lastName:
                lastNameInput.value.trim(),

            email:
                emailInput.value.trim(),

            interest:
                interestInput.value,

            contactMethod:
                contactInput.value,

            message:
                messageInput.value.trim(),

            submittedAt:
                new Date().toISOString()
        };


        /* =====================================
           FRONTEND DEMO STORAGE
        ====================================== */

        sessionStorage.setItem(
            "teslaInvestmentRequest",
            JSON.stringify(requestData)
        );


        status.textContent =
            "Your investment information request has been recorded for this frontend demonstration.";

        status.className =
            "investment-form-status success";


        form.reset();


        /* Restore account information after reset */

        if (storedProfile) {

            try {

                const profile =
                    JSON.parse(storedProfile);

                firstNameInput.value =
                    profile.firstName || "";

                lastNameInput.value =
                    profile.lastName || "";

                emailInput.value =
                    profile.email || "";

            } catch (error) {

                console.error(
                    "Unable to restore profile fields:",
                    error
                );
            }
        }


        termsInput.checked = false;

        console.log(
            "Investment request stored in sessionStorage."
        );
    });


    /* =========================================
       CLEAR INDIVIDUAL ERRORS
    ========================================== */

    [
        firstNameInput,
        lastNameInput,
        emailInput,
        interestInput,
        contactInput,
        termsInput
    ].forEach((input) => {

        input.addEventListener("input", () => {

            status.textContent = "";
            status.className =
                "investment-form-status";

        });

        input.addEventListener("change", () => {

            status.textContent = "";
            status.className =
                "investment-form-status";

        });
    });


    /* =========================================
       SMOOTH INTERNAL LINKS
    ========================================== */

    document
        .querySelectorAll('a[href^="#"]')
        .forEach((link) => {

            link.addEventListener("click", (event) => {

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
            });
        });


    /* =========================================
       SIGN OUT
    ========================================== */

    if (signOutButton) {

        signOutButton.addEventListener(
            "click",
            () => {

                sessionStorage.removeItem(
                    "teslaLoggedIn"
                );

                sessionStorage.removeItem(
                    "teslaCurrentUser"
                );

                window.location.href =
                    "login.html";
            }
        );
    }


    /* =========================================
       ACCESSIBILITY
    ========================================== */

    form.addEventListener("keydown", (event) => {

        if (
            event.key === "Enter" &&
            event.target.tagName === "TEXTAREA"
        ) {
            return;
        }
    });


    console.log("Investment page initialized.");
});