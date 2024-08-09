class Endboss extends MovableObject {
  x = 4500;
  y = 150;
  height = 300;
  width = 250;

  health = 500;
  dmg = 100;
  speed = 1;

  offset = {
    top: 0,
    bottom: 0,
    left: 100,
    right: 100,
  };

  otherDirection = false;
  deathHandled = 0;
  deathActionsDone = false;

  IMAGES_WALKING = [
    "img/4_enemie_boss_chicken/1_walk/G1.png",
    "img/4_enemie_boss_chicken/1_walk/G2.png",
    "img/4_enemie_boss_chicken/1_walk/G3.png",
    "img/4_enemie_boss_chicken/1_walk/G4.png",
  ];

  IMAGES_ALERT = [
    "img/4_enemie_boss_chicken/2_alert/G5.png",
    "img/4_enemie_boss_chicken/2_alert/G6.png",
    "img/4_enemie_boss_chicken/2_alert/G7.png",
    "img/4_enemie_boss_chicken/2_alert/G8.png",
    "img/4_enemie_boss_chicken/2_alert/G9.png",
    "img/4_enemie_boss_chicken/2_alert/G10.png",
    "img/4_enemie_boss_chicken/2_alert/G11.png",
    "img/4_enemie_boss_chicken/2_alert/G12.png",
  ];

  IMAGES_ATTACK = [
    "img/4_enemie_boss_chicken/3_attack/G13.png",
    "img/4_enemie_boss_chicken/3_attack/G14.png",
    "img/4_enemie_boss_chicken/3_attack/G15.png",
    "img/4_enemie_boss_chicken/3_attack/G16.png",
    "img/4_enemie_boss_chicken/3_attack/G17.png",
    "img/4_enemie_boss_chicken/3_attack/G18.png",
    "img/4_enemie_boss_chicken/3_attack/G19.png",
    "img/4_enemie_boss_chicken/3_attack/G20.png",
  ];

  IMAGES_HURT = [
    "img/4_enemie_boss_chicken/4_hurt/G21.png",
    "img/4_enemie_boss_chicken/4_hurt/G22.png",
    "img/4_enemie_boss_chicken/4_hurt/G23.png",
  ];

  IMAGES_DEAD = [
    "img/4_enemie_boss_chicken/5_dead/G24.png",
    "img/4_enemie_boss_chicken/5_dead/G25.png",
    "img/4_enemie_boss_chicken/5_dead/G26.png",
  ];

  constructor() {
    super();
    this.loadInitialImage();
    this.loadAllImages();
    this.animate();
  }

  /**
   * Loads the initial image of the Endboss.
   */
  loadInitialImage() {
    this.loadImage(this.IMAGES_WALKING[0]);
  }

  /**
   * Loads all images for the Endboss.
   */
  loadAllImages() {
    this.loadImages(this.IMAGES_WALKING);
    this.loadImages(this.IMAGES_ALERT);
    this.loadImages(this.IMAGES_ATTACK);
    this.loadImages(this.IMAGES_HURT);
    this.loadImages(this.IMAGES_DEAD);
  }

  /**
   * Animates the Endboss and handles different states.
   */
  animate() {
    this.setStoppableInterval(
      this.handleAnimation.bind(this),
      "BossInterval",
      1000 / 10
    );
  }

  /**
   * Handles the animation logic based on the Endboss's state.
   */
  handleAnimation() {
    if (this.isDead()) {
      this.handleDeath();
    } else if (this.isHurt()) {
      this.playAnimation(this.IMAGES_HURT);
    } else {
      // this.handleEndbossActions();
      this.playAnimation(this.IMAGES_WALKING);
      this.moveLeft();
    }
  }

  /**
   * Handles the Endboss's actions, playing ALERT or ATTACK animations when the character is in range.
   */
  // handleEndbossActions() {
  //   const distanceToCharacter = this.x - this.world.character.x;

  //   if (distanceToCharacter < 500 && distanceToCharacter > 200) {
  //     this.playAnimation(this.IMAGES_ALERT);
  //   } else if (distanceToCharacter <= 200) {
  //     this.playAnimation(this.IMAGES_ATTACK);
  //   }
  // }

  /**
   * Handles the death animation and actions for the Endboss.
   */
  handleDeath() {
    if (this.deathHandled < 5) {
      this.playAnimation(this.IMAGES_DEAD);
      this.deathHandled++;
    } else if (!this.deathActionsDone) {
      this.deathActionsDone = true;
      setTimeout(() => {
        addScore(500);
        handleGameWin();
      }, 500);
    }
  }
}
