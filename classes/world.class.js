class World {
  character;
  level = level1;
  canvas;
  ctx;
  keyboard;
  camera_x = 0;
  statusBar;
  throwableObjects = [];
  intervals = [];
  score = 0;
  isPaused = false;
  lastThrowTime = 0;

  constructor(canvas, keyboard, level) {
    this.ctx = canvas.getContext("2d");
    this.canvas = canvas;
    this.keyboard = keyboard;
    this.level = level;
    this.character = new Character(this);
    this.initStatusBar();
    this.initializeWorld();
  }

  /**
   * Initializes the status bars.
   */
  initStatusBar() {
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
  }

  /**
   * Initializes the world and starts the game loop.
   */
  initializeWorld() {
    this.setWorld();
    this.run();
    this.playThemeSound();
    this.mergeIntervalArrays();
    this.draw();
  }

  /**
   * Runs through all the checks while the game is played.
   */
  run() {
    this.setStoppableInterval(this.runGameLoop.bind(this), "runInterval", 100);
  }

  /**
   * The main game loop for running checks.
   */
  runGameLoop() {
    this.checkEnemyCollision();
    this.checkSalsaCollision();
    this.checkCoinCollision();
    this.checkNewThrowedObjects();
    this.checkThrowedObjectsCollision();
    checkCharacterDead();
  }

  /**
   * Pauses the game by stopping all intervals.
   */
  pauseGame() {
    if (!this.isPaused) {
      console.log("Game paused");
      this.isPaused = true;
      this.pauseAllIntervals();
      muteAllSounds();
    }
  }

  /**
   * Resumes the game by restarting all intervals.
   */
  resumeGame() {
    if (this.isPaused) {
      console.log("Game resumed");
      this.isPaused = false;
      this.resumeAllIntervals();
      this.draw(); // Restart the drawing loop
      unMuteAllSounds();
    }
  }

  /**
   * Focuses the world around the character.
   */
  setWorld() {
    this.character.world = this;
  }

  /**
   * Merges intervals from all classes into a single array for management.
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
   * Sets an interval and saves it in the intervals array for later management.
   * @param {Function} callback - The function to execute repeatedly.
   * @param {string} intervalName - The name of the interval.
   * @param {number} time - The repeat time for the interval in milliseconds.
   */
  setStoppableInterval(callback, intervalName, time) {
    const intervalId = setInterval(callback, time);
    const startTime = Date.now();
    this.intervals.push({
      name: intervalName,
      id: intervalId,
      callback: callback,
      time: time,
      startTime: startTime,
      remaining: time,
    });
  }

  clearAllIntervals() {
    this.intervals.forEach((interval) => clearInterval(interval.id));
    this.intervals = []; // Clear the intervals array after stopping them
  }

  /**
   * Pauses all intervals by clearing them and calculating remaining time.
   */
  pauseAllIntervals() {
    this.intervals.forEach((interval) => {
      const elapsed = Date.now() - interval.startTime;
      interval.remaining = interval.time - (elapsed % interval.time);
      clearInterval(interval.id);
    });
  }

  /**
   * Resumes all intervals using the remaining time.
   */
  resumeAllIntervals() {
    this.intervals.forEach((interval) => {
      const remainingTime = interval.remaining;
      interval.id = setTimeout(() => {
        interval.callback();
        interval.id = setInterval(interval.callback, interval.time);
        interval.startTime = Date.now();
      }, remainingTime);
    });
  }

  /**
   * Checks for new throwable objects, creates them, and updates the status bar.
   */
  checkNewThrowedObjects() {
    const currentTime = Date.now();
    const timeSinceLastThrow = (currentTime - this.lastThrowTime) / 1000;
    if (
      timeSinceLastThrow >= 1 &&
      this.keyboard.D &&
      this.character.salsaMeter > 0
    ) {
      this.createThrowableObject();
      this.lastThrowTime = currentTime;
    }
  }

  /**
   * Creates a new throwable object and updates the status bar.
   */
  createThrowableObject() {
    const bottle = new ThrowableObject(
      this,
      this.character,
      this.character.x,
      this.character.y
    );
    this.throwableObjects.push(bottle);
    this.character.salsaMeter -= 1;
    this.statusBar[2].setPercentage(this.character.salsaMeter * 20);
  }

  /**
   * Checks for collisions of throwable objects and enemies.
   */
  checkThrowedObjectsCollision() {
    this.level.enemies.forEach((enemy) => {
      this.throwableObjects.forEach((bottle, bottleIndex) => {
        if (bottle.isColliding(enemy)) {
          this.handleBottleCollision(enemy, bottleIndex);
        }
      });
    });
  }

  /**
   * Handles the collision of a throwable object with an enemy.
   * @param {object} enemy - The enemy that was hit.
   * @param {number} bottleIndex - The index of the bottle in the array.
   */
  handleBottleCollision(enemy, bottleIndex) {
    enemy.isHit(100);
    bottle_break_sound.play();
    this.throwableObjects.splice(bottleIndex, 1);
  }

  /**
   * Checks for collisions of the character with enemies.
   */
  checkEnemyCollision() {
    const currentTime = Date.now();
    this.level.enemies.forEach((enemy) => {
      if (
        this.character.isColliding(enemy) &&
        this.character.isAboveGround() &&
        this.character.speedY < 0
      ) {
        this.handleEnemyJumpCollision(enemy, currentTime);
      } else if (this.character.isColliding(enemy)) {
        this.handleEnemyCollision(enemy, currentTime);
      }
    });
  }

  /**
   * Handles the collision of the character with an enemy when jumping.
   * @param {object} enemy - The enemy that was jumped on.
   * @param {number} currentTime - The current time.
   */
  handleEnemyJumpCollision(enemy, currentTime) {
    this.character.lastHitTime = currentTime;
    this.character.jump();
    enemy.isHit(10);
  }

  /**
   * Handles the collision of the character with an enemy.
   * @param {object} enemy - The enemy that collided with the character.
   * @param {number} currentTime - The current time.
   */
  handleEnemyCollision(enemy, currentTime) {
    if (currentTime - this.character.lastHitTime > this.character.hitCooldown) {
      this.character.isHit(enemy.dmg);
      pepe_dmg_sound.play();
      this.character.lastHitTime = currentTime;
      this.statusBar[0].setPercentage(this.character.health);
    }
  }

  /**
   * Checks for collisions of the character with collectable salsa bottles and collects them.
   */
  checkSalsaCollision() {
    this.level.salsabottles.forEach((bottle, index) => {
      if (this.character.salsaMeter < 5 && this.character.isColliding(bottle)) {
        this.collectSalsaBottle(index);
      }
    });
  }

  /**
   * Collects a salsa bottle and updates the status bar.
   * @param {number} index - The index of the bottle in the array.
   */
  collectSalsaBottle(index) {
    this.character.collectsSalsa(1);
    this.level.salsabottles.splice(index, 1);
    this.statusBar[2].setPercentage(this.character.salsaMeter * 20);
  }

  /**
   * Checks for collisions of the character with collectable coins and collects them.
   */
  checkCoinCollision() {
    this.level.coins.forEach((coin, index) => {
      if (this.character.isColliding(coin)) {
        this.collectCoin(index);
      }
    });
  }

  /**
   * Collects a coin and updates the status bar.
   * @param {number} index - The index of the coin in the array.
   */
  collectCoin(index) {
    this.character.collectsCoins(1);
    this.level.coins.splice(index, 1);
    this.statusBar[1].setPercentage(this.character.coin_count * 20);
  }

  /**
   * Clears the canvas.
   */
  clearCanvas() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

  /**
   * Draws the game elements on the canvas.
   */
  draw() {
    if (this.isPaused) return;
    this.clearCanvas();
    this.ctx.translate(this.camera_x, 0);
    this.drawBackground();
    this.drawGameObjects();
    this.drawStatusBars();
    this.ctx.translate(-this.camera_x, 0);

    // Request the next frame
    requestAnimationFrame(this.draw.bind(this));
  }

  /**
   * Draws the background elements.
   */
  drawBackground() {
    this.addObjects(this.level.backgroundObjects);
    this.addObjects(this.level.clouds);
  }

  /**
   * Draws the game objects including the character, enemies, and collectibles.
   */
  drawGameObjects() {
    this.addObjects(this.level.enemies);
    this.addObjects(this.level.salsabottles);
    this.addObjects(this.level.coins);
    this.addObjects([this.character]);
    this.addObjects(this.throwableObjects);
  }

  /**
   * Draws the status bars on the screen.
   */
  drawStatusBars() {
    this.ctx.translate(-this.camera_x, 0);
    this.addObjects(this.statusBar);
    this.ctx.translate(this.camera_x, 0);
  }

  /**
   * Adds an array of objects to the drawing list.
   * @param {object[]} objects - The objects to add.
   */
  addObjects(objects) {
    objects.forEach((object) => {
      this.addToMap(object);
    });
  }

  /**
   * Adds a single movable object to the drawing list.
   * @param {object} mo - The movable object to add.
   */
  addToMap(mo) {
    if (mo.otherDirection) {
      this.flipImage(mo);
    }
    mo.draw(this.ctx);
    mo.drawFrame(this.ctx);
    if (mo.otherDirection) {
      this.flipImageBack(mo);
    }
  }

  /**
   * Flips the image of a movable object if it is facing the other direction.
   * @param {object} mo - The movable object to flip.
   */
  flipImage(mo) {
    this.ctx.save();
    this.ctx.translate(mo.width, 0);
    this.ctx.scale(-1, 1);
    mo.x = mo.x * -1;
  }

  /**
   * Flips the image of a movable object back to its original direction.
   * @param {object} mo - The movable object to flip back.
   */
  flipImageBack(mo) {
    mo.x = mo.x * -1;
    this.ctx.restore();
  }

  /**
   * Plays the theme song in a loop.
   */
  playThemeSound() {
    this.setStoppableInterval(
      () => {
        theme_sound.play();
      },
      "playThemeSoundInterval",
      100
    );
  }

  /**
   * Plays a clucking sound of chickens every 10 seconds.
   */
  playCluckingSound() {
    this.setStoppableInterval(
      () => {
        clucking_sound.play();
      },
      "playCluckingSoundInterval",
      10000
    );
  }
}
