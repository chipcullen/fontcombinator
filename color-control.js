import { STYLE_CHANGE_EVENT } from "./constants.js";

const colorControlTemplate = document.createElement("template");
colorControlTemplate.innerHTML = `
<style>
  .color-control {
    display: flex;
    flex-direction: column;
    gap: 10px;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
    background-color: #f9f9f9;
    font-family: sans-serif;
  }
</style>
<div class="color-control">
  <label>
    Background Color:
    <input type="color" data-css-property="backgroundColor" value="#ffffff" />
    <span>#ffffff</span>
  </label>
</div>
`;

class ColorControl extends HTMLElement {
  constructor() {
    super();
    const shadow = this.attachShadow({ mode: "open" });
    shadow.append(colorControlTemplate.content.cloneNode(true));
    shadow.addEventListener("input", this);
    this.targetedElement = this.getAttribute("target");
  }

  // In the connectedCallback or a separate method
  updateControlsFromConfig() {
    const config = JSON.parse(localStorage.getItem("config"));
    const target = this.targetedElement;

    if (config && config[target]) {
      const targetConfig = config[target];

      // Update each input based on stored values
      const inputs = this.shadowRoot.querySelectorAll("input");
      inputs.forEach((input) => {
        const cssProperty = input.dataset.cssProperty;
        if (targetConfig[cssProperty]) {
          input.value = targetConfig[cssProperty];
          this.updateDisplayValue(input); // Update the span display
        }
      });
    }
  }

  updateDisplayValue(input) {
    const span = input.nextElementSibling;
    if (span) {
      span.innerText = `${input.value}`;
    }
  }

  connectedCallback() {
    this.updateControlsFromConfig();
  }

  handleEvent(e) {
    if (e.type === "input") {
      const value = e.target.value;
      this.updateDisplayValue(e.target);

      const styleChangeEvent = new CustomEvent(STYLE_CHANGE_EVENT, {
        detail: {
          cssProperty: "backgroundColor",
          value: value,
          target: this.targetedElement,
        },
        bubbles: true,
        cancelable: true,
      });

      this.dispatchEvent(styleChangeEvent);
    }
  }
}

customElements.define("color-control", ColorControl);
