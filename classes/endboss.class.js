class Endboss extends MovableObject {
  x = 4500;
  y = 150;
  height = 300;
  width = 250;

  health = 500;
  dmg = 100;

  speed = 1;

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

  otherDirection = false;
  deathHandled = 0;
  deathActionsDone = false; // Flag to ensure actions are done only once

  constructor() {
    super();
    this.loadImage(this.IMAGES_WALKING[0]);
    this.loadImages(this.IMAGES_WALKING);
    this.loadImages(this.IMAGES_ALERT);
    this.loadImages(this.IMAGES_ATTACK);
    this.loadImages(this.IMAGES_HURT);
    this.loadImages(this.IMAGES_DEAD);
    this.animate();
  }

  /**
   * Animates loaded images and removes Endboss if dead.
   * @constructor
   */
  animate() {
    this.setStoppableInterval(
      () => {
        if (this.isDead()) {
          if (this.deathHandled < 5) {
            // Play the death animation 5 times
            this.playAnimation(this.IMAGES_DEAD);
            this.deathHandled++; // Count the animated imgs
          } else if (!this.deathActionsDone) {
            // Ensure actions are done only once
            this.deathActionsDone = true;
            setTimeout(() => {
              console.log("chicken dead");
              addScore(500);
              handleGameWin();
            }, 500);
          }
        } else if (this.isHurt()) {
          this.playAnimation(this.IMAGES_HURT);
        }
        // else if (world.character.x > 4000) {
        //   // get alerted when character comes too close
        //   this.playAnimation(this.IMAGES_ALERT);
        // } else if (world.character.x > 4300) {
        //   // attack if character gets even closer
        //   this.playAnimation(this.IMAGES_ATTACK);
        // }

        // Play walking animation
        //  this.playAnimation(this.IMAGES_WALKING);
      },
      "BossInterval",
      1000 / 10
    );
  }
}
