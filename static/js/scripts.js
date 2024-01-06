const console = require("console");

var data = require("../../data.json"); //with path

console.log(data);

const length_of_data = data.length;
let selected_theatre = document.querySelector("[data-selected-theatre]");
const number_of_answers = 3;
console.log(selected_theatre);

generate_question();

function generate_question() {
  let random_correct_index = getRandomInt(length_of_data - 1);
  console.log(
    "The random selected theatre is: " +
      data[random_correct_index]["Theatre Name"]
  );
  selected_theatre.innerHTML = data[random_correct_index]["Theatre Name"];

  // Set up the array that will hold the wrong answers
  let answer_index_array = [];

  // Add correct index to array so that integer isn't selected again
  answer_index_array.push(random_correct_index);

  let random_incorrect_index_1 = getRandomIntegerExcluding(
    length_of_data - 1,
    answer_index_array
  );
  console.log(random_incorrect_index_1);

  console.log(
    "The first incorrect theatre is: " +
      data[random_incorrect_index_1]["Theatre Name"]
  );

  // Add first incorrect index to array so that integer isn't selected again
  answer_index_array.push(random_incorrect_index_1);

  let random_incorrect_index_2 = getRandomIntegerExcluding(
    length_of_data - 1,
    answer_index_array
  );

  console.log(
    "The second incorrect theatre is: " +
      data[random_incorrect_index_2]["Theatre Name"]
  );

  load_answers();
  function load_answers() {
    let positions_array = [0];

    let random_position_1 = getRandomIntegerExcluding(
      number_of_answers + 1,
      positions_array
    );
    positions_array.push(random_position_1);

    console.log(positions_array);

    let random_position_2 = getRandomIntegerExcluding(
      number_of_answers + 1,
      positions_array
    );
    positions_array.push(random_position_2);

    let random_position_3 = getRandomIntegerExcluding(
      number_of_answers + 1,
      positions_array
    );

    console.log(random_position_1);

    //Load correct answer onto page
    let position_1_el = document.querySelector(
      "[data-answer='" + random_position_1 + "']"
    );
    position_1_el.innerHTML = replaceCommaWithAndInString(
      data[random_correct_index]["Artistic Director"]
    );

    //Load correct answer onto page
    let position_2_el = document.querySelector(
      "[data-answer='" + random_position_2 + "']"
    );
    position_2_el.innerHTML = replaceCommaWithAndInString(
      data[random_incorrect_index_1]["Artistic Director"]
    );

    //Load correct answer onto page
    let position_3_el = document.querySelector(
      "[data-answer='" + random_position_3 + "']"
    );
    position_3_el.innerHTML = replaceCommaWithAndInString(
      data[random_incorrect_index_2]["Artistic Director"]
    );

    check_answer();
    function check_answer() {
      let result = document.querySelector("[data-result]");
      const buttons = document.querySelectorAll("button");

      buttons.forEach((button) => {
        button.addEventListener("click", function () {
          if (button.attributes["data-answer"].value == random_position_1) {
            result.innerHTML = "✅ You did it!";

            if (data[random_correct_index]["Mission Statement"]) {
              let mission = document.querySelector("[data-mission]");
              mission.classList.add("show");
              mission.innerHTML =
                "<span style='text-decoration: underline;'>Mission Statement</span>" +
                data[random_correct_index]["Mission Statement"];
            }
          } else {
            console.log("Incorrect");
            result.innerHTML = "Nope. Try again!";
          }
        });
      });
    }
  }
}

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

function getRandomIntegerExcluding(max, exclude) {
  const excludedNumbers = Array.isArray(exclude) ? exclude : [exclude];
  let randomInteger;
  do {
    randomInteger = Math.floor(Math.random() * max); // You can adjust the range as needed
  } while (excludedNumbers.includes(randomInteger));

  return randomInteger;
}

replaceCommaWithAndInString("Hello,World");
function replaceCommaWithAndInString(string) {
  if (string.indexOf(",") > -1) {
    let array, new_string;
    array = string.split(",");
    console.log(array);
    array.splice(1, 0, "and");
    console.log(array);
    new_string = array.join(" ");
    console.log(new_string);
    return new_string;
  } else return string;
}
