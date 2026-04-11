import { createForm } from "./js/dom-form.js";
import { WEATHER_API_KEY, GIF_API_KEY } from "./env.js";

const main = document.querySelector("main");

class WeatherForecast {
  #weatherAPI;

  constructor(weatherAPI) {
    this.#weatherAPI = weatherAPI;
  }

  async getWeatherData(place) {
    const weatherForecast = {};

    try {
      const requestWeather = await fetch(
        `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${place}?key=${this.#weatherAPI}`,
      );

      const weatherData = await requestWeather.json();

      const { description } = weatherData;

      weatherForecast["currentWeatherLongDesc"] = description;

      const fiveDayWeather = weatherData.days.slice(0, 5);

      weatherForecast["fiveDayWeather"] = fiveDayWeather.map((day) => {
        const {
          icon,
          description,
          conditions,
          datetime,
          temp,
          sunrise,
          sunset,
        } = day;

        return {
          icon,
          description,
          conditions,
          datetime,
          temp,
          sunrise,
          sunset,
        };
      });
    } catch (error) {
      console.error(error);
    }

    return weatherForecast;
  }
}



const weatherForecast = new WeatherForecast(WEATHER_API_KEY);

// Display to DOM
main.append(createForm());

document.forms[0].addEventListener("submit", (e) => {
  e.preventDefault();
  const place = document.forms[0].place.value;
  weatherForecast.getWeatherData(place).then(v => { console.log(v) });
});