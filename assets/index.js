import "mapbox-gl/dist/mapbox-gl.css";
import "./map_style.css";
import mapboxgl from "mapbox-gl";
import { click_pin } from "./js/click.js";
import { hover_setup } from "./js/hover.js";

mapboxgl.accessToken =
  "pk.eyJ1IjoiYWFyb25kdnJwYyIsImEiOiJja2NvN2s5dnAwaWR2MnptbzFwYmd2czVvIn0.Fcc34gzGME_zHR5q4RnSOg";

const makeMap = () => {
  /**
   * Generate a new map instance that is scaled to Montgomery County
   * and uses a custom basemap designed in Mapbox Studio
   */
  return new mapboxgl.Map({
    container: "map",
    style: "mapbox://styles/aarondvrpc/ckqhcmx6x95x318pgqzt4jicq",
    center: [-75.16365099150589, 39.95238882194495],
    zoom: 14,
  });
};

export { makeMap };

const map = makeMap();

map.on("load", function () {
  // Load pins from the API
  let url = "/api/geo-pins";
  var request = new XMLHttpRequest();
  request.open("GET", url, true);
  request.setRequestHeader("Access-Control-Allow-Origin", "*");
  request.onload = function () {
    if (this.status >= 200 && this.status < 400) {
      // retrieve the JSON from the response
      var json = JSON.parse(this.response);

      map.addSource("pin-data", {
        type: "geojson",
        data: json,
      });

      map.addLayer({
        id: "pins",
        type: "circle",
        source: "pin-data",
        paint: {
          "circle-color": "rgb(57,83,164)",
        },
      });
    }
  };
  request.send();

  // Set up the click event & hover
  click_pin(map);
  hover_setup(map);
});
