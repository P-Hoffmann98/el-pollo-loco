let canvas;
let world;
let keyboard = new Keyboard();

let endbossDead = false;
let characterDead = false;

const IMAGES_GAME_OVER = [
  "img/9_intro_outro_screens/game_over/1.png",
  "img/9_intro_outro_screens/game_over/2.png",
  "img/9_intro_outro_screens/game_over/3.png",
  "img/9_intro_outro_screens/game_over/4.png",
];

window.addEventListener("keydown", handleKeyDown);
window.addEventListener("keyup", handleKeyUp);

document.addEventListener("DOMContentLoaded", setupEventListeners);

/**
 * Handles keydown events and updates the keyboard state.
 * @param {KeyboardEvent} event - The keydown event.
 */
function handleKeyDown(event) {
  switch (event.keyCode) {
    case 40: // Down arrow
      keyboard.DOWN = true;
      break;
    case 39: // Right arrow
      keyboard.RIGHT = true;
      break;
    case 38: // Up arrow
      keyboard.UP = true;
      break;
    case 37: // Left arrow
      keyboard.LEFT = true;
      break;
    case 32: // Space
      keyboard.SPACE = true;
      break;
    case 68: // D key
      keyboard.D = true;
      break;
  }
}

/**
 * Handles keyup events and updates the keyboard state.
 * @param {KeyboardEvent} event - The keyup event.
 */
function handleKeyUp(event) {
  switch (event.keyCode) {
    case 40:
      keyboard.DOWN = false;
      break;
    case 39:
      keyboard.RIGHT = false;
      break;
    case 38:
      keyboard.UP = false;
      break;
    case 37:
      keyboard.LEFT = false;
      break;
    case 32:
      keyboard.SPACE = false;
      break;
    case 68:
      keyboard.D = false;
      break;
  }
}

/**
 * Sets up event listeners for touch controls and other UI elements.
 */
function setupEventListeners() {
  setupTouchControls();
  document
    .getElementById("restart-button")
    .addEventListener("click", resetGame);
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      world.isPaused ? resume() : pause();
    }
  });
}

/**
 * Sets up touch controls for mobile devices.
 */
function setupTouchControls() {
  const controls = [
    { id: "mobile-arrow-left", key: "LEFT" },
    { id: "mobile-arrow-right", key: "RIGHT" },
    { id: "mobile-arrow-up", key: "UP" },
    { id: "mobile-salsa", key: "D" },
  ];

  controls.forEach(({ id, key }) => {
    document.getElementById(id).addEventListener("touchstart", () => {
      keyboard[key] = true;
    });
    document.getElementById(id).addEventListener("touchend", () => {
      keyboard[key] = false;
    });
  });
}

/**
 * Resets the game to its initial state.
 */
function resetGame() {
  world.clearCanvas();
  if (world) world.clear();
  level1.ensureChickenSpacing();
  level1.ensureCoinSpacing();
  level1.ensureSalsaBottleSpacing();
  world = new World(canvas, keyboard, level1);
  document.getElementById("score").innerText = "";
  document.getElementById("gameoverscreen").style.display = "none";
}

/**
 * Initializes the game.
 */
function init() {
  canvas = document.getElementById("canvas");
  world = new World(canvas, keyboard, level1);
}

window.onload = init;

/**
 * Returns a random integer between min and max (inclusive).
 * @param {number} min - The minimum value.
 * @param {number} max - The maximum value.
 * @returns {number} A random integer.
 */
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * Checks if the character is dead and handles game over.
 */
function checkCharacterDead() {
  if (!characterDead && world.character && world.character.isDead()) {
    pepe_dead_sound.play();
    handleGameOver();
    characterDead = true;
  }
}

/**
 * Handles the game win scenario.
 */
function handleGameWin() {
  const gameOverScreen = document.getElementById("gameoverscreen");
  const score = document.getElementById("score");
  gameOverScreen.src = "img/other_imgs/score.png";
  gameOverScreen.style.display = "block";
  score.innerHTML = `${world.score}`;
  muteAllSounds();
  win_sound.play();
  world.stopAllIntervals();
}

/**
 * Handles the game over scenario.
 */
function handleGameOver() {
  const gameOverScreen = document.getElementById("gameoverscreen");
  clearLevelEntities();
  gameOverScreen.src = `img/9_intro_outro_screens/game_over/${getRandomInt(
    1,
    4
  )}.png`;
  muteAllSounds();
  fail_sound.play();
  gameOverScreen.style.display = "block";
  setTimeout(() => {
    world.stopAllIntervals();
    document.getElementById("startButton").style.cursor = "pointer";
    document.getElementById("startButton").disabled = false;
  }, 1000);
}

/**
 * Clears all entities in the level (enemies, salsa bottles, coins).
 */
function clearLevelEntities() {
  world.level.enemies = [];
  world.level.salsabottles = [];
  world.level.coins = [];
}

/**
 * Adds a score to the world score.
 * @param {number} score - The score to add.
 */
function addScore(score) {
  world.score += score;
}

/**
 * Enters fullscreen mode for the game canvas.
 */
function fullscreen() {
  const fullscreenElement = document.getElementById("canvas-fullscreen");
  enterFullscreen(fullscreenElement);
}

/**
 * Requests fullscreen mode for the given element.
 * @param {HTMLElement} element - The element to display in fullscreen.
 */
function enterFullscreen(element) {
  if (element.requestFullscreen) {
    element.requestFullscreen();
  } else if (element.msRequestFullscreen) {
    element.msRequestFullscreen();
  } else if (element.webkitRequestFullscreen) {
    element.webkitRequestFullscreen();
  }
}

/**
 * Exits fullscreen mode.
 */
function exitFullscreen() {
  if (document.exitFullscreen) {
    document.exitFullscreen();
  } else if (document.webkitExitFullscreen) {
    document.webkitExitFullscreen();
  }
}

/**
 * Pauses the game and updates the UI.
 */
function pause() {
  world.pauseGame();
  updatePauseButton("img/other_imgs/resume.png", resume);
}

/**
 * Resumes the game and updates the UI.
 */
function resume() {
  world.resumeGame();
  updatePauseButton("img/other_imgs/pause.png", pause);
}

/**
 * Updates the pause button's image and click handler.
 * @param {string} imgSrc - The new image source for the button.
 * @param {Function} onClick - The new click handler for the button.
 */
function updatePauseButton(imgSrc, onClick) {
  const pauseButton = document.getElementById("pause-img");
  pauseButton.src = imgSrc;
  document.getElementById("pause-button").onclick = onClick;
}
