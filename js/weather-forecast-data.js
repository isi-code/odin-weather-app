import { WEATHER_API_KEY, GIF_API_KEY } from "../env.js";
//import { format } from "date-fns";

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
      */      
      return await Promise.all( weatherData.days.slice(0, 6).map(async (day) => {
        const {
          description,
          conditions,
          datetime,
          temp,
          icon,
          feelslike,
          tempmax,
          tempmin,
          sunrise,
          sunset
        } = day;

        return {
          icon: `img/icons/${icon}.svg`,
          description,
          //fullDate: format(new Date(datetime), 'PPPP'),
          fullDate: datetime,
          feelslike,
          temp,
          tempmax,
          tempmin,
          sunrise,
          sunset
        }
      }));

    } catch (error) {
      console.error(error);
    }
  }
}