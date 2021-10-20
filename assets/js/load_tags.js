import { get_data_from_api, TAG_URL } from "./api";
import {
  toggle_tags_when_adding_pin,
  toggle_tags_when_filtering_map,
} from "./switches";

const add_tags_to_div = (div_id, json, tag_class, toggle_func) => {
  let main_div = document.getElementById(div_id);

  let group_div = document.createElement("div");
  group_div.className = "tag-group";
  main_div.appendChild(group_div);

  Object.entries(json).forEach((item) => {
    let id = item[0];
    let text = item[1];

    let tag_div = document.createElement("div");
    tag_div.className = tag_class;
    tag_div.id = div_id + "-tag_" + id;
    tag_div.appendChild(document.createTextNode(text));
    group_div.appendChild(tag_div);

    if (toggle_func) {
      tag_div.addEventListener("click", toggle_func);
    }
  });
};

const add_tags_to_all_the_divs = (map, json) => {
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

  div_data.forEach((div) => {
    add_tags_to_div(div.id, json, div.classname, div.toggle_func);
  });
};

const add_tag_options_to_map = (map) => {
  get_data_from_api(map, TAG_URL, add_tags_to_all_the_divs);
};

export { add_tag_options_to_map };
