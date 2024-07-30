class MovableObject extends DrawableObject {
  otherDirection = false;
  speedY = 1;
  gravitation = 2;
  intervals = [];

  health;
  dmg;
  lastHitTime;
  hitCooldown = 500; // CD period in MS 0.5

  level_start_x = -150;
  level_end_x = 5000;

  /**
   * Saves Intervals with ther Name and ID in an Array.
   * @constructor
   * @param {string} callback - What the Interval is filled with.
   * @param {string} intervalName - The Name of the interval.
   * @param {string} time - The repeat time for the interval.
   */
  setStoppableInterval(callback, intervalName, time) {
    let intervalId = setInterval(callback, time);
    this.intervals.push({ name: intervalName, id: intervalId });
  }

  /**
   * Removes an Entity of the level.enemies array.
   * @constructor
   * @param {string} entity - The enemy that needs to be spliced.
   */
  removeEntity(entity) {
    let index = world.level.enemies.indexOf(entity);
    world.level.enemies.splice(index, 1);
  }

  /**
   * Applies Gravity.
   * @constructor
   */
  applyGravity() {
    setInterval(() => {
      if (this.isAboveGround() || this.speedY > 0) {
        this.y -= this.speedY;
        this.speedY -= this.gravitation;
      }
    }, 1000 / 25);
  }

  /**
   * If somethings above the y of 135 its above the ground.
   * @constructor
   */
  isAboveGround() {
    if (this instanceof ThrowableObject) {
      //Throwable Objects just fall forever
      return true;
    } else {
      return this.y < 135;
    }
  }

  /**
   * Something is colliding if the outer borders of the hitbox touch.
   * @constructor
   * @param {string} mo - Any movable object.
   */
  isColliding(mo) {
    return (
      this.x + this.width > mo.x &&
      this.y + this.height > mo.y &&
      this.x < mo.x + mo.width &&
      this.y < mo.y + mo.height
    );
  }

  /**
   * Something is hit and gets damaged.
   * @constructor
   * @param {string} dmg - The amount of damage the entity gets.
   */
  isHit(dmg) {
    this.health -= dmg;
    if (this.health < 0) {
      this.health = 0;
    } else {
      this.lastHit = new Date().getTime();
    }
  }

  /**
   * Something got hurt recently.
   * @constructor
   */
  isHurt() {
    let timepassed = new Date().getTime() - this.lastHit;
    timepassed = timepassed / 1000;
    return timepassed < 1;
  }

  /**
   * Something died.
   * @constructor
   */
  isDead() {
    return this.health == 0;
  }

  /**
   * Showing a set of images in an order.
   * @constructor
   * @param {string} images - The array of images.
   */
  playAnimation(images) {
    let i = this.currentImage % images.length;
    let path = images[i];
    this.img = this.imageCache[path];
    this.currentImage++;
  }

  /**
   * Moves something to the right.
   * @constructor
   */
  moveRight() {
    this.x += this.speed;
  }

  /**
   * Moves something to the left.
   * @constructor
   */
  moveLeft() {
    this.x -= this.speed;
  }

  /**
   * Makes the character jump.
   * @constructor
   */
  jump() {
    this.speedY = 25;
    jump_sound.play();
  }
}
