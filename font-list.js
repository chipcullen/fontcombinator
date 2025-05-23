import { topVariableFonts } from "./get-google-fonts.js";
import { buildLinkToGoogleFonts } from "./build-links-to-google-fonts.js";

const fontListTemplate = document.createElement("template");
fontListTemplate.innerHTML = `
<style>
  select {
  &, &::picker(select) {
    appearance: base-select;
    font-family: sans-serif;
    max-width: 100vw;
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
<select></select>
`;

class FontList extends HTMLElement {
  constructor() {
    super();
    const shadow = this.attachShadow({ mode: "open" });
    shadow.append(fontListTemplate.content.cloneNode(true));
    this.select = shadow.querySelector("select");
  }

  async connectedCallback() {
    console.log({ topVariableFonts });
    // sort topVariableFonts by family name
    topVariableFonts.sort((a, b) => {
      return a.family.localeCompare(b.family);
    });

    topVariableFonts.forEach((font, index) => {
      const { family, slug } = font;
      const option = document.createElement("option");
      option.value = slug;
      option.dataset.family = family;
      option.innerText = family;
      option.style.fontFamily = family;

      this.select.appendChild(option);
    });

    this.select.addEventListener("change", (e) => {
      const selectedFont = e.target.value;
      const selectedFontFamily = e.target.selectedOptions[0].dataset.family;
      this.select.style.fontFamily = selectedFontFamily;
      // console log the selected font from topVariableFonts
      const selectedFontObject = topVariableFonts.find((font) => {
        return font.slug === selectedFont;
      });
      console.log({ selectedFontObject });
      let axesString = null;
      if (selectedFontObject.axes) {
        console.log("This is a variable font");
        const axesTags = [];
        const axesRanges = [];
        selectedFontObject.axes.forEach((axis) => {
          axesTags.push(axis.tag);
          axesRanges.push(`${axis.start}..${axis.end}`);
        });
        axesString = axesTags.join(",") + "@" + axesRanges.join(",");
        // :<axis_a>,<axis_b>@<axis_a_range>,<axis_b_range>
      }
      console.log({ axesString });
      buildLinkToGoogleFonts(selectedFont, null, axesString);
      document.body.style.fontFamily = selectedFontFamily;
    });
  }
}

customElements.define("font-list", FontList);
