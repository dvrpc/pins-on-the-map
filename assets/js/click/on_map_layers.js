import mapboxgl from "mapbox-gl";
import { add_marker_to_map } from "../map/markers";
import {
  user_wants_to_add_pin,
  set_display_to_id,
  set_mouse_to_crosshair,
  select_pin_by_id,
} from "../switches";

const show_detail_for_existing_pin = (e, map) => {
  // when you click a single pin, show a page
  // that has all of the relevant details listed
  // e.g. original comment, selected tags, and any responses from others

  // Add content to the DETAIL FORM
  var props = e.features[0].properties;

  // Use text or placeholder for primary reaction
  let text = "";
  if (props.prompt_1 == "") {
    text = "(No comment was provided)";
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

  // set the selected pin ID (this div is hidden from users, but used by JS)
  document.getElementById("selected-pin-id").innerText = props.pin_id;

  // Remove all old comments from the prior pin
  let div = document.getElementById("comments-for-pin");
  while (div.firstChild) {
    div.removeChild(div.firstChild);
  }

  // Add any comments related to this newly clicked pin
  let comment_data = JSON.parse(props.comments);

  if (comment_data.length > 0) {
    set_display_to_id("reaction-header", "inline");

    comment_data.forEach((comment) => {
      let p = document.createElement("p");
      p.innerText = comment.text;
      // p.className = "comment-style";
      div.appendChild(p);
    });
  } else {
    set_display_to_id("reaction-header", "none");
  }

  // Show the detail form
  set_display_to_id("detail-form", "block");

  // Ensure the filter box is off
  set_display_to_id("filter-box", "none");

  // Center the map on the selected pin
  map.flyTo({
    center: e.lngLat,
    zoom: map.getZoom(),
    essential: true,
  });

  // Show this pin with the 'selected' style
  select_pin_by_id(map, e.features[0].id);
};

const ungroup_a_pin_cluster = (e, map) => {
  // When you click a cluster, expand the points within and zoom the map frame
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

const setup_map_click_functionality = (map) => {
  /**
   * Handle click events for map layers:
   *  -> unclustered-point
   *  -> clusters
   *  -> general click anywhere on the map
   */

  // click on a single point
  // -> show a popup and center the map on it
  // ----------------------------------------
  map.on("click", "unclustered-point", (e) => {
    if (!user_wants_to_add_pin()) {
      show_detail_for_existing_pin(e, map);
      set_display_to_id("survey-form", "none");
      set_display_to_id("info-box", "none");
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
      set_mouse_to_crosshair(map);
    }
  });
};

export { setup_map_click_functionality };
