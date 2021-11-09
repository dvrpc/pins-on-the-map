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

  console.log(value);

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
      let priority_text = el.nextSibling.textContent;
      if (priority_text != "Other: ") {
        priorities[el.value - 1] = priority_text;
      } else {
        let text_entry = el.nextSibling.nextSibling.value;
        priorities[el.value - 1] = text_entry;
      }
    }
  });
  return priorities;
};

export {
  get_multiselect_input,
  get_radio_input,
  get_textarea_input,
  get_priority_ranking,
};
