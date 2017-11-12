class Slot
{
	constructor(x, y, width, height, image, onclick)
	{
		this.onclick = onclick;
		this.height  = height;
		this.width   = width;
		this.image   = image;
		this.selected = false;

		if(y == -1)
		{
			this.y = 0;
			this.border = false;
		}
		else
		{
			this.y = y;
			this.border = true;
		}
		if(x == -1)
		{
			this.x = 0;
			this.circle = true;
		}
		else
		{
			this.x = x;
			this.circle = false;
		}
	}

	overSlot(x, y)
	{
		if(x >= this.x && x < this.width + this.x)
			if(y >= this.y && y < this.height + this.y)
				return true;
		return false;
	}

	activate()
	{
		this.onclick();
		this.setSelected(true);
	}

	deactivate()
	{
		this.setSelected(false);
	}

	draw(ctx, mouse)
	{
		let overSlot = this.overSlot(mouse.x, mouse.y);
		if(this.selected || overSlot && !(this.circle && this.selected && !overSlot))
		{
			ctx.fillStyle = 'rgba(255, 255, 255, 0.2)';
			if(!this.circle)
				ctx.fillRect(this.x, this.y, this.width, this.height);
			else
			{
				ctx.beginPath();
				ctx.arc(this.x + this.width / 2, this.y + this.height / 2, (this.width + this.height) / 4 - 1, 0, 2 * Math.PI);
				ctx.fill();
				ctx.stroke();
			}
		}

		if(this.image.complete)
			ctx.drawImage(this.image, this.x, this.y, this.width, this.height);

		if(this.border)
		{
			ctx.strokeStyle = '#fff';
			ctx.beginPath();
			ctx.lineWidth = '1';
			ctx.rect(this.x, this.y, this.width, this.height);
			ctx.stroke();
		}
	}

	setSelected(s) { this.selected = s; }
	getSelected() { return this.selected; }
}
