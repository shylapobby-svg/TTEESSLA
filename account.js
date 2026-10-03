document.addEventListener("DOMContentLoaded", () => {
    const accountLinks = document.querySelectorAll(
        '.account-option-card, .account-menu-content a'
    );

    accountLinks.forEach((link) => {
        link.addEventListener("click", () => {
            const destination = link.getAttribute("href");

            if (destination && destination !== "#") {
                console.log(`Account navigation: ${destination}`);
            }
        });
    });

    const createAccountLinks = document.querySelectorAll(
        'a[href="create-account.html"]'
    );

    createAccountLinks.forEach((link) => {
        link.addEventListener("click", () => {
            sessionStorage.setItem(
                "accountEntryPoint",
                "account-page"
            );
        });
    });

    const signInLinks = document.querySelectorAll(
        'a[href="login.html"]'
    );

    signInLinks.forEach((link) => {
        link.addEventListener("click", () => {
            sessionStorage.setItem(
                "accountEntryPoint",
                "account-page"
            );
        });
    });

    console.log("Account page initialized.");
});