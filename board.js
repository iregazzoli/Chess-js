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

  show() {
    for (let i = 0; i < this.whitePieces.length; i++) {
      this.whitePieces[i].show();
    }

    for (let i = 0; i < this.blackPieces.length; i++) {
      this.blackPieces[i].show();
    }
  }

  showTakenPieces(canvasWhite, canvasBlack) {
    canvasWhite.background(120, 120, 120);
    canvasBlack.background(120, 120, 120);

    for (let i = 0; i < this.whiteTakenPieces.length; i++) {
      let x = (i * tileSize) / 2 + tileSize / 4;
      let y = tileSize / 4;
      this.whiteTakenPieces[i].showAt(canvasWhite, x, y);
    }

    for (let i = 0; i < this.blackTakenPieces.length; i++) {
      let x = (i * tileSize) / 2 + tileSize / 4;
      let y = tileSize / 4;
      this.blackTakenPieces[i].showAt(canvasBlack, x, y);
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
  //TODO: Change this to landing check landing Tile
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
        let index = arrayToSearch.indexOf(pieceAtDestination);
        if (index !== -1) {
          arrayToSearch.splice(index, 1);
          arrayToAdd.push(pieceAtDestination);
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
      let index = arrayToSearch.indexOf(pieceAtDestination);
      if (index !== -1) {
        arrayToSearch.splice(index, 1);
        arrayToAdd.push(pieceAtDestination);
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
      let index = arrayToSearch.indexOf(opposingPiece);
      if (index !== -1) {
        arrayToSearch.splice(index, 1);
        arrayToAdd.push(opposingPiece);
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
