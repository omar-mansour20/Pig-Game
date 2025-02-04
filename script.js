'use strict';

// DOM Element Selectors
// Player sections
const elementPlayer0 = document.querySelector('.player--0');
const elementPlayer1 = document.querySelector('.player--1');

// Score displays
const elementScore0 = document.querySelector('#score--0'); 
const elementScore1 = document.querySelector('#score--1'); 
const elementCurrent0 = document.querySelector('#current--0'); 
const elementCurrent1 = document.querySelector('#current--1');  

// Game control buttons
const btnNew = document.querySelector('.btn--new'); 
const btnRoll = document.querySelector('.btn--roll'); 
const btnHold = document.querySelector('.btn--hold'); 

// Dice image element
const imgDice = document.querySelector('.dice');

// Game State Variables
let score = [0, 0]; 
let current = 0; //
let activePlayer = 0; 
let playing = true; 

/**
 * Initializes/resets the game to starting state
 * - Resets all scores to 0
 * - Hides dice
 * - Removes winner styling
 * - Sets player 0 as active
 */
function init() {
  activePlayer = 0;
  score = [0, 0];
  current = 0;
  playing = true;

  // Reset UI elements
  imgDice.classList.add('hidden');
  elementCurrent0.textContent = 0;
  elementCurrent1.textContent = 0;
  elementScore0.textContent = 0;
  elementScore1.textContent = 0;

  // Reset player styles
  document.querySelector('.player--0').classList.remove('player--winner');
  document.querySelector('.player--1').classList.remove('player--winner');
  elementPlayer0.classList.toggle('player--active');
  elementPlayer1.classList.toggle('player--active');
}

// Initialize game on load
init();

/**
 * Switches active player
 * - Toggles active player styling
 * - Resets current score
 * - Updates active player index
 */
function switchPlayer() {
  elementPlayer0.classList.toggle('player--active');
  elementPlayer1.classList.toggle('player--active');
  current = 0;
  document.querySelector(`#current--${activePlayer}`).textContent = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
}

// Roll Dice Button Handler
btnRoll.addEventListener('click', function () {
  if (playing) {
    // Generate random dice roll and update dice image
    let randomDice = Math.trunc(Math.random() * 6) + 1;
    imgDice.classList.remove('hidden');
    imgDice.src = `dice-${randomDice}.png`;

    // Handle dice roll outcome
    if (randomDice !== 1) {
      // Add dice value to current score
      current += randomDice;
      document.querySelector(`#current--${activePlayer}`).textContent = current;
    } else {
      // Switch to next player if roll is 1
      switchPlayer();
    }
  }
});

// Hold Button Handler
btnHold.addEventListener('click', function () {
  if (playing) {
    // Add current score to active player's total score
    score[activePlayer] += current;
    document.querySelector(`#score--${activePlayer}`).textContent =
      score[activePlayer];

    // Check for winner (score >= 20)
    if (score[activePlayer] >= 20) {
      // End game and display winner
      imgDice.classList.add('hidden');
      playing = false;
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
    } else {
      // Switch to next player if no winner
      switchPlayer();
    }
  }
});

// New Game Button Handler - Reset game state
btnNew.addEventListener('click', init);
