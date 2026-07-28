import { format } from 'date-fns';

export class WeatherForecast {
  #weatherAPI;

  constructor(apiKey) {
    this.#weatherAPI = apiKey;
  }

  async getWeatherData(place, tempUnit) {
    try {
      const requestWeather = await fetch(
        `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${place}?unitGroup=${tempUnit}&key=${this.#weatherAPI}`
      );

      const weatherData = await requestWeather.json();

      /*
        This long code portion has the purpose of further processing the data obtained from the API
        and put it into an object where it is ready to use.
      */
      return await Promise.all(
        weatherData.days.slice(0, 6).map(async (day) => {
          const {
            description,
            //conditions,
            datetime,
            temp,
            icon,
            feelslike,
            tempmax,
            tempmin,
            sunrise,
            sunset,
          } = day;

          const tempUnitSymbol = tempUnit === 'metric' ? '°C' : '°F';
          const { default: iconUrl } = await import(`../img/icons/${icon}.svg`);

          return {
            icon: iconUrl,
            description,
            fullDate: format(new Date(datetime), 'PPPP'),
            temp: temp + tempUnitSymbol,
            feelslike: `Feels like ${feelslike}${tempUnitSymbol}`,
            tempmax: tempmax + tempUnitSymbol,
            tempmin: tempmin + tempUnitSymbol,
            sunrise,
            sunset,
          };
        })
      );
    } catch (error) {
      console.error(error);
    }
  }
}
