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
