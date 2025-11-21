import { updateConfig } from "./update-config.js";
import {
  TOP_VARIABLE_FONTS,
  TOP_FONTS,
  ALL_FONTS,
  TOP_NUMBER_OF_FONTS,
} from "./constants.js";

const configureFontSelectTemplate = document.createElement("template");
configureFontSelectTemplate.innerHTML = `
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
  Google Fonts to Use:
  <select>
    <option
      value="${TOP_VARIABLE_FONTS}">
      Top ${TOP_NUMBER_OF_FONTS} Variable Fonts
    </option>
    <option
      value="${TOP_FONTS}">
      Top ${TOP_NUMBER_OF_FONTS} Fonts Overall
    </option>
    <option
      value="${ALL_FONTS}">
      All Fonts - Warning! Slow Load Time
    </option>
  </select>
</label>
`;

class ConfigureFontSelect extends HTMLElement {
  constructor() {
    super();
    const shadow = this.attachShadow({ mode: "open" });
    shadow.append(configureFontSelectTemplate.content.cloneNode(true));
    this.select = shadow.querySelector("select");
  }

  connectedCallback() {
    const config = JSON.parse(localStorage.getItem("config"));
    if (config && config.configuredFonts) {
      this.select.value = config.configuredFonts;
    }

    this.select.addEventListener("change", (e) => {
      const selectedConfiguration = e.target.value;
      updateConfig("configuredFonts", null, selectedConfiguration);
    });
  }
}

customElements.define("configure-font-select", ConfigureFontSelect);
