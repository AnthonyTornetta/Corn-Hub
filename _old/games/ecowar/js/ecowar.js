"use strict";

var canvas, width, height, ctx;

const TREE_PROB = 80; // 1/TREE_PROB = chance of tree spawning
const TREE_SPRAD_PROB = 4;

// The size of the tiles array (Not to be confused with the individual tile width and height)
const BOARD_WIDTH  = 50;
const BOARD_HEIGHT = 50;
var tiles = Create2DArray(BOARD_WIDTH);
var objects = Create2DArray(BOARD_WIDTH);
var gui;

const TOWN_ICON = new Image();
const TREE_ICON = new Image();
const PEASANT_ICON = new Image();

// Tribe ids
const TRIBE_EMPTY  = 0;
const TRIBE_RED    = 1;
const TRIBE_GREEN  = 2;
const TRIBE_BLUE   = 3;
const TRIBE_PURPLE = 4;
const TRIBE_SEXY   = 5;
const TRIBE_21     = 21;

var money = 10;
var playerTileMoneyAmt = 0;

var playerTribe = TRIBE_SEXY;

var selectedItem = function() { return false; };

const OBJECT_NONE    = 0;
const OBJECT_PEASANT = 1;

var selectedSoldier = OBJECT_NONE;

var mouseDown = false;
var distMoved = 0.0; // For camera scrolling
var zoom = 0.0; // For zooming in & out

var mouse =
{
	x: undefined,
	y: undefined
}

var camera =
{
  xOffset: 0,
  yOffset: 0
}

function withinTiles(x, y)
{
  if(y >= 0 && y < tiles.length && x >= 0 && x < tiles[y].length)
		return true;
	return false;
}

function init()
{
	canvas = document.getElementById('canvas');
	width = window.innerWidth;
	height = window.innerHeight;
	canvas.width = width;
	canvas.height = height;
	ctx = canvas.getContext('2d');

	TOWN_ICON.src = 'sprites/town.png';
	TREE_ICON.src = 'sprites/tree.png';
	PEASANT_ICON.src = 'sprites/peasant.png';

	gui = new GUI();

	window.addEventListener('mousemove', function(evt)
	{
	  let xDist = mouse.x - evt.x;
	  let yDist = mouse.y - evt.y;

	  if(mouseDown)
	  {
	    distMoved += Math.sqrt(xDist * xDist + yDist * yDist);
	    camera.xOffset -= xDist;
	    camera.yOffset -= yDist;

	    camera.xOffset = clamp(camera.xOffset, -(tiles[0].length * TILE_HEIGHT - width), 0);
	    camera.yOffset = clamp(camera.yOffset, -(tiles.length * TILE_HEIGHT - height), 0);
	  }

		mouse.x = evt.x;
		mouse.y = evt.y;
	});

	window.addEventListener('mouseup', function(evt)
	{
	  mouseDown = false;
	  if(distMoved < Math.sqrt(TILE_WIDTH * TILE_WIDTH + TILE_HEIGHT * TILE_HEIGHT))
	  {
		   mouseUp(evt.x, evt.y);
	  }
	  distMoved = 0.0;
	});

	window.addEventListener('mousedown', function(evt)
	{
	  mouseDown = true;
	});

	window.addEventListener("contextmenu", function(e)
	{
	    e.preventDefault(); // Stop that annoying context menu from popping up & interrupting your emersion
	});

	createMap();
	var tribes = [ new Tribe(TRIBE_RED, 10), new Tribe(TRIBE_BLUE, 10), new Tribe(TRIBE_GREEN, 10), new Tribe(TRIBE_PURPLE, 10), new Tribe(TRIBE_SEXY, 10), new Tribe(TRIBE_21, 10) ];
	populateMap(tribes);

  render();
}

function drawTiles()
{
	for(var y = 0; y < BOARD_HEIGHT; y++)
	{
		for(var x = 0; x < BOARD_WIDTH; x++)
		{
			tiles[x][y].draw(ctx);
		}
	}
}

//////////////////////////////////////////
// Rendering/Drawing section
// Handles resizing of the window
//////////////////////////////////////////
window.onresize = function()
{
	resize();
	drawTiles();
}

function render()
{
  requestAnimationFrame(render);
	ctx.clearRect(0, 0, width, height);
  drawTiles();
	gui.draw(ctx, mouse);
}

function resize()
{
	width = window.innerWidth;
	height = window.innerHeight;
	canvas.width = width;
	canvas.height = height;

	gui.adjustGUI();
}

//////////////////////////////////////////
// Handles mouse events
//////////////////////////////////////////
function mouseUp(x, y)
{
	if(gui.overGUI(x, y))
	{
		gui.mouseUp(x, y);
		return;
	}
	var xIndex = Math.floor((x - camera.xOffset) / TILE_WIDTH);
	var yIndex = Math.floor((y - camera.yOffset) / TILE_HEIGHT);

  if(!withinTiles(xIndex, yIndex))
    return;

	if(selectedSoldier != OBJECT_NONE)
	{
		if(tiles[xIndex][yIndex].owner == playerTribe)
		{
			if(tiles[xIndex][yIndex].objOn == OBJECT_NONE)
			{
				if(money >= 10)
				{
					money -= 10;
					tiles[xIndex][yIndex].setObject(OBJECT_PEASANT);
					gui.updateText(0, '$' + money);
				}
			}
		}
		else
		{
			highlightAllTilesInTribe(playerTribe, false);
		}

		selectedSoldier = OBJECT_NONE;
	}

	if(!selectedItem(x, y))
	{
		let sx = selectedTile.x, sy = selectedTile.y;
		if(sx != -1 && sy != -1)
		{
			if(tiles[xIndex][yIndex].highlighted)
			{
				if(!(sx == xIndex && sy == yIndex))
				{
					tiles[xIndex][yIndex].setObject(tiles[sx][sy].objOn);
					tiles[sx][sy].objOn = OBJECT_NONE;
					tiles[xIndex][yIndex].setTribe (tiles[sx][sy].owner);
					if(tiles[xIndex][yIndex].tree)
					{
						if(tiles[xIndex][yIndex].owner == playerTribe)
							playerTileMoneyAmt++;
						tiles[xIndex][yIndex].setTree(false);
					}
					tiles[xIndex][yIndex].went = true;
					playerTileMoneyAmt++;
				}
			}
		}
		toggleSelected(xIndex, yIndex);
	}
}

// Flips to the next round
function nextRound()
{
	// TODO: Create AI to cycle through

	for(let y = 0; y < tiles.length; y++)
	{
		for(let x = 0; x < tiles[y].length; x++)
		{
			// Temporally use the went varible to see if a tree has already grown there
			// This is ok because the went var can only be used on tribes w/ objects, and trees aren't on those tiles
			if(tiles[x][y].tree && !tiles[x][y].went)
			{
				// Slight chance of spread of trees
				if(Math.random() * TREE_SPRAD_PROB > TREE_SPRAD_PROB - 1)
				{
					let xDir = Math.round(Math.random() * 2 - 1);
					let yDir = Math.round(Math.random() * 2 - 1);
					if(withinTiles(xDir + x, yDir + y))
					{
						if(!tiles[x + xDir][y + yDir].went)
						{
							if(tiles[x + xDir][y + yDir].treeSpawnable())
							{
								if(tiles[x + xDir][y + yDir].owner == playerTribe)
									playerTileMoneyAmt--;

								tiles[x + xDir][y + yDir].tree = true;
								tiles[x + xDir][y + yDir].went = true;
							}
						}
					}
				}
			}
			tiles[x][y].went = false;
		}
	}

	money += Math.round((playerTileMoneyAmt) / 4);
	gui.updateText(0, '$' + money);
}

//////////////////////////////////////////
// Util functions
//////////////////////////////////////////
function Create2DArray(rows)
{
  var arr = [rows];

  for (let i = 0; i < rows; i++)
	{
     arr[i] = [];
  }

  return arr;
}

function toggleSelected(x, y)
{
	highlightAllTilesInTribe(playerTribe, false);

  if(selectedTile.x != -1 && selectedTile.y != -1)
  {
    tiles[selectedTile.x][selectedTile.y].setSelected(false);
    selectedTile.x = -1;
    selectedTile.y = -1;
  }
  else
  {
		if(tiles[x][y].isSelectable(playerTribe) && !tiles[x][y].went)
		{
	    tiles[x][y].setSelected(true);
	    selectedTile.x = x;
	    selectedTile.y = y;
		}
  }
}

function highlightAllTilesInTribe(owner, hl)
{
	for(let y = 0; y < tiles.length; y++)
	{
		for(let x = 0; x < tiles[y].length; x++)
		{
			if(tiles[x][y].owner == owner)
			{
				tiles[x][y].setHighlighted(hl);
			}
		}
	}
}

function clamp(val, min, max)
{
  if(val < min)
    val = min;
  if(val > max)
    val = max;
  return val;
}

// Tile stuff with generating map and jazz

// Populates the map with randomly generated tribe areas
function populateMap(tribes)
{
	for(let i = 0; i < tribes.length; i++)
	{
		let next = false;
		let startingTiles = 9;
		let curX = Math.round(Math.random() * (BOARD_WIDTH - 1));
		let curY = Math.round(Math.random() * (BOARD_HEIGHT - 1));
		let plotsPlaced = 0;

		tiles[curX][curY].setTribe(tribes[i]);
		tiles[curX][curY].setTownTile(true);
		plotsPlaced++;

		for(let x = -1; x <= 1; x++)
		{
			for(let y = -1; y <= 1; y++)
			{
				let tX = curX + x;
				let tY = curY + y;
				if(withinTiles(tX, tY))
				{
					if(tiles[tX][tY].owner == TRIBE_EMPTY)
					{
						tiles[tX][tY].setTribe(tribes[i]);
						tiles[tX][tY].setTree(false);
						if(tribes[i] == playerTribe)
						{
							playerTileMoneyAmt++;
						}
					}
				}
			}
		}
	}
}

function createMap()
{
	console.log('creating map');
	let defaultTribe = new Tribe(TRIBE_EMPTY, 0);
	for(var y = 0; y < BOARD_HEIGHT; y++)
	{
		for(var x = 0; x < BOARD_WIDTH; x++)
		{
			console.log('aye1');
			tiles[x][y] = new Tile(false, x * TILE_WIDTH, y * TILE_HEIGHT, defaultTribe);
			if(Math.random() * TREE_PROB > TREE_PROB - 1)
			{
				tiles[x][y].setTree(true);
			}
			console.log('aye');
		}
	}
	console.log('map created');
}

function setObject(x, y, obj)
{
	if(withinTiles(x, y))
	{
		objects[x][y] = obj;
	}
}

////////////////////////////////////////////////////////////////////////////////////////////
/////////// Classes I wish I could make external but that is an upcoming feature ///////////
/////////// In the future, these will be made external & be neater               ///////////
/////////// But untill then, shove all classes down                              ///////////
////////////////////////////////////////////////////////////////////////////////////////////



class Tribe
{
	constructor(tribeId, startMoney)
	{
		this.tribeId = tribeId;
		switch(this.tribeId)
		{
			case TRIBE_EMPTY:
				this.color = '#111';
				break;
			case TRIBE_RED:
				this.color = '#ff7f7f';
				break;
			case TRIBE_GREEN:
				this.color = '#7fff7f';
				break;
			case TRIBE_BLUE:
				this.color = '#4d4dff';
				break;
			case TRIBE_PURPLE:
				this.color = '#60c';
				break;
			case TRIBE_SEXY:
				this.color = '#E0006C';
				break;
			case TRIBE_21:
				this.color = '#fff'
				break;
			default:
			  this.color = "#111";
				break;
		}
	}

	getId() { return this.tribeId; }
}




























/////////// Tile.js ///////////
// Dimensions of tiles to be displayed
const TILE_WIDTH  = 50;
const TILE_HEIGHT = 50;

// When selecting tiles within the range to move
const HIGHLIGHT_RADIUS = 4;

var selectedTile =
{
  x: -1,
  y: -1
}

class Tile
{
  constructor(town, x, y, tribe)
  {
    this.setTownTile(town);
		this.x = x;
		this.y = y;
		this.setSelected(false);
    this.setHighlighted(false);
		this.setTree(false);
    this.setObject(OBJECT_NONE);
		this.went = false;

		this.tribe = tribe;
		console.log(this.tribe);
	}

	draw(ctx)
	{
		ctx.fillStyle = this.color;
    ctx.strokeStyle = '#000';

    let drawX = this.x + camera.xOffset;
    let drawY = this.y + camera.yOffset;

		let drawWidth = TILE_WIDTH;
		let drawHeight = TILE_HEIGHT;

    if(drawX + drawWidth < 0 || drawX > width)
      return; // Don't draw because off the screen
    if(drawY + drawHeight < 0 || drawY > height)
      return;

		ctx.fillRect(drawX, drawY, TILE_WIDTH, TILE_HEIGHT);
    ctx.beginPath();
    ctx.lineWidth = '1';
    ctx.rect(drawX, drawY, TILE_WIDTH, TILE_HEIGHT);
    ctx.stroke();

    if(this.isHighlighted())
    {
      ctx.fillStyle = 'rgba(255, 255, 255, 0.45)';
      ctx.fillRect(drawX, drawY, drawWidth, drawHeight);
    }

		if(this.isTownTile() && TOWN_ICON.complete)
		{
			ctx.drawImage(TOWN_ICON, drawX, drawY, TILE_WIDTH, TILE_HEIGHT);
		}

		if(this.hasTree() && TREE_ICON.complete)
		{
			ctx.drawImage(TREE_ICON, drawX, drawY, TILE_WIDTH, TILE_HEIGHT);
		}

		switch(this.getObject())
		{
			case OBJECT_NONE:
				break;
			case OBJECT_PEASANT:
				if(PEASANT_ICON.complete)
					ctx.drawImage(PEASANT_ICON, drawX, drawY, TILE_WIDTH, TILE_HEIGHT);
				if(!this.went)
				{
					ctx.fillStyle = 'rgba(255, 255, 255, 0.3)'
					ctx.fillRect(drawX, drawY, TILE_WIDTH, TILE_HEIGHT);
				}
				break;
		}
	}

	setTownTile(town)
	{
		if(this.hasTree())
			this.setTree(false);
		this.town = town;
	}
	isTownTile() { return this.town; }

	setTree(tree)
	{
		if(this.town)
			return; // Don't make a town a tree
		this.tree = tree;
	}
	hasTree() { return this.tree; }
	treeSpawnable()
	{
		return !(this.town || this.tree || this.objOn != OBJECT_NONE);
	}

  highlightNearbyTiles(radius, hl)
  {
    for(let x = -radius; x <= radius; x++)
    {
      for(let y = -radius; y <= radius; y++)
      {
        let xx = this.x / TILE_WIDTH + x;
        let yy = this.y / TILE_HEIGHT + y;

        let distance = Math.sqrt((xx - this.x / TILE_WIDTH) * (xx - this.x / TILE_WIDTH) + (yy - this.y / TILE_HEIGHT) * (yy - this.y / TILE_HEIGHT));
        if(distance > radius)
          continue;
				if(withinTiles(xx, yy) && (tiles[xx][yy].getTribeId() == this.getTribeId() || tiles[xx][yy].nextTo(this.getTribeId())))
        	tiles[xx][yy].setHighlighted(hl);
      }
    }
  }

	nextTo(tribe)
	{
		let ix = this.x / TILE_WIDTH;
		let iy = this.y / TILE_HEIGHT;

		if(withinTiles(ix - 1, iy))
		{
			if(tiles[ix - 1][iy].getTribeId() == tribe)
			{
				return true;
			}
		}

		if(withinTiles(ix + 1, iy))
		{
			if(tiles[ix + 1][iy].getTribeId() == tribe)
			{
				return true;
			}
		}

		if(withinTiles(ix, iy - 1))
		{
			if(tiles[ix][iy - 1].getTribeId() == tribe)
			{
				return true;
			}
		}

		if(withinTiles(ix, iy + 1))
		{
			if(tiles[ix][iy + 1].getTribeId() == tribe)
			{
				return true;
			}
		}

		return false;
	}

  isSelectable(tribe)
  {
		if(this.getTribeId() != tribe)
			return false;
		if(this.getObject() == OBJECT_NONE)
			return false;
		return true;
  }
  setSelected(sel)
  {
    if(sel)
    {
      this.selected = true;
      this.highlightNearbyTiles(HIGHLIGHT_RADIUS, true);
    }
    else
    {
      this.selected = false;
      this.highlightNearbyTiles(HIGHLIGHT_RADIUS, false);
    }
  }
	isSelected() { return this.selected; }

	setObject(obj)
	{
		this.objOn = obj;
		if(obj != OBJECT_NONE && this.tree)
		{
			this.setTree(false);
			this.went = true; // You just cleared a tree, that is your move
		}
	}
	getObject() { return this.objOn; }

	setTribe(tribe) { this.tribe = tribe; console.log('tribe set');}
	getTribe()
	{
		console.log(this.tribe); return this.tribe;
	}
	getTribeId()
	{
		return this.tribe.getId();
	}

  setHighlighted(hl) { this.highlighted = hl; }
	isHighlighted() { return this.highlighted; }

	toString()
	{
		return `Tile @ ${this.x}, ${this.y}; Type ${this.type}; Selected ${this.selected}`;
	}
}

































/////////// Slot.js ///////////
class Slot
{
	constructor(x, y, width, height, image, onclick)
	{
		this.onclick = onclick;
		this.height = height;
		this.width  = width;
		this.image = image;

		if(y == -1)
		{
			this.y = 0;
			this.border = false;
		}
		else
		{
			this.y = y;
			this.border = true;
		}
		if(x == -1)
		{
			this.x = 0;
			this.circle = true;
		}
		else
		{
			this.x = x;
			this.circle = false;
		}
	}

	overSlot(x, y)
	{
		if(x >= this.x && x < this.width + this.x)
			if(y >= this.y && y < this.height + this.y)
				return true;
		return false;
	}

	activate()
	{
		this.onclick();
	}

	draw(ctx)
	{
		if(this.overSlot(mouse.x, mouse.y))
		{
			ctx.fillStyle = 'rgba(255, 255, 255, 0.2)';
			if(!this.circle)
				ctx.fillRect(this.x, this.y, this.width, this.height);
			else
			{
				ctx.beginPath();
				ctx.arc(this.x + this.width / 2, this.y + this.height / 2, (this.width + this.height) / 4 - 1, 0, 2 * Math.PI);
				ctx.fill();
				ctx.stroke();
			}
		}

		if(this.image.complete)
			ctx.drawImage(this.image, this.x, this.y, this.width, this.height);

		if(this.border)
		{
			ctx.strokeStyle = '#fff';
			ctx.beginPath();
			ctx.lineWidth = '1';
			ctx.rect(this.x, this.y, this.width, this.height);
			ctx.stroke();
		}
	}
}


const TYPE_CENTER = 2;
const TYPE_RIGHT  = 1;
const TYPE_LEFT   = 0;

class TextBox
{
	constructor(x, y, width, height, text, type)
	{
		this.height = height;
		this.width  = width;
		this.text = text;
		this.type = type;

		this.y = y;
		this.x = x;
	}

	overSlot(x, y)
	{
		if(x >= this.x && x < this.width + this.x)
			if(y >= this.y && y < this.height + this.y)
				return true;
		return false;
	}

	draw(ctx)
	{
		ctx.font = '36px helvetica';
		ctx.textAlign = 'center';

		ctx.fillStyle = '#fff';

		switch(this.type)
		{
			case TYPE_CENTER:
			{
				let center = width / 2;
				this.x = center - this.getWidth() / 2;
				break;
			}
			case TYPE_RIGHT:
			{
				this.x = 20;
				break;
			}
			case TYPE_LEFT:
			{
				this.x = width - (this.getWidth() + 20);
				break;
			}
			default:
				break;
		}

		ctx.fillText(this.text, this.x + this.width / 2 + 2, this.y + this.getHeight());
	}

	getMetrics()
	{
		ctx.font = '36px menlo helvetica';
		ctx.textAlign = 'center';
		return ctx.measureText(this.text);
	}

	getHeight()
	{
		return 40;
	}

	getWidth()
	{
		return this.getMetrics().width;
	}

	updateText(txt)
	{
		this.text = txt;
	}
}






















/////////// GUI.js ///////////
const NEXT_ICON = new Image();
NEXT_ICON.src = 'sprites/next.png';

const UNDO_ICON = new Image();
UNDO_ICON.src = 'sprites/back.png';

var SLOT_WIDTH = 50;
var SLOT_HEIGHT = 50;
var SLOT_PADDING = 20;

class GUI
{
	constructor()
	{
		this.text =
		[
			new TextBox(0, 0, SLOT_WIDTH, SLOT_HEIGHT, '$' + money, TYPE_CENTER)
		];

		// Set x & y to 0 or -1 because they are set in the this.adjustGUI() function
		// -1 x = draw a circle when hover over
		// -1 y = don't draw a rectangle border around it (good for circles)
		// Any other x = draw a rectangle when hover over
		// Any other y = draw a border around it
		this.slots =
		[
			new Slot(-1, -1, SLOT_WIDTH, SLOT_HEIGHT, UNDO_ICON, function()
			{
				console.log('undo');
			}),
			new Slot(-1, -1, SLOT_WIDTH, SLOT_HEIGHT, NEXT_ICON, function()
			{
				nextRound();
			}),
			new Slot(0, 0, SLOT_WIDTH, SLOT_HEIGHT, PEASANT_ICON, function()
			{
				if(money >= 10)
				{
					selectedSoldier = OBJECT_PEASANT;
					highlightAllTilesInTribe(playerTribe, true);
				}
			}),
			new Slot(0, 0, SLOT_WIDTH, SLOT_HEIGHT, TOWN_ICON, function()
			{
				console.log('house');
			})
		];

		this.adjustGUI();
	}

	adjustGUI()
	{
		this.slots[0].x = SLOT_PADDING;
		this.slots[0].y = height - (SLOT_HEIGHT + SLOT_PADDING);

		this.slots[1].x = width - (SLOT_WIDTH + SLOT_PADDING);
		this.slots[1].y = height - (SLOT_HEIGHT + SLOT_PADDING);

		this.slots[2].x = (width - SLOT_WIDTH) / 2 - SLOT_WIDTH;
		this.slots[2].y = height - (SLOT_HEIGHT + SLOT_PADDING);

		this.slots[3].x = (width - SLOT_WIDTH) / 2 + SLOT_WIDTH;
		this.slots[3].y = height - (SLOT_HEIGHT + SLOT_PADDING);



		this.text[0].x = width / 2 - SLOT_WIDTH / 2;
		this.text[0].y = 20;
	}

	draw(ctx)
	{
		for(let i = 0; i < this.slots.length; i++)
		{
			this.slots[i].draw(ctx);
		}

		for(let i = 0; i < this.text.length; i++)
		{
			this.text[i].draw(ctx);
		}
	}

	overGUI(x, y)
	{
		for(let i = 0; i < this.slots.length; i++)
		{
			if(this.slots[i].overSlot(x, y))
				return true;
		}
		return false;
	}

	mouseUp(x, y)
	{
		for(let i = 0; i < this.slots.length; i++)
		{
			if(this.slots[i].overSlot(x, y))
			{
				this.slots[i].activate();
				return;
			}
		}
	}

	updateText(i, txt)
	{
		this.text[i].updateText(txt);
	}
}






// Keep at bottom so everything loads first
window.onload = function()
{
	init();
}
