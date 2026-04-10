import { createForm } from "./js/dom-form.js";

const API_KEY = "";
const place = "Tijuana";
const main = document.querySelector("main");

/* Get weather data using .then()/.catch() syntax
fetch(
  `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${place}?key=${API_KEY}`,
)
  .then((response) => response.json())
  .then((data) => {
    console.log(data); // log the actual JSON here
  })
  .catch((err) => {
    console.error(err);
  });
*/

async function getWeatherData(place) {
  try {
    const getWeather = await fetch(
      `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${place}?key=${API_KEY}`,
    );

    const weatherData = await getWeather.json();

    const {
      description,
      currentConditions: { icon, conditions, datetime, temp, sunrise, sunset },
    } = weatherData;

    const currentWeather = {
      description,
      icon,
      conditions,
      datetime,
      temp,
      sunrise,
      sunset,
    };

    console.log(currentWeather);

  } catch (error) {
    console.error(error);
  }
}

main.append(createForm());

document.forms[0].addEventListener("submit", (e) => {
  e.preventDefault();
  const place = document.forms[0].place.value;
  getWeatherData(place);
});
