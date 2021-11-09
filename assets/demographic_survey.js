import "mapbox-gl/dist/mapbox-gl.css";

import "./css/settings.css";
import "./css/map_style.css";
import "./css/alerts.css";
import "./css/box_overlays.css";
import "./css/mobile.css";
import "./css/survey.css";
import { add_user_info_to_database } from "./js/api/add_to_database";
import { add_basic_question_to_survey } from "./js/survey/add_questions_to_html";
import {
  get_multiselect_input,
  get_radio_input,
  get_textarea_input,
} from "./js/survey/get_survey_responses_from_html";

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

let q6 = {
  id: "q6",
  base_div: "questions-about-demographics",
  prompt:
    "Are you interested in receiving email updates about this project? <br>If so, please provide your email address:",
  type: "input",
  other: false,
  options: false,
  loader_function: add_basic_question_to_survey,
};
[q1, q2, q3, q4, q5, q6].forEach((q) => {
  q.loader_function(q);
});

f; // wire the button click
document
  .getElementById("form-for-survey")
  .addEventListener("submit", function (event) {
    event.preventDefault();
  });

document.getElementById("submit-button").onclick = () => {
  let data = {
    q1: get_radio_input("q1"),
    q2: get_multiselect_input("q2"),
    q3: get_radio_input("q3"),
    q4: get_radio_input("q4"),
    q5: get_textarea_input("q5"),
    q6: get_textarea_input("q6"),
  };

  add_user_info_to_database(data).then(async (response) => {
    window.location.replace("/thanks");
  });
};
