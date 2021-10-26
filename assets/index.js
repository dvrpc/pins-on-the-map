import "mapbox-gl/dist/mapbox-gl.css";
import "./css/settings.css";
import "./css/map_style.css";
import "./css/alerts.css";
import "./css/box_overlays.css";
import "./css/mobile.css";

import { map } from "./js/map/map";
import { setup_map_click_functionality } from "./js/click/on_map_layers.js";
import { setup_hover_functionality } from "./js/map/hover.js";
import { setup_button_listeners } from "./js/click/on_ui_buttons.js";
import {
  load_pins_from_api_for_the_first_time,
  load_study_area_from_geojson,
} from "./js/api/load_data";
import { add_tag_options_to_map } from "./js/api/load_tags";
import { setup_icon_listeners } from "./js/click/on_ui_icons";

map.on("load", function () {
  // Load geojson data for the first time
  load_pins_from_api_for_the_first_time(map);
  load_study_area_from_geojson(map);

  // Set up the click event & hover
  setup_map_click_functionality(map);
  setup_hover_functionality(map);

  // Set up buttons to do things
  setup_button_listeners();
  setup_icon_listeners(map);

  // Add tags where they're needed in the map UI
  add_tag_options_to_map(map);
});
