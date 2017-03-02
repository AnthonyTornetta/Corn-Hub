var API = "05a68069ca925ee5c7863e687d0d57d5";
var temp;
var loc;
var deg;
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

function updateByZip(zip) //Doesn't work :(
{
	var url = "http:api.openweathermap.org/data/2.5/weather?" + 
	"zip=" + zip + 
	"&APPID=" + API;
}

function updateByGeo(lat, lon)
{
	var url = "http:api.openweathermap.org/data/2.5/weather?" + 
	"lat=" + lat + 
	"&lon=" + lon +
	"&APPID=" + API;
	sendRequest(url);
}

function sendRequest(url)
{
	var xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange = function()
	{
		if(xmlhttp.readyState == 4 && xmlhttp.status == 200)
		{
			var data = JSON.parse(xmlhttp.responseText);
			var weather = {};
			weather.icon = data.weather[0].id;
			weather.humid = data.main.humidity;
			weather.wind = mps2mph(data.wind.speed);
			weather.dir = degreesTodir(data.wind.deg);
			weather.loc = data.name + ", " + data.sys.country;
			weather.temp = K2F(data.main.temp);
			weather.min = K2F(data.main.temp_min);
			weather.max = K2F(data.main.temp_max);
			weather.desc = data.weather[0].description;
			weather.day = weekdays[date.getDay()];
			update(weather);
		}
	};
	xmlhttp.open("GET", url, true);
	xmlhttp.send();
}

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
	}
}

function K2C(K)
{
	return Math.round(K - 273.15);
}

function K2F(K)
{
	return Math.round(K *(9/5) - 459.67);
}

function mps2mph(mps)
{
	return Math.round(mps * 2.23694);
}

function update(weather)
{
	wind.innerHTML = weather.wind + " mph windspeeds from the ";
	dir.innerHTML = weather.dir + ".";
	humid.innerHTML = weather.humid + "% humidity";
	temp.innerHTML = weather.temp + "&deg;";
	min.innerHTML = weather.min + "&deg; - ";
	max.innerHTML = weather.max + "&deg";
	loc.innerHTML = weather.loc;
	icon.src = "imgs/codes/" + weather.icon + ".png";
	desc.innerHTML = "Weather right now: " + capitalizeFirstLetter(weather.desc);
	day.innerHTML = " - " + weather.day;
	loading.innerHTML = "";
}

function showPosition(position)
{
	updateByGeo(position.coords.latitude, position.coords.longitude);
}

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

window.onload = function()
{
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
	
	if(navigator.geolocation)
	{
		navigator.geolocation.getCurrentPosition(showPosition);
	}
	else
	{
		/*var zip = window.prompt("We could not discover your location. What is your zip code?");
		updateByZip(zip);*/ /* This doesn't actually work */
		alert("Could not discover your location :(");
	}
}