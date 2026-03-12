const wordList = [
  "ROSE",
  "LILY",
  "IRIS",
  "TULIP",
  "DAISY",
  "PEONY",
  "ORCHID",
  "SUNFLOWER",
  "DAFFODIL",
  "MARIGOLD",
  "LAVENDER",
  "CHRYSANTHEMUM",
];

let guessedLetters = [];
let displayedWord = "";
let wrongGuesses = 0;
let startDisplay = "";
let maxGuesses = 5;
let display = "";
let gameActive = false;
let selectedWord = "";

function startGame(level) {
  guessedLetters = [];
  wrongGuesses = 0;

  selectedWord = getRandomWord(level);
  console.log("Selected Word:", selectedWord);
  document.getElementById("difficultySelection").style.display = "none";
  document.getElementById("gameDisplay").classList.remove("d-none");
  document.getElementById("gameDisplay").classList.add("d-block");
  document.getElementById("message").textContent = "";
  updateDisplay();
  updateDifficultyDisplay(level);
  updateFlowerImage();
  gameActive = true;
}

function getRandomWord(level) {
  let filteredWords = wordList.filter((word) => {
    if (level === "easy") return word.length === 4;
    if (level === "medium") return word.length === 5;
    if (level === "hard") return word.length > 5;
  });
  return filteredWords[Math.floor(Math.random() * filteredWords.length)];
}

function updateDifficultyDisplay(level) {
  let difficultyBox = document.getElementById("difficultyBox");
  difficultyBox.classList.remove("easy", "medium", "hard");

  if (level === "easy") {
    difficultyBox.textContent = "Difficulty: Easy";
    difficultyBox.classList.add("easy");
  } else if (level === "medium") {
    difficultyBox.textContent = "Difficulty: Medium";
    difficultyBox.classList.add("medium");
  } else if (level === "hard") {
    difficultyBox.textContent = "Difficulty: Hard";
    difficultyBox.classList.add("hard");
  }
}

function updateFlowerImage() {
  let flower = document.getElementById("flower");
  let imgNumber = Math.min(5, Math.max(0, wrongGuesses));
  imgNumber = Math.round((wrongGuesses / maxGuesses) * 5);
  flower.src = `flower${5 - imgNumber}.png`;
}

function guessLetter() {
  if (!gameActive) return;
  const inputField = document.getElementById("letterInput");
  const guessedLetter = inputField.value.toUpperCase();
  inputField.value = "";

  if (!isCharLetter(guessedLetter)) {
    alert("Please enter a letter A-Z");
    return;
  }

  if (guessedLetters.includes(guessedLetter)) {
    alert("You already guessed that letter!");
    return;
  }

  guessedLetters.push(guessedLetter);

  if (!selectedWord.includes(guessedLetter)) {
    wrongGuesses++;
  }

  updateDisplay();
  document.getElementById("wrongLetters").textContent =
    `Wrong Guesses: ${wrongGuesses}`;
  updateFlowerImage();
  checkWinLose();
}

function updateDisplay() {
  display = "";

  for (let i = 0; i < selectedWord.length; i++) {
    let letter = selectedWord.charAt(i);
    if (guessedLetters.includes(letter)) {
      display += letter + " ";
    } else {
      display += "_ ";
    }
  }

  document.getElementById("wordDisplay").textContent = display;
}

function isCharLetter(char) {
  return /^[a-z]$/i.test(char);
}

function checkWinLose() {
  const message = document.getElementById("message");
  if (!display.includes("_")) {
    message.textContent = "CONGRATULATIONS! You guessed it!";
    gameActive = false;
  } else if (wrongGuesses >= maxGuesses) {
    message.textContent = `YOU LOST! The word was: ${selectedWord}`;
    gameActive = false;
  }
}

function restartGame() {
  guessedLetters = [];
  wrongGuesses = 0;
  selectedWord = "";
  display = "";
  gameActive = false;

  document.getElementById("letterInput").value = "";
  document.getElementById("wordDisplay").textContent = "";
  document.getElementById("wrongLetters").textContent = "Wrong Guesses: 0";
  document.getElementById("message").textContent = "";

  document.getElementById("gameDisplay").classList.remove("d-block");
  document.getElementById("gameDisplay").classList.add("d-none");

  document.getElementById("difficultySelection").style.display = "block";

  document.getElementById("flower").src = "flower5.png";
}

document.getElementById("letterInput").addEventListener("keypress", function (e) {
  if (e.key === "Enter") {
    guessLetter();
  }
});