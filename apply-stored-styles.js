import {
  getSelectedFontObject,
  getSelectedFontObjectByFamily,
} from "./get-google-fonts.js";
import { buildLinkToGoogleFonts } from "./build-links-to-google-fonts.js";
import { buildAxesString } from "./build-axes-string.js";

const config = JSON.parse(localStorage.getItem("config"));

if (config) {
  for (const [target, rules] of Object.entries(config)) {
    for (const [property, rule] of Object.entries(rules)) {
      // console.log(target)
      // console.log(`${property}: ${rule}`);
      if (target !== "page") {
        if (property === "fontFamily") {
          const selectedFontObject = getSelectedFontObjectByFamily(rule);
          // NOTE selectedFontObject is only a thing for Google Fonts,
          // not system fonts.
          if (selectedFontObject) {
            buildLinkToGoogleFonts(
              selectedFontObject.slug,
              null,
              buildAxesString(selectedFontObject)
            );
          }
        }
        document.querySelector(target).style[property] = rule;
      }
    }
  }
}
