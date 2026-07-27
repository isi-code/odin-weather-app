export class WeatherAppLogic {
  constructor(weatherForecast){
    this.weatherForecast = weatherForecast;
    this.weatherForecastData = null;
  }

  async submitForm(e, createWeatherTable){
    e.preventDefault();
    const form = e.target;
    const { place, tempUnit } = form.elements;

    const weatherForecast = await this.weatherForecast.getWeatherData(place.value, tempUnit.value);
    this.weatherForecastData = weatherForecast;

    const weatherCard = createWeatherTable(this.weatherForecastData);
    return weatherCard;
  }

}