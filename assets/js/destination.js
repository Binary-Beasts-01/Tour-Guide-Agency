const destinationContainer = document.querySelector("#tour_destination");


// create('tour', {name: "Fasilades", location: "Gondar",  price: 480,  image: "/assets/images/gettyimages-138178737-2048x2048.jpg", date: "2020-10-18"});
// create('tour', {name: "Lalibela", location: "Lalibela", price: 280,  image: "/assets/images/gettyimages-111919734-2048x2048.jpg", date: "2020-10-18"});
// create('tour', {name: "Sof Umer Cave", location: "Afar", price: 550, image: "/assets/images/gettyimages-182174818-2048x2048.jpg", date: "2020-10-18"});
// create('tour', {name: "Addis Ababa", location: "Addis Ababa", price: 350,  image: "/assets/images/gettyimages-697529054-612x612.jpg", date: "2020-10-18"});
// create('tour', {name: "Semen Mountains", location: "Semen", price: 520,  image: "/assets/images/gettyimages-905176238-2048x2048.jpg", date: "2020-10-18"});
// create('tour', {name: "Konso", location: "Konso", price: 600,  image: "/assets/images/gettyimages-988621664-2048x2048.jpg", date: "2020-10-18"});

for (i = 0; i < 6; i++) {
    addTourToDestinationPage(i + 1);
}

(async () => {
    let res = await retrieveAll('tour');
    console.log(res);
})(); 

async function addTourToDestinationPage(id) {

    const tourResult = async () => {
        const c = await retrieve('tour', id);
        destinationContainer.innerHTML += createDestinationContent(c);
    }
    return tourResult();

}

function createDestinationContent(r) {
    return `<div class="col-sm-6 col-xl-4">
    <article class="event-default-wrap">
        <div class="event-default">
            <figure class="event-default-image"><img
                    src="${r.image}" alt="" width="570"
                    height="370">
            </figure>
            <div class="event-default-caption"><a class="button button-xs button-primary"
                    href="rooms-&amp;-suites.html">Learn More</a></div>
        </div>
        <div class="event-default-inner">
            <h5><a class="event-default-title" href="rooms-&amp;-suites.html">${r.name}</a></h5><span
                class="event-default-price">from ${r.price} Birr</span>
        </div>
    </article>
    </div>`;
}



