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

const load_1_to_5_question_set = (question) => {
  let survey = document.getElementById(question.base_div);

  let qdiv = document.createElement("div");
  qdiv.className = "question";
  survey.appendChild(qdiv);

  // add the question
  let prompt = document.createElement("p");
  prompt.innerHTML = question.prompt + "<br/>";
  qdiv.appendChild(prompt);

  // add all of the canned options
  let counter = 0;
  question.options.forEach((prompt) => {
    counter++;

    let subprompt = document.createElement("p");
    subprompt.innerHTML = prompt;
    subprompt.className = "select-one-to-five-topic";
    qdiv.appendChild(subprompt);

    if (counter == 1) {
      subprompt.prepend(document.createElement("hr"));
    }

    let radio_group = document.createElement("div");

    radio_group.className = "select-one-to-five";
    subprompt.appendChild(radio_group);

    [1, 2, 3, 4, 5].forEach((num) => {
      // add the label
      let label = document.createElement("label");
      if (num == 1) {
        label.innerHTML = num.toString() + " (Bad)";
      } else if (num == 5) {
        label.innerHTML = num.toString() + " (Great)";
      } else {
        label.innerHTML = num.toString();
      }

      radio_group.appendChild(label);

      // add the input
      var x = document.createElement("input");
      x.type = question.type;
      x.value = num;
      x.name = question.id + "-" + counter;
      x.id = question.id + "-" + counter + "-" + num;

      label.prepend(x);
    });
    subprompt.appendChild(document.createElement("hr"));
  });
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
    "Double parking issues",
    "Existing road layout",
    "Pavement markings",
    "Road pavement condition",
    "Sidewalk condition",
    "Drainage",
  ],
  loader_function: load_1_to_5_question_set,
};

const load_prioritization_question = (question) => {
  let survey = document.getElementById(question.base_div);

  let qdiv = document.createElement("div");
  qdiv.className = "question";
  survey.appendChild(qdiv);

  // add the question
  let prompt = document.createElement("p");
  prompt.innerHTML = question.prompt + "<br/>";
  qdiv.appendChild(prompt);

  // add each option
  let counter = 0;
  question.options.forEach((option) => {
    counter++;
    // add the label
    let label = document.createElement("label");
    label.innerHTML = option + "<br/>";
    label.className = "priority-choice";
    qdiv.appendChild(label);

    // add the input
    var x = document.createElement("select");
    x.name = question.id;
    x.id = question.id + "-" + counter;

    label.prepend(x);

    ["(select a priority)", 1, 2, 3, 4, 5].forEach((num) => {
      let choice = document.createElement("option");
      choice.value = num;
      if (num == "(select a priority)") {
        choice.text = num;
      } else {
        choice.text = "Priority #" + num;
      }
      x.appendChild(choice);
    });

    // add the event listener to prevent multiple choices of a single number
    x.addEventListener("change", (e) => {
      let newest_value = e.target.value;
      let changed_id = e.target.id;

      // do other dropdowns have this value?
      document.querySelectorAll('[id ^= "q6"]').forEach((el) => {
        if (el.value == newest_value && el.id != changed_id) {
          el.value = "(select a priority)";
        }
      });

      // If so, reset that one to a default
    });
  });
};
let q6 = {
  id: "q6",
  base_div: "questions-about-priorities",
  prompt: "Select and rank your top five goals for this project:",
  type: "special",
  other: false,
  options: [
    "Safe Pedestrian Crossings",
    "Safe Bike Lanes",
    "Less Aggressive Driving",
    "Increased Pedestrian Space",
    "Better Parking & Loading",
    "Safe Bus Boarding",
    "Quick Drive Times",
    "Less Side Street Traffic",
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
