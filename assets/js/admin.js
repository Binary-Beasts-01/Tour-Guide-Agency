import {update, create, retrieveAll} from './utils/crudOperations.js';

// create('tour', {name: "Fasilades", location: "Gondar",  price: 480,  image: "/assets/images/gettyimages-138178737-2048x2048.jpg", date: "2020-10-18"});
// create('tour', {name: "Lalibela", location: "Lalibela", price: 280,  image: "/assets/images/gettyimages-111919734-2048x2048.jpg", date: "2020-10-18"});
// create('tour', {name: "Sof Umer Cave", location: "Afar", price: 550, image: "/assets/images/gettyimages-182174818-2048x2048.jpg", date: "2020-10-18"});
// create('tour', {name: "Addis Ababa", location: "Addis Ababa", price: 350,  image: "/assets/images/gettyimages-697529054-612x612.jpg", date: "2020-10-18"});
// create('tour', {name: "Semen Mountains", location: "Semen", price: 520,  image: "/assets/images/gettyimages-905176238-2048x2048.jpg", date: "2020-10-18"});
// create('tour', {name: "Konso", location: "Konso", price: 600,  image: "/assets/images/gettyimages-988621664-2048x2048.jpg", date: "2020-10-18"});
if (JSON.parse(loggedinUser).role != 'admin') {
  localStorage.removeItem('user');
  window.location.replace('index.html');
}
var destinationDataSet = [];
var guidesDataSet = [];

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
  const res = await retrieveAll('tour');
  const resGuide = await retrieveAll('guides');
  table(res);
  gTable(resGuide);
}

function table(res) {
  destinationDataSet = [];
  for (let entry of res) {
    let temp = [entry.id, entry.name, entry.price, entry.image, entry.start_date, entry.duration];
    destinationDataSet.push(temp);
  }
  $(document).ready( function () {
    if ($.fn.dataTable.isDataTable('#destinationTable')) {
      $('#destinationTable').DataTable().clear().destroy();               
    }
    $('#destinationTable').DataTable( {
      data: destinationDataSet,
      columns: [
              { title: "ID" },
              { title: "Name" },
              { title: "Price" },
              { title: "Image" },
              { title: "Start Date" },
              { title: "Duration" }
      ]
    });
  });
}


// guides: '++id, &username, tour_id, rating, profile_picture, skills, work_ethics, approved',

function gTable(res) {
  guidesDataSet = [];
  for (let entry of res) {
    let temp = [entry.id, entry.username, 'entry.tour_id', `${0}`, 'entry.profile_picture', listLang(entry.skills), listEthics(entry.work_ethics), 
    `<button id=${entry.id} type="button" class="btn-danger guide_manage">${
      entry.approved == true ? 'Reject' : 'Accept'
    }</button>`
  ];
  guidesDataSet.push(temp);
  }
  $(document).ready( function () {
    $('#guidesTabel').DataTable( {
      destroy: true,
      data: guidesDataSet,
      columns: [
        { title: "ID" },
        { title: "User Name" },
        { title: "Tour ID" },
        { title: "rating" },
              { title: "Profile Picture" },
              { title: "Skills" },
              { title: "Work Ethics" },
              { title: "Status" },
            ]
    });
    $('.guide_manage').each(function () {
      $(this).on('click', function(e) {
          e.preventDefault();
          let id = e.target.id;
          let value;
          if (e.target.innerHTML == 'Reject') {
            value = { approved: false };
          } else {
            value = { approved: true };
          }
          update('guides', { id: Number(id), value });
          displayAll();
        } )
      })
  });
}


function listLang(skills) {
  let res = '';
  for (let i = 0; i < skills.length; i++) {
    const s = skills[i];
    res += ` <li>Language: ${s.lang} => ${s.percent}</li>`;
  }
  return res;
}

function listEthics(ethics) {
  let res = '';
  for (const key in ethics) {
    if (Object.hasOwnProperty.call(ethics, key)) {
      const element = ethics[key];
      res += `<li>${key}:  => ${element}</li>`;
    }
  }
  
  return res;
}

displayAll();