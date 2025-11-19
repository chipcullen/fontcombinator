import { configuredFonts } from "./configured-fonts.js";
import { FONT_CHANGE_EVENT } from "./constants.js";

const fontSelectTemplate = document.createElement("template");
fontSelectTemplate.innerHTML = `
<style>
  select {
  &, &::picker(select) {
    appearance: base-select;
    font-family: sans-serif;
    max-width: 100vw;

    h2 {
      font-size: 1.2em;
      margin: 10px;
      }
  }
  option {
    outline: 1px solid grey;
    margin: 10px;
    text-wrap: wrap;
    max-width: 100vw;
    border-radius: 5px;

    &:focus, &:hover {
      outline-width: 3px;
      background-color: LightCyan;
    }
  }
}
</style>
<label>
  Font Family:
  <select>
    <h2>Google Fonts</h2>
    <hr />
  </select>
</label>
`;

class FontSelect extends HTMLElement {
  constructor() {
    super();
    const shadow = this.attachShadow({ mode: "open" });
    shadow.append(fontSelectTemplate.content.cloneNode(true));
    this.select = shadow.querySelector("select");
    this.targetedElement = this.getAttribute("target");
  }

  static get observedAttributes() {
    return ["target"];
  }

  async attributeChangedCallback(name, oldValue, newValue) {
    switch (name) {
      case "target":
        this.select.setAttribute("target", newValue);
        break;
      default:
        break;
    }
  }

  connectedCallback() {
    // sort configuredFonts by family name
    configuredFonts.sort((a, b) => {
      return a.family.localeCompare(b.family);
    });

    const storedConfig = JSON.parse(localStorage.getItem("config"));
    const target = this.targetedElement;

    configuredFonts.forEach((font, index) => {
      const { family, slug } = font;
      const option = document.createElement("option");
      option.value = slug;
      option.dataset.family = family;
      option.innerText = family;
      option.style.fontFamily = family;

      if (storedConfig && storedConfig[target]) {
        const currentFontFamily = storedConfig[target].fontFamily;
        if (currentFontFamily.includes(family)) {
          option.selected = true;
          this.select.style.fontFamily = family;
        }
      }

      this.select.appendChild(option);
    });

    this.select.addEventListener("change", (e) => {
      const selectedFont = e.target.value;
      const selectedFontFamily = e.target.selectedOptions[0].dataset.family;
      this.select.style.fontFamily = selectedFontFamily;

      const fontChangeEvent = new CustomEvent(FONT_CHANGE_EVENT, {
        detail: {
          slug: selectedFont,
          target: this.select.getAttribute("target"),
        },
        bubbles: true,
        cancelable: true,
      });

      this.dispatchEvent(fontChangeEvent);
    });
  }
}

customElements.define("font-select", FontSelect);
