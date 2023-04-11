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

window.onload = function () {
  let start = document.getElementById("start");
  let musik = document.getElementById("musik");
  let speletkörs = false;

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
    this.playerWidth = 25;
    this.playerHeight = 25;
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
  rita() {
    c.fillRect(this.playerX, this.playerY, this.playerWidth, this.playerHeight);
    c.fillStyle = "yellow";
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
class Sprite {
  constructor({ position }) {
    this.position = position;
    this.bild = new bild();
    this.bild.src = "#";
  }
  rita() {
    c.drawImage(this.bild, this.position.x, this.position.y);
  }
}
const bakgrund1 = new Sprite({ position: { x: 0, y: 0 } });
const player = new Player();

function animate() {
  requestAnimationFrame(animate);
  c.clearRect(0, 0, gameCanvas.width, gameCanvas.height);
  bakgrund1.rita();
  player.rita();
  player.updatera();
}
