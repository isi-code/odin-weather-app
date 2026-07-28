export class WeatherAppDom {
  constructor(elem) {
    this.container = elem;
    this.searchWeatherForm = null;
  }

  formSection() {
    const formSectionTemp = {
      tag: 'section',
      prop: { className: 'formSect' },
      children: [{ tag: 'h1', prop: { textContent: 'Weather app' } }],
    };

    const formSection = this.#createDOM(formSectionTemp);
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
        {
          tag: 'fieldset',
          children: [
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

  currWeatherTable(weatherData) {
    const currWeatherData = weatherData[0];
    const weatherCardTemplate = this.#attachDataTable(currWeatherData);
    const weatherCard = this.#createDOM(weatherCardTemplate);

    return weatherCard;
  }

  extendedWeatherTable(weatherData) {
    const extWeatherData = weatherData;

    return extWeatherData.map((cardData) => {
      const cardTemplate = this.#attachDataTable(cardData);
      const weatherCard = this.#createDOM(cardTemplate);

      return weatherCard;
    });
  }

  #attachDataTable(data) {
    const {
      fullDate,
      icon,
      description,
      temp,
      sunrise,
      sunset,
      tempmin,
      tempmax,
    } = data;

    return {
      tag: 'div',
      prop: { className: 'weatherCard' },
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
            { tag: 'span', prop: { textContent: temp } },
            {
              tag: 'small',
              prop: {
                textContent: `Feels like ${temp}`,
                style: 'font-style: italic;',
              },
            },
          ],
        },
        {
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
                      prop: { textContent: 'Weather Details', colSpan: 2 },
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
                    { tag: 'td', prop: { textContent: 'Sunrise' } },
                    { tag: 'td', prop: { textContent: sunrise } },
                  ],
                },
                {
                  tag: 'tr',
                  children: [
                    { tag: 'td', prop: { textContent: 'Sunset' } },
                    { tag: 'td', prop: { textContent: sunset } },
                  ],
                },
                {
                  tag: 'tr',
                  children: [
                    { tag: 'td', prop: { textContent: 'Min Temperature' } },
                    { tag: 'td', prop: { textContent: tempmin } },
                  ],
                },
                {
                  tag: 'tr',
                  children: [
                    { tag: 'td', prop: { textContent: 'Max Temperature' } },
                    { tag: 'td', prop: { textContent: tempmax } },
                  ],
                },
              ],
            },
          ],
        },
      ],
    };
  }

  #createDOM(obj) {
    const tag = document.createElement(obj.tag);

    if (obj.prop) Object.assign(tag, obj.prop);

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
