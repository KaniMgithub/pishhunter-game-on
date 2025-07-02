let currentQuestion = 0;
let score = 0;

async function loadQuestions() {
  const res = await fetch('data/questions.json');
  window.questions = await res.json();
  showQuestion();
}

function showQuestion() {
  const q = questions[currentQuestion];
  document.getElementById('question').innerText = q.question;

  const choicesDiv = document.getElementById('choices');
  choicesDiv.innerHTML = '';

  q.choices.forEach((choice, index) => {
    const btn = document.createElement('div');
    btn.classList.add('choice');
    btn.innerText = choice;
    btn.onclick = () => checkAnswer(index, q.correct);
    choicesDiv.appendChild(btn);
  });
}

function checkAnswer(selected, correct) {
  const choices = document.querySelectorAll('.choice');
  choices.forEach((choice, idx) => {
    choice.classList.remove('correct', 'wrong');
    if (idx === correct) choice.classList.add('correct');
    if (idx === selected && idx !== correct) choice.classList.add('wrong');
  });

  if (selected === correct) score++;
  document.getElementById('nextBtn').style.display = 'block';
}

function nextQuestion() {
  currentQuestion++;
  document.getElementById('nextBtn').style.display = 'none';

  if (currentQuestion < questions.length) {
    showQuestion();
  } else {
    document.getElementById('questionBox').innerHTML = `<h2>Your Awareness Score: ${score}/${questions.length}</h2>`;
    document.getElementById('scoreBox').innerHTML = score >= 4
      ? "🧠 Good job! You think like a Red Teamer!"
      : "⚠️ You need more awareness. Try again!";
  }
}

window.onload = loadQuestions;


