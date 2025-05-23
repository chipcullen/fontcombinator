import { SUBSET, PUBLIC_API_KEY, TOP_NUMBER_OF_FONTS } from "./constants.js";

// Google Fonts API documentation: https://developers.google.com/fonts/docs/developer_api
// category: serif | sans-serif | monospace | display | handwriting
// capability: VF | WOFF2
// sort: alpha | date | popularity | style | trending
const getGoogleFonts = async (sort = "alpha", capability = "VF", category) => {
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

  const { items } = data;

  // for each item, add a slug with spaces replaced by +
  items.forEach((item) => {
    item.slug = item.family.replaceAll(" ", "+");
  });

  return items;
};

const allFonts = await getGoogleFonts("popularity");

const variableFonts = allFonts.filter((font) => {
  return font.axes !== undefined;
});

const topVariableFonts = variableFonts.slice(0, TOP_NUMBER_OF_FONTS);

export { allFonts, variableFonts, topVariableFonts };
