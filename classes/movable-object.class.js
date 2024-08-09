class MovableObject extends DrawableObject {
  otherDirection = false;
  speedY = 1;
  gravitation = 2;
  intervals = [];

  health;
  dmg;
  lastHitTime;
  hitCooldown = 500; // Cooldown period in milliseconds (0.5 seconds)

  level_start_x = -150;
  level_end_x = 5000;

  offset = {
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  };

  /**
   * Sets an interval and stores it in the intervals array, allowing it to be stopped later.
   * @param {Function} callback - The function to execute repeatedly.
   * @param {string} intervalName - The name of the interval.
   * @param {number} time - The repeat time for the interval in milliseconds.
   */
  setStoppableInterval(callback, intervalName, time) {
    const intervalId = setInterval(callback, time);
    const startTime = Date.now();
    this.intervals.push({
      name: intervalName,
      id: intervalId,
      callback: callback,
      time: time,
      startTime: startTime,
      remaining: time,
    });
  }

  /**
   * Removes an entity from the world's enemies array.
   * @param {object} entity - The enemy entity to remove.
   */
  removeEntity(entity) {
    const index = world.level.enemies.indexOf(entity);
    if (index > -1) {
      world.level.enemies.splice(index, 1);
    }
  }

  /**
   * Applies gravity to the object, affecting its vertical position.
   */
  applyGravity() {
    this.setStoppableInterval(
      () => {
        if (this.isAboveGround() || this.speedY > 0) {
          this.y -= this.speedY;
          this.speedY -= this.gravitation;
        }
      },
      "GravityInterval",
      1000 / 25
    );
  }

  /**
   * Checks if the object is above the ground.
   * @returns {boolean} True if the object is above ground, false otherwise.
   */
  isAboveGround() {
    return this instanceof ThrowableObject || this.y < 135;
  }

  /**
   * Checks if this object is colliding with another movable object.
   * @param {object} mo - The other movable object.
   * @returns {boolean} True if the objects are colliding, false otherwise.
   */
  isColliding(mo) {
    return (
      this.x + this.width + this.offset.right > mo.x + mo.offset.left &&
      this.y + this.height + this.offset.bottom > mo.y + mo.offset.top &&
      this.x + this.offset.left < mo.x + mo.width + mo.offset.right &&
      this.y + this.offset.top < mo.y + mo.height + mo.offset.bottom
    );
  }

  /**
   * Inflicts damage on this object.
   * @param {number} dmg - The amount of damage to apply.
   */
  isHit(dmg) {
    this.health -= dmg;
    if (this.health < 0) {
      this.health = 0;
    } else {
      this.lastHitTime = Date.now();
    }
  }

  /**
   * Checks if this object was recently hurt.
   * @returns {boolean} True if the object was hurt within the last second, false otherwise.
   */
  isHurt() {
    const timePassed = (Date.now() - this.lastHitTime) / 1000;
    return timePassed < 1;
  }

  /**
   * Checks if this object is dead.
   * @returns {boolean} True if the object's health is 0, false otherwise.
   */
  isDead() {
    return this.health === 0;
  }

  /**
   * Plays an animation by cycling through a set of images.
   * @param {string[]} images - An array of image paths to cycle through.
   */
  playAnimation(images) {
    const i = this.currentImage % images.length;
    const path = images[i];
    this.img = this.imageCache[path];
    this.currentImage++;
  }

  /**
   * Moves the object to the right.
   */
  moveRight() {
    this.x += this.speed;
  }

  /**
   * Moves the object to the left.
   */
  moveLeft() {
    this.x -= this.speed;
  }

  /**
   * Makes the object jump by setting its vertical speed.
   */
  jump() {
    this.speedY = 25;
    jump_sound.play();
  }
}
