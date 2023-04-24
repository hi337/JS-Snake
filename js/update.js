//contains the function that updates the screen and is called called by requestAnimationFrame

function updateGame() {
  //clear the screen
  myGameArea.clear();

  if (!paused) {
    //if r is clicked, refresh page
    if (myGameArea.keys && myGameArea.keys["r"]) {
      location.reload();
    }

    //render the borders
    borderBottom.update();
    borderTop.update();
    borderLeft.update();
    borderRight.update();

    if (
      borderBottom.hit() ||
      borderLeft.hit() ||
      borderRight.hit() ||
      borderTop.hit()
    ) {
      gameOver = true;
    }

    xVelocity = inputsXVelocity;
    yVelocity = inputsYVelocity;

    //changes snake position
    headX = headX + xVelocity;
    headY = headY + yVelocity;

    //still haven't moved, don't check collision
    if (yVelocity !== 0 && xVelocity !== 0) {
      //border walls
      if (
        borderBottom.hit() ||
        borderLeft.hit() ||
        borderRight.hit() ||
        borderTop.hit()
      ) {
        gameOver = true;
      }

      //check if snake crashed into itself
      for (let i = 1; i < snakeParts.length; i++) {
        if (i >= 2 && snakeParts[0].hit(snakeParts[i])) {
          gameOver = true;
          break;
        }
      }
    }

    //checks collision with the apple
    if (Apple.hit()) {
      Apple.x = getRandomInt(21, 670);
      Apple.y = getRandomInt(21, 370);
      tailLength++;
      score++;
    }

    //check to see if game should be stopped
    if (gameOver) {
      myGameArea.stop(); //shakes the screen and shows game over text
      return; // stops the game loop
    }

    Apple.update();

    //drawing the snake
    myGameArea.context.fillStyle = "green";
    for (let i = 0; i < snakeParts.length; i++) {
      let part = snakeParts[i];
      if (part.x == headX && part.y == headY) {
        gameOver = true;
      }
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

    //raise speed 3 levels every 5 points earned
    if (score == scoreIncrement) {
      speed += 3;
      scoreIncrement += 5;
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
  } else {
    myGameArea.clear();
    pausedText.text = "PAUSED";
    pausedText.update();
  }

  setTimeout(updateGame, 1000 / speed);
}
