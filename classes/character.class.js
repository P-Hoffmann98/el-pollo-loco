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
  lastMovement = Date.now();
  deathHandled = 0;

  offset = {
    top: 120,
    bottom: 0,
    left: 40,
    right: 40,
  };

  level_start_x = -150; // Assuming this is a value you want to set
  level_end_x = 5000; // Assuming this is a value you want to set

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
    "img/2_character_pepe/5_dead/D-51.png",
    "img/2_character_pepe/5_dead/D-52.png",
    "img/2_character_pepe/5_dead/D-53.png",
    "img/2_character_pepe/5_dead/D-54.png",
    "img/2_character_pepe/5_dead/D-55.png",
    "img/2_character_pepe/5_dead/D-56.png",
    "img/2_character_pepe/5_dead/D-57.png",
  ];

  IMAGES_IDLE = [
    "img/2_character_pepe/1_idle/idle/I-1.png",
    "img/2_character_pepe/1_idle/idle/I-2.png",
    "img/2_character_pepe/1_idle/idle/I-3.png",
    "img/2_character_pepe/1_idle/idle/I-4.png",
    "img/2_character_pepe/1_idle/idle/I-5.png",
    "img/2_character_pepe/1_idle/idle/I-6.png",
    "img/2_character_pepe/1_idle/idle/I-7.png",
    "img/2_character_pepe/1_idle/idle/I-8.png",
    "img/2_character_pepe/1_idle/idle/I-9.png",
    "img/2_character_pepe/1_idle/idle/I-10.png",
  ];

  IMAGES_LONG_IDLE = [
    "img/2_character_pepe/1_idle/long_idle/I-11.png",
    "img/2_character_pepe/1_idle/long_idle/I-12.png",
    "img/2_character_pepe/1_idle/long_idle/I-13.png",
    "img/2_character_pepe/1_idle/long_idle/I-14.png",
    "img/2_character_pepe/1_idle/long_idle/I-15.png",
    "img/2_character_pepe/1_idle/long_idle/I-16.png",
    "img/2_character_pepe/1_idle/long_idle/I-17.png",
    "img/2_character_pepe/1_idle/long_idle/I-18.png",
    "img/2_character_pepe/1_idle/long_idle/I-19.png",
    "img/2_character_pepe/1_idle/long_idle/I-20.png",
  ];

  constructor(world) {
    super().loadImage(this.IMAGES_WALKING[0]);
    this.world = world;
    this.keyboard = world.keyboard;
    this.loadAllImages();
    this.applyGravity();
    this.animate();
  }

  /**
   * Load all character images.
   */
  loadAllImages() {
    this.loadImages(this.IMAGES_WALKING);
    this.loadImages(this.IMAGES_JUMPING);
    this.loadImages(this.IMAGES_DEAD);
    this.loadImages(this.IMAGES_HURT);
    this.loadImages(this.IMAGES_IDLE);
    this.loadImages(this.IMAGES_LONG_IDLE);
  }

  /**
   * Update the character based on keyboard input.
   */
  update() {
    if (!this.keyboard) {
      return;
    }
  }

  /**
   * Makes Character collect and count salsa bottles.
   * @param {number} amount - The amount of salsa picked up.
   */
  collectsSalsa(amount) {
    this.salsaMeter += amount;
  }

  /**
   * Makes Character collect and count coins.
   * @param {number} amount - The amount of coins picked up.
   */
  collectsCoins(amount) {
    this.coin_count += amount;
    addScore(250);
  }

  /**
   * Animates character movement and actions.
   */
  animate() {
    this.setStoppableInterval(
      this.handleMovement.bind(this),
      "CharacterAnimateInterval1",
      1000 / 30
    );
    this.setStoppableInterval(
      this.handleAnimations.bind(this),
      "CharacterAnimateInterval2",
      1000 / 10
    );
  }

  /**
   * Handle character movement based on keyboard input.
   */
  handleMovement() {
    walking_sound.pause();
    this.characterMoveRight();
    this.characterMoveLeft();
    this.characterMoveUp();
    this.world.camera_x = -this.x + 150;
  }

  /**
   * Handle character animations based on state.
   */
  handleAnimations() {
    const currentTime = Date.now();

    if (this.isDead()) {
      this.handleDeath();
    } else if (this.isAboveGround()) {
      this.playAnimation(this.IMAGES_JUMPING);
    } else if (this.isHurt()) {
      this.playAnimation(this.IMAGES_HURT);
    } else if (currentTime - this.lastMovement > 5000) {
      this.playAnimation(this.IMAGES_LONG_IDLE);
      pepe_snoring_sound.play();
    } else if (currentTime - this.lastMovement > 1000) {
      this.playAnimation(this.IMAGES_IDLE);
    } else {
      this.handleWalkingAnimation();
    }
  }

  /**
   * Handle death animation and actions.
   */
  handleDeath() {
    if (this.deathHandled < 8) {
      this.playAnimation(this.IMAGES_DEAD);
      this.deathHandled++;
      this.y += 35;
    }
  }

  /**
   * Handle walking animation.
   */
  handleWalkingAnimation() {
    if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
      this.playAnimation(this.IMAGES_WALKING);
      pepe_snoring_sound.pause(); // Ensure snoring sound is paused when walking
    }
  }

  /**
   * Move the character up if UP key is pressed.
   */
  characterMoveUp() {
    if (this.world.keyboard.UP && !this.isAboveGround()) {
      this.jump();
      this.lastMovement = Date.now();
    }
  }

  /**
   * Move the character right if RIGHT key is pressed.
   */
  characterMoveRight() {
    if (this.world.keyboard.RIGHT && this.x < this.level_end_x) {
      this.moveRight();
      this.otherDirection = false;
      this.lastMovement = Date.now();
      if (!this.isAboveGround()) {
        walking_sound.play();
      }
    }
  }

  /**
   * Move the character left if LEFT key is pressed.
   */
  characterMoveLeft() {
    if (this.world.keyboard.LEFT && this.x > this.level_start_x) {
      this.moveLeft();
      this.otherDirection = true;
      this.lastMovement = Date.now();
      if (!this.isAboveGround()) {
        walking_sound.play();
      }
    }
  }
}
