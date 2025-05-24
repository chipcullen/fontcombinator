import { allFonts, getSelectedFontObject } from "./get-google-fonts.js";
import { buildLinkToGoogleFonts } from "./build-links-to-google-fonts.js";
import { FONT_CHANGE_EVENT, SUPPORTED_AXES } from "./constants.js";

document.addEventListener(FONT_CHANGE_EVENT, (e) => {
  const selectedFont = e.detail.slug;
  const target = e.detail.target;

  const selectedFontObject = getSelectedFontObject(selectedFont);

  const { axes, variants } = selectedFontObject;

  // let variantString = null;
  let axesString = null;

  // if (variants && variants.length > 0) {
  //   const variantsArray = [];
  //   variants.forEach((variant) => {
  //     if (variant === "regular") return;
  //     if (variant === "italic") variantsArray.push("ital");
  //   });
  //   variantString = variantsArray.join(",");
  //   console.log(variantString);
  // }

  if ((axes && axes.length > 0) || (variants && variants.length > 0)) {
    const axesTags = [];
    const axesRanges = [];

    const hasItalic = variants.includes("italic");

    if (hasItalic) {
      axesTags.push("ital");
    }

    axes?.forEach((axis) => {
      // skip if axis.tag is not in SUPPORTED_AXES, toss it
      if (!SUPPORTED_AXES.includes(axis.tag)) return;
      axesTags.push(axis.tag);
      axesRanges.push(`${axis.start}..${axis.end}`);
    });

    if (hasItalic) {
      axesString = `${axesTags.join(",")}@0,${axesRanges.join(
        ","
      )};1,${axesRanges.join(",")}`;
    } else {
      axesString = axesTags.join(",") + "@" + axesRanges.join(",");
    }
  }

  // remove existing link to google fonts for selectedFont
  // if we don't do this there is a weird collision at 400 weight
  const existingLink = document.querySelector(`link[href*="${selectedFont}"]`);
  if (existingLink) existingLink.remove();

  // add new link to google fonts with text set to null, and added axes
  buildLinkToGoogleFonts(selectedFont, null, axesString);
  document.querySelector(
    target
    // this string treatment is weird, but we need it in case the font family has a number
    // in it's name. JS doesn't like that out of the box.
  ).style.fontFamily = `'${selectedFontObject.family}'`;
});
