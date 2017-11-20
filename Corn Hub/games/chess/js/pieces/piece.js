class Piece
{
  constructor(startX, startY, team)
  {
    if(new.target === Piece)
      this.team = TEAM_NONE;
    else
      this.team = team;

    this.x = startX;
    this.y = startY;

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
