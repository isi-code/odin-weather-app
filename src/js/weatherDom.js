// I need to split weather card from the section where the cards are gonna to be
export class WeatherAppDom {
  constructor(elem) {
    this.container = elem;
    this.searchWeatherForm = null;
    this.forecastSect = null;
  }

  formSection() {
    const template = {
      tag: 'section',
      prop: { className: 'formSect' },
      children: [{ tag: 'h1', prop: { textContent: 'Weather app' } }],
    };

    const formSection = this.#createDOM(template);
    const form = this.#createForm();
    this.searchWeatherForm = form;

    formSection.append(form);

    return formSection;
  }

  #createForm() {
    const formTemplate = {
      tag: 'form',
      prop: { name: 'searchWeather' },
      children: [
        {
          tag: 'h2',
          prop: { textContent: 'Fill the form to get the weather forecast' },
        },
        { tag: 'label', prop: { textContent: 'Location', htmlFor: 'place' } },
        {
          tag: 'input',
          prop: {
            type: 'text',
            placeholder: 'Example: Tijuana',
            name: 'place',
            id: 'place',
          },
        },
        { tag: 'label', prop: { textContent: 'Days', htmlFor: 'days' } },
        {
          tag: 'input',
          prop: {
            type: 'number',
            min:1,
            placeholder: 7,
            max:15,
            name: 'days',
            id: 'days',
          },
        },
        {
          tag: 'fieldset',
          children: [
            {
              tag: 'legend',
              prop: { textContent: 'Choose a temparature unit' },
            },
            {
              tag: 'div',
              prop: { className: 'tempMetric' },
              children: [
                {
                  tag: 'input',
                  prop: {
                    type: 'radio',
                    id: 'celsius',
                    name: 'tempUnit',
                    value: 'metric',
                    checked: true,
                  },
                },
                {
                  tag: 'label',
                  prop: { textContent: 'Celsius (°C)', htmlFor: 'celsius' },
                },
                {
                  tag: 'input',
                  prop: {
                    type: 'radio',
                    id: 'faren',
                    name: 'tempUnit',
                    value: 'us',
                  },
                },
                {
                  tag: 'label',
                  prop: { textContent: 'Farenheit (°F)', htmlFor: 'faren' },
                },
              ],
            },
          ],
        },
        {
          tag: 'button',
          prop: { textContent: 'Search Weather', type: 'submit' },
        },
      ],
    };

    const form = this.#createDOM(formTemplate);

    return form;
  }

  forecastSection() {
    const template = {
      tag: 'section',
      prop: { className: 'forecastSect' },
      children: [{ tag: 'h2', prop: { textContent: 'Weather Forecast' } }],
    };

    const formSection = this.#createDOM(template);
    this.forecastSect = formSection;

    return formSection;
  }

  initForecastSection() {
    const template = {
      tag: 'article',
      children: [
        { tag: 'h2', prop: { textContent: 'Weather App' } },

        {
          tag: 'b',
          children: [
            {
              tag: 'p',
              prop: { textContent: 'Description' },
            },
          ],
        },

        {
          tag: 'p',
          prop: {
            textContent:
              'This is a weather app that to consult the weather forecast from any location. It works using the visual crossing API. \n To consult the weather app you just have to complete the form fillling out the location name, the number of days to display and choose if the temperature should be on celsius or farenheit.',
          },
        },
      ],
    };

    const initSection = this.#createDOM(template);

    return initSection;
  }

  weatherCardsCont(weatherData, tempUnit) {
    const template = {
      tag: 'div',
      prop: { className: 'cardsCont' },
      children: [
        {
          tag: 'h2',
          prop: { textContent: 'Weather forecast' },
        },
        {
          tag: 'button',
          prop: {
            id:'switchTempUnit',
            textContent: `Switch to ${tempUnit === 'metric' ? 'Farenheit' : 'Celsius'}`,
          },
        },
      ],
    };

    const cardsContainer = this.#createDOM(template);

    const weatherCards = weatherData.map((dayData) => {
      const { fullDate, icon, description, temp, feelslike } = dayData;

      const card = this.#weatherCard(
        fullDate,
        icon,
        description,
        temp,
        feelslike
      );
      const table = this.#weatherTable(dayData, tempUnit);
      card.append(table);

      return card;
    });

    cardsContainer.append(...weatherCards);

    return cardsContainer
  }

  #weatherTable(data){
    const {
      sunrise,
      sunset,
      tempmin,
      tempmax,
    } = data;

    const template = {
      tag: 'table',
      children: [
        {
          tag: 'thead',
          children: [
            {
              tag: 'tr',
              children: [
                {
                  tag: 'th',
                  prop: { textContent: 'Weather Details', colSpan: 2, scope: 'col'},
                },
              ],
            },
          ],
        },
        {
          tag: 'tbody',
          children: [
            {
              tag: 'tr',
              children: [
                { tag: 'td', prop: { textContent: 'Sunrise', scope: 'row' } },
                { tag: 'td', prop: { textContent: sunrise } },
              ],
            },
            {
              tag: 'tr',
              children: [
                { tag: 'td', prop: { textContent: 'Sunset', scope: 'row' } },
                { tag: 'td', prop: { textContent: sunset } },
              ],
            },
            {
              tag: 'tr',
              children: [
                {
                  tag: 'td',
                  prop: { textContent: 'Min Temperature', scope: 'row' },
                },
                { tag: 'td', prop: { textContent: tempmin, className: 'tempValue', } },
              ],
            },
            {
              tag: 'tr',
              children: [
                {
                  tag: 'td',
                  prop: { textContent: 'Max Temperature', scope: 'row' },
                },
                { tag: 'td', prop: { textContent: tempmax, className: 'tempValue', } },
              ],
            },
          ],
        },
      ],
    }

    return this.#createDOM(template)
  }

  #weatherCard(fullDate, icon, description, temp, feelslike, tempUnit) {
    const template = {
      tag: 'div',
      prop: {
        className: 'weatherCard',
        dataset: { cardIdx: crypto.randomUUID(), tempUnit: tempUnit  },
      },
      children: [
        {
          tag: 'div',
          prop: { className: 'cardHeader' },
          children: [
            { tag: 'h3', prop: { textContent: fullDate } },
            { tag: 'img', prop: { src: icon, alt: 'weather icon' } },
          ],
        },
        {
          tag: 'div',
          prop: { className: 'cardBody' },
          children: [
            { tag: 'p', prop: { textContent: description } },
            { tag: 'span', prop: { textContent: temp, className: 'tempValue', } },
            {
              tag: 'small',
              prop: {
                textContent: `Feels like ${feelslike}`,
                style: { fontStyle : 'italic' },
                className: 'tempValue',
                dataset: {}
              },
            },
          ],
        },
      ],
    };

    const weatherCard = this.#createDOM(template);
    return weatherCard
  }

  #createDOM(obj) {
    const tag = document.createElement(obj.tag);

    if (obj.prop) {
      for(const [key, value] of Object.entries(obj.prop)){
        if (typeof value == 'object' && value !== null){
          if (key in tag && typeof tag[key] === 'object'){
            Object.assign(tag[key], value);
          }
        }
        else{
          tag[key] = value
        }
      }
    }

    if (obj.children) {
      const content = obj.children.map((el) => {
        const childTag = this.#createDOM(el);
        return childTag;
      });

      tag.append(...content);
    }

    return tag;
  }
}

// const objValue = Object.values(properties).some(value => value !== null && typeof value === "object");

// if (objValue) {
//   Object.entries(properties)
//   .filter(([key, value]) => typeof value === "object")
//   .forEach(([key, value]) => { 
//     Object.assign(tag[key], value);
//   });        
// }
// else {
//   Object.assign(tag, properties);
// }     

// if (obj.prop) 
//   for (const [key, value] of Object.entries(obj.prop)){
//     if (value !== null && typeof value === "object") {
//       if (key in tag && typeof tag[key] === "object"){
//         Object.assign(tag[key], value);
//       }
//     }
//     else {
//       tag[key] = value;
//     }
// }   