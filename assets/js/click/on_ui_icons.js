import { reload_pins } from "../api/load_data";
import {
  set_display_to_id,
  set_mouse_to_normal,
  clear_selected_pin,
} from "../switches";
import { remove_markers } from "../map/markers";
import { CLIENT_URL, PROJECT_URL } from "../project_settings";

const setup_icon_listeners = (map) => {
  // Assign actions to all of the smaller icons or other clickable elements

  // Close the survey form
  // ---------------------
  document.getElementById("close-form").onclick = () => {
    set_mouse_to_normal(map);
    remove_markers();

    set_display_to_id("survey-form", "none");
    set_display_to_id("click-map-text", "none");
  };

  // Close the form showing info for a single pin
  // --------------------------------------------
  document.getElementById("close-details").onclick = () => {
    set_display_to_id("detail-form", "none");
    clear_selected_pin(map);
  };

  // Close the demographic form
  // --------------------------
  document.getElementById("close-demographic-survey").onclick = () => {
    set_display_to_id("demographic-survey", "none");
  };

  // Close the introductory text box
  // -------------------------------
  document.getElementById("close-info").onclick = () => {
    set_display_to_id("info-box", "none");
  };

  // Close the filter box
  // --------------------
  document.getElementById("close-filter").onclick = () => {
    set_display_to_id("filter-box", "none");
  };

  // Click the "How to use this map" button in the header
  // ----------------------------------------------------
  document.getElementById("about-button").onclick = () => {
    set_mouse_to_normal(map);
    set_display_to_id("info-box", "inline");

    // turn off other divs
    ["survey-form", "detail-form", "filter-box", "click-map-text"].forEach(
      (div_id) => set_display_to_id(div_id, "none")
    );
  };

  // Click the "Filter..." button in the header
  // ------------------------------------------
  document.getElementById("filter-button").onclick = () => {
    // turn off other divs
    ["survey-form", "detail-form", "info-box", "click-map-text"].forEach(
      (div_id) => set_display_to_id(div_id, "none")
    );

    // turn on the filter box, remove selection, and use normal mouse
    set_display_to_id("filter-box", "inline");
    clear_selected_pin(map);
    set_mouse_to_normal(map);
  };

  // CLIENT logo opens a URL in new tab
  // ----------------------------------
  document.getElementById("logo-client").onclick = () => {
    window.open(CLIENT_URL, "_blank", "noopener");
  };

  // DVRPC logo opens a URL in new tab
  // ---------------------------------
  document.getElementById("logo-dvrpc").onclick = () => {
    window.open("https://www.dvrpc.org/", "_blank", "noopener");
  };

  // PROJECT logo opens a URL in new tab
  // ---------------------------------
  document.getElementById("logo-main").onclick = () => {
    window.open(PROJECT_URL, "_blank", "noopener");
  };

  // Toggle for full disclaimer text within the info box
  // ---------------------------------------------------
  document.getElementById("disclaimer-toggle").onclick = () => {
    let disclaimer_div = document.getElementById("disclaimer");
    if (disclaimer_div.style.display == "inline") {
      disclaimer_div.style.display = "none";
    } else {
      disclaimer_div.style.display = "inline";
    }
  };

  // Within the filter box, clear the tag selection
  // ----------------------------------------------
  document.getElementById("clear-filter-button").onclick = () => {
    // Reload data without any filters
    reload_pins(map);

    // Remove the `selected-filter` class from the tag filters
    Array.from(document.getElementsByClassName("map-filters")).forEach(
      (tag) => {
        if (tag.classList.contains("selected-filter")) {
          tag.classList.remove("selected-filter");
        }
      }
    );

    // Remove the 'clear filter' button from the filter box
    set_display_to_id("clear-filter-button", "none");
  };
};

export { setup_icon_listeners };
