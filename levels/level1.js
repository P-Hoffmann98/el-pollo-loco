let level1 = new Level(
  [
    new Endboss(),
    new Chicken(),
    new Chicken(),
    new Chicken(),
    new Chicken(),
    new Chicken(),
    new Chicken(),
    new Chicken(),
    new Chicken(),
    new Chicken(),
    new Chicken(),
    new Babychicken(),
    new Babychicken(),
    new Babychicken(),
    new Babychicken(),
    new Babychicken(),
  ],
  [new Cloud()],
  [
    // 1st block of backgrounds
    new BackgroundObject("img/5_background/layers/air.png", -719, 0),
    new BackgroundObject(
      "img/5_background/layers/3_third_layer/1.png",
      -719,
      0
    ),
    new BackgroundObject(
      "img/5_background/layers/2_second_layer/1.png",
      -719,
      0
    ),
    new BackgroundObject(
      "img/5_background/layers/1_first_layer/1.png",
      -719,
      0
    ),

    // 2nd block of backgrounds
    new BackgroundObject("img/5_background/layers/air.png", 0, 0),
    new BackgroundObject("img/5_background/layers/3_third_layer/2.png", 0, 0),
    new BackgroundObject("img/5_background/layers/2_second_layer/2.png", 0, 0),
    new BackgroundObject("img/5_background/layers/1_first_layer/2.png", 0, 0),

    // 3rd block of backgrounds
    new BackgroundObject("img/5_background/layers/air.png", 719, 0),
    new BackgroundObject("img/5_background/layers/3_third_layer/1.png", 719, 0),
    new BackgroundObject(
      "img/5_background/layers/2_second_layer/1.png",
      719,
      0
    ),
    new BackgroundObject("img/5_background/layers/1_first_layer/1.png", 719, 0),

    // 4th block of backgrounds
    new BackgroundObject("img/5_background/layers/air.png", 719 * 2, 0),
    new BackgroundObject(
      "img/5_background/layers/3_third_layer/2.png",
      719 * 2,
      0
    ),
    new BackgroundObject(
      "img/5_background/layers/2_second_layer/2.png",
      719 * 2,
      0
    ),
    new BackgroundObject(
      "img/5_background/layers/1_first_layer/2.png",
      719 * 2,
      0
    ),

    // 5th block of backgrounds
    new BackgroundObject("img/5_background/layers/air.png", 719 * 3, 0),
    new BackgroundObject(
      "img/5_background/layers/3_third_layer/1.png",
      719 * 3,
      0
    ),
    new BackgroundObject(
      "img/5_background/layers/2_second_layer/1.png",
      719 * 3,
      0
    ),
    new BackgroundObject(
      "img/5_background/layers/1_first_layer/1.png",
      719 * 3,
      0
    ),

    // 6th block of backgrounds
    new BackgroundObject("img/5_background/layers/air.png", 719 * 4, 0),
    new BackgroundObject(
      "img/5_background/layers/3_third_layer/2.png",
      719 * 4,
      0
    ),
    new BackgroundObject(
      "img/5_background/layers/2_second_layer/2.png",
      719 * 4,
      0
    ),
    new BackgroundObject(
      "img/5_background/layers/1_first_layer/2.png",
      719 * 4,
      0
    ),

    // 7th block of backgrounds
    new BackgroundObject("img/5_background/layers/air.png", 719 * 5, 0),
    new BackgroundObject(
      "img/5_background/layers/3_third_layer/1.png",
      719 * 5,
      0
    ),
    new BackgroundObject(
      "img/5_background/layers/2_second_layer/1.png",
      719 * 5,
      0
    ),
    new BackgroundObject(
      "img/5_background/layers/1_first_layer/1.png",
      719 * 5,
      0
    ),

    // 8th block of backgrounds
    new BackgroundObject("img/5_background/layers/air.png", 719 * 6, 0),
    new BackgroundObject(
      "img/5_background/layers/3_third_layer/2.png",
      719 * 6,
      0
    ),
    new BackgroundObject(
      "img/5_background/layers/2_second_layer/2.png",
      719 * 6,
      0
    ),
    new BackgroundObject(
      "img/5_background/layers/1_first_layer/2.png",
      719 * 6,
      0
    ),

    // 9th block of backgrounds
    new BackgroundObject("img/5_background/layers/air.png", 719 * 7, 0),
    new BackgroundObject(
      "img/5_background/layers/3_third_layer/1.png",
      719 * 7,
      0
    ),
    new BackgroundObject(
      "img/5_background/layers/2_second_layer/1.png",
      719 * 7,
      0
    ),
    new BackgroundObject(
      "img/5_background/layers/1_first_layer/1.png",
      719 * 7,
      0
    ),

    // 10th block of backgrounds
    new BackgroundObject("img/5_background/layers/air.png", 719 * 8, 0),
    new BackgroundObject(
      "img/5_background/layers/3_third_layer/2.png",
      719 * 8,
      0
    ),
    new BackgroundObject(
      "img/5_background/layers/2_second_layer/2.png",
      719 * 8,
      0
    ),
    new BackgroundObject(
      "img/5_background/layers/1_first_layer/2.png",
      719 * 8,
      0
    ),
  ],
  [
    new SalsaBottle(),
    new SalsaBottle(),
    new SalsaBottle(),
    new SalsaBottle(),
    new SalsaBottle(),
  ],
  [new Coin(), new Coin(), new Coin(), new Coin(), new Coin()]
);

level1.ensureChickenSpacing();
level1.ensureCoinSpacing();
level1.ensureSalsaBottleSpacing();
