import 'normalize.css';
import './css/styles.css';
import { WeatherAppDom } from './js/weatherDom.js';
import { WeatherAppLogic } from './js/weather-logic.js';
import { WeatherForecast } from './js/weather-forecast-data.js';

class WeatherApp {
  constructor(domHandler, eventHandler) {
    this.weatherDom = domHandler;
    this.eventHandler = eventHandler;
  }

  init() {
    const formSection = this.weatherDom.formSection();

    const forecastSection = this.weatherDom.forecastSection();

    if (!this.weatherForecastData) {
      const fcstSectionInit = this.weatherDom.initForecastSection();
      forecastSection.append(fcstSectionInit);
    }

    //The newly create form section is appended to the root tag
    this.weatherDom.container.append(formSection, forecastSection);
    this.#weatherForm();
  }

  async #weatherForm() {
    // This is the form element inside the formSection created with the `init()` method
    const form = this.weatherDom.searchWeatherForm;
    const forecastSection = this.weatherDom.forecastSect;

    form.addEventListener('submit', async (e) => {
      // Method to create weather forecast cards container
      const weatherCards = await this.eventHandler.submitForm(
        e,
        this.weatherDom.createWeatherCards
      );

      if (weatherCards instanceof Error) {
        const error = weatherCards;
        const errorSection = this.weatherDom.errorMessage(error);
        forecastSection.replaceChildren(errorSection);
      } else {
        const switchBtnContainer = this.weatherDom.switchTempUnitCont();
        const switchBtn =
          switchBtnContainer.querySelector('#switchTempUnitBtn');
        forecastSection.replaceChildren(switchBtnContainer, weatherCards);

        switchBtn.addEventListener(
          'click',
          this.eventHandler.updateCardsTempUnits
        );
      }
    });
  }
}

const rootTag = document.getElementById('weatherApp');
const domHandler = new WeatherAppDom(rootTag);
const weatherForecastData = new WeatherForecast(process.env.WEATHER_API_KEY);
const eventHandler = new WeatherAppLogic(weatherForecastData);

const weatherApp = new WeatherApp(domHandler, eventHandler);
weatherApp.init();
