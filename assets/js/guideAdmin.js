const urlParams = new URLSearchParams(window.location.search);
const id = Number(urlParams.get('id'));

const profilePicture = document.querySelector("input[name=image]");
const skills = document.querySelector("input[name=skills]");
const dedication = document.querySelector("input[name=dedication]");
const commitment = document.querySelector("input[name=commitment]");
const professionalism = document.querySelector("input[name=professionalism]");
const user = JSON.parse(loggedinUser);

document.addEventListener("DOMContentLoaded", () => {
    addLoggedGuideInfo();
    
});


async function addLoggedGuideInfo() {
    const guideResult = async () => {
        const guide = await retrieve('guides', id);
        console.log(guide);
        if (guide) {
            document.querySelector('.guide-name').innerHTML = `<span id="accountStatus" class="pe-2"><i class="fas fa-user${guide.approved ? '-check': ''}"></i></span> Guide ${user.name}`;
        } else {
            document.querySelector('.guide-name').innerHTML = `<span id="accountStatus" class="pe-2"><i class="fas fa-user"></i></span> Guide ${user.name}`;
        }
    };
  
    return guideResult();
}


function requestGuideAccount() {

}

const createBtn = document.getElementById('btn-requestAcc');
createBtn.addEventListener('click', sendAccRequest);
const updateBtn = document.getElementById('btn-updateAcc');
updateBtn.addEventListener('click', updateAccount);


function sendAccRequest(e) {
  e.preventDefault();
  create('guides', {
    id: id,
    username: user.name,
    profile_picture: profilePicture.value.toString(),
    skills: "skill",
    work_ethics: {dedication: Number(dedication.value), professionalism: Number(professionalism.value), commitment: Number(commitment.value)},
    approved: false
  });
}

function updateAccount(e) {
    e.preventDefault();
    let value = {};
    if (profilePicture.value.toString()) {
      value.profilePicture = profilePicture.value.toString();
    }
    if (professionalism.value.toString() && dedication.value.toString() && commitment.value.toString()) {
      value.work_ethics = 
      {dedication: Number(dedication.value), professionalism: Number(professionalism.value), commitment: Number(commitment.value)};
    }
    update('guides', { id:id, value});
  }