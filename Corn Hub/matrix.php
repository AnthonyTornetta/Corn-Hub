<html>
    <head>
		<?php global $title; $title = 'Matrix'; require('headinfo.php'); ?>
        <style>
            *{ margin: 0; padding: 0; }
            html, body { overflow:hidden; }
            body { background: black; }
            canvas { display:block; } 
        </style>
    </head>
    <body>
    
        <canvas id="c" style="z-index: 1;"></canvas>
        <script>
			var c = document.getElementById("c");
			var ctx = c.getContext("2d");

			//making the canvas full screen
			c.height = window.innerHeight;
			c.width = window.innerWidth;

			//(used to be) chinese characters - taken from the unicode charset
			var chinese = "Sierra Gunnells";
			//"Once upon a midnight dreary while I pondered weak and weary over many a quaint and curious volume of forgotten lore while I nodded nearly napping suddenly there came a tapping as of someone gently rapping rapping at my chamber door tis some visitor I muttered tapping at my chamber door only this and nothing more"//田由甲申甴电甶男甸甹町画甼甽甾甿畀畁畂畃畄畅畆畇畈畉畊畋界畍畎畏畐畑; SierraGunnells
			//converting the string into an array of single characters
			chinese = chinese.split("");

			var font_size = 10;
			var columns = c.width/font_size; //number of columns for the rain
			//an array of drops - one per column
			var drops = [];
			//x below is the x coordinate (Makes sense doesn't it!)
			//1 = y coordinate of the drop(same for every drop basically)
			for(var x = 0; x < columns; x++)
			{
				drops[x] = 1;
			}
			
			//drawing the characters
			function draw()
			{
				//Black BG for the canvas
				//translucent BG to show trail
				ctx.fillStyle = "rgba(0, 0, 0, 0.05)"; //Lovin that opacity
				ctx.fillRect(0, 0, c.width, c.height);
				
				ctx.fillStyle = "#0F0"; //green text (#0F0)
				ctx.font = font_size + "px arial"; //Pixel size of the font arial
				//looping over drops
				for(var i = 0; i < drops.length; i++)
				{
					//a random chinese character to print
					
					var text = chinese[Math.floor(Math.random()*chinese.length)];
					
					//If you want it in order uncomment this.
					/*
					var orig = i;
					while(i > chinese.length)
					{
						i -= chinese.length;
					}
					
					var text = chinese[i];
					if(text == null)
					{
						text = chinese[0];
					}
					i = orig;
					*/
					
					//x = i*font_size, y = value of drops[i]*font_size
					ctx.fillText(text, i*font_size, drops[i]*font_size);
					
					//sending the drop back to the top randomly after it has crossed the screen
					//adding a randomness to the reset to make the drops scattered on the Y axis
					if(drops[i]*font_size > c.height && Math.random() > 0.985) //0.975
					{
						drops[i] = 0;
					}
					//Making the drop fall by adding 1 to the y
					drops[i]++;
				}
			}

			setInterval(draw, 33);
        </script>
    </body>
</html>