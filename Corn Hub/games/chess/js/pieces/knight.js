class Knight extends Piece
{
  constructor(startX, startY, team)
  {
    super(startX, startY, team);
  }

  draw(xOffset, yOffset, ctx)
  {
    ctx.fillStyle = '#0F0';
    ctx.beginPath();
    if(WHITE_KNIGHT.complete)
      ctx.drawImage(WHITE_KNIGHT, this.x * tileWidth + xOffset, this.y * tileHeight + yOffset, tileWidth, tileHeight);
  }

  movePattern()
  {
    return ["OXOXO",
            "XOOOX",
            "OO#OO",
            "XOOOX",
            "OXOXO"];
  }
  attackPattern()
  {
    return this.movePattern();
  }
  getLevel()
  {
    return PIECE_PAWN;
  }
}
