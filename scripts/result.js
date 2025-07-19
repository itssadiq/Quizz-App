const result = JSON.parse(localStorage.getItem("result"));
const category = JSON.parse(localStorage.getItem("category"));
const difficulty = JSON.parse(localStorage.getItem("difficulty"));
const right = result.right;
const resultEl = document.querySelector(".result");
const tryButton = document.querySelector(".try");
const categoryEl = document.querySelector(".category");
const difficultyEl = document.querySelector(".difficulty");
const remarksEl = document.querySelector(".remarks");

if (right <= 5) {
  remarksEl.innerHTML = `Better Luck Next Time`;
} else if (right <= 8) {
  remarksEl.innerHTML = `Good Work`;
} else if (right > 8) {
  remarksEl.innerHTML = `Excellent Work`;
}

categoryEl.innerHTML = `${category}`;
difficultyEl.innerHTML = `Difficulty: ${difficulty}`;

resultEl.innerHTML = `${right}/10`;
tryButton.addEventListener("click", () => {
  localStorage.clear();
  window.location.href = "index.html";
});
