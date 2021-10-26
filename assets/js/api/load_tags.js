import { get_data_from_api, TAG_URL } from "./base";
import {
  toggle_tags_when_adding_pin,
  toggle_tags_when_filtering_map,
} from "../switches";

const _add_tags_to_div = (div_id, json, tag_class, toggle_func) => {
  // Create a new div within the provided div_id
  let main_div = document.getElementById(div_id);

  let group_div = document.createElement("div");
  group_div.className = "tag-group";
  main_div.appendChild(group_div);

  // For each tag, add it to the new div
  // using whatever tag_class was provided
  Object.entries(json).forEach((item) => {
    let id = item[0];
    let text = item[1];

    let tag_div = document.createElement("div");
    tag_div.className = tag_class;
    tag_div.id = div_id + "-tag_" + id;
    tag_div.appendChild(document.createTextNode(text));
    group_div.appendChild(tag_div);

    // If a toggle function is provided, wire it to
    // each tag button
    if (toggle_func) {
      tag_div.addEventListener("click", toggle_func);
    }
  });
};

const _add_tags_to_all_the_divs = (map, json) => {
  // Add tags in three places:
  // 1) where the user fills out their input form
  // 2) on the detail page for each pre-submitted pin
  // 3) on the "filter" page that lets users toggle what's shown
  let div_data = [
    {
      id: "user-input",
      classname: "tag-button",
      toggle_func: toggle_tags_when_adding_pin,
    },
    {
      id: "detail-tags",
      classname: "tag-for-existing-pin",
      toggle_func: false,
    },
    {
      id: "filter-toggles",
      classname: "map-filters",
      toggle_func: toggle_tags_when_filtering_map,
    },
  ];

  // Run the `add_tags_to_div()` function for each place where
  // the tags show up
  div_data.forEach((div) => {
    _add_tags_to_div(div.id, json, div.classname, div.toggle_func);
  });
};

const add_tag_options_to_map = (map) => {
  // Wrap the tag adding function inside the API function
  get_data_from_api(map, TAG_URL, _add_tags_to_all_the_divs);
};

export { add_tag_options_to_map };
