// create('tour', {name: "Fasilades", location: "Gondar",  price: 480,  image: "/assets/images/gettyimages-138178737-2048x2048.jpg", date: "2020-10-18"});
// create('tour', {name: "Lalibela", location: "Lalibela", price: 280,  image: "/assets/images/gettyimages-111919734-2048x2048.jpg", date: "2020-10-18"});
// create('tour', {name: "Sof Umer Cave", location: "Afar", price: 550, image: "/assets/images/gettyimages-182174818-2048x2048.jpg", date: "2020-10-18"});
// create('tour', {name: "Addis Ababa", location: "Addis Ababa", price: 350,  image: "/assets/images/gettyimages-697529054-612x612.jpg", date: "2020-10-18"});
// create('tour', {name: "Semen Mountains", location: "Semen", price: 520,  image: "/assets/images/gettyimages-905176238-2048x2048.jpg", date: "2020-10-18"});
// create('tour', {name: "Konso", location: "Konso", price: 600,  image: "/assets/images/gettyimages-988621664-2048x2048.jpg", date: "2020-10-18"});

const idInput = document.getElementById('id');
const nameInput = document.getElementById('name');
const locationInput = document.getElementById('location');
const priceInput = document.getElementById('price');
const imageInput = document.getElementById('image');
const fromDateInput = document.getElementById('fromDate');
const duration = document.getElementById('duration');

const createBtn = document.getElementById('btn-create');
createBtn.addEventListener('click', createTour);
const refreshBtn = document.getElementById('btn-read');
refreshBtn.addEventListener('click', displayAll);
const updateBtn = document.getElementById('btn-update');
updateBtn.addEventListener('click', updateTour);
function createTour(e) {
  e.preventDefault();
  create('tour', {
    name: nameInput.value.toString(),
    location: locationInput.value.toString(),
    price: priceInput.value.toString(),
    image: imageInput.value.toString(),
    start_date: fromDateInput.value.toString(),
    duration: duration.value.toString(),
  });
  displayAll();
}

function updateTour(e) {
  e.preventDefault();
  let value = {};
  if (nameInput.value.toString()) {
    value.name = nameInput.value.toString();
  }
  if (locationInput.value.toString()) {
    value.location = locationInput.value.toString();
  }
  if (priceInput.value.toString()) {
    value.price = priceInput.value.toString();
  }
  if (fromDateInput.value) {
    value.start_date = fromDateInput.value;
    value.duration = duration.value;
  }
  update('tour', { id: Number(idInput.value.toString()), value });
  displayAll();
}

async function displayAll() {
  res = await retrieveAll('tour');
  table(res);
}

displayAll();

async function display(id) {
  const tourResult = async () => {
    const c = await retrieve('tour', id);
    destinationContainer.innerHTML += createDestinationContent(c);
  };
  return tourResult();
}

function table(res) {
  const tbody = document.getElementById('tbody');
  const notfound = document.getElementById('notfound');
  notfound.textContent = '';
  // remove all childs from the dom first
  while (tbody.hasChildNodes()) {
    tbody.removeChild(tbody.firstChild);
  }
  {
    /* <td>${entry.location}</td> */
  }
  let output = '';
  for (entry of res) {
    output += `<tr>
    <td>${entry.id}</td>
    <td>${entry.name}</td>
    
    <td>${entry.price}</td>
    <td>${entry.image}</td>
    <td>${entry.start_date}</td>
    <td>${entry.duration}</td>
  </tr>`;
  }
  tbody.innerHTML = output;
}
