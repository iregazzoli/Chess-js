class Board {
  constructor() {
    this.whitePieces = [];
    this.blackPieces = [];

    this.whiteTakenPieces = [];
    this.blackTakenPieces = [];

    this.setupPieces();
  }

  setupPieces() {
    this.whitePieces.push(new King(3, 7, true));
    this.whitePieces.push(new Queen(4, 7, true));
    this.whitePieces.push(new Bishop(2, 7, true));
    this.whitePieces.push(new Bishop(5, 7, true));
    this.whitePieces.push(new Knight(1, 7, true));
    this.whitePieces.push(new Knight(6, 7, true));
    this.whitePieces.push(new Rook(0, 7, true));
    this.whitePieces.push(new Rook(7, 7, true));

    for (let i = 0; i < 8; i++) {
      this.whitePieces.push(new Pawn(i, 6, true));
    }

    this.blackPieces.push(new King(3, 0, false));
    this.blackPieces.push(new Queen(4, 0, false));
    this.blackPieces.push(new Bishop(2, 0, false));
    this.blackPieces.push(new Bishop(5, 0, false));
    this.blackPieces.push(new Knight(1, 0, false));
    this.blackPieces.push(new Knight(6, 0, false));
    this.blackPieces.push(new Rook(0, 0, false));
    this.blackPieces.push(new Rook(7, 0, false));

    for (let i = 0; i < 8; i++) {
      this.blackPieces.push(new Pawn(i, 1, false));
    }
  }

  resetPieces() {
    console.log("resetting pieces");
    this.whitePieces = [];
    this.blackPieces = [];
    this.whiteTakenPieces = [];
    this.blackTakenPieces = [];

    canvasWhiteTakenPieces.clear();
    canvasBlackTakenPieces.clear();
  }

  show() {
    for (let i = 0; i < this.whitePieces.length; i++) {
      this.whitePieces[i].show();
    }

    for (let i = 0; i < this.blackPieces.length; i++) {
      this.blackPieces[i].show();
    }
  }

  getLastImagePosition(takenPiecesArray) {
    if (takenPiecesArray.length === 0) {
      return { x: 0, y: 0 };
    }

    let lastPieceIndex = takenPiecesArray.length - 1;
    let x = (lastPieceIndex * tileSize) / 2 + tileSize / 4;
    let y = tileSize / 4;

    return { x, y };
  }

  showTakenPieces(canvasWhite, canvasBlack) {
    let someOffset = tileSize / 4;
    // canvasWhite.background(30, 28, 34);
    // canvasBlack.background(30, 28, 34);
    let lastImagePositionWhite, lastImagePositionBlack;

    let whiteScoreElement = document.getElementById("whiteScore");
    let blackScoreElement = document.getElementById("blackScore");

    let whiteScoreParentHeight = document.getElementById(
      "capturedWhitePieces"
    ).offsetHeight;
    let blackScoreParentHeight = document.getElementById(
      "capturedBlackPieces"
    ).offsetHeight;

    let canvasMiddleWhite = whiteScoreParentHeight / 3;
    let canvasMiddleBlack = blackScoreParentHeight / 3;

    let whiteScore = this.whiteTakenPieces.reduce(
      (total, piece) => total + piece.value,
      0
    );
    let blackScore = this.blackTakenPieces.reduce(
      (total, piece) => total + piece.value,
      0
    );

    if (whiteScore > 0) {
      for (let i = 0; i < this.whiteTakenPieces.length; i++) {
        let x = (i * tileSize) / 2 + tileSize / 4;
        let y = tileSize / 4;
        this.whiteTakenPieces[i].showAt(canvasWhite, x, y);
        lastImagePositionWhite = x;
      }
      whiteScoreElement.innerText = `+${whiteScore}`;
      whiteScoreElement.style.position = "absolute";
      whiteScoreElement.style.top = `${canvasMiddleWhite}px`;
      whiteScoreElement.style.left = `${lastImagePositionWhite + someOffset}px`;
    } else {
      whiteScoreElement.innerText = "";
    }

    if (blackScore > 0) {
      for (let i = 0; i < this.blackTakenPieces.length; i++) {
        let x = (i * tileSize) / 2 + tileSize / 4;
        let y = tileSize / 4;
        this.blackTakenPieces[i].showAt(canvasBlack, x, y);
        lastImagePositionBlack = x;
      }
      blackScoreElement.innerText = `+${blackScore}`;
      blackScoreElement.style.position = "absolute";
      blackScoreElement.style.top = `${canvasMiddleBlack}px`;
      blackScoreElement.style.left = `${lastImagePositionBlack + someOffset}px`;
    } else {
      blackScoreElement.innerText = "";
    }
  }

  isPieceAt(x, y) {
    for (var i = 0; i < this.whitePieces.length; i++) {
      if (
        !this.whitePieces[i].taken &&
        this.whitePieces[i].matrixPosition.x == x &&
        this.whitePieces[i].matrixPosition.y == y
      ) {
        return true;
      }
    }
    for (var i = 0; i < this.blackPieces.length; i++) {
      if (
        !this.blackPieces[i].taken &&
        this.blackPieces[i].matrixPosition.x == x &&
        this.blackPieces[i].matrixPosition.y == y
      ) {
        return true;
      }
    }
    return false;
  }

  getPieceAt(x, y) {
    for (var i = 0; i < this.whitePieces.length; i++) {
      if (
        !this.whitePieces[i].taken &&
        this.whitePieces[i].matrixPosition.x == x &&
        this.whitePieces[i].matrixPosition.y == y
      ) {
        return this.whitePieces[i];
      }
    }
    for (var i = 0; i < this.blackPieces.length; i++) {
      if (
        !this.blackPieces[i].taken &&
        this.blackPieces[i].matrixPosition.x == x &&
        this.blackPieces[i].matrixPosition.y == y
      ) {
        return this.blackPieces[i];
      }
    }
    return null;
  }

  isPathClear(startX, startY, endX, endY, piece) {
    let stepX = startX < endX ? 1 : startX > endX ? -1 : 0;
    let stepY = startY < endY ? 1 : startY > endY ? -1 : 0;

    startX += stepX;
    startY += stepY;

    while (startX != endX || startY != endY) {
      if (this.isPieceAt(startX, startY)) {
        return false;
      }
      startX += stepX;
      startY += stepY;
    }

    return this.checkDestinationTile(endX, endY, piece);
  }
  checkDestinationTile(x, y, piece) {
    // Check the landing tile
    let pieceAtDestination = this.getPieceAt(x, y);
    if (pieceAtDestination) {
      //Ally piece
      if (pieceAtDestination.white === piece.white) {
        return false;
      }
      //Enemy piece
      else if (pieceAtDestination.white !== piece.white) {
        //Take enemy piece
        let arrayToSearch = pieceAtDestination.white
          ? this.whitePieces
          : this.blackPieces;
        let arrayToAdd = pieceAtDestination.white
          ? this.whiteTakenPieces
          : this.blackTakenPieces;
        let scoreElement = pieceAtDestination.white
          ? document.getElementById("blackScore")
          : document.getElementById("whiteScore");

        let index = arrayToSearch.indexOf(pieceAtDestination);
        if (index !== -1) {
          arrayToSearch.splice(index, 1);
          arrayToAdd.push(pieceAtDestination);
          if (pieceAtDestination.white) {
            whiteScore += pieceAtDestination.value;
          } else {
            blackScore += pieceAtDestination.value;
          }
          scoreElement.textContent = pieceAtDestination.white
            ? whiteScore
            : blackScore;
        }
        return true;
      }
    }

    return true;
  }

  checkPawnAttackTarget(x, y, piece) {
    let pieceAtDestination = this.getPieceAt(x, y);
    if (pieceAtDestination && pieceAtDestination.white !== piece.white) {
      // Take enemy piece
      let arrayToSearch = pieceAtDestination.white
        ? this.whitePieces
        : this.blackPieces;
      let arrayToAdd = pieceAtDestination.white
        ? this.whiteTakenPieces
        : this.blackTakenPieces;
      let scoreElement = pieceAtDestination.white
        ? document.getElementById("blackScore")
        : document.getElementById("whiteScore");

      let index = arrayToSearch.indexOf(pieceAtDestination);
      if (index !== -1) {
        arrayToSearch.splice(index, 1);
        arrayToAdd.push(pieceAtDestination);
        if (pieceAtDestination.white) {
          whiteScore += pieceAtDestination.value;
        } else {
          blackScore += pieceAtDestination.value;
        }
        scoreElement.textContent = pieceAtDestination.white
          ? whiteScore
          : blackScore;
      }
      return true;
    }

    // Check for en passant
    if (piece.type === "Pawn" && this.checkEnpassant(x, y, piece)) {
      const opposingPieceX = x;
      const opposingPieceY = piece.matrixPosition.y;
      const opposingPiece = this.getPieceAt(opposingPieceX, opposingPieceY);

      // Remove the captured pawn
      let arrayToSearch = opposingPiece.white
        ? this.whitePieces
        : this.blackPieces;
      let arrayToAdd = opposingPiece.white
        ? this.whiteTakenPieces
        : this.blackTakenPieces;
      let scoreElement = opposingPiece.white
        ? document.getElementById("blackScore")
        : document.getElementById("whiteScore");

      let index = arrayToSearch.indexOf(opposingPiece);
      if (index !== -1) {
        arrayToSearch.splice(index, 1);
        arrayToAdd.push(opposingPiece);
        if (opposingPiece.white) {
          whiteScore += opposingPiece.value;
        } else {
          blackScore += opposingPiece.value;
        }
        scoreElement.textContent = opposingPiece.white
          ? whiteScore
          : blackScore;
      }
      return true;
    }

    return false;
  }

  checkPawnMovement(x, y) {
    let pieceAtDestination = this.getPieceAt(x, y);
    if (pieceAtDestination) {
      return false;
    }
    return true;
  }

  checkEnpassant(x, y, piece) {
    const yDirection = piece.white ? 1 : -1;
    const opposingPiece = board.getPieceAt(x, piece.matrixPosition.y);
    if (
      opposingPiece &&
      opposingPiece.type === "Pawn" &&
      opposingPiece.white !== piece.white &&
      opposingPiece.firstMovement
    ) {
      return (
        !board.getPieceAt(x, y) && y == piece.matrixPosition.y - yDirection
      );
    }
  }

  resetFirstMovementForPawns(color) {
    let pawnArray = color == "white" ? this.whitePieces : this.blackPieces;
    pawnArray.forEach((piece) => {
      if (piece.type === "Pawn" && piece.hasMoved) {
        piece.firstMovement = false;
        piece.hasMoved = false;
      }
    });
  }
}
