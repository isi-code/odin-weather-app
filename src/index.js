import 'normalize.css';
import './css/styles.css';
import { createForm } from "./js/dom-form.js";
import { formSubmitted } from "./js/form-logic.js";
import { currWeatherTable } from "./js/dom-weather.js";


class WeatherApp {
    constructor(container){
        this.container = this.#createContainers(container);
        this.formContainer = this.container.querySelector(".formSection");
        this.weatherCont = this.container.querySelector(".weatherForecastSect");
        this.#createWeatherForm();
    }

    #createContainers(container){
        const formSection = document.createElement("section");
        const weatherSection = document.createElement("section");

        formSection.className = "formSection";
        weatherSection.className = "weatherForecastSect";

        container.append(formSection, weatherSection);
        return container
    }

    #createWeatherForm(){
        const weatherForm = createForm();

        weatherForm.addEventListener("submit", async (e) => {
            e.preventDefault();
            const place = weatherForm.place.value;
            const tempUnit = weatherForm.tempUnit.value;
            const weatherData = await formSubmitted(place, tempUnit);
            this.#displayCurrWeather(weatherData);
        });

        this.formContainer.append(weatherForm);        
        return this.container
    }

    #displayCurrWeather(weatherForecast){
        const weatherCard = currWeatherTable(weatherForecast);
        this.weatherCont.append(weatherCard);
    }

}

const main = document.querySelector("main");
const weatherApp = new WeatherApp(main);