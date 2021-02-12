// set date dynamically
var datePicker = document.querySelector('.slide-banner input[type="date"]');
let today = new Date().toISOString().substr(0, 10);
datePicker.value = today;

// owl carousel for news section

$('.owl-carousel').owlCarousel({
  loop: true,
  margin: 10,
  nav: false,
  autoplay: true,
  autoplayTimeout: 3000,
  dots: false,
  responsive: {
    0: {
      items: 1,
    },
    600: {
      items: 2,
    },
    1000: {
      items: 3,
    },
  },
});

// Nav bar scroll listner
// const preHeader = document.querySelector('.pre-header');
// const navBar = document.querySelector('nav');

// window.addEventListener('scroll', (e) => {
//   let navHeight = Number(navBar.getBoundingClientRect().bottom);
//   if (window.pageYOffset > navHeight) {
//     navBar.classList.add('fixed-nav');
//   } else {
//     navBar.classList.remove('fixed-nav');
//   }
// });
$(document).ready(function () {
  $('#sidebarCollapse').on('click', function () {
    $('#sidebar').toggleClass('active');
  });
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
