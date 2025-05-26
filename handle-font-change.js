import { getSelectedFontObject } from "./get-google-fonts.js";
import { buildLinkToGoogleFonts } from "./build-links-to-google-fonts.js";
import { FONT_CHANGE_EVENT } from "./constants.js";
import { buildAxesString } from "./build-axes-string.js";

document.addEventListener(FONT_CHANGE_EVENT, (e) => {
  const selectedFont = e.detail.slug;
  const target = e.detail.target;

  const selectedFontObject = getSelectedFontObject(selectedFont);

  // remove existing link to google fonts for selectedFont
  // if we don't do this there is a weird collision at 400 weight
  const existingLink = document.querySelector(`link[href*="${selectedFont}"]`);
  if (existingLink) existingLink.remove();

  // add new link to google fonts with text set to null, and added axes
  buildLinkToGoogleFonts(
    selectedFont,
    null,
    buildAxesString(selectedFontObject)
  );
  document.querySelector(
    target
    // this string treatment is weird, but we need it in case the font family has a number
    // in it's name. JS doesn't like that out of the box.
  ).style.fontFamily = `'${selectedFontObject.family}'`;
});
