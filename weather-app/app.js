// Init weather object
const weather = new Weather('Boston');

// Init ui object
const ui = new UI;

// Get weather on DOM load
document.addEventListener('DOMContentLoaded', getWeather);

// Change location
document.getElementById('w-change-btn').addEventListener('click', function(e) {
  const city = document.getElementById('city').value;
  weather.changeLocation(city);
  getWeather();
  $('#locModal').modal('hide');
});

function getWeather() {
  weather.getWeather()
  .then(results => ui.paint(results))
  .catch(err => console.log(err));
}

function changeLocation(newCity) {
  weather.changeLocation(newCity);
}
