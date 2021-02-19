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
        document.querySelector("#gmap_canvas").setAttribute("src", tour.location);
    }
    return tourResult();
    
}
