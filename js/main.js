$(document).ready(function () {
  // BUTTON NEXT STARTS

  $(".btn-next").on("click", function () {
    var currentStepNum = $("#checkout-progress").data("current-step");
    var nextStepNum = currentStepNum + 1;
    var currentStep = $(".step.step-" + currentStepNum);
    var nextStep = $(".step.step-" + nextStepNum);
    var progressBar = $("#checkout-progress");
    var currentSection = $("#section" + currentStepNum);
    var nextSection = $("#section" + nextStepNum);
    var prevStepNum = currentStepNum - 1;
    var prevStep = $(".step.step-" + prevStepNum);
    const userEmailElement = $("#eMail");
    const userEmail = userEmailElement.val();
    let isAnyInputEmpty = false; // Variable to track if any input is empty
    const inputValues = [];
    const inputElements = currentSection.find(".get-input");
    const $fieldError = currentSection.find(".input-field-error");

    if (currentStepNum > 0) {
      $(".nav-logo").fadeOut(400, function () {
        $(".nav-logo").css({
          margin: "0",
          "text-align": "right",
        });
        $(".previous-button, .nav-logo").fadeIn(400);
      });
    }

    if (userEmail !== "") {
      $("#yEmail").val(userEmail);
    }

    inputElements.each(function (e) {
      const $this = $(this);
      const inputValue = $(this).val();
      const inputType = $(this).prop("type");
      const inputID = $(this).prop("id") || "";
      let inputName = $(this).prop("name");
      inputValues.push(inputValue);

      const showError = (errorMessage) => {
        isAnyInputEmpty = true;
        console.error(errorMessage);
      };
      switch (inputType) {
        case "text":
          if (inputID === "birthDate") {
            const today = new Date();
            const birthDate = $("#birthDate").val();
            const inputDate = new Date(birthDate);
            const gradYear = $("#gradYear").val();

            if (
              (birthDate || gradYear) &&
              !isNaN(inputDate.getTime()) &&
              inputDate <= today &&
              today.getFullYear() - inputDate.getFullYear() >= 5 &&
              !isNaN(gradYear) &&
              gradYear >= new Date().getFullYear()
            ) {
              // Valid input
            } else {
              showError("Invalid birthdate or graduation year.");
              //isAnyInputEmpty = true;
            }
          } else if (
            inputID === "questionEc1" ||
            inputID === "questionEc2" ||
            inputID === "questionEc3"
          ) {
            if (inputValue === "") {
              showError(`The field "${inputID}" is required.`);
              //isAnyInputEmpty = true;
            }
          } else {
            if (inputValue.length <= 1) {
              showError(`Please enter a valid value for field "${inputID}".`);
              //isAnyInputEmpty = true;
            }
          }
          break;

        case "email":
          const emailPattern = /^[\w\.-]+@[a-zA-Z\d\.-]+\.[a-zA-Z]{1,}$/;
          if (!emailPattern.test(inputValue)) {
            showError("Please enter a valid email.");
            isAnyInputEmpty = true;
          }
          break;

        case "tel":
          const phoneNumberPattern =
            /^(\([0-9]{3}\)|[0-9]{3})[\s\-]?[\0-9]{3}[\s\-]?[0-9]{4}$/;
          //const yPhoneNumber = $("#yPhoneNumber").val();
          const yParentPhoneNumber = $("#yParentPhoneNumber").val();
          if (yParentPhoneNumber === "") {
            showError("Please enter a valid phone number.");
            //isAnyInputEmpty = true;
          } else if (!phoneNumberPattern.test(yParentPhoneNumber)) {
            showError("Please enter a valid phone number.");
          }
          break;

        case "file":
          const fileUpload = $("#fileUpload").val();
          if (fileUpload === "" || !fileUploadValid) {
            showError("Please upload a valid file.");
            //isAnyInputEmpty = true;
          }
          break;

        case "radio":
          const selectedScale = $('input[name="getScale"]:checked').val();
          const selectedBrand = $('input[name="getBrand"]:checked').val();
          const selectedInterview = $(
            'input[name="getInterview"]:checked'
          ).val();
          const selectedPayment = $('input[name="getPayment"]:checked').val();

          if (inputName === "getScale") {
            if (!selectedScale) {
              showError("Please select a scale.");
            }
          } else if (inputName === "getBrand") {
            if (!selectedBrand) {
              showError("Please select a brand.");
            }
          } else if (inputName === "getInterview") {
            if (!selectedInterview) {
              showError("Please select a Yes or No.");
            }
          } else if (inputName === "getPayment") {
            if (!selectedPayment) {
              showError("Please select a Yes or No.");
            }
          }
          break;

        default:
          showError(`Invalid input type for field "${inputID}".`);
      }
    });

    if (!isAnyInputEmpty) {
      $(".btn-prev").removeClass("disabled");
      $fieldError.text("");
      currentSection.fadeOut(400, function () {
        nextSection.fadeIn(400);
      });

      $(".btn-next").fadeOut(300, function () {
        if (nextStepNum === 14) {
          $(this).fadeOut(400, function () {
            $(".btn-submit").fadeIn(400);
            $(".btn-next").fadeOut(400);
          });
        } else {
          $(".btn-next").fadeIn(600);
          //$(".btn-next").prop("disabled", true);
        }
      });

      $(".checkout-progress")
        .removeClass(".step-" + currentStepNum)
        .addClass(".step-" + (currentStepNum + 1));

      currentStep.removeClass("active").addClass("valid");

      prevStep.find(".round-center").removeClass("active");

      currentStep.removeClass("active").addClass("valid");

      currentStep.addClass("active");

      nextStep.addClass("active");

      currentStep.find(".round-center").addClass("active");

      progressBar
        .removeAttr("class")
        .addClass("step-" + nextStepNum)
        .data("current-step", nextStepNum);
    }
  });

  // BUTTON NEXT ENDS

  // BUTTON PREVIOUS STARTS

  $(".btn-prev").on("click", function () {
    var currentStepNum = $("#checkout-progress").data("current-step");
    var prevStepNum = currentStepNum - 1;
    var newStepNum = currentStepNum - 2;
    var currentStep = $(".step.step-" + currentStepNum);
    var prevStep = $(".step.step-" + prevStepNum);
    var progressBar = $("#checkout-progress");
    var newStep = $(".step.step-" + newStepNum);
    console.log(currentStepNum);
    $(".btn-next").removeClass("disabled");
    $("#section" + currentStepNum).toggle();
    $("#section" + prevStepNum).toggle();

    if (currentStepNum === 14) {
      $(".btn-submit").toggle();
      $(".btn-next").toggle();
    }
    if (currentStepNum === 1) {
      $(this).addClass("disabled");

      $(".previous-button").fadeOut(400);

      $(".nav-logo").fadeOut(400, function () {
        if ($(window).width() <= 576) {
          $(".nav-logo").css({
            margin: "0 auto",
            "text-align": "center",
          });
        } else {
          $(".nav-logo").css({
            margin: "0",
            "text-align": "center",
          });
        }

        $(".nav-logo").fadeIn(400);
      });

      $(".section1").fadeIn(400);

      prevStep.addClass("active").removeClass("valid");
      return false;
    }

    if (prevStepNum === 1) {
      $(this).addClass("disabled");
    }

    $(".checkout-progress")
      .removeClass(".step-" + currentStepNum)
      .addClass(".step-" + prevStepNum);

    currentStep.removeClass("active");

    prevStep.find("span").removeClass("opaque");

    prevStep.find(".round-center").removeClass("active");

    prevStep.addClass("active").removeClass("valid");

    newStep.find(".round-center").addClass("active");

    progressBar
      .removeAttr("class")
      .addClass("step-" + prevStepNum)
      .data("current-step", prevStepNum);
  });

  // BUTTON PREVIOUS ENDS

  // BUTTON GRIZZLY FORM STARTS

  $("#grizzlyForm").on("keypress", function (e) {
    if (e.which === 13) {
      e.preventDefault();
    }
  });

  // TIMER PERCENTAGE STARTS

  $(".btn-please").click(function () {
    $(".get-billing").fadeOut(400);
    $(".modal").fadeOut(400);
    $(".overlay").fadeOut(400);
    $(".get-verification").fadeIn(800);
    let timerInterval;

    // Start the countdown timer when the form is submitted
    let count = 1;
    timerInterval = setInterval(() => {
      countdown(count);
      count++;

      if (count > 100) {
        // Stop the timer when count exceeds 100
        clearInterval(timerInterval);
      }
    }, 20);
  });

  $(".btn-close").click(function () {
    $(".get-billing").fadeOut(400);
    $(".modal").fadeOut(400);
    $(".overlay").fadeOut(400);
    $(".get-verification").fadeIn(800);
    let timerInterval;

    // Start the countdown timer when the form is submitted
    let count = 1;
    timerInterval = setInterval(() => {
      countdown(count);
      count++;

      if (count > 100) {
        // Stop the timer when count exceeds 100
        clearInterval(timerInterval);
      }
    }, 20);
  });

  function countdown(count) {
    const realTimeCountElement = document.getElementById("submissionPercent");

    if (count <= 100) {
      // Update the real-time count element
      realTimeCountElement.textContent = `${count}%`;
      if (count === 100) {
        window.location.href = "/landing.html";
        //window.location.href = "/landing.html";
      }
    } else {
      clearInterval(timerInterval);
      //window.location.href = "/landing.html";
    }
  }
});
