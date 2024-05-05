var arr = [];
for (var i = 0; i < 9; i++) {
  arr[i] = [];
  for (var j = 0; j < 9; j++) {
    arr[i][j] = document.getElementById(i * 9 + j);
  }
}

var board = [];
function FillBoard(board) {
  for (var i = 0; i < 9; i++) {
    for (var j = 0; j < 9; j++) {
      if (board[i][j] !== 0) {
        arr[i][j].innerText = board[i][j];
      } else {
        arr[i][j].innerText = '';
      }
    }
  }
}

let GetPuzzle = document.getElementById('GetPuzzle');
let SolvePuzzle = document.getElementById('SolvePuzzle');

GetPuzzle.onclick = function () {
  var xhrRequest = new XMLHttpRequest();
  xhrRequest.onload = function () {
    var response = JSON.parse(xhrRequest.response);
    console.log(response);
    board = response.board;
    FillBoard(board);
  };
  xhrRequest.open('get', 'https://sugoku.herokuapp.com/board?difficulty=easy');
  // we can change the difficulty of the puzzle; the allowed values of difficulty are easy, medium, hard, and random
  xhrRequest.send();
};

SolvePuzzle.onclick = () => {
  SudokuSolver(board, 0, 0, 9);
};

function SudokuSolver(board, i, j, n) {
  if (i === n) {
    FillBoard(board);
    return true;
  }
  if (j === n) {
    return SudokuSolver(board, i + 1, 0, n);
  }
  if (board[i][j] !== 0) {
    return SudokuSolver(board, i, j + 1, n);
  }
  for (let num = 1; num <= n; num++) {
    if (isSafe(board, i, j, num, n)) {
      board[i][j] = num;
      if (SudokuSolver(board, i, j + 1, n)) {
        return true;
      }
      board[i][j] = 0;
    }
  }
  return false;
}

function isSafe(board, row, col, num, n) {
  for (let x = 0; x < n; x++) {
    if (board[row][x] === num || board[x][col] === num) {
      return false;
    }
  }
  let sqrtN = Math.sqrt(n);
  let startRow = row - (row % sqrtN);
  let startCol = col - (col % sqrtN);
  for (let i = 0; i < sqrtN; i++) {
    for (let j = 0; j < sqrtN; j++) {
      if (board[startRow + i][startCol + j] === num) {
        return false;
      }
    }
  }
  return true;
}
