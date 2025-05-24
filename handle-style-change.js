import { STYLE_CHANGE_EVENT } from "./constants.js";

document.addEventListener(STYLE_CHANGE_EVENT, (e) => {
  const { cssProperty, value, target, cssUnit } = e.detail;
  const rule = `${value}${cssUnit ? cssUnit : ""}`;
  document.querySelector(target).style[cssProperty] = rule;
});
