const questions = JSON.parse(localStorage.getItem("questions"));
const questionEl = document.querySelector(".question");
const optionsEl = document.querySelector(".options");
const nextBtn = document.querySelector(".next");

nextBtn.addEventListener("click", showNextQuestion);

let question = 0;
renderQuestion(question);
updateQuestionCount();

function showNextQuestion() {
  if (question >= 10) {
    return;
  } else {
    question++;
    renderQuestion(question);
  }
}

function renderQuestion(index) {
  const data = questions[index];
  if (data) {
    const question = data.question;
    const correctAnswer = data.correct_answer;
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

  let userAnswer = "123";

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
    });
  });
}

function updateQuestionCount() {
  const quizHead = document.querySelector(".question-count");
  let questionCount = 1;
  nextBtn.addEventListener("click", () => {
    if (questionCount >= 10) {
      return;
    } else {
      questionCount++;
      quizHead.innerHTML = `
        Question ${questionCount} of 10
      `;
    }
  });
}
