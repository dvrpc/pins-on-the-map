import mapboxgl from "mapbox-gl";
import { add_marker_to_map } from "./markers";
import { bindPopup } from "./popup";

const wire_click_logic = (map) => {
  /**
   * Handle click events for map layers
   *
   * @param {mapboxgl.Map} map - The map object for the page
   */
  map.on("click", "unclustered-point", function (e) {
    var props = e.features[0].properties;
    console.log(props);
    var comments = JSON.parse(props.comments);

    var prompt_1 = props.prompt_1;

    bindPopup(map, prompt_1, e);

    map.flyTo({
      center: e.lngLat,
      zoom: 16.5,
      essential: true,
    });
  });

  map.on("click", "clusters", (e) => {
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
  });

  map.on("click", (e) => {
    if (document.getElementById("click-map-text").style.display == "inline") {
      add_marker_to_map(map, e.lngLat);
    }
  });
};

export { wire_click_logic };
