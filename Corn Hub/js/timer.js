let dateEnd;
let doWeeks;
let doFormatting;

function setTime(d, w, f)
{
  if(w === undefined)
  {
    if(f !== undefined)
    {
      doFormatting = f;
    }
    else
    {
      doFormatting = true;
    }
    doWeeks = true;
  }
  else
    doWeeks = w;


  dateEnd = d;
  tickIt();
  setInterval(tickIt, 1000);
}

function tickIt()
{
  let weeksC = document.getElementById('weeks');
  let daysC = document.getElementById('days');
  let hoursC = document.getElementById('hours');
  let minsC = document.getElementById('mins');
  let secsC = document.getElementById('secs');

  let nowDate = new Date();

  let ms = (dateEnd - nowDate);

  days = Math.floor(ms / (24*60*60*1000));
  daysms = ms % (24*60*60*1000);
  hours = Math.floor((daysms)/(60*60*1000));
  hoursms = ms % (60*60*1000);
  minutes = Math.floor((hoursms)/(60*1000));
  minutesms=ms % (60*1000);
  sec = Math.floor((minutesms)/(1000));

  if(sec < 0 || days < 0 || hours < 0 || minutes < 0)
  {
    days = 0;
    hours = 0;
    minutes = 0;
    sec = 0;
  }

  if(doWeeks)
  {
    weeksC.innerHTML = Math.floor(days / 7);
    daysC.innerHTML = days % 7;
  }
  else
  {
    daysC.innerHTML = days
  }

  if(doFormatting)
  {
    // Make sure your eyes don't burn out while you look at it
    if (hours < 10)
      hours = "0" + hours;
    if (minutes < 10)
      minutes = "0" + minutes;
    if (sec < 10)
      sec = "0" + sec;
  }

  hoursC.innerHTML = hours;
  minsC.innerHTML = minutes;
  secsC.innerHTML = sec;
}
