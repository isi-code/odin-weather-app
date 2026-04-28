import { createForm } from "./js/dom-form.js"
import { formSubmitted } from "./js/form-logic.js";

class WeatherApp {
    constructor(container){
        this.container = this.#createContainers(container);
        this.formContainer = this.container.querySelector(".formSection");
        this.weatherCont = this.container.querySelector(".weatherForecastSect");
        this.#consultWeatherForm();
    }

    #createContainers(container){
        const formSection = document.createElement("section");
        const weatherSection = document.createElement("section");

        formSection.className = "formSection";
        weatherSection.className = "weatherForecastSect";

        container.append(formSection, weatherSection);
        return container
    }

    #consultWeatherForm(){
        const weatherForm = createForm();

        weatherForm.addEventListener("submit", (e) => {
            e.preventDefault();
            const currWeatherCard = formSubmitted(weatherForm.place.value);
            this.weatherCont.append(currWeatherCard);
        });

        this.formContainer.append(weatherForm);        
        return this.container
    }

}

const main = document.querySelector("main");
const weatherApp = new WeatherApp(main);