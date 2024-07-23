class SalsaBottle extends MovableObject {
  x = Math.random() * 4000 + 500;
  y = 320;

  height = 100;
  width = 80;
  world;

  constructor() {
    let randomNumber = Math.floor(Math.random() * 2) + 1;
    super().loadImage(
      `img/6_salsa_bottle/${randomNumber}_salsa_bottle_on_ground.png`
    );
  }
}
