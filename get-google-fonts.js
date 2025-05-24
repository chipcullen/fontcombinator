import { SUBSET, PUBLIC_API_KEY, TOP_NUMBER_OF_FONTS } from "./constants.js";

// Google Fonts API documentation: https://developers.google.com/fonts/docs/developer_api
// category: serif | sans-serif | monospace | display | handwriting
// capability: VF | WOFF2
// sort: alpha | date | popularity | style | trending
const getAllGoogleFonts = async (
  sort = "alpha",
  capability = "VF",
  category
) => {
  const url = new URL("https://www.googleapis.com/webfonts/v1/webfonts");
  url.searchParams.append("key", PUBLIC_API_KEY);
  url.searchParams.append("sort", sort);
  url.searchParams.append("capability", capability);
  url.searchParams.append("subset", SUBSET);

  if (category) {
    url.searchParams.append("category", category);
  }

  const response = await fetch(url);
  const data = await response.json();

  let { items } = data;

  // Special case the "Noto Sans" and "Noto Serif" families
  items = items.filter((font) => {
    // to only include the root family "Noto Sans" and "Noto Serif"
    return (
      // All the other forms have "Noto Sans Example" or "Noto Serif Example"
      // but are considered latin subsets.
      // This is confusing.
      !font.family.includes("Noto Sans ") &&
      !font.family.includes("Noto Serif ")
    );
  });

  // for each item, add a slug with spaces replaced by +
  items.forEach((item) => {
    item.slug = item.family.replaceAll(" ", "+");
  });

  return items;
};

const allFonts = await getAllGoogleFonts("popularity");
const topFonts = allFonts.slice(0, TOP_NUMBER_OF_FONTS);

const variableFonts = allFonts.filter((font) => {
  return font.axes !== undefined;
});

const topVariableFonts = variableFonts.slice(0, TOP_NUMBER_OF_FONTS);

const getSelectedFontObject = (fontSlug) => {
  const selectedFontObject = allFonts.find((font) => {
    return font.slug === fontSlug;
  });
  return selectedFontObject;
};

export {
  allFonts,
  variableFonts,
  topVariableFonts,
  topFonts,
  getSelectedFontObject,
};
