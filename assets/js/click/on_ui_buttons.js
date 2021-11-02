import {
  set_display_to_id,
  user_wants_to_add_pin,
  set_mouse_to_crosshair,
  set_mouse_to_normal,
  clear_selected_pin,
} from "../switches";
import {
  add_comment_to_database,
  add_pin_to_database,
  add_user_info_to_database,
} from "../api/add_to_database";
import {
  markers_are_not_on_the_map,
  get_coords_of_marker,
  remove_markers,
} from "../map/markers";
import { reload_pins } from "../api/load_data";
import { map } from "../map/map";

const _click_button_to_begin_pinning_a_commment_to_the_map = () => {
  // logic for when user clicks the 'pin a comment to the map' button

  // Turn off unneeded divs
  ["success-alert", "detail-form", "info-box", "filter-box"].forEach((div_id) =>
    set_display_to_id(div_id, "none")
  );

  // Make sure that no other pins are selected
  clear_selected_pin(map);

  // turn on help text
  set_display_to_id("click-map-text", "inline");

  // make the text-based form visible
  set_display_to_id("survey-form", "inline");

  // show user the mouse crosshair so they can drop a pin on the map
  set_mouse_to_crosshair(map);
};

const _click_button_to_submit_comment = async () => {
  // Allow users to add a comment to an existing pin

  // Get the user's comment text
  let comment = document.getElementById("comment-text").value;

  // Add comment to database via API
  let data = await add_comment_to_database(comment);

  // Reload the map data so that the new comment is present in the dataset
  reload_pins(map).then(() => {
    // Reset the comment box to be blank
    document.getElementById("comment-text").value = "";

    // Show the success message for adding a comment
    set_display_to_id("success-alert-for-comment", "inline");

    // Turn off the detail form and remove the selection on the pin layer
    set_display_to_id("detail-form", "none");
    clear_selected_pin(map);
  });

  // open the demographic survey if `data.user_was_added`
  if (data.user_was_added) {
    set_display_to_id("demographic-survey", "inline");
  }
};

const _click_button_to_submit_pin = async () => {
  // Allow users to add a pin to the map

  // Show an alert if there isn't a pin on the map yet
  if (user_wants_to_add_pin() && markers_are_not_on_the_map()) {
    set_display_to_id("warning-alert", "inline-block");
  }
  // Otherwise, add the pin to the database
  else {
    // Get the marker's location
    let lngLat = get_coords_of_marker();

    // Add the pin to the database
    let data = await add_pin_to_database(lngLat);
    let new_id = data.pin_id;

    // Reload the map data and auto-select the newly added pin
    reload_pins(map, new_id);

    // Show the success alert for adding a pin
    set_display_to_id("success-alert", "inline");

    // Revert to normal mouse and remove the marker
    set_mouse_to_normal(map);
    remove_markers();

    // Turn of unneeded divs
    // Turn off unneeded divs
    ["survey-form", "warning-alert", "click-map-text"].forEach((div_id) =>
      set_display_to_id(div_id, "none")
    );

    // Reset the entry form so user can add another pin later
    document.getElementById("prompt_1").value = "";

    // remove selected class from tag buttons
    var elems = document.querySelectorAll(".selected");
    elems.forEach((el) => el.classList.remove("selected"));

    // open the demographic survey if `data.user_was_added`
    if (data.user_was_added) {
      set_display_to_id("demographic-survey", "inline");
    }
  }
};

const _click_button_to_submit_demographic_survey = async () => {
  /*
   * When a user submits the demographic survey,
   * scrape the info they provided from the form
   * and send it off to the API
   */

  // get the age selection
  let age = "";
  document.querySelectorAll('[id ^= "age"]').forEach((el) => {
    if (el.checked) {
      age = el.value;
    }
  });

  // get the hispanic yes/no selection
  let hispanic = "";
  document.querySelectorAll('[id ^= "hispanic"]').forEach((el) => {
    if (el.checked) {
      hispanic = el.value;
    }
  });

  // get all of the selected racial groups, including custom-entered 'other' values
  let race = [];
  document.querySelectorAll('[id ^= "race"]').forEach((el) => {
    if (el.checked) {
      if (el.id == "race-other") {
        let custom_value = document.getElementById("race-other-input").value;
        race.push(custom_value);
      } else {
        race.push(el.id.replace("race-", ""));
      }
    }
  });

  // // get all of the selected usages of the study area, including custom-entered 'other' values
  // let purpose = [];
  // document.querySelectorAll('[id ^= "usage"]').forEach((el) => {
  //   if (el.checked) {
  //     if (el.id == "usage-other") {
  //       let custom_value = document.getElementById("usage-other-input").value;
  //       purpose.push(custom_value);
  //     } else {
  //       purpose.push(el.id.replace("usage-", ""));
  //     }
  //   }
  // });

  // get the disability yes/no selection
  let disability = "";
  document.querySelectorAll('[id ^= "disability"]').forEach((el) => {
    if (el.checked) {
      disability = el.value;
    }
  });

  // Get the zipcode value provided by the user
  let zipcode = document.getElementById("zipcode").value;

  // Get the email value provided by the user
  let email = document.getElementById("email").value;

  // send data to API
  let user_data = {
    q1: hispanic,
    q2: race,
    q3: age,
    q4: disability,
    q5: zipcode,
    q6: email,
  };

  let response = await add_user_info_to_database(user_data);

  // Hide the survey form when complete
  set_display_to_id("demographic-survey", "none");
};

const setup_button_listeners = () => {
  // Wire each button to its click function
  let button_data = [
    {
      div_id: "button-to-add-pin",
      action: _click_button_to_begin_pinning_a_commment_to_the_map,
    },

    {
      div_id: "submit-pin",
      action: _click_button_to_submit_pin,
    },

    {
      div_id: "submit-reaction",
      action: _click_button_to_submit_comment,
    },

    {
      div_id: "submit-demographics",
      action: _click_button_to_submit_demographic_survey,
    },
  ];

  button_data.forEach((button) =>
    document
      .getElementById(button.div_id)
      .addEventListener("click", button.action)
  );
};

export { setup_button_listeners };
