// set date dynamically
var datePicker = document.querySelector('.slide-banner input[type="date"]');
let today = new Date().toISOString().substr(0, 10);
datePicker.value = today;
