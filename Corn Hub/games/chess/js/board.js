var selectedPiece =
{
  x: -1,
  y: -1
};

class Board
{
  constructor()
  {
    this.board = new Array(BOARD_HEIGHT);
    this.overlay = new Array(BOARD_HEIGHT);

    for(let x = 0; x < BOARD_WIDTH; x++)
    {
      this.board[x] = new Array(BOARD_HEIGHT);
      this.overlay[x] = new Array(BOARD_HEIGHT);
      for(let y = 0; y < BOARD_WIDTH; y++)
      {
        this.board[x][y] = new Piece(x * tileWidth, y * tileHeight);
        this.overlay[x][y] = MARKER_NONE;
      }
    }

    this.board[3][4] = new Pawn(3, 4, TEAM_BLACK);
    console.log(this.board[3][4].movePattern());
  }

  highlightTile(x, y, hl, obj)
  {
    if(obj === undefined)
      obj = this;
    if(!obj.within(x, y))
    {
      console.log(`${x}, ${y} not within!`);
      return;
    }

    if(hl)
      obj.overlay[x][y] = MARKER_HIGHLIGHTED;
    else
      obj.overlay[x][y] = MARKER_NONE;
  }

  isHighlighted(x, y)
  {
    if(this.overlay[x][y] == MARKER_HIGHLIGHTED)
    {
      console.log(`${x}, ${y}`);
    }
    return this.overlay[x][y] == MARKER_HIGHLIGHTED;
  }

  showAttackTile(x, y, at, obj)
  {
    if(obj === undefined)
      obj = this;
    if(!obj.within(x, y))
    {
      console.log(`${x}, ${y} not within!`);
      return;
    }

    if(at)
      obj.overlay[x][y] = MARKER_ATTACK;
    else
      obj.overlay[x][y] = MARKER_NONE;
  }

  isAttackShown(x, y)
  {
    return this.overlay[x][y] == MARKER_ATTACK;
  }

  selectTile(x, y, sel)
  {
    if(sel)
      this.overlay[x][y] = MARKER_SELECTED;
    else
      this.overlay[x][y] = MARKER_NONE;
  }

  isSelected(x, y)
  {
    return this.overlay[x][y] == MARKER_SELECTED;
  }

  placePiece(x, y, piece, team)
  {
    this.board[x][y] = piece * team;
  }

  getTeam(x, y)
  {
    let piece = this.getPiece(x, y);

    return piece.getTeam();
  }

  within(x, y)
  {
    if(x >= 0 && x < BOARD_WIDTH)
      if(y >= 0 && y < BOARD_HEIGHT)
        return true;
    return false;
  }

  getPiece(x, y)
  {
    return this.board[x][y];
  }

  clickEvent(x, y)
  {
    if(selectedPiece.x == -1)
    {
      togglePiece(x, y);
      return;
    }
  }

  togglePiece(x, y)
  {
    if(!this.within(x, y))
      return;

    if(this.getTeam(x, y) == TEAM_NONE)
      return; // There is no piece there

    let selected = this.isSelected(x, y);
    let movementPattern = this.getPiece(x, y).movePattern();
    let attackPattern = this.getPiece(x, y).attackPattern();
    this.applyFunctionToTile(x, y, movementPattern, !selected, this.highlightTile);
    this.applyFunctionToTile(x, y, attackPattern, !selected, this.showAttackTile);

    this.selectTile(x, y, !selected);
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
        let drawX = x * tileWidth + xOffset;
        let drawY = y * tileHeight + yOffset;


        // Alternate between the 2 colors when drawing
        if((x + y) % 2 == 0)
          ctx.fillStyle = '#12110F';
        else
          ctx.fillStyle = '#DEA26C';

        ctx.beginPath();
        ctx.fillRect(drawX, drawY, tileWidth, tileHeight);
        this.getPiece(x, y).draw(xOffset, yOffset, ctx);

        if(this.isHighlighted(x, y))
        {
          ctx.fillStyle = "rgba(255, 255, 255, 0.4)";
          ctx.fillRect(drawX, drawY, tileWidth, tileHeight);
        }
        if(this.isSelected(x, y))
        {
          ctx.fillStyle = "rgba(0, 100, 255, 0.3)";
          ctx.fillRect(drawX, drawY, tileWidth, tileHeight);
        }
        if(this.isAttackShown(x, y))
        {
          ctx.fillStyle = "rgba(255, 0, 0, 0.3)";
          ctx.fillRect(drawX, drawY, tileWidth, tileHeight);
        }
      }
    }
  }
}
