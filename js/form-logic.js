import { WeatherForecast } from "./weather-forecast-data.js";

export async function formSubmitted(place) {
  const weatherData = new WeatherForecast();
  const weatherForecast = await weatherData.getWeatherData(place);
  return weatherForecast
}