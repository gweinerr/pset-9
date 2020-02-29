// game parameters
const DELAY_COMP = 0.5; // seconds for the computer to take its turn
const GRID_CIRCLE = 0.7; // circle size as a fraction of cell size
const GRID_COLS = 7; // number of game columns
const GRID_ROWS = 6; // number of game rows
const MARGIN = 0.02; // margin as a fraction of the shortest screen dimension

// colors
const COLOR_BACKGROUND = "white";
const COLOR_COMP = "red";
const COLOR_COMP_DRK = "darkred";
const COLOR_FRAME = "dodgerblue";
const COLOR_FRAME_BUTT = "royalblue";
const COLOR_PLAY = "yellow";
const COLOR_PLAY_DRK = "olive";
const COLOR_TIE = "darkgrey";
const COLOR_TIE_DRK = "black";
const COLOR_WIN = "black";

// text
const TEXT_COMP = "Computer";
const TEXT_PLAY = "Player";
const TEXT_TIE = "DRAW";
const TEXT_WIN = "WINS!";

// classes
class Cell {
  constructor(left, top, w, h, row, col) {
      this.bot = top + h;
      this.left = left;
      this.right = left + w;
      this.top = top;
      this.w = w;
      this.h = h;
      this.row = row;
      this.col = col;
      this.cx = left + w / 2;
      this.cy = top + h / 2;
      this.r = w * GRID_CIRCLE / 2;
      this.highlight = null;
      this.owner = null;
      this.winner = false;
  }

  contains(x, y) {
      return x > this.left && x < this.right && y > this.top && y < this.bot;
  }

  // draw the circle or hole
  draw(ctx) {

  // owner color
  let color = this.owner == null ? COLOR_BACKGROUND : this.owner ? COLOR_PLAY : COLOR_COMP;

  // draw the circle
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.arc(this.cx, this.cy, this.r, 0, Math.PI * 2);
  ctx.fill();

  // draw highlighting
  if (this.winner || this.highlight != null) {

      // color
      color = this.winner ? COLOR_WIN : this.highlight ? COLOR_PLAY : COLOR_COMP;

      // draw a circle around the perimeter
      ctx.lineWidth = this.r / 4;
      ctx.strokeStyle = color;
      ctx.beginPath();
      ctx.arc(this.cx, this.cy, this.r, 0, Math.PI * 2);
      ctx.stroke();
      }
  }
}

// set up the canvas and context
var canv = document.createElement("canvas");
document.body.appendChild(canv);
var ctx = canv.getContext("2d");

// game variables
var gameOver, gameTied, grid = [], playersTurn, timeComp;

// dimensions
var height, width, margin;
setDimensions();

// event listeners
canv.addEventListener("click", click);
canv.addEventListener("mousemove", highlightGrid);
window.addEventListener("resize", setDimensions);

// game loop
var timeDelta, timeLast;
requestAnimationFrame(loop);

function loop(timeNow) {
  // initialize timeLast
  if (!timeLast) {
      timeLast = timeNow;
  }

  // calculate the time difference
  timeDelta = (timeNow - timeLast) / 1000; // seconds
  timeLast = timeNow;

  // update
  goComputer(timeDelta);

  // draw
  drawBackground();
  drawGrid();
  drawText();

  // call the next frame
  requestAnimationFrame(loop);
}

function checkWin(row, col) {

  // get all the cells from each direction
  let diagL = [], diagR = [], horiz = [], vert = [];
  for (let i = 0; i < GRID_ROWS; i++) {
      for (let j = 0; j < GRID_COLS; j++) {

          // horizontal cells
          if (i == row) {
              horiz.push(grid[i][j]);
          }

          // vertical cells
          if (j == col) {
              vert.push(grid[i][j]);
          }

          // top left to bottom right
          if (i - j == row - col) {
              diagL.push(grid[i][j]);
          }

          // top right to bottom left
          if (i + j == row + col) {
              diagR.push(grid[i][j]);
          }
      }
  }

  // if any have four in a row, return a win!
  return connect4(diagL) || connect4(diagR) || connect4(horiz) || connect4(vert);
}
