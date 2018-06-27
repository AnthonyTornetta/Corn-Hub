const TYPE_MOVE_OBJECT = 0;
const TYPE_NEW_OBJECT  = 1

class Move
{
  // Use provided functions below for formatting
  constructor(whatHappenedCode)
  {
    this._whatHappened = whatHappenedCode.split(';');
    this._type = Number(this.whatHappened[0]);
    if(this._type === TYPE_MOVE_OBJECT)
    {
      this._newX          = Number (this._whatHappened[1]);
      this._newY          = Number (this._whatHappened[2]);
      this._prevX         = Number (this._whatHappened[3]);
      this._prevY         = Number (this._whatHappened[4]);
      this._obj           = Number (this._whatHappened[5]);
      this._prevTileTribe = Number (this._whatHappened[6]);

      if(this.whatHappened[7] === 'true')
        this._killedTree = true;
      else
        this._killedTree = false;
    }
    else if(this._type === TYPE_NEW_OBJECT)
    {
      this._newX = Number(this._whatHappened[1]);
      this._newY = Number(this._whatHappened[2]);
      this._obj  = Number(this._whatHappened[3]);

      if(this.whatHappened[4] === 'true')
        this._killedTree = true;
      else
        this._killedTree = false;
    }
  }

  get whatHappened() { return this._whatHappened}

  get type() { return this._type; }

  get newX() { return this._newX; }
  get newY() { return this._newY; }
  get obj () { return this._obj; }

  get oldX() { return this._prevX; }
  get oldY() { return this._prevY; }
  get prevTileTribe() { return this._prevTileTribe; }
  get killedTree() { return this._killedTree; }
}

function generateMoveCode(nx, ny, ox, oy, obj, prevTileTribeId, killedTree)
{
  return `${TYPE_MOVE_OBJECT};${nx};${ny};${ox};${oy};${obj};${prevTileTribeId};${killedTree}`;
}

function generateNewCode(x, y, obj, hasTree)
{
  return `${TYPE_NEW_OBJECT};${x};${y};${obj};${hasTree}`;
}
