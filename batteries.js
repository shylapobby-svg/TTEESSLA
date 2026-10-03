document.addEventListener("DOMContentLoaded", () => {
    "use strict";

    /* =========================================================
       HELPERS
       ========================================================= */

    const getElement = (id) => document.getElementById(id);

    const formatCurrency = (value) => {
        const number = Number(value) || 0;

        return new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD",
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        }).format(number);
    };

    const formatNumber = (value, decimals = 1) => {
        return Number(value || 0).toLocaleString("en-US", {
            minimumFractionDigits: decimals,
            maximumFractionDigits: decimals
        });
    };

    /* =========================================================
       BATTERY CHARGING CALCULATOR
       ========================================================= */

    const batteryCapacity = getElement("batteryCapacity");
    const currentCharge = getElement("currentCharge");
    const targetCharge = getElement("targetCharge");
    const chargingPower = getElement("chargingPower");
    const electricityRate = getElement("electricityRate");
    const calculateCharging = getElement("calculateCharging");

    const energyNeeded = getElement("energyNeeded");
    const chargingTime = getElement("chargingTime");
    const chargingCost = getElement("chargingCost");

    function calculateChargingDetails() {
        const capacity = Number(batteryCapacity?.value) || 0;
        const current = Number(currentCharge?.value) || 0;
        const target = Number(targetCharge?.value) || 0;
        const power = Number(chargingPower?.value) || 0;
        const rate = Number(electricityRate?.value) || 0;

        if (capacity <= 0) {
            alert("Please enter a valid battery capacity.");
            batteryCapacity?.focus();
            return;
        }

        if (power <= 0) {
            alert("Please enter a valid charging power.");
            chargingPower?.focus();
            return;
        }

        if (current < 0 || current > 100) {
            alert("Current charge must be between 0% and 100%.");
            currentCharge?.focus();
            return;
        }

        if (target < 0 || target > 100) {
            alert("Target charge must be between 0% and 100%.");
            targetCharge?.focus();
            return;
        }

        if (target <= current) {
            alert("Target charge must be greater than current charge.");
            targetCharge?.focus();
            return;
        }

        const chargeDifference = target - current;

        /*
         * Energy required:
         * Battery capacity × percentage still required.
         */
        const requiredEnergy =
            capacity * (chargeDifference / 100);

        /*
         * Theoretical charging time.
         * This is an estimate and does not account for
         * charging losses, temperature, tapering, etc.
         */
        const hours =
            requiredEnergy / power;

        const minutes = hours * 60;

        /*
         * Estimated cost.
         */
        const estimatedCost =
            requiredEnergy * rate;

        if (energyNeeded) {
            energyNeeded.textContent =
                `${formatNumber(requiredEnergy, 2)} kWh`;
        }

        if (chargingTime) {
            if (hours >= 1) {
                const wholeHours = Math.floor(hours);
                const remainingMinutes =
                    Math.round(minutes - (wholeHours * 60));

                chargingTime.textContent =
                    `${wholeHours}h ${remainingMinutes}m`;
            } else {
                chargingTime.textContent =
                    `${Math.round(minutes)} min`;
            }
        }

        if (chargingCost) {
            chargingCost.textContent =
                formatCurrency(estimatedCost);
        }
    }

    calculateCharging?.addEventListener(
        "click",
        calculateChargingDetails
    );

    /* =========================================================
       CHARGING INPUT VALIDATION
       ========================================================= */

    [batteryCapacity, currentCharge, targetCharge, chargingPower, electricityRate]
        .filter(Boolean)
        .forEach((input) => {
            input.addEventListener("input", () => {
                if (Number(input.value) < 0) {
                    input.value = 0;
                }

                if (
                    input === currentCharge ||
                    input === targetCharge
                ) {
                    if (Number(input.value) > 100) {
                        input.value = 100;
                    }
                }
            });

            input.addEventListener("keydown", (event) => {
                if (event.key === "Enter") {
                    event.preventDefault();
                    calculateChargingDetails();
                }
            });
        });

    /* =========================================================
       ENERGY SYSTEM LEASE CALCULATOR
       ========================================================= */

    const energySystemPrice =
        getElement("energySystemPrice");

    const energyLeaseTerm =
        getElement("energyLeaseTerm");

    const energyInitialPayment =
        getElement("energyInitialPayment");

    const energyRemainingBalance =
        getElement("energyRemainingBalance");

    const energyMonthlyPayment =
        getElement("energyMonthlyPayment");

    const calculateEnergyLease =
        getElement("calculateEnergyLease");

    const leaseTermButtons =
        document.querySelectorAll(".energy-lease-option");

    let selectedEnergyLeaseTerm = 6;

    /* =========================================================
       LEASE TERM SELECTION
       ========================================================= */

    function updateLeaseTermButtons() {
        leaseTermButtons.forEach((button) => {
            const term = Number(button.dataset.term);

            button.classList.toggle(
                "active",
                term === selectedEnergyLeaseTerm
            );

            button.setAttribute(
                "aria-pressed",
                term === selectedEnergyLeaseTerm
                    ? "true"
                    : "false"
            );
        });
    }

    leaseTermButtons.forEach((button) => {
        button.addEventListener("click", () => {
            const term = Number(button.dataset.term);

            if (!term || term <= 0) {
                return;
            }

            selectedEnergyLeaseTerm = term;

            if (energyLeaseTerm) {
                energyLeaseTerm.value = term;
            }

            updateLeaseTermButtons();
            calculateEnergyLeaseDetails();
        });
    });

    /* =========================================================
       LEASE CALCULATION
       ========================================================= */

    function calculateEnergyLeaseDetails() {
        const price =
            Number(energySystemPrice?.value) || 0;

        const term =
            selectedEnergyLeaseTerm ||
            Number(energyLeaseTerm?.value) ||
            6;

        if (price <= 0) {
            if (energyInitialPayment) {
                energyInitialPayment.textContent =
                    formatCurrency(0);
            }

            if (energyRemainingBalance) {
                energyRemainingBalance.textContent =
                    formatCurrency(0);
            }

            if (energyMonthlyPayment) {
                energyMonthlyPayment.textContent =
                    formatCurrency(0);
            }

            return;
        }

        /*
         * Per project requirements:
         * Initial lease payment = 50% of entered price.
         */
        const initialPayment = price * 0.50;

        const remainingBalance =
            price - initialPayment;

        const monthlyPayment =
            remainingBalance / term;

        if (energyInitialPayment) {
            energyInitialPayment.textContent =
                formatCurrency(initialPayment);
        }

        if (energyRemainingBalance) {
            energyRemainingBalance.textContent =
                formatCurrency(remainingBalance);
        }

        if (energyMonthlyPayment) {
            energyMonthlyPayment.textContent =
                formatCurrency(monthlyPayment);
        }
    }

    calculateEnergyLease?.addEventListener(
        "click",
        calculateEnergyLeaseDetails
    );

    energySystemPrice?.addEventListener(
        "input",
        calculateEnergyLeaseDetails
    );

    energyLeaseTerm?.addEventListener(
        "change",
        () => {
            const selected =
                Number(energyLeaseTerm.value);

            if (
                selected === 6 ||
                selected === 12 ||
                selected === 18
            ) {
                selectedEnergyLeaseTerm = selected;
                updateLeaseTermButtons();
                calculateEnergyLeaseDetails();
            }
        }
    );

    /* =========================================================
       PRODUCT CARD INTERACTION
       ========================================================= */

    const productCards =
        document.querySelectorAll(".battery-product-card");

    productCards.forEach((card) => {
        card.setAttribute("tabindex", "0");

        card.addEventListener("keydown", (event) => {
            if (
                event.key === "Enter" ||
                event.key === " "
            ) {
                event.preventDefault();

                card.scrollIntoView({
                    behavior: "smooth",
                    block: "center"
                });
            }
        });
    });

    /* =========================================================
       SCROLL TO CALCULATOR
       ========================================================= */

    const calculatorLinks =
        document.querySelectorAll(
            'a[href="#battery-calculator"], ' +
            'a[href="#calculator"]'
        );

    calculatorLinks.forEach((link) => {
        link.addEventListener("click", (event) => {
            const target =
                getElement("battery-calculator") ||
                getElement("calculator");

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

    /* =========================================================
       FORM ENTER SUPPORT
       ========================================================= */

    const chargingInputs = [
        batteryCapacity,
        currentCharge,
        targetCharge,
        chargingPower,
        electricityRate
    ].filter(Boolean);

    chargingInputs.forEach((input) => {
        input.addEventListener("keydown", (event) => {
            if (event.key === "Enter") {
                calculateChargingDetails();
            }
        });
    });

    /* =========================================================
       INITIAL STATE
       ========================================================= */

    updateLeaseTermButtons();

    /*
     * Run the lease calculator once so the result area
     * starts in a consistent state.
     */
    calculateEnergyLeaseDetails();

    /*
     * Default charging values are intentionally not forced
     * into the user's form. Results remain blank/zero until
     * the user enters their own values and calculates.
     */

    console.log(
        "Batteries page initialized successfully."
    );
});