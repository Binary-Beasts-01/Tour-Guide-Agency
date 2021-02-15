// const formBox = document.querySelectorAll('.form-container .form input');
const loginBtn = document.querySelector('#sign-in-btn');
const registerBtn = document.querySelector('#register-btn');

const lEmailField = document.querySelector('.form-login input[name=email]');
const lPasswordField = document.querySelector(
  '.form-login input[name=password]'
);
const rNameField = document.querySelector('.form-register input[name=name]');
const rEmailField = document.querySelector('.form-register input[name=email]');
const rPasswordField = document.querySelector(
  '.form-register input[name=password]'
);
const rCpasswordField = document.querySelector(
  '.form-register input[name=cpassword]'
);
loginBtn.addEventListener('click', (e) => {
  e.preventDefault();
  login(emailVal, lPasswordField.value);
});

registerBtn.addEventListener('click', (e) => {
  e.preventDefault();

  clearError(rNameField);
  clearError(rEmailField);
  clearError(rPasswordField);

  let emailVal = rEmailField.value;
  let nameVal = rNameField.value;
  let passVal = rPasswordField;
  if (!validateForm(INPUT_TYPE.name, nameVal)) {
    displayError('Invalid username format!', rNameField, null);
    return;
  }
  if (!validateForm(INPUT_TYPE.email, emailVal)) {
    console.log('object');
    displayError('Invalid email format!', rEmailField, null);
    return;
  }
  if (!validateForm(INPUT_TYPE.password, rPasswordField)) {
    displayError(
      'Passowrd must be of length 8 or above!',
      rPasswordField,
      null
    );
    return;
  }
  if (passVal != rCpasswordField.value) {
    displayError("Password doesn't match!", rCpasswordField, null);
    return;
  }
  register(nameVal, emailVal, rPasswordField.value);
});

function register(name, email, password) {
  db.transaction('rw', db.users, function () {
    db.users
      .add({ name, email, password })
      .catch((e) => {
        console.log('Error adding');
      })
      .then((r) => {
        if (r) console.log('Registration Success!');
      });
  })
    .then(() => {
      console.log('Transaction complete');
    })
    .catch(() => {
      console.log('Transaction fail');
    });
}

function login(email, password) {
  db.transaction('r', db.users, function () {
    db.users
      .get([email, password])
      .catch((e) => {
        console.log('Error getting');
      })
      .then((r) => {
        if (r) {
          console.log('Login success');
        } else {
          console.log('Login failure');
        }
      });
  })
    .then(() => {
      console.log('Transaction complete');
    })
    .catch(() => {
      console.log('Transaction fail');
    });
}
