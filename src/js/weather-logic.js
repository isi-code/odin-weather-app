export class WeatherAppLogic {
  constructor(weatherForecast) {
    this.weatherForecast = weatherForecast;
    this.weatherForecastData = null;
  }

  async submitForm(e, createWeatherCardSection) {
    e.preventDefault();
    const form = e.target;
    const { place, days, tempUnit } = form.elements;

    const weatherForecastData = await this.weatherForecast.getWeatherData(
      place.value,
      parseInt(days.value),
      tempUnit.value
    );

    this.weatherForecastData = weatherForecastData;

    const weatherCardSection = createWeatherCardSection(
      this.weatherForecastData,
      tempUnit.value
    );
    return weatherCardSection;
  }

  updateCardsTempUnits(cards){
    cards.forEach(card => {
      const tempValues = card.getElementsByClassName('tempValue');
      const feelslike = card.querySelector();
      const tempMin = '';
      const tempMax = '';
    });
  }

  switchTempMeasure(tempUnit, temp){
    switch (tempUnit){
      case 'metric':
        return (temp * 1.8) + 32;
      case 'us':
        return ((temp - 32) / 1.8);
    }
  }
}
