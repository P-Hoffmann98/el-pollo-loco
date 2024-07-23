class Babychicken extends MovableObject {
  x = Math.random() * 4000 + 200;
  y = 370;

  height = 70;
  width = 60;

  speed = 0.5 + Math.random() * 2.5;

  health = 20;
  dmg = 10;

  IMAGES_WALKING = [
    "img/3_enemies_chicken/chicken_small/1_walk/1_w.png",
    "img/3_enemies_chicken/chicken_small/1_walk/2_w.png",
    "img/3_enemies_chicken/chicken_small/1_walk/3_w.png",
  ];
  IMAGES_DEAD = ["img/3_enemies_chicken/chicken_small/2_dead/dead.png"];

  otherDirection = false;
  world;

  constructor() {
    super().loadImage(this.IMAGES_WALKING[0]);
    this.loadImages(this.IMAGES_WALKING);
    this.animate();
  }

  animate() {
    // Use a flag to track if animation is already playing
    let deathAnimated = false;

    setInterval(() => {
      if (this.isDead()) {
        if (!deathAnimated) {
          this.playAnimation(this.IMAGES_DEAD);
          deathAnimated = true; // Mark animation as playing
        }
        // Optionally, handle stopping movement or other logic here
      } else {
        deathAnimated = false; // Reset animation flag

        // Update direction based on boundaries
        if (this.x >= this.level_end_x) {
          this.otherDirection = false; // Change direction at end of level
        } else if (this.x <= this.level_start_x + 500) {
          this.otherDirection = true; // Change direction at start of level
        }

        // Move the chicken based on direction
        if (this.otherDirection) {
          this.moveRight();
        } else {
          this.moveLeft();
        }

        // Play walking animation
        this.playAnimation(this.IMAGES_WALKING);
      }
    }, 1000 / 30); // 30 frames per second
  }
}
