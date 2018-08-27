let mainCalendar;

const months =
[
  'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'
];

start = new Date();
end = new Date();
end.setDate(28);

async function loadCalendar(start, end)
{
  if(start === undefined && end === undefined)
  {
    start = new Date();
    end = new Date(start.getFullYear(), start.getMonth() + 1, 0); // day 0 reverts it back to last month the last day
    start.setDate(1);
  }

  // It took me a really long time to find where they pulled the events from.
  await $.ajax(
  {
      type: "POST",
      url: "https://cors-anywhere.herokuapp.com/https://www.clsd.k12.pa.us/site/UserControls/Calendar/CalendarController.aspx/GetEvents",
      data: "{ModuleInstanceID: 1, " +
                  "StartDate: '" + (parseInt(start.getMonth()) + 1) + "/" + start.getDate() + "/" + start.getFullYear() +  "', " +
                  "EndDate: '" + (parseInt(end.getMonth()) + 1) + "/" + end.getDate() + "/" + end.getFullYear() + "'}",
      contentType: "application/json; charset=utf-8",
      dataType: "json",
      cache: false,
      success: function(result)
      {
        let calevents = eval(result.d);

        console.log(calevents);
        if(calevents !== undefined)
        {
          console.log(start, end);
          mainCalendar = new Calendar(start, end);
          calevents.forEach((x) =>
          {
            let category = Event.getCategory(x.CategoryColor);

            mainCalendar.addEvent(new Event(x.start, x.end, x.title, category));
          });
          console.log(mainCalendar.events);
        }
        else
        {
          alert('No events listed for ' + months[start.getMonth()] + ', ' + start.getFullYear() + ' :(');
        }
      },
      fail: function(err)
      {
        console.log("A FAILURE HAS OCCURREDDDD!")
        console.log(err);
      }
  });
}

/**
 * Fills a calendar element with dates & information.
 * @param {string} id The element's id to set the content of.
 */
async function fillCalendar()
{
  if(mainCalendar === undefined)
    await loadCalendar();

  let days = document.getElementById('days');

  days.innerHTML = "";

  const weekday = new Array(7);
  weekday[0] = "SUN";
  weekday[1] = "MON";
  weekday[2] = "TUE";
  weekday[3] = "WED";
  weekday[4] = "THU";
  weekday[5] = "FRI";
  weekday[6] = "SAT";

  for(let day = mainCalendar.start.getDate(); day <= mainCalendar.end.getDate(); day++)
  {
    let result = new Date(mainCalendar.start);
    result.setDate(result.getDate() + day - 1);

    let eventsForDay = mainCalendar.getEventsOn(result);
    let events = '';
    let i = 0;
    for(; i < eventsForDay.length; i++)
    {
      events += `
      <li id="${eventsForDay[i].category}">
        ${eventsForDay[i].title}
      </li>`;
    }

    if(i == 0)
      events = '<li>No Events</li>';

    days.innerHTML += `
    <div class="event-container">
      <div class="date">
        <h3>${weekday[result.getDay()]}</h3>
        <h4>${day}</h4>
      </div>
      <div class="event">
        <ul>
          ${events}
        </ul>
      </div>
    </div>`;

  }

  document.getElementById('month-n-stuff').innerHTML = `
  <span onclick='lastMonth()' class="prev arrow">&#10094;</span>
  <span>
  ${months[mainCalendar.start.getMonth()]}, ${mainCalendar.start.getFullYear()}
  <span onclick='nextMonth()' class="next arrow">&#10095;</span>
  `;
}

async function lastMonth()
{
  let newStart = new Date(mainCalendar.start);
  let newEnd = new Date(mainCalendar.end);
  newStart.setMonth(newStart.getMonth() - 1);
  newEnd.setDate(0); // we set the days to 0 to get the max day of last month.

  let temp = new Calendar(mainCalendar.start, mainCalendar.end, mainCalendar.events);

  await loadCalendar(newStart, newEnd);

  if(mainCalendar === null)
  {
    mainCalendar = temp;
    alert('No events listed for ' + months[newStart.getMonth()] + '.');
  }
  else
  {
    fillCalendar();
  }
}

async function nextMonth()
{
  let newStart = new Date(mainCalendar.start);
  let newEnd = new Date(mainCalendar.end);
  newStart.setMonth(newStart.getMonth() + 1);

  newEnd.setDate(1); // so the date doesn't mess up when figuring the month number with days rolling over.
  newEnd.setMonth(newEnd.getMonth() + 2); // add to so we can revert back one when...
  newEnd.setDate(0); // we set the days to 0 to get the max day of last month.

  let temp = new Calendar(mainCalendar.start, mainCalendar.end, mainCalendar.events);

  await loadCalendar(newStart, newEnd);

  if(mainCalendar === null)
  {
    mainCalendar = temp;
    alert('No events listed for ' + months[newStart.getMonth()] + '.');
  }
  else
  {
    fillCalendar();
  }
}

/**
 * Holds a specific event's data to be used later
 */
class Event
{
  /**
   * Fills in data
   * @param {Date} begin    The date the event begins on
   * @param {Date} end      The date the event ends on
   * @param {string} title    The title of the event
   * @param {string} category The category of the event
   */
  constructor(begin, end, title, category)
  {
    if(!(begin instanceof Date) || !(end instanceof Date))
      throw new TypeError("being/end args must be of type Date");

    this._begin = begin;
    this._end = end;
    this._title = title;
    this._category = category;
  }

  get begin() { return this._begin; }
  set begin(b)
  {
    if(!(b instanceof Date))
      throw new TypeError("being arg must be of type Date");
    this._begin = b;
  }
  get end() { return this._end; }
  set end(e)
  {
    if(!(e instanceof Date))
      throw new TypeError("end arg must be of type Date");
    this._end = e;
  }
  get title() { return this._title; }
  set title(t) { this._title = t; }
  get category() { return this._category; }
  set category(c) { this._category = c; }

  /**
   * Checks if the event is happening on a supplied date.
   * @param  {Date}  date The date to see if the event takes place on.
   * @return {Boolean} true if it takes place on said date, false if not.
   */
  isOnDay(date)
  {
    if(!(date instanceof Date))
      throw new TypeError("being/end args must be of type Date");

    let x = (this.begin <= date && this.end >= date);
    return x;
  }

  static getCategory(color)
  {
    // Gotten from school website, so if they break blame them.
    switch(color.toLowerCase())
    {
      case '#1882ed':
        return 'Testing';
      case '#cda220':
        return 'Act 80 Day';
      case '#eded00':
        return 'Assembly';
      case '#00a000':
        return 'Athletic Event';
      case '#96dc24':
        return 'Athletic Practice';
      case '#4b10af':
        return 'Building Event';
      case '#ef0078':
        return 'Holiday';
      case '#e301ed':
        return 'In-Service Day';
      case '#ef001b':
        return 'Musical or Art Event';
      case '#6f0374':
        return 'Off-Site Event';
      case '#ee68f4':
        return 'Parent Teacher Conference';
      case '#6716ef':
        return 'PTO/PTA Meeting';
      case '#ed7700':
        return 'School Board Meeting';
      case '#a779f5':
        return 'Staff Meeting';
      default:
        return 'Miscellaneous';
    }
  }
};

class Calendar
{
  /**
   * Stores the events and start/end dates of a calendar
   * @param {Date} s Start date of calendar
   * @param {Date} e End date of calendar
   */
  constructor(s, e, evts)
  {
    if(arguments.length === 3)
    {
      this._begin = evts; // Clones the array
      this._end = new Date(s);
      this._title = new Date(s);
    }
    else
    {
      if(!(e instanceof Date) || !(s instanceof Date))
        throw new TypeError("being/end args must be of type Date (" + s + ", " + e + ")");

      this._events = [];

      this._start = s;
      this._end = e;
    }
  }

  addEvent(e) { this.events.push(e); }

  getEventsOn(date)
  {
    let evts = [];
    for(let i = 0; i < this.events.length; i++)
      if(this.events[i].isOnDay(date))
        evts.push(this.events[i]);
    return evts;
  }

  get start() { return this._start; }
  get events() { return this._events; }
  get end() { return this._end; }
};
