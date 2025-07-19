const questions = JSON.parse(localStorage.getItem("questions"));
const questionEl = document.querySelector(".question");
const optionsEl = document.querySelector(".options");
const nextBtn = document.querySelector(".next");
const quizHead = document.querySelector(".question-count");
const categoryEl = document.querySelector(".category");
const difficultyEl = document.querySelector(".difficulty");
const timerEl = document.querySelector(".timer");

let timer = 180;
function updateTimer() {
  let minutes = Math.floor(timer / 60);
  let seconds = timer % 60;

  if (minutes < 10) {
    minutes = "0" + minutes;
  }
  if (seconds < 10) {
    seconds = "0" + seconds;
  }

  timerEl.innerHTML = `${minutes}:${seconds}`;

  if (timer > 0) {
    timer--;
  } else {
    Swal.fire({
      position: "center",
      icon: "success",
      title: "Time's up! Quiz ended.",
      showConfirmButton: false,
      timer: 1500,
    });
    setTimeout(() => {
      clearInterval(timerInterval);
      window.location.href = "result.html";
    }, 800);
  }
}
const timerInterval = setInterval(updateTimer, 1000);
updateTimer();

let { category, difficulty } = questions[0];
const difficultyCapitalized =
  difficulty.charAt(0).toUpperCase() + difficulty.slice(1);

if (category == "Science: Computers") {
  category = "Computer Science";
}

localStorage.setItem("category", JSON.stringify(category));
localStorage.setItem("difficulty", JSON.stringify(difficultyCapitalized));

categoryEl.innerHTML = `Category: ${category}`;
difficultyEl.innerHTML = `Difficulty: ${difficultyCapitalized}`;

const result = {
  right: 0,
  wrong: 0,
};
let correctAnswer = "";
let userAnswer = "";

let question = 0;
renderQuestion(question);

function evaluateandShowNextQuestion() {
  if (question >= 10) {
    return;
  } else {
    if (userAnswer == correctAnswer) {
      result.right++;
    } else {
      result.wrong++;
    }
    localStorage.setItem("result", JSON.stringify(result));
    question++;
    updateQuestionCountandNextButton(question);
    renderQuestion(question);
  }
}

function renderQuestion(index) {
  const data = questions[index];
  if (data) {
    const question = data.question;
    correctAnswer = data.correct_answer;

    const answers = data.incorrect_answers.slice(0);
    const options = ["A", "B", "C", "D"];
    answers.push(correctAnswer);
    answers.sort();

    let questionHTML = `<p class="question">${question}</p>`;
    let optionsHTML = "";
    answers.forEach((ans, index) => {
      const html = `
    <p class="option"><span>${options[index]}</span> ${ans}</p>
    `;
      optionsHTML += html;
    });

    questionEl.innerHTML = questionHTML;
    optionsEl.innerHTML = optionsHTML;

    pickAnswer();
  }
}

function pickAnswer() {
  const answersEl = document.querySelectorAll(".option");

  nextBtn.classList.add("next");
  nextBtn.classList.remove("next-active");
  nextBtn.removeEventListener("click", evaluateandShowNextQuestion);

  answersEl.forEach((element) => {
    element.addEventListener("click", () => {
      answersEl.forEach((el) => {
        el.classList.remove("option-active");
        el.childNodes[0].classList.remove("span-active");
      });
      element.classList.add("option-active");
      element.childNodes[0].classList.add("span-active");
      const elementValue = element.innerHTML;
      userAnswer = elementValue.replace(/<span[^>]*>.*?<\/span>/, "").trim();

      nextBtn.classList.remove("next");
      nextBtn.classList.add("next-active");
      nextBtn.addEventListener("click", evaluateandShowNextQuestion);
    });
  });
}

function updateQuestionCountandNextButton(count) {
  if (count >= 10) {
    return;
  } else {
    count++;
    quizHead.innerHTML = `
      Question ${count} of 10
      `;
    if (count > 9) {
      nextBtn.innerHTML = "See results";
      nextBtn.removeEventListener("click", evaluateandShowNextQuestion);
      nextBtn.addEventListener("click", showResults);
    }
  }
}

function showResults() {
  window.location.href = "result.html";
}
