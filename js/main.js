//initialization of the game area and components
function startGame() {
  gameOverText = new text_comp("30px", "Consolas", "white", 290, 200);
  Apple = new apple();
  myScore = new text_comp("12px", "Consolas", "white", 200, 40);
  topScore = new text_comp("12px", "Consolas", "white", 310, 40);
  myGameArea.start();
}

//Where the canvas element is initialized and controlled
let myGameArea = {
  canvas: document.createElement("canvas"),
  start: function () {
    this.canvas.id = "game";
    this.canvas.width = 700;
    this.canvas.height = 400;
    this.context = this.canvas.getContext("2d");
    document.body.insertBefore(this.canvas, document.body.childNodes[10]);
    updateGame();
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
    window.addEventListener("keydown", function (e) {
      if (e.key == "r") {
        location.reload();
      }
    });
  },
};
