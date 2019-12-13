cornhub.addOnload(() =>
{
    let canvas = document.getElementById('canvas');
    let ctx = canvas.getContext('2d');

    let w = window.innerWidth, h = window.innerHeight;
    canvas.width = w;
    canvas.height = h;

    const BOARD_WIDTH = 10 | 0;
    const BOARD_HEIGHT = 20 | 0;

    const board = [];
    for(let i = 0; i < BOARD_HEIGHT; i++)
    {
        board.push([]);

        for(let j = 0; j < BOARD_WIDTH; j++)
        {
            board[i].push('0,0,0');
        }
    }

    let Piece = class
    {
        constructor(col, shape)
        {
            this.color = col;
            this.shape = shape;
        }
    }

    const pieces = [ new Piece('20, 200, 20', 
    [ 
        -1, 0,
        0, 0,
        1, 0,
        2, 0
    ]) ]

    function addPiece(piece)
    {
        if(board[0][BOARD_WIDTH / 2] !== EMPTY_SLOT)
            return false;

        return true;
    }

    const DIMENSIONS = 30;

    (function draw()
    {
        requestAnimationFrame(draw);

        ctx.fillStyle = '#000000';
        ctx.fillRect(0, 0, w, h);

        // let boardHeight = BOARD_HEIGHT * DIMENSIONS;
        // let boardWidth = BOARD_WIDTH * DIMENSIONS;

        let scaleX = 1, scaleY = 1;
        // if(h - boardHeight < 0)
        {
            scaleY = h / (BOARD_HEIGHT * DIMENSIONS);
        }
        // if(w - boardWidth < 0)
        {
            scaleX = w / (BOARD_WIDTH * DIMENSIONS);
        }

        let scale = Math.min(scaleX, scaleY);

        let xOffset = (w - DIMENSIONS * scale * BOARD_WIDTH) / 2;
        let yOffset = (h - DIMENSIONS * scale * BOARD_HEIGHT) / 2;

        for(let y = 0; y < BOARD_HEIGHT; y++)
        {
            for(let x = 0; x < BOARD_WIDTH; x++)
            {
                ctx.fillStyle = `rgb(${board[y][x]})`;
                ctx.fillRect(xOffset + x * DIMENSIONS * scale, yOffset + y * DIMENSIONS * scale, DIMENSIONS * scale, DIMENSIONS * scale);

                ctx.strokeStyle = '#333333';
                ctx.strokeRect(xOffset + x * DIMENSIONS * scale, yOffset + y * DIMENSIONS * scale, DIMENSIONS * scale, DIMENSIONS * scale);
            }
        }
    })();

    window.onresize = () =>
    {
        w = window.innerWidth, h = window.innerHeight;
        canvas.width = w;
        canvas.height = h;
    }
});