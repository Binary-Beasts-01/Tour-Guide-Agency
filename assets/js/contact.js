const cFNameField = document.querySelector(
  '#contact-section input[name=fname]'
);
const cLNameField = document.querySelector(
  '#contact-section input[name=lname]'
);
const cEmailField = document.querySelector(
  '#contact-section input[name=email]'
);
const cPhoneField = document.querySelector(
  '#contact-section input[name=phone]'
);
const cMessageArea = document.querySelector('#contact-section .text-area');
const cSubmit = document.querySelector('#contact-section #contact-submit');

cSubmit.addEventListener('click', (e) => {
  e.preventDefault();
  clearError(cFNameField);
  clearError(cLNameField);
  clearError(cEmailField);
  clearError(cPhoneField);
  clearError(cMessageArea);
  if (!validateForm(INPUT_TYPE.name, cFNameField.value)) {
    displayError('Invalid first name format!', cFNameField, null);
    return;
  }
  if (!validateForm(INPUT_TYPE.name, cLNameField.value)) {
    displayError('Invalid last name format!', cLNameField, null);
    return;
  }
  if (!validateForm(INPUT_TYPE.email, cEmailField.value)) {
    console.log('object');
    displayError('Invalid email format!', cEmailField, null);
    return;
  }
  if (!validateForm(INPUT_TYPE.phone, cPhoneField)) {
    displayError('Passowrd must be of length 8 or above!', cPhoneField, null);
    return;
  }
});
