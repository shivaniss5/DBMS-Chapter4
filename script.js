const questions = [["Which join matches tuples using equal values for all common attributes and keeps one copy of each common column?", ["Natural join", "Full outer join", "Cross join", "Right outer join"], 0], ["Which SQL construct specifies exactly which columns should be equated in a join?", ["USING", "GROUP BY", "HAVING", "DEFAULT"], 0], ["Which outer join keeps all tuples from the left relation?", ["Right outer join", "Left outer join", "Full outer join", "Natural join"], 1], ["What does COMMIT WORK do?", ["Undoes all updates", "Makes transaction updates permanent", "Creates an index", "Revokes privileges"], 1], ["Which constraint specifies a predicate that every tuple must satisfy?", ["UNIQUE", "NOT NULL", "CHECK", "INDEX"], 2], ["What does referential integrity ensure?", ["Every table has an index", "Referenced values exist in the corresponding referenced relation", "All values are unique", "Every transaction is read-only"], 1], ["Which SQL type represents a period of time?", ["DATE", "TIME", "INTERVAL", "CLOB"], 2], ["What is the purpose of an index?", ["To delete duplicate rows", "To efficiently find tuples with a specified attribute value", "To create a role", "To define an assertion"], 1], ["Which statement is used to confer authorization?", ["REVOKE", "CHECK", "GRANT", "COMMIT"], 2], ["Which privilege allows deletion of tuples?", ["INSERT", "UPDATE", "DELETE", "SELECT"], 2]];
let current = 0;
let answers = Array(questions.length).fill(null);
let score = 0;

const sections = document.querySelectorAll('.section');
const navButtons = document.querySelectorAll('.nav-btn');

function showSection(id) {
  sections.forEach(section => section.classList.toggle('active', section.id === id));
  navButtons.forEach(button => button.classList.toggle('active', button.dataset.target === id));
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

navButtons.forEach(button => {
  button.addEventListener('click', () => showSection(button.dataset.target));
});

const qNum = document.getElementById('question-number');
const scoreLive = document.getElementById('score-live');
const questionEl = document.getElementById('question');
const optionsEl = document.getElementById('options');
const feedback = document.getElementById('feedback');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');
const result = document.getElementById('result');
const restartBtn = document.getElementById('restartBtn');

function renderQuestion() {
  const q = questions[current];
  qNum.textContent = `Question ${current + 1} of ${questions.length}`;
  scoreLive.textContent = `Score: ${score}`;
  questionEl.textContent = q[0];
  optionsEl.innerHTML = '';
  feedback.textContent = '';

  q[1].forEach((option, i) => {
    const button = document.createElement('button');
    button.className = 'option';
    button.textContent = `${String.fromCharCode(65 + i)}. ${option}`;

    if (answers[current] !== null) {
      button.disabled = true;
      if (i === q[2]) button.classList.add('correct');
      if (i === answers[current] && i !== q[2]) button.classList.add('wrong');
    }

    button.addEventListener('click', () => chooseAnswer(i));
    optionsEl.appendChild(button);
  });

  if (answers[current] !== null) {
    feedback.textContent =
      answers[current] === q[2]
        ? 'Correct!'
        : `Wrong. Correct answer: ${String.fromCharCode(65 + q[2])}. ${q[1][q[2]]}`;
  }

  prevBtn.disabled = current === 0;
  nextBtn.textContent = current === questions.length - 1 ? 'Finish Quiz' : 'Next';
}

function chooseAnswer(index) {
  if (answers[current] !== null) return;

  answers[current] = index;

  if (index === questions[current][2]) {
    score++;
  }

  renderQuestion();
}

prevBtn.addEventListener('click', () => {
  if (current > 0) {
    current--;
    renderQuestion();
  }
});

nextBtn.addEventListener('click', () => {
  if (current < questions.length - 1) {
    current++;
    renderQuestion();
  } else {
    result.classList.remove('hidden');
    result.textContent = `Quiz complete! Your score is ${score} / ${questions.length}.`;
    restartBtn.classList.remove('hidden');
  }
});

restartBtn.addEventListener('click', () => {
  current = 0;
  answers = Array(questions.length).fill(null);
  score = 0;
  result.classList.add('hidden');
  restartBtn.classList.add('hidden');
  renderQuestion();
});

document.getElementById('continueBtn').addEventListener('click', () => showSection('definitions'));

renderQuestion();
showSection('home');
