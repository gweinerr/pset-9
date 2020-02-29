var canvas = document.getElementById("myCanvas");
var ctx = canvas.getContext("2d");

var radiusofBall = 10;
var playing = false;
var rightPressed = false;
var leftPressed = false;
var brickRowCount = 8;
var brickColumnCount = 5;
var brickWidth = 70;
var brickHeight = 20;
var brickPadding = 10;
var brickTop = 40;
var brickOffsetLeft = 30;
var x = canvas.width/2;
var y = canvas.height-30;
var dx = 2;
var dy = -2;
var heightofPaddle = 10;
var widthofPaddle = 100;
var paddleX = (canvas.width - widthofPaddle)/2;
var score = 0;
var lives = 2;

 // function initialize() {
 //   startbttn.style.display = 'none';
 //
 // }

var bricks = [];
for (var c = 0; c < brickColumnCount; c++) {
  bricks[c] = [];
  for(var r = 0; r < brickRowCount; r++) {
    bricks[c][r] = { x: 0, y: 0, status: 1 };
  }
}

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);
document.addEventListener("mousemove", mouseMoveHandler, false);

function keyDownHandler(e) {
    if(e.key == "Right" || e.key == "ArrowRight") {
        rightPressed = true;
    }
    else if(e.key == "Left" || e.key == "ArrowLeft") {
        leftPressed = true;
    }
}



function mouseMoveHandler(e) {
  var relativeX = e.clientX - canvas.offsetLeft;
  if(relativeX > 0 && relativeX < canvas.width) {
    paddleX = relativeX - widthofPaddle/2;
  }
}
function drawScore() {
  ctx.font = "30px Times New Roman";
  ctx.fillStyle = "white";
  ctx.fillText("Score: " +score, canvas.width - 120, 30);
}
function drawLives() {
  ctx.font = "30px Times New Roman";
  ctx.fillStyle = "white";
  ctx.fillText("Lives: "+lives, 10, 30);
}
function collisionDetection() {
  for(var c = 0; c < brickColumnCount; c++) {
    for(var r = 0; r < brickRowCount; r++) {
      var b = bricks[c][r];
      if(b.status == 1) {
        if(x > b.x && x < b.x+brickWidth && y > b.y && y < b.y + brickHeight) {
          dy = -dy;
          b.status = 0;
          score++;
          if(score == brickRowCount * brickColumnCount) {
            alert("YOU WON, CONGRATS! GO YOU!");
            document.location.reload();
          }
        }
      }
    }
  }
}

function drawBall() {
  ctx.beginPath();
  ctx.arc(x, y, radiusofBall, 0, Math.PI * 2);
  ctx.fillStyle = "white";
  ctx.fill();
  ctx.closePath();
}
function drawPaddle() {
  ctx.beginPath();
  ctx.rect(paddleX, canvas.height-heightofPaddle, widthofPaddle, heightofPaddle);
  ctx.fillStyle = "springgreen";
  ctx.fill();
  ctx.closePath();
}
function drawBricks() {
  for (var  c = 0; c < brickColumnCount; c++) {
    for (var r = 0; r < brickRowCount; r++) {
      if (bricks[c][r].status == 1) {
        var brickX = (r * (brickWidth+brickPadding)) + brickOffsetLeft;
        var brickY = (c * (brickHeight+brickPadding)) + brickTop;
        bricks[c][r].x = brickX;
        bricks[c][r].y = brickY;
        ctx.beginPath();
        ctx.rect(brickX, brickY, brickWidth, brickHeight);
        ctx.fill();
        ctx.closePath();
        if (r === 0 || r === 4) {
          ctx.fillStyle = "violet";
        } else if (r === 1 || r === 5) {
          ctx.fillStyle = "springgreen";
        } else if (r === 2 || r === 6) {
          ctx.fillStyle = "orange";
        } else {
          ctx.fillStyle = "white";
        }
      }
    }
  }
}

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawBricks();
  drawBall();
  drawPaddle();
  drawScore();
  drawLives();
  collisionDetection();

  if(x + dx > canvas.width - radiusofBall || x + dx < radiusofBall) {
    dx = -dx;
  }
  if(y + dy < radiusofBall) {
    dy = -dy;
  }
  else if(y + dy > canvas.height - radiusofBall) {
    if(x > paddleX && x < paddleX + widthofPaddle) {
      dy = -dy;
    }
    else {
      lives--;
      if(!lives) {
        alert("GAME OVER. BETTER LUCK NEXT TIME.");
        document.location.reload();
      }
      else {
        x = canvas.width/2;
        y = canvas.height-30;
        dx = 3;
        dy = -3;
        paddleX = (canvas.width - widthofPaddle) / 2;
      }
    }
  }

  if(rightPressed && paddleX < canvas.width - widthofPaddle) {
    paddleX += 7;
  }
  else if(leftPressed && paddleX > 0) {
    paddleX -= 7;
  }

  x += dx;
  y += dy;
  requestAnimationFrame(draw);
}

draw();
