import { SUPPORTED_AXES } from "./constants.js";

const buildAxesString = (selectedFontObject) => {
  const { axes, variants } = selectedFontObject;

  let axesString = null;

  const axesTags = [];
  const axesRanges = [];

  const hasAxesAndItalic =
    axes &&
    axes.length > 0 &&
    variants &&
    variants.length > 0 &&
    variants.includes("italic");
  const hasAxesAndNoItalic =
    axes && axes.length > 0 && (!variants || !variants.includes("italic"));
  const hasNoAxesAndItalic =
    (!axes || axes.length === 0) &&
    variants &&
    variants.length > 0 &&
    variants.includes("italic");
  const hasNoAxesAndHasVariantsButNoItalic =
    (!axes || axes.length === 0) &&
    variants &&
    variants.length > 0 &&
    !variants.includes("italic");
  const hasNoAxesAndNoVariants =
    (!axes || axes.length === 0) && (!variants || variants.length === 0);

  const parseAxes = (axes) => {
    axes.forEach((axis) => {
      // skip if axis.tag is not in SUPPORTED_AXES, toss it
      if (!SUPPORTED_AXES.includes(axis.tag)) return;
      axesTags.push(axis.tag);
      axesRanges.push(`${axis.start}..${axis.end}`);
    });
  };

  const parseVariants = (variants) => {
    variants.forEach((variant) => {
      switch (true) {
        case variant === "regular":
          axesRanges.push("400");
          break;
        case variant === "italic":
          axesTags.push("ital");
          break;
        case !variant.includes("italic"):
          axesRanges.push(variant);
          break;
        case variant.endsWith("italic"):
          // extract "700" from "700italic"
          const weight = variant.split("italic")[0];
          // does weight exist in axesRanges?
          if (!axesRanges.includes(weight)) {
            console.log(
              "this font has an italic weight that we didn't already have"
            );
            axesRanges.push(weight);
          }
          break;
        default:
          console.warn(`Unknown variant: ${variant}`);
          break;
      }
    });
  };

  switch (true) {
    case hasAxesAndItalic:
      axesTags.push("ital");
      parseAxes(axes);
      axesString = `${axesTags.join(",")}@0,${axesRanges.join(
        ","
      )};1,${axesRanges.join(",")}`;
      break;
    case hasAxesAndNoItalic:
      parseAxes(axes);
      axesString = axesTags.join(",") + "@" + axesRanges.join(",");
      break;
    case hasNoAxesAndItalic:
      // font with no variable axes "https://fonts.googleapis.com/css2?family=PT+Sans:ital,wght@0,400;0,700;1,400;1,700&display=swap"
      console.log("No axes, but has italic variant");
      parseVariants(variants);
      break;
    default:
      return null;
  }

  // if ((axes && axes.length > 0) || (variants && variants.length > 0)) {
  //   const axesTags = [];
  //   const axesRanges = [];

  //   const hasItalic = variants.includes("italic");

  //   if (hasItalic) {
  //   }

  //   axes?.forEach((axis) => {
  //     // skip if axis.tag is not in SUPPORTED_AXES, toss it
  //     if (!SUPPORTED_AXES.includes(axis.tag)) return;
  //     axesTags.push(axis.tag);
  //     axesRanges.push(`${axis.start}..${axis.end}`);
  //   });

  //   if (hasItalic) {
  //     axesString = `${axesTags.join(",")}@0,${axesRanges.join(
  //       ","
  //     )};1,${axesRanges.join(",")}`;
  //   } else {
  //     axesString = axesTags.join(",") + "@" + axesRanges.join(",");
  //   }
  // }
  return axesString;
};

export { buildAxesString };
