import { createForm } from "./js/dom-form.js";
import { WEATHER_API_KEY, GIF_API_KEY } from "./env.js";

const main = document.querySelector("main");

class WeatherForecast {
  #weatherAPI;
  #gifAPI;

  constructor(weatherAPI, gifAPI) {
    this.#weatherAPI = weatherAPI;
    this.#gifAPI = gifAPI;
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

      weatherForecast["fiveDayWeather"] = await Promise.all( fiveDayWeather.map( async (day) => {
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
          conditions,
          datetime,
          temp,
          sunrise,
          sunset
        }
      }));

    } catch (error) {
      console.error(error);
    }

    return weatherForecast;
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

// Display Form to DOM
main.append(createForm());

document.forms[0].addEventListener("submit", async (e) => {
  e.preventDefault();
  const place = document.forms[0].place.value;
  const weatherForecast = await new WeatherForecast(WEATHER_API_KEY, GIF_API_KEY).getWeatherData(place);
  console.log(weatherForecast);
});