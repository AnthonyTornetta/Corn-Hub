class Knight extends Piece
{
  constructor(startX, startY, team)
  {
    if(!arguments.length)
      super(startX);
    else
      super(startX, startY, team);
  }

  draw(xOffset, yOffset, ctx)
  {
    ctx.fillStyle = '#0F0';
    ctx.beginPath();

    let drawX = this.x * tileWidth + xOffset;
    let drawY = this.y * tileHeight + yOffset;

    if(TEAM_WHITE && WHITE_KNIGHT.complete)
      ctx.drawImage(WHITE_KNIGHT, drawX, drawY, tileWidth, tileHeight);
    else if(TEAM_BLACK && BLACK_KNIGHT.complete)
      ctx.drawImage(BLACK_KNIGHT, drawX, drawY, tileWidth, tileHeight);
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
    return PIECE_KNIGHT;
  }
}
