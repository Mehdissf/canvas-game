window.focus;
const SCREENWIDTH = innerWidth;
const SCREENHEIGHT = innerHeight;
let gameCanvas = document.getElementById("canvas");
let c = gameCanvas.getContext("2d");
gameCanvas.height = SCREENHEIGHT / 2;
gameCanvas.width = SCREENWIDTH / 2;
gameCanvas.style.position = "absolute";
gameCanvas.style.left = (SCREENWIDTH - gameCanvas.width) / 2 + "px";
gameCanvas.style.top = (SCREENHEIGHT - gameCanvas.height) / 2 + "px";

let playerX = 100;
let playerY = 100;
let playerWidth = 10;
let playerHeight = 10;
let dx = 2;
let dy = 2;

let directions = {
  left: false,
  right: false,
  up: false,
  down: false,
};

// -------------------------------------
// ------------ Player movement ------------
document.addEventListener("keydown", (e) => {
  switch (e.key) {
    case "ArrowLeft":
      directions.left = true;
      break;
    case "ArrowRight":
      directions.right = true;
      break;
    case "ArrowUp":
      directions.up = true;
      break;
    case "ArrowDown":
      directions.down = true;
      break;
    default:
      break;
  }
});

document.addEventListener("keyup", (e) => {
  switch (e.key) {
    case "ArrowLeft":
      directions.left = false;
      break;
    case "ArrowRight":
      directions.right = false;
      break;
    case "ArrowUp":
      directions.up = false;
      break;
    case "ArrowDown":
      directions.down = false;
      break;
    default:
      break;
  }
});
function animate() {
  requestAnimationFrame(animate);
  c.clearRect(0, 0, gameCanvas.width, gameCanvas.height); // Clear screen

  c.fillRect(playerX, playerY, playerWidth, playerHeight); // Draw player

  if (directions.right && playerX < gameCanvas.width - playerWidth) {
    playerX += dx;
  }

  if (directions.left && playerX > 0) {
    playerX -= dx;
  }

  if (directions.up && playerY > 0) {
    playerY -= dy;
  }

  if (directions.down && playerY < gameCanvas.height - playerHeight) {
    playerY += dy;
  }
}
animate();
