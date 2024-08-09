class Chicken extends MovableObject {
  x = Math.random() * 4000 + 200;
  y = 320;
  height = 120;
  width = 100;
  speed = 1 + Math.random() * 1;
  health = 20;
  dmg = 20;
  otherDirection = false;
  deathHandled = false;

  offset = {
    top: 0,
    bottom: 0,
    left: 80,
    right: 80,
  };

  IMAGES_WALKING = [
    "img/3_enemies_chicken/chicken_normal/1_walk/1_w.png",
    "img/3_enemies_chicken/chicken_normal/1_walk/2_w.png",
    "img/3_enemies_chicken/chicken_normal/1_walk/3_w.png",
    "img/3_enemies_chicken/chicken_normal/1_walk/2_w.png",
  ];

  IMAGES_DEAD = ["img/3_enemies_chicken/chicken_normal/2_dead/dead.png"];

  constructor() {
    super().loadImage(this.IMAGES_WALKING[0]);
    this.loadAllImages();
    this.animate();
  }

  /**
   * Load all chicken images.
   */
  loadAllImages() {
    this.loadImages(this.IMAGES_WALKING);
    this.loadImages(this.IMAGES_DEAD);
  }

  /**
   * Animates the chicken, handling movement and death.
   */
  animate() {
    this.setStoppableInterval(
      this.handleAnimation.bind(this),
      "ChickenInterval",
      1000 / 24
    );
  }

  /**
   * Handles the animation and movement logic for the chicken.
   */
  handleAnimation() {
    if (this.isDead()) {
      this.handleDeath();
    } else {
      this.handleMovement();
      this.playAnimation(this.IMAGES_WALKING);
    }
  }

  /**
   * Handles the death animation and removal of the chicken.
   */
  handleDeath() {
    if (!this.deathHandled) {
      this.playAnimation(this.IMAGES_DEAD);
      this.deathHandled = true;

      // Remove chicken after 0.5 seconds and add score
      setTimeout(() => {
        this.removeEntity(this);
        addScore(100);
      }, 500);
    }
  }

  /**
   * Handles the movement logic based on boundaries and direction.
   */
  handleMovement() {
    if (this.x >= this.level_end_x) {
      this.otherDirection = false; // Change direction at end of level
    } else if (this.x <= this.level_start_x + 500) {
      this.otherDirection = true; // Change direction at start of level
    }

    this.otherDirection ? this.moveRight() : this.moveLeft();
  }
}
