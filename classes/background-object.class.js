class BackgroundObject extends MovableObject {
  constructor(imagepath, x, y) {
    super().loadImage(imagepath);
    this.x = x;
    this.y = y;
    this.height = 480;
    this.width = 720;
  }
}
