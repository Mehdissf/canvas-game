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

  //<<<<<<-----------------------XP-tidsintervall--------------------------->>>>
  //<---------------------------------------------------------------------->
  tidsintervall_startas(player) {
    this.xpInterval = setInterval(() => {
      this.xp += 1;
      c.fillStyle = "white";
      c.font = "20px Arial";
      c.fillText("XP: " + player.xp, 10, 30);
    }, 1000); // xp ökas med 1 vid varje sekund
    return player;
  }
  tidsintervall_slutas() {
    //Skall användas när spelaren dör
    clearInterval(this.xpInterval);
    this.xpInterval = null;
  }

  rita(frame) {
    c.drawImage(
      runs[frame],
      this.playerX,
      this.playerY,
      this.playerWidth,
      this.playerHeight
    );
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
          // och sedan faller ned
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

    // <<<------------------Splaren dör------------------->>>
    if (this.hp <= 0) {
      this.stopXPInterval();
      console.log("Du dog");
    }
  }
}
const player = new Player();

// -------------------Players frames----------------------
setInterval(() => {
  frame += 1;
  if (frame > 7) {
    frame = 0;
  }
}, 120);
