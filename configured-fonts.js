import { topVariableFonts, allFonts, topFonts } from "./get-google-fonts.js";
import { TOP_VARIABLE_FONTS, TOP_FONTS, ALL_FONTS } from "./constants.js";

const config = JSON.parse(localStorage.getItem("config"));

let configuredFonts = topVariableFonts;

if (config && config.configuredFonts) {
  switch (config.configuredFonts) {
    case ALL_FONTS:
      configuredFonts = allFonts;
      break;
    case TOP_FONTS:
      configuredFonts = topFonts;
      break;
    case TOP_VARIABLE_FONTS:
    default:
      configuredFonts = topVariableFonts;
      break;
  }
}

export { configuredFonts };
