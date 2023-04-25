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
function tapHandler(event) {
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

// function resizeHandler() {

// }
