const loginBtn = document.querySelector('#sign-in-btn');
const registerBtn = document.querySelector('#register-btn');

const lEmailField = document.querySelector('.form-login input[name=email]');
const lPasswordField = document.querySelector(
  '.form-login input[name=password]'
);

const errorDiv = document.querySelector('.error-div')

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
  login(lEmailField.value, lPasswordField.value);
});

registerBtn.addEventListener('click', (e) => {
  e.preventDefault();
  register(rNameField.value, rEmailField.value, rPasswordField.value);
});

function register(name, email, password) {
  db.transaction('rw', db.users, function () {
    db.users
      .add({ name, email, password })
      .catch((e) => {
        console.log('Error adding');
      })
      .then((r) => {
        if (r){
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
  db.transaction('r', db.users, function () {
    db.users
      .get([email, password])
      .catch((e) => {
        console.log('Error getting');
      })
      .then((r) => {
        if (r) {
          console.log('Login success');
          window.location.reload
        } else {
          console.log('Login failure');
		      errorDiv.style.display = "block";
          errorDiv.style.color = "#C62828";
          errorDiv.innerHTML = 
                `The email and password you entered
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


// validation function

// error handler function

// success handler function
