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

  let i1 = new Image();
  i1.src =
    "game assets/hashashin/elementals_wind_hashashin_FREE_v1.1/PNG/idle/idle_1.png";

  let i2 = new Image();
  i2.src =
    "game assets/hashashin/elementals_wind_hashashin_FREE_v1.1/PNG/idle/idle_2.png";
  let i3 = new Image();
  i3.src =
    "game assets/hashashin/elementals_wind_hashashin_FREE_v1.1/PNG/idle/idle_3.png";
  let i4 = new Image();
  i4.src =
    "game assets/hashashin/elementals_wind_hashashin_FREE_v1.1/PNG/idle/idle_4.png";
  let i5 = new Image();
  i5.src =
    "game assets/hashashin/elementals_wind_hashashin_FREE_v1.1/PNG/idle/idle_5.png";
  let i6 = new Image();
  i6.src =
    "game assets/hashashin/elementals_wind_hashashin_FREE_v1.1/PNG/idle/idle_6.png";
  let i7 = new Image();
  i7.src =
    "game assets/hashashin/elementals_wind_hashashin_FREE_v1.1/PNG/idle/idle_7.png";
  let i8 = new Image();
  i8.src =
    "game assets/hashashin/elementals_wind_hashashin_FREE_v1.1/PNG/idle/idle_8.png";

  images = [i1, i2, i3, i4, i5, i6, i7, i8];

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
    this.playerWidth = 350;
    this.playerHeight = 200;
    this.dx = 8;
    this.dy = 12;
    this.gravitation = 0.4;
    this.PlayerhastighetY = 0;

    this.directions = {
      left: false,
      right: false,
      up: false,
      down: false,
    };
  }
  rita(frame) {
    c.drawImage(
      images[frame],
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
          break;
        case "d":
          this.directions.right = true;
          break;
        case "w":
          if (this.playerY === gameCanvas.height - this.playerHeight) {
            this.PlayerhastighetY = -20;
          }
          this.directions.up = true;
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

    this.PlayerhastighetY += this.gravitation;
    this.playerY += this.PlayerhastighetY;

    if (this.playerY > gameCanvas.height - this.playerHeight) {
      this.playerY = gameCanvas.height - this.playerHeight;
      this.playerVelocityY = 0;
    }

    if (
      this.directions.down &&
      this.playerY < gameCanvas.height - this.playerHeight
    ) {
      this.playerY += this.dy;
    }
  }
}
const player = new Player();
class Background {
  constructor(src) {
    this.image = new Image();
    this.image.src = src;
    this.x = 0;
    this.y = 0;
    this.width = gameCanvas.width;
    this.height = gameCanvas.height;
  }

  draw() {
    c.drawImage(this.image, this.x, this.y, this.width, this.height);
  }
}
const background = new Background("game assets/bakgrund/layers/w.png");
const background2 = new Background("game assets/bakgrund/layers/w1.png");
const background3 = new Background("game assets/bakgrund/layers/w2.png");
const background4 = new Background("game assets/bakgrund/layers/w3.png");

setInterval(() => {
  frame += 1;
  if (frame > 6) {
    frame = 0;
  }
}, 100);

function animate() {
  requestAnimationFrame(animate);
  c.clearRect(0, 0, gameCanvas.width, gameCanvas.height);

  background.draw();
  background2.draw();
  background3.draw();
  background4.draw();
  player.rita(frame);
  player.updatera();
}
