import { WEATHER_API_KEY, GIF_API_KEY } from "../env.js";

export class WeatherForecast {
  #weatherAPI;
  #gifAPI;

  constructor() {
    this.#weatherAPI = WEATHER_API_KEY;
    this.#gifAPI = GIF_API_KEY;
  }

  async getWeatherData(place) {
    try {
      const requestWeather = await fetch(
        `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${place}?key=${this.#weatherAPI}`,
      );

      const weatherData = await requestWeather.json();
      
      /*
        This long code portion has the purpose of further processing the data obtained from the API
        and put it into an object where it is ready to use.
        
        It also makes several API calls to get a relevant GIF about the weather.
      */      
      return await Promise.all( weatherData.days.slice(0, 6).map(async (day) => {
        const {
          description,
          conditions,
          datetime,
          temp,
          sunrise,
          sunset
        } = day;

        const url = await this.#lookUpWeatherGif(conditions);

        return {
          gifUrl: url,
          description,
          datetime,
          temp,
          sunrise,
          sunset
        }

      }));

    } catch (error) {
      console.error(error);
    }
  }

  #lookUpWeatherGif(weatherDesc) {
    return fetch(`
      https://api.giphy.com/v1/gifs/translate?api_key=${this.#gifAPI}&s=${weatherDesc}
    `)
      .then((response) => response.json())
      .then((response) => {
        return response.data.images.original.url
      })
      .catch((err) => {
        console.error(err);
      });
  }
}