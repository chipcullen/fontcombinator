import { configuredFonts } from "./configured-fonts.js";
import { FONT_CHANGE_EVENT } from "./constants.js";

const fontControlTemplate = document.createElement("template");
fontControlTemplate.innerHTML = `
<style>


</style>
<div>
  Controls go here
</div>
`;

class FontControl extends HTMLElement {
  constructor() {
    super();
    const shadow = this.attachShadow({ mode: "open" });
    shadow.append(fontControlTemplate.content.cloneNode(true));
    document.addEventListener(FONT_CHANGE_EVENT, this);
  }

  handleEvent(e) {
    if (
      e.type === FONT_CHANGE_EVENT &&
      e.detail.target === this.getAttribute("target")
    ) {
      console.log("is me");
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
