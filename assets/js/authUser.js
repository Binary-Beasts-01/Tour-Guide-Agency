// const formBox = document.querySelectorAll('.form-container .form input');
const loginBtn = document.querySelector('#sign-in-btn');
const registerBtn = document.querySelector('#register-btn');

const lEmailField = document.querySelector('.form-login input[name=email]');
const lPasswordField = document.querySelector(
  '.form-login input[name=password]'
);

const errorDiv = document.querySelector('.error-div');

const rNameField = document.querySelector('.form-register input[name=name]');
const rEmailField = document.querySelector('.form-register input[name=email]');
const rPasswordField = document.querySelector(
  '.form-register input[name=password]'
);
const rCpasswordField = document.querySelector(
  '.form-register input[name=cpassword]'
);
const rRoleField = document.querySelector('.form-register select');

loginBtn.addEventListener('click', (e) => {
  e.preventDefault();
  login(lEmailField.value, lPasswordField.value);
});

registerBtn.addEventListener('click', (e) => {
  e.preventDefault();

  clearError(rNameField);
  clearError(rEmailField);
  clearError(rPasswordField);

  let emailVal = rEmailField.value;
  let nameVal = rNameField.value;
  let passVal = rPasswordField.value;
  if (!validateForm(INPUT_TYPE.name, nameVal)) {
    displayError('Invalid username format!', rNameField, null);
    return;
  }
  if (!validateForm(INPUT_TYPE.email, emailVal)) {
    console.log('object');
    displayError('Invalid email format!', rEmailField, null);
    return;
  }
  if (!validateForm(INPUT_TYPE.password, passVal)) {
    displayError(
      'Passowrd must be of length 8 or above!',
      rPasswordField,
      null
    );
    return;
  }
  if (rRoleField.value != 'user' && rRoleField.value != 'guide') {
    displayError('Role must be chosen!', rRoleField, null);
    return;
  }
  if (passVal != rCpasswordField.value) {
    displayError("Password doesn't match!", rCpasswordField, null);
    return;
  }
  register(nameVal, emailVal, rRoleField.value, rPasswordField.value);
});

function register(name, email, role, password) {
  name = name.toLowerCase();
  email = email.toLowerCase();
  db.transaction('rw', db.users, function () {
    db.users
      .add({ name, email, role, password })
      .catch((e) => {
        console.log('Error adding');
      })
      .then((r) => {
        if (r) {
          formContainer.parentElement.classList.remove('form-anim-l');
          formContainer.parentElement.classList.add('form-anim-r');
          console.log('Registration Success!');
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

function login(email, password) {
  email = email.trim().toLowerCase();
  password = password.trim();
  db.transaction('r', db.users, function () {
    db.users
      .get({ email, password })
      .catch((e) => {
        console.log('Error getting');
      })
      .then((r) => {
        if (r) {
          if (r.role == 'admin') {
            window.location.replace('admin.html');
          } else if (r.role == 'guide') {
            window.location.replace('guideDetail.html');
          } else {
            localStorage.setItem(
              'user',
              JSON.stringify({id: r.id, name: r.name, email: r.email })
            );
            window.location.reload();
          }
          console.log('Login success');
        } else {
          console.log('Login failure');
          errorDiv.style.display = 'block';
          errorDiv.style.color = '#C62828';
          errorDiv.innerHTML = `The email and password you entered
                did not match our records. Please double-check
                and try again.
                `;
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
