
import { map } from "./map"
import { add_pin_layers } from "./load_data"



const aerial_toggle = () => {

    let current_style = map.getStyle().name;
    console.log(current_style);
    let url;
    if (current_style != 'Mapbox Satellite') {
        url = "mapbox://styles/mapbox/satellite-v9";
    }
    else {
       url = "mapbox://styles/aarondvrpc/ckqhcmx6x95x318pgqzt4jicq";
    }
    console.log(url)
    map.setStyle(url);
    add_pin_layers(map);
}

const setup_minor_button_listeners = () => {
    document
        .getElementById("aerial-toggle")
        .addEventListener("click", aerial_toggle);
}

export { setup_minor_button_listeners }
