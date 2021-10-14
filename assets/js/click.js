import mapboxgl from "mapbox-gl";
import { add_marker_to_map } from "./markers";
import { bindPopup } from "./popup";
import { user_wants_to_add_pin } from "./switches";

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
    //
    if (!user_wants_to_add_pin()) {
      var props = e.features[0].properties;
      console.log(props);
      // var comments = JSON.parse(props.comments);

      var prompt_1 = props.prompt_1;

      bindPopup(map, prompt_1, e);

      map.flyTo({
        center: e.lngLat,
        zoom: map.getZoom(),
        essential: true,
      });
    }
  });

  // click on a cluster
  // -> expand the cluster and zoom in
  // ----------------------------------
  map.on("click", "clusters", (e) => {
    if (!user_wants_to_add_pin()) {
      const features = map.queryRenderedFeatures(e.point, {
        layers: ["clusters"],
      });
      const clusterId = features[0].properties.cluster_id;
      map
        .getSource("pin-data")
        .getClusterExpansionZoom(clusterId, (err, zoom) => {
          if (err) return;

          map.easeTo({
            center: features[0].geometry.coordinates,
            zoom: zoom,
          });
        });
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
