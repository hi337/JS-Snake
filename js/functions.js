function shakeScreen() {
  myGameArea.canvas.classList.add("shakeScreen");
  setTimeout(() => {
    myGameArea.canvas.classList.remove("shakeScreen");
  }, 500);
}

//returns random integer between min and max inclusive
function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

//handles a touch start event
function tapStartHandler(event) {
  initialX = event.touches[0].clientX;
  initialY = event.touches[0].clientY;
  if (!tapedTwice) {
    tapedTwice = true;
    setTimeout(function () {
      tapedTwice = false;
    }, 300);
    return false;
  }
  event.preventDefault();
  //action on double tap goes below
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

//update the canvas layout given resizing due to full screen or rotating mobile device
function resizeHandler(event) {
  myGameArea.canvas.width = window.innerWidth;
  myGameArea.canvas.height = window.innerHeight;
  gameOverText.size = `${0.05714285714 * innerWidth}px`;
  gameOverText.x = innerWidth / 2.6;
  gameOverText.y = innerHeight / 2;
  myScore.size = `${0.02142857142 * innerWidth}px`;
  myScore.x = innerWidth / 3.5;
  topScore.size = `${0.02142857142 * innerWidth}px`;
  topScore.x = innerWidth / 1.75;
  pausedText.size = `${0.05714285714 * innerWidth}px`;
  pausedText.x = innerWidth / 2.3;
  pausedText.y = innerHeight / 2;
  borderTop.width = innerWidth;
  borderBottom.width = innerWidth;
  borderBottom.y = innerHeight - 10;
  borderLeft.height = innerHeight;
  borderRight.height = innerHeight;
  borderRight.x = innerWidth - 10;
  Apple.x = getRandomInt(21, innerWidth - 21);
  Apple.y = getRandomInt(21, innerHeight - 21);
}

function tapMoveHandler(event) {
  if (initialX === null) {
    return;
  }

  if (initialY === null) {
    return;
  }

  var currentX = e.touches[0].clientX;
  var currentY = e.touches[0].clientY;

  var diffX = initialX - currentX;
  var diffY = initialY - currentY;

  if (Math.abs(diffX) > Math.abs(diffY)) {
    // sliding horizontally
    if (diffX > 0) {
      // swiped left
      scrolledDirection = "left";
    } else {
      // swiped right
      scrolledDirection = "right";
    }
  } else {
    // sliding vertically
    if (diffY > 0) {
      // swiped up
      scrolledDirection = "up";
    } else {
      // swiped down
      scrolledDirection = "down";
    }
  }
  e.preventDefault();
}

function tapEndHandler(event) {
  initialX = null;
  initialY = null;
  scrolledDirection = "none";
}
