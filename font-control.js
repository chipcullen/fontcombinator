import { getSelectedFontObject } from "./get-google-fonts.js";
import {
  FONT_CHANGE_EVENT,
  STYLE_CHANGE_EVENT,
  SUPPORTED_AXES,
} from "./constants.js";

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

  .fixed-controls, .variable-controls {
    display: flex;
    flex-direction: column;
    gap: 10px;
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
  <div class="fixed-controls">
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
  <div class="variable-controls">
  </div>
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
      const selectedFontObject = getSelectedFontObject(e.detail.slug);
      this.adjustVariableControls(selectedFontObject);
    }

    if (e.type === "input") {
      const input = e.target;
      let value = input.value;
      let cssProperty = input.dataset.cssProperty;
      let cssUnit = input.dataset.cssUnit;
      const span = input.nextElementSibling;

      if (span) {
        span.innerText = `${value}${cssUnit ? cssUnit : ""}`;
      }

      // special case for slnt
      if (cssProperty === "slnt") {
        cssProperty = "fontVariationSettings";
        cssUnit = "";
        value = `"slnt" ${value}`;
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

  adjustVariableControls(selectedFontObject) {
    // console.log("Adjusting variable controls for:", selectedFontObject);

    const { axes, variants } = selectedFontObject;
    const variableControlsContainer =
      this.shadowRoot.querySelector(".variable-controls");
    variableControlsContainer.innerHTML = ""; // Clear previous controls
    // @TODO handle variable fonts vs non-variable fonts
    if (variants && variants.length > 0) {
      // console.log(variants);
      variants.forEach((variant) => {
        switch (variant) {
          case "regular":
            break;
          case "italic":
            const label = document.createElement("label");
            label.innerText = `Font Style: `;
            const variantSelect = document.createElement("select");
            variantSelect.dataset.cssProperty = "fontStyle";
            variantSelect.dataset.cssUnit = "";
            const regularOption = document.createElement("option");
            regularOption.value = "normal";
            regularOption.innerText = "Regular";
            const italicOption = document.createElement("option");
            italicOption.value = "italic";
            italicOption.innerText = "Italic";
            variantSelect.appendChild(regularOption);
            variantSelect.appendChild(italicOption);
            label.appendChild(variantSelect);
            variableControlsContainer.appendChild(label);
            break;
        }
      });
    }

    if (axes && axes.length > 0) {
      axes.forEach((axis) => {
        if (!SUPPORTED_AXES.includes(axis.tag)) {
          return;
        }
        const { tag, start, end } = axis;
        const label = document.createElement("label");
        const input = document.createElement("input");

        if (tag === "wdth") {
          label.innerText = `Width:`;
          input.dataset.cssProperty = "fontStretch";
          input.dataset.cssUnit = "%";
        }

        if (tag === "wght") {
          label.innerText = `Weight:`;
          input.dataset.cssProperty = "fontWeight";
        }

        if (tag === "slnt") {
          label.innerText = `Slant:`;
          input.dataset.cssProperty = "slnt";
        }

        input.type = "range";
        input.min = start;
        input.max = end;
        input.step = 1;

        const span = document.createElement("span");

        label.appendChild(input);
        label.appendChild(span);
        variableControlsContainer.appendChild(label);
      });
    }
  }
}

customElements.define("font-control", FontControl);
