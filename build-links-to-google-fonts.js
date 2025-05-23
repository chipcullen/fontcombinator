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

configuredFonts.forEach((font) => {
  buildLinkToGoogleFonts(font.slug, font.family);
});
