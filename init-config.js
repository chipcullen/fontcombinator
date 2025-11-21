import { defaultConfig } from "./default-config.js";

const configQueryParam = new URLSearchParams(window.location.search).get(
  "config"
);

let storedConfig = JSON.parse(localStorage.getItem("config"));

switch (true) {
  // Prioritize the config from query parameters
  case configQueryParam !== null:
    const parsedParams = JSON.parse(configQueryParam);
    // in case params are missing some keys, merge with defaultConfig
    const normalizedConfig = { ...defaultConfig, ...parsedParams };
    localStorage.setItem("config", JSON.stringify(normalizedConfig));
    break;
  // Initialize config in localStorage if it doesn't exist
  case configQueryParam === null && storedConfig === null:
    localStorage.setItem("config", JSON.stringify(defaultConfig));
    break;
  default:
    console.log("already have a config");
    break;
}

storedConfig = JSON.parse(localStorage.getItem("config"));

export { storedConfig };
