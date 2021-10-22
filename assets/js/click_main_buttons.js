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

    let data = await add_pin_to_database(lngLat);
    let new_id = data.pin_id;

    console.log(data);
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

    // open the demographic survey if `data.user_was_added`
    if (data.user_was_added) {
      console.log("OPEN DEMOGRAPHIC SURVEY");
      set_display_to_id("demographic-survey", "inline");
    }
  }
};

const click_demographic_submit_button = () => {
  /*
   * When a user submits the demographic survey,
   * scrape the info they provided from the form
   * and send it off to the API
   */
  // get the age
  let age = "";
  document.querySelectorAll('[id ^= "age"]').forEach((el) => {
    if (el.checked) {
      age = el.value;
    }
  });

  // get the hispanic yes/no
  let hispanic = "";
  document.querySelectorAll('[id ^= "hispanic"]').forEach((el) => {
    if (el.checked) {
      hispanic = el.value;
    }
  });

  // RACE
  let race = [];
  document.querySelectorAll('[id ^= "race"]').forEach((el) => {
    console.log(el);
    if (el.checked) {
      if (el.id == "race-other") {
        let custom_value = document.getElementById("race-other-input").value;
        race.push(custom_value);
      } else {
        race.push(el.id.replace("race-", ""));
      }
    }
  });

  // purpose in study area
  let purpose = [];
  document.querySelectorAll('[id ^= "usage"]').forEach((el) => {
    console.log(el);
    if (el.checked) {
      if (el.id == "usage-other") {
        let custom_value = document.getElementById("usage-other-input").value;
        purpose.push(custom_value);
      } else {
        purpose.push(el.id.replace("usage-", ""));
      }
    }
  });

  //

  console.log(hispanic, age, race, purpose);
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

  document
    .getElementById("submit-demographics")
    .addEventListener("click", click_demographic_submit_button);
};

export { setup_button_listeners };
