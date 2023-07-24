class Piece {
  constructor(x, y, isWhite, type) {
    this.matrixPosition = createVector(x, y);
    this.pixelPosition = createVector(
      x * tileSize + tileSize / 2,
      y * tileSize + tileSize / 2
    );

    this.taken = false;
    this.white = isWhite;
    let color = isWhite ? "W" : "B";
    this.image = loadImage(`assets/${color}${type}.png`);
    this.type = type;
    this.movingThisPiece = false;
    this.value = Piece.getPieceValue(this.type);
  }

  static getPieceValue(type) {
    switch (type) {
      case "King":
        return Infinity;
      case "Queen":
        return 9;
      case "Rook":
        return 5;
      case "Bishop":
      case "Knight":
        return 3;
      case "Pawn":
        return 1;
      default:
        return 0;
    }
  }

  show() {
    imageMode(CENTER);
    if (this.movingThisPiece) {
      image(this.image, mouseX, mouseY, tileSize * 1.5, tileSize * 1.5);
    } else {
      image(
        this.image,
        this.pixelPosition.x,
        this.pixelPosition.y,
        tileSize,
        tileSize
      );
    }
  }

  showAt(canvas, x, y) {
    console.log("here");
    canvas.imageMode(CENTER);
    canvas.image(this.image, x, y, tileSize / 2, tileSize / 2);
  }

  withinBounds(x, y) {
    if (x >= 0 && y >= 0 && x < 8 && y < 8) {
      return true;
    }
    return false;
  }

  // virtual methods
  canMove(x, y) {}

  move(x, y) {
    this.matrixPosition = createVector(x, y);
    this.pixelPosition = createVector(
      x * tileSize + tileSize / 2,
      y * tileSize + tileSize / 2
    );
  }
}

class King extends Piece {
  constructor(x, y, isWhite) {
    super(x, y, isWhite, "King");
  }

  canMove(x, y) {
    if (!this.withinBounds(x, y)) {
      return false;
    }

    if (
      abs(x - this.matrixPosition.x) <= 1 &&
      abs(y - this.matrixPosition.y) <= 1
    ) {
      // Check if the target square is occupied by another piece of the same color
      return board.checkDestinationTile(x, y, this);
    }
  }
}

class Queen extends Piece {
  constructor(x, y, isWhite) {
    super(x, y, isWhite, "Queen");
  }

  canMove(x, y) {
    if (!this.withinBounds(x, y)) {
      return false;
    }

    //diagonal movement
    if (abs(x - this.matrixPosition.x) == abs(y - this.matrixPosition.y)) {
      return board.isPathClear(
        this.matrixPosition.x,
        this.matrixPosition.y,
        x,
        y,
        this
      );
    }

    //horizontal movement
    if (this.matrixPosition.x == x || this.matrixPosition.y == y) {
      return board.isPathClear(
        this.matrixPosition.x,
        this.matrixPosition.y,
        x,
        y,
        this
      );
    }

    return false;
  }
}

class Bishop extends Piece {
  constructor(x, y, isWhite) {
    super(x, y, isWhite, "Bishop");
  }

  canMove(x, y) {
    if (!this.withinBounds(x, y)) {
      return false;
    }

    //diagonal movement
    if (abs(x - this.matrixPosition.x) == abs(y - this.matrixPosition.y)) {
      return board.isPathClear(
        this.matrixPosition.x,
        this.matrixPosition.y,
        x,
        y,
        this
      );
    }
  }
}

class Knight extends Piece {
  constructor(x, y, isWhite) {
    super(x, y, isWhite, "Knight");
  }

  canMove(x, y) {
    if (!this.withinBounds(x, y)) {
      return false;
    }

    if (
      (abs(x - this.matrixPosition.x) == 2 &&
        abs(y - this.matrixPosition.y) == 1) ||
      (abs(x - this.matrixPosition.x) == 1 &&
        abs(y - this.matrixPosition.y) == 2)
    ) {
      return board.checkDestinationTile(x, y, this);
    }
  }
}

class Rook extends Piece {
  constructor(x, y, isWhite) {
    super(x, y, isWhite, "Rook");
  }

  canMove(x, y) {
    if (!this.withinBounds(x, y)) {
      return false;
    }

    //horizontal movement
    if (this.matrixPosition.x == x || this.matrixPosition.y == y) {
      return board.isPathClear(
        this.matrixPosition.x,
        this.matrixPosition.y,
        x,
        y,
        this
      );
    }
  }
}

class Pawn extends Piece {
  constructor(x, y, isWhite) {
    super(x, y, isWhite, "Pawn");
    this.firstMovement = true;
    this.hasMoved = false;
  }

  move(x, y) {
    super.move(x, y);
    this.hasMoved = true;
  }

  canMove(x, y) {
    if (!this.withinBounds(x, y)) {
      return false;
    }

    if (x == this.matrixPosition.x + 1 || x == this.matrixPosition.x - 1) {
      if (
        (this.white && y == this.matrixPosition.y - 1) ||
        (!this.white && y == this.matrixPosition.y + 1)
      ) {
        return board.checkPawnAttackTarget(x, y, this);
      }
    }

    //can only move vertically if not attacking
    if (x != this.matrixPosition.x) {
      return false;
    }

    if (
      (this.white && y - this.matrixPosition.y == -1) ||
      (!this.white && y - this.matrixPosition.y == 1)
    ) {
      return board.checkPawnMovement(x, y);
    }

    //First movement
    if (
      this.firstMovement &&
      ((this.white && y - this.matrixPosition.y == -2) ||
        (!this.white && y - this.matrixPosition.y == 2))
    ) {
      return board.isPathClear(
        this.matrixPosition.x,
        this.matrixPosition.y,
        x,
        y,
        this
      );
    }
  }
}
