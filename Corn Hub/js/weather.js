// The weather js!
var API = "05a68069ca925ee5c7863e687d0d57d5";
var temp;
var loc;
var icon;
var humid;
var wind;
var dir;
var min;
var max;
var loading;
var desc;
var day;

var weekdays = new Array(7);
var date = new Date();

weekdays[1] = "Monday";
weekdays[2] = "Tuesday";
weekdays[3] = "Wednesday";
weekdays[4] = "Thursday";
weekdays[5] = "Friday";
weekdays[6] = "Saturday";
weekdays[0] = "Sunday";

// Get the weather JSON url
function updateByGeo(lat, lon)
{
	var url = "http://api.openweathermap.org/data/2.5/find?" + 
	"lat=" + lat + 
	"&lon=" + lon +
	"&APPID=" + API;
	sendRequest(url);
}

function sendRequest(url)
{
    // To contact the server 
	var request = new XMLHttpRequest();
    request.open("GET", url);
    request.onload = function ()
    {
        // Get the JSON and shove it in an object.
        var data = JSON.parse(request.responseText);
        
        // Display everything
        loading.innerHTML = '';
        temp.innerHTML = K2F(data.list[0].main.temp) + '&deg';
        loc.innerHTML = data.list[0].name;
        humid.innerHTML = data.list[0].main.humidity + '% Humidity';
        wind.innerHTML = mps2mph(data.list[0].wind.speed) + 'mph wind speeds';
        dir.innerHTML = ' coming from the ' + degreesTodir(data.list[0].wind.deg);
        min.innerHTML = K2F(data.list[0].main.temp_min) + '&deg - ';
        max.innerHTML = K2F(data.list[0].main.temp_max) + '&deg';
        desc.innerHTML = 'Description: ' + capitalizeFirstLetter(data.list[0].weather[0].description);
        var date = new Date();
        day.innerHTML = ' - ' + weekdays[date.getDay()];
    };
    // I was wondering why the weather wasn't loading. Then 30 min later i realized i forgot this ;(
    request.send();
}

// Converting degrees to a direction
function degreesTodir(degrees)
{
	var range = 360/8;
	var low = 360 - range/2;
	var high = (low + range) % 360;
	var angles = [ "N", "NE", "E", "SE", "S", "SW", "NW", "W" ];
	for(i in angles)
	{
		if(degrees >= low && degrees < high)
		{
			return angles[i];
		}
		else
		{
			return "NW";
		}
		low = (low + range) % 360;
		high = (high + range) % 360;
        // Super complex formula I googled
	}
}

// Kelvin -> Celcius
function K2C(K)
{
	return Math.round(K - 273.15);
}

// Kelvin -> Fahrenheit
function K2F(K)
{
	return Math.round(K *(9/5) - 459.67);
}

// Meters Per Second -> Miles per Hour
function mps2mph(mps)
{
	return Math.round(mps * 2.23694);
}

// Gets the position
function showPosition(position)
{
	updateByGeo(position.coords.latitude, position.coords.longitude);
}

// For displaying some JSON text nicely
function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

// When the window loads...
window.onload = function()
{
    // Assign everything
	temp = document.getElementById("temperature");
	min = document.getElementById("min");
	max = document.getElementById("max");
	loc = document.getElementById("location");
	icon = document.getElementById("icon");
	humid = document.getElementById("humidity");
	wind = document.getElementById("wind");
	dir = document.getElementById("direction");
	loading = document.getElementById("loading");
	desc = document.getElementById("description");
	day = document.getElementById("day");
	
    // And get location
	if(navigator.geolocation)
	{
		navigator.geolocation.getCurrentPosition(showPosition);
	}
	else
	{
		alert("Could not discover your location :(");
	}
}