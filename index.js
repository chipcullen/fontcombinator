// import "./get-list-of-fonts.js";
import { config as defaultConfig } from "./config.js";

// add config to local storage
let storedConfig = JSON.parse(localStorage.getItem("config"));

if (!storedConfig) {
  localStorage.setItem("config", JSON.stringify(defaultConfig));
  storedConfig = JSON.parse(localStorage.getItem("config"));
}


import "./apply-stored-styles.js"
import "./build-links-to-google-fonts.js";
import "./font-control.js";
import "./font-select.js";
import "./handle-font-change.js";
import "./handle-style-change.js";
