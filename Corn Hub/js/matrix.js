(() =>
{
  let textToFall = "SierraGunnells";
  textToFall = textToFall.split("");

  let c = document.getElementById("c");
  let ctx = c.getContext("2d");

  let fontSize = 10;

  window.onresize = () => doStuff();

  function doStuff()
  {
    // Making the canvas full screen
    c.height = window.innerHeight;
    c.width = window.innerWidth;
    
    // An array of drops - one per column
    let drops = [];

    // 1 = y coordinate of the drop(same for every drop)
    drops.fill(1);

    //drawing the characters
    function draw()
    {
      requestAnimationFrame(draw);

      //Black BG for the canvas
      //translucent BG to show trail
      ctx.fillStyle = "rgba(0, 0, 0, 0.05)"; //Lovin that opacity
      ctx.fillRect(0, 0, c.width, c.height);

      ctx.fillStyle = "#0F0"; //green text (#0F0)
      ctx.font = fontSize + "px arial"; //Pixel size of the font arial

      for(let i = 0; i < drops.length; i++)
      {
        // A random textToFall character to print

        let text = textToFall[Math.floor(Math.random()*textToFall.length)];

        ctx.fillText(text, i * fontSize, drops[i] * fontSize);

        //sending the drop back to the top randomly after it has crossed the screen
        //adding a randomness to the reset to make the drops scattered on the Y axis
        if(drops[i]*fontSize > c.height && Math.random() > 0.985) //0.975
        {
          drops[i] = 0;
        }
        // Making the drop fall by adding 1 to the y
        drops[i]++;
      }
    }

    draw();
  }

  window.onload = () => doStuff();
})();