const updateConfig = (target, cssProperty, value, cssUnit = "") => {
  const config = JSON.parse(localStorage.getItem("config"));

  const newConfig = config || {};

  const rule = `${value}${cssUnit ? cssUnit : ""}`;
  if (!config) {
    console.warn("No config found in localStorage.");
    return;
  }
  newConfig[target][cssProperty] = rule;
  localStorage.setItem("config", JSON.stringify(newConfig));
  setConfigAsQueryParams(newConfig);
};

const setConfigAsQueryParams = (configObj) => {
  const url = new URL(window.location);
  const configString = JSON.stringify(configObj);
  url.searchParams.set("config", configString);
  window.history.replaceState({}, "", url);
};

export { updateConfig };
