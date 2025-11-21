const updateConfig = (target, cssProperty, value, cssUnit = "") => {
  const config = JSON.parse(localStorage.getItem("config"));
  if (!config) {
    console.warn("No config found in localStorage.");
    return;
  }

  const newConfig = config || {};

  if (target === "configuredFonts") {
    newConfig["configuredFonts"] = value;
    localStorage.setItem("config", JSON.stringify(newConfig));
    setConfigAsQueryParams(newConfig);
    window.location.reload();
  } else {
    const rule = `${value}${cssUnit ? cssUnit : ""}`;
    newConfig[target][cssProperty] = rule;
    localStorage.setItem("config", JSON.stringify(newConfig));
    setConfigAsQueryParams(newConfig);
  }
};

const setConfigAsQueryParams = (configObj) => {
  const url = new URL(window.location);
  const configString = JSON.stringify(configObj);
  url.searchParams.set("config", configString);
  window.history.replaceState({}, "", url);
};

export { updateConfig };
