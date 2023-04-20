//part of the snake, used for the head and the body
class SnakePart {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
}

//Text component for the score and initial screen
class text_comp {
  constructor(size, font, color, x, y) {
    this.x = x;
    this.y = y;
    this.update = function () {
      myGameArea.context.font = size + " " + font;
      myGameArea.context.fillStyle = color;
      myGameArea.context.fillText(this.text, this.x, this.y);
    };
  }
}

class apple {
  constructor() {
    this.x = 5;
    this.y = 5;
    this.update = function () {
      myGameArea.context.fillStyle = "red";
      myGameArea.context.fillRect(this.x, this.y, tileSize, tileSize);
    };
    this.hit = (otherobj) => {
      let myleft = this.centerX;
      let myright = this.centerX + this.hitBoxWidth;
      let mytop = this.centerY;
      let mybottom = this.centerY + this.hitBoxHeight;
      let otherleft = otherobj.x;
      let otherright = otherobj.x + otherobj.width;
      let othertop = otherobj.y;
      let otherbottom = otherobj.y + otherobj.height;
      let crash = true;
      if (
        mybottom <= othertop ||
        mytop >= otherbottom ||
        myright <= otherleft ||
        myleft >= otherright
      ) {
        crash = false;
      }
      return crash;
    };
  }
}
