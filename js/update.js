//contains the function that updates the screen and is called called by requestAnimationFrame

function updateGame() {
  //clear the screen
  myGameArea.clear();

  //if r is clicked, refresh page
  if (myGameArea.keys && myGameArea.keys["r"]) {
    location.reload();
  }

  xVelocity = inputsXVelocity;
  yVelocity = inputsYVelocity;

  //changes snake position
  headX = headX + xVelocity;
  headY = headY + yVelocity;

  //still haven't moved, don't check collision
  if (yVelocity !== 0 && xVelocity !== 0) {
    //border walls
    if (headX < 0) {
      gameOver = true;
    } else if (headX === tileCount) {
      gameOver = true;
    } else if (headY < 0) {
      gameOver = true;
    } else if (headY === tileCount) {
      gameOver = true;
    }

    //check if snake crashed into itself
    for (let i = 0; i < snakeParts.length; i++) {
      let part = snakeParts[i];
      if (part.x === headX && part.y === headY) {
        gameOver = true;
        break;
      }
    }
  }

  //check to see if game should be stopped
  if (gameOver) {
    gameOverText.text = "Game Over!";
    gameOverText.update();
    myGameArea.stop();
    shakeScreen();
    return;
  }

  //checks collision with the apple
  if (Apple.hit()) {
    Apple.x = Math.floor(Math.random() * tileCount);
    Apple.y = Math.floor(Math.random() * tileCount);
    tailLength++;
    score++;
  }

  Apple.update();

  //drawing the snake
  myGameArea.context.fillStyle = "green";
  for (let i = 0; i < snakeParts.length; i++) {
    let part = snakeParts[i];
    myGameArea.context.fillRect(
      part.x * tileCount,
      part.y * tileCount,
      tileSize,
      tileSize
    );
  }

  snakeParts.push(new SnakePart(headX, headY)); //put an item at the end of the list next to the head
  while (snakeParts.length > tailLength) {
    snakeParts.shift(); // remove the furthet item from the snake parts if have more than our tail size.
  }

  myGameArea.context.fillStyle = "orange";
  myGameArea.context.fillRect(
    headX * tileCount,
    headY * tileCount,
    tileSize,
    tileSize
  );

  //changing top_score for efficient instant adjustment
  if (score > top_score) {
    top_score++;
  }
  topScore.text = `TOP SCORE: ${top_score}`;
  topScore.update();

  //changing the text for myScore
  myScore.text = `SCORE: ${score}`;
  myScore.update();

  //raise speed given the score
  if (score > 5) {
    speed = 9;
  }
  if (score > 10) {
    speed = 11;
  }

  //move the snake
  if (myGameArea.keys && myGameArea.keys["w"]) {
    if (inputsYVelocity != 1) {
      inputsYVelocity = -1;
      inputsXVelocity = 0;
    }
  }
  if (myGameArea.keys && myGameArea.keys["s"]) {
    if (inputsYVelocity != -1) {
      inputsYVelocity = 1;
      inputsXVelocity = 0;
    }
  }
  if (myGameArea.keys && myGameArea.keys["a"]) {
    if (inputsXVelocity != 1) {
      inputsYVelocity = 0;
      inputsXVelocity = -1;
    }
  }
  if (myGameArea.keys && myGameArea.keys["d"]) {
    if (inputsXVelocity != -1) {
      inputsYVelocity = 0;
      inputsXVelocity = 1;
    }
  }

  setTimeout(updateGame, 1000 / speed);
}
