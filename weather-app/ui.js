class UI {
  constructor() {
    this.location = document.getElementById('w-location');
    this.desc = document.getElementById('w-desc');
    this.string = document.getElementById('w-string');
    this.details = document.getElementById('w-details');
    this.icon = document.getElementById('w-icon');
    this.humidity = document.getElementById('w-humidity');
    this.feelsLike = document.getElementById('w-feels-like');
    this.dewpoint = document.getElementById('w-dewpoint');
    this.wind = document.getElementById('w-wind');
  }

  paint(results) {
    this.location.textContent = results.name;
    this.desc.textContent = results.weather[0].description;
    this.humidity.textContent = results.main.humidity;
    this.wind.textContent = results.wind.speed;
    this.icon.textContent = results.weather[0].icon;
  }
}
