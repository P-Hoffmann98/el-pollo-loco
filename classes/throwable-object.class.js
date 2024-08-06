class ThrowableObject extends MovableObject {
  IMAGES_THROWN = [
    "img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png",
    "img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png",
    "img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png",
    "img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png",
  ];

  constructor(world, character, x, y) {
    super(world); // Pass world reference to MovableObject
    this.character = character; // Save character reference
    this.loadImage(this.IMAGES_THROWN[0]);
    this.loadImages(this.IMAGES_THROWN);
    this.x = x;
    this.y = y;
    this.height = 100;
    this.width = 100;
    this.throw();
  }

  /**
   * Makes throwableobjects get thrown and plays spin animation.
   * @constructor
   */
  throw() {
    this.speedY = 10;
    throwposition = this.x;
    this.applyGravity();
    // let throwInterval1 =
    setInterval(() => {
      if (!this.character.otherDirection) {
        throwposition += 15;
      } else {
        throwposition -= 15;
      }
    }, 25);
    // this.Intervals.push({ name: "throwInterval1", id: throwInterval1 });

    // let throwInterval2 =
    setInterval(() => {
      this.playAnimation(this.IMAGES_THROWN);
    }, 1000 / 30);
    // this.Intervals.push({ name: "throwInterval2", id: throwInterval2 });
  }
}
