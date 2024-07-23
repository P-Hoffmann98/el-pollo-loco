let theme_sound = new Audio("./audio/music.mp3");
let walking_sound = new Audio("./audio/walking.mp3");
let clucking_sound = new Audio("./audio/chicken.mp3");

theme_sound.volume = 0.1;
clucking_sound.volume = 0.02;

document.addEventListener("DOMContentLoaded", () => {
  let musicToggleButton = document.getElementById("music_toggle");
  let soundToggleButton = document.getElementById("sound_toggle");

  let isMusicOn = true;
  let isSoundOn = true;

  musicToggleButton.addEventListener("click", () => {
    isMusicOn = !isMusicOn;

    if (isMusicOn) {
      musicToggleButton.textContent = "Turn Music Off";
      theme_sound.volume = 0.1; // Restore volume to the desired level
    } else {
      musicToggleButton.textContent = "Turn Music On";
      theme_sound.volume = 0; // Mute the theme sound
    }
  });

  soundToggleButton.addEventListener("click", () => {
    isSoundOn = !isSoundOn;

    if (isSoundOn) {
      soundToggleButton.textContent = "Turn Sound Off";
      walking_sound.volume = 1; // Restore volume to the desired level
      clucking_sound.volume = 0.02; // Restore volume to the desired level
    } else {
      soundToggleButton.textContent = "Turn Sound On";
      walking_sound.volume = 0; // Mute the walking sound
      clucking_sound.volume = 0; // Mute the clucking sound
    }
  });
});
