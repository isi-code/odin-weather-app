import { createForm } from "./js/dom-form.js"
import { formSubmitted } from "./js/form-logic.js";

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

        weatherForm.addEventListener("submit", (e) => {
            e.preventDefault();
            const weatherData = formSubmitted(weatherForm.place.value);
            this.#displayCurrWeather(weatherData);
        });

        this.formContainer.append(weatherForm);        
        return this.container
    }

    #displayCurrWeather(weatherForecast){
        console.log(weatherForecast);
        //const domWeather = new DOMWeather();
        //const weatherCard = domWeather.currWeatherTable();
        
        //domWeather.addWeatherData(weatherCard);
        //this.weatherCont.append(weatherCard);
    }

}

const main = document.querySelector("main");
const weatherApp = new WeatherApp(main);