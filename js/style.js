document.addEventListener("DOMContentLoaded", () => {
  const board = document.getElementById("game-board");
  const resetButton = document.getElementById("reset-button");

  const cardValues = ["K", "A", "R", "T", "H", "I", "K", "V"];
  let cards = [...cardValues, ...cardValues];
  cards = shuffle(cards);

  let flippedCards = [];
  let matchedPairs = 0;

  function createCard(value) {
    const card = document.createElement("div");
    card.classList.add("card");
    card.dataset.value = value;
    card.addEventListener("click", flipCard);
    return card;
  }

  function setupGame() {
    board.innerHTML = "";
    cards.forEach((value) => {
      board.appendChild(createCard(value));
    });
    flippedCards = [];
    matchedPairs = 0;
  }

  function flipCard() {
    const card = this;
    if (
      flippedCards.length === 2 ||
      card.classList.contains("flipped") ||
      card.classList.contains("match")
    ) {
      return;
    }

    card.classList.add("flipped");
    card.textContent = card.dataset.value;
    flippedCards.push(card);

    if (flippedCards.length === 2) {
      checkMatch();
    }
  }

  function checkMatch() {
    const [card1, card2] = flippedCards;
    if (card1.dataset.value === card2.dataset.value) {
      card1.classList.add("match");
      card2.classList.add("match");
      matchedPairs++;
      if (matchedPairs === cardValues.length) {
        setTimeout(() => alert("You won!"), 100);
      }
    } else {
      setTimeout(() => {
        card1.classList.remove("flipped");
        card2.classList.remove("flipped");
        card1.textContent = "";
        card2.textContent = "";
      }, 1000);
    }
    flippedCards = [];
  }

  function shuffle(array) {
    let currentIndex = array.length,
      randomIndex;
    while (currentIndex !== 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex],
        array[currentIndex],
      ];
    }
    return array;
  }

  resetButton.addEventListener("click", setupGame);

  setupGame();
});
