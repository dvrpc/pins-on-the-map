import { bindPopup } from "./popup.js";

const click_pin = (map) => {
  /**
   * Handle click events for the 'pins' layer
   *
   * @param {mapboxgl.Map} map - The map object for the page
   */
  map.on("click", "pins", function (e) {
    var props = e.features[0].properties;
    var tags = JSON.parse(props.tags);
    var comments = JSON.parse(props.comments);

    var survey = JSON.parse(props.survey_id);

    console.log(survey);
    bindPopup(map, props.survey_id, e);

    map.flyTo({
      center: e.lngLat,
      zoom: 16.5,
      essential: true,
    });
  });
};

export { click_pin };
