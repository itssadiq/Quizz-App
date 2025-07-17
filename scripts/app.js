// const link = "https://opentdb.com/api_config.php";

// const generalKnowledge = "9";

// const computerScience = "18";

// const history = "23";

// const sports = "21";

// async function fetchData() {
//   const URL = `https://opentdb.com/api.php?amount=10&category=${sports}&difficulty=medium&type=multiple`;
//   try {
//     const response = await fetch(URL);
//     const data = await response.json();
//     console.log(data.results);
//   } catch (error) {
//     console.error(error);
//   }
// }

// fetchData();

const categorySelectorEl = document.getElementById("category");
const difficultySelectorEl = document.getElementById("difficulty");
const startEl = document.querySelector("button");
const activeBtn = document.querySelector(".start-active");

function makeButtonActive() {
  const categoryValue = categorySelectorEl.value;
  const difficultyValue = difficultySelectorEl.value;

  if (categoryValue && difficultyValue) {
    startEl.classList.remove("start");
    startEl.classList.add("start-active");
    startEl.addEventListener("click", operation);
  } else {
    startEl.classList.remove("start-active");
    startEl.classList.add("start");
    startEl.removeEventListener("click", operation);
  }
}

function operation() {
  window.location.href = "quiz.html";
}

categorySelectorEl.addEventListener("change", makeButtonActive);
difficultySelectorEl.addEventListener("change", makeButtonActive);
