const COLOR_BACKGROUND = "DodgerBlue";
var canv = document.createElement("canvas");
document.body.appendChild(canv);
var ctx = canv.getContext("2d");

//dimensions
var height, width;
setDimensions();

// event LISTENERS
window.addEventListener("resize", setDimensions);

//game loop
var timeDelta, timeLast;
requestAnimationFrame(loop);

function loop(timeNow) {
  //init timeLast
  if (!timeLast) {
    timeLast = timeNow;
  }

  //calc time diff
  timeDelta = (timeNow - timeLast) /1000; //seconds
  timeLast  = timeNow;

  //update

  //draw
  drawBackground();

  //call the next frame
  requestAnimationFrame(loop);

}

function createGrid() {

}

function drawBackground() {
  ctx.fillStyle = COLOR_BACKGROUND;
  ctx.fillRect(0, 0, width, height);
}

function newGame() {
  createGrid();
}

function setDimensions() {
  height = window.innerHeight
  width = window.innerWidth;
  canv.height = height;
  canv.width = width;
}
