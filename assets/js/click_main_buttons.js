import { set_display_to_id, user_wants_to_add_pin } from "./switches";
import {
  markers_are_not_on_the_map,
  get_coords_of_marker,
  remove_markers,
} from "./markers";
import { reload_pins } from "./load_data";
import { map } from "./map";

const click_add_pin_button = () => {
  /* logic for when user clicks
   * the 'pin a comment...' button
   */

  set_display_to_id("success-alert", "none");
  set_display_to_id("detail-form", "none");

  // turn on help text
  set_display_to_id("click-map-text", "inline");

  // make the text-based form visible
  set_display_to_id("survey-form", "inline");
};

const click_add_comment_button = () => {
  /* logic for when user clicks
   * the 'add a general comment...' button
   */

  remove_markers();

  // make sure pin help text is off
  set_display_to_id("click-map-text", "none");

  set_display_to_id("success-alert", "none");
  set_display_to_id("warning-alert", "none");
  set_display_to_id("detail-form", "none");

  // make the text-based form visible
  set_display_to_id("survey-form", "inline");
};

const add_pin_to_database = async (lngLat) => {
  let selected_tags = Array.from(document.getElementsByClassName("selected"));

  let data = {
    geom: `SRID=4326;POINT (${lngLat.lng} ${lngLat.lat})`,
    prompt_1: document.getElementById("prompt_1").value,
  };

  selected_tags.forEach((tag) => {
    let tag_id = tag.id.replace("user-input-", "");
    data[tag_id] = true;
  });

  var xhr = new XMLHttpRequest();
  xhr.open("POST", "/api/add-pin/", true);
  xhr.setRequestHeader("Content-Type", "application/json");
  let params = JSON.stringify(data);
  xhr.send(params);

  return data;
};

const click_submit_button = async () => {
  if (user_wants_to_add_pin() && markers_are_not_on_the_map()) {
    set_display_to_id("warning-alert", "inline-block");
  } else {
    let lngLat = get_coords_of_marker();

    add_pin_to_database(lngLat)
      .then((data) => {
        console.log(data);
      })
      .then(reload_pins(map))
      .then(set_display_to_id("success-alert", "inline"));
    remove_markers();
    set_display_to_id("click-map-text", "none");
    set_display_to_id("survey-form", "none");
    set_display_to_id("warning-alert", "none");

    document.getElementById("prompt_1").value = "";

    // remove selected class from tag buttons
    var elems = document.querySelectorAll(".selected");

    elems.forEach((el) => el.classList.remove("selected"));
  }
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
