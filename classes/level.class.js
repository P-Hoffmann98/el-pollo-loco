class Level {
  constructor(enemies, clouds, backgroundObjects, salsabottles, coins) {
    this.enemies = enemies;
    this.clouds = clouds;
    this.backgroundObjects = backgroundObjects;
    this.salsabottles = salsabottles;
    this.coins = coins;
  }

  /**
   * Ensures that all entities in a given array are spaced out properly.
   * @param {Array} entities - The array of entities to space out.
   * @param {Function} isValidEntity - A function to validate the type of entity.
   * @param {number} xMin - The minimum x-coordinate for positioning.
   * @param {number} yPosition - The fixed y-coordinate for the entities.
   */
  ensureEntitySpacing(entities, isValidEntity, xMin, yPosition) {
    entities.forEach((entity, i) => {
      if (isValidEntity(entity)) {
        entities.forEach((otherEntity, j) => {
          if (i !== j && isValidEntity(otherEntity)) {
            while (entity.isColliding(otherEntity)) {
              entity.x = Math.random() * 4000 + xMin;
              entity.y = yPosition;
            }
          }
        });
      }
    });
  }

  /**
   * Makes sure Chickens spawn spread evenly.
   */
  ensureChickenSpacing() {
    this.ensureEntitySpacing(
      this.enemies,
      (entity) => entity instanceof Chicken,
      200,
      320
    );
  }

  /**
   * Makes sure Coins spawn spread evenly.
   */
  ensureCoinSpacing() {
    this.ensureEntitySpacing(this.coins, () => true, 500, 100);
  }

  /**
   * Makes sure Salsa Bottles spawn spread evenly.
   */
  ensureSalsaBottleSpacing() {
    this.ensureEntitySpacing(this.salsabottles, () => true, 500, 320);
  }
}
