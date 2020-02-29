// game rules
const GRID_CIRLE = 0.7; //circle size (fraction of cell size)
const GRID_COLS = 7;
const GRID_ROWS = 6;
const MARGIN = 0.02 // margin (as a fraction of the shortest screen dimension)

//colors
const COLOR_BACKGROUND = "white";
const COLOR_COMP = "red";
const COLOR_COMP_DRK = "darkred";
const COLOR_FRAME = "DodgerBlue";
const COLOR_FRAME_BUTT = "royalblue";
const COLOR_PLAY = "yellow";
const COLOR_PLAY_DRK = "olive";

//classes
class Cell {
  constructor(left, top, w, h, row, col) {
    this.bot = top + height;
    this.left = left;
    this.right = left + w;
    this.top = top;
    this.w = w;
    this.h = h;
    this.row = row;
    this.col = col;
    this.cx = left + w/2;
    this.cy = top + height/2;
    this.r = w * GRID_CIRLE/2;
    this.owner = null;
  }

  //draw circle or hole
  draw(ctx) {

    //owner color
    let color = this.owner == null ? COLOR_BACKGROUND : this.owner ? COLOR_PLAY : COLOR_COMP;

    //draw the circle
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(this.cx, this.cy, this.r, 0, Math.PI * 2);
    ctx.fill();
  }
}

//setting up the canvas
var canv = document.createElement("canvas");
document.body.appendChild(canv);
var ctx = canv.getContext("2d");

//game variables
var grid = [];

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
  grid = [];

  //set up cell size and margins
  let cell, marginX, marginY;


  //portrait and landscape
  if ((width - margin * 2) * GRID_ROWS / GRID_COLS < height - margin * 2) {
    cell = (width -  margin * 2) / GRID_COLS;
    marginX = margin;
    marginY = (height - cell * GRID_ROWS) / 2;
  }

//landscape
  else {
    cell = (height - margin * 2) / GRID_ROWS;
    marginX = (width - cell * GRID_COLS) / 2;
    marginY = margin;
  }

  //populate the grid
  for (let i = 0; i < GRID_ROWS; i++) {
    grid[i] = [];
    for (let j = 0; j < GRID_COLS; j++) {
      let left =  marginX + j * cell;
      let top  = marginY + i * cell;
      grid[i][j] = new Cell(left, top, cell, cell, i, j);
    }
  }
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
  margin = MARGIN * Math.min(height, width);
  newgame();
}
