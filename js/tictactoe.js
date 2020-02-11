///////////////////// CONSTANTS /////////////////////////////////////

const winningConditions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];

///////////////////// APP STATE (VARIABLES) /////////////////////////
var clearapp = document.getElementById("whosturn");
let board;
let turn = "X";
let win;
let scoreX = 0;
let scoreO = 0;
///////////////////// CACHED ELEMENT REFERENCES /////////////////////

const squares = Array.from(document.querySelectorAll("#board div"));
const message = document.querySelector("h2");

///////////////////// EVENT LISTENERS ///////////////////////////////
document.getElementById("xfirst_bttn").onclick = xFirst;
document.getElementById("ofirst_bttn").onclick = oFirst;
window.onload = init;
document.getElementById("board").onclick = takeTurn;
document.getElementById("reset-button").onclick = init;

///////////////////// FUNCTIONS /////////////////////////////////////

function init() {
  board = ["", "", "", "", "", "", "", "", ""];
  turn = "X";
  win = null;

  render();
  document.getElementById("xfirst_bttn").style.visibility = "visible";
  document.getElementById("ofirst_bttn").style.visibility = "visible";
}

function render() {
  board.forEach(function(mark, index) {
    squares[index].textContent = mark;
  });

  message.textContent =
    win === "T" ? "It's a tie!" : win ? `${win} wins!` : `Turn: ${turn}`;
}

function takeTurn(e) {
  if (!win) {
    let index = squares.findIndex(function(square) {
      return square === e.target;
    });

    if (board[index] === "") {
      board[index] = turn;
      turn = turn === "X" ? "O" : "X";
      win = getWinner();

      render();
    }
  }
}

function getWinner() {
  let winner = null;

  winningConditions.forEach(function(condition, index) {
    if (
      board[condition[0]] &&
      board[condition[0]] === board[condition[1]] &&
      board[condition[1]] === board[condition[2]]
    ) {
      winner = board[condition[0]];
//Feature Request #1
    if (winner === "X") {
      scoreX++;
      document.getElementById('x-score').innerHTML = scoreX;
    } else {
      scoreO++;
      document.getElementById('o-score').innerHTML = scoreO;
    }
    }
  });

  return winner ? winner : board.includes("") ? null : "T";
}

//Feature Request #2
function xFirst() {
  init();
  document.getElementById("whosturn").innerHTML = "Turn: X";
  turn = "X";
  document.getElementById("xfirst_bttn").style.visibility = "hidden";
  document.getElementById("ofirst_bttn").style.visibility = "hidden";
}

function oFirst() {
  init();
  document.getElementById("whosturn").innerHTML = "Turn: O";
  turn = "O";
  document.getElementById("ofirst_bttn").style.visibility = "hidden";
  document.getElementById("xfirst_bttn").style.visibility = "hidden";
}
