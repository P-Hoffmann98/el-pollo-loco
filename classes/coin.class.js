class Coin extends MovableObject {
  x = Math.random() * 4000 + 500;
  y = 100;

  height = 150;
  width = 150;
  world;

  constructor() {
    super().loadImage(`img/8_coin/coin_2.png`);
  }
}
