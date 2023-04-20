function shakeScreen() {
  myGameArea.canvas.classList.add("shakeScreen");
  setTimeout(() => {
    myGameArea.canvas.classList.remove("shakeScreen");
  }, 500);
}
