$(function()
{
  var lat, lon,
      city, country,
      windDir, humid,
      pressure, clouds;

  const API_KEY = 'b0d48880090d49e9dcc76306507a83b6';

  loadWeather();

  function loadWeather()
  {
    $.ajax(
    {
      method: 'GET',
      url: 'https://ipinfo.io',
      dataType: 'jsonp',
      data: {
        format: 'json'
      },
      success: (data) =>
      {
        lat = data.loc.split(',')[0];
        lon = data.loc.split(',')[1];

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
            updateWeather(res);
          }
        });
      }
    });
  }


  // Main function for updating weather based on url which is generated based on city or current place
  function updateWeather(weatherData)
  {
    var summaryContainer = document.getElementById('current-precipitation');
    var locationContainer = document.getElementById('current-location');
    var windContainer = document.getElementById('current-wind');
    var currentTemp = document.getElementById('current-temp');
    var precipitation = document.getElementById('current-temp-range');
    var humidity = document.getElementById('current-humidity');

    console.log(weatherData);
    summaryContainer.innerHTML = `${weatherData.currently.summary}`;
    humidity.innerHTML = `${weatherData.currently.humidity * 100}% Humidity`;
    if(weatherData.currently.precipType !== undefined)
      precipitation.innerHTML = `${weatherData.currently.precipType}"} ${~~(weatherData.currently.precipProbability * 100)}% Chance`;
    else
      precipitation.innerHTML = `No Precipitation`;
    currentTemp.innerHTML = `${Math.round((weatherData.currently.temperature) * 10) / 10}°F`;
    //locationContainer.innerHTML = `${weatherData.name}, ${weatherData.sys.country}`; // TODO: Replace
    windContainer.innerHTML = `${Math.round(weatherData.currently.windSpeed * 10) / 10}mph wind`;

    updateForecastWeather(weatherData);
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
      counter = addWeatherBox(weekday, prevDay, timeStr, temp, humidity, description, wind, counter);
      prevDay = weekday;
    }
  }

  function addWeatherBox(day, prevDay, time, temp, humidity, description, wind, counter)
  {
    if(prevDay != day)
    {
      document.getElementById('weather-forecast-list').insertAdjacentHTML('beforeend', `
      <li class="day-separator">
        <div></div>
        <div></div>
        <div>${day}</div>
        <div></div>
        <div></div>
      </li>
      `);
      counter = 1;
    }

    let elemClass = counter == 0 ? "even" : "odd";
    document.getElementById('weather-forecast-list').insertAdjacentHTML('beforeend', `
    <li class="${elemClass}">
      <div class="time">${time}</div>
      <div class="temperature-range">${temp}°F</div>
      <div class="precipitation">${description}</div>
      <div class="humidity">${humidity}%</div>
      <div class="wind-speed">${wind}mph</div>
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
