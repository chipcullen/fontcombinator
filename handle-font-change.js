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

  // remove existing link to google fonts for selectedFont
  // if we don't do this there is a weird collision at 400 weight
  const existingLink = document.querySelector(`link[href*="${selectedFont}"]`);
  if (existingLink) existingLink.remove();
  // add new link to google fonts with text set to null, and added axes
  buildLinkToGoogleFonts(selectedFont, null, axesString);
  console.log(selectedFontObject.family);
  document.querySelector(
    target
    // this string treatment is weird, but we need it in case the font family has a number
    // in it's name. JS doesn't like that out of the box.
  ).style.fontFamily = `'${selectedFontObject.family}'`;
});
