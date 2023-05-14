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
const background5 = new Background("game assets/bakgrund/layers/w3.png", 6);

function XP(player) {
  c.fillStyle = "white";
  c.font = "20px Arial";
  c.fillText("XP: " + player.xp, 10, 30);
}

function HP(player) {
  c.fillStyle = "white";
  c.font = "20px Arial";
  c.fillText("HP: " + player.hp, 10, 60);
}

function animate() {
  requestAnimationFrame(animate);
  background.draw();
  background2.draw();
  background3.draw();
  background4.draw();
  player.rita(frame);
  player.updatera();
  platform.update();
  platform2.update();
  platform3.update();
  XP(player);
  HP(player);
}
