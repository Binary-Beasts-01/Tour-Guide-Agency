import {db} from './database.js';
import {retrieve, retrieveAll} from './utils/crudOperations.js';

// set date dynamically
var datePicker = document.querySelector('.slide-banner input[type="date"]');
let today = new Date().toISOString().substr(0, 10);
datePicker.value = today;
const destinationContainer = document.querySelector('#tour_destination');
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

const checkAvailablity = document.querySelector('#check_availablity');
const dateInput = document.querySelector('#check_date');
const placeInput = document.querySelector('#check_place');
const availableResult = document.querySelector('#available-result');
var resultFound = false;
checkAvailablity.addEventListener('click', (e) => {
  e.preventDefault();
  getAll('tour');
});

async function getAll(table) {
  availableResult.innerHTML = '';
  let r1 = await db[table]
    .where('start_date')
    .equalsIgnoreCase(dateInput.value);

  let r2 = await db[table].filter((t) => {
    const yes = placeInput.value
      .split(' ')
      .filter((value) =>
        t.name.toLowerCase().split(' ').includes(value.toLowerCase())
      );
    return yes.length == 0 ? false : true;
  });

  availableResult.previousElementSibling.innerHTML = `Search result for tour '${placeInput.value}'`;
  availableResult.innerHTML = '';

  r1.each((tour) => {
    resultFound = true;
    populateSearch(tour);
  }).catch((error) => {
    console.error(error.stack || error);
  });

  r2.each((tour) => {
    resultFound = true;
    populateSearch(tour);
  }).catch((error) => {
    console.error(error.stack || error);
  });
}

function populateSearch(tour) {
  availableResult.innerHTML += `<li class="nav-item">
  <h3>Tour: ${tour.name}</h3>
  <p>Price: ${tour.price == '' ? 'Unkown' : tour.price}</p>
  <a href="tourDetail.html?id=${tour.id}">Visit</a></li>`;
}

function viewLess() {
  destinationContainer.innerHTML = '';
  for (let i = 0; i < 6; i++) {
    addTourToDestinationPage(i + 1);
  }
}

viewLess();

async function addTourToDestinationPage(id) {
  const tourResult = async () => {
    const c = await retrieve('tour', id);
    destinationContainer.innerHTML += createDestinationContent(c);
  };
  return tourResult();
}

function createDestinationContent(r) {
  return `<div class="col-sm-6 col-xl-4">
    <article class="event-default-wrap">
        <div class="event-default">
            <figure class="event-default-image"><img
                    src="${r.image == '' ? '' : r.image}" alt="" width="570"
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

document.addEventListener('DOMContentLoaded', addTestimonal);
const testiContent = document.querySelector('#list-testimonal');
// Testimonial section
function testimonalContent(testimonal) {
  for (let i = 0; i < testimonal.length; i++) {
    const testi = testimonal[i];
    console.log(testi);
    if (i == 3) break;
    testiContent.innerHTML += `<div class="item carousel-item ${
      i == 0 ? 'active' : ''
    }">
    <div class="img-box">
        <img src="./assets/images/gettyimages-120503242-2048x2048.jpg" alt="">
    </div>
    <div class="testi-content">
        <p> ${testi.message}</p>
        <p class="overview fw-bold">${testi.username}</p>
        <p class="overview-occupation">Tourist</p>
    </div>
  </div>`;
  }
}

async function addTestimonal() {
  const tourResult = async () => {
    const c = await retrieveAll('comments');
    testimonalContent(c);
  };
  return tourResult();
}
