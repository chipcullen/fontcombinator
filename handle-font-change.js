import { allFonts } from "./get-google-fonts.js";
import { buildLinkToGoogleFonts } from "./build-links-to-google-fonts.js";
import { FONT_CHANGE_EVENT, SUPPORTED_AXES } from "./constants.js";

document.addEventListener(FONT_CHANGE_EVENT, (e) => {
  const selectedFont = e.detail.slug;
  const target = e.detail.target;

  const selectedFontObject = allFonts.find((font) => {
    return font.slug === selectedFont;
  });

  let axesString = null;
  if (selectedFontObject.axes) {
    const axesTags = [];
    const axesRanges = [];
    selectedFontObject.axes.forEach((axis) => {
      // skip if axis.tag is not in SUPPORTED_AXES, toss it
      if (!SUPPORTED_AXES.includes(axis.tag)) return;
      axesTags.push(axis.tag);
      axesRanges.push(`${axis.start}..${axis.end}`);
    });
    axesString = axesTags.join(",") + "@" + axesRanges.join(",");
  }
  buildLinkToGoogleFonts(selectedFont, null, axesString);
  document.querySelector(target).style.fontFamily = selectedFontObject.family;
});
