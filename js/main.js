//initialization of the game area and components
function startGame() {
  gameOverText = new text_comp(
    `${0.05714285714 * innerWidth}px`,
    "Consolas",
    "white",
    innerWidth / 2.6,
    innerHeight / 2
  );
  Apple = new apple();
  myScore = new text_comp(
    `${0.02142857142 * innerWidth}px`,
    "Consolas",
    "white",
    innerWidth / 3.5,
    40
  );
  topScore = new text_comp(
    `${0.02142857142 * innerWidth}px`,
    "Consolas",
    "white",
    innerWidth / 1.75,
    40
  );
  pausedText = new text_comp(
    `${0.05714285714 * innerWidth}px`,
    "Consolas",
    "white",
    innerWidth / 2.3,
    innerHeight / 2
  );
  borderTop = new border_comp(innerWidth, 10, 0, 0);
  borderBottom = new border_comp(innerWidth, 10, 0, innerHeight - 10);
  borderLeft = new border_comp(10, innerHeight, 0, 10);
  borderRight = new border_comp(10, innerHeight, innerWidth - 10, 10);
  myGameArea.start();
}

//Where the canvas element is initialized and controlled
let myGameArea = {
  canvas: document.createElement("canvas"),
  start: function () {
    this.canvas.id = "game";
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
    this.context = this.canvas.getContext("2d");
    document.body.insertBefore(this.canvas, document.body.childNodes[10]);
    updateGame();
    //detect resizing and change the locations of things given new size
    // this.canvas.addEventListener("resize", resizeHandler);
    //detect doubletap and cause full screen
    this.canvas.addEventListener("touchstart", tapHandler); //detects a double tap on screen for full
    window.addEventListener("keydown", function (e) {
      if (allow_pause) {
        if (e.key == "p") {
          if (!paused) {
            paused = true;
          } else {
            paused = false;
          }
        }
        allow_pause = false;
      }
      if (allow_full) {
        if (e.key == "f") {
          if (!full) {
            myGameArea.canvas.requestFullscreen().catch((e) => {
              console.log("Error: " + e);
            });
            full = true;
          } else {
            document.exitFullscreen();
            full = false;
          }
        }
        allow_full = false;
      }
      myGameArea.keys = myGameArea.keys || {
        w: false,
        a: false,
        s: false,
        d: false,
        r: false,
      };
      myGameArea.keys[e.key] = true;
    });
    window.addEventListener("keyup", function (e) {
      if (e.key == "p") {
        allow_pause = true;
      } else if (e.key == "f") {
        allow_full = true;
      } else {
        myGameArea.keys[e.key] = false;
      }
    });
  },
  clear: function () {
    this.context.fillStyle = "black";
    this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
  },
  stop: function () {
    localStorage.setItem("top_score", top_score);
    gameOverText.text = "Game Over!";
    gameOverText.update();
    shakeScreen();
    window.addEventListener("keydown", function (e) {
      if (e.key == "r") {
        location.reload();
      }
    });
  },
};
