const API_KEY = "";
const place = "Tijuana";

/* 
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
      const getWeather = await fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${place}?key=${API_KEY}`);
      const weatherData = await getWeather.json();
      console.log(weatherData);
      const currentWeather = weatherData.currentConditions
      //console.log(currentWeather)
    } catch (error) {
      console.error(error)
    }
  }

  getWeatherData(place);