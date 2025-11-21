import { SUBSET } from "./constants.js";
import { configuredFonts } from "./configured-fonts.js";

const buildLinkToGoogleFonts = (slug, text, axes) => {
  const link = document.createElement("link");
  const url = new URL("https://fonts.googleapis.com/css2");
  url.searchParams.set("family", slug);
  if (slug && axes) {
    url.searchParams.set("family", `${slug}:${axes}`);
  }
  url.searchParams.set("display", "swap");
  url.searchParams.set("subset", SUBSET);
  if (text) {
    url.searchParams.set("text", text);
  }

  link.rel = "stylesheet";
  url.search = decodeURIComponent(url.search);
  link.href = url.toString();
  document.head.appendChild(link);
};

export { buildLinkToGoogleFonts };

// This builds links to all of the google fonts that are configured
// Since these are used in styled select elements, we only want to do this
// if the browser supports the `appearance: base-select` CSS property
if (CSS.supports("appearance: base-select")) {
  const config = JSON.parse(localStorage.getItem("config"));

  // filter out any fonts from config out of the configured fonts.
  // if we don't do this, there is a weird collision at 400 weight
  const filteredConfiguredFonts = configuredFonts.filter((font) => {
    return !Object.values(config).some(
      (rule) => rule.fontFamily && rule.fontFamily === font.family
    );
  });

  // build links to google fonts for each of the filtered fonts;
  // fonts in the config will have links built in apply-stored-styles.js
  filteredConfiguredFonts.forEach((font) => {
    buildLinkToGoogleFonts(font.slug, font.family);
  });
}
