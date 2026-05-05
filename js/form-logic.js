import { WeatherForecast } from "./weather-forecast-data.js";

export async function formSubmitted(place, tempUnit) {
  const weatherData = new WeatherForecast();
  const weatherForecast = await weatherData.getWeatherData(place, tempUnit);
  return weatherForecast
}