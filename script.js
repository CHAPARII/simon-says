const colorButtons = document.querySelectorAll(".color-button");
const startButton = document.getElementById("start-btn");
const levelDisplay = document.getElementById("level");

let sequence = [];
let playerSequence = [];
let level = 0;
let isPlayerTurn = false;

// Generate a random color
function getRandomColor() {
  const colors = ["green", "red", "yellow", "blue"];
  return colors[Math.floor(Math.random() * colors.length)];
}

// Play the sequence
function playSequence() {
  isPlayerTurn = false;
  playerSequence = [];
  let delay = 0;

  sequence.forEach((color, index) => {
    setTimeout(() => {
      activateButton(color);
    }, delay);
    delay += 600;
  });

  setTimeout(() => {
    isPlayerTurn = true;
  }, delay);
}

// Activate a button for the sequence
function activateButton(color) {
  const button = document.getElementById(color);
  button.classList.add("active");
  setTimeout(() => button.classList.remove("active"), 300);
}

// Check the player's input
function checkPlayerInput() {
  const currentIndex = playerSequence.length - 1;

  if (playerSequence[currentIndex] !== sequence[currentIndex]) {
    alert(`Game Over! You reached level ${level}`);
    resetGame();
    return;
  }

  // Check if the player completed the sequence
  if (playerSequence.length === sequence.length) {
    setTimeout(() => {
      nextLevel();
    }, 800);
  }
}

// Advance to the next level
function nextLevel() {
  level++;
  levelDisplay.textContent = `Level: ${level}`;
  sequence.push(getRandomColor());
  playSequence();
}

// Handle button clicks
colorButtons.forEach((button) => {
  button.addEventListener("click", () => {
    if (!isPlayerTurn) return;

    const color = button.id;
    playerSequence.push(color);
    activateButton(color);
    checkPlayerInput();
  });
});

// Start the game
function startGame() {
  level = 1;
  sequence = [getRandomColor()];
  levelDisplay.textContent = `Level: ${level}`;
  startButton.style.display = "none";
  playSequence();
}

// Reset the game
function resetGame() {
  level = 0;
  sequence = [];
  playerSequence = [];
  isPlayerTurn = false;
  startButton.style.display = "block";
  levelDisplay.textContent = "Level: 1";
}

// Start button event listener
startButton.addEventListener("click", startGame);
