import { getSelectedFontObject } from "./get-google-fonts.js";
import { FONT_CHANGE_EVENT, STYLE_CHANGE_EVENT } from "./constants.js";

const fontControlTemplate = document.createElement("template");
fontControlTemplate.innerHTML = `
<style>
  .font-control {
    display: flex;
    flex-direction: column;
    gap: 10px;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
    background-color: #f9f9f9;
  }

  @supports not (text-box-trim: none) {
    .text-box-trim-control {
      display: none;
    }
  }
  @supports not (text-box-edge: auto) {
    .text-box-edge-control {
      display: none;
    }
  }
</style>
<div class="font-control">
  <label>
    Font Size:
    <input type="range" data-css-property="fontSize" data-css-unit="px" min="1" max="100" value="16" />
    <span>16px</span>
  </label>
  <label>
    Line Height:
    <input type="range" data-css-property="lineHeight" min="0.5" max="4" step="0.1" value="1.5" />
    <span>1.5</span>
  </label>
  <label>
    Color:
    <input type="color" data-css-property="color" value="#000000" />
    <span>#000000</span>
  </label>
  <label class="text-box-trim-control">
    Text Box Trim:
    <select data-css-property="textBoxTrim">
      <option value="none">None</option>
      <option value="trim-both">Trim Both</option>
      <option value="trim-start">Trim Start</option>
      <option value="trim-end">Trim End</option>
    </select>
  </label>
  <label class="text-box-edge-control">
    Text Box Edge:
    <select data-css-property="textBoxEdge">
      <option value="auto">auto</option>
      <option value="cap alphabetic">cap alphabetic</option>
      <option value="text">text</option>
      <option value="text text">text text</option>
      <option value="text alphabetic">text alphabetic</option>
      <option value="ex text">ex text</option>
    </select>
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
      // @TODO handle variable fonts vs non-variable fonts
      const selectedFontObject = getSelectedFontObject(e.detail.slug);
      console.log(selectedFontObject);
    }

    if (e.type === "input") {
      const input = e.target;
      const value = input.value;
      const cssProperty = input.dataset.cssProperty;
      const cssUnit = input.dataset.cssUnit;
      const span = input.nextElementSibling;

      if (span) {
        span.innerText = `${value}${cssUnit ? cssUnit : ""}`;
      }

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

  // static get observedAttributes() {
  //   return ["target"];
  // }

  // async attributeChangedCallback(name, oldValue, newValue) {
  //   switch (name) {
  //     case "target":
  //       break;
  //     default:
  //       break;
  //   }
  // }

  async connectedCallback() {}
}

customElements.define("font-control", FontControl);
