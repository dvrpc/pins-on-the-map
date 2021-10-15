import { fit_map_to_geojson } from "./zoom_to_layer";
import { STUDY_AREA } from "./study_area";
import { get_data_from_api, PIN_URL, TAG_URL } from "./api";

const CLUSTER_LEVEL = 17;

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

  map.addLayer({
    id: "selected-pin",
    type: "circle",
    source: "pin-data",
    paint: {
      "circle-stroke-color": "yellow",
      "circle-radius": 15,
      "circle-stroke-width": 3,
      "circle-opacity": 0,
    },
    filter: ["==", "pin_id", 2],
  });
};

const initial_pin_data_load = (map, json) => {
  Object.entries(json.features).forEach((item) => {
    console.log(item);
    item[1].properties.pin_id = item[1].id;
  });

  map.addSource("pin-data", {
    type: "geojson",
    data: json,
    cluster: true,
    clusterMaxZoom: CLUSTER_LEVEL, // Max zoom to cluster points on
    clusterRadius: 50, // Radius of each cluster when clustering points (defaults to 50)
  });

  console.log(json);

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
  Object.entries(json.features).forEach((item) => {
    item[1].properties.pin_id = item[1].id;
    console.log(item[1]);
  });

  map.getSource("pin-data").setData(json);
};

const reload_pins = async (map, selected_id) => {
  await new Promise((r) => setTimeout(r, 100));

  get_data_from_api(map, PIN_URL, reload_pins_from_api).then(async () => {
    await new Promise((r) => setTimeout(r, 100));
    let filter = ["==", "pin_id", selected_id];
    console.log(filter);

    map.setFilter("selected-pin", filter);
  });
};

export {
  load_pins_from_api,
  reload_pins,
  add_pin_layers,
  load_study_area_from_geojson,
};
