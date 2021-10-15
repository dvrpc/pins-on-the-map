import { user_wants_to_add_pin } from "./switches";

const hover_cursor = (map, layername) => {
  /**
   * For the provided layername, set the cursor to use a
   * pointer when hovering, and return to normal cursor when
   * you move the mouse away
   *
   * @param {mapboxgl.Map} map - The map object for the page
   * @param {string} layername - The name of the layer to assign the functionality to
   */

  // change mouse tip to pointer finger
  map.on("mouseenter", layername, () => {
    if (!user_wants_to_add_pin()) {
      map.getCanvas().style.cursor = "pointer";
    }
  });

  // change mouse tip upon leaving feature
  map.on("mouseleave", layername, function (e) {
    if (!user_wants_to_add_pin()) {
      map.getCanvas().style.cursor = "";
    }
  });
};

const hover_setup = (map) => {
  hover_cursor(map, "clusters");
  hover_cursor(map, "unclustered-point");
};

export { hover_setup };
