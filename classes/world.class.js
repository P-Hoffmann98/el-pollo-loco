class World {
  character = new Character(this);
  level = level1;
  canvas;
  ctx;
  keyboard;
  camera_x = 0;
  statusBar;
  throwableObjects = [];
  intervals = [];
  score = 0;

  constructor(canvas, keyboard) {
    this.ctx = canvas.getContext("2d");
    this.canvas = canvas;
    this.keyboard = keyboard;
    this.statusBar = [
      new Statusbar(
        [
          "img/7_statusbars/1_statusbar/2_statusbar_health/blue/0.png",
          "img/7_statusbars/1_statusbar/2_statusbar_health/blue/20.png",
          "img/7_statusbars/1_statusbar/2_statusbar_health/blue/40.png",
          "img/7_statusbars/1_statusbar/2_statusbar_health/blue/60.png",
          "img/7_statusbars/1_statusbar/2_statusbar_health/blue/80.png",
          "img/7_statusbars/1_statusbar/2_statusbar_health/blue/100.png",
        ],
        -10,
        100
      ),
      new Statusbar(
        [
          "img/7_statusbars/1_statusbar/1_statusbar_coin/green/0.png",
          "img/7_statusbars/1_statusbar/1_statusbar_coin/green/20.png",
          "img/7_statusbars/1_statusbar/1_statusbar_coin/green/40.png",
          "img/7_statusbars/1_statusbar/1_statusbar_coin/green/60.png",
          "img/7_statusbars/1_statusbar/1_statusbar_coin/green/80.png",
          "img/7_statusbars/1_statusbar/1_statusbar_coin/green/100.png",
        ],
        40,
        0
      ),
      new Statusbar(
        [
          "img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/0.png",
          "img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/20.png",
          "img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/40.png",
          "img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/60.png",
          "img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/80.png",
          "img/7_statusbars/1_statusbar/3_statusbar_bottle/orange/100.png",
        ],
        90,
        0
      ),
    ];

    this.draw();
    this.setWorld();
    this.run();
    this.playThemeSound();
    this.playCluckingSound();
    this.mergeIntervalArrays();
  }

  /**
   * Runs through all the checks while game is played.
   * @constructor
   */
  run() {
    this.setStoppableInterval(
      () => {
        this.checkEnemyCollision();
        this.checkSalsaCollision();
        this.checkCoinCollision();
        this.checkNewThrowedObjects();
        this.checkThrowedObjectsCollision();
        checkCharacterDead();
      },
      "runInterval",
      100
    );
  }

  /**
   * Focus world around character.
   * @constructor
   */
  setWorld() {
    this.character.world = this;
  }

  /**
   * Intervals get gathered in all classes and merged here.
   * @constructor
   */
  mergeIntervalArrays() {
    const characterIntervals = this.character.intervals;
    const enemyIntervals = this.level.enemies.reduce(
      (intervalArray, enemy) => [...intervalArray, ...enemy.intervals],
      []
    );
    this.intervals = [
      ...this.intervals,
      ...characterIntervals,
      ...enemyIntervals,
    ];
  }

  /**
   * Saves Intervals with their Name, ID, callback, interval time, and start time in an Array.
   * @param {Function} callback - What the Interval is filled with.
   * @param {string} intervalName - The Name of the interval.
   * @param {number} time - The repeat time for the interval.
   */
  setStoppableInterval(callback, intervalName, time) {
    let intervalId = setInterval(callback, time);
    let startTime = Date.now();
    this.intervals.push({
      name: intervalName,
      id: intervalId,
      callback: callback,
      time: time,
      startTime: startTime,
      remaining: time,
    });
  }

  /**
   * Stops all Intervals saved in the intervals array.
   */
  stopAllIntervals() {
    this.intervals.forEach((interval) => clearInterval(interval.id));
  }

  /**
   * Pauses all Intervals by clearing them and calculating remaining time.
   */
  pauseAllIntervals() {
    this.intervals.forEach((interval) => {
      let elapsed = Date.now() - interval.startTime;
      interval.remaining = interval.time - (elapsed % interval.time);
      clearInterval(interval.id);
    });
  }

  /**
   * Resumes all Intervals using the remaining time.
   */
  resumeAllIntervals() {
    this.intervals.forEach((interval) => {
      setTimeout(() => {
        interval.callback();
        interval.id = setInterval(interval.callback, interval.time);
        interval.startTime = Date.now();
      }, interval.remaining);
    });
  }

  /**
   * Checks for new throwed objects, creates them and updates the statusbar.
   * @constructor
   */
  checkNewThrowedObjects() {
    if (this.keyboard.D && this.character.salsaMeter > 0) {
      let bottle = new ThrowableObject(
        this,
        this.character,
        this.character.x,
        this.character.y
      );
      this.throwableObjects.push(bottle);
      this.character.salsaMeter -= 1; // Decrease salsa count when a bottle is thrown
      this.statusBar[2].setPercentage(this.character.salsaMeter * 20); // Update the salsa bar
    }
  }

  /**
   * Checks for collisions of throwableobjects and enemies.
   * @constructor
   */
  checkThrowedObjectsCollision() {
    this.level.enemies.forEach((enemy) => {
      this.throwableObjects.forEach((bottle, bottleIndex) => {
        if (bottle.isColliding(enemy)) {
          console.log("bottle hit");
          enemy.isHit(100);
          bottle_break_sound.play();
          this.throwableObjects.splice(bottleIndex, 1); // Remove the bottle after handling the collision
        }
      });
    });
  }

  /**
   * Checks for collisions of character and enemies.
   * @constructor
   */
  checkEnemyCollision() {
    let currentTime = Date.now();
    this.level.enemies.forEach((enemy) => {
      if (
        this.character.isColliding(enemy) &&
        this.character.isAboveGround() &&
        this.character.speedY < 0
      ) {
        this.character.lastHitTime = currentTime;
        this.character.jump();
        enemy.isHit(10);
        console.log("Trigger Collision");
      } else if (this.character.isColliding(enemy)) {
        if (
          currentTime - this.character.lastHitTime >
          this.character.hitCooldown
        ) {
          this.character.isHit(enemy.dmg);
          pepe_dmg_sound.play();
          this.character.lastHitTime = currentTime;
          console.log("Pepe got hit", this.character.health);
          this.statusBar[0].setPercentage(this.character.health);
        } else {
          console.log("CD --> No Hit");
        }
      }
    });
  }

  /**
   * Checks for collisions of character and collectable salsabottles and collects them.
   * @constructor
   */
  checkSalsaCollision() {
    this.level.salsabottles.forEach((bottle, index) => {
      if (this.character.salsaMeter < 5) {
        if (this.character.isColliding(bottle)) {
          this.character.collectsSalsa(1);
          this.level.salsabottles.splice(index, 1); // Remove collected bottle from game
          this.statusBar[2].setPercentage(this.character.salsaMeter * 20); // Fill up that salsa juice
        }
      }
    });
  }

  /**
   * Checks for collisions of character and collectable coins and collects them.
   * @constructor
   */
  checkCoinCollision() {
    this.level.coins.forEach((coin, index) => {
      if (this.character.isColliding(coin)) {
        this.character.collectsCoins(1);
        this.level.coins.splice(index, 1); // Remove collected Coin from game
        this.statusBar[1].setPercentage(this.character.coin_count * 20);
      }
    });
  }

  /**
   * Clears the canvas.
   * @constructor
   */
  clearCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  }

  /**
   * Draws on the canvas.
   * @constructor
   */
  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.translate(this.camera_x, 0);
    this.addObjects(this.level.backgroundObjects);
    this.addObjects(this.level.clouds);
    this.addObjects(this.level.enemies);
    this.addObjects(this.level.salsabottles);
    this.addObjects(this.level.coins);
    this.addObjects([this.character]); // this needs to be an array
    this.addObjects(this.throwableObjects);

    // fixated Statusbars
    this.ctx.translate(-this.camera_x, 0);
    this.addObjects(this.statusBar);
    this.ctx.translate(this.camera_x, 0);

    this.ctx.translate(-this.camera_x, 0);

    // Draw() wird hier durch so oft wie möglich neu aufgerufen
    let self = this;
    requestAnimationFrame(function () {
      self.draw();
    });
  }

  /**
   * Adds Objects to the drawing list.
   * @constructor
   * @param {string} objects - The object to add.
   */
  addObjects(objects) {
    objects.forEach((o) => {
      this.addToMap(o);
    });
  }

  /**
   * Adds Objects to the drawing list.
   * @constructor
   * @param {string} mo - The movableobject to add.
   */
  addToMap(mo) {
    // flip context if otherDirection is true
    if (mo.otherDirection) {
      this.flipImage(mo);
    }
    // draw the image
    mo.draw(this.ctx);
    mo.drawFrame(this.ctx);

    // flip context back
    if (mo.otherDirection) {
      this.flipImageBack(mo);
    }
  }

  /**
   * Flips the image of a movableobject ,if it turns around for example.
   * @constructor
   * @param {string} mo - The movableobject to flip.
   */
  flipImage(mo) {
    this.ctx.save();
    this.ctx.translate(mo.width, 0);
    this.ctx.scale(-1, 1);
    mo.x = mo.x * -1;
  }

  /**
   * Flips the image of a movableobject back, if it turns around for example.
   * @constructor
   * @param {string} mo - The movableobject to flip back.
   */
  flipImageBack(mo) {
    mo.x = mo.x * -1;
    this.ctx.restore();
  }

  /**
   * Plays the theme Song.
   * @constructor
   */
  playThemeSound() {
    this.setStoppableInterval(
      () => {
        theme_sound.play();
      },
      "playThemeSoundInterval",
      100
    ); // start and restart Theme Song after 1 sec
  }

  /**
   * Plays a clucking sound of chickens.
   * @constructor
   */
  playCluckingSound() {
    this.setStoppableInterval(
      () => {
        clucking_sound.play();
      },
      "playCluckingSoundInterval",
      20000
    ); // Plays clucking sound every 20 seconds
  }
}
