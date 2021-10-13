const set_display_to_id = (div_id, display_prop) => {
  document.getElementById(div_id).style.display = display_prop;
};

const user_wants_to_add_pin = () => {
  return document.getElementById("click-map-text").style.display == "inline";
};

const toggle_button_state = (div) => {
  let this_div = document.getElementById(div.target.id);

  if (this_div.classList.contains("selected")) {
    this_div.classList.remove("selected");
  } else {
    this_div.classList.add("selected");
  }
};

export { set_display_to_id, user_wants_to_add_pin, toggle_button_state };
