class Weather {
  constructor(city) {
    this.apiKey = 'a08bdf7f147e2e07ae84692f5161868d',
    this.city = city
  }

  // Fetch weather from api
  async getWeather() {
    const response = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${this.city}&appid=${this.apiKey}`);
    const responseData = await response.json();

    return responseData;
  }

  // Change weather location
  changeLocation(city, state) {
    this.city = city;
  }
}
