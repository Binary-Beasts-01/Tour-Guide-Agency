var db = new Dexie('friend_database');
db.version(1).stores({
  users: '++id, name, &email, password',
  tour: '++id, &name, location, price, image, date',
  guides: '++id, &username, tour_id, rating, profile_picture, skills',
  booking: '++id, user_id, tour_id, payment_status, guide_id, date',
  comments: '++id, username, ',
});


