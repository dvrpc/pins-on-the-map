import { get_data_from_api, TAG_URL } from "./api";
import { toggle_button_state } from "./switches";

const add_tags_to_div = (div_id, json, tag_class, user_can_toggle) => {
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

    if (user_can_toggle) {
      tag_div.addEventListener("click", toggle_button_state);
    }
  });
};

const add_tags_to_all_the_divs = (map, json) => {
  let div_data = [
    { id: "user-input", classname: "tag-button", can_toggle: true },
    { id: "detail-tags", classname: "tag-for-existing-pin", can_toggle: false },
  ];

  div_data.forEach((div) => {
    add_tags_to_div(div.id, json, div.classname, div.can_toggle);
  });
};

const add_tag_options_to_map = (map) => {
  get_data_from_api(map, TAG_URL, add_tags_to_all_the_divs);
};

export { add_tag_options_to_map };
