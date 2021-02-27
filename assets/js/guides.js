import {retrieve, create} from './utils/crudOperations.js';

const tourContainer = document.querySelector('#tour_guides');
document.addEventListener("DOMContentLoaded", () => {
  create('guides', {
    id: 1,
    username: 'Nabek',
    skills: [
      { lang: 'Amharic', percent: 30 },
      { lang: 'English', percent: 60 }
    ],
    rating: {totalRating: 0, ratingCount: 0},
    work_ethics: {dedication: 90, professionalism: 74, experience: 86}
  });
  
  create('guides', {
    username: 'Surafel',
    skills: [
      { lang: 'Amharic', percent: 30 },
      { lang: 'English', percent: 60 },
    ],
    rating: {totalRating: 0, ratingCount: 0},
    work_ethics: {dedication: 90, professionalism: 74, experience: 86}
  });

  addTourGuide();
});


function addTourGuide() {
  tourContainer.innerHTML = '';
  for (let i = 0; i < 2; i++) {
    addGuide(i + 1);
  }
}

function listSkills(arr) {
  let output = '';
  for (let i = 0; i < arr.length; i++) {
    let g = arr[i];
    output += `<li class="my-1 language_skill">${g.lang}<div class="prog-bar">
              <div class="bar-span" style="background-color: rgb(192, 19, 19); width: ${g.percent}%;"></div>
            </div>`;
  }
  return output;
}

async function addGuide(id) {
  const tourResult = async () => {
    const guide = await retrieve('guides', id);
    // const user = await retrieve('tour', id);
    tourContainer.innerHTML += guideContent(guide);
  };
  return tourResult();
}

function rating(num) {
  let output = '';
  for (let i = 0; i < 5; i++) {
    if (num > i) {
      output += `<span class="fa fa-star checked"></span>`;
    } else {
      output += `<span class="fa fa-star"></span>`;
    }
  }
  return output;
}