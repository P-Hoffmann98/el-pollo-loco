class Cloud extends MovableObject {
  x = -300;
  y = 50;
  height = 250;
  width = 500;
  speed = 0.2;

  constructor() {
    super();
    this.loadImage("img/5_background/layers/4_clouds/1.png");
    this.moveRight(this.speed);
  }
}
