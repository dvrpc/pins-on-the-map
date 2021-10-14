import "mapbox-gl/dist/mapbox-gl.css";
import "./css/settings.css";
import "./css/map_style.css";
import "./css/alerts.css";
import "./css/box_overlays.css";

import { map } from "./js/map";
import { wire_click_logic } from "./js/click.js";
import { hover_setup } from "./js/hover.js";
import { setup_button_listeners } from "./js/click_main_buttons.js";
import {
  load_pins_from_api,
  add_tag_options_to_survey_form,
  load_study_area_from_geojson,
} from "./js/load_data";
import { set_display_to_id } from "./js/switches";

const CLUSTER_LEVEL = 15;

map.on("load", function () {
  load_pins_from_api(map);
  load_study_area_from_geojson(map);

  // Set up the click event & hover
  wire_click_logic(map);
  hover_setup(map);

  setup_button_listeners();

  add_tag_options_to_survey_form(map);
});

document.getElementById("close-form").onclick = () => {
  set_display_to_id("survey-form", "none");
  set_display_to_id("click-map-text", "none");
};
document.getElementById("close-details").onclick = () => {
  set_display_to_id("detail-form", "none");
};

document.getElementById("close-info").onclick = () => {
  set_display_to_id("info-box", "none");
};

document.getElementById("info-toggle").onclick = () => {
  set_display_to_id("info-box", "inline");
  set_display_to_id("survey-form", "none");
};
