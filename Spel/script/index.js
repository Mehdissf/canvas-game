window.focus;
const SCREENWIDTH = innerWidth;
const SCREENHEIGHT = innerHeight;
let gameCanvas = document.getElementById("canvas");
let c = gameCanvas.getContext("2d");
gameCanvas.height = SCREENHEIGHT / 1.2;
gameCanvas.width = SCREENWIDTH / 1.2;
gameCanvas.style.position = "absolute";
gameCanvas.style.left = (SCREENWIDTH - gameCanvas.width) / 2 + "px";
gameCanvas.style.top = (SCREENHEIGHT - gameCanvas.height) / 2 + "px";
let frame = 0;

window.onload = function () {
  let start = document.getElementById("start");
  let musik = document.getElementById("musik");
  let speletkörs = false;

  // <<<--------------------Jump-up------------------------->>>
  let up1 = new Image();
  up1.src =
    "game assets/hashashin/elementals_wind_hashashin_FREE_v1.1/PNG/j_up/j_up_1.png";
  let up2 = new Image();
  up2.src =
    "game assets/hashashin/elementals_wind_hashashin_FREE_v1.1/PNG/j_up/j_up_2.png";
  let up3 = new Image();
  up3.src =
    "game assets/hashashin/elementals_wind_hashashin_FREE_v1.1/PNG/j_up/j_up_3.png";
  jump_up = [up1, up2, up3];

  // <<<--------------------Jump-down------------------------->>>
  let down1 = new Image();
  down1.src =
    "game assets/hashashin/elementals_wind_hashashin_FREE_v1.1/PNG/j_down/j_down_1.png";
  let down2 = new Image();
  down2.src =
    "game assets/hashashin/elementals_wind_hashashin_FREE_v1.1/PNG/j_down/j_down_2.png";
  let down3 = new Image();
  down3.src =
    "game assets/hashashin/elementals_wind_hashashin_FREE_v1.1/PNG/j_down/j_down_3.png";
  jump_down = [down1, down2, down3];

  // <<<------------------Run----------------->>>>>>
  let run1 = new Image();
  run1.src =
    "game assets/hashashin/elementals_wind_hashashin_FREE_v1.1/PNG/run/run_1.png";
  let run2 = new Image();
  run2.src =
    "game assets/hashashin/elementals_wind_hashashin_FREE_v1.1/PNG/run/run_2.png";
  let run3 = new Image();
  run3.src =
    "game assets/hashashin/elementals_wind_hashashin_FREE_v1.1/PNG/run/run_3.png";
  let run4 = new Image();
  run4.src =
    "game assets/hashashin/elementals_wind_hashashin_FREE_v1.1/PNG/run/run_4.png";
  let run5 = new Image();
  run5.src =
    "game assets/hashashin/elementals_wind_hashashin_FREE_v1.1/PNG/run/run_5.png";
  let run6 = new Image();
  run6.src =
    "game assets/hashashin/elementals_wind_hashashin_FREE_v1.1/PNG/run/run_6.png";
  let run7 = new Image();
  run7.src =
    "game assets/hashashin/elementals_wind_hashashin_FREE_v1.1/PNG/run/run_7.png";
  let run8 = new Image();
  run8.src =
    "game assets/hashashin/elementals_wind_hashashin_FREE_v1.1/PNG/run/run_8.png";
  runs = [run1, run2, run3, run4, run5, run6, run7, run8];

  start.addEventListener("click", () => {
    if (!speletkörs) {
      start.style.display = "none";
      speletkörs = true;
      musik.play();
      animate();
    }
  });
};

class Player {
  constructor() {
    this.playerX = gameCanvas.width / 2;
    this.playerY = gameCanvas.height / 2;
    this.playerWidth = 100;
    this.playerHeight = 100;
    this.dx = 8;
    this.dy = 5;
    this.gravitation = 0.7;
    this.PlayerhastighetY = 0;
    this.hp = 100;
    this.xp = 0;
    this.onGround = false;
    this.platform = null; // den plattform spelaren står på

    this.directions = {
      left: false,
      right: false,
      up: false,
      down: false,
    };
  }
  rita(frame) {
    c.drawImage(
      runs[frame],
      this.playerX,
      this.playerY,
      this.playerWidth,
      this.playerHeight
    );
    // c.fillRect(this.playerX, this.playerY, this.playerWidth, this.playerHeight);
  }
  updatera() {
    document.addEventListener("keydown", (e) => {
      switch (e.key) {
        case "a":
          this.directions.left = true;
          // springer åt vänster
          break;
        case "d":
          this.directions.right = true;
          // springer åt höger
          break;
        case "w":
          if (this.playerY === gameCanvas.height - this.playerHeight) {
            this.PlayerhastighetY = -20;
          }
          this.directions.up = true;
          // hoppar uppåt
          // och sedan faller nedåt
          break;
        case "s":
          this.directions.down = true;
          break;
        default:
          break;
      }
    });

    document.addEventListener("keyup", (e) => {
      switch (e.key) {
        case "a":
          this.directions.left = false;
          break;
        case "d":
          this.directions.right = false;
          break;
        case "w":
          this.directions.up = false;
          break;
        case "s":
          this.directions.down = false;
          break;
        default:
          break;
      }
    });
    // <<<------------gränser---------->>>>
    if (
      this.directions.right &&
      this.playerX < gameCanvas.width - this.playerWidth
    ) {
      if (this.playerX + this.dx > gameCanvas.width - this.playerWidth) {
        this.playerX = gameCanvas.width - this.playerWidth;
      } else {
        this.playerX += this.dx;
      }
    }
    if (this.directions.left && this.playerX > 0) {
      if (this.playerX - this.dx < 0) {
        this.playerX = 0;
      } else {
        this.playerX -= this.dx;
      }
    }
    if (this.directions.up && this.onGround) {
      this.PlayerhastighetY = -20;
      this.onGround = false;
    }

    this.PlayerhastighetY += this.gravitation;
    this.playerY += this.PlayerhastighetY;

    if (this.playerY > gameCanvas.height - this.playerHeight) {
      this.playerY = gameCanvas.height - this.playerHeight;
    }

    if (
      this.directions.down &&
      this.playerY < gameCanvas.height - this.playerHeight
    ) {
      this.playerY += this.dy;
    }
    if (this.platform) {
      if (
        this.playerX + this.playerWidth > this.platform.x &&
        this.playerX < this.platform.x + this.platform.width &&
        this.playerY + this.playerHeight > this.platform.y &&
        this.playerY < this.platform.y + this.platform.height
      ) {
        // Spelaren befinner sig på plattformen
        this.playerY = this.platform.y - this.playerHeight;
        this.PlayerhastighetY = 0;
        this.onGround = true;
      } else {
        // Spelaren befinner sig inte på plattformen
        this.platform = null;
        this.onGround = false;
      }
    }
  }
}
const player = new Player();

class Platform {
  constructor(x, y, width, height) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.color = "green";
  }

  draw() {
    c.beginPath();
    c.fillStyle = this.color;
    c.fillRect(this.x, this.y, this.width, this.height);
    c.closePath();
  }

  update() {
    this.x -= 2;
    if (this.y > gameCanvas.height) {
      this.y = -this.height;
      this.y = Math.floor(Math.random() * (gameCanvas.height - this.height));
    }
    if (this.platform) {
      this.platform.kollision(player);
    }
    this.draw();
  }
  kollision(player) {
    if (
      player.playerX < this.x + this.width &&
      player.playerX + player.playerWidth > this.x &&
      player.playerY + player.playerHeight > this.y &&
      player.playerY + player.playerHeight < this.y + this.height
    ) {
      player.playerY = this.y - player.playerHeight;
      player.PlayerhastighetY = 0;
      this.onGround = true;
    } else {
      this.onGround = false;
    }
  }
}
const platform = new Platform(700, 500, 500, 20);

class Background {
  constructor(src, fart) {
    this.image = new Image();
    this.image.src = src;
    this.x = 0;
    this.y = 0;
    this.width = gameCanvas.width;
    this.height = gameCanvas.height;
    this.fart = fart - 1;
  }

  draw() {
    this.x -= this.fart;
    if (this.x < -this.width) {
      this.x = 0;
    }
    c.drawImage(this.image, this.x, this.y, this.width, this.height);
    c.drawImage(
      this.image,
      this.x + this.width,
      this.y,
      this.width,
      this.height
    );
  }
}
const background = new Background("game assets/bakgrund/layers/w.png", 1);
const background2 = new Background("game assets/bakgrund/layers/w1.png", 2);
const background3 = new Background("game assets/bakgrund/layers/w2.png", 3);
const background4 = new Background("game assets/bakgrund/layers/w3.png", 4);
const background5 = new Background("game assets/bakgrund/layers/w3.png", 5);

// -------------------Players frames----------------------
setInterval(() => {
  frame += 1;
  if (frame > 7) {
    frame = 0;
  }
}, 120);

function animate() {
  requestAnimationFrame(animate);
  background.draw();
  background2.draw();
  background3.draw();
  background4.draw();
  player.rita(frame);
  player.updatera();
  platform.update();
}
