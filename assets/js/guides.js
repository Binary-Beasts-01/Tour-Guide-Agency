const tourContainer = document.querySelector('#tour_guides');

create('guides', {
  username: 'Nabek',
  skills: [
    { lang: 'Amharic', perecent: 30 },
    { lang: 'English', perecent: 60 },
  ],
  experience: '3 Yrs',
});

create('guides', {
  username: 'Surafel',
  skills: [
    { lang: 'Amharic', perecent: 30 },
    { lang: 'English', perecent: 60 },
  ],
  experience: '3 Yrs',
});

tourContainer.innerHTML = '';
for (i = 0; i < 2; i++) {
  addGuide(i + 1);
}

function guideContent(g) {
  return `<div class="col-sm-12 col-md-3">
    <div class="card-guide">
      <img src="./assets/images/gettyimages-170065590-2048x2048.jpg" />
      <figcaption>
        <img src="./assets/images/profile.png" alt="profile" class="profile" />
        <h2 class="guide_name">${g.username}<span>Tour Guide</span></h2>
        <h3>Language</h3>
        <div class="navbar-nav">
          ${listSkills(g.skills)}
          </li>
        </div>
        <div class="guide-info">
          <a href="guideDetail.html?id=${g.id}" class="info me-3">More Info</a>
          <div><span class="fa fa-star checked"></span>
            <span class="fa fa-star checked"></span>
            <span class="fa fa-star checked"></span>
            <span class="fa fa-star"></span>
            <span class="fa fa-star"></span>
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
    output += `<li class="my-1 language_skill">${g.lang} <div class="prog-bar">
              <div class="bar-span" style="background-color: rgb(192, 19, 19); width: ${g.percent}%;"></div>
            </div>`;
  }
  return output;
}

async function addGuide(id) {
  const tourResult = async () => {
    const c = await retrieve('guides', id);
    tourContainer.innerHTML += guideContent(c);
  };
  return tourResult();
}
