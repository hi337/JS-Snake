let speed = 7;
let tileCount = innerWidth * 0.02857142857;
let tileSize = innerWidth / tileCount - 2;
let headX = 10;
let headY = 10;
let snakeParts = [];
let tailLength = 0;
let inputsXVelocity = 0;
let inputsYVelocity = 0;
let xVelocity = 0;
let yVelocity = 0;
let score = 0;
let gameOver = false;
let gameOverText;
let anim_id = 0;
let Apple;
let top_score = +window.localStorage.getItem("top_score") || 0;
let paused = false;
let allow_pause = true;
let pausedText;
let borderTop, borderBottom, borderRight, borderLeft;
let scoreIncrement = 5;
let allow_full = true;
let full = false;
let tapedTwice = false;
let topScore;
