import "mapbox-gl/dist/mapbox-gl.css";

import "./css/settings.css";
import "./css/map_style.css";
import "./css/alerts.css";
import "./css/box_overlays.css";
import "./css/base.css";
import "./css/buttons.css";
import "./css/navbar.css";

import "./css/mobile.css";
import "./css/survey.css";
import { add_longform_survey_to_database } from "./js/api/add_to_database";
import {
  add_basic_question_to_survey,
  load_1_to_5_question_set,
  load_prioritization_question,
} from "./js/survey/add_questions_to_html";
import {
  get_multiselect_input,
  get_radio_input,
  get_textarea_input,
  get_priority_ranking,
} from "./js/survey/get_survey_responses_from_html";

let q1 = {
  id: "q1",
  base_div: "questions-about-travel",
  prompt:
    "When you use Cecil B. Moore Avenue, what do you use it for? <br/>[check all that apply]",
  type: "checkbox",
  other: true,
  options: [
    "Commute to work",
    "Commute to school",
    "Run errands or go shopping",
    "Go to religious services",
    "Go out to restaurants or bars, socialize or entertainment",
    "I do not currently use Cecil B. Moore Avenue",
  ],
  loader_function: add_basic_question_to_survey,
};

let q2 = {
  id: "q2",
  base_div: "questions-about-travel",
  prompt:
    "How frequently do you travel to destinations on or near Cecil B. Moore Avenue?",
  type: "radio",
  other: false,
  options: [
    "Every day",
    "Every week",
    "Every few weeks",
    "Every month",
    "Every few months",
    "Never",
  ],
  loader_function: add_basic_question_to_survey,
};

let q3 = {
  id: "q3",
  base_div: "questions-about-travel",
  prompt:
    "Thinking about the last month, how have you traveled to destinations on or near Cecil B. Moore Avenue?<br/>[check all that apply]",
  type: "checkbox",
  other: false,
  options: [
    "Driving by myself",
    "Driving with others",
    "Walking",
    "Biking",
    "Bus/Train",
    "Uber/Lyft",
    "Taxi",
  ],
  loader_function: add_basic_question_to_survey,
};

let q4 = {
  id: "q4",
  base_div: "questions-about-travel",
  prompt:
    "Are there types of travel from the previous question that you would like to do more, and what keeps you from traveling that way more often?",
  type: "textarea",
  other: false,
  options: false,
  loader_function: add_basic_question_to_survey,
};

let q5 = {
  id: "q5",
  base_div: "questions-about-priorities",
  prompt:
    "On a scale of 1-5, how would you rate the current conditions of the following on Cecil B. Moore Avenue?",
  type: "radio",
  other: false,
  options: [
    "Crash safety",
    "Illegal parking issues",
    "Use of roadway space (travel lanes, parking, bike lanes)",
    "Traffic and congestion",
    "Transit facilities",
    "Pavement markings",
    "Potholes/road surface",
    "Sidewalk",
    "Drainage (ponding, flooding, etc.)",
  ],
  loader_function: load_1_to_5_question_set,
};

let q6 = {
  id: "q6",
  base_div: "questions-about-priorities",
  prompt: "Select and rank your top five goals for this project:",
  type: "special",
  other: false,
  options: [
    "Safe pedestrian crossings",
    "Safe bike lanes",
    "Less aggressive driving",
    "Increased pedestrian space",
    "Better parking and loading",
    "Safe bus boarding",
    "Quick drive times",
    "Less side street traffic",
    "Other:",
  ],
  loader_function: load_prioritization_question,
};

let q7 = {
  id: "q7",
  base_div: "questions-about-priorities",
  prompt:
    "How do you think safety along Cecil B. Moore Avenue could be improved?",
  type: "textarea",
  other: false,
  options: false,
  loader_function: add_basic_question_to_survey,
};

[q1, q2, q3, q4, q5, q6, q7].forEach((q) => {
  q.loader_function(q);
});

// wire the button click
document
  .getElementById("form-for-survey")
  .addEventListener("submit", function (event) {
    event.preventDefault();
  });

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
    condition_8: get_radio_input("q5-8"),
    condition_9: get_radio_input("q5-9"),
    priorities: get_priority_ranking("q6"),
    ideas: get_textarea_input("q7"),
  };

  console.log(data);

  add_longform_survey_to_database(data).then(async (response) => {
    if (response.user_was_added) {
      window.location.replace("/demographics");
    } else {
      window.location.replace("/thanks");
    }
  });
};
