"use strict";

class Tile
{
  constructor(x, y, piece)
  {
    this._x = x;
    this._y = y;
    this._piece = piece;

    this._highlighted = false;
    this._attackShown = false;
    this._selected = false;
  }

  set x(x) { this._x = x; }
  set y(y) { this._y = y; }

  get y() { return this._y; }
  get x() { return this._x; }

  get piece() { return this._piece; }
  set piece(piece) { this._piece = piece; }





  set attackShown(s) { this._attackShown = s; }
  get attackShown() { return this._attackShown; }

  set highlighted(h) { this._highlighted = h; }
  get highlighted() { return this._highlighted; }

  set selected(s) { this._selected = s; }
  get selected() { return this._selected; }

  draw(xOffset, yOffset, ctx)
  {
    let drawX = this.x * tileWidth + xOffset;
    let drawY = this.y * tileHeight + yOffset;

    // Alternate between the 2 colors when drawing
    if((this.x + this.y) % 2 == 0)
      ctx.fillStyle = '#12110F';
    else
      ctx.fillStyle = '#DEA26C';

    ctx.beginPath();
    ctx.fillRect(drawX, drawY, tileWidth, tileHeight);
    this.piece.draw(xOffset, yOffset, ctx);

    if(this.highlighted)
    {
      ctx.fillStyle = "rgba(255, 255, 255, 0.4)";
      ctx.fillRect(drawX, drawY, tileWidth, tileHeight);
    }
    if(this.selected)
    {
      ctx.fillStyle = "rgba(0, 100, 255, 0.3)";
      ctx.fillRect(drawX, drawY, tileWidth, tileHeight);
    }
    if(this.attackShown)
    {
      ctx.fillStyle = "rgba(255, 0, 0, 0.3)";
      ctx.fillRect(drawX, drawY, tileWidth, tileHeight);
    }
  }
}
