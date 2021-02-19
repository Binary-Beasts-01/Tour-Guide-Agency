const urlParams = new URLSearchParams(window.location.search);
const id = Number(urlParams.get('id'));

document.addEventListener("DOMContentLoaded", addTourDetail);

async function addTourDetail() {
    
    const tourResult = async () => {
        const tour = await retrieve('tour', id);
        Array.from(document.querySelectorAll(".tour_name")).forEach((item) => {
            item.innerHTML = tour.name;
        });
        Array.from(document.querySelectorAll(".tour_image")).forEach((item) => {
            item.setAttribute("src", tour.image);
        });
        document.querySelector(".platinum-price").innerHTML = `${tour.price + 1000} Birr`;
        document.querySelector(".basic-price").innerHTML = `${tour.price + 200} Birr`;
        document.querySelector(".gold-price").innerHTML = `${tour.price + 2000} Birr`;
        document.querySelector(".standard-price").innerHTML = `${tour.price + 600} Birr`;
        document.querySelector("#gmap_canvas").setAttribute("src", tour.location);
        Array.from(document.querySelectorAll(".book-now")).forEach((item) => {
            item.setAttribute("href", `booking.html?id=${id}`);
        });

    }
    return tourResult();
    
}

