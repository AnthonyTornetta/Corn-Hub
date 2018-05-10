class Pawn extends Piece
{
  constructor(startX, startY, team)
  {
    if(!arguments.length)
      super(startX);
    else
      super(startX, startY, team);
    this.didMove = false;
  }

  draw(xOffset, yOffset, ctx)
  {
    ctx.fillStyle = '#0F0';
    ctx.beginPath();

    let drawX = this.x * tileWidth + xOffset;
    let drawY = this.y * tileHeight + yOffset;

    if(TEAM_WHITE && WHITE_PAWN.complete)
      ctx.drawImage(WHITE_PAWN, drawX, drawY, tileWidth, tileHeight);
    else if(TEAM_BLACK && BLACK_PAWN.complete)
      ctx.drawImage(BLACK_PAWN, drawX, drawY, tileWidth, tileHeight);
  }

  movePattern()
  {
    if(!this.didMove)
    {
      return ["A",
              "A",
              "#"];
    }
    else
    {
      return ["X",
              "#"];
    }
  }
  attackPattern()
  {
    return ["XOX",
            "O#O"];
  }
  getLevel()
  {
    return PIECE_PAWN;
  }

  didMove() { this.didMove = true; }
}
