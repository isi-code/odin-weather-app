import { WeatherForecast } from "./weather-forecast-data.js";

export async function submitForm(e, form) {
  e.preventDefault();
  const place = form.place.value;

  const weatherData = new WeatherForecast();
  const weatherForecastData = await weatherData.getWeatherData(place);
  console.log(weatherForecastData);
}