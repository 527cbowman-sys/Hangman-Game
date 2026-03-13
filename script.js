//all possible words to choose from
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

//defining all varibles

let guessedLetters = [];
let displayedWord = "";
let wrongGuesses = 0;
let startDisplay = "";
let maxGuesses = 5;
let display = "";
let gameActive = false;
let selectedWord = "";


//when game starts this happens
function startGame(level) {
  guessedLetters = [];
  wrongGuesses = 0;
//randomly selects a word
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

//if click easy, chooses word with 4 letters, medium 5 letters, hard more than 5 letters
function getRandomWord(level) {
  let filteredWords = wordList.filter((word) => {
    if (level === "easy") return word.length === 4;
    if (level === "medium") return word.length === 5;
    if (level === "hard") return word.length > 5;
  });
  return filteredWords[Math.floor(Math.random() * filteredWords.length)];
}

//based on what they choose the difficulty box changes to show the difficulty
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

//updates the flower image based on how many wrong guesses they have (looses petals)
function updateFlowerImage() {
  let flower = document.getElementById("flower");
  let imgNumber = Math.min(5, Math.max(0, wrongGuesses));
  imgNumber = Math.round((wrongGuesses / maxGuesses) * 5);
  flower.src = `flower${5 - imgNumber}.png`;
}

//when they guess a letter, checks if its valid, if they already guessed it, and if its in the word
function guessLetter() {
  if (!gameActive) return;
  const inputField = document.getElementById("letterInput");
  const guessedLetter = inputField.value.toUpperCase();
  inputField.value = "";

  if (!isCharLetter(guessedLetter)) {
    const message = document.getElementById("message");
    message.textContent = "Please choose a letter A-Z";
    return;  // Exit early to avoid processing invalid input
  }

  const message = document.getElementById("message");
  message.textContent = "";

  if (guessedLetters.includes(guessedLetter)) {
    message.textContent = "You already guessed that letter!";
    return;
  }

  guessedLetters.push(guessedLetter);

  if (!selectedWord.includes(guessedLetter)) {
    wrongGuesses++;
  }

  updateDisplay();
  document.getElementById("wrongLetters").textContent = `Wrong Guesses: ${wrongGuesses}`;
  updateFlowerImage();
  checkWinLose();
}

//updates display of the word with guessed letters and underscores for unguessed letters
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

//checks if input is a single letter
function isCharLetter(char) {
  return /^[a-z]$/i.test(char);
}

//checks if won or lost based on if 5 wrong guesses or not
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

//when click restart button, resets everything and goes back to original page
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

//allows user to press enter to submit their guess instead of clicking the button
document.getElementById("letterInput").addEventListener("keypress", function (e) {
  if (e.key === "Enter") {
    guessLetter();
  }
});