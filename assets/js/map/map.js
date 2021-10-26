import mapboxgl from "mapbox-gl";
import {
  CENTER,
  ZOOM,
  MAPBOX_BASEMAP,
  MAPBOX_TOKEN,
} from "../project_settings";

mapboxgl.accessToken = MAPBOX_TOKEN;

const _make_control_with_project_button = (map) => {
  // Add + and - zoom buttons to the map,
  // along with a button that zooms to the default project extent
  const navigationControl = new mapboxgl.NavigationControl({
    showCompass: false,
  });

  const button = document.createElement("button");
  const icon = document.createElement("img");

  button.type = "button";
  icon.id = "project-extent-img";
  icon.alt = "DVRPC Alternative Logo";
  icon.src = "/static/images/PROJECT-icon.png";

  button.classList.add("mapboxgl-ctrl-icon");
  button.classList.add("mapboxgl-ctrl-dvrpc");

  button.setAttribute("aria-label", "Project Extent");
  button.onclick = () => map.flyTo({ center: CENTER, zoom: ZOOM });
  button.appendChild(icon);

  // plug into mapbox fncs
  navigationControl._extent = button;
  navigationControl._container.prepend(button);

  return navigationControl;
};

const _make_map = () => {
  /**
   * Generate a new map instance that is scaled to Montgomery County
   * and uses a custom basemap designed in Mapbox Studio
   */

  let map = new mapboxgl.Map({
    container: "map",
    style: MAPBOX_BASEMAP,
    center: CENTER,
    zoom: ZOOM,
  });

  // add the zoom control to the map frame
  const control = _make_control_with_project_button(map);
  map.addControl(control, "bottom-left");

  return map;
};

// instantiate the map object so that other functions can access it
const map = _make_map();

export { map };
