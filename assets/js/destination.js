const destinationContainer = document.querySelector("#tour_destination");
const priceQuery = document.querySelector("#priceQuery");
const searchQuery = document.querySelector("#searchQuery");
// searchQuery.addEventListener("onkeyup", filter);

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

function filterByName() {
    let filter, a, txtValue;
    filter = searchQuery.value.toUpperCase();
    childs = Array.from(destinationContainer.children);
    if (filter.value == '') {
        childs.forEach(function(item) {
            item.style.display = 'block';
        })
    } else {
        childs.forEach(function(item) {
            // console.log(item)
            a = item.querySelector(".event-default-title");
            txtValue = a.innerHTML.toString().trim();
            console.log(txtValue);
            if (txtValue.toUpperCase().indexOf(filter) > -1) {
                item.style.display = "";
            } else {
                item.style.display = "none";
            }   
    
        });
        
    }
    
}

function filterByPrice() {
    let filter, a, txtValue;
    filter = priceQuery.value.toString();
    childs = Array.from(destinationContainer.children);
    if (filter.value == '') {
        childs.forEach(function(item) {
            item.style.display = 'block';
        })
    } else {
        childs.forEach(function(item) {
            // console.log(item)
            a = item.querySelector(".event-default-price");
            txtValue = a.innerHTML.toString().split(" ")[1];
            console.log(txtValue);
            if (Number(txtValue) <= Number(filter)) {
                item.style.display = "";
            } else {
                item.style.display = "none";
            }   

        });
    }
    
}


