const urlParams = new URLSearchParams(window.location.search);
const id = Number(urlParams.get('id'));
const totalRating = document.querySelector('.guide-rating');

// const 

document.addEventListener("DOMContentLoaded", () => {
  addGuideDetail();

});

// add event listeners for all rating radio buttons
if (document.querySelector('.rating input[name=rating]')){
  document.querySelectorAll('.rating input[name=rating]').forEach((elem) => {
    elem.addEventListener("change", function(event) {
      rateThisGuide(event.target.value);
    })
  });
}
async function addGuideDetail() {
  const guideResult = async () => {
    const guide = await retrieve('guides', id);
    Array.from(document.querySelectorAll('.guideDetail_name')).forEach(
      (item) => {
        item.innerHTML = guide.username;
      }
    );
    Array.from(document.querySelectorAll('.guideDetail_skill')).forEach(
      (item) => {
        item.innerHTML = addSkills(guide.skills);
      }
    );
    updateRating(guide);
  };

  return guideResult();
}

function addSkills(skills) {
  output = ``;
  for (skill of skills) {
    output += `
    <h3>${skill.lang}</h3>
    <div class="progress my-2 w-75">
    
    <div class="progress-bar" role="progressbar" style="width: ${skill.percent}%;" aria-valuenow="${skill.percent}" aria-valuemin="0" aria-valuemax="100">
    ${skill.percent}%
    </div>
  </div>`;
  }
  return output;
}

async function rateThisGuide(value) {
  let guide = await retrieve('guides', id);
  let currentRating = guide.rating;
  let newRating = {id: id, value: {rating: {totalRating: Number(currentRating.totalRating) + Number(value), ratingCount: currentRating.ratingCount + 1}}};
  console.log(newRating);
  update('guides', newRating);
  updateRating(guide);
}

function updateRating(guide) {
  let ratingCount;
  if (guide.rating.ratingCount == 0) {
    ratingCount = 0;
  } else{
    ratingCount = (guide.rating.totalRating / guide.rating.ratingCount).toFixed(1);
  }
  document.querySelector('.guide-rating').innerHTML = `${ratingCount}<span class="total-rating">/${5}`;
  document.querySelector('.rating-text').innerHTML = `<span>${guide.rating.ratingCount} ratings</span>`;
}
