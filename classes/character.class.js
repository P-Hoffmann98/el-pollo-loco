class Character extends MovableObject {
  x = 0;
  y = 135;

  height = 300;
  width = 150;

  speed = 20;

  health = 100;
  lastHitTime = 0;

  coin_count = 0;
  salsaMeter = 0;
  dmg = 10;

  IMAGES_WALKING = [
    "img/2_character_pepe/2_walk/W-21.png",
    "img/2_character_pepe/2_walk/W-22.png",
    "img/2_character_pepe/2_walk/W-23.png",
    "img/2_character_pepe/2_walk/W-24.png",
    "img/2_character_pepe/2_walk/W-25.png",
    "img/2_character_pepe/2_walk/W-26.png",
  ];

  IMAGES_JUMPING = [
    "img/2_character_pepe/3_jump/J-31.png",
    "img/2_character_pepe/3_jump/J-32.png",
    "img/2_character_pepe/3_jump/J-33.png",
    "img/2_character_pepe/3_jump/J-34.png",
    "img/2_character_pepe/3_jump/J-35.png",
    "img/2_character_pepe/3_jump/J-36.png",
    "img/2_character_pepe/3_jump/J-37.png",
    "img/2_character_pepe/3_jump/J-38.png",
    "img/2_character_pepe/3_jump/J-39.png",
  ];

  IMAGES_HURT = [
    "img/2_character_pepe/4_hurt/H-41.png",
    "img/2_character_pepe/4_hurt/H-42.png",
    "img/2_character_pepe/4_hurt/H-43.png",
  ];

  IMAGES_DEAD = [
    " img/2_character_pepe/5_dead/D-51.png",
    " img/2_character_pepe/5_dead/D-52.png",
    " img/2_character_pepe/5_dead/D-53.png",
    " img/2_character_pepe/5_dead/D-54.png",
    " img/2_character_pepe/5_dead/D-55.png",
    " img/2_character_pepe/5_dead/D-56.png",
    " img/2_character_pepe/5_dead/D-57.png",
  ];

  world;
  gameOverScreenShown = false;
  intervalIds = [];

  constructor() {
    super().loadImage("img/2_character_pepe/2_walk/W-21.png");
    this.keyboard = new Keyboard();
    this.loadImages(this.IMAGES_WALKING);
    this.loadImages(this.IMAGES_JUMPING);
    this.loadImages(this.IMAGES_DEAD);
    this.loadImages(this.IMAGES_HURT);
    this.applyGravity();
    this.animate();
  }

  update() {
    if (!this.keyboard) {
      console.error("Keyboard not initialized");
      return;
    }
  }

  //Adding Collect method for salsa bottles
  collectsSalsa(amount) {
    this.salsaMeter += amount;
    if (this.salsaMeter > 5) {
      this.salsaMeter = 5; // cap the salsa meter at 5
    }
  }

  //Adding Collect method for coins
  collectsCoins(amount) {
    this.coin_count += amount;
    if (this.coin_count > 5) {
      this.coin_count = 5; // cap the salsa meter at 5
    }
  }

  animate() {
    let moveIntervalId = setInterval(() => {
      walking_sound.pause();
      if (this.world.keyboard.RIGHT && this.x < this.level_end_x) {
        this.moveRight();
        this.otherDirection = false;
        if (!this.isAboveGround()) {
          walking_sound.play();
        }
      }
      if (this.world.keyboard.LEFT && this.x > this.level_start_x) {
        this.moveLeft();
        this.otherDirection = true;
        if (!this.isAboveGround()) {
          walking_sound.play();
        }
      }

      if (this.world.keyboard.UP && !this.isAboveGround()) {
        this.jump();
      }
      this.world.camera_x = -this.x + 150;
    }, 1000 / 30);
    this.intervalIds.push(moveIntervalId);

    let animationIntervalId = setInterval(() => {
      if (this.isDead()) {
        this.playAnimation(this.IMAGES_DEAD);
        if (!this.gameOverScreenShown) {
          this.gameOverScreen(); // Call the method correctly
          this.gameOverScreenShown = true; // Set flag to true
        }
      } else if (this.isHurt()) {
        this.playAnimation(this.IMAGES_HURT);
      } else if (this.isAboveGround()) {
        this.playAnimation(this.IMAGES_JUMPING);
      } else {
        if (world.keyboard.RIGHT || world.keyboard.LEFT) {
          this.playAnimation(this.IMAGES_WALKING);
        }
      }
    }, 1000 / 24);
    this.intervalIds.push(animationIntervalId);
  }

  clearAllIntervals() {
    this.intervalIds.forEach((id) => clearInterval(id));
    this.intervalIds = [];
  }

  gameOverScreen() {
    let randomNum = getRandomInt(1, 4);
    world.ctx.clearRect(0, 0, world.canvas.width, world.canvas.height);
    this.clearAllIntervals(); // Clear all intervals
    console.log("Game Over");

    // Display the end screen
    let img = new Image();
    img.src = `img/9_intro_outro_screens/game_over/${randomNum}.png`;

    // When the image is loaded, draw it on the canvas
    img.onload = () => {
      world.ctx.drawImage(img, 0, 0, world.canvas.width, world.canvas.height);
    };
  }
}
