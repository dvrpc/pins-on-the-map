import {
  ADD_PIN_URL,
  ADD_COMMENT_URL,
  ADD_USER_INFO_URL,
  ADD_SURVEY_URL,
} from "./base";

const add_pin_to_database = async (lngLat) => {
  let selected_tags = Array.from(document.getElementsByClassName("selected"));

  let data = {
    geom: `SRID=4326;POINT (${lngLat.lng} ${lngLat.lat})`,
    prompt_1: document.getElementById("prompt_1").value,
  };

  selected_tags.forEach((tag) => {
    let tag_id = tag.id.replace("user-input-", "");
    data[tag_id] = true;
  });

  let new_id = -1;

  return fetch(ADD_PIN_URL, {
    method: "POST",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      return data;
    })
    .catch((ex) => {
      console.log("parsing failed", ex);
    });
};

const add_comment_to_database = async (comment) => {
  let data = {
    pin_id: document.getElementById("selected-pin-id").innerText,
    text: comment,
  };

  return fetch(ADD_COMMENT_URL, {
    method: "POST",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      return data;
    })
    .catch((ex) => {
      console.log("parsing failed", ex);
    });
};

const add_user_info_to_database = async (user_data) => {
  return fetch(ADD_USER_INFO_URL, {
    method: "POST",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user_data),
  })
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      return data;
    })
    .catch((ex) => {
      console.log("parsing failed", ex);
    });
};

const add_longform_survey_to_database = async (data) => {
  return fetch(ADD_SURVEY_URL, {
    method: "POST",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      return data;
    })
    .catch((ex) => {
      console.log("parsing failed", ex);
    });
};

export {
  add_comment_to_database,
  add_pin_to_database,
  add_user_info_to_database,
  add_longform_survey_to_database,
};
