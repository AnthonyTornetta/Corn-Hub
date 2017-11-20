class Pawn extends Piece
{
  constructor(startX, startY, team)
  {
    super(startX, startY, team);

    this.didMove = false;
  }

  draw(xOffset, yOffset, ctx)
  {
    ctx.fillStyle = '#0F0';
    ctx.beginPath();
    if(WHITE_PAWN.complete)
      ctx.drawImage(WHITE_PAWN, this.x * tileWidth + xOffset, this.y * tileHeight + yOffset, tileWidth, tileHeight);
  }

  movePattern()
  {
    if(!this.didMove)
    {
      return ["X",
              "X",
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
