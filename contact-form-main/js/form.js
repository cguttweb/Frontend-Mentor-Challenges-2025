const firstName = document.getElementById('firstName');
const lastName = document.getElementById('lastName');
const email = document.getElementById('email');
const message = document.getElementById('message');
const consent = document.getElementById('consent');
const query = document.querySelectorAll('[name="query"]');
const submitButton = document.querySelector('.submitBtn');
const errors = document.querySelectorAll('.error');
const inputs = document.querySelectorAll('input[type="text"], input[type="email"], textarea');


const fieldErrorMap = [
  { field: firstName, selector: '.firstname-error' },
  { field: lastName, selector: '.lastname-error' },
  { field: email, selector: '.email-error' },
  { field: message, selector: '.message-error' },
  { field: consent, selector: '.consent-error', isCheckbox: true },
];

function setError(selector, show) {
  const el = document.querySelector(selector);
  if (el) {
    el.style.display = show ? 'block' : 'none';
  }
}

function isEmpty(input, isCheckbox = false) {
  if (isCheckbox) return !input.checked;
  return input.value.trim() === '';
}

function showThankYouMessage() {
  document.querySelector('.ty-msg').style.display = 'block';
  setTimeout(() => {
    document.querySelector('.ty-msg').style.display = 'none';
  }, 2000);
}

function validateForm() {
  let valid = true;

  // Show all errors if all fields are empty
  if (
    isEmpty(firstName) &&
    isEmpty(lastName) &&
    isEmpty(email) &&
    isEmpty(message) &&
    Array.from(query).every(isEmpty)
  ) {
    errors.forEach(error => error.style.display = 'block');
    inputs.forEach(input => input.style.border = '1px solid red');
    return false;
  }

  // Validate single fields
  fieldErrorMap.forEach(({ field, selector, isCheckbox }) => {
    if (isEmpty(field, isCheckbox)) {
      setError(selector, true);
      valid = false;
    } else {
      setError(selector, false);
    }
  });

  const anyQueryChecked = Array.from(query).some(q => q.checked);
  setError('.query-error', !anyQueryChecked);
  if (!anyQueryChecked) valid = false;

  if (!valid) return false;


  fieldErrorMap.forEach(({ field, isCheckbox, isRadio }) => {
    if (isCheckbox || isRadio) {
      field.checked = false;
    } else {
      field.value = '';
    }
  });
  query.forEach(q => q.value = '');

  errors.forEach(error => error.style.display = 'none');

  showThankYouMessage();
}

fieldErrorMap.forEach(({ field, selector, isCheckbox }) => {
  const eventType = isCheckbox ? 'change' : 'input';
  field.addEventListener(eventType, () => {
    if (!isEmpty(field, isCheckbox)) {
      setError(selector, false);
    }
  });
});

query.forEach(q => {
  q.addEventListener('change', () => {
    if (Array.from(query).some(qi => !isEmpty(qi))) {
      setError('.query-error', false);
    }
  });
});

submitButton.addEventListener('click', function (event) {
  event.preventDefault();
  validateForm();
});