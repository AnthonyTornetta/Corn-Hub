$(function()
{
  var url, weatherData
      lat, lon,
      city, country,
      windDir, humid,
      pressure, clouds;

  const API_KEY = '05a68069ca925ee5c7863e687d0d57d5';
  //url = 'https://api.openweathermap.org/data/2.5/weather?lat='+lat+'&lon='+lon+'&units=metric&appid=' + API_KEY;

  // Display current city on load, or at least city of your IP address provider
  currentCity();

  // Main function for city search
  searchCity();

  // Display current city
  // It's gonna display a city of your IP address provider
  // Although it may be wrong, but then you can just type in your city :)
  // I replaced geolocation w/ this because it doesn't pester the user every time for permissions and works in the edge browser without perms
  function currentCity()
  {
    $.getJSON('https://ipinfo.io', function(data)
    {
      lat = data.loc.split(',')[0];
      lon = data.loc.split(',')[1];
      url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=customary&appid=${API_KEY}`;
      updateWeather(url);
    }, 'jsonp');
  }

  // Gets city based on  input
  function yourCity()
  {
    var city = $('#input-city').val();
		city = 'Lebanon';

	  if(city.toLowerCase() == 'cedar crest')
		  city = 'Lebanon';

    // If input is invalid, it shows the school's weather
    if (!city)
      city='Lebanon';

    url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=customary&appid=${API_KEY}`;
    updateWeather(url);
  }

  // Main function for updating weather based on url which is generated based on city or current place
  function updateWeather(url)
  {
    // WeatherData will hold all requested data(typically object or array) in JSON format
    $.getJSON(url, function(weatherData)
    {
      // I uploaded icons in a way that their name ends with appropriate weather condition from API documentation
      // Each weather condition has it's own short name, for example condition Clear sky has icon name 01d
      var icon = 'https://openweathermap.org/img/w/' + weatherData.weather[0].icon + '.png';


    });
  }

  function addWeatherBox()
  {
    
  }

  // Every click on unit button increases counter and calls this function which converts data
  // If the counter is odd number units are customary, else metric
  function updateUnits(weatherData)
  {
      temp = weatherData.main.temp;
      windSpeed = weatherData.wind.speed*3.6;

      if(counter % 2 == 1) {
          // Unary + operator, converts operand to a number if it already isn't, this will also ditch any unnecessary zeros
          temp = +(temp * (9/5) + 32).toFixed(1) + '°F';
          windSpeed = +(windSpeed * 0.62137119223733).toFixed(2)+'mph'; // A fancy google formula
          $('#change').val('°C');
      }
      else
      {
        temp = +temp.toFixed(1) + '°C';
        windSpeed = +windSpeed.toFixed(2) + 'kph';
        $('#change').val('°F');
      }

      $('.temp').html(temp);

      // Sometimes there isn't info about wind direction, if that happens I put N as a direction
      if(windDir)
        $('.wind').html(windDir + ' ' + windSpeed);
      else
        $('.wind').html('N ' + windSpeed);
  }

  // Function for updating weather data on every API call and updating units on every click
  function unitTrigger(data)
  {
    updateUnits(data);
    $('#change').off('click').on('click',function(){
        counter++;
        updateUnits(data);
    });
  }

  // Turn degreess into wind direction name, StackOverflow thank you
  function degToCompass(num)
  {
      // Divide angle by 22.5 because 360/16 = 22.5deg per direction change
      // Add 0.5 so that when we divide the value we can break the 'tie' between the direction change threshold
      // 'tie' means, for example if its 11.25 degress we don't know if it's 'N' or 'NNE', because it's on the threshold
      var val = Math.floor((num / 22.5) + 0.5);

      // 16 directions which are going clockwise starting from North
      var arr = ['N', 'NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE', 'S', 'SSW', 'SW', 'WSW', 'W', 'WNW', 'NW', 'NNW'];

      // Return the value from array at the index of (mod 16)
      return arr[(val % 16)];
  }

  // Monitors if the enter was pressed while typing in input field, if it's pressed, fire up click event
  function onEnterSearch()
  {
    $('#input-city').keyup(function(event)
    {
      if (event.keyCode == 13)
      {
          $('#submit').click();
      }
    });
  }

  // Searches for a city's weather data
  function searchCity()
  {
    onEnterSearch();

    $('#submit').off('click').on('click',function()
    {
      $('.container-fluid').fadeOut(200);
      $('.spinner').show();
      yourCity();
      $('#input-city').val('').blur();
    });
  }

  // Weather description comes with first letter lowercase, I like it uppercase, so that's this
  function firstLetterUpper(string)
  {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
});
