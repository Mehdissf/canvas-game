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

// Players egenskaper
let playerX = gameCanvas.width / 2;
let playerY = gameCanvas.height / 2;
let playerWidth = 25;
let playerHeight = 25;
let dx = 8;
let dy = 12;
let gravitation = 0.4;
let PlayerhastighetY = 0;

let directions = {
  left: false,
  right: false,
  up: false,
  down: false,
};

// ------------ Players rörelse ------------
document.addEventListener("keydown", (e) => {
  switch (e.key) {
    case "a":
      directions.left = true;
      break;
    case "d":
      directions.right = true;
      break;
    case "w":
      if (playerY === gameCanvas.height - playerHeight) {
        PlayerhastighetY = -20;
      }
      directions.up = true;
      break;
    case "s":
      directions.down = true;
      break;
    default:
      break;
  }
});

document.addEventListener("keyup", (e) => {
  switch (e.key) {
    case "a":
      directions.left = false;
      break;
    case "d":
      directions.right = false;
      break;
    case "w":
      directions.up = false;
      break;
    case "s":
      directions.down = false;
      break;
    default:
      break;
  }
});

function animate() {
  requestAnimationFrame(animate);
  c.clearRect(0, 0, gameCanvas.width, gameCanvas.height);
  c.fillRect(playerX, playerY, playerWidth, playerHeight);
  c.fillStyle = "yellow";

  if (directions.right && playerX < gameCanvas.width - playerWidth) {
    if (playerX + dx > gameCanvas.width - playerWidth) {
      playerX = gameCanvas.width - playerWidth;
    } else {
      playerX += dx;
    }
  }
  if (directions.left && playerX > 0) {
    if (playerX - dx < 0) {
      playerX = 0;
    } else {
      playerX -= dx;
    }
  }

  PlayerhastighetY += gravitation;
  playerY += PlayerhastighetY;

  if (playerY > gameCanvas.height - playerHeight) {
    playerY = gameCanvas.height - playerHeight;
    playerVelocityY = 0;
  }

  if (directions.down && playerY < gameCanvas.height - playerHeight) {
    playerY += dy;
  }
}
