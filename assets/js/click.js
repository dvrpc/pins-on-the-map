import mapboxgl from "mapbox-gl";
import { add_marker_to_map } from "./markers";
import { bindPopup } from "./popup";
import { user_wants_to_add_pin, set_display_to_id } from "./switches";

const show_detail_for_existing_pin = (e, map) => {
  // Add content to the DETAIL FORM
  var props = e.features[0].properties;

  // Use text or placeholder for primary reaction
  let text = "";
  if (props.prompt_1 == "") {
    text =
      "No comment was provided! \r\nNo comment was provided! \r\nNo comment was provided! \r\nNo comment was provided! \r\nNo comment was provided! \r\nNo comment was provided! \r\nNo comment was provided! \r\nNo comment was provided! \r\nNo comment was provided! \r\nNo comment was provided! \r\nNo comment was provided! \r\nNo comment was provided! \r\nNo comment was provided! \r\nNo comment was provided! \r\nNo comment was provided! \r\nNo comment was provided! \r\nNo comment was provided! \r\nNo comment was provided! \r\nNo comment was provided! \r\n";
  } else {
    text = props.prompt_1;
  }
  document.getElementById("detail-prompt").innerText = text;

  // Make tag(s) selected if any are 'true'
  Object.entries(props).forEach((prop) => {
    let id = prop[0];
    let is_present = prop[1];

    if (id.includes("tag")) {
      let tag_id = "detail-tags-" + id;
      let tag_div = document.getElementById(tag_id);
      if (is_present) {
        tag_div.classList.add("selected-blue");
      } else {
        tag_div.classList.remove("selected-blue");
      }
    }
  });

  // Show the topic heading if at least 1 topic was applied to this pin
  if (document.getElementsByClassName("selected-blue").length > 0) {
    set_display_to_id("topic-title", "inline");
  } else {
    set_display_to_id("topic-title", "none");
  }

  // TODO: handle comments
  set_display_to_id("detail-form", "block");

  console.log(props);

  // console.log(props);
  // // var comments = JSON.parse(props.comments);

  // var prompt_1 = props.prompt_1;

  // bindPopup(map, prompt_1, e);

  // map.flyTo({
  //   center: e.lngLat,
  //   zoom: map.getZoom(),
  //   essential: true,
  // });
};

const ungroup_a_pin_cluster = (e, map) => {
  const features = map.queryRenderedFeatures(e.point, {
    layers: ["clusters"],
  });
  const clusterId = features[0].properties.cluster_id;
  map.getSource("pin-data").getClusterExpansionZoom(clusterId, (err, zoom) => {
    if (err) return;

    map.easeTo({
      center: features[0].geometry.coordinates,
      zoom: zoom,
    });
  });
};

const wire_click_logic = (map) => {
  /**
   * Handle click events for map layers:
   *  -> unclustered-point
   *  -> clusters
   *  -> general click anywhere on the map
   *
   * @param {mapboxgl.Map} map - The map object for the page
   */

  // click on a single point
  // -> show a popup and center the map on it
  // ----------------------------------------
  map.on("click", "unclustered-point", (e) => {
    if (!user_wants_to_add_pin()) {
      show_detail_for_existing_pin(e, map);
    }
  });

  // click on a cluster
  // -> expand the cluster and zoom in
  // ----------------------------------
  map.on("click", "clusters", (e) => {
    if (!user_wants_to_add_pin()) {
      ungroup_a_pin_cluster(e, map);
    }
  });

  // click anywhere on the map
  // -> add a marker if user indicated they want to
  // ----------------------------------------------
  map.on("click", (e) => {
    if (user_wants_to_add_pin()) {
      add_marker_to_map(map, e.lngLat);
    }
  });
};

export { wire_click_logic };
