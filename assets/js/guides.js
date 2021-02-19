const tourContainer = document.querySelector('#tour_guides');
document.addEventListener("DOMContentLoaded", () => {
  create('guides', {
    username: 'Nabek',
    skills: [
      { lang: 'Amharic', percent: 30 },
      { lang: 'English', percent: 60 }
    ],
    experience: '3 Yrs',
    rating: {totalRating: 0, ratingCount: 0}
  });
  
  create('guides', {
    username: 'Surafel',
    skills: [
      { lang: 'Amharic', percent: 30 },
      { lang: 'English', percent: 60 },
    ],
    experience: '3 Yrs',
    rating: {totalRating: 0, ratingCount: 0}
  });

  addTourGuide();
});


function addTourGuide() {
  tourContainer.innerHTML = '';
  for (i = 0; i < 2; i++) {
    addGuide(i + 1);
  }
}

function guideContent(guide, user) {
  return `<div class="col-sm-12 col-md-3">
    <div class="card-guide">
      <img src="./assets/images/gettyimages-170065590-2048x2048.jpg" />
      <figcaption>
        <img src="./assets/images/profile.png" alt="profile" class="profile" />
        <h2 class="guide_name">${guide.username}<span>Tour Guide</span></h2>
        <h3>Language</h3>
        <div class="navbar-nav">
          ${listSkills(guide.skills)}
          </li>
        </div>
        <div class="guide-info">
          <a href="guideDetail.html?id=${guide.id}" class="info me-3">More Info</a>
          <div>
            ${rating(guide.rating)}
          </div>
        </div>
      </figcaption>
    </div>
    </div>`;
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