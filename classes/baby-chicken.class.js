class Babychicken extends MovableObject {
  x = Math.random() * 4000 + 200;
  y = 370;

  height = 70;
  width = 60;

  speed = 0.5 + Math.random() * 2.5;

  health = 10;
  dmg = 10;

  IMAGES_WALKING = [
    "img/3_enemies_chicken/chicken_small/1_walk/1_w.png",
    "img/3_enemies_chicken/chicken_small/1_walk/2_w.png",
    "img/3_enemies_chicken/chicken_small/1_walk/3_w.png",
  ];
  IMAGES_DEAD = ["img/3_enemies_chicken/chicken_small/2_dead/dead.png"];

  otherDirection = false;

  constructor(world) {
    super(world);
    this.loadImage(this.IMAGES_WALKING[0]);
    this.loadImages(this.IMAGES_WALKING);
    this.loadImages(this.IMAGES_DEAD);
    this.animate();
  }

  /**
   * Animates loaded images.
   * @constructor
   */
  animate() {
    setInterval(() => {
      if (this.isDead()) {
        if (!this.deathHandled) {
          this.playAnimation(this.IMAGES_DEAD);
          this.deathHandled = true; // Mark animation as handled

          // Remove chicken after 0.5 seconds
          setTimeout(() => {
            console.log("chicken dead");
            this.removeEntity(this);
            addScore(50);
          }, 500);
        }
      } else {
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
    }, 1000 / 24); // 30 frames per second
    // this.world.Intervals.push({
    //   name: "babyChickenAnimateInterval",
    //   id: babyChickenAnimateInterval,
    // });
  }
}
