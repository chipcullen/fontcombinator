import { getSelectedFontObject } from "./get-google-fonts.js";
import { buildLinkToGoogleFonts } from "./build-links-to-google-fonts.js";
import { FONT_CHANGE_EVENT } from "./constants.js";
import { buildAxesString } from "./build-axes-string.js";

document.addEventListener(FONT_CHANGE_EVENT, (e) => {
  const selectedFont = e.detail.slug;
  const target = e.detail.target;
  const targetElement = document.querySelector(target);
  const config = JSON.parse(localStorage.getItem("config"));
  const selectedFontObject = getSelectedFontObject(selectedFont);
  config[target].fontFamily = selectedFontObject.family;
  localStorage.setItem("config", JSON.stringify(config));

  // Start loading state
  targetElement.style.transition = "opacity 0.2s ease";
  targetElement.style.opacity = "0.5";

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

  // Use RAF to ensure smooth transition
  requestAnimationFrame(() => {
    // this string treatment is weird, but we need it in case the font family has a number
    // in it's name. JS doesn't like that out of the box.
    targetElement.style.fontFamily = `'${selectedFontObject.family}'`;

    // Check if font loaded and restore opacity
    document.fonts.ready.then(() => {
      requestAnimationFrame(() => {
        targetElement.style.opacity = "1";
      });
    });
  });
});
