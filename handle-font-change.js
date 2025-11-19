import { getSelectedFontObject } from "./get-google-fonts.js";
import { buildLinkToGoogleFonts } from "./build-links-to-google-fonts.js";
import { FONT_CHANGE_EVENT } from "./constants.js";
import { buildAxesString } from "./build-axes-string.js";

document.addEventListener(FONT_CHANGE_EVENT, (e) => {
  const selectedFont = e.detail.slug;
  const target = document.querySelector(e.detail.target);
  const config = JSON.parse(localStorage.getItem("config"));
  localStorage.setItem("config", JSON.stringify(config));
  const selectedFontObject = getSelectedFontObject(selectedFont);

  // Start loading state
  target.style.transition = "opacity 0.2s ease";
  target.style.opacity = "0.5";

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
    target.style.fontFamily = `'${selectedFontObject.family}'`;

    // Check if font loaded and restore opacity
    document.fonts.ready.then(() => {
      requestAnimationFrame(() => {
        target.style.opacity = "1";
      });
    });
  });
});
