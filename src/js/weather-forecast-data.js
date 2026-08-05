import { format } from 'date-fns';

export class WeatherForecast {
  #weatherAPI;

  constructor(apiKey) {
    this.#weatherAPI = apiKey;
  }

  async getWeatherData(place, days, tempUnit) {
    try {
      const requestWeather = await fetch(
        `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${place}?unitGroup=${tempUnit}&key=${this.#weatherAPI}`
      );

      // Explicitly check if the response was successful
      if (!requestWeather.ok) {
        const errorData = await requestWeather.json();
        throw new Error(
          errorData.message || `HTTP error! status: ${requestWeather.status}`
        );
      }

      const weatherData = await requestWeather.json();

      /*
        This long code portion has the purpose of further processing the data obtained from the API
        and put it into an object where it is ready to use.
      */
      return await Promise.all(
        weatherData.days.slice(0, days).map(async (day) => {
          const {
            description,
            datetime,
            temp,
            icon,
            feelslike,
            tempmax,
            tempmin,
            sunrise,
            sunset,
          } = day;

          const { default: iconUrl } = await import(`../img/icons/${icon}.svg`);

          return {
            icon: iconUrl,
            description,
            fullDate: format(new Date(datetime), 'PPPP'),
            temp: temp,
            feelslike: feelslike,
            tempmax: tempmax,
            tempmin: tempmin,
            sunrise,
            sunset,
            tempUnit,
            tempSymbol: tempUnit === 'metric' ? '°C' : '°F',
          };
        })
      );
    } catch (error) {
      return error;
    }
  }
}
