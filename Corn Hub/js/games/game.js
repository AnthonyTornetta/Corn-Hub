window.onload = () =>
{
  let objects = [];
  let keysDown = {};

  let c, ctx;

  function draw()
  {
    ctx.fillStyle = '#ffffff';
    ctx.clearRect(0, 0, c.width, c.height);

    objects.forEach(b =>
    {
      b.draw(ctx);
    });

    requestAnimationFrame(draw);
  }

  function tick()
  {
    for(let i = 0; i < objects.length; i++)
    {
      for(let j = i; j < objects.length; j++)
      {
        if(objects[i].collidingWith(objects[j]))
        {
          GameObject.ellasticCollision(objects[i], objects[j]);
        }
      }
    }

    objects.forEach(b =>
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
      objects.push(new Ball(c.width, c.height, 50, '#FFFFFF'));
    }

    objects.push(new Player(50, 50, 50, '#FFFF00'));

    setInterval(tick, 1000/60);
    draw();
  }

  class GameObject
  {
    constructor(x, y, shape, density, radiusOrWidth, height)
    {
      this._x = x;
      this._y = y;
      this._shape = shape;
      this._density = density;

      this._velocityX = 0;
      this._velocityY = 0;
      
      if(height)
      {
        this.width = radiusOrWidth;
        this.height = height;
      }
      else
        this.radius = radiusOrWidth;
    }

    collidingWith(other)
    {
      if(other.shape === 'circle')
      {
        if(this.shape === 'circle')
        {
          console.log(Math.abs(other.x - this.x) < this.radius + other.radius);
          return Math.abs(other.x - this.x) < this.radius + other.radius;
        }
        else if(this.shape === 'rectangle')
        {
          // Find the closest point to the circle within the rectangle
          let closestX = clamp(this.x, other.x, other.x + other.width);
          let closestY = clamp(this.y, other.y, other.y + other.height);

          // Calculate the distance between the circle's center and this closest point
          let distanceX = this.x - closestX;
          let distanceY = this.y - closestY;

          // If the distance is less than the circle's radius, an intersection occurs
          let distanceSquared = (distanceX * distanceX) + (distanceY * distanceY);
          return distanceSquared < (this.radius * this.radius);
        }
      }
      else if(other.shape === 'rectangle')
      {
        if(this.shape === 'rectangle')
        {
          return this.x + this.width > other.x && this.x < other.x + other.width &&
                  this.y + this.height > other.y && this.y < other.y + other.height;
        }
        else
          return other.collidingWith(this);
      }

      throw new Error('Invalid shape type. (' + other.shape + ')');
    }

    static ellasticCollision(obj1, obj2)
    {
      // Equations used:
      // Pi = Pf (m1v1 + m2v2 = m1v1f + m2v2f)
      // V1i + V1f = V2i + V2f

      let obj1VelX = (obj2.velocityX * obj2.mass - obj2.velocityX * obj1.mass) / obj2.mass;
      let obj2VelX = (obj1.velocityX * obj1.mass + obj2.velocityX * obj2.mass - obj1VelX * obj1.mass) / obj2.mass;

      let obj1VelY = (obj2.velocityY * obj2.mass - obj2.velocityY * obj1.mass) / obj2.mass;
      let obj2VelY = (obj1.velocityY * obj1.mass + obj2.velocityY * obj2.mass - obj1VelY * obj1.mass) / obj2.mass;

      obj1.velocityX = obj1VelX;
      obj1.velocityY = obj1VelY;

      obj2.velocityX = obj2VelX;
      obj2.velocityY = obj2VelY;
    }

    draw(ctx) {}
    update() {}

    get area()
    {
      return this.shape === 'circle' ? Math.PI * this.radius * this.radius : this.width * this.height;
    }

    get mass()
    {
      return this.area * this.density;
    }

    get x() { return this._x; }
    set x(x) { this._x = x; }

    get y() { return this._y; }
    set y(y) { this._y = y; }
    
    get density() { return this._density; }
    set density(d) { this._density = d; }
    
    get velocityX() { return this._velocityX; }
    set velocityX(x) { this._velocityX = x; }

    get velocityY() { return this._velocityY; }
    set velocityY(y) { this._velocityY = y; }

    get shape() { return this._shape; }
    set shape(shape) { this._shape = shape; }
  }

  class Ball extends GameObject
  {
    constructor(x, y, r, c)
    {
      super(x, y, 'circle', 1.0, r);
      this.color = c;

      this.velocityX = -3;
      this.velocityY = 0;
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
      this.x = 2;
      this.y += 0;

      if(this.x + this.radius > w) { this.x = w - this.radius; this.velocityX = -this.velocityX; }
      if(this.x - this.radius < 0) { this.x = this.radius; this.velocityX = -this.velocityX; }

      if(this.y + this.radius > h) { this.y = h - this.radius; this.velocityY = -this.velocityY; }
      if(this.y - this.radius < 0) { this.y = this.radius; this.velocityY = -this.velocityY; }
    }
  }

  class Player extends GameObject
  {
    constructor(x, y, color)
    {
      super(x, y, 'circle', 0.9, 50);

      this.color = color;
      this.velocityX = 3;
      this.velocityY = 3;
    }

    // Overidden
    update(w, h)
    {
      this.x += 0;
      this.y += 0;
    }

    draw(ctx)
    {
      ctx.fillStyle = '#ff0000';

      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI, false);
      ctx.fill();
    }
  }

  function clamp(x, min, max)
  {
    x < min ? min : x > max ? max : x;
  }

  init();
};
