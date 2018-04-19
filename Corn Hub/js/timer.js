let dateEnd;

function setTime(d)
{
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

  weeksC.innerHTML = Math.floor(days / 7);
  daysC.innerHTML = days % 7;

  // Make sure your eyes don't burn out while you look at it
  if (hours   < 10)
    hours = "0" + hours;
  if (minutes < 10)
    minutes = "0" + minutes;
  if (sec < 10)
    sec = "0" + sec;

  hoursC.innerHTML = hours;
  minsC.innerHTML = minutes;
  secsC.innerHTML = sec;
}
