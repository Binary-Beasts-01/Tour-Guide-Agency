// set date dynamically
var datePicker = document.querySelector('.slide-banner input[type="date"]');
let today = new Date().toISOString().substr(0, 10);
datePicker.value = today;
const destinationContainer = document.querySelector("#tour_destination");
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

function viewLess() {
  destinationContainer.innerHTML = '';
  for (i = 0; i < 6; i++) {
    addTourToDestinationPage(i + 1);
  }
}

viewLess();

async function addTourToDestinationPage(id) {

  const tourResult = async () => {
      const c = await retrieve('tour', id);
      destinationContainer.innerHTML += createDestinationContent(c);
  }
  return tourResult();

}

function createDestinationContent(r) {
  return `<div class="col-sm-6 col-xl-4">
    <article class="event-default-wrap">
        <div class="event-default">
            <figure class="event-default-image"><img
                    src="${r.image}" alt="" width="570"
                    height="370">
            </figure>
            <div class="event-default-caption"><a class="button button-xs button-primary"
                    href="../../tourDetail.html?id=${r.id}">Learn More</a></div>
        </div>
        <div class="event-default-inner">
            <h5><a class="event-default-title">${r.name}</a></h5><span
                class="event-default-price">from ${r.price} Birr</span>
        </div>
    </article>
    </div>`;
} 