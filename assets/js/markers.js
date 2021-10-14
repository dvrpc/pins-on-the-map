import mapboxgl from "mapbox-gl";
import { point_is_outside_study_area } from "./spatial_intersection";
import { set_display_to_id } from "./switches";
const MAP_MARKERS = []; // global to keep track of markers added to the map

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

  if (point_is_outside_study_area(lngLat)) {
    set_display_to_id("study-area-alert", "inline");
  } else {
    set_display_to_id("study-area-alert", "none");
    let marker = new mapboxgl.Marker({ color: "#00AEEF", draggable: true })
      .setLngLat(lngLat)
      .addTo(map);
    marker_list.push(marker);

    return marker;
  }
};

const get_coords_of_marker = (marker_list = MAP_MARKERS) => {
  if (marker_list.length > 0) {
    return marker_list[0].getLngLat();
  } else {
    return { lat: 0, lng: 0 };
  }
};

const markers_are_not_on_the_map = (marker_list = MAP_MARKERS) => {
  return !marker_list.length > 0;
};

export {
  add_marker_to_map,
  remove_markers,
  get_coords_of_marker,
  markers_are_not_on_the_map,
};
