import * as turf from "@turf/turf";
import { STUDY_AREA } from "./study_area";

const point_is_outside_study_area = (lngLat) => {
  /*
   * Test the provided lngLat value to see if it
   * intersects with the study area.
   * Note: This shape is a cutout!
   */

  var pt = turf.point([lngLat.lng, lngLat.lat]);
  var poly = turf.polygon(STUDY_AREA.features[0].geometry.coordinates[0]);

  return turf.booleanPointInPolygon(pt, poly);
};

export { point_is_outside_study_area };
