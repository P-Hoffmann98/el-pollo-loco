function showStartScreen() {
  let canvas = document.getElementById("canvas");
  let ctx = canvas.getContext("2d");
  let img = new Image();
  img.src = "img/9_intro_outro_screens/start/startscreen_1.png"; // Replace with your image path

  img.onload = () => {
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
  };
}

/**
 * Declaring the canvas, clearing the canvas hiding the start button and initilazes the game.
 * @constructor
 */
function startGame() {
  // Clear the canvas and hide the start button
  let canvas = document.getElementById("canvas");
  let ctx = canvas.getContext("2d");
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  document.getElementById("startButton").style.display = "none";

  // Initialize the game
  init();
}
