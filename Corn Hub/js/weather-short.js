var API = "05a68069ca925ee5c7863e687d0d57d5";
var temp;
var loc;
var deg;
//var icon;
//var humid;
//var wind;
//var dir;

function updateByZip(zip)
{
	var url = "http://api.openweathermap.org/data/2.5/weather?" + 
	"zip=" + zip + 
	"&APPID=" + API;
	sendRequest(url);
}

function updateByGeo(lat, lon)
{
	var url = "http://api.openweathermap.org/data/2.5/weather?" + 
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
			//weather.icon = data.weather[0].id;
			//weather.humid = data.main.humidity;
			//weather.wind = data.wind.speed;
			//weather.dir = degreesTodir(data.wind.deg);
			weather.loc = data.name;
			weather.temp = K2F(data.main.temp);
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

function update(weather)
{
	//wind.innerHTML = weather.//wind;
	//dir.innerHTML = weather.//dir;
	//humid.innerHTML = weather.//humid;
	temp.innerHTML = "It's " + weather.temp + "&deg; in ";
	loc.innerHTML = weather.loc;
	//icon.src = "imgs/codes/" + weather.//icon + ".png";
}

function showPosition(position)
{
	updateByGeo(position.coords.latitude, position.coords.longitude)
}

window.onload = function()
{
	temp = document.getElementById("temperature");
	loc = document.getElementById("location");
	//icon = document.getElementById("//icon");
	//humid = document.getElementById("//humidity");
	//wind = document.getElementById("//wind");
	//dir = document.getElementById("//direction");
	
	if(navigator.geolocation)
	{
		navigator.geolocation.getCurrentPosition(showPosition);
	}
	else
	{
		var zip = window.prompt("We could not discover your location. What is your zip code?");
		updateByZip(zip);
	}
}