const urlParams = new URLSearchParams(window.location.search);
const id = Number(urlParams.get('id'));

document.addEventListener("DOMContentLoaded", () => {
    addBookDetail();
})

async function addBookDetail() {
    
    const tourResult = async () => {
        const tour = await retrieve('tour', id);
        Array.from(document.querySelectorAll(".tour-name")).forEach((item) => {
            item.innerHTML = `${tour.name}`;
        });
        document.querySelector(".tour-price").innerHTML = `${tour.price} Birr`;
        document.querySelector(".total-tour-price").innerHTML = `${tour.price} Birr`;

    }
    return tourResult();
    
}
const touristAddress = document.querySelector("#address");
const touristCountry = document.querySelector("#country");
const touristState = document.querySelector("#state");

document.querySelector("#add-booking").addEventListener('click', (e) => {
    e.preventDefault();
    let user = JSON.parse(localStorage.getItem("user"));
    let date = new Date;
    let value = {user_id: user.id, tour_id: id, payment_status: true, guide_id: 1, 
        tourist_address: touristAddress.value, tourist_country: touristCountry.value, tourist_state: touristState.value,
        date: `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`};
    create('booking', value);
});