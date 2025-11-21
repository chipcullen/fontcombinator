import { getSelectedFontObject } from "./get-google-fonts.js";
import { buildLinkToGoogleFonts } from "./build-links-to-google-fonts.js";
import { FONT_CHANGE_EVENT } from "./constants.js";
import { buildAxesString } from "./build-axes-string.js";
import { updateConfig } from "./update-config.js";

document.addEventListener(FONT_CHANGE_EVENT, (e) => {
  const selectedFont = e.detail.slug;
  const target = e.detail.target;
  const targetElement = document.querySelector(target);
  const selectedFontObject = getSelectedFontObject(selectedFont);

  if (selectedFontObject) {
    updateConfig(target, "fontFamily", selectedFontObject.family);

    // clear out italic if it was set previously
    updateConfig(target, "fontStyle", "normal");

    // Start loading state
    targetElement.style.transition = "opacity 0.2s ease";
    targetElement.style.opacity = "0.5";

    // remove existing link to google fonts for selectedFont
    // if we don't do this there is a weird collision at 400 weight
    const existingLink = document.querySelector(
      `link[href*="${selectedFont}"]`
    );
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
      // clear italic style
      targetElement.style.fontStyle = "normal";

      // Check if font loaded and restore opacity
      document.fonts.ready.then(() => {
        requestAnimationFrame(() => {
          targetElement.style.opacity = "1";
        });
      });
    });
  } else {
    // System font selected
    switch (selectedFont) {
      case "system-ui":
        targetElement.style.fontFamily =
          "-apple-system, BlinkMacSystemFont, sans-serif";
        break;
      case "arial":
        targetElement.style.fontFamily = "Arial";
        break;
      case "helvetica":
        targetElement.style.fontFamily = "Helvetica";
        break;
      case "times-new-roman":
        targetElement.style.fontFamily = "Times New Roman";
        break;
      case "serif":
      case "sans-serif":
      case "monospace":
      case "cursive":
      case "fantasy":
        targetElement.style.fontFamily = selectedFont;
      default:
        console.warn(`Unknown system font selected: ${selectedFont}`);
        break;
    }
    updateConfig(target, "fontFamily", selectedFont);
    // clear italic style
    targetElement.style.fontStyle = "normal";
  }
});
