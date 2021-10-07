const get_bounding_box_from_geojson = (data) => {
  /*
   * Convert a geojson into a bounding box of its features
   */

  var bounds = {},
    coords,
    latitude,
    longitude;

  // Iterate over every feature in the data
  data.features.forEach((feature) => {
    coords = feature.geometry.coordinates;

    // Iterate over every coordinate in a single feature
    coords.forEach((coord) => {
      longitude = coord[0];
      latitude = coord[1];

      // Update the X and Y min and max if warranted
      bounds.xMin = bounds.xMin < longitude ? bounds.xMin : longitude;
      bounds.xMax = bounds.xMax > longitude ? bounds.xMax : longitude;
      bounds.yMin = bounds.yMin < latitude ? bounds.yMin : latitude;
      bounds.yMax = bounds.yMax > latitude ? bounds.yMax : latitude;
    });
  });
  return bounds;
};

const fit_map_to_geojson = (map, data) => {
  /*
   * Zoom to the bounding box of a given geojson
   */
  var bbox = get_bounding_box_from_geojson(data);

  map.fitBounds(
    [
      [bbox.xMin, bbox.yMin],
      [bbox.xMax, bbox.yMax],
    ],
    {
      padding: 200,
    }
  );
};

export { fit_map_to_geojson };
