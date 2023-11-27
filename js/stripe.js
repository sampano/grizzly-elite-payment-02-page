const stripe = Stripe("pk_test_TYooMQauvdEDq54NiTphI7jx");

const clientSecret =
  "pi_1Gt0RE2eZvKYlo2CL6a7GQa5_secret_nrMAwgH8OQgguiayP05ywbrc4";

const appearance = {
  theme: "night",
  variables: {
    fontFamily: "Inter, sans-serif",
    spacingUnit: "5px",
    borderRadius: "4px",
    tabSpacing: "",
    // See all possible variables below
  },
  rules: {
    ".Tab": {
      border: "1px solid #E0E6EB",
      boxShadow:
        "0px 1px 1px rgba(0, 0, 0, 0.03), 0px 3px 6px rgba(18, 42, 66, 0.02)",
    },

    ".Tab:hover": {
      color: "var(--colorText)",
    },

    ".Tab--selected": {
      borderColor: "#E0E6EB",
      boxShadow:
        "0px 1px 1px rgba(0, 0, 0, 0.03), 0px 3px 6px rgba(18, 42, 66, 0.02), 0 0 0 2px var(--colorPrimary)",
    },

    ".Input--invalid": {
      boxShadow:
        "0 1px 1px 0 rgba(0, 0, 0, 0.07), 0 0 0 2px var(--colorDanger)",
    },

    // See all supported class names and selector syntax below
  },
};
const options = { mode: "billing" };
const elements = stripe.elements({ clientSecret, appearance });
const addressElement = elements.create("address", options);
const paymentElement = elements.create("payment");
addressElement.mount("#address-element");
paymentElement.mount("#payment-element");

// const submitButton = document.getElementById("submit-payment");

// // Handle payment submission when the button is clicked
// submitButton.addEventListener("click", async function (event) {
//   event.preventDefault();

//   // Confirm the payment when the button is clicked
//   const { paymentIntent, error } = await stripe.confirmPayment({
//     elements: elements,
//     confirmParams: {
//       return_url: "https://yourwebsite.com/success",
//     },
//   });

//   if (error) {
//     // Handle errors
//     console.error("Error:", error.message);
//   } else {
//     // Payment successful, redirect or perform necessary actions
//     console.log("Payment successful:", paymentIntent);
//     // You might redirect the user to a success page here
//   }
// });
