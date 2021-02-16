const destinationContainer = document.querySelector('#tour_destination');

createTour(
  'Lalibela',
  'Lalibela',
  280,
  '/assets/images/gettyimages-111919734-2048x2048.jpg',
  '2020-10-18'
);
createTour(
  'Fasilades',
  'Gondar',
  480,
  '/assets/images/gettyimages-138178737-2048x2048.jpg',
  '2020-10-18'
);
createTour(
  'Sof Umer Cave',
  'Afar',
  550,
  '/assets/images/gettyimages-182174818-2048x2048.jpg',
  '2020-10-18'
);
createTour(
  'Addis Ababa',
  'Addis Ababa',
  350,
  '/assets/images/gettyimages-697529054-612x612.jpg',
  '2020-10-18'
);
createTour(
  'Semen Mountains',
  'Semen',
  520,
  '/assets/images/gettyimages-905176238-2048x2048.jpg',
  '2020-10-18'
);
createTour(
  'Konso',
  'Konso',
  600,
  '/assets/images/gettyimages-988621664-2048x2048.jpg',
  '2020-10-18'
);
//

for (i = 0; i < 6; i++) {
  addTourToDestinationPage(i + 1);
}

async function addTourToDestinationPage(id) {
  const tourResult = async () => {
    const c = await retrieveTour(id);
    destinationContainer.innerHTML += createDestinationContent(c);
  };
  tourResult();
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

function createTour(name, location, price, image, date) {
  db.transaction('rw', db.tour, function () {
    db.tour
      .add({ name, location, price, image, date })
      .catch((e) => {
        console.log('Error adding');
      })
      .then((r) => {
        if (r) console.log('Tour destination added Success!');
      });
  })
    .then(() => {
      console.log('Transaction complete');
    })
    .catch(() => {
      console.log('Transaction fail');
    });
}

function retrieveTour(id) {
  // return db.transaction('r', db.tour, function () {
  return db.tour.get({ id }).then((r) => {
    if (r) {
      // console.log(r);
      return r;
    } else {
      console.log('failure');
    }
  });
  //   })
  //     .catch(() => {
  //       console.log('Transaction fail');
  //     });
}

function updateTourDestination(object) {
  db.tour.update(object.id, object.value).then(function (updated) {
    if (updated) {
      console.log('Entry update successfully');
    } else {
      console.log("Can't find tour with this id");
    }
  });
}

function deleteTourDestination(id) {
  db.tour.delete(id).then(function (deleteCount) {
    console.log('Dleted' + deleteCount + ' objects');
  });
}
