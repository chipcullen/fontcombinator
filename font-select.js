import { configuredFonts } from "./configured-fonts.js";
import { FONT_CHANGE_EVENT } from "./constants.js";

const fontSelectTemplate = document.createElement("template");
fontSelectTemplate.innerHTML = `
<style>
  label {
    font-family: sans-serif;
    margin-block-end: 10px;
    display: inline-block;
  }
  select {
  &, &::picker(select) {
    appearance: base-select;
    font-family: sans-serif;
    background-color: #fff;

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
    <h2>System Fonts</h2>
    <option
      value="arial"
      data-family="arial"
      style="font-family: Arial">
      Arial
    </option>
    <option
      value="helvetica"
      data-family="helvetica"
      style="font-family: Helvetica">
      Helvetica
    </option>
    <option
      value="times-new-roman"
      data-family="times-new-roman"
      style="font-family: 'Times New Roman'">
      Times New Roman
    </option>
    <option
      value="system-ui"
      data-family="system-ui"
      style="font-family: -apple-system, BlinkMacSystemFont, sans-serif">
      system ui
    </option>
    <option
      value="sans-serif"
      data-family="sans-serif"
      style="font-family: sans-serif">
      sans-serif
    </option>
    <option
      value="serif"
      data-family="serif"
      style="font-family: serif">
      serif
    </option>
    <option
      value="monospace"
      data-family="monospace"
      style="font-family: monospace">
      monospace
    </option>
    <option
      value="cursive"
      data-family="cursive"
      style="font-family: cursive">
      cursive
    </option>
    <option
      value="fantasy"
      data-family="fantasy"
      style="font-family: fantasy">
      fantasy
    </option>
    <hr />
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

    // if a system font is selected in storedConfig, set that as selected
    if (storedConfig && storedConfig[target]) {
      const currentFontFamily = storedConfig[target].fontFamily;
      const systemFontOption = Array.from(this.select.options).find(
        (option) =>
          option.dataset.family &&
          currentFontFamily.includes(option.dataset.family)
      );
      if (systemFontOption) {
        systemFontOption.selected = true;
        this.select.style.fontFamily = systemFontOption.dataset.family;
      }
    }

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
