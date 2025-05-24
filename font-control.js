import { FONT_CHANGE_EVENT, STYLE_CHANGE_EVENT } from "./constants.js";

const fontControlTemplate = document.createElement("template");
fontControlTemplate.innerHTML = `
<style>
</style>
<div>
  <label>
    Size:
    <input type="range" data-css-property="fontSize" data-css-unit="px" min="1" max="100" value="16" />
    <span>16px</span>
  </label>
  <label>
    Color:
    <input type="color" data-css-property="color" value="#000000" />
    <span>#000000</span>
  </label>
</div>
`;

class FontControl extends HTMLElement {
  constructor() {
    super();
    const shadow = this.attachShadow({ mode: "open" });
    shadow.append(fontControlTemplate.content.cloneNode(true));
    document.addEventListener(FONT_CHANGE_EVENT, this);
    shadow.addEventListener("input", this);
    this.targetedElement = this.getAttribute("target");
  }

  handleEvent(e) {
    if (
      e.type === FONT_CHANGE_EVENT &&
      e.detail.target === this.getAttribute("target")
    ) {
      console.log(
        "need to determine if the font is variable and what axis it has"
      );
    }

    if (e.type === "input") {
      const input = e.target;
      const value = input.value;
      const cssProperty = input.dataset.cssProperty;
      const cssUnit = input.dataset.cssUnit;
      const span = input.nextElementSibling;

      span.innerText = `${value}${cssUnit ? cssUnit : ""}`;

      const styleChangeEvent = new CustomEvent(STYLE_CHANGE_EVENT, {
        detail: {
          cssProperty: cssProperty,
          cssUnit: cssUnit,
          value: value,
          target: this.targetedElement,
        },
        bubbles: true,
        cancelable: true,
      });

      this.dispatchEvent(styleChangeEvent);
    }
  }

  static get observedAttributes() {
    return ["target"];
  }

  async attributeChangedCallback(name, oldValue, newValue) {
    switch (name) {
      case "target":
        break;
      default:
        break;
    }
  }

  async connectedCallback() {}
}

customElements.define("font-control", FontControl);
