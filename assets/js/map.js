import mapboxgl from "mapbox-gl";

mapboxgl.accessToken =
  "pk.eyJ1IjoiZHZycGNvbWFkIiwiYSI6ImNrczZlNDBkZzFnOG0ydm50bXR0dTJ4cGYifQ.VaJDo9EtH2JyzKm3cC0ypA";

const CENTER = [-75.15672748733739, 39.97857408147478];
const ZOOM = 16;

const make_control_with_project_button = (map) => {
  // coordinates and zoom level for regional extent

  const navigationControl = new mapboxgl.NavigationControl({
    showCompass: false,
  });

  const button = document.createElement("button");
  const icon = document.createElement("img");

  button.type = "button";
  icon.id = "project-extent-img";
  icon.alt = "DVRPC Alternative Logo";
  icon.src = "/static/images/CBM.png";

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

const make_map = () => {
  /**
   * Generate a new map instance that is scaled to Montgomery County
   * and uses a custom basemap designed in Mapbox Studio
   */

  let map = new mapboxgl.Map({
    container: "map",
    style: "mapbox://styles/dvrpcomad/cks6eiqga0tmc17p3ecw7ij53",
    center: CENTER,
    zoom: ZOOM,
  });

  const control = make_control_with_project_button(map);
  map.addControl(control, "bottom-left");

  return map;
};

const map = make_map();

export { map };
