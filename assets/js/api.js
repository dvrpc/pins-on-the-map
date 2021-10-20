const PIN_URL = "/api/get-pins";
const TAG_URL = "/api/tags";
const FILTER_URL = "/api/filter-pins";

const get_data_from_api = async (map, url, inner_func) => {
  /*
   * Get a JSON response from the URL endpoint, and then
   * dump the map object and JSON response into the inner_func
   */
  var request = new XMLHttpRequest();
  request.open("GET", url, true);
  request.setRequestHeader("Access-Control-Allow-Origin", "*");
  request.onload = function () {
    if (this.status >= 200 && this.status < 400) {
      // retrieve the JSON from the response
      var json = JSON.parse(this.response);

      return inner_func(map, json);
    }
  };
  request.send();
};

export { get_data_from_api, PIN_URL, TAG_URL, FILTER_URL };
