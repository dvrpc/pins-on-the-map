import {
  set_display_to_id,
  user_wants_to_add_pin,
  set_mouse_to_crosshair,
  set_mouse_to_normal,
  select_pin_by_id,
  clear_selected_pin,
} from "./switches";
import {
  add_comment_to_database,
  add_pin_to_database,
} from "./add_to_database";
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
  set_display_to_id("info-box", "none");
  set_display_to_id("filter-box", "none");
  clear_selected_pin(map);

  // turn on help text
  set_display_to_id("click-map-text", "inline");

  // make the text-based form visible
  set_display_to_id("survey-form", "inline");

  set_mouse_to_crosshair(map);
};

const click_add_comment_button = () => {
  /* logic for when user clicks
   * the 'add a general comment...' button
   */

  remove_markers();
  set_mouse_to_normal(map);

  // make sure pin help text is off
  set_display_to_id("click-map-text", "none");
  set_display_to_id("info-box", "none");
  set_display_to_id("filter-box", "none");
  clear_selected_pin(map);

  set_display_to_id("success-alert", "none");
  set_display_to_id("warning-alert", "none");
  set_display_to_id("detail-form", "none");

  // make the text-based form visible
  set_display_to_id("survey-form", "inline");
};

const click_comment_submit_button = async () => {
  let comment = document.getElementById("comment-text").value;

  console.log(comment);

  let data = await add_comment_to_database(comment);

  console.log("Thank you for your comment!");
  console.log(data);

  reload_pins(map).then(() => {
    document.getElementById("comment-text").value = "";
    set_display_to_id("success-alert-for-comment", "inline");
    set_display_to_id("detail-form", "none");
    clear_selected_pin(map);
  });
};

const click_submit_button = async () => {
  if (user_wants_to_add_pin() && markers_are_not_on_the_map()) {
    set_display_to_id("warning-alert", "inline-block");
  } else {
    let lngLat = get_coords_of_marker();

    let new_id = await add_pin_to_database(lngLat);

    console.log(new_id);
    set_mouse_to_normal(map);
    reload_pins(map, new_id);
    set_display_to_id("success-alert", "inline");

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

  document
    .getElementById("submit-reaction")
    .addEventListener("click", click_comment_submit_button);
};

export { setup_button_listeners };
