class ThrowableObject extends MovableObject {
  IMAGES_THROWN = [
    "img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png",
    "img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png",
    "img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png",
    "img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png",
  ];

  constructor(x, y) {
    super().loadImage(this.IMAGES_THROWN[0]);
    this.loadImages(this.IMAGES_THROWN);
    this.x = x;
    this.y = y;
    this.height = 100;
    this.width = 100;
    this.throw();
  }

  throw() {
    this.speedY = 5;
    this.applyGravity();
    setInterval(() => {
      this.x += 15;
    }, 25);
    setInterval(() => {
      this.playAnimation(this.IMAGES_THROWN);
    }, 1000 / 30);
  }
}
