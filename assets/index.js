import "mapbox-gl/dist/mapbox-gl.css";
import "./css/settings.css";
import "./css/map_style.css";
import "./css/alerts.css";
import "./css/box_overlays.css";
import "./css/mobile.css";

import { map } from "./js/map";
import { wire_click_logic } from "./js/click.js";
import { hover_setup } from "./js/hover.js";
import { setup_button_listeners } from "./js/click_main_buttons.js";
import {
  load_pins_from_api,
  reload_pins,
  load_study_area_from_geojson,
} from "./js/load_data";
import {
  set_display_to_id,
  set_mouse_to_normal,
  clear_selected_pin,
} from "./js/switches";
import { add_tag_options_to_map } from "./js/load_tags";
import { remove_markers } from "./js/markers";

const CLUSTER_LEVEL = 15;

map.on("load", function () {
  load_pins_from_api(map);
  load_study_area_from_geojson(map);

  // Set up the click event & hover
  wire_click_logic(map);
  hover_setup(map);

  setup_button_listeners();

  add_tag_options_to_map(map);
});

document.getElementById("close-form").onclick = () => {
  set_mouse_to_normal(map);
  remove_markers();
  set_display_to_id("survey-form", "none");
  set_display_to_id("click-map-text", "none");
};
document.getElementById("close-details").onclick = () => {
  set_display_to_id("detail-form", "none");
  clear_selected_pin(map);
};

document.getElementById("close-demographic-survey").onclick = () => {
  set_display_to_id("demographic-survey", "none");
};

document.getElementById("close-info").onclick = () => {
  set_display_to_id("info-box", "none");
};
document.getElementById("close-filter").onclick = () => {
  set_display_to_id("filter-box", "none");
};

document.getElementById("about-button").onclick = () => {
  set_display_to_id("info-box", "inline");
  set_display_to_id("survey-form", "none");
  set_display_to_id("detail-form", "none");
  set_display_to_id("filter-box", "none");
  set_display_to_id("click-map-text", "none");
  set_mouse_to_normal(map);
};

document.getElementById("filter-button").onclick = () => {
  set_display_to_id("filter-box", "inline");
  set_display_to_id("info-box", "none");
  set_display_to_id("survey-form", "none");
  set_display_to_id("detail-form", "none");
  set_display_to_id("click-map-text", "none");
  set_mouse_to_normal(map);
  clear_selected_pin(map);
};

document.getElementById("logo-city").onclick = () => {
  window.open("http://www.phillyotis.com/", "_blank").focus();
};
document.getElementById("logo-dvrpc").onclick = () => {
  window.open("https://www.dvrpc.org/", "_blank").focus();
};

document.getElementById("disclaimer-toggle").onclick = () => {
  let disclaimer_div = document.getElementById("disclaimer");
  if (disclaimer_div.style.display == "inline") {
    disclaimer_div.style.display = "none";
  } else {
    disclaimer_div.style.display = "inline";
  }
};

document.getElementById("clear-filter-button").onclick = () => {
  reload_pins(map);

  Array.from(document.getElementsByClassName("map-filters")).forEach((tag) => {
    if (tag.classList.contains("selected-filter")) {
      tag.classList.remove("selected-filter");
    }
  });

  set_display_to_id("clear-filter-button", "none");
};
