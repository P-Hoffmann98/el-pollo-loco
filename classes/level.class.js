class Level {
  enemies;
  clouds;
  backgroundObjects;
  salsabottles;
  coins;

  constructor(enemies, clouds, backgroundObjects, salsabottles, coins) {
    this.enemies = enemies;
    this.clouds = clouds;
    this.backgroundObjects = backgroundObjects;
    this.salsabottles = salsabottles;
    this.coins = coins;
  }

  // Spread the Chickens
  ensureChickenSpacing() {
    for (let i = 0; i < this.enemies.length; i++) {
      if (this.enemies[i] instanceof Chicken) {
        let chicken = this.enemies[i];
        for (let j = 0; j < this.enemies.length; j++) {
          if (i !== j && this.enemies[j] instanceof Chicken) {
            while (chicken.isColliding(this.enemies[j])) {
              chicken.x = Math.random() * 4000 + 200;
              chicken.y = 320;
            }
          }
        }
      }
    }
  }

  // Spread the Coins
  ensureCoinSpacing() {
    for (let i = 0; i < this.coins.length; i++) {
      let coin = this.coins[i];
      for (let j = 0; j < this.coins.length; j++) {
        if (i !== j) {
          while (coin.isColliding(this.coins[j])) {
            coin.x = Math.random() * 4000 + 500;
            coin.y = 320;
          }
        }
      }
    }
  }

  // Spread the Salsa Bottles
  ensureSalsaBottleSpacing() {
    for (let i = 0; i < this.salsabottles.length; i++) {
      let bottle = this.salsabottles[i];
      for (let j = 0; j < this.salsabottles.length; j++) {
        if (i !== j) {
          while (bottle.isColliding(this.salsabottles[j])) {
            bottle.x = Math.random() * 4000 + 500;
            bottle.y = 320;
          }
        }
      }
    }
  }
}
