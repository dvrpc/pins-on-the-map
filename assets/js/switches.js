import { FILTER_URL } from "./api/base";
import { filter_pins } from "./api/load_data";
import { map } from "./map/map";

const set_display_to_id = (div_id, display_prop) => {
  // Set the div to a specific display value
  document.getElementById(div_id).style.display = display_prop;
};

const user_wants_to_add_pin = () => {
  // return True if the 'click-map-text' is present on the screen
  return document.getElementById("click-map-text").style.display == "inline";
};

const toggle_button_state = (div, class_name) => {
  // For a given div and classname, add the class
  // if it's not already set. If it is set, remove it.

  let this_div = document.getElementById(div.target.id);

  if (this_div.classList.contains(class_name)) {
    this_div.classList.remove(class_name);
  } else {
    this_div.classList.add(class_name);
  }
};

const toggle_tags_when_adding_pin = (div) => {
  // when adding a pin, toggle those the user clicked
  // on to be `.selected`
  toggle_button_state(div, "selected");
};

const toggle_tags_when_filtering_map = (div) => {
  // when filtering the map, set the button class
  // to `.selected-filter` and then adjust the map with
  // a mapbox filter
  toggle_button_state(div, "selected-filter");

  // Remove all other selected styles on tag buttons
  // if they were not the one that was clicked on
  let selected_tags = Array.from(
    document.getElementsByClassName("map-filters")
  );

  selected_tags.forEach((tag) => {
    if (tag.classList.contains("selected-filter") & (div.target.id != tag.id)) {
      tag.classList.remove("selected-filter");
    }
  });

  // Reload data from API with only those pins that were tagged
  // with the value that was clicked on
  let tag_id = div.target.id.replace("filter-toggles-", "");
  let url = FILTER_URL + "/?" + tag_id + "=True";

  filter_pins(map, url);

  // Show text on the screen letting the user know what
  // category of pins have been selected
  let selected_tag_text = div.target.textContent;

  let text_div = document.getElementById("active-filter-text");
  text_div.innerHTML =
    "<p>Showing all comments related to:<p><h3> " + selected_tag_text + "</h3>";

  set_display_to_id("active-filter-text", "inline");

  // Once a filter has been applied, the "clear filter" button appears
  set_display_to_id("clear-filter-button", "inline");
};

const set_mouse_to_crosshair = (map) => {
  // set the user's mouse type to crosshair
  // to indicate that when they click a marker
  // will be added
  map.getCanvas().style.cursor = "crosshair";
};

const set_mouse_to_normal = (map) => {
  // revert the user's mouse type to normal
  map.getCanvas().style.cursor = "";
};

const select_pin_by_id = (map, pin_id) => {
  // Filter the 'selected-pin' layer to a single pin by its ID
  map.setFilter("selected-pin", ["==", "pin_id", pin_id]);
};

const clear_selected_pin = (map) => {
  // Set a filter on the 'selected-pin' layer
  // that results in none showing (all IDs are > 0)
  select_pin_by_id(map, -1);
};

export {
  set_display_to_id,
  user_wants_to_add_pin,
  set_mouse_to_crosshair,
  set_mouse_to_normal,
  select_pin_by_id,
  clear_selected_pin,
  toggle_tags_when_adding_pin,
  toggle_tags_when_filtering_map,
};
