import { createForm } from "./js/dom-form.js"
import { formSubmitted } from "./js/form-logic.js";

const main = document.querySelector("main");

// Display form to request location to DOM
const weatherForm = createForm();
main.append(weatherForm);

weatherForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const currWeatherCard = formSubmitted(weatherForm.place.value);
});