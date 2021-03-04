import { update, create, retrieve } from './utils/crudOperations.js';
import { db } from './database.js';
if (!loggedinUser) {
  window.location.replace('index.html');
}
if (JSON.parse(loggedinUser).role != 'guide') {
  localStorage.removeItem('user');
  window.location.replace('index.html');
}

const addMore = document.querySelector('.add-more');
const allSkills = document.querySelectorAll('#field input');

let skills = [];

var next = 1;
addMore.addEventListener('click', function (e) {
  e.preventDefault();
  var addto = '#field' + next;
  var addRemove = '#field' + next;
  next = next + 1;
  var newIn =
    '<input placeholder="Enter language skill" autocomplete="off" class="input form-control form-input" id="field' +
    next +
    '" name="field' +
    next +
    '" type="text">';
  var newInput = $(newIn);
  var removeBtn =
    '<button id="remove' +
    (next - 1) +
    '" class="btn btn-danger remove-me" >-</button></div><div id="field">';
  var removeButton = $(removeBtn);
  $(addto).after(newInput);
  $(addRemove).after(removeButton);
  $('#field' + next).attr('data-source', $(addto).attr('data-source'));
  $('#count').val(next);

  $('.remove-me').click(function (e) {
    e.preventDefault();
    var fieldNum = this.id.charAt(this.id.length - 1);
    var fieldID = '#field' + fieldNum;
    $(this).remove();
    $(fieldID).remove();
  });
});

const urlParams = new URLSearchParams(window.location.search);
const id = Number(urlParams.get('id'));

const profilePicture = document.querySelector('input[name=image]');
const dedication = document.querySelector('input[name=dedication]');
const commitment = document.querySelector('input[name=commitment]');
const professionalism = document.querySelector('input[name=professionalism]');
const user = JSON.parse(loggedinUser);

document.addEventListener('DOMContentLoaded', () => {
  addLoggedGuideInfo();
  getNotification();
});

async function addLoggedGuideInfo() {
  const guideResult = async () => {
    const guide = await retrieve('guides', id);
    console.log(guide);
    if (guide) {
      document.querySelector(
        '.guide-name'
      ).innerHTML = `<span id="accountStatus" class="pe-2"><i class="fas fa-user${
        guide.approved ? '-check' : ''
      }"></i></span> Guide ${user.name}`;
    } else {
      document.querySelector(
        '.guide-name'
      ).innerHTML = `<span id="accountStatus" class="pe-2"><i class="fas fa-user"></i></span> Guide ${user.name}`;
    }
  };

  return guideResult();
}

const createBtn = document.getElementById('btn-requestAcc');
createBtn.addEventListener('click', sendAccRequest);
const updateBtn = document.getElementById('btn-updateAcc');
updateBtn.addEventListener('click', updateAccount);

function sendAccRequest(e) {
  e.preventDefault();
  allSkills.forEach((e) => {
    let sk = e.value.split(',');
    let v = { lang: sk[0], percent: Number(sk[1]) };
    skills.push(v);
  });
  create('guides', {
    id: id,
    username: user.name,
    profile_picture: profilePicture.value.toString(),
    tour_id: '',
    skills: skills,
    work_ethics: {
      dedication: Number(dedication.value),
      professionalism: Number(professionalism.value),
      commitment: Number(commitment.value),
    },
    approved: false,
  });
}

function updateAccount(e) {
  e.preventDefault();
  allSkills.forEach((e) => {
    let sk = e.value.split(',');
    let v = { lang: sk[0], percent: Number(sk[1]) };
    skills.push(v);
  });
  let value = {};
  if (profilePicture.value.toString()) {
    value.profilePicture = profilePicture.value.toString();
  }
  if (
    professionalism.value.toString() &&
    dedication.value.toString() &&
    commitment.value.toString()
  ) {
    value.work_ethics = {
      dedication: Number(dedication.value),
      professionalism: Number(professionalism.value),
      commitment: Number(commitment.value),
    };
  }
  if (skills) {
    value.skills = skills;
  }
  update('guides', { id: id, value });
}

// notification system
const notifyContainer = document.querySelector('.list-notification');

async function getNotification() {
  const guideResult = async () => {
    const guide = await retrieve('guides', id);
    console.log(guide.tour_id);
    let guide_tours = guide.tour_id;
    if (guide_tours) {
      notifyContainer.innerHTML = `<div class="not-card d-flex align-items-center">
      <p class="card-text">You are assigned a tour:  ${guide_tours}
      </p>
      <a type="button" class="replay btn btn-sm"><i class="fas fa-thumbs-up"></i></a>
      <a type="button" class="replay btn btn-sm"><i class="fas fa-thumbs-down"></i></a>
  </div>`;
    } else {
      notifyContainer.innerHTML = `<div class="not-card d-flex align-items-center">
      <p class="card-text">there are no tour assigned!
      </p>
  </div>`;
    }
  };

  return guideResult();
}
