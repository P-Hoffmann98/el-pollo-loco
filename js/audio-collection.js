let theme_sound = new Audio("audio/music.mp3");
let walking_sound = new Audio("audio/walking.mp3");
let clucking_sound = new Audio("audio/chicken.mp3");
let bottle_break_sound = new Audio("audio/bottle-break.mp3");
let fail_sound = new Audio("audio/fail.mp3");
let pepe_dmg_sound = new Audio("audio/pepe_damage.mp3");
let pepe_dead_sound = new Audio("audio/pepe_dead.mp3");
let pepe_snoring_sound = new Audio("audio/pepe_snoring.mp3");
let win_sound = new Audio("audio/win.mp3");
let jump_sound = new Audio("audio/jump.mp3");

theme_sound.volume = 0.1;
clucking_sound.volume = 0.05;
win_sound.volume = 0.5;
fail_sound.volume = 0.1;
bottle_break_sound.volume = 0.01;
jump_sound.volume = 0.6;
pepe_dead_sound.volume = 0.5;
pepe_dmg_sound.volume = 0.5;
pepe_snoring_sound.volume = 0.2;

jump_sound.playbackRate = 2;

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
      theme_sound.volume = 0; // Mute the music
    }
  });

  soundToggleButton.addEventListener("click", () => {
    isSoundOn = !isSoundOn;

    if (isSoundOn) {
      soundToggleButton.textContent = "Turn Sound Off";
      walking_sound.volume = 1; // Restore volume to the desired level
      clucking_sound.volume = 0.05;
      bottle_break_sound.volume = 0.01;
      jump_sound.volume = 0.6;
      pepe_dead_sound.volume = 0.5;
      pepe_dmg_sound.volume = 0.5;
      pepe_snoring_sound.volume = 0.2;
      win_sound.volume = 0.5;
      fail_sound.volume = 0.1;
    } else {
      soundToggleButton.textContent = "Turn Sound On";
      walking_sound.volume = 0; // Mute the volumes
      clucking_sound.volume = 0;
      bottle_break_sound.volume = 0;
      jump_sound.volume = 0;
      pepe_dead_sound.volume = 0;
      pepe_dmg_sound.volume = 0;
      pepe_snoring_sound.volume = 0;
      win_sound.volume = 0;
      fail_sound.volume = 0;
    }
  });
});

// Function to mute all sounds
function muteAllSounds() {
  theme_sound.volume = 0;
  walking_sound.volume = 0;
  clucking_sound.volume = 0;
  bottle_break_sound.volume = 0;
  pepe_dmg_sound.volume = 0;
  pepe_dead_sound.volume = 0;
  pepe_snoring_sound.volume = 0;
  jump_sound.volume = 0;
}

// Function to unmute all sounds
function unMuteAllSounds() {
  theme_sound.volume = 0.1;
  clucking_sound.volume = 0.05;
  win_sound.volume = 0.5;
  fail_sound.volume = 0.1;
  bottle_break_sound.volume = 0.01;
  jump_sound.volume = 0.6;
  pepe_dead_sound.volume = 0.5;
  pepe_dmg_sound.volume = 0.5;
  pepe_snoring_sound.volume = 0.2;
}
