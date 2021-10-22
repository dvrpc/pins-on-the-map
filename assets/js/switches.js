import { FILTER_URL } from "./api";
import { filter_pins } from "./load_data";
import { map } from "./map";

const set_display_to_id = (div_id, display_prop) => {
  document.getElementById(div_id).style.display = display_prop;
};

const user_wants_to_add_pin = () => {
  return document.getElementById("click-map-text").style.display == "inline";
};

const toggle_button_state = (div, class_name) => {
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
  // to `.deselected` and then adjust the map with
  // a mapbox filter
  toggle_button_state(div, "selected-filter");

  let selected_tags = Array.from(
    document.getElementsByClassName("map-filters")
  );

  selected_tags.forEach((tag) => {
    if (tag.classList.contains("selected-filter") & (div.target.id != tag.id)) {
      tag.classList.remove("selected-filter");
    }
  });

  let tag_id = div.target.id.replace("filter-toggles-", "");
  let url = FILTER_URL + "/?" + tag_id + "=True";

  filter_pins(map, url);

  let selected_tag_text = div.target.textContent;

  let text_div = document.getElementById("active-filter-text");
  text_div.innerHTML =
    "<p>Showing all comments related to:<p><h3> " + selected_tag_text + "</h3>";

  set_display_to_id("active-filter-text", "inline");
};

const set_mouse_to_crosshair = (map) => {
  map.getCanvas().style.cursor = "crosshair";
};

const set_mouse_to_normal = (map) => {
  map.getCanvas().style.cursor = "";
};

const select_pin_by_id = (map, pin_id) => {
  map.setFilter("selected-pin", ["==", "pin_id", pin_id]);
};

const clear_selected_pin = (map) => {
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
