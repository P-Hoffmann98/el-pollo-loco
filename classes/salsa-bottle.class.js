class SalsaBottle extends MovableObject {
  x = Math.random() * 4000 + 500;
  y = 340;

  height = 100;
  width = 80;
  world;

  IMAGES_BOTTLE = [
    "img/6_salsa_bottle/1_salsa_bottle_on_ground.png",
    "img/6_salsa_bottle/2_salsa_bottle_on_ground.png",
  ];

  constructor() {
    super();
    this.loadImages(this.IMAGES_BOTTLE);
    this.animate();
  }
  /**
   * Animates loaded images.
   * @constructor
   */
  animate() {
    setInterval(() => {
      this.playAnimation(this.IMAGES_BOTTLE);
    }, 1000 / 3);
  }
}
