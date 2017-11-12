const TYPE_CENTER = 2;
const TYPE_RIGHT  = 1;
const TYPE_LEFT   = 0;

class TextBox
{
	constructor(x, y, width, height, getTextFunction, type)
	{
		this.height = height;
		this.width  = width;
		this.textUpdate = getTextFunction;
		this.type = type;
		this.text = '';

		this.y = y;
		this.x = x;

		this.textUpdate();
	}

	overSlot(x, y)
	{
		if(x >= this.x && x < this.width + this.x)
			if(y >= this.y && y < this.height + this.y)
				return true;
		return false;
	}

	draw(ctx)
	{
		ctx.font = "36px Arial";
		ctx.textAlign = 'center';

		ctx.fillStyle = '#fff';

		switch(this.type)
		{
			case TYPE_CENTER:
			{
				let center = width / 2;
				this.x = center - this.getWidth() / 2;
				break;
			}
			case TYPE_RIGHT:
			{
				this.x = 20;
				break;
			}
			case TYPE_LEFT:
			{
				this.x = width - (this.getWidth() + 20);
				break;
			}
			default:
				break;
		}

		ctx.fillText(this.text, this.x + this.width / 2 + 2, this.y + this.getHeight());
	}

	getMetrics()
	{
		return ctx.measureText(this.text);
	}

	getHeight()
	{
		return 40;
	}

	getWidth()
	{
		return this.getMetrics().width;
	}

	updateText()
	{
		this.text = this.textUpdate();
	}
}
