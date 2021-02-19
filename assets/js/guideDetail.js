const urlParams = new URLSearchParams(window.location.search);
const id = Number(urlParams.get('id'));
const totalRating = document.querySelector('.guide-rating');

// const 

document.addEventListener("DOMContentLoaded", () => {
  addGuideDetail();

});

(function() {
	window.onload = function() {
    var totalProgress, progress;
		const circles = document.querySelectorAll('.skills-bar .progressC');
		for(var i = 0; i < circles.length; i++) {
			totalProgress = circles[i].querySelector('circle').getAttribute('stroke-dasharray');
			progress = circles[i].parentElement.getAttribute('data-percent');

			circles[i].querySelector('.bar').style['stroke-dashoffset'] = totalProgress * progress / 100;
      
		}
	}
})();

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
    document.querySelector('.skills-bar').innerHTML = addWorkEthics(guide.work_ethics);
    updateRating(guide);
  };

  return guideResult();
}

function addWorkEthics(ethics) {
  let output = ``;
  for (let key in ethics) {
    output += `<div class="col-4">
                <div class="progressdiv"  data-percent="${ethics[key]}">
                  <svg class="progressC" width="178" height="178" viewport="0 0 100 100" version="1.1" xmlns="http://www.w3.org/2000/svg">
                  <circle r="80" cx="89" cy="89" fill="transparent" stroke-dasharray="502.4" stroke-dashoffset="0" ></circle>
                  <circle class="bar" r="80" cx="89" cy="89" fill="transparent" stroke-dasharray="502.4" stroke-dashoffset="0"></circle>
                  </svg>
                  <div class="h5 mt-2 text-center">
                      ${key.toUpperCase()}
                  </div>
                </div>
              </div>`;
  } return output;
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
