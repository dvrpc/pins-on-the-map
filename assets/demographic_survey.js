import "mapbox-gl/dist/mapbox-gl.css";

import "./css/settings.css";
import "./css/map_style.css";
import "./css/alerts.css";
import "./css/box_overlays.css";
import "./css/mobile.css";
import "./css/survey.css";
import { add_longform_survey_to_database } from "./js/api/add_to_database";

const add_basic_question_to_survey = (question) => {
  let survey = document.getElementById(question.base_div);

  let qdiv = document.createElement("div");
  qdiv.className = "question";
  survey.appendChild(qdiv);

  // add the question
  let prompt = document.createElement("p");
  prompt.innerHTML = question.prompt + "<br/>";
  qdiv.appendChild(prompt);

  // add the options if there are any
  if (question.options) {
    // add all of the canned options
    let counter = 0;
    question.options.forEach((option) => {
      counter++;

      // add the label
      let label = document.createElement("label");
      label.innerHTML = option + "<br/>";
      qdiv.appendChild(label);

      // add the input
      var x = document.createElement("input");
      x.type = question.type;
      x.value = option;
      x.name = question.id;
      x.id = question.id + "-" + counter;

      label.prepend(x);
    });

    // add the 'other' entry box if needed
    if (question.other) {
      // add the label
      let label = document.createElement("label");
      label.innerHTML = "Other: ";
      qdiv.appendChild(label);

      // add the checkbox
      var check = document.createElement("input");
      check.type = "checkbox";
      check.id = question.id + "-other-check";
      label.prepend(check);

      // add the text input
      var text = document.createElement("input");
      text.type = "text";
      text.id = question.id + "-other-text";
      label.append(text);
    }
  }

  // if not options are provided, use a single input
  else {
    var x = document.createElement(question.type);
    x.name = question.id;
    x.id = question.id;

    qdiv.append(x);
  }

  //   // add the divider
  //   qdiv.append(document.createElement("hr"));
};

let q1 = {
  id: "q1",
  base_div: "questions-about-demographics",
  prompt: "Are you of Spanish/Hispanic/Latino origin?",
  type: "radio",
  other: false,
  options: ["Yes", "No"],
  loader_function: add_basic_question_to_survey,
};

let q2 = {
  id: "q2",
  base_div: "questions-about-demographics",
  prompt: "With which race do you identify? Select all that apply.",
  type: "checkbox",
  other: true,
  options: [
    "American Indian, Native American, or Alaska Native",
    "Asian or Pacific Islander",
    "Black or African American",
    "White",
  ],
  loader_function: add_basic_question_to_survey,
};

let q3 = {
  id: "q3",
  base_div: "questions-about-demographics",
  prompt: "What is your age range?",
  type: "radio",
  other: false,
  options: [
    "Under 18",
    "18 - 34",
    "35 - 44",
    "45 - 54",
    "55 - 64",
    "65 - 74",
    "75 years or over",
  ],
  loader_function: add_basic_question_to_survey,
};

let q4 = {
  id: "q4",
  base_div: "questions-about-demographics",
  prompt:
    "Do you consider yourself someone with a disability that requires mobile assistance, such as a cane, walker, scooter, or wheelchair?",
  type: "radio",
  other: false,
  options: ["Yes", "No"],
  loader_function: add_basic_question_to_survey,
};

let q5 = {
  id: "q5",
  base_div: "questions-about-demographics",
  prompt: "What is your zipcode?",
  type: "input",
  other: false,
  options: false,
  loader_function: add_basic_question_to_survey,
};

[q1, q2, q3, q4, q5].forEach((q) => {
  q.loader_function(q);
});

// wire the button click

const get_multiselect_input = (qid) => {
  let value = [];
  let query = '[id ^= "' + qid + '"]';
  document.querySelectorAll(query).forEach((el) => {
    if (el.checked) {
      if (el.id == qid + "-other-check") {
        let custom_value = document.getElementById(qid + "-other-text").value;
        value.push(custom_value);
      } else {
        value.push(el.value);
      }
    }
  });

  return value;
};

const get_radio_input = (qid) => {
  let value = "";
  let query = '[id ^= "' + qid + '"]';

  document.querySelectorAll(query).forEach((el) => {
    if (el.checked) {
      value = el.value;
    }
  });
  return value;
};

const get_textarea_input = (qid) => {
  return document.getElementById(qid).value;
};

const get_priority_ranking = (qid) => {
  let query = '[id ^= "' + qid + '"]';

  let priorities = ["", "", "", "", ""];

  document.querySelectorAll(query).forEach((el) => {
    if (el.value != "(select a priority)") {
      priorities[el.value - 1] = el.nextSibling.textContent;
    }
  });
  console.log(priorities);
  return priorities;
};

document.getElementById("submit-button").onclick = () => {
  let data = {
    usage: get_multiselect_input("q1"),
    frequency: get_radio_input("q2"),
    mode: get_multiselect_input("q3"),
    mode_issues: get_textarea_input("q4"),
    condition_1: get_radio_input("q5-1"),
    condition_2: get_radio_input("q5-2"),
    condition_3: get_radio_input("q5-3"),
    condition_4: get_radio_input("q5-4"),
    condition_5: get_radio_input("q5-5"),
    condition_6: get_radio_input("q5-6"),
    condition_7: get_radio_input("q5-7"),
    priorities: get_priority_ranking("q6"),
    ideas: get_textarea_input("q7"),
  };

  add_longform_survey_to_database(data).then(async (response) => {
    if (response.user_was_added) {
      console.log("OPEN THE DEMO SURVEY");
      window.location.replace("/demographics");
    } else {
      window.location.replace("/thanks");
    }
  });
};
