import {
  STUDY_AREA,
  CLUSTER_LEVEL,
  CLUSTER_RADIUS,
  STYLES,
} from "../project_settings";
import { get_data_from_api, PIN_URL } from "./base";
import { set_display_to_id, select_pin_by_id } from "../switches";

const _move_pin_id_to_props = (json) => {
  // the `pin_id` value is at the top level,
  // but we need it beneath `properties` for
  // mapbox to be able to filter on it.
  Object.entries(json.features).forEach((item) => {
    item[1].properties.pin_id = item[1].id;
  });

  return json;
};

const add_pin_layers = (map) => {
  // After loading the source data, we need to add the
  // pin layers to the map

  // for an example of clustering, see:
  // https://docs.mapbox.com/mapbox-gl-js/example/cluster/

  // The cluster circles
  map.addLayer({
    id: "clusters",
    type: "circle",
    source: "pin-data",
    filter: ["has", "point_count"],
    paint: STYLES["clusters"].paint,
  });

  // Numeric label that goes with the cluster circles
  map.addLayer({
    id: "cluster-count",
    type: "symbol",
    source: "pin-data",
    filter: ["has", "point_count"],
    layout: STYLES["cluster-count"].layout,
  });

  // Singular pins that are not part of a cluster
  map.addLayer({
    id: "unclustered-point",
    type: "circle",
    source: "pin-data",
    filter: ["!", ["has", "point_count"]],
    paint: STYLES["unclustered-point"].paint,
  });

  // A layer which will show one pin at a time,
  // the one that the user has selected
  map.addLayer({
    id: "selected-pin",
    type: "circle",
    source: "pin-data",
    paint: STYLES["selected-pin"].paint,
    filter: ["==", "pin_id", -1],
  });
};

const initial_pin_data_load = (map, json) => {
  // The initial load requires adding the JSON data
  // as a new source, and then adding all the layers
  // that draw data from this source

  var json = _move_pin_id_to_props(json);

  map.addSource("pin-data", {
    type: "geojson",
    data: json,
    cluster: true,
    clusterMaxZoom: CLUSTER_LEVEL,
    clusterRadius: CLUSTER_RADIUS,
  });

  add_pin_layers(map);
};

const load_study_area_from_geojson = (map) => {
  // Load the study area as geojson source
  // from the project_settings file
  map.addSource("study-area-data", {
    type: "geojson",
    data: STUDY_AREA.features[0],
  });

  // Add a semi-transparent layer for the study area mask
  map.addLayer({
    id: "study-area",
    type: "fill",
    source: "study-area-data",
    paint: STYLES["study-area"].paint,
  });
};

const load_pins_from_api_for_the_first_time = async (map) => {
  get_data_from_api(map, PIN_URL, initial_pin_data_load);
};

const _refresh_pins_from_api = (map, json) => {
  // After getting a new JSON set from the API,
  // make sure the ID is in the props...
  var json = _move_pin_id_to_props(json);

  // ... and then update the geojson source with the new data
  map.getSource("pin-data").setData(json);
};

const reload_pins = async (map, selected_id = false) => {
  // wait a beat for the upstream action
  await new Promise((r) => setTimeout(r, 100));

  // load pin data from API
  get_data_from_api(map, PIN_URL, _refresh_pins_from_api).then(async () => {
    // Make sure that no tags are selected in the filter box
    Array.from(document.getElementsByClassName("selected-filter")).forEach(
      (tag) => {
        tag.classList.remove("selected-filter");
      }
    );

    // if a pin ID was provided, select if after the data refreshes
    if (selected_id) {
      // wait a beat
      await new Promise((r) => setTimeout(r, 100));

      // highlight the single pin that was added/updated
      select_pin_by_id(map, selected_id);
    }
  });

  // make sure filter ui text is off
  set_display_to_id("active-filter-text", "none");
};

const filter_pins = async (map, url) => {
  // When filtering pins, run the refresh process with
  // the provided URL
  get_data_from_api(map, url, _refresh_pins_from_api);
};

export {
  load_pins_from_api_for_the_first_time,
  reload_pins,
  add_pin_layers,
  load_study_area_from_geojson,
  filter_pins,
};
