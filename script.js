const wordList = ['ROSE', 'LILY', 'IRIS', 'TULIP', 'DAISY', 'PEONY', 'ORCHID', 'SUNFLOWER', 'DAFFODIL', 'MARIGOLD', 'LAVENDER', 'CHRYSANTHEMUM'];

let guessedLetters = [];
let displayedWord = '';
let wrongGuesses = 0;
let startDisplay = '';
let maxGuesses = 6;
let display = "";



function startGame(level) {
  guessedLetters = [];
  wrongGuesses = 0;

  selectedWord = getRandomWord(level);
  console.log('Selected Word:', selectedWord);
  document.getElementById('difficultySelection').style.display = 'none';
  document.getElementById('gameDisplay').classList.remove('d-none');
  document.getElementById('gameDisplay').classList.add('d-block');
  updateDisplay();
  updateDifficultyDisplay(level)

}




function getRandomWord(level) {
  let filteredWords = wordList.filter(word => {
    if (level === 'easy') return word.length === 4
    if (level === 'medium') return word.length === 5
    if (level === 'hard') return word.length > 5
  })
  return filteredWords[Math.floor(Math.random() * filteredWords.length)]

}

function updateDifficultyDisplay(level) {
  let difficultyBox = document.getElementById('difficultyBox')
  difficultyBox.classList.remove('easy', 'medium', 'hard')

  if (level === 'easy') {
    difficultyBox.textContent = 'Difficulty: Easy'
    difficultyBox.classList.add('easy')
  } else if (level === 'medium') {
    difficultyBox.textContent = 'Difficulty: Medium'
    difficultyBox.classList.add('medium')
  } else if (level === 'hard') {
    difficultyBox.textContent = 'Difficulty: Hard'
    difficultyBox.classList.add('hard')
  }
}


function guessLetter() {
  let inputField = document.getElementById('letterInput');
  let guessedLetter = inputField.value.toUpperCase();

  if (!isCharLetter(guessedLetter)) {
    alert('Please enter a letter A-Z');
    inputField.value = '';
    return;
  }

  
}


function isCharLetter(char) {
    return /^[a-z]$/i.test(char);
  }
  
function updateDisplay() {

  for (let i = 0; i < selectedWord.length; i++) {

    let letter = selectedWord.charAt(i);

    if (guessedLetters.includes(letter)) {
      display += letter + " ";
    } else {
      display += "_ ";
    }

  }
}