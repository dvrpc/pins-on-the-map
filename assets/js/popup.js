import mapboxgl from "mapbox-gl";

const newPopup = () =>
  /**
   * Generate a new mapboxgl.Popup object
   */
  new mapboxgl.Popup({
    closeButton: false,
    className: "i-am-a-popup",
  });

const bindPopup = (map, html_msg, click) => {
  /**
   * Add a new popup to the map where the user clicked
   *
   * @param {mapboxgl.Map} map - The map object for the page
   * @param {string} html_msg - text that gets dropped into the popup, including HTML tags
   * @param click - The click event from the user's interaction
   */
  var popup = newPopup();
  popup.setLngLat(click.lngLat).setHTML(html_msg).addTo(map);
};

const clearPopups = () => {
  // Remove any popups that may exist
  var popup = document.getElementsByClassName("mapboxgl-popup");
  if (popup.length) {
    popup[0].remove();
  }
};

export { bindPopup, clearPopups };
