class Coin extends MovableObject {
  x = Math.random() * 4000 + 500;
  y = 100;

  height = 150;
  width = 150;
  world;

  offset = {
    top: 0,
    bottom: 0,
    left: 100,
    right: 100,
  };

  IMAGES_COIN = ["img/8_coin/coin_1.png", "img/8_coin/coin_2.png"];

  constructor() {
    super();
    this.loadImages(this.IMAGES_COIN);
    this.animate();
  }

  /**
   * Animates loaded images.
   * @constructor
   */
  animate() {
    setInterval(() => {
      this.playAnimation(this.IMAGES_COIN);
    }, 1000 / 3);
  }
}
