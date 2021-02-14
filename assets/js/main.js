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
    overlay.style.display = "block";
    overlayEffect = false;
  } else {
    overlay.style.display = "none";
    overlayEffect = true;
  }
});

overlay.addEventListener('click', (e) => {
  sideBar.classList.remove('slide');
  overlay.style.display = "none";
  overlayEffect = true;
})

window.addEventListener('scroll', (e) => {
  let navHeight = Number(headerBar.getBoundingClientRect().bottom);
  if (window.pageYOffset > navHeight) {
    headerBar.classList.add('fixed-nav');
  } else {
    headerBar.classList.remove('fixed-nav');
  }
});

