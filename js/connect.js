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

function createGrid() {

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
