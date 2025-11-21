import { STYLE_CHANGE_EVENT } from "./constants.js";
import { updateConfig } from "./update-config.js";

document.addEventListener(STYLE_CHANGE_EVENT, (e) => {
  const { cssProperty, value, target, cssUnit } = e.detail;
  const rule = `${value}${cssUnit ? cssUnit : ""}`;
  updateConfig(target, cssProperty, value, cssUnit);
  document.querySelector(target).style[cssProperty] = rule;
});
