export class WeatherAppLogic {
  constructor(weatherForecast) {
    this.weatherForecast = weatherForecast;
    this.weatherForecastData = null;
    this.tempUnit = null;
  }

  submitForm = async (e, createWeatherCardSection) => {
    e.preventDefault();
    const form = e.target;
    const { place, days, tempUnit } = form.elements;

    const weatherForecastData = await this.weatherForecast.getWeatherData(
      place.value,
      parseInt(days.value),
      tempUnit.value
    );

    if (weatherForecastData) {
      this.weatherForecastData = weatherForecastData;

      const weatherCardSection = createWeatherCardSection(
        this.weatherForecastData
      );

      this.tempUnit = tempUnit.value;

      return weatherCardSection;
    }
  }

  updateCardsTempUnits = () => {
    const tempValues = Array.from(document.getElementsByClassName('tempValue'));

    const upTempUnit = this.tempUnit === 'metric' ? 'us' : 'metric';
    const upTempUnitSymbol = this.tempUnit === 'metric' ? '°F' : '°C';

    tempValues.forEach((value) => {
      const currTemp = parseFloat(value.dataset.tempValue);
      const upTemp = this.switchTempMeasure(currTemp);

      const newTemp = !upTemp % 10 ? upTemp : upTemp.toFixed(1);
      value.dataset.tempValue = newTemp;
      value.textContent = `${newTemp} ${upTempUnitSymbol}`;
    });

    this.tempUnit = upTempUnit;
  };

  switchTempMeasure(temp) {
    switch (this.tempUnit) {
      case 'metric':
        return temp * 1.8 + 32;
      case 'us':
        return (temp - 32) / 1.8;
    }
  }
}
