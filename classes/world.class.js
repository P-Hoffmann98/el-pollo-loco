class World {
  character = new Character();
  level = level1;
  canvas;
  ctx;
  keyboard;
  camera_x = 0;
  statusBar;
  throwableObjects = [];

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
  }

  setWorld() {
    this.character.world = this;
  }

  run() {
    setInterval(() => {
      this.checkEnemyCollision();
      this.checkSalsaCollision();
      this.checkCoinCollision();
      this.checkThrowedObjects();
      // this.checkForDeaths();
      // this.checkThrowedObjectsCollision();
    }, 100);
  }

  // checkForDeaths() {
  //   // Check character death
  //   if (this.character.isDead()) {
  //     console.log("Character has died");
  //     // Handle character death (e.g., end game, respawn, etc.)
  //   }

  //   // Check enemies death
  //   this.level.enemies.forEach((enemy, index) => {
  //     if (enemy.isDead()) {
  //       console.log(`Enemy at index ${index} has died`);
  //       // Handle enemy death (e.g., remove from game, play death animation, etc.)
  //       this.level.enemies.splice(index, 1); // Remove dead enemy from the game
  //     }
  //   });
  // }

  checkThrowedObjects() {
    if (this.keyboard.D && this.character.salsaMeter > 0) {
      let bottle = new ThrowableObject(this.character.x, this.character.y);
      this.throwableObjects.push(bottle);
      this.character.salsaMeter -= 1; //Decrease salsa count when a bottle is thrown
      this.statusBar[2].setPercentage(this.character.salsaMeter * 20); //Update the salsa bar
    }
  }

  checkThrowedObjectsCollision() {
    let currentTime = Date.now(); // create Date
    this.level.enemies.forEach((enemy) => {
      this.throwableObjects.forEach((bottle, bottleIndex) => {
        if (bottle.isColliding(enemy)) {
          if (currentTime - enemy.lastHitTime > enemy.hitCooldown) {
            enemy.isHit(100);
            enemy.lastHitTime = currentTime;
            console.log("Enemy hit by bottle", enemy);
          }
          // Remove the bottle after handling the collision
          this.throwableObjects.splice(bottleIndex, 1);
        }
      });
    });
  }

  checkEnemyCollision() {
    let currentTime = Date.now();
    this.level.enemies.forEach((enemy, enemyIndex) => {
      if (
        this.character.isColliding(enemy) &&
        this.character.isAboveGround() &&
        this.character.speedY < 0
      ) {
        console.log("Trigger Collision");
        this.level.enemies.splice(enemyIndex, 1);
      } else if (this.character.isColliding(enemy)) {
        if (
          currentTime - this.character.lastHitTime >
          this.character.hitCooldown
        ) {
          this.character.isHit(enemy.dmg);
          this.character.lastHitTime = currentTime;
          console.log("Pepe got hit", this.character.hp);
          this.statusBar[0].setPercentage(this.character.health);
        } else {
          console.log("CD --> No Hit");
        }
      }
    });
  }

  checkSalsaCollision() {
    this.level.salsabottles.forEach((bottle, index) => {
      if (this.character.isColliding(bottle)) {
        this.character.collectsSalsa(1);
        //this.character.collects(bottle.salsaMeter);
        this.level.salsabottles.splice(index, 1); // Remove collected bottle from game
        console.log(
          "Collision with Bottle",
          "Pepe's SalsaMeter:",
          this.character.salsaMeter
        );
        this.statusBar[2].setPercentage(this.character.salsaMeter * 20); // Fill up that salsa juice
        //this.character.salsa_count++;
        //console.log(this.character.salsa_count);
      }
    });
  }

  checkCoinCollision() {
    this.level.coins.forEach((coin, index) => {
      if (this.character.isColliding(coin)) {
        this.character.collectsCoins(1);
        this.level.coins.splice(index, 1); // Remove collected Coin from game
        console.log("coin");
        this.statusBar[1].setPercentage(this.character.coin_count * 20);
      }
    });
  }

  // Function to clear the canvas
  clearCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  }

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

  // added Objects zur Drawliste
  addObjects(objects) {
    objects.forEach((o) => {
      this.addToMap(o);
    });
  }

  // draws objects list
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

  flipImage(mo) {
    this.ctx.save();
    this.ctx.translate(mo.width, 0);
    this.ctx.scale(-1, 1);
    mo.x = mo.x * -1;
  }

  flipImageBack(mo) {
    mo.x = mo.x * -1;
    this.ctx.restore();
  }

  playThemeSound() {
    setInterval(() => {
      theme_sound.play();
    }, 100); // start and restart Theme Song after 1 sec
  }

  playCluckingSound() {
    setInterval(() => {
      clucking_sound.play();
    }, 20000); // Plays clucking sound every 20 seconds
  }
}
