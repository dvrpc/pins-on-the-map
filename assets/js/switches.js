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

  // let tag_filter = ["any"];

  selected_tags.forEach((tag) => {
    console.log(tag);
    // if (tag.classList.contains("selected-filter") & div.target.id != tag.id) {
    //   let tag_id = tag.id.replace("filter-toggles-", "");
    //   tag_filter.push(["==", tag_id, true]);
    // }

    if (tag.classList.contains("selected-filter") & (div.target.id != tag.id)) {
      tag.classList.remove("selected-filter");
    }

    let tag_id = div.target.id.replace("filter-toggles-", "");
    let url = FILTER_URL + "/?" + tag_id + "=True";

    filter_pins(map, url);
  });

  // let all_layers_to_filter = [
  //   {
  //     layername: "clusters",
  //     base_filter: ["has", "point_count"],
  //   },
  //   {
  //     layername: "cluster-count",
  //     base_filter: ["has", "point_count"],
  //   },
  //   {
  //     layername: "unclustered_point",
  //     base_filter: ["!", ["has", "point_count"]],
  //   },
  // ];

  // all_layers_to_filter.forEach((layer) => {
  //   if (map.getLayer(layer.layername)) {
  //     let filter = ["all", layer.base_filter, tag_filter];
  //     map.setFilter(layer.layername, filter);
  //     console.log(filter);
  //   }
  // });
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
