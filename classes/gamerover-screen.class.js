class GameoverScreen extends MovableObject {
  constructor() {
    let randomNum = getRandomInt(1, 4);
    super().loadImage(`img/9_intro_outro_screens/game_over/${randomNum}.png`);
    this.x = 0;
    this.y = 0;
    this.height = 480;
    this.width = 720;
  }
}
