class MovableObject extends DrawableObject {
  otherDirection = false;
  speedY = 1;
  gravitation = 2;

  health;
  dmg;
  lastHitTime;
  hitCooldown = 500; // CD period in MS 0.5

  level_start_x = -150;
  level_end_x = 5000;

  constructor(world) {
    super();
    this.world = world; // Initialize world reference
  }
  applyGravity() {
    setInterval(() => {
      if (this.isAboveGround() || this.speedY > 0) {
        this.y -= this.speedY;
        this.speedY -= this.gravitation;
      }
    }, 1000 / 25);
  }

  isAboveGround() {
    if (this instanceof ThrowableObject) {
      //Throwable Objects just fall forever
      return true;
    } else {
      return this.y < 135;
    }
  }

  isColliding(mo) {
    return (
      this.x + this.width > mo.x &&
      this.y + this.height > mo.y &&
      this.x < mo.x + mo.width &&
      this.y < mo.y + mo.height
    );
  }

  isHit(dmg) {
    this.health -= dmg;
    if (this.health < 0) {
      this.health = 0;
    } else {
      this.lastHit = new Date().getTime();
    }
  }

  collects(object) {
    this.salsaMeter += object;
  }

  isHurt() {
    let timepassed = new Date().getTime() - this.lastHit;
    timepassed = timepassed / 1000;
    return timepassed < 1;
  }

  isDead() {
    return this.health == 0;
  }

  playAnimation(images) {
    let i = this.currentImage % images.length;
    let path = images[i];
    this.img = this.imageCache[path];
    this.currentImage++;
  }

  moveRight() {
    this.x += this.speed;
  }

  moveLeft() {
    this.x -= this.speed;
  }

  jump() {
    this.speedY = 25;
  }
}
