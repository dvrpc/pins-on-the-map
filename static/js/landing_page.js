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
    zoom: 10,
  });
};

export { makeMap };

const map = makeMap();

map.on("load", function () {
  // Do stuff
});
