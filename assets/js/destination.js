import {create, retrieve, retrieveAll} from './utils/crudOperations.js';

const destinationContainer = document.querySelector('#tour_destination');
const priceQuery = document.querySelector('#priceQuery');
const searchQuery = document.querySelector('#searchQuery');
const viewAll = document.querySelector('#view_all_destination');

document.addEventListener("DOMContentLoaded", () => {
  create('tour', {
    name: 'Fasilades',
    location:
      'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3893.608912203207!2d37.4674458148181!3d12.608006691095168!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x164327d5bd20f365%3A0xe39869932a279b76!2sFasil%20Ghebbi!5e0!3m2!1sen!2set!4v1613643085214!5m2!1sen!2set',
    price: 480,
    image: '/assets/images/gettyimages-138178737-2048x2048.jpg',
    start_date: '2020-10-18',
    duration: 10,
    guides: [0, 1, 2]
  });
  create('tour', {
    name: 'Lalibela',
    location:
      'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d31217.341426758147!2d39.02920947093037!3d12.031974754529001!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x16413eee814f2d03%3A0xf27414e782ae4b62!2sLalibela!5e0!3m2!1sen!2set!4v1613643333778!5m2!1sen!2set',
    price: 280,
    image: '/assets/images/gettyimages-111919734-2048x2048.jpg',
    start_date: '2020-10-18',
    duration: 10,
    guides: [0, 1, 2]
  });
  create('tour', {
    name: 'Sof Umer Cave',
    location:
      'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3960.8654808078077!2d40.843027514772736!3d6.906684695009491!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x17c96479a1bf0a9f%3A0x3c49c40d45686c72!2sHolqa%20Soof%20Umar(Sof%20Omar%20Cave)!5e0!3m2!1sen!2set!4v1613643399283!5m2!1sen!2set',
    price: 550,
    image: '/assets/images/gettyimages-182174818-2048x2048.jpg',
    start_date: '2020-10-18',
    duration: 10,
    guides: [0, 1, 2]
  });
  create('tour', {
    name: 'Addis Ababa',
    location:
      'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d252230.24876688753!2d38.638058101453396!3d8.96315049448324!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x164b85cef5ab402d%3A0x8467b6b037a24d49!2sAddis%20Ababa!5e0!3m2!1sen!2set!4v1613643430719!5m2!1sen!2set',
    price: 350,
    image: '/assets/images/gettyimages-697529054-612x612.jpg',
    start_date: '2020-10-18',
    duration: 10,
    guides: [0, 1, 2]
  });
  create('tour', {
    name: 'Semen Mountains',
    location:
      'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d496943.56290337717!2d37.89909849402837!3d13.327146373282039!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x166991a064b135d5%3A0xb1833f4dff2cfeb2!2sSemien%20Mountains!5e0!3m2!1sen!2set!4v1613643498617!5m2!1sen!2set',
    price: 520,
    image: '/assets/images/gettyimages-905176238-2048x2048.jpg',
    start_date: '2020-10-18',
    duration: 10,
    guides: [0, 1, 2]
  });
  create('tour', {
    name: 'Konso',
    location:
      'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15890.074932782038!2d37.43110652688783!3d5.337476638050899!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x17bb48596943197f%3A0xe836899190241eb9!2sKonso!5e0!3m2!1sen!2set!4v1613643664875!5m2!1sen!2set',
    price: 600,
    image: '/assets/images/gettyimages-988621664-2048x2048.jpg',
    start_date: '2020-10-18',
    duration: 10,
    guides: [0, 1, 2]
  });
  viewLess();

})

viewAll.addEventListener('click', async () => {
  console.log(viewAll.innerHTML);
  if (viewAll.innerHTML.toString().trim() == 'View Less') {
    viewLess();
    viewAll.innerHTML = 'View All';
  } else {
    viewAllDestination();
    viewAll.innerHTML = 'View Less';
  }
});

searchQuery.addEventListener('onchange', filterByName);
priceQuery.addEventListener('onchange', filterByPrice);

export function viewLess() {
  destinationContainer.innerHTML = '';
  for (let i = 0; i < 6; i++) {
    addTourToDestinationPage(i + 1);
  }
}

async function viewAllDestination() {
  let destinations = await retrieveAll('tour');
  destinationContainer.innerHTML = '';
  for (destination of destinations) {
    destinationContainer.innerHTML += createDestinationContent(destination);
  }
}

async function sortByDate() {
  let destinations = await retrieveAll('tour');
  destinationContainer.innerHTML = '';
  for (destination of destinations) {
    destinationContainer.innerHTML += createDestinationContent(destination);
  }
}

export async function addTourToDestinationPage(id) {
  const tourResult = async () => {
    const c = await retrieve('tour', id);
    destinationContainer.innerHTML += createDestinationContent(c);
  };
  return tourResult();
}

export function createDestinationContent(r) {
  return `<div class="col-sm-6 col-xl-4">
    <article class="event-default-wrap">
        <div class="event-default">
            <figure class="event-default-image"><img
                    src="${r.image}" alt="" width="570"
                    height="370">
            </figure>
            <div class="event-default-caption"> 
            <a class="button button-xs button-primary" href="../../tourDetail.html?id=${r.id}">Learn More</a>
            </div>
        </div>
        <div class="event-default-inner">
            <h5><a class="event-default-title">${r.name}</a></h5><span
                class="event-default-price">from ${r.price} Birr</span>
        </div>
    </article>
    </div>`;
}

function filterByName() {
  let filter, a, txtValue;
  filter = searchQuery.value.toUpperCase();
  childs = Array.from(destinationContainer.children);
  if (filter.value == '') {
    childs.forEach(function (item) {
      item.style.display = 'block';
    });
  } else {
    childs.forEach(function (item) {
      // console.log(item)
      a = item.querySelector('.event-default-title');
      txtValue = a.innerHTML.toString().trim();
      if (txtValue.toUpperCase().indexOf(filter) > -1) {
        item.style.display = '';
      } else {
        item.style.display = 'none';
      }
    });
  }
}

function filterByPrice() {
  let filter, a, txtValue;
  filter = priceQuery.value.toString();
  childs = Array.from(destinationContainer.children);
  if (filter == '') {
    childs.forEach(function (item) {
      item.style.display = 'block';
    });
  } else {
    childs.forEach(function (item) {
      // console.log(item)
      a = item.querySelector('.event-default-price');
      txtValue = a.innerHTML.toString().split(' ')[1];
      if (Number(txtValue) <= Number(filter)) {
        item.style.display = 'block';
      } else {
        item.style.display = 'none';
      }
    });
  }
}
