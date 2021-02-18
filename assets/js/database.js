var db = new Dexie('travel_database');
db.version(1).stores({
  users: '++id, name, &email, role, password',
  tour: '++id, &name, location, price, image, date',
  guides: '++id, &username, tour_id, rating, profile_picture, skills',
  booking: '++id, user_id, tour_id, payment_status, guide_id, date',
  comments: '++id, username, email, phone, message',
});
