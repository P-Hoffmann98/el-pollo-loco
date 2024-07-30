class Statusbar extends DrawableObject {
  percentage = 100;
  images = [];

  constructor(images, y, p) {
    super();
    this.images = images;
    this.loadImages(this.images);
    this.x = 0;
    this.y = y;
    this.width = 220;
    this.height = 60;
    this.setPercentage(p);
  }

  /**
   * Chooses status bar image based of the percentage.
   * @constructor
   * @param {string} percentage - The percentage.
   */
  setPercentage(percentage) {
    this.percentage = percentage;
    let path = this.resolveImagePath();
    this.img = this.imageCache[path];
  }

  /**
   * Resolves Image Path.
   * @constructor
   */
  resolveImagePath() {
    let index = Math.floor(this.percentage / 20);
    return this.images[index];
  }
}
