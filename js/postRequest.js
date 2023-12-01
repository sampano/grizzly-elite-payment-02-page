$("#btnSubmit").click(function (e) {
  e.preventDefault();
  const customerFirstName = $("#yFirstName").val();
  const customerLastName = $("#yLastName").val();
  const parentFirstName = $("#yParentFirstName").val();
  const parentLastName = $("#yParentLastName").val();
  const parentEmail = $("#yParentEmail").val();
  const parentPhoneNumber = $("#yParentPhoneNumber").val();

  if (
    customerFirstName === "" ||
    customerLastName === "" ||
    parentFirstName === "" ||
    parentLastName === "" ||
    parentEmail === "" ||
    parentPhoneNumber === ""
  ) {
  } else {
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    const phoneNumberPattern = /^\(?(\d{3})\)?[- ]?(\d{3})[- ]?(\d{4})$/;

    if (!emailPattern.test(parentEmail)) {
    } else if (customerFirstName.length <= 1) {
    } else if (customerLastName.length <= 1) {
    } else if (parentFirstName.length <= 1) {
    } else if (parentLastName.length <= 1) {
    } else if (parentEmail.length <= 1) {
    } else if (!phoneNumberPattern.test(parentPhoneNumber)) {
    } else {
      //==============POST METHOD HERE==================
      const formData = new FormData();
      formData.append("customerFirstName", customerFirstName);
      formData.append("customerLastName", customerLastName);
      formData.append("parentFirstName", parentFirstName);
      formData.append("parentLastName", parentLastName);
      formData.append("parentEmail", parentEmail);
      formData.append("parentPhoneNumber", parentPhoneNumber);
      // Append

      // Make the AJAX POST request
      $.ajax({
        type: "POST",
        url: "your-server-endpoint-url",
        data: formData,
        processData: false,
        contentType: false,
        success: function (response) {
          // Request was successful
          console.log(response);
        },
        error: function (xhr, status, error) {
          // Request failed
          console.error(status + ": " + error);
        },
      });
    }
  }
});
