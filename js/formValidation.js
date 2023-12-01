const yFirstNameElement = document.getElementById("yFirstName");
const yLastNameElement = document.getElementById("yLastName");
const yParentFirstNameElement = document.getElementById("yParentFirstName");
const yParentLastNameElement = document.getElementById("yParentLastName");
const yParentPhoneNumberElement = document.getElementById("yParentPhoneNumber");
const yParentEmailElement = document.getElementById("yParentEmail");
const stArrowsPersonalDetails = document.getElementsByClassName(
  "st-arrow_personal-detail"
);
const stArrowsParentDetails = document.getElementsByClassName(
  "st-arrow_parent-details"
);

const stArrowsBilling = document.getElementsByClassName("st-arrow_billing");
const stArrowsStripe = document.getElementsByClassName("st-arrow_stripe");
//ENABLE BUTTON
function enableButton(elementId, stArrows, buttonId, fillCondition) {
  const button = document.getElementById(buttonId);
  const fillValue = fillCondition ? "#fff" : "#737373";

  button.disabled = !fillCondition;

  for (let i = 0; i < stArrows.length; i++) {
    stArrows[i].style.fill = fillValue;
  }
}

function checkAndEnableButtons() {
  enableButton(
    "personal",
    stArrowsPersonalDetails,
    "personalDetails",
    yFirstNameElement.value.length !== 0 || yLastNameElement.value.length !== 0
  );

  enableButton(
    "parent",
    stArrowsParentDetails,
    "btnSubmit",
    yParentFirstNameElement.value.length !== 0 ||
      yParentLastNameElement.value.length !== 0 ||
      yParentPhoneNumberElement.value.length !== 0 ||
      yParentEmailElement.value.length !== 0
  );
}

//PARENT FORM

function formValidation() {
  const phoneNumberPattern = /^\(?(\d{3})\)?[- ]?(\d{3})[- ]?(\d{4})$/;

  yFirstName = yFirstNameElement.value;
  yFirstNameElement.setCustomValidity("");
  if (yFirstNameElement.checkValidity()) {
    if (yFirstName.length === 1) {
      yFirstNameElement.setCustomValidity("Please enter a valid name.");
      yFirstNameElement.reportValidity();
    } else if (yFirstName.length === 0) {
      yFirstNameElement.setCustomValidity("This field is required.");
      yFirstNameElement.reportValidity();
    }
  } else {
    yFirstNameElement.setCustomValidity("This field is required.hahaha");
    yFirstNameElement.reportValidity();
  }

  yLastNameElement.setCustomValidity("");
  yLastName = yLastNameElement.value;
  if (yLastNameElement.checkValidity()) {
    if (yLastName.length === 1) {
      yLastNameElement.setCustomValidity("Please enter a valid name.");
      yLastNameElement.reportValidity();
    } else if (yLastName.length === 0) {
      yLastNameElement.setCustomValidity("This field is required.");
      yLastNameElement.reportValidity();
    }
  } else {
    yLastNameElement.setCustomValidity("This field is required.");
    yLastNameElement.reportValidity();
  }

  yParentLastNameElement.setCustomValidity("");
  yParentLastName = yParentLastNameElement.value;
  if (yParentLastNameElement.checkValidity()) {
    if (yParentLastName.length === 1) {
      yParentLastNameElement.setCustomValidity("Please enter a valid name.");
      yParentLastNameElement.reportValidity();
    } else if (yParentLastName.length === 0) {
      yParentLastNameElement.setCustomValidity("This field is required.");
      yParentLastNameElement.reportValidity();
    }
  } else {
    yParentLastNameElement.setCustomValidity("This field is required.");
    yParentLastNameElement.reportValidity();
  }

  // Clear previous custom validity
  yParentPhoneNumberElement.setCustomValidity("");
  // Get the phone number input value
  const yParentPhoneNumber = yParentPhoneNumberElement.value;
  // Check if the phone number is empty
  if (yParentPhoneNumber.length === 0) {
    yParentPhoneNumberElement.setCustomValidity("This field is required.");
    yParentPhoneNumberElement.reportValidity();
  } else if (!phoneNumberPattern.test(yParentPhoneNumber)) {
    yParentPhoneNumberElement.setCustomValidity(
      "Please enter a valid phone number."
    );
    yParentPhoneNumberElement.reportValidity();
  }

  yParentEmailElement.setCustomValidity("");
  yParentEmail = yParentEmailElement.value;
  if (yParentEmailElement.checkValidity()) {
    if (yParentEmail.length === 1) {
      yParentEmailElement.setCustomValidity("Please enter a email.");

      yParentEmailElement.reportValidity();
    } else if (yParentEmail.length === 0) {
      yParentEmailElement.setCustomValidity("This field is required.");

      yParentEmailElement.reportValidity();
    }
  } else {
    // Set a custom validity message
    yParentEmailElement.setCustomValidity("Please enter a valid email.");

    // Trigger validation to display the custom message
    yParentEmailElement.reportValidity();
  }
}
function clearInvalidMessage() {
  checkAndEnableButtons();
  yFirstNameElement.setCustomValidity("");
  yLastNameElement.setCustomValidity("");
  yParentEmailElement.setCustomValidity("");
  yParentPhoneNumberElement.setCustomValidity("");
  yParentLastNameElement.setCustomValidity("");
  yParentFirstNameElement.setCustomValidity("");
}

function updateTimer() {
  let remainingTime = localStorage.getItem("remainingTime");

  if (remainingTime === null) {
    // If no remaining time is stored, set it to 15 minutes
    remainingTime = 15 * 60;
  } else {
    // If remaining time is stored, convert it to a number
    remainingTime = parseInt(remainingTime);
  }

  const timerDisplay = document.getElementById("grizzlyTimer");

  function displayTime() {
    let minutes = Math.floor(remainingTime / 60);
    let seconds = remainingTime % 60;
    timerDisplay.textContent = `${String(minutes).padStart(2, "0")}:${String(
      seconds
    ).padStart(2, "0")}`;
  }

  displayTime();

  let timerInterval = setInterval(function () {
    remainingTime--;

    localStorage.setItem("remainingTime", remainingTime);

    displayTime();

    if (remainingTime <= 0) {
      clearInterval(timerInterval);
      //timerDisplay.textContent = "Time is up!";
      localStorage.removeItem("remainingTime");
    }
  }, 1000);
}
window.onload = updateTimer;
