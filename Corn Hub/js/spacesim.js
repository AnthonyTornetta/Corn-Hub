var 
canvas,
width,
height,
ctx;

var bodies = [];

function init()
{
	canvas = document.getElementById('canvas');
	width = window.innerWidth;
	height = window.innerHeight;
	canvas.width = width;
	canvas.height = height;
	ctx = canvas.getContext('2d');
	ctx.font = "15px Arial";
	createBodies();
	
	setInterval(function()
	{
		updateSystem();
		updateBodies(0.001);
		ctx.clearRect(0, 0, width, height);
		drawBodies();
	}, 10);
}
function createBodies()
{
	var centerX = width / 2;
	var centerY = height / 2;
	bodies.push(new Body(-200 + centerX, centerY, 250, Math.PI / 2, 10, 5, "This is a stupidly long name"));
	bodies.push(new Body(-150 + centerX, centerY, 250, Math.PI / 2, 10, 5, "2"));
	bodies.push(new Body(-100 + centerX, -150 + centerY, 300, Math.PI / 2, 10, 5, "3"));
	bodies.push(new Body(-50 + centerX, -150 + centerY, 300, 0, 10, 3, "4"));
	
	bodies.push(new Body(centerX, centerY, 0, 0, 10000000, 15, "Sun")); // Sun
}

function drawBodies()
{
	for(var i = 0; i < bodies.length; i++)
	{
		bodies[i].draw(ctx);
	}
}

function updateSystem()
{
	var G = 1;
	for(var i = 0; i < bodies.length; i++) // Calculate distance per body
	{
		for(var j = 0; j < bodies.length; j++) // Use other bodys to calculate gravity
		{
			if(i == j) // No need to calculate our own gravity effects
				continue;
			var b1 = bodies[i];
			var b2 = bodies[j]; // To recieve gravity from
			
			
			
			var dist = Math.sqrt
			(
				(b1.x - b2.x) * (b1.x - b2.x) +
				(b1.y - b2.y) * (b1.y - b2.y)
			);
			var force = G * (b1.mass * b2.mass) / dist / dist;
			
			var nx = (b2.x - b1.x) / dist;
			var ny = (b2.y - b1.y) / dist;
			
			b1.ax += nx * force / b1.mass;
			b1.ay += ny * force / b1.mass;
			
			b2.ax -= nx * force / b2.mass;
			b2.ay -= ny * force / b2.mass;
			
			
		}
	}
}

function updateBodies(dt)
{
	for(var i = 0; i < bodies.length; i++)
		bodies[i].update(dt);
}

function Body(x, y, velocity, angle, mass, radius, name)
{
	this.x = x;
	this.y = y;
	this.velX = velocity * Math.cos(angle);
	this.velY = velocity * Math.sin(angle);
	this.mass = mass;
	this.radius = radius;
	this.ax = 0;
	this.ay = 0;
	this.name = name;
	
	this.update = function(dt)
	{
		this.velX += this.ax * dt;
		this.velY += this.ay * dt;
		
		this.x += this.velX * dt;
		this.y += this.velY * dt;
		
		this.ax = 0;
		this.ay = 0;
	};
	this.draw = function(ctx)
	{
		ctx.beginPath();
		ctx.arc(this.x, this.y, this.radius, 0, 6.28);
		// Draw the name above the body and center it
		ctx.fillText(name, this.x - ctx.measureText(name).width / 2, this.y - radius - 2);
		ctx.stroke();
	}
}