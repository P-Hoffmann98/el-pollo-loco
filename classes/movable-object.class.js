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
   * Saves Intervals with their Name and ID in an Array.
   * @constructor
   * @param {Function} callback - What the Interval is filled with.
   * @param {string} intervalName - The Name of the interval.
   * @param {number} time - The repeat time for the interval.
   */
  setStoppableInterval(callback, intervalName, time) {
    let intervalId = setInterval(callback, time);
    let startTime = Date.now();
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
   * Removes an Entity from the level.enemies array.
   * @constructor
   * @param {object} entity - The enemy that needs to be spliced.
   */
  removeEntity(entity) {
    let index = world.level.enemies.indexOf(entity);
    if (index > -1) {
      world.level.enemies.splice(index, 1);
    }
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
   * Checks if the object is above the ground.
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
   * Checks if the object is colliding with another movable object.
   * @constructor
   * @param {object} mo - Any movable object.
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
   * Inflicts damage to the object.
   * @constructor
   * @param {number} dmg - The amount of damage the entity gets.
   */
  isHit(dmg) {
    this.health -= dmg;
    if (this.health < 0) {
      this.health = 0;
    } else {
      this.lastHitTime = new Date().getTime();
    }
  }

  /**
   * Checks if the object got hurt recently.
   * @constructor
   */
  isHurt() {
    let timePassed = new Date().getTime() - this.lastHitTime;
    timePassed = timePassed / 1000;
    return timePassed < 1;
  }

  /**
   * Checks if the object is dead.
   * @constructor
   */
  isDead() {
    return this.health == 0;
  }

  /**
   * Plays a set of images in order.
   * @constructor
   * @param {string[]} images - The array of images.
   */
  playAnimation(images) {
    let i = this.currentImage % images.length;
    let path = images[i];
    this.img = this.imageCache[path];
    this.currentImage++;
  }

  /**
   * Moves the object to the right.
   * @constructor
   */
  moveRight() {
    this.x += this.speed;
  }

  /**
   * Moves the object to the left.
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
