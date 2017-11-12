const TRIBE_EMPTY_ID  = 0;
const TRIBE_RED_ID    = 1;
const TRIBE_GREEN_ID  = 2;
const TRIBE_BLUE_ID   = 3;
const TRIBE_PURPLE_ID = 4;
const TRIBE_PINK_ID   = 5;
const TRIBE_WHITE_ID  = 6;

const TRIBE_EMPTY_COLOR  = '#333';
const TRIBE_RED_COLOR    = '#ff7f7f';
const TRIBE_GREEN_COLOR  = '#7fff7f';
const TRIBE_BLUE_COLOR   = '#4d4dff';
const TRIBE_PURPLE_COLOR = '#60c';
const TRIBE_PINK_COLOR   = '#E0006C';
const TRIBE_WHITE_COLOR  = '#fff';

class Tribe
{
  constructor(id, color, name, startMoney)
  {
    this.id = id;
    this.name = name;
    this.money = startMoney;
    this.color = color;
    this.tilesAttatched = [];

    this.troops = [ 0, 0, 0, 0 ]; // Start every troop type amount at 0
  }

  getId() { return this.id; }
  getName() { return this.name; }
  addMoney(m) { this.money += m; }
  getMoney() { return this.money; }
  setMoney(m) { this.money = m; }
  getColor() { return this.color; }

  addTile(tile) { this.tilesAttatched.push(tile); }
  removeTile(tile)
  {
    var index = this.tilesAttatched.indexOf(tile);
    if(index != -1)
      this.tilesAttatched.splice(index, 1);
  }
  getTilesAttatched() { return this.tilesAttatched; }

  getSoldierAmt(type)
  {
    let soldiers = 0;
    for(let i = 0 ; i < this.tilesAttatched.length; i++)
    {
      if(this.tilesAttatched[i].getObject() == type)
      {
        soldiers++;
      }
    }
    return soldiers;
  }
  getTreeAmt()
  {
    let trees = 0;
    for(let i = 0 ; i < this.tilesAttatched.length; i++)
    {
      if(this.tilesAttatched[i].hasTree())
      {
        trees++;
      }
    }
    return trees;
  }
  calcMoneyGained()
  {
    let monies = Math.round((this.tilesAttatched.length - this.getTreeAmt()) / 4);
    for(let i = OBJECT_PEASANT; i <= MAX_TROOP_LVL; i++)
    {
      monies -= this.getSoldierAmt(i) * (Math.pow(2, (i - OBJECT_PEASANT) + 1));
    }
    return monies;
  }

  // Makes tribe go to the next round; if the money is < 0 return false.
  nextRound()
  {
    this.money += this.calcMoneyGained();
    if(this.money < 0)
      return false;
    return true;
  }
}
