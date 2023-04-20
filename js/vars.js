let speed = 7;

let tileCount = 20;
let tileSize = 700 / tileCount - 2;

let headX = 10;
let headY = 10;
const snakeParts = [];
let tailLength = 2;

let inputsXVelocity = 0;
let inputsYVelocity = 0;

let xVelocity = 0;
let yVelocity = 0;

let score = 0;

const gulpSound = new Audio("gulp.mp3");

let gameOver = false;

let gameOverText;
let anim_id = 0;
let Apple;

let top_score = +window.localStorage.getItem("top_score") || 0;

let paused = false;
let allow_pause = true;
