import { fit_map_to_geojson } from "./zoom_to_layer";
import { toggle_button_state } from "./switches";
import { STUDY_AREA } from "./study_area";

const CLUSTER_LEVEL = 17;

const PIN_URL = "/api/get-pins";
const TAG_URL = "/api/tags";

const get_data_from_api = (map, url, inner_func) => {
  var request = new XMLHttpRequest();
  request.open("GET", url, true);
  request.setRequestHeader("Access-Control-Allow-Origin", "*");
  request.onload = function () {
    if (this.status >= 200 && this.status < 400) {
      // retrieve the JSON from the response
      var json = JSON.parse(this.response);

      return inner_func(map, json);
    }
  };
  request.send();
};

const add_pin_layers = (map) => {
  // from https://docs.mapbox.com/mapbox-gl-js/example/cluster/
  map.addLayer({
    id: "clusters",
    type: "circle",
    source: "pin-data",
    filter: ["has", "point_count"],
    paint: {
      // Use step expressions (https://docs.mapbox.com/mapbox-gl-js/style-spec/#expressions-step)
      // with three steps to implement three types of circles:
      //   * Blue, 20px circles when point count is less than 100
      //   * Yellow, 30px circles when point count is between 100 and 750
      //   * Pink, 40px circles when point count is greater than or equal to 750
      "circle-opacity": 0.7,
      "circle-color": [
        "step",
        ["get", "point_count"],
        "#51bbd6",
        5,
        "#f1f075",
        15,
        "#f28cb1",
      ],
      "circle-radius": ["step", ["get", "point_count"], 20, 5, 30, 15, 40],
    },
  });

  map.addLayer({
    id: "cluster-count",
    type: "symbol",
    source: "pin-data",
    filter: ["has", "point_count"],
    layout: {
      "text-field": "{point_count_abbreviated}",
      "text-font": ["DIN Offc Pro Medium", "Arial Unicode MS Bold"],
      "text-size": 12,
    },
  });

  map.addLayer({
    id: "unclustered-point",
    type: "circle",
    source: "pin-data",
    filter: ["!", ["has", "point_count"]],
    paint: {
      "circle-color": "#11b4da",
      "circle-radius": 4,
      "circle-stroke-width": 1,
      "circle-stroke-color": "#fff",
    },
  });
};

const initial_pin_data_load = (map, json) => {
  map.addSource("pin-data", {
    type: "geojson",
    data: json,
    cluster: true,
    clusterMaxZoom: CLUSTER_LEVEL, // Max zoom to cluster points on
    clusterRadius: 50, // Radius of each cluster when clustering points (defaults to 50)
  });

  add_pin_layers(map);
};

const load_study_area_from_geojson = (map) => {
  // let url = "/static/geojson/study_area.geojson";

  // console.log(url);
  map.addSource("study-area-data", {
    type: "geojson",
    data: STUDY_AREA.features[0],
  });

  map.addLayer({
    id: "study-area",
    type: "fill",
    source: "study-area-data",
    paint: {
      "fill-color": "rgba(0, 0, 0, 0.3)",
    },
  });
};

const load_pins_from_api = async (map) => {
  get_data_from_api(map, PIN_URL, initial_pin_data_load);
};

const reload_pins_from_api = async (map, json) => {
  map.getSource("pin-data").setData(json);
};

const reload_pins = async (map) => {
  await new Promise((r) => setTimeout(r, 100));

  get_data_from_api(map, PIN_URL, reload_pins_from_api);
};

const add_tags_to_div = (div_id, json, tag_class) => {
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

    tag_div.addEventListener("click", toggle_button_state);
  });
};

const do_stuff_with_json = (map, json) => {
  let div_data = [
    { id: "user-input", classname: "tag-button" },
    { id: "detail-tags", classname: "tag-for-existing-pin" },
  ];

  div_data.forEach((div) => {
    add_tags_to_div(div.id, json, div.classname);
  });
};

const add_tag_options_to_survey_form = (map) => {
  get_data_from_api(map, TAG_URL, do_stuff_with_json);
};

export {
  load_pins_from_api,
  reload_pins,
  add_pin_layers,
  add_tag_options_to_survey_form,
  load_study_area_from_geojson,
};
