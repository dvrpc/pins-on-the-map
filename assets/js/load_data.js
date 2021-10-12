import { fit_map_to_geojson } from "./zoom_to_layer";

const CLUSTER_LEVEL = 15;

const PIN_URL = "/api/get-pins";

const add_pin_layers = (map) => {

  // flush out any versions of these layers that may exist
  let layers = [ "clusters", "cluster-count", "unclustered-point"];

  layers.forEach(layer => {
    if (map.getLayer(layer)) map.removeLayer(layer);
  })

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
}


const load_pins_from_api = async (map) => {
  // Load pins from the API
  var request = new XMLHttpRequest();
  request.open("GET", PIN_URL, true);
  request.setRequestHeader("Access-Control-Allow-Origin", "*");
  request.onload = function () {
    if (this.status >= 200 && this.status < 400) {
      // retrieve the JSON from the response
      var json = JSON.parse(this.response);

      map.addSource("pin-data", {
        type: "geojson",
        data: json,
        cluster: true,
        clusterMaxZoom: CLUSTER_LEVEL, // Max zoom to cluster points on
        clusterRadius: 50, // Radius of each cluster when clustering points (defaults to 50)
      });

      add_pin_layers(map)

    }
  };
  request.send();
};

const reload_pins = async (map) => {
  await new Promise((r) => setTimeout(r, 100));
  var request = new XMLHttpRequest();
  request.open("GET", PIN_URL, true);
  request.setRequestHeader("Access-Control-Allow-Origin", "*");

  request.onload = function () {
    if (this.status >= 200 && this.status < 400) {
      var json = JSON.parse(this.response);

      console.log(json);

      map.getSource("pin-data").setData(json);
      //   fit_map_to_geojson(map, json);
    }
  };
  request.send();
};
export { load_pins_from_api, reload_pins, add_pin_layers };
