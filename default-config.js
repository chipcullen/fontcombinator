import { TOP_VARIABLE_FONTS } from "./constants.js";

const defaultConfig = {
  body: {
    backgroundColor: "#ffffff",
  },
  h1: {
    text: "The Font Combinator!",
    color: "#333333",
    fontFamily: "Source Serif 4",
    fontSize: "52px",
    fontStretch: "0",
    fontStyle: "italic",
    fontVariationSettings: "none",
    fontWeight: "700",
    lineHeight: "1.1",
    textBoxEdge: "text alphabetic",
    textBoxTrim: "none",
  },
  h2: {
    text: "You can edit this page",
    color: "#333333",
    fontFamily: "Source Serif 4",
    fontSize: "32px",
    fontStretch: "0",
    fontStyle: "normal",
    fontVariationSettings: "none",
    fontWeight: "700",
    lineHeight: "1.4",
    textBoxEdge: "text alphabetic",
    textBoxTrim: "none",
  },
  p: {
    text: "Donec ante. Sed at velit. Vestibulum at purus at urna porttitor sodales. Nullam pulvinar, urna interdum eleifend sodales, eros est tempus quam, quis ultricies nibh elit vitae urna. Donec pretium arcu at quam. Quisque tristique, lacus id tempor blandit, quam massa imperdiet lorem, porta fermentum quam ante ac tortor. Curabitur mauris lectus, dapibus ut, ornare sit amet, vulputate sit amet, erat.",
    color: "#333333",
    fontFamily: "Source Sans 3",
    fontSize: "16px",
    fontStretch: "0",
    fontStyle: "normal",
    fontVariationSettings: "none",
    fontWeight: "400",
    lineHeight: "1.4",
    textBoxEdge: "text alphabetic",
    textBoxTrim: "none",
  },
  configuredFonts: TOP_VARIABLE_FONTS,
};

export { defaultConfig };
