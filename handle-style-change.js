import { STYLE_CHANGE_EVENT } from "./constants.js";

document.addEventListener(STYLE_CHANGE_EVENT, (e) => {
  const { cssProperty, value, target, cssUnit } = e.detail;
  console.log(e.detail);
  const rule = `${value}${cssUnit ? cssUnit : ""}`;
  const config = JSON.parse(localStorage.getItem("config"));
  if (!config) {
    console.warn("No config found in localStorage.");
    return;
  }
  config[target][cssProperty] = rule;
  localStorage.setItem("config", JSON.stringify(config));
  // @TODO if adding query parameter support, that update would go here.
  document.querySelector(target).style[cssProperty] = rule;
});
