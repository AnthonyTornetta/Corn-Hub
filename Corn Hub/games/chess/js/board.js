"use strict";

class Board
{
  constructor()
  {
    this.board = new Array(BOARD_HEIGHT);

    this.selectedPiece =
    {
      x: -1,
      y: -1
    };

    for(let x = 0; x < BOARD_WIDTH; x++)
    {
      this.board[x] = new Array(BOARD_HEIGHT);
      for(let y = 0; y < BOARD_WIDTH; y++)
      {
        this.board[x][y] = new Tile(x, y, new Piece(x, y));
      }
    }
  }

  highlightTile(x, y, hl, obj)
  {
    if(obj === undefined)
      obj = this;
    if(!obj.within(x, y))
      return;

    obj.board[x][y].highlighted = hl;
  }

  isHighlighted(x, y)
  {
    return board[x][y].highlighted;
  }

  clearAllHighlights()
  {
    for(let x = 0; x < BOARD_WIDTH; x++)
    {
      for(let y = 0; y < BOARD_HEIGHT; y++)
      {
        this.highlightTile(x, y, false);
      }
    }
  }

  showAttackTile(x, y, at, obj)
  {
    if(obj === undefined)
      obj = this;
    if(!obj.within(x, y))
      return;
    if(obj.getTeam(x, y) == TEAM_NONE)
      return;
    obj.board[x][y].attackShown = at;
  }

  clearAllAttacks()
  {
    for(let x = 0; x < BOARD_WIDTH; x++)
    {
      for(let y = 0; y < BOARD_HEIGHT; y++)
      {
        this.showAttackTile(x, y, false);
      }
    }
  }

  selectTile(x, y, sel)
  {
    if(sel)
    {
      this.board[x][y].selected = true;
      this.selectedPiece.x = x;
      this.selectedPiece.y = y;
    }
    else
    {
      this.board[x][y].selected = false;
      this.selectedPiece.x = -1;
      this.selectedPiece.y = -1;
    }
  }

  isSelected(x, y)
  {
    return this.overlay[x][y] == MARKER_SELECTED;
  }

  hasSelectedPiece()
  {
    return !(this.selectedPiece.x == -1 && this.selectedPiece.y == -1)
  }

  getPiece(x, y)
  {
    return this.board[x][y].piece;
  }

  setPiece(x, y, piece)
  {
    this.board[x][y].piece = piece;
    piece.x = x;
    piece.y = y;
  }

  getTeam(x, y)
  {
    return this.getPiece(x, y).team;
  }

  within(x, y)
  {
    if(x >= 0 && x < BOARD_WIDTH)
      if(y >= 0 && y < BOARD_HEIGHT)
        return true;
    return false;
  }

  inMoveRange(x, y)
  {
    if(!this.within(x, y))
      return false;
    return this.board[x][y].highlighted;
  }

  selectedPieceMove(x, y)
  {
    if(!this.within(x, y))
      return false;

    if(x == this.selectedPiece.x && y == this.selectedPiece.y)
      return true;

    this.getPiece(this.selectedPiece.x, this.selectedPiece.y).x = x;
    this.getPiece(this.selectedPiece.x, this.selectedPiece.y).y = y;

    let prev = this.board[x][y];
    prev.x = this.selectedPiece.x;
    prev.y = this.selectedPiece.y;
    prev.piece.x = this.selectedPiece.x;
    prev.piece.y = this.selectedPiece.x;

    this.board[x][y] = this.board[this.selectedPiece.x][this.selectedPiece.y];
    this.board[x][y].x = x;
    this.board[x][y].y = y;
    this.board[x][y].piece.x = x;
    this.board[x][y].piece.y = y;
    this.board[x][y].selected = false;

    this.board[this.selectedPiece.x][this.selectedPiece.y] = prev;

    this.selectedPiece.x = -1;
    this.selectedPiece.y = -1;

    this.clearAllHighlights();
    this.clearAllAttacks();
    return true;
  }

  inAttackRange(x, y)
  {
    if(!this.within(x, y))
      return false;

    return this.board[x][y].attackShown;
  }

  selectedPieceAttack(x, y)
  {
    if(!this.within(x, y))
      return false;

    if(this.getPiece(x, y) instanceof Piece)
    {
      //return false;
    }

    this.board[x][y].piece = this.getPiece(this.selectedPiece.x, this.selectedPiece.y);
    this.board[x][y].piece.x = x;
    this.board[x][y].piece.y = y;
    this.board[this.selectedPiece.x][this.selectedPiece.y].piece = new Piece(this.selectedPiece.x, this.selectedPiece.y);
    this.clearAllAttacks();
    this.clearAllHighlights();
    this.selectTile(this.selectedPiece.x, this.selectedPiece.y, false);
    return true;
  }

  togglePiece(x, y)
  {
    if(!this.within(x, y))
      return;

    let cleared = false;
    if(this.hasSelectedPiece())
    {
      this.selectTile(this.selectedPiece.x, this.selectedPiece.y, false);
      this.clearAllHighlights();
      this.clearAllAttacks();
      cleared = true;
    }

    if(this.getTeam(x, y) == TEAM_NONE)
      return; // There is no piece there

    if(!this.hasSelectedPiece() && !cleared)
    {
      let movementPattern = this.getPiece(x, y).movePattern();
      let attackPattern   = this.getPiece(x, y).attackPattern();
      this.applyFunctionToTile(x, y, movementPattern, true, this.highlightTile);
      this.applyFunctionToTile(x, y, attackPattern  , true, this.showAttackTile);
      this.selectTile(x, y, true);
    }
  }

  applyFunctionToTile(pieceX, pieceY, pattern, hl, func)
  {
    let relX = 0;
    let relY = 0;
    let index = -1;

    for(let row = 0; row < pattern.length; row++)
    {
      let str = pattern[row];
      index = str.indexOf("#");
      if(index != -1)
      {
        relX = index;
        relY = row;
        break;
      }
    }

    for(let row = 0; row < pattern.length; row++)
    {
      let str = pattern[row];
      for(let i = 0; i < str.length; i++)
      {
        let c = str.charAt(i);

        // Itself or not a thing that should be applied to
        if(c == '#' || c == 'O')
          continue;

        if(c == 'X')
        {
          let xx = i - relX + pieceX;
          let yy = row - relY + pieceY;
          func(xx, yy, hl, this);
        }
      }
    }
  }

  draw(xOffset, yOffset, ctx)
  {
    for(let x = 0; x < BOARD_WIDTH; x++)
    {
      for(let y = 0; y < BOARD_WIDTH; y++)
      {
        this.board[x][y].draw(xOffset, yOffset, ctx);
      }
    }
  }
}
