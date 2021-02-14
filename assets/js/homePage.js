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
