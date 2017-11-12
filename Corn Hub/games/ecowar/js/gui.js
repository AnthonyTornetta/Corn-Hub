"use strict";

const NEXT_ICON = new Image();
NEXT_ICON.src   = 'sprites/next.png';
const UNDO_ICON = new Image();
UNDO_ICON.src   = 'sprites/back.png';

var SLOT_WIDTH   = 50;
var SLOT_HEIGHT  = 50;
var SLOT_PADDING = 20;

class GUI
{
	constructor(textComponents, slotComponents)
	{
		this.text = textComponents;
    this.slots = slotComponents;

    // Set the positions of the gui
		this.adjustGUI();
	}

  // Adjusts the gui to account for screen resizing
	adjustGUI()
	{
		this.slots[0].x = SLOT_PADDING;
		this.slots[0].y = height - (SLOT_HEIGHT + SLOT_PADDING);

		this.slots[1].x = width - (SLOT_WIDTH + SLOT_PADDING);
		this.slots[1].y = height - (SLOT_HEIGHT + SLOT_PADDING);

		this.slots[2].x = (width - SLOT_WIDTH) / 2 - SLOT_WIDTH;
		this.slots[2].y = height - (SLOT_HEIGHT + SLOT_PADDING);

		this.slots[3].x = (width - SLOT_WIDTH) / 2 + SLOT_WIDTH;
		this.slots[3].y = height - (SLOT_HEIGHT + SLOT_PADDING);



		this.text[0].x = width / 2 - SLOT_WIDTH / 2;
		this.text[0].y = 20;
	}

	draw(ctx, mouse)
	{
		for(let i = 0; i < this.slots.length; i++)
		{
			this.slots[i].draw(ctx, mouse);
		}

		for(let i = 0; i < this.text.length; i++)
		{
			this.text[i].draw(ctx);
		}
	}

	overGUI(x, y)
	{
		for(let i = 0; i < this.slots.length; i++)
		{
			if(this.slots[i].overSlot(x, y))
				return true;
		}
		return false;
	}

	mouseUp(x, y)
	{
		for(let i = 0; i < this.slots.length; i++)
		{
			if(this.slots[i].overSlot(x, y))
			{
				this.slots[i].activate();
				return true;
			}
		}
		return false;
	}

	deactivate()
	{
		for(let i = 0; i < this.slots.length; i++)
		{
			this.slots[i].deactivate();
		}
	}

	updateText()
	{
		for(let i = 0; i < this.text.length; i++)
		{
			this.text[i].updateText();
		}
	}
}
