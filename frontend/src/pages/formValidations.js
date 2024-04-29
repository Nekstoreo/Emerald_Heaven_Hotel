export function emailValidate(event) {
  var emailField = document.getElementById("emailId");
  var email = event.target.value; // Obtener el valor del campo de entrada
  var pattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
  if (email.match(pattern)) {
    emailField.classList.add("valid");
    emailField.classList.remove("invalid");
  } else {
    emailField.classList.add("invalid");
    emailField.classList.remove("valid");
  }
}

export function numberValidate(event) {
  var numberField = document.getElementById("phoneNumber");
  var number = event.target.value; // Obtener el valor del campo de entrada
  var pattern = /^[0-9]{10}$/;
  if (number.match(pattern)) {
    numberField.classList.add("valid");
    numberField.classList.remove("invalid");
  } else {
    numberField.classList.add("invalid");
    numberField.classList.remove("valid");
  }
}

export function checkOutDateValidation(event) {
  var checkOutDate = document.getElementsById("date-output");
  var checkOut = event.target.value;
  var checkIn = document.getElementById("date-input").value;
  if (checkOut < checkIn) {
    checkOutDate.classList.add("invalid");
    checkOutDate.classList.remove("valid");
  } else {
    checkOutDate.classList.add("valid");
    checkOutDate.classList.remove("invalid");
  }
}
