"use strict";

var canvas, width, height, ctx;

const BOARD_WIDTH  = 40;
const BOARD_HEIGHT = 40;
const TILE_WIDTH   = 50;
const TILE_HEIGHT  = 50;

const TREE_PROB = 90; // 1/TREE_PROB = probability of a tree on a tile
const TREE_SPREAD_PROB = 10; // 1/TREE_SPREAD_PROB = probability of a tree spreading

const COST_PER_SOLDIER = 10;

var tiles = create2DArray(BOARD_WIDTH);
var moves = [];

var gui;

var mouseDown = false;
var distMoved = 0;

var players =
[
  new Tribe(TRIBE_PINK_ID, TRIBE_PINK_COLOR, "Soul Bossa", COST_PER_SOLDIER * 100),
  new Tribe(TRIBE_BLUE_ID, TRIBE_BLUE_COLOR, "Nova", COST_PER_SOLDIER * 100)
];

var currentTribe = 0;
var selectedObject = OBJECT_NONE;

var mouse =
{
  x: undefined,
  y: undefined
};

var camera =
{
  xOffset: 0,
  yOffset: 0,
};

var selectedTile =
{
  x: -1,
  y: -1
};

function txtSize(ctx, txt)
{

}

function init()
{
  canvas = document.getElementById('canvas');
	width = window.innerWidth;
	height = window.innerHeight;
	canvas.width = width;
	canvas.height = height;
	ctx = canvas.getContext('2d');

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

  // Prevent scrolling when touching the canvas & touch screen support
  document.body.addEventListener("touchstart", function (evt)
  {
    mouseDown = true;
    e.preventDefault();
  }, false);
  document.body.addEventListener("touchend", function (evt)
  {
    mouseDown = false;
    if(distMoved < Math.sqrt(TILE_WIDTH * TILE_WIDTH + TILE_HEIGHT * TILE_HEIGHT))
    {
       mouseUp(evt.changedTouches[0].clientX, evt.changedTouches[0].clientY);
    }
    distMoved = 0.0;

    e.preventDefault();
  }, false);

  document.body.addEventListener("touchmove", function (evt)
  {
    let tx = evt.changedTouches[0].clientX;
    let ty = evt.changedTouches[0].clientY;

    let xDist = mouse.x - tx;
	  let yDist = mouse.y - ty;

	  if(mouseDown)
	  {
	    distMoved += Math.sqrt(xDist * xDist + yDist * yDist);
	    camera.xOffset -= xDist;
	    camera.yOffset -= yDist;

	    camera.xOffset = clamp(camera.xOffset, -(tiles[0].length * TILE_HEIGHT - width), 0);
	    camera.yOffset = clamp(camera.yOffset, -(tiles.length * TILE_HEIGHT - height), 0);
	  }

		mouse.x = tx;
		mouse.y = ty;
    e.preventDefault();
  }, false);

  canvas.addEventListener("contextmenu", function(e)
  {
      e.preventDefault(); // Stop that annoying context menu from popping up & interrupting your immersion
  });

  canvas.addEventListener('mousewheel', function(e)
  {
    // cross-browser wheel delta
		var e = window.event || e;
		var delta = Math.max(-1, Math.min(1, (e.wheelDelta || -e.detail)));
  }, false);

  canvas.addEventListener("DOMMouseScroll", function(e)
  {
    // cross-browser wheel delta
		var e = window.event || e;
		var delta = Math.max(-1, Math.min(1, (e.wheelDelta || -e.detail)));
    console.log(delta);
    camera.zoom += delta / 2;
  }, false);

  createMap();
  createGUI();

  render();

  centerCameraOnTribe(getCurrentPlayer().getId());
}

/// Map Gen
function createMap()
{
  for(let y = 0; y < BOARD_HEIGHT; y++)
  {
    for(let x = 0; x < BOARD_WIDTH; x++)
    {
      tiles[x][y] = new Tile(x * TILE_WIDTH, y * TILE_HEIGHT, TILE_WIDTH, TILE_HEIGHT);
      if(Math.random() * TREE_PROB > TREE_PROB - 1)
      {
        tiles[x][y].setTree(true);
      }
    }
  }

  populateMap();
}

function populateMap()
{
  for(let i = 0; i < players.length; i++)
  {
    let x = Math.round(Math.random() * (BOARD_WIDTH - 1));
    let y = Math.round(Math.random() * (BOARD_HEIGHT - 1));

    tiles[x][y].setTribe(getCurrentPlayer());
    tiles[x][y].setTown(true);
    for(let xx = -1; xx <= 1; xx++)
    {
      for(let yy = -1; yy <= 1; yy++)
      {
        if(withinTiles(x + xx, y + yy))
        {
          tiles[x + xx][y + yy].setTribe(players[i]);
          tiles[x + xx][y + yy].setTree(false);
        }
      }
    }
  }
}

/// Tile Interactment
function toggleSelected(x, y)
{
  if(selectedTile.x == -1 && selectedTile.y == -1)
  {
    if(tiles[x][y].getTribeId() == getCurrentPlayer().getId())
    {
      if(tiles[x][y].getObject() != OBJECT_NONE && !tiles[x][y].hasGone())
      {
        tiles[x][y].setSelected(true);
        highlightNearbyTiles(x, y, getCurrentPlayer().getId(), 4, true);
        selectedTile.x = x;
        selectedTile.y = y;
      }
    }
  }
  else
  {
    let selx = selectedTile.x;
    let sely = selectedTile.y;

    if(tiles[x][y].isHighlighted() && !tiles[x][y].isSelected()) // If it's selected, the dude's already on it
    {
      let obj = tiles[selx][sely].getObject();
      if(tiles[x][y].getTribeId() != tiles[selx][sely].getTribeId())
      {
        if(getTileLevel(x, y) < obj || obj == MAX_TROOP_LVL)
        {
          moves.push(new Move(generateMoveCode(x, y, selx, sely, obj, tiles[x][y].getTribeId(), tiles[x][y].hasTree())));
          tiles[x][y].setTribe(tiles[selx][sely].getTribe());
          tiles[x][y].setObject(obj);
          tiles[selx][sely].setObject(OBJECT_NONE);
          tiles[x][y].setWent(true);
        }
      }
      else
      {
        if(tiles[x][y].gainObject(obj))
        {
          moves.push(new Move(generateMoveCode(x, y, selx, sely, obj, tiles[x][y].getTribeId(), tiles[x][y].hasTree())));
          tiles[selx][sely].setObject(OBJECT_NONE);
          // If the tile hasn't gone yet, and your just combining troops, still allow that tile to go
          if(tiles[x][y].hasGone() || tiles[x][y].getObject() == obj)
          {
            tiles[x][y].setWent(true);
          }
        }
      }
    }
    tiles[selx][sely].setSelected(false);
    highlightNearbyTiles(selx, sely, getCurrentPlayer().getId(), 4, false);
    selectedTile.x = -1;
    selectedTile.y = -1;
  }
}

function highlightNearbyTiles(x, y, tribeId, radius, hl)
{
  let rdius = Math.round(radius / 2);
  for(let yy = -radius; yy <= radius; yy++)
  {
    for(let xx = -radius; xx <= radius; xx++)
    {
      let ix = x + xx;
      let iy = y + yy;

      if(!withinTiles(ix, iy))
        continue;

      if(hl && tiles[ix][iy].getTribeId() != tribeId)
      {
        if(getTileLevel(ix, iy) >= tiles[x][y].getObject() && tiles[x][y].getObject != MAX_TROOP_LVL)
        {
          continue; // You can't move here
        }
      }

      let xIndex = x + xx;
      let yIndex = y + yy;

      let dist = Math.sqrt((xIndex - x) * (xIndex - x) + (yIndex - y) * (yIndex - y));

      if(dist > radius)
        continue;

      if(nextTo(tribeId, ix, iy))
      {
        tiles[ix][iy].setHighlighted(hl);
      }
    }
  }
}

function getTileLevel(x, y)
{
  if(!withinTiles(x, y))
    return -1;

  let tribeId = tiles[x][y].getTribeId();

  let maxLvl = 0;
  for(let xx = -1; xx <= 1; xx++)
  {
    for(let yy = -1; yy <= 1; yy++)
    {
      let nx = x + xx, ny = y + yy;
      if(withinTiles(nx, ny))
      {
        if(tiles[nx][ny].getTribeId() == tribeId)
        {
          let obj = tiles[nx][ny].getObject();
          if(obj < OBJECT_HUT)
          {
            if(obj > maxLvl)
            {
              maxLvl = obj;
            }
          }
        }
      }
    }
  }

  return maxLvl;
}

// Sets the current item the player is holding
function setCurrentItem(item)
{
  selectedObject = item;
}

// Checks if a specified tile is next to a tile in a specified tribe (by id)
function nextTo(tribe, x, y)
{
  if(withinTiles(x - 1, y))
  {
    if(tiles[x - 1][y].getTribeId() == tribe)
    {
      return true;
    }
  }

  if(withinTiles(x + 1, y))
  {
    if(tiles[x + 1][y].getTribeId() == tribe)
    {
      return true;
    }
  }

  if(withinTiles(x, y - 1))
  {
    if(tiles[x][y - 1].getTribeId() == tribe)
    {
      return true;
    }
  }

  if(withinTiles(x, y + 1))
  {
    if(tiles[x][y + 1].getTribeId() == tribe)
    {
      return true;
    }
  }

  return false;
}

/// Round progression

function cycleThruPlayers()
{
  let returnMe = false;
  moves.length = 0; // Beleive it or not, the fastest way to clear an array (who woulda thunk!) (http://jsben.ch/hyj65)
  highlightNearbyTiles(selectedTile.x, selectedTile.y, getCurrentPlayer().getId(), 4, false);
  if(currentTribe + 1 >= players.length)
  {
    currentTribe = 0;
    returnMe = true;
  }
  else
  {
    currentTribe++;
    returnMe = false;
  }

  gui.updateText();
  gui.deactivate();
  selectedObject = OBJECT_NONE;

  centerCameraOnTribe(getCurrentPlayer().getId());

  return returnMe;
}

function centerCameraOnTribe(id)
{
  for(let y = 0; y < tiles.length; y++)
  {
    for(let x = 0; x < tiles[y].length; x++)
    {
      if(tiles[x][y].getTribeId() == id && tiles[x][y].hasTown())
      {
        camera.xOffset = -(x * TILE_WIDTH - (width / 2));
        camera.yOffset = -(y * TILE_HEIGHT - (height / 2));
        camera.xOffset = clamp(camera.xOffset, -(BOARD_WIDTH * TILE_HEIGHT - width), 0);
  	    camera.yOffset = clamp(camera.yOffset, -(BOARD_HEIGHT * TILE_HEIGHT - height), 0);
        break;
      }
    }
  }
}

function nextRound()
{
  let tribesDied = [];
  let tribesDiedIndex = 0;
  for(let i = 0; i < players.length; i++)
  {
    if(!players[i].nextRound())
    {
      tribesDied[tribesDiedIndex] = players[i].getId();
      players[i].setMoney(0); // Reset their balance to $0
    }
  }

  // Tree spreading
  for(let y = 0; y < tiles.length; y++)
  {
    for(let x = 0; x < tiles[y].length; x++)
    {
      if(tiles[x][y].hasTree() && !tiles[x][y].hasGone())
      {
        if(Math.random() * TREE_SPREAD_PROB > TREE_SPREAD_PROB - 1)
        {
          let xDir = Math.round(Math.random() * 2 - 1) + x; // 2 directions x can spread in
          let yDir = Math.round(Math.random() * 2 - 1) + y; // 2 directions y can spread in
          if(withinTiles(xDir, yDir))
          {
            if(!tiles[xDir][yDir].hasTree())
            {
              tiles[xDir][yDir].setWent(true);
              tiles[xDir][yDir].setTree(true);
            }
          }
        }
      }
    }
  }

  // Overall cleanup
  for(let y = 0; y < tiles.length; y++)
  {
    for(let x = 0; x < tiles[y].length; x++)
    {
      tiles[x][y].setWent(false);
      for(let i = 0; i < tribesDied.length; i++)
      {
        if(tiles[x][y].getTribeId() == tribesDied[i])
        {
          tiles[x][y].setObject(OBJECT_NONE);
        }
      }
    }
  }

  gui.updateText();
}

function undoLastMove()
{
  if(moves.length == 0)
    return; // No moves left to undo

  let lastMove = moves.pop(); // Take out the last move of the array (since we're undoing it) and store it

  switch(lastMove.type)
  {
    case TYPE_NEW_OBJECT:
    {
      let x = lastMove.newX;
      let y = lastMove.newY;
      let obj = lastMove.obj;
      let hadTree = lastMove.killedTree;

      tiles[x][y].setObject(tiles[x][y].getObject() - obj);
      tiles[x][y].setTree(hadTree);
      getCurrentPlayer().addMoney(COST_PER_SOLDIER);
      break;
    }
    case TYPE_MOVE_OBJECT:
    {
      let fromX = lastMove.oldX;
      let fromY = lastMove.oldY;
      let toX = lastMove.newX;
      let toY = lastMove.newY;
      let obj = lastMove.obj;
      let prevTribe = lastMove.prevTileTribe;
      let killedTree = lastMove.killedTree;

      tiles[toX][toY].setObject(tiles[toX][toY].getObject() - obj);
      tiles[toX][toY].setTree(killedTree);
      console.log(killedTree);
      if(tiles[toX][toY].getTribeId() !== prevTribe)
      {
        tiles[toX][toY].setTribe(findTribeWithId(prevTribe));
      }
      tiles[fromX][fromY].setObject(obj);
      tiles[fromX][fromY].setWent(false);
      break;
    }
  }

  gui.updateText();
}

/// Drawing to the screen

// Creates the initial gui
function createGUI()
{
  const TOWN_ICON    = new Image();
  const TREE_ICON    = new Image();
  const PEASANT_ICON = new Image();

  TOWN_ICON.src = 'sprites/town.png';
  TREE_ICON.src = 'sprites/tree.png';
  PEASANT_ICON.src = 'sprites/peasant.png';

  let text =
  [
    new TextBox(0, 0, SLOT_WIDTH, SLOT_HEIGHT, function() { return '$' + getCurrentPlayer().money }, TYPE_CENTER)
  ];

  // Set x & y to 0 or -1 because they are set in the this.adjustGUI() function
  // -1 x = draw a circle when hover over
  // -1 y = don't draw a rectangle border around it (good for circles)
  // Any other x = draw a rectangle when hover over
  // Any other y = draw a border around it
  let slots =
  [
    new Slot(-1, -1, SLOT_WIDTH, SLOT_HEIGHT, UNDO_ICON, undoLastMove),
    new Slot(-1, -1, SLOT_WIDTH, SLOT_HEIGHT, NEXT_ICON, function()
    {
      if(cycleThruPlayers())
        nextRound();
    }),
    new Slot(0, 0, SLOT_WIDTH, SLOT_HEIGHT, PEASANT_ICON, function()
    {
      setCurrentItem(OBJECT_PEASANT);
    }),
    new Slot(0, 0, SLOT_WIDTH, SLOT_HEIGHT, TOWN_ICON, function()
    {
      console.log('house');
    })
  ];

  gui = new GUI(text, slots);

  gui.updateText();

  //centerCameraOnTribe(getCurrentPlayer().getId());
}

// Draws the tiles to the screen
function drawTiles()
{
	for(var y = 0; y < BOARD_HEIGHT; y++)
	{
		for(var x = 0; x < BOARD_WIDTH; x++)
		{
      let drawX = x * TILE_WIDTH;
      let drawY = y * TILE_HEIGHT;

      //Draw the tiles, but not the ones off the screen
      if(drawX + TILE_WIDTH > -camera.xOffset && drawX < -camera.xOffset + width)
      {
        if(drawY + TILE_HEIGHT > -camera.yOffset && drawY < -camera.yOffset + height)
        {
          tiles[x][y].draw(ctx, camera);
        }
      }
		}
	}
}

// Renders everything to the screen
function render()
{
  requestAnimationFrame(render);

	ctx.clearRect(0, 0, width, height);
  drawTiles();
	gui.draw(ctx, mouse);
}

// Handles the window resizing & calls appropriate functions to compensate
window.onresize = function()
{
  width = window.innerWidth;
	height = window.innerHeight;
	canvas.width = width;
	canvas.height = height;

	gui.adjustGUI();
}

/// Handle IO
function mouseUp(x, y)
{
  // Deal w/ gui
  if(gui.mouseUp(x, y))
  {
    if(selectedTile.x != -1 && selectedTile.y != -1)
    {
      tiles[selectedTile.x][selectedTile.y].setSelected(false);
      highlightNearbyTiles(selectedTile.x, selectedTile.y, getCurrentPlayer().getId(), 4, false);
      selectedTile.x = -1;
      selectedTile.y = -1;
    }
    return; // They clicked a gui element, so don't run through the rest
  }

  gui.deactivate(); // Unhighlight the gui stuff

  let ix = Math.floor((x - camera.xOffset) / TILE_WIDTH);
  let iy = Math.floor((y - camera.yOffset) / TILE_HEIGHT);

  if(placeObject(ix, iy, selectedObject))
  {
    setCurrentItem(OBJECT_NONE);
  }
}

function placeObject(x, y, obj)
{
  if(withinTiles(x, y))
  {
    if(obj != OBJECT_NONE && tiles[x][y].getTribeId() == getCurrentPlayer().getId())
    {
      if(tiles[x][y].hasTown())
        return false; // You can't add an object to a town plot

      if(getCurrentPlayer().getMoney() - COST_PER_SOLDIER >= 0)
      {
        moves.push(new Move
        (
          generateNewCode(x, y, obj, tiles[x][y].hasTree())
        ));
        if(!tiles[x][y].gainObject(obj))
        {
          moves.pop(); // Remove the move just created, because it didn't happen
          return false;
        }
        getCurrentPlayer().addMoney(-COST_PER_SOLDIER);
      }
    }
    toggleSelected(x, y);
    gui.updateText();

    return true;
  }
  return false;
}

/// Util
function create2DArray(rows)
{
  var arr = [rows];

  for (let i = 0; i < rows; i++)
	{
     arr[i] = [];
  }

  return arr;
}

function clamp(val, min, max)
{
  if(val < min)
    val = min;
  if(val > max)
    val = max;
  return val;
}

function withinTiles(x, y)
{
  if(y >= 0 && y < tiles.length)
    if(x >= 0 && x < tiles[y].length)
      return true;
  return false;
}

function getCurrentPlayer()
{
  return players[currentTribe];
}

function setCurrentPlayer(index)
{
  currentTribe = index;
}

function findTribeWithId(id)
{
  if(id == TRIBE_EMPTY_ID)
    return TRIBE_EMPTY;
  for(let i = 0; i < players.length; i++)
  {
    if(players[i].getId() == id)
      return players[i];
  }
  return null;
}

// Onload at bottom to make sure everything is created in the code
window.onload = function()
{
  init();
}
