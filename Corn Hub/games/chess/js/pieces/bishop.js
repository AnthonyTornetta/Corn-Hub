class Bishop extends Piece
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

    if(TEAM_WHITE && WHITE_BISHOP.complete)
      ctx.drawImage(WHITE_BISHOP, drawX, drawY, tileWidth, tileHeight);
    else if(TEAM_BLACK && BLACK_BISHOP.complete)
      ctx.drawImage(BLACK_BISHOP, drawX, drawY, tileWidth, tileHeight);
  }

  movePattern()
  {
    return ["OOOOOOOX",
            "OOOOOOOX",
            "OOOOOOOX",
            "OOOOOOOX",
            "OOOOOOOX",
            "OOOOOOOX",
            "OOOOOOOX",
            "XXXXXXX#XXXXXXX",
            "OOOOOOOX",
            "OOOOOOOX",
            "OOOOOOOX",
            "OOOOOOOX",
            "OOOOOOOX",
            "OOOOOOOX",
            "OOOOOOOX"];
  }
  attackPattern()
  {
    return this.movePattern();
  }
  getLevel()
  {
    return PIECE_BISHOP;
  }
}
