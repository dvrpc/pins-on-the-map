import mapboxgl from "mapbox-gl";

mapboxgl.accessToken =
  "pk.eyJ1IjoiZHZycGNvbWFkIiwiYSI6ImNrczZlNDBkZzFnOG0ydm50bXR0dTJ4cGYifQ.VaJDo9EtH2JyzKm3cC0ypA";

const make_map = () => {
  /**
   * Generate a new map instance that is scaled to Montgomery County
   * and uses a custom basemap designed in Mapbox Studio
   */

  const nav = new mapboxgl.NavigationControl({ showCompass: false });

  let map = new mapboxgl.Map({
    container: "map",
    style: "mapbox://styles/dvrpcomad/cks6eiqga0tmc17p3ecw7ij53",
    center: [-75.15672748733739, 39.97857408147478],
    zoom: 16,
  });

  map.addControl(nav, "top-right");

  return map;
};

const map = make_map();

export { map };
