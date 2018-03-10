$(function()
{
  var currentWeatherUrl, forecastUrl, weatherData,
      lat, lon,
      city, country,
      windDir, humid,
      pressure, clouds;

  const API_KEY = '05a68069ca925ee5c7863e687d0d57d5';

  loadWeather();

  function loadWeather()
  {
    console.log('called');
    $.getJSON("https://ipinfo.io", function(data)
    {
      console.log(data);
      lat = data.loc.split(',')[0];
      lon = data.loc.split(',')[1];
      currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`;
      forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`
      updateCurrentWeather(currentWeatherUrl);
      updateForecastWeather(forecastUrl);
    }, 'jsonp');
  }

  // Main function for updating weather based on url which is generated based on city or current place
  function updateCurrentWeather(url)
  {
    // WeatherData will hold all requested data(typically object or array) in JSON format
    $.getJSON(url, function(weatherData)
    {
      const KPH_TO_MPH = 0.621371;

      var precipitationContainer = document.getElementById('current-precipitation');
      var locationContainer = document.getElementById('current-location');
      var windContainer = document.getElementById('current-wind');
      var currentTemp = document.getElementById('current-temp');
      var tempRange = document.getElementById('current-temp-range');
      var humidity = document.getElementById('current-humidity');

      precipitationContainer.innerHTML = `${firstLetterUpper(weatherData.weather[0].description)}`;
      humidity.innerHTML = `${weatherData.main.humidity}% Humidity`;
      tempRange.innerHTML = `${Math.round(cToF(weatherData.main.temp_min))}°F - ${Math.round(cToF(weatherData.main.temp_max))}°F`;
      currentTemp.innerHTML = `${Math.round((cToF(weatherData.main.temp)) * 10) / 10}°F`;
      locationContainer.innerHTML = `${weatherData.name}, ${weatherData.sys.country}`;
      windContainer.innerHTML = `${Math.round(weatherData.wind.speed * KPH_TO_MPH * 10) / 10}mph wind`;
    });
  }

  function updateForecastWeather(url)
  {
    let prevDay = "";
    // WeatherData will hold all requested data(typically object or array) in JSON format
    $.getJSON(url, function(weatherData)
    {
      const KPH_TO_MPH = 0.621371;

      let days = weatherData.list;
      let counter = 0;
      for(let i = 0; i < days.length; i++)
      {
        // Parse the time/date string into a readable format
        let timeFull = days[i].dt_txt.split(" ")[1];
        let dateFull = days[i].dt_txt.split(" ")[0];
        let hr = Number(timeFull.split(":")[0]);
        let ampm = "AM";

        // Turn the military time into 12 hr am/pm time
        if(Number(hr) / 12 >= 1)
        {
          ampm = "PM";
          hr = Number(hr) - 12;
        }

        if(hr == 0)
          hr = 12; // Because time is stupid.


        let weekday = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'][new Date(dateFull).getDay()];
        let time = `${hr}:00 ${ampm}`;
        let tempMin = Math.round(cToF(days[i].main.temp_min));
        let tempMax = Math.round(cToF(days[i].main.temp_max));
        let humidity = days[i].main.humidity;
        let description = firstLetterUpper(days[i].weather[0].description);
        let wind = Math.round(days[i].wind.speed * KPH_TO_MPH * 10) / 10;
        counter = addWeatherBox(weekday, prevDay, time, tempMin, tempMax, humidity, description, wind, counter);
        prevDay = weekday;
      }
    });
  }

  function addWeatherBox(day, prevDay, time, tempMin, tempMax, humidity, description, wind, counter)
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
      <div class="temperature-range">${tempMin}°F - ${tempMax}°F</div>
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
    return string.charAt(0).toUpperCase() + string.substring(1);
  }
});
