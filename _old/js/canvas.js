var canvas;
var ctx;

var width, height;

var circleArray = [];

function init()
{
	canvas = document.getElementById('main-canvas');
	width = window.innerWidth;
	height = window.innerHeight;
	canvas.width = width;
	canvas.height = height;
	ctx = canvas.getContext('2d');
	circleArray = [];
	// (width * height) * 2 / (width + height)
	for(var i = 0; i < 300; i++)
	{
		circleArray[i] = new Circle(Math.random() * width, Math.random() * height, 5, Math.random() * 6 - 3, Math.random() * 6 - 3);
	}
}

window.onload = function()
{
	init();	
	
	animate();
}

var mouseRange = 100;

function Circle(x, y, radius, velX, velY)
{
	this.x = x;
	this.y = y;
	this.velX = velX;
	this.velY = velY;
	this.radius = radius;
	this.origRadius = radius;
	
	
	
	/* Og colors:
	 * #2980B9
	 * #3498DB
	 * #ECF0F1
	 * #E74C3C
	 * #2C3E50
	 */
	
	var rdm = Math.random() * 5;
	if(rdm <= 1)
	{
		this.color = "#00EE00";
	}
	else if(rdm > 1 && rdm <= 2)
	{
		this.color = "#22EE22";
	}
	else if(rdm > 2 && rdm <= 3)
	{
		this.color = "#44EE44";
	}
	else if(rdm > 3 && rdm <= 4)
	{
		this.color = "#88EE88";
	}
	else if(rdm > 4 && rdm <= 5)
	{
		this.color = "#CCEECC";
	}
		
	/*var rdm = Math.random() * 5;
	if(rdm <= 1)
	{
		this.color = "#2980B9";
	}
	else if(rdm > 1 && rdm <= 2)
	{
		this.color = "#3498DB";
	}
	else if(rdm > 2 && rdm <= 3)
	{
		this.color = "#ECF0F1";
	}
	else if(rdm > 3 && rdm <= 4)
	{
		this.color = "#E74C3C";
	}
	else if(rdm > 4 && rdm <= 5)
	{
		this.color = "#2C3E50";
	}*/
	
	this.draw = function()
	{
		ctx.beginPath();
		ctx.fillStyle = this.color;
		ctx.strokeStyle = this.color;
		ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
		ctx.stroke();
		ctx.fill();
	}
	
	this.update = function()
	{
		this.x += this.velX;
		this.y += this.velY;
		if(this.y > height + radius) // Screen wrap
			this.y = this.y - (height + this.radius);
		else if(y + this.radius < 0)
		{
			this.y = height + this.radius;
		}
		if(this.x >= width - this.radius)
		{
			this.x = width - (this.radius + Math.abs(this.velX));
			this.velX *= -1;
		}
		else if(this.x <= this.radius)
		{
			this.x = (this.radius + Math.abs(this.velX));
			this.velX *= -1;
		}
		
		// Interactivity
		if((mouse.x - this.x < mouseRange && mouse.x - this.x > -mouseRange) &&
		   (mouse.y - this.y < mouseRange && mouse.y - this.y > -mouseRange))
		{
			if(this.radius + 1 <= this.origRadius * 8)
			{
				this.radius += 1;
			}
		}
		else
		{
			if(this.radius - 1 >= this.origRadius)
			{
				this.radius -= 1;
			}
		}
	}
}

var mouse =
{
	x: undefined,
	y: undefined
}

window.addEventListener('mousemove', function(evt)
{
	mouse.x = evt.x;
	mouse.y = evt.y;
});	

var velX = (Math.random() - 0.5) * 10;
var velY = (Math.random() - 0.5) * 10;

function animate()
{
	requestAnimationFrame(animate);
	ctx.clearRect(0, 0, width, height);
	
	for(var i = 0; i < circleArray.length; i++)
	{
		circleArray[i].draw();
		circleArray[i].update();
	}
}

window.onresize = function()
{
	init();
}