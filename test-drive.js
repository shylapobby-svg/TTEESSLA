/* =========================================================
   TEST DRIVE PAGE JAVASCRIPT
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

  const form = document.getElementById("testDriveForm");

  if (!form) {
    return;
  }


  /* =======================================================
     ELEMENTS
     ======================================================= */

  const steps = document.querySelectorAll(".test-drive-step");
  const progressSteps = document.querySelectorAll(".progress-step");

  const nextButtons = document.querySelectorAll(".next-step");
  const previousButtons = document.querySelectorAll(".previous-step");

  const vehicleInputs = document.querySelectorAll(
    'input[name="vehicleModel"]'
  );

  const appointmentDate =
    document.getElementById("appointmentDate");

  const driverLicense =
    document.getElementById("driverLicense");


  /* =======================================================
     CURRENT STEP
     ======================================================= */

  let currentStep = 1;


  /* =======================================================
     SET MINIMUM APPOINTMENT DATE
     ======================================================= */

  if (appointmentDate) {

    const today = new Date();

    const year = today.getFullYear();

    const month = String(
      today.getMonth() + 1
    ).padStart(2, "0");

    const day = String(
      today.getDate()
    ).padStart(2, "0");

    appointmentDate.min =
      `${year}-${month}-${day}`;
  }


  /* =======================================================
     SHOW STEP
     ======================================================= */

  function showStep(stepNumber) {

    currentStep = stepNumber;

    steps.forEach((step) => {

      const stepValue =
        Number(
          step.dataset.stepContent
        );

      step.classList.toggle(
        "active",
        stepValue === stepNumber
      );

    });


    progressSteps.forEach((step) => {

      const progressValue =
        Number(
          step.dataset.step
        );

      step.classList.toggle(
        "active",
        progressValue === stepNumber
      );

      step.classList.toggle(
        "completed",
        progressValue < stepNumber
      );

    });


    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });

  }


  /* =======================================================
     VALIDATION HELPERS
     ======================================================= */

  function setError(
    elementId,
    message
  ) {

    const errorElement =
      document.getElementById(elementId);

    if (errorElement) {
      errorElement.textContent = message;
    }

  }


  function clearErrors() {

    document
      .querySelectorAll(".field-error")
      .forEach((element) => {
        element.textContent = "";
      });

  }


  /* =======================================================
     STEP 1 VALIDATION
     ======================================================= */

  function validatePersonalInformation() {

    clearErrors();

    let valid = true;


    const firstName =
      document.getElementById("firstName");

    const lastName =
      document.getElementById("lastName");

    const email =
      document.getElementById("email");

    const phone =
      document.getElementById("phone");

    const country =
      document.getElementById("country");


    if (!firstName.value.trim()) {

      setError(
        "firstNameError",
        "Please enter your first name."
      );

      valid = false;
    }


    if (!lastName.value.trim()) {

      setError(
        "lastNameError",
        "Please enter your last name."
      );

      valid = false;
    }


    const emailPattern =
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


    if (!email.value.trim()) {

      setError(
        "emailError",
        "Please enter your email address."
      );

      valid = false;

    } else if (
      !emailPattern.test(email.value.trim())
    ) {

      setError(
        "emailError",
        "Please enter a valid email address."
      );

      valid = false;
    }


    const phoneDigits =
      phone.value.replace(/\D/g, "");


    if (!phone.value.trim()) {

      setError(
        "phoneError",
        "Please enter your phone number."
      );

      valid = false;

    } else if (
      phoneDigits.length < 7
    ) {

      setError(
        "phoneError",
        "Please enter a valid phone number."
      );

      valid = false;
    }


    if (!country.value) {

      setError(
        "countryError",
        "Please select your country."
      );

      valid = false;
    }


    return valid;

  }


  /* =======================================================
     STEP 2 VALIDATION
     ======================================================= */

  function validateVehicleSelection() {

    const selectedVehicle =
      document.querySelector(
        'input[name="vehicleModel"]:checked'
      );

    const year =
      document.getElementById("vehicleYear");

    const color =
      document.getElementById("vehicleColor");


    if (!selectedVehicle) {

      alert(
        "Please select a Tesla model."
      );

      return false;
    }


    if (!year.value) {

      alert(
        "Please select a model year."
      );

      year.focus();

      return false;
    }


    if (!color.value) {

      alert(
        "Please select a preferred color."
      );

      color.focus();

      return false;
    }


    return true;

  }


  /* =======================================================
     STEP 3 VALIDATION
     ======================================================= */

  function validateAppointment() {

    const location =
      document.getElementById("location");

    const time =
      document.getElementById("appointmentTime");

    const terms =
      document.getElementById("testDriveTerms");


    if (!location.value) {

      alert(
        "Please select a preferred location."
      );

      location.focus();

      return false;
    }


    if (!appointmentDate.value) {

      alert(
        "Please select a preferred date."
      );

      appointmentDate.focus();

      return false;
    }


    const selectedDate =
      new Date(
        `${appointmentDate.value}T00:00:00`
      );

    const today =
      new Date();

    today.setHours(
      0,
      0,
      0,
      0
    );


    if (selectedDate < today) {

      alert(
        "Please select a current or future date."
      );

      appointmentDate.focus();

      return false;
    }


    if (!time.value) {

      alert(
        "Please select a preferred time."
      );

      time.focus();

      return false;
    }


    if (!terms.checked) {

      alert(
        "Please confirm the information and contact consent."
      );

      terms.focus();

      return false;
    }


    return true;

  }


  /* =======================================================
     NEXT BUTTONS
     ======================================================= */

  nextButtons.forEach((button) => {

    button.addEventListener(
      "click",
      () => {

        const nextStep =
          Number(
            button.dataset.next
          );


        if (currentStep === 1) {

          if (
            !validatePersonalInformation()
          ) {
            return;
          }

        }


        if (currentStep === 2) {

          if (
            !validateVehicleSelection()
          ) {
            return;
          }

        }


        showStep(nextStep);

      }
    );

  });


  /* =======================================================
     PREVIOUS BUTTONS
     ======================================================= */

  previousButtons.forEach((button) => {

    button.addEventListener(
      "click",
      () => {

        const previousStep =
          Number(
            button.dataset.previous
          );

        showStep(previousStep);

      }
    );

  });


  /* =======================================================
     DRIVER'S LICENSE FILE
     ======================================================= */

  if (driverLicense) {

    driverLicense.addEventListener(
      "change",
      () => {

        const file =
          driverLicense.files[0];

        if (!file) {
          return;
        }


        const allowedTypes = [
          "image/jpeg",
          "image/png",
          "image/webp",
          "application/pdf"
        ];


        if (
          !allowedTypes.includes(
            file.type
          )
        ) {

          alert(
            "Please upload a JPG, PNG, WEBP or PDF file."
          );

          driverLicense.value = "";

          return;
        }


        const maxSize =
          10 * 1024 * 1024;


        if (file.size > maxSize) {

          alert(
            "The uploaded file must be 10 MB or smaller."
          );

          driverLicense.value = "";

          return;
        }

      }
    );

  }


  /* =======================================================
     SUBMIT FORM
     ======================================================= */

  form.addEventListener(
    "submit",
    (event) => {

      event.preventDefault();


      if (!validateAppointment()) {
        return;
      }


      const selectedVehicle =
        document.querySelector(
          'input[name="vehicleModel"]:checked'
        );


      const vehicleYear =
        document.getElementById(
          "vehicleYear"
        );


      const vehicleColor =
        document.getElementById(
          "vehicleColor"
        );


      const location =
        document.getElementById(
          "location"
        );


      const time =
        document.getElementById(
          "appointmentTime"
        );


      const notes =
        document.getElementById(
          "additionalNotes"
        );


      /* ================================================
         CREATE FRONTEND REQUEST DATA
         ================================================ */

      const testDriveData = {

        requestId:
          `TD-${Date.now().toString().slice(-8)}`,

        firstName:
          document.getElementById(
            "firstName"
          ).value.trim(),

        lastName:
          document.getElementById(
            "lastName"
          ).value.trim(),

        email:
          document.getElementById(
            "email"
          ).value.trim(),

        phone:
          document.getElementById(
            "phone"
          ).value.trim(),

        country:
          document.getElementById(
            "country"
          ).value,

        vehicle:
          selectedVehicle.value,

        year:
          vehicleYear.value,

        color:
          vehicleColor.value,

        location:
          location.value,

        date:
          appointmentDate.value,

        time:
          time.value,

        notes:
          notes.value.trim(),

        submittedAt:
          new Date().toISOString()

      };


      /* ================================================
         FRONTEND STORAGE
         ================================================ */

      sessionStorage.setItem(
        "teslaTestDriveData",
        JSON.stringify(
          testDriveData
        )
      );


      /* ================================================
         UPDATE CONFIRMATION
         ================================================ */

      const confirmationVehicle =
        document.getElementById(
          "confirmationVehicle"
        );

      const confirmationYear =
        document.getElementById(
          "confirmationYear"
        );

      const confirmationColor =
        document.getElementById(
          "confirmationColor"
        );

      const confirmationLocation =
        document.getElementById(
          "confirmationLocation"
        );

      const confirmationDate =
        document.getElementById(
          "confirmationDate"
        );

      const confirmationTime =
        document.getElementById(
          "confirmationTime"
        );


      if (confirmationVehicle) {

        confirmationVehicle.textContent =
          testDriveData.vehicle;

      }


      if (confirmationYear) {

        confirmationYear.textContent =
          testDriveData.year;

      }


      if (confirmationColor) {

        confirmationColor.textContent =
          testDriveData.color;

      }


      if (confirmationLocation) {

        confirmationLocation.textContent =
          testDriveData.location;

      }


      if (confirmationDate) {

        const formattedDate =
          new Date(
            `${testDriveData.date}T00:00:00`
          );

        confirmationDate.textContent =
          formattedDate.toLocaleDateString(
            undefined,
            {
              weekday: "long",
              year: "numeric",
              month: "long",
              day: "numeric"
            }
          );

      }


      if (confirmationTime) {

        confirmationTime.textContent =
          testDriveData.time;

      }


      /* ================================================
         MOVE TO CONFIRMATION
         ================================================ */

      showStep(4);


      console.log(
        "Test drive request created:",
        testDriveData
      );

    }
  );


  /* =======================================================
     VEHICLE SELECTION VISUAL FEEDBACK
     ======================================================= */

  vehicleInputs.forEach((input) => {

    input.addEventListener(
      "change",
      () => {

        vehicleInputs.forEach(
          (vehicleInput) => {

            const card =
              vehicleInput.closest(
                ".vehicle-choice"
              );

            if (!card) {
              return;
            }

            card.classList.toggle(
              "selected",
              vehicleInput.checked
            );

          }
        );

      }
    );

  });


  /* =======================================================
     INITIALIZE
     ======================================================= */

  showStep(1);

  console.log(
    "Test Drive page initialized."
  );

});