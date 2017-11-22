const BOARD_WIDTH  = 8;
const BOARD_HEIGHT = 8;

const PIECE_NONE   = 0;
const PIECE_PAWN   = 1;
const PIECE_KNIGHT = 2;
const PIECE_BISHOP = 3;
const PIECE_ROOK   = 4;
const PIECE_QUEEN  = 5;
const PIECE_KING   = 6;

const TEAM_NONE    = 0;
const TEAM_WHITE   = 1;
const TEAM_BLACK   = 10;

const MARKER_NONE = 0;
const MARKER_HIGHLIGHTED = 1;
const MARKER_SELECTED = 2;
const MARKER_ATTACK = 3;

const TILE_WIDTH_ORIG  = 75;
const TILE_HEIGHT_ORIG = 75;
var tileWidth  = TILE_WIDTH_ORIG;
var tileHeight = TILE_HEIGHT_ORIG;

const WHITE_PAWN = new Image();
WHITE_PAWN.src   = 'sprites/white-pawn.png';

const BLACK_PAWN = new Image();
BLACK_PAWN.src   = 'sprites/black-pawn.png';

const WHITE_KNIGHT = new Image();
WHITE_KNIGHT.src   = 'sprites/white-knight.png';

const BLACK_KNIGHT = new Image();
BLACK_KNIGHT.src   = 'sprites/black-knight.png';
