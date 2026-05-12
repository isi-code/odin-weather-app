const formDOM = {
  form: [
    { label: { textContent: "Location", htmlFor: "place" } },
    {
      input: {
        type: "text",
        placeholder: "Example: Tijuana",
        name: "place",
        id: "place",
      },
    },
    {
      fieldset: [
        { legend: { textContent: "Temperature Scale" } },
        {
          div: {
            content: [
              {
                input: {
                  type: "radio",
                  id: "celsius",
                  name: "tempUnit",
                  value: "metric",
                  checked: true,
                },
              },
              {
                label: {
                  textContent: "Celsius (°C)",
                  htmlFor: "celsius",
                },
              },
              {
                input: {
                  type: "radio",
                  id: "faren",
                  name: "tempUnit",
                  value: "us",
                },
              },
              { label: { textContent: "Farenheit (°F)", htmlFor: "faren" } },
            ],
            attr: {
              className: "tempMetric",
            },
          },
        },
      ],
    },
    { button: { textContent: "Search Weather", type: "submit" } },
  ],
};

export function createForm(obj = formDOM) {
  for (const [key, value] of Object.entries(obj)) {
    const elem = document.createElement(key);

    if (Array.isArray(value)) {
      const content = value.map((el) => {
        const [[k, v]] = Object.entries(el);

        if (Array.isArray(v)) return createForm(el);
        else if (
          typeof v === "object" &&
          v !== null &&
          ("content" in v || "attr" in v)
        ) {
          const contents = { [k]: v.content };
          const newTag = createForm(contents);
          if (v.attr) Object.assign(newTag, v.attr);
          return newTag;
        } else {
          const childElem = document.createElement(k);
          Object.assign(childElem, v);
          return childElem;
        }
      });

      elem.append(...content);
    }
    return elem;
  }
}
