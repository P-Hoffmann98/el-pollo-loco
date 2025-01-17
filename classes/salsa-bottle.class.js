class SalsaBottle extends MovableObject {
  x = Math.random() * 4000 + 500;
  y = 340;

  height = 100;
  width = 80;
  world;

  offset = {
    top: 0,
    bottom: 0,
    left: 100,
    right: 100,
  };

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
   */
  animate() {
    this.setStoppableInterval(
      this.playAnimation(this.IMAGES_BOTTLE),
      "SalsaBottleAnimateInterval",
      1000 / 24
    );
  }
}
