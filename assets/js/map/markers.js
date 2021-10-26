import mapboxgl from "mapbox-gl";
import { point_is_outside_study_area } from "./spatial_intersection";
import { set_display_to_id } from "../switches";

// MAP_MARKERS is a global to keep track of markers added to the map
const MAP_MARKERS = [];

const remove_markers = (marker_list = MAP_MARKERS) => {
  /* Remove any markers that may exist */
  marker_list.forEach((marker) => {
    marker.remove();
    marker_list.shift();
  });
};

const add_marker_to_map = (map, lngLat, marker_list = MAP_MARKERS) => {
  /* Add marker at lngLat to map,
   * after first making sure that no other markers exist
   */

  remove_markers();

  // If point is outside study area, show user a warning message
  if (point_is_outside_study_area(lngLat)) {
    set_display_to_id("study-area-alert", "inline");
  }
  // If the point is inside the study area, add the marker to the map
  else {
    set_display_to_id("study-area-alert", "none");
    let marker = new mapboxgl.Marker({ color: "#00AEEF", draggable: true })
      .setLngLat(lngLat)
      .addTo(map);

    // Make sure this marker is in our global list (so we can remove it later)
    marker_list.push(marker);

    return marker;
  }
};

const get_coords_of_marker = (marker_list = MAP_MARKERS) => {
  // If there is a marker on the map, get its lat/lng
  if (marker_list.length > 0) {
    return marker_list[0].getLngLat();
  }
  // If no marker on the map, give it a 0/0 (aka 'no data') lat/lng
  else {
    return { lat: 0, lng: 0 };
  }
};

const markers_are_not_on_the_map = (marker_list = MAP_MARKERS) => {
  // Return True if no markers are currently on the map
  return !marker_list.length > 0;
};

export {
  add_marker_to_map,
  remove_markers,
  get_coords_of_marker,
  markers_are_not_on_the_map,
};
