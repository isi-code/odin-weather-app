export class WeatherAppLogic {
  constructor(weatherForecast) {
    this.weatherForecast = weatherForecast;
    this.weatherForecastData = null;
  }

  async submitForm(e, createWeatherCardSection) {
    e.preventDefault();
    const form = e.target;
    const { place, days, tempUnit } = form.elements;

    const weatherForecast = await this.weatherForecast.getWeatherData(
      place.value,
      parseInt(days.value),
      tempUnit.value
    );
    
    this.weatherForecastData = weatherForecast;

    const weatherCardSection = createWeatherCardSection(this.weatherForecastData);
    return weatherCardSection;
  }
}
