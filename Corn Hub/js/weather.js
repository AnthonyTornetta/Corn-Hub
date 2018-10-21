$(function()
{
  let lat, lon,
      city, country,
      windDir, humid,
      pressure, clouds;

  const API_KEY = 'b0d48880090d49e9dcc76306507a83b6';
  const IP_LOCATION_API_KEY = '3f9e042c05985f52c258d964c0e77df9';

  let curDay = 0;

  loadWeather();

  function loadWeather()
  {
    $.getJSON("https://jsonip.com?callback=?", data =>
    {
      success: (data) =>
      $.ajax(
      {
        method: 'GET',
        url: `https://ipapi.com/api/${data.ip}?access_key=${IP_LOCATION_API_KEY}`,
        dataType: 'json',
        data: {
          format: 'json'
        },
        success: (data) =>
        {
          lat = data.latitude;
          lon = data.longitude;

          let url = `https://api.darksky.net/forecast/${API_KEY}/${lat},${lon}`;

          $.ajax(
          {
            method: 'GET',
            url: url,
            dataType: 'jsonp', //change the datatype to 'jsonp' works in most cases
            data: {
              format: "json"
            },
            success: (res) =>
            {
              console.log(url);
              updateForecastWeather(res);
            }
          });
        }
      });
    });

  }

  function updateForecastWeather(weatherData)
  {
    let prevDay = "";

    let hrs = weatherData.hourly.data;
    let counter = 0;
    for(let i = 0; i < hrs.length; i++)
    {
      // Parse the time/date string into a readable format
      let time = new Date(hrs[i].time * 1000);

      let timeStr = time.toLocaleString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });
      let weekday = time.toLocaleString('en-US', {  weekday: 'long' });

      let temp = Math.round(hrs[i].temperature);
      let humidity = `${~~(hrs[i].humidity * 100)}`;
      let description = hrs[i].summary;
      let wind = Math.round(hrs[i].windSpeed * 10) / 10;
      counter = addWeatherBox(weatherData, weekday, prevDay, timeStr, temp, humidity, description, wind, counter);
      prevDay = weekday;
    }
  }

  function addWeatherBox(weatherData, day, prevDay, time, temp, humidity, description, wind, counter)
  {
    if(prevDay != day)
    {
      let thatDay = weatherData.daily.data[curDay];

      let percipBox = thatDay.precipType !== undefined ? `${firstLetterUpper(thatDay.precipType)}: ${~~(100 * thatDay.precipProbability)}%` : 'Clear: 100%';

      document.getElementById('weather-forecast-list').insertAdjacentHTML('beforeend', `
      <li class="day-separator">
        <div class="seperator">
          <div class="seperator-weather seperator-item">
            <div class="seperator-precipitation seperator-sub-item seperator-top">${percipBox}</div>
            <div class="seperator-humidity seperator-sub-item">Humidity: ${~~(100 * thatDay.humidity)}%</div>
          </div>

          <div class="seperator-weather seperator-item">
            <div class="seperator-day seperator-sub-item seperator-top">${day}</div>
            <div class="seperator-temp-range seperator-sub-item">${~~Math.round(thatDay.temperatureLow)}&#176;F - ${~~Math.round(thatDay.temperatureHigh)}&#176;F</div>
          </div>

          <div class="seperator-weather seperator-item">
            <div class="seperator-description seperator-sub-item seperator-top">${thatDay.summary}</div>
            <div class="seperator-wind seperator-sub-item">Wind: ${thatDay.windSpeed}mph</div>
          </div>
        </div>
      </li>

      <li class="forecast-list">
        <div class="forecast-container">
          <div class="time-desc weather-item">Time</div>
          <div class="temperature-range-desc weather-item">Range</div>
          <div class="humidity-desc weather-item">Description</div>
          <div class="precipitation-desc weather-item">Humidity</div>
          <div class="wind-speed-desc weather-item">Wind Speed</div>
        </div>
      </li>
      `);
      counter = 1;
      curDay++;
    }

    let elemClass = counter == 0 ? "even" : "odd";
    document.getElementById('weather-forecast-list').insertAdjacentHTML('beforeend', `
    <li class="${elemClass} forecast-list">
      <div class="forecast-container">
        <div class="time weather-item">${time}</div>
        <div class="temperature-range weather-item">${temp}°F</div>
        <div class="precipitation weather-item">${description}</div>
        <div class="humidity weather-item">${humidity}%</div>
        <div class="wind-speed weather-item">${wind}mph</div>
      </div>
    </li>
    `);

    return (counter + 1) % 2;
  }

  // Converts celcius to fahrenheit
  function cToF(c)
  {
    return c * 1.8 + 32;
  }

  // Weather description comes with first letter lowercase, I like it uppercase, so that's this
  function firstLetterUpper(string)
  {
    if(string === undefined)
      return string;
    return string.charAt(0).toUpperCase() + string.substring(1);
  }
});
