class Piece
{
  constructor(startX, startY, team)
  {
    let noXY = false;
    if(!arguments.length)
    {
      team = startX;
      noXY = true;
    }

    if(new.target === Piece)
      this.team = TEAM_NONE;
    else
      this.team = team;

    if(!noXY)
    {
      this.x = startX;
      this.y = startY;
    }
    else
    {
      this.x = 0;
      this.y = y;
    }
  }

  draw(xOffset, yOffset, ctx)
  {} // Implement in child classes

  movePattern()
  {
    return ["#"];
  }
  attackPattern()
  {
    return ["#"];
  }
  getLevel()
  {
    return PIECE_NONE;
  }
  getTeam() { return this.team; }
}
