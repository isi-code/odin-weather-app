export function createForm() {
  const form = document.createElement("form");

  const formDOM = {
    placeLabel: { tag: "label", textContent: "Location", htmlFor: "place" },
    placeInput: {
      tag: "input",
      type: "text",
      placeholder: "Example: Tijuana",
      name: "place",
      id: "place",
    },
    button: { tag: "button", textContent: "Search Weather", type: "submit" },
  };

  for (const key in formDOM) {
    const elem = document.createElement(formDOM[key].tag);
    Object.assign(elem, formDOM[key]);
    delete elem.tag;

    form.append(elem);
  }
  return form;
}
