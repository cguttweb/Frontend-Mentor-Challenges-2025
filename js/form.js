const firstName = document.getElementById('firstName')
const lastName = document.getElementById('lastName')
const email = document.getElementById('email')
const message = document.getElementById('message')
const consent = document.getElementById('consent')
const errors = document.querySelectorAll('.error')
const inputs = document.querySelectorAll('input[type="text"], input[type="email"], textarea')
const submitButton = document.querySelector('.submitBtn')

function showErrors() {
  errors.forEach(error => error.style.display = 'block');
  inputs.forEach(input => input.style.border = '1px solid red');
}

function showThankYouMessage() {
  document.querySelector('.ty-msg').style.display = 'block'
}

function validateForm() {

  if (firstName.value == '' || lastName.value == '' || email.value == '' || message.value == '') {
    showErrors()
    return false
  }
  else if (consent.checked === false) {
    document.querySelector('.consent-error').style.display = 'block'
  }

  // showThankYouMessage()

}

submitButton.addEventListener('click', function (event) {
  event.preventDefault();
  validateForm();
});