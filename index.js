import { createForm } from "./js/dom-form.js"
import { submitForm } from "./js/form-logic.js";

const main = document.querySelector("main");

// Display form to request location to DOM
const weatherForm = createForm();
main.append(weatherForm);

weatherForm.addEventListener("submit", (e) => { submitForm(e, weatherForm); });