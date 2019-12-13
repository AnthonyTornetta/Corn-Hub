var snowManager = 
{
  flakes: 60,
  ySpeedMin: 1,
  ySpeedMax: 4,
  snowReplenishRate: 0.2, // 0 = never replenishes, 1 = instantly replenishes
  windDirection: (Math.random() - 0.5) * 5,
  minScale: 0.4,
  maxScale: 1,

  // dont touch these
  inFocus: true,
};

cornhub.addOnload(() =>
{
  window.addEventListener('blur', () =>
  {
    snowManager.inFocus = false;
  });

  window.addEventListener('focus', () =>
  {
    snowManager.inFocus = true;
  });

  let snowflakeContainer = document.createElement('div');

  snowflakeContainer.style.position = 'absolute';
  snowflakeContainer.style.top = '0';
  snowflakeContainer.style.left = '0';
  snowflakeContainer.style.width = '100%';
  snowflakeContainer.style.width = '100%';
  snowflakeContainer.style.zIndex = 100;
  snowflakeContainer.style.pointerEvents = 'none';
  snowflakeContainer.id = 'snowflake-container';

  document.body.appendChild(snowflakeContainer);

  let snow = [];

  for(let i = 0; i < snowManager.flakes; i++)
  {
    snow.push(new SnowFlake(
        Math.random() * window.innerWidth, 
        {x: snowManager.windDirection, y: cornhub.rdmBetween(snowManager.ySpeedMin, snowManager.ySpeedMax)}, 
        cornhub.rdmBetween(snowManager.minScale, snowManager.maxScale)));
    snow[i].y = Math.random() * window.innerHeight;
    snow[i].add(snowflakeContainer);
  }

  window.addEventListener('resize', () =>
  {
    snow.forEach(flake =>
    {
      flake.x = Math.random() * window.innerWidth;
      flake.y = Math.random() * window.innerWidth;
    });
  });

  let frame = 0;
  (function animate()
  {
    requestAnimationFrame(animate);

    if(snowManager.inFocus)
    {
      snow.forEach(flake =>
      {
        flake.translate(frame);

        if(flake)

        if(flake.y > window.innerHeight && Math.random() > (1 - snowManager.snowReplenishRate))
        {
          flake.y = 0;
        }

        if(flake.x > window.innerWidth && Math.random() > (1 - snowManager.snowReplenishRate))
        {
          flake.x = 0;
        }

        frame++;
      });
    }
  })();
});

class SnowFlake
{
  constructor(x, velocity, scale)
  {
    this.element = document.createElement('div');
    this.x = x;
    this.y = 0;
    this.scale = scale;
    this.velocity = velocity;

    this.element.style.position = 'fixed';
    this.element.style.transform = 'translate3d(0, 0, 0);'; // Lets GPU handle most of work moving this around
    this.element.style.transform += `scale3d(${this.scale}, ${this.scale}, ${this.scale})`
    this.element.innerHTML = '&bullet;';
    this.element.style.color = 'white';
  }

  translate(frame)
  {
    this.x += this.velocity.x * this.scale * Math.sin(frame / 10000 * this.scale);
    this.y += this.velocity.y * this.scale;
  }

  set x(x) { this._x = x; this.element.style.left = x + 'px'; }
  set y(y) { this._y = y; this.element.style.top = y + 'px'; }

  get y() { return this._y; }
  get x() { return this._x; }

  add(snowflakeContainer)
  {
    snowflakeContainer.appendChild(this.element);
  }
}