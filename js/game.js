let canvas;
let world;
let keyboard = new Keyboard();

let endbossdead = false;
let characterdead = false;

let IMAGES_GAME_OVER = [
  "img/9_intro_outro_screens/game_over/1.png",
  "img/9_intro_outro_screens/game_over/2.png",
  "img/9_intro_outro_screens/game_over/3.png",
  "img/9_intro_outro_screens/game_over/4.png",
];

window.addEventListener("keydown", (key) => {
  if (key.keyCode == 40) {
    keyboard.DOWN = true;
  }
  if (key.keyCode == 39) {
    keyboard.RIGHT = true;
  }
  if (key.keyCode == 38) {
    keyboard.UP = true;
  }
  if (key.keyCode == 37) {
    keyboard.LEFT = true;
  }
  if (key.keyCode == 32) {
    keyboard.SPACE = true;
  }
  if (key.keyCode == 68) {
    keyboard.D = true;
  }
});

window.addEventListener("keyup", (key) => {
  if (key.keyCode == 40) {
    keyboard.DOWN = false;
  }
  if (key.keyCode == 39) {
    keyboard.RIGHT = false;
  }
  if (key.keyCode == 38) {
    keyboard.UP = false;
  }
  if (key.keyCode == 37) {
    keyboard.LEFT = false;
  }
  if (key.keyCode == 32) {
    keyboard.SPACE = false;
  }
  if (key.keyCode == 68) {
    keyboard.D = false;
  }
});

/**
 * Initializes the game.
 * @constructor
 */
function init() {
  canvas = document.getElementById("canvas");
  world = null;
  world = new World(canvas, keyboard);
  console.log(world);
}

/**
 * Returns a random number in between the min and max.
 * @constructor
 * @param {string} min - The smallest number.
 * @param {string} max - The biggest number.
 */
function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * Checks if the Character is dead.
 * @constructor
 */
function checkCharacterDead() {
  if (!characterdead) {
    if (world.character && world.character.isDead()) {
      pepe_dead_sound.play();
      console.log("Character has died");
      handleGameOver();
      characterdead = true;
    }
  }
}

function handleGameWin() {
  console.log("Your Score:", world.score);

  const gameOverScreen = document.getElementById("gameoverscreen");
  const score = document.getElementById("score");
  gameOverScreen.src = "img/other_imgs/score.png";
  gameOverScreen.style.display = "block";
  score.textContent = world.score;
  win_sound.play();
  world.stopAllIntervals();
}

/**
 * Splices all enemies and adds the randomized Game Over overlay.
 * @constructor
 */
function handleGameOver() {
  console.log("Your Score:", world.score);

  const gameOverScreen = document.getElementById("gameoverscreen");
  world.level.enemies.splice(0, world.level.enemies.length);
  world.level.salsabottles.splice(0, world.level.salsabottles.length);
  world.level.coins.splice(0, world.level.coins.length);
  gameOverScreen.src = `img/9_intro_outro_screens/game_over/${getRandomInt(
    1,
    4
  )}.png`;
  fail_sound.play();
  gameOverScreen.style.display = "block";
  setTimeout(() => {
    world.stopAllIntervals();
    document.getElementById("startButton").style.cursor = "pointer";
    document.getElementById("startButton").disabled = false;
  }, 1000);
}

function addScore(score) {
  world.score += score;
}
