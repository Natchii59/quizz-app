const cards = document.getElementsByClassName('card');
const cardsElement = document.querySelector('.cards');
const questionElement = document.querySelector('.question');
const button = document.querySelector('button');
const statusGame = document.querySelector('.status');
const scoreElement = document.querySelector('.score');
const mainElement = document.querySelector('main');

let questionIndex = 0;
let responseIndex = null;
let score = 0;
let next = false;

function loadQuestion() {
  scoreElement.textContent = `Votre score: ${score}/${questions.length}`;
  questionElement.textContent = questions[questionIndex].question;

  questions[questionIndex].responses.forEach((q, i) => {
    cardsElement.appendChild(createCard(i + 1, q));
  });
}

function loadCardsEvent() {
  for (let i = 0; i < cards.length; i++) {
    const card = cards.item(i);

    card.addEventListener('click', () => {
      unsetCheckCard();

      const check = document.createElement('div');
      const svg = document.createElement('img');

      svg.setAttribute('src', 'assets/check.svg');
      check.classList.add('card-check');

      check.appendChild(svg);
      card.appendChild(check);
      button.disabled = false;
      responseIndex = i;
    });
  }
}

loadQuestion();
loadCardsEvent();

button.addEventListener('click', () => {
  if (responseIndex !== null) {
    if (next && questionIndex === questions.length - 1) finish();
    else if (next) nextQuestion();
    else validate();
  }
});

function createCard(i, text) {
  const div = document.createElement('div');
  div.classList.add('card');

  const h3 = document.createElement('h3');
  h3.classList.add('card-title');
  h3.textContent = `Réponse n°${i}`;

  const p = document.createElement('p');
  p.textContent = text;

  div.appendChild(h3);
  div.appendChild(p);

  return div;
}

function validate() {
  const card = getCheckCard();
  statusGame.style.display = 'block';

  if (questions[questionIndex].goodResponseIndex === responseIndex) {
    card.classList.add('card-success');
    statusGame.textContent = 'Bonne réponse !';
    score++;
    scoreElement.textContent = `Votre score: ${score}/${questions.length}`;
  } else {
    card.classList.add('card-error');
    statusGame.textContent = 'Mauvaise réponse';

    const goodCard = cards.item(questions[questionIndex].goodResponseIndex);
    goodCard.classList.add('card-success');
  }

  button.textContent = 'Suivant';
  next = true;
}

function nextQuestion() {
  responseIndex = null;
  questionIndex++;
  next = false;
  statusGame.style.display = 'none';
  button.textContent = 'Valider';
  unsetCheckCard();

  while (cards.length > 0) {
    cards.item(cards.length - 1).remove();
  }

  loadQuestion();
  loadCardsEvent();
}

function finish() {
  while (mainElement.childNodes.length > 0) {
    mainElement.childNodes.item(mainElement.childNodes.length - 1).remove();
  }

  const h2 = document.createElement('h2');
  h2.textContent = 'Vous avez fini le jeu';
  mainElement.appendChild(h2);
}

function getCheckCard() {
  for (let i = 0; i < cards.length; i++) {
    const card = cards.item(i);

    const lastChild = card.childNodes.item(card.childNodes.length - 1);

    if (lastChild.className === 'card-check') return card;
  }

  return null;
}

function unsetCheckCard() {
  const cardCheck = getCheckCard();

  if (cardCheck) {
    cardCheck.removeChild(
      cardCheck.childNodes.item(cardCheck.childNodes.length - 1)
    );
  }
}
