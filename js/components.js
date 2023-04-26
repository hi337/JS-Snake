//part of the snake, used for the head and the body
class SnakePart {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.width = tileSize;
    this.height = tileSize;
  }
}

//Text component for the score and initial screen
class text_comp {
  constructor(size, font, color, x, y) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.update = function () {
      myGameArea.context.font = this.size + " " + font;
      myGameArea.context.fillStyle = color;
      myGameArea.context.fillText(this.text, this.x, this.y);
    };
  }
}

class apple {
  constructor() {
    this.x = getRandomInt(21, innerWidth - 21);
    this.y = getRandomInt(21, innerHeight - 21);
    this.update = function () {
      myGameArea.context.fillStyle = "red";
      myGameArea.context.fillRect(this.x, this.y, tileSize, tileSize);
    };
    this.hit = () => {
      var myleft = this.x;
      var myright = this.x + tileSize;
      var mytop = this.y;
      var mybottom = this.y + tileSize;
      var otherleft = headX * tileCount;
      var otherright = headX * tileCount + tileSize;
      var othertop = headY * tileCount;
      var otherbottom = headY * tileCount + tileSize;
      var crash = true;
      if (
        mybottom < othertop ||
        mytop > otherbottom ||
        myright < otherleft ||
        myleft > otherright
      ) {
        crash = false;
      }
      return crash;
    };
  }
}

function border_comp(width, height, x, y) {
  this.width = width;
  this.height = height;
  this.x = x;
  this.y = y;
  this.update = function () {
    myGameArea.context.fillStyle = "red";
    myGameArea.context.fillRect(this.x, this.y, this.width, this.height);
  };
  this.hit = () => {
    var myleft = this.x;
    var myright = this.x + this.width;
    var mytop = this.y;
    var mybottom = this.y + this.height;
    var otherleft = headX * tileCount;
    var otherright = headX * tileCount + tileSize;
    var othertop = headY * tileCount;
    var otherbottom = headY * tileCount + tileSize;
    var crash = true;
    if (
      mybottom < othertop ||
      mytop > otherbottom ||
      myright < otherleft ||
      myleft > otherright
    ) {
      crash = false;
    }
    return crash;
  };
}
