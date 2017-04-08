var API = "ba7c0aede1d140d7b36a2cccd893e665";

var url = "https://newsapi.org/v1/articles";
var finalUrl;
var sortBy = "latest"; //Latest, top, popular


var wired;
var wiredSrc = "wired-de";

var wallstreet;
var wallstreetSrc = "the-wall-street-journal";

var post;
var postSrc = "the-washington-post";

finalUrl = setUrl(wiredSrc);

function setHtml()
{
    wiredAuthor = document.getElementById('w-author');
    wiredAuthor.innerHTML = "Author: " + ;
}

function sendRequest(url)
{
	var xmlhttp = new XMLHttpRequest();
	xmlhttp.onreadystatechange = function()
	{
		if(xmlhttp.readyState == 4 && xmlhttp.status == 200)
		{
			var data = JSON.parse(xmlhttp.responseText);
			var news = {};
			news.icon = data.news[0].id;
			news.humid = data.list.humidity;
			news.wind = mps2mph(data.wind.speed);
			news.dir = degreesTodir(data.wind.deg);
			news.loc = data.name + ", " + data.sys.country;
			news.temp = K2F(data.list.temp);
			news.min = K2F(data.list.temp_min);
			news.max = K2F(data.list.temp_max);
			news.desc = data.news[0].description;
			news.day = weekdays[date.getDay()];
			update(news);
		}
	};
	xmlhttp.open("GET", url, true);
	xmlhttp.send();
}

function update(news)
{
	wind.innerHTML = news.wind + " mph windspeeds from the ";
	dir.innerHTML = news.dir + ".";
	humid.innerHTML = news.humid + "% humidity";
	temp.innerHTML = news.temp + "&deg;";
	min.innerHTML = news.min + "&deg; - ";
	max.innerHTML = news.max + "&deg";
	loc.innerHTML = news.loc;
	icon.src = "imgs/codes/" + news.icon + ".png";
	desc.innerHTML = "Weather right now: " + capitalizeFirstLetter(news.desc);
	day.innerHTML = " - " + news.day;
	loading.innerHTML = "";
}

function setUrl(source)
{
    var urlF = url + "?source=" + source + "&sortBy=" + sortBy + "&apiKey=" + API;
    return urlF;
}





window.onload = function()
{
    alert(finalUrl);
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
		alert("Could not discover your location :(");
	}
}