import { user_wants_to_add_pin } from "../switches";

const _use_pointer_when_hovering = (map, layername) => {
  /**
   * For the provided layername, set the cursor to use a
   * pointer when hovering, and return to normal cursor when
   * you move the mouse away
   */

  // change mouse tip to pointer finger if the user is not adding a pin
  map.on("mouseenter", layername, () => {
    if (!user_wants_to_add_pin()) {
      map.getCanvas().style.cursor = "pointer";
    }
  });

  // change mouse tip upon leaving feature if the user is not adding a pin
  map.on("mouseleave", layername, function (e) {
    if (!user_wants_to_add_pin()) {
      map.getCanvas().style.cursor = "";
    }
  });
};

const setup_hover_functionality = (map) => {
  // Show the hover pointer for clickable layers
  ["clusters", "unclustered-point"].forEach((layername) =>
    _use_pointer_when_hovering(map, layername)
  );
};

export { setup_hover_functionality };
