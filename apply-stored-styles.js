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
          // this string treatment is weird, but we need it in case the font family has a number
          // in it's name. JS doesn't like that out of the box.
          document.querySelector(target).style[property] = `'${rule}'`;
        } else {
          document.querySelector(target).style[property] = rule;
        }
      } else if (target === "page" && property === "backgroundColor") {
        document.body.style.backgroundColor = rule;
      }
    }
  }
}
