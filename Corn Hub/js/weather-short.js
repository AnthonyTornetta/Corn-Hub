var API = "05a68069ca925ee5c7863e687d0d57d5";
var temp;
var loc;
var deg;
var precipitation;

function updateByGeo()
{
	var url = "http://api.openweathermap.org/data/2.5/weather?" + 
	"lat=40.2774321&lon=-76.3799947&APPID=" + API;
	sendRequest(url);
    //Lat: 40, Long: -76
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
	temp.innerHTML = "It's " + weather.temp + "&deg; in ";
	loc.innerHTML = weather.loc;
	
		
}

window.onload = function()
{
	temp = document.getElementById("temperature");
	loc = document.getElementById("location");
	precipitation = document.getElementById("snowContainer");
	updateByGeo()
}