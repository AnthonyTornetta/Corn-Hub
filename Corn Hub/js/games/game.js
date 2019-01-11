window.onload = () =>
{
  let balls = [];
  let keysDown = {};

  let c, ctx;

  function draw()
  {
    ctx.fillStyle = '#ffffff';
    ctx.clearRect(0, 0, c.width, c.height);

    balls.forEach(b =>
    {
      b.draw(ctx);
    });

    requestAnimationFrame(draw);
  }

  function tick()
  {
    balls.forEach(b =>
    {
      b.update(c.width, c.height);
    });
  }

  function init()
  {
    window.onkeyup = function(e) { keysDown[e.keyCode] = false; }
    window.onkeydown = function(e) { keysDown[e.keyCode] = true; }

    c = document.getElementById("canvas");
    ctx = c.getContext("2d");

    // Making the canvas full screen
    c.height = window.innerHeight;
    c.width = window.innerWidth;

    for(let i = 0; i < 10; i++)
    {
      balls.push(new Ball(50, 50, 50, '#FFFFFF'));
    }

    balls.push(new Player(50, 50, 50, '#FFFF00'));

    setInterval(tick, 1000/60);
    draw();
  }

  class Ball
  {
    constructor(x, y, r, c)
    {
      this.x = x;
      this.y = y;
      this.radius = r;
      this.color = c;

      this.velocityX = 10;
      this.velocityY = 10;
    }

    draw(ctx)
    {
      ctx.fillStyle = this.color;

      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI, false);
      ctx.fill();
    }

    update(w, h)
    {
      this.x += this.velocityX;
      this.y += this.velocityY;

      if(this.x + this.radius > w) { this.x = w - this.radius; this.velocityX = -this.velocityX; }
      if(this.x - this.radius < 0) { this.x = this.radius; this.velocityX = -this.velocityX; }

      if(this.y + this.radius > h) { this.y = h - this.radius; this.velocityY = -this.velocityY; }
      if(this.y - this.radius < 0) { this.y = this.radius; this.velocityY = -this.velocityY; }
    }
  }

  class Player extends Ball
  {
    constructor(x, y, r, c)
    {
      super(x, y, r, c);

      this.velocityX = 10;
      this.velocityY = 10;
    }

    // Overidden
    update(w, h)
    {
      this.x += 1;
      this.y += 1;
    }
  }

  init();
};
