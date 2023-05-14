class Platform {
  constructor(x, y, avstånd) {
    this.x = x;
    this.y = y;
    this.width = 400;
    this.height = 20;
    this.color = "green";
    this.avstånd = avstånd;
  }

  draw() {
    c.beginPath();
    c.fillStyle = this.color;
    c.fillRect(this.x, this.y, this.width, this.height);
    c.closePath();
  }

  update() {
    this.x -= 3;
    if (this.x + this.width < 0) {
      this.x = gameCanvas.width + this.avstånd;
      this.y = Math.floor(
        Math.random() * (gameCanvas.height - this.height - 400) + 100
      );
    }
    this.kollision(player);
    this.draw();
  }

  kollision(player) {
    if (
      player.playerX > this.x &&
      player.playerX + player.playerWidth < this.x + this.width &&
      player.playerY + player.playerHeight >= this.y &&
      player.playerY < this.y
    ) {
      player.playerY = this.y - player.playerHeight;
      player.PlayerhastighetY = 0;
      this.onGround = true;
    } else {
      this.onGround = false;
    }
  }
}
const platform = new Platform(700, 500, 100);
const platform2 = new Platform(250, 100, 100);
const platform3 = new Platform(400, 300, 100);
