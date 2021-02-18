// checked loggedin user
const userAvatar = document.querySelector('.user-avatar');
const userLoginBtn = document.querySelector('.login-register');
const loggedinUser = localStorage.getItem('user');
if (loggedinUser) {
  userAvatar.style.display = 'grid';
  userLoginBtn.style.display = 'none';
  userAvatar.innerHTML = JSON.parse(loggedinUser)
    .name.slice(0, 1)
    .toUpperCase();
}

// Nav bar scroll listner
const preHeader = document.querySelector('.pre-header');
const headerBar = document.querySelector('#landing-header');

// Humberger menu
const humToggle = document.querySelector('.humberger-menu');
const sideBar = document.querySelector('.sidebar');
const content = document.querySelector('.content-wrapper');
const overlay = document.querySelector('#overlay');
var overlayEffect = true;
humToggle.addEventListener('click', (e) => {
  sideBar.classList.toggle('slide');
  if (overlayEffect) {
    overlay.style.display = 'block';
    overlayEffect = false;
  } else {
    overlay.style.display = 'none';
    overlayEffect = true;
  }
});

overlay.addEventListener('click', (e) => {
  sideBar.classList.remove('slide');
  overlay.style.display = 'none';
  overlayEffect = true;
});

window.addEventListener('scroll', (e) => {
  let navHeight = Number(headerBar.getBoundingClientRect().bottom);
  if (window.pageYOffset > navHeight) {
    headerBar.classList.add('fixed-nav');
  } else {
    headerBar.classList.remove('fixed-nav');
  }
});

// Toggle account animation
const accountToggleL = document.querySelector('.account-toggle.l span');
const accountToggleR = document.querySelector('.account-toggle.r span');
const formContainer = document.querySelector('.form-container');
accountToggleL.addEventListener('click', (e) => {
  e.preventDefault();
  formContainer.parentElement.classList.add('form-anim-l');
  formContainer.parentElement.classList.remove('form-anim-r');
});
accountToggleR.addEventListener('click', (e) => {
  e.preventDefault();
  formContainer.parentElement.classList.remove('form-anim-l');
  formContainer.parentElement.classList.add('form-anim-r');
});

// logout function
userAvatar.addEventListener('click', (e) => {
  if (confirm('Are you sure you want to logout?')) {
    localStorage.removeItem('user');
    window.location.reload();
  }
});

// Search bar toggler
const searchBar = document.querySelector('.search-bar ');
const searchForm = document.querySelector('.search-form input');
const searchModal = document.querySelector('#search-m-show');
searchBar.addEventListener('click', (e) => {
  console.log('object');
  searchForm.parentElement.classList.toggle('disp-toggle');
});

searchForm.addEventListener('keyup', function (event) {
  let query = searchForm.value;
  if (event.keyCode === 13) {
    event.preventDefault();
    this.value = '';
    searchModal.click();
  }
});
