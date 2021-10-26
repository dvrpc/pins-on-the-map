// CENTER and ZOOM define the initial map state
// --------------------------------------------
const CENTER = [-75.15672748733739, 39.97857408147478];
const ZOOM = 16;

// MAPBOX_TOKEN and MAPBOX_BASEMAP define the base styles used
// -----------------------------------------------------------
const MAPBOX_TOKEN =
  "pk.eyJ1IjoiZHZycGNvbWFkIiwiYSI6ImNrczZlNDBkZzFnOG0ydm50bXR0dTJ4cGYifQ.VaJDo9EtH2JyzKm3cC0ypA";
const MAPBOX_BASEMAP = "mapbox://styles/dvrpcomad/cks6eiqga0tmc17p3ecw7ij53";

// CLUSTER_LEVEL and CLUSTER_RADIUS define how the aggregation works
// -----------------------------------------------------------------
const CLUSTER_LEVEL = 17;
const CLUSTER_RADIUS = 50;

// MAP_STYLES is a centralized place to define all map styles
// ----------------------------------------------------------
const STYLES = {
  "study-area": {
    paint: {
      "fill-color": "rgba(0, 0, 0, 0.3)",
    },
  },

  // The cluster circles
  clusters: {
    paint: {
      "circle-opacity": 0.7,
      "circle-color": [
        "step",
        ["get", "point_count"],
        "#51bbd6",
        5,
        "#f1f075",
        15,
        "#f28cb1",
      ],
      "circle-radius": ["step", ["get", "point_count"], 20, 5, 30, 15, 40],
    },
  },

  // Numeric label that goes with the cluster circles
  "cluster-count": {
    layout: {
      "text-field": "{point_count_abbreviated}",
      "text-font": ["DIN Offc Pro Medium", "Arial Unicode MS Bold"],
      "text-size": 12,
    },
  },

  // Singular pins that are not part of a cluster
  "unclustered-point": {
    paint: {
      "circle-color": "#11b4da",
      "circle-radius": 4,
      "circle-stroke-width": 1,
      "circle-stroke-color": "#fff",
    },
  },

  // A layer which will show one pin at a time,
  // the one that the user has selected
  "selected-pin": {
    paint: {
      "circle-stroke-color": "yellow",
      "circle-radius": 15,
      "circle-stroke-width": 3,
      "circle-opacity": 0,
    },
  },
};

// The STUDY_AREA constant defines the area where
// users are allowed to click. It's a coverage of the region,
// with a cutout of our corridor.
// If a user's point intersects with this shape, it should
// not be allowed to be submitted to our database.
// ----------------------------------------------------------
const STUDY_AREA = {
  features: [
    {
      type: "Feature",
      properties: {
        Shape_Leng: 13922018.400100002,
        Shape_Area: 11875252262099.998,
      },
      geometry: {
        type: "MultiPolygon",
        coordinates: [
          [
            [
              [-67.884298087625325, 43.891472459739887],
              [-68.687723473518645, 35.678010668871913],
              [-81.965357271536547, 35.629567058578914],
              [-82.869198174870803, 43.836802871346173],
              [-67.884298087625325, 43.891472459739887],
            ],
            [
              [-75.162152318905214, 39.9787886608324],
              [-75.150887548290342, 39.977275870675207],
              [-75.150672406312836, 39.97822368002462],
              [-75.16193733046434, 39.97973649126979],
              [-75.162152318905214, 39.9787886608324],
            ],
          ],
        ],
      },
    },
  ],
};

export {
  STUDY_AREA,
  CENTER,
  ZOOM,
  MAPBOX_BASEMAP,
  MAPBOX_TOKEN,
  CLUSTER_LEVEL,
  CLUSTER_RADIUS,
  STYLES,
};
