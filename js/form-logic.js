import { WeatherForecast } from "./weather-forecast-data.js";

export async function formSubmitted(place) {
  const weatherData = new WeatherForecast();
  const weatherForecastData = await weatherData.getWeatherData(place);

  console.log(weatherForecastData)
}