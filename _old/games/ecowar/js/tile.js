"use strict";

const TOWN_PLOT = new Image();
const TREE_PLOT = new Image();

TOWN_PLOT.src = 'sprites/town.png';
TREE_PLOT.src = 'sprites/tree.png';

const PEASANT_SPRITE = new Image();
const WARRIOR_SPRITE = new Image();
const ARCHER_SPRITE  = new Image();
const KNIGHT_SPRITE  = new Image();
PEASANT_SPRITE.src = 'sprites/peasant.png';
WARRIOR_SPRITE.src = 'sprites/warrior.png';
ARCHER_SPRITE.src  = 'sprites/archer.png';
KNIGHT_SPRITE.src  = 'sprites/knight.png';

const OBJECT_NONE = 0;
const OBJECT_PEASANT = 1;
const OBJECT_WARRIOR = 2;
const OBJECT_ARCHER  = 3;
const OBJECT_KNIGHT  = 4;
const MAX_TROOP_LVL = OBJECT_KNIGHT;

const OBJECT_HUT = 4;

const TRIBE_EMPTY = new Tribe(TRIBE_EMPTY_ID, '#333', 'Empty', 0);

class Tile
{
  constructor(x, y, width, height, tribe)
  {
    this.x = x;
    this.y = y;
    this.width  = width;
    this.height = height;
    this.town = false;
    this.tree = false;
    this.selected = false;
    this.object = OBJECT_NONE;
    this.went = false;

    if(tribe == undefined)
      this.tribe = TRIBE_EMPTY;
    else
      this.tribe = tribe;
  }

  draw(ctx, camera)
  {
    ctx.fillStyle = this.tribe.getColor();
    ctx.strokeStyle = '#000';

    let drawX = this.x + camera.xOffset;
    let drawY = this.y + camera.yOffset;

		let drawWidth = this.width;
		let drawHeight = this.height;

		ctx.fillRect(drawX, drawY, drawWidth, drawHeight);
    ctx.beginPath();
    ctx.lineWidth = '1';
    ctx.rect(drawX, drawY, drawWidth, drawHeight);
    ctx.stroke();

    if(this.isHighlighted())
    {
      ctx.fillStyle = 'rgba(255, 255, 255, 0.45)';
      ctx.fillRect(drawX, drawY, drawWidth, drawHeight);
    }

    if(this.isSelected())
    {
      ctx.fillStyle = 'rgba(255, 255, 255, 0.60)';
      ctx.fillRect(drawX, drawY, drawWidth, drawHeight);
    }

		if(this.hasTown() && TOWN_PLOT.complete)
		{
			ctx.drawImage(TOWN_PLOT, drawX, drawY, drawWidth, drawHeight);
		}

		if(this.hasTree() && TREE_PLOT.complete)
		{
			ctx.drawImage(TREE_PLOT, drawX, drawY, drawWidth, drawHeight);
		}

    switch(this.getObject())
    {
      case OBJECT_NONE:
        break;
      case OBJECT_PEASANT:
      {
        if(PEASANT_SPRITE.complete)
        {
          ctx.drawImage(PEASANT_SPRITE, drawX, drawY, drawWidth, drawHeight);
        }
        break;
      }
      case OBJECT_WARRIOR:
      {
        if(WARRIOR_SPRITE.complete)
        {
          ctx.drawImage(WARRIOR_SPRITE, drawX, drawY, drawWidth, drawHeight);
        }
        break;
      }
      case OBJECT_ARCHER:
      {
        if(ARCHER_SPRITE.complete)
        {
          ctx.drawImage(ARCHER_SPRITE, drawX, drawY, this.width, this.height);
        }
        break;
      }
      case OBJECT_KNIGHT:
      {
        if(KNIGHT_SPRITE.complete)
        {
          ctx.drawImage(KNIGHT_SPRITE, drawX, drawY, this.width, this.height);
        }
        break;
      }
    }
  }

  getTribe() { return this.tribe; }
  setTribe(tribe)
  {
    if(this.tribe.getId() == tribe.getId())
      return; // This is already that tribe
    if(this.tribe.getId() != TRIBE_EMPTY_ID)
      this.tribe.removeTile(this); // They just lost a tile
    this.tribe = tribe;
    this.tribe.addTile(this); // This person just gained a tile
  }

  hasGone() { return this.went; }
  setWent(w) { this.went = w; }

  hasTown() { return this.town; }
  setTown(t) { this.town = t; }

  isHighlighted() { return this.highlighted; }
  setHighlighted(hl) { this.highlighted = hl; }

  setSelected(s) { this.selected = s; }
  isSelected() { return this.selected; }

  hasTree() { return this.tree; }
  setTree(t)
  {
    if(t)
      if(this.getObject() != OBJECT_NONE || this.hasTown())
        return;
    this.tree = t;
  }

  getObject() { return this.object; }
  setObject(o)
  {
    if(o != OBJECT_NONE)
    {
      this.setTree(false);
    }
    this.object = o;
  }

  gainObject(o)
  {
    if(o == OBJECT_NONE)
    {
      console.log('Attempted to add nothing to a tile!');
      return false; // You can't add nothing to a thing, and return false to indicate that no money or consequences to player should take place (because it's nothing)
    }
    if(this.hasTown())
      return false; // You can't add an object to the town tile.

    if(o + this.getObject() <= MAX_TROOP_LVL)
    {
      this.setObject(o + this.getObject());
      return true; // Successfully added
    }
    return false; // Too high to be added
  }

  getTribeId() { return this.getTribe().getId(); }
}
