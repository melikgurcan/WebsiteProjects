//board
var blockSize = 25;
var rows = 20;
var cols = 20;
var board;
var context;
foodColor = getRandomColor();
var velocityX = 0;
var velocityY = 0;

var gameOver = false;

//snake head
var snakeX = blockSize * 5;
var snakeY = blockSize * 5;

//snake body
var snakeBody = [];

//food

var foodX;
var foodY;

//song
var song;

window.onload = function () {
  $("#leb").click(function () {
    var audio = document.getElementById("leblebi");
    audio.play();
  });

  board = document.getElementById("board");
  board.height = rows * blockSize;
  board.width = cols * blockSize;
  context = board.getContext("2d"); //used for drawing on the board

  placeFood();
  document.addEventListener("keyup", changeDirection);
  setInterval(update, 1000 / 10); //100 millisecond
  song = document.getElementById("song");
};

function update() {
  if (gameOver) {
    return;
  }

  context.fillStyle = "#F9F9E0";
  context.fillRect(0, 0, board.width, board.height);
  context.fillStyle = foodColor;
  context.fillRect(foodX, foodY, blockSize, blockSize);

  if (snakeX == foodX && snakeY == foodY) {
    snakeBody.push([foodX, foodY]);
    placeFood();
  }

  for (let i = snakeBody.length - 1; i > 0; i--) {
    snakeBody[i] = snakeBody[i - 1];
  }

  if (snakeBody.length) {
    snakeBody[0] = [snakeX, snakeY];
  }

  context.fillStyle = "pink";
  snakeX += velocityX * blockSize;
  snakeY += velocityY * blockSize;
  context.fillRect(snakeX, snakeY, blockSize, blockSize);
  for (let i = 0; i < snakeBody.length; i++) {
    context.fillRect(snakeBody[i][0], snakeBody[i][1], blockSize, blockSize);
  }

  //game over conditions
  if (
    snakeX < 0 ||
    snakeY < 0 ||
    snakeX > cols * blockSize ||
    snakeY > rows * blockSize
  ) {
    gameOver = true;
    alert("Game Over Malsf");
    song.pause();
    eatSound.currentTime = 0;
  }

  for (let i = 1; i < snakeBody.length; i++) {
    if (snakeX == snakeBody[i][0] && snakeY == snakeBody[i][1]) {
      gameOver = true;
      alert("Game Over Malsf");
      song.pause();
      eatSound.currentTime = 0;
    }
  }
}

function placeFood() {
  foodX = Math.floor(Math.random() * cols) * blockSize;
  foodY = Math.floor(Math.random() * rows) * blockSize;
  foodColor = getRandomColor();
}

var gameStarted = false;

function changeDirection(e) {
  if (!gameStarted) {
    song.play();
    gameStarted = true;
  }

  if (e.code == "ArrowUp" && velocityY != 1) {
    velocityX = 0;
    velocityY = -1;
  }
  if (e.code == "ArrowDown" && velocityY != -1) {
    velocityX = 0;
    velocityY = 1;
  }
  if (e.code == "ArrowLeft" && velocityX != 1) {
    velocityX = -1;
    velocityY = 0;
  }
  if (e.code == "ArrowRight" && velocityX != -1) {
    velocityX = 1;
    velocityY = 0;
  }
}

//randomize color
function getRandomColor() {
  // Generate a random color in RGB format
  var r = Math.floor(Math.random() * 256);
  var g = Math.floor(Math.random() * 256);
  var b = Math.floor(Math.random() * 256);
  return "rgb(" + r + "," + g + "," + b + ")";
}
