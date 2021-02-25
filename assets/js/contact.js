import {create} from './utils/crudOperations.js';

const cFNameField = document.querySelector('input[name=fname]');
const cLNameField = document.querySelector('input[name=lname]');
const cEmailField = document.querySelector('input[name=email]');
const cPhoneField = document.querySelector('input[name=phone]');
const cMessageArea = document.querySelector('.text-area');
const cSubmit = document.querySelector('#form-submit');

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
  if (cLNameField) {
    if (!validateForm(INPUT_TYPE.name, cLNameField.value)) {
      displayError('Invalid last name format!', cLNameField, null);
      return;
    }
  }
  if (!validateForm(INPUT_TYPE.email, cEmailField.value)) {
    console.log('object');
    displayError('Invalid email format!', cEmailField, null);
    return;
  }
  if (cPhoneField) {
    if (!validateForm(INPUT_TYPE.phone, cPhoneField.value)) {
      displayError('Passowrd must be of length 8 or above!', cPhoneField, null);
      return;
    }
  }

  let data = {
    username: cFNameField.value + cLNameField.value,
    email: cEmailField.value,
    phone: cPhoneField.value,
    message: cMessageArea.value,
  };
  storeToDb(data);
});

// adding fake data to display
storeToDb(  {
  username: "Surafel Kassahun",
  email: "se.surafel.kassahun@gmail.com",
  phone: "0949024607",
  message: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Eius, dolorem molestiae? Ipsam iste rem dicta asperiores vel. Doloremque, repellendus dicta labore ratione architecto voluptate similique commodi enim, exercitationem fugit porro?"
});

function storeToDb(data) {
  create('comments', data);
}
