let canvasWhiteTakenPieces, canvasBlackTakenPieces;
let board;
let moving = false;
let tileSize = 100;
let whitesMoves = true;
let whiteScore = 0;
let blackScore = 0;

function setup() {
  let boardCanvas = createCanvas(800, 800);
  boardCanvas.parent("chessboard");
  boardCanvas.style("display", "block"); // Add this line

  canvasWhiteTakenPieces = createGraphics(800, 60);
  canvasWhiteTakenPieces.style("display", "block"); // And this line

  canvasBlackTakenPieces = createGraphics(800, 60);
  canvasBlackTakenPieces.style("display", "block"); // And this line

  let divWhiteTakenPieces = select("#capturedWhitePieces");
  let divBlackTakenPieces = select("#capturedBlackPieces");

  divWhiteTakenPieces.child(canvasWhiteTakenPieces.canvas);
  divBlackTakenPieces.child(canvasBlackTakenPieces.canvas);

  board = new Board();
}

function draw() {
  background(100);
  showGrid();
  board.show();
  board.showTakenPieces(canvasWhiteTakenPieces, canvasBlackTakenPieces);
}

function showGrid() {
  for (let i = 0; i < 8; i++) {
    for (let j = 0; j < 8; j++) {
      if ((i + j) % 2 == 0) {
        fill(0);
      } else {
        fill(150, 0, 0);
      }
      noStroke();
      rect(i * tileSize, j * tileSize, tileSize, tileSize);
    }
  }
}

function mousePressed() {
  //Reset pawns first move variable
  if (whitesMoves) {
    board.resetFirstMovementForPawns("white");
  } else {
    board.resetFirstMovementForPawns("black");
  }

  let x = floor(mouseX / tileSize);
  let y = floor(mouseY / tileSize);
  if (!moving) {
    movingPiece = board.getPieceAt(x, y);
    if (movingPiece != null && movingPiece.white == whitesMoves) {
      movingPiece.movingThisPiece = true;
    } else {
      return;
    }
  } else {
    if (movingPiece.canMove(x, y, board)) {
      movingPiece.move(x, y, board);
      movingPiece.movingThisPiece = false;
      whitesMoves = !whitesMoves;
    } else {
      movingPiece.movingThisPiece = false;
    }
  }
  moving = !moving;
}
