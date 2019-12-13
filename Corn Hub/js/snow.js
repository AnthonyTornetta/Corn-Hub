var snowManager = 
{
  flakes: 200,
  ySpeedMin: 1,
  ySpeedMax: 4,
  snowReplenishRate: 0.2, // 0 = never replenishes, 1 = instantly replenishes

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
    snow.push(new SnowFlake(Math.random() * window.innerWidth, Math.random() * (snowManager.ySpeedMax - snowManager.ySpeedMin) + snowManager.ySpeedMin));
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

  (function animate()
  {
    requestAnimationFrame(animate);

    if(snowManager.inFocus)
    {
      snow.forEach(flake =>
      {
        flake.translate(Math.random(), flake.moveSpeed);

        if(flake.y > window.innerHeight && Math.random() > (1 - snowManager.snowReplenishRate))
        {
          flake.y = 0;
        }

        if(flake.x > window.innerWidth && Math.random() > (1 - snowManager.snowReplenishRate))
        {
          flake.x = 0;
        }
      });
    }
  })();
});

class SnowFlake
{
  constructor(x, moveSpeed)
  {
    this.element = document.createElement('div');
    this.x = x;
    this.y = 0;
    this.moveSpeed = moveSpeed;

    this.element.style.position = 'fixed';
    this.element.style.transform = 'translate3d(0, 0, 0)'; // Lets GPU handle most of work moving this around
    this.element.innerHTML = '&bullet;';
    this.element.style.color = 'white';
  }

  translate(x, y)
  {
    this.x += x;
    this.y += y;
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