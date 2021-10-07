import "mapbox-gl/dist/mapbox-gl.css";
import "./map_style.css";

import { map } from "./js/map";
import { wire_click_logic } from "./js/click.js";
import { hover_setup } from "./js/hover.js";
import { setup_button_listeners } from "./js/click_main_buttons.js";
import { load_pins_from_api } from "./js/load_data";

const CLUSTER_LEVEL = 15;

map.on("load", function () {
  load_pins_from_api(map);

  // Set up the click event & hover
  wire_click_logic(map);
  hover_setup(map);

  setup_button_listeners();
});
