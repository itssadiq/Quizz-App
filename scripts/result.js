const result = JSON.parse(localStorage.getItem("result"));
const right = result.right;
const resultEl = document.querySelector(".result");
const tryButton = document.querySelector(".try");

resultEl.innerHTML = `${right}/10`;
tryButton.addEventListener("click", () => {
  window.location.href = "index.html";
});
