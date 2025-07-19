localStorage.clear();

async function fetchData(categoryValue, difficultyValue) {
  const URL = `https://opentdb.com/api.php?amount=10&category=${categoryValue}&difficulty=${difficultyValue}&type=multiple`;
  try {
    const response = await fetch(URL);
    const data = await response.json();
    const questions = data.results;

    localStorage.setItem("questions", JSON.stringify(questions));
    return questions;
  } catch (error) {
    console.error(error);
  }
}

const categorySelectorEl = document.getElementById("category");
const difficultySelectorEl = document.getElementById("difficulty");
const startEl = document.querySelector("button");
const activeBtn = document.querySelector(".start-active");

categorySelectorEl.addEventListener("change", makeButtonActive);
difficultySelectorEl.addEventListener("change", makeButtonActive);

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
  const categoryValue = categorySelectorEl.value;
  const difficultyValue = difficultySelectorEl.value;

  fetchData(categoryValue, difficultyValue);

  setTimeout(() => {
    window.location.href = "quiz.html";
  }, 2000);
}
