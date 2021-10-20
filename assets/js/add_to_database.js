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

  return fetch("/api/add-pin/", {
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
      new_id = data.pin_id;
      return new_id;
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

  return fetch("/api/add-comment/", {
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

export { add_comment_to_database, add_pin_to_database };
