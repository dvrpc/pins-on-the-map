import { set_display_to_id } from "./switches";
import {
  add_marker_to_map,
  get_coords_of_marker,
  remove_markers,
} from "./markers";
import { reload_pins } from "./load_data";
import { map } from "./map";

const click_add_pin_button = () => {
  /* logic for when user clicks
   * the 'pin a comment...' button
   */

  // turn on help text
  set_display_to_id("click-map-text", "inline");

  // make the text-based form visible
  set_display_to_id("survey-form", "inline");
};

const click_add_comment_button = () => {
  /* logic for when user clicks
   * the 'add a general comment...' button
   */

  // make sure pin help text is off
  set_display_to_id("click-map-text", "none");

  // make the text-based form visible
  set_display_to_id("survey-form", "inline");
};

const add_pin_to_database = async () => {
  let lngLat = get_coords_of_marker();

  var xhr = new XMLHttpRequest();
  xhr.open("POST", "/api/add-pin/", true);
  xhr.setRequestHeader("Content-Type", "application/json");
  let params = JSON.stringify({
    geom: `SRID=4326;POINT (${lngLat.lng} ${lngLat.lat})`,
    prompt_1: document.getElementById("prompt_1").value,
  });
  console.log(params);
  xhr.send(params);
};

const click_submit_button = async () => {
  add_pin_to_database().then(reload_pins(map));
  remove_markers();
  set_display_to_id("click-map-text", "none");
  set_display_to_id("survey-form", "none");

  document.getElementById("prompt_1").value = "";
};

const setup_button_listeners = () => {
  document
    .getElementById("button-to-add-pin")
    .addEventListener("click", click_add_pin_button);

  document
    .getElementById("button-to-add-comment")
    .addEventListener("click", click_add_comment_button);

  document
    .getElementById("submit-pin")
    .addEventListener("click", click_submit_button);
};

export { setup_button_listeners };
