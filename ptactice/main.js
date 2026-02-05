// --- elements ---
const quizContainer = document.getElementById("quizContainer");
const questionEl = document.getElementById("questionContainer");
const optionsEl = document.getElementById("optionsContainer");
const nextBtn = document.getElementById("nextQuestion");
const scoreContainer = document.getElementById("scoreContainer");
const scoreText = document.getElementById("score");
const restartBtn = document.getElementById("restartButton");

// --- questions ---
const quizData = [
  {
    question: "Which array method adds an element to the end of an array?",
    options: ["push()", "pop()", "shift()", "unshift()"],
    answer: 0,
  },
  {
    question: "Which keyword declares a variable in javascript?",
    options: ["for", "if", "now", "let"],
    answer: 3,
  },
  {
    question: "What does 'const' do in javascript?",
    options: ["attach css to HTML", "nothing", "Declare variable", "add color"],
    answer: 2,
  },
];

let currentIndex = 0;
let score = 0;
let hasAnswered = false;

function showQuestion() {
  hasAnswered = false;
  nextBtn.disabled = true;

  const current = quizData[currentIndex];

  questionEl.textContent = current.question;
  optionsEl.innerHTML = "";

  current.options.forEach((text, i) => {
    const btn = document.createElement("button");
    btn.textContent = text;

    btn.addEventListener("click", () => handleAnswer(i));
    optionsEl.appendChild(btn);
  });
}

function handleAnswer(selectedIndex) {
  if (hasAnswered) return;
  hasAnswered = true;

  const current = quizData[currentIndex];
  const isCorrect = selectedIndex === current.answer;

  // mark buttons + disable
  const buttons = optionsEl.querySelectorAll("button");
  buttons.forEach((btn, i) => {
    btn.disabled = true;
    if (i === current.answer) btn.style.border = "2px solid green";
    if (i === selectedIndex && !isCorrect) btn.style.border = "2px solid red";
  });

  if (isCorrect) score++;
  nextBtn.disabled = false;
}

nextBtn.addEventListener("click", () => {
  currentIndex++;

  if (currentIndex < quizData.length) {
    showQuestion();
  } else {
    showResults();
  }
});

function showResults() {
  quizContainer.style.display = "none";
  scoreContainer.style.display = "block";

  scoreText.textContent = `Final Score: ${score} / ${quizData.length}`;
}

restartBtn.addEventListener("click", () => {
  currentIndex = 0;
  score = 0;
  hasAnswered = false;

  scoreContainer.style.display = "none";
  quizContainer.style.display = "block";

  showQuestion();
});

showQuestion();
