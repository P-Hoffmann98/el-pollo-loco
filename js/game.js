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

function createNewLevel() {
  return new Level(
    [
      new Endboss(),
      new Chicken(),
      new Chicken(),
      new Chicken(),
      new Chicken(),
      new Chicken(),
      new Chicken(),
      new Chicken(),
      new Chicken(),
      new Chicken(),
      new Chicken(),
      new Babychicken(),
      new Babychicken(),
      new Babychicken(),
      new Babychicken(),
      new Babychicken(),
    ],
    [new Cloud()],
    [
      new BackgroundObject("img/5_background/layers/air.png", -719, 0),
      new BackgroundObject(
        "img/5_background/layers/3_third_layer/1.png",
        -719,
        0
      ),
      new BackgroundObject(
        "img/5_background/layers/2_second_layer/1.png",
        -719,
        0
      ),
      new BackgroundObject(
        "img/5_background/layers/1_first_layer/1.png",
        -719,
        0
      ),
      new BackgroundObject("img/5_background/layers/air.png", 0, 0),
      new BackgroundObject("img/5_background/layers/3_third_layer/2.png", 0, 0),
      new BackgroundObject(
        "img/5_background/layers/2_second_layer/2.png",
        0,
        0
      ),
      new BackgroundObject("img/5_background/layers/1_first_layer/2.png", 0, 0),
      new BackgroundObject("img/5_background/layers/air.png", 719, 0),
      new BackgroundObject(
        "img/5_background/layers/3_third_layer/1.png",
        719,
        0
      ),
      new BackgroundObject(
        "img/5_background/layers/2_second_layer/1.png",
        719,
        0
      ),
      new BackgroundObject(
        "img/5_background/layers/1_first_layer/1.png",
        719,
        0
      ),
      new BackgroundObject("img/5_background/layers/air.png", 719 * 2, 0),
      new BackgroundObject(
        "img/5_background/layers/3_third_layer/2.png",
        719 * 2,
        0
      ),
      new BackgroundObject(
        "img/5_background/layers/2_second_layer/2.png",
        719 * 2,
        0
      ),
      new BackgroundObject(
        "img/5_background/layers/1_first_layer/2.png",
        719 * 2,
        0
      ),
      new BackgroundObject("img/5_background/layers/air.png", 719 * 3, 0),
      new BackgroundObject(
        "img/5_background/layers/3_third_layer/1.png",
        719 * 3,
        0
      ),
      new BackgroundObject(
        "img/5_background/layers/2_second_layer/1.png",
        719 * 3,
        0
      ),
      new BackgroundObject(
        "img/5_background/layers/1_first_layer/1.png",
        719 * 3,
        0
      ),
      new BackgroundObject("img/5_background/layers/air.png", 719 * 4, 0),
      new BackgroundObject(
        "img/5_background/layers/3_third_layer/2.png",
        719 * 4,
        0
      ),
      new BackgroundObject(
        "img/5_background/layers/2_second_layer/2.png",
        719 * 4,
        0
      ),
      new BackgroundObject(
        "img/5_background/layers/1_first_layer/2.png",
        719 * 4,
        0
      ),
      new BackgroundObject("img/5_background/layers/air.png", 719 * 5, 0),
      new BackgroundObject(
        "img/5_background/layers/3_third_layer/1.png",
        719 * 5,
        0
      ),
      new BackgroundObject(
        "img/5_background/layers/2_second_layer/1.png",
        719 * 5,
        0
      ),
      new BackgroundObject(
        "img/5_background/layers/1_first_layer/1.png",
        719 * 5,
        0
      ),
      new BackgroundObject("img/5_background/layers/air.png", 719 * 6, 0),
      new BackgroundObject(
        "img/5_background/layers/3_third_layer/2.png",
        719 * 6,
        0
      ),
      new BackgroundObject(
        "img/5_background/layers/2_second_layer/2.png",
        719 * 6,
        0
      ),
      new BackgroundObject(
        "img/5_background/layers/1_first_layer/2.png",
        719 * 6,
        0
      ),
      new BackgroundObject("img/5_background/layers/air.png", 719 * 7, 0),
      new BackgroundObject(
        "img/5_background/layers/3_third_layer/1.png",
        719 * 7,
        0
      ),
      new BackgroundObject(
        "img/5_background/layers/2_second_layer/1.png",
        719 * 7,
        0
      ),
      new BackgroundObject(
        "img/5_background/layers/1_first_layer/1.png",
        719 * 7,
        0
      ),
      new BackgroundObject("img/5_background/layers/air.png", 719 * 8, 0),
      new BackgroundObject(
        "img/5_background/layers/3_third_layer/2.png",
        719 * 8,
        0
      ),
      new BackgroundObject(
        "img/5_background/layers/2_second_layer/2.png",
        719 * 8,
        0
      ),
      new BackgroundObject(
        "img/5_background/layers/1_first_layer/2.png",
        719 * 8,
        0
      ),
    ],
    [
      new SalsaBottle(),
      new SalsaBottle(),
      new SalsaBottle(),
      new SalsaBottle(),
      new SalsaBottle(),
      new SalsaBottle(),
      new SalsaBottle(),
      new SalsaBottle(),
      new SalsaBottle(),
    ],
    [new Coin(), new Coin(), new Coin(), new Coin(), new Coin()]
  );
}

function resetGame() {
  // Clear the canvas
  canvas.getContext("2d").clearRect(0, 0, canvas.width, canvas.height);

  // Clear existing world
  if (world) {
    world.clear();
  }

  // Recreate the level
  level1 = createNewLevel();

  // Ensure spacing
  level1.ensureChickenSpacing();
  level1.ensureCoinSpacing();
  level1.ensureSalsaBottleSpacing();

  // Reinitialize the world and character
  world = new World(canvas, keyboard, level1);

  // Reset additional elements like score and gameover screen
  document.getElementById("score").innerText = "";
  document.getElementById("gameoverscreen").style.display = "none";
}

document.addEventListener("DOMContentLoaded", () => {
  // For touch devices
  document
    .getElementById("mobile-arrow-left")
    .addEventListener("touchstart", () => {
      keyboard.LEFT = true;
    });
  document
    .getElementById("mobile-arrow-left")
    .addEventListener("touchend", () => {
      keyboard.LEFT = false;
    });

  document
    .getElementById("mobile-arrow-right")
    .addEventListener("touchstart", () => {
      keyboard.RIGHT = true;
    });
  document
    .getElementById("mobile-arrow-right")
    .addEventListener("touchend", () => {
      keyboard.RIGHT = false;
    });

  document
    .getElementById("mobile-arrow-up")
    .addEventListener("touchstart", () => {
      keyboard.UP = true;
    });
  document
    .getElementById("mobile-arrow-up")
    .addEventListener("touchend", () => {
      keyboard.UP = false;
    });

  document.getElementById("mobile-salsa").addEventListener("touchstart", () => {
    keyboard.D = true;
  });
  document.getElementById("mobile-salsa").addEventListener("touchend", () => {
    keyboard.D = false;
  });

  document.getElementById("restart-button").addEventListener("click", () => {
    resetGame();
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      if (world.isPaused) {
        world.resume();
      } else {
        world.pause();
      }
    }
  });
});

/**
 * Initializes the game.
 * @constructor
 */
function init() {
  canvas = document.getElementById("canvas");
  level1 = createNewLevel();
  world = new World(canvas, keyboard, level1);
}

window.onload = () => {
  init();
};

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
      handleGameOver();
      characterdead = true;
    }
  }
}

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
 * Splices all enemies and adds the randomized Game Over overlay.
 * @constructor
 */
function handleGameOver() {
  const gameOverScreen = document.getElementById("gameoverscreen");
  world.level.enemies.splice(0, world.level.enemies.length);
  world.level.salsabottles.splice(0, world.level.salsabottles.length);
  world.level.coins.splice(0, world.level.coins.length);
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

function addScore(score) {
  world.score += score;
}

function fullscreen() {
  let fullscreen = document.getElementById("canvas-fullscreen");
  enterFullscreen(fullscreen);
}

function enterFullscreen(element) {
  if (element.requestFullscreen) {
    element.requestFullscreen();
  } else if (element.msRequestFullscreen) {
    element.msRequestFullscreen();
  } else if (element.webkitRequestFullscreen) {
    element.webkitRequestFullscreen();
  }
}

function exitFullscreen() {
  if (document.exitFullscreen) {
    document.exitFullscreen();
  } else if (document.webkitExitFullscreen) {
    document.webkitExitFullscreen();
  }
}

function pause() {
  world.pauseGame();
  document.getElementById("pause-img").src = "img/other_imgs/resume.png";
  document.getElementById("pause-button").onclick = resume;
}

function resume() {
  world.resumeGame();
  document.getElementById("pause-img").src = "img/other_imgs/pause.png";
  document.getElementById("pause-button").onclick = pause;
}
