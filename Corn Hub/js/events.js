// JSON from https://learnwebcode.github.io/json-example/animals-1.json
/*
/*
var container = document.getElementById("animal-info");
var url = "https://learnwebcode.github.io/json-example/animals-1.json";
var request = new XMLHttpRequest();
request.open("GET", url);
request.onload = function ()
{
    var data = JSON.parse(request.responseText);
    console.log(data[0]);
    for(i = 0; i < data.length; i++)
    {
        renderHTML(data, i);
    }
};
request.send();

function renderHTML(data, i)
{
    var htmlString = '<p>' + data[i].name + ' is a ' + data[i].species + ' and likes ';
    for(j = 0; j < data[i].foods.likes.length; j++)
    {
        if(j == 0)
            htmlString += data[i].foods.likes[j];
        else
            htmlString += ' and ' + data[i].foods.likes[j];
    }
    
    for(j = 0; j < data[i].foods.dislikes.length; j++)
    {
        if(j == 0)
            htmlString += data[i].foods.dislikes[j];
        else
            htmlString += ' and ' + data[i].foods.dislikes[j];
    }
    htmlString + '.</p>';
    
    container.insertAdjacentHTML('beforeend', htmlString);
}
*/
var container = document.getElementById("news");
var API = 'ba7c0aede1d140d7b36a2cccd893e665';
var url = 'https://newsapi.org/v1/articles?source=[src]&sortBy=top&apiKey=' + API;
url = url.replace('[src]', 'the-wall-street-journal');
var request = new XMLHttpRequest();
request.open("GET", url);
request.onload = function ()
{
    var data = JSON.parse(request.responseText);
    console.log(data.articles[0].author);
    for(i = 0; i < data.articles.length; i++)
    {
        publish(data.articles[i].title, data.articles[i].author, data.articles[i].url, data.articles[i].description);
    }
   container.insertAdjacentHTML('beforeend', '<p>Powered by <a href="https://newsapi.org" target="_blank">newsapi.org</a></p>');
};
request.send();

function publish(title, author, url, description)
{
    description = description.replace('<a href="' + url + '"', '');
    description = description.replace('</a>', '');
    container.insertAdjacentHTML('beforeend', '<a href=' + url + ' target="_blank"><h4>' + title + '</h4></a>' + '<p>Written by ' + author + '</p>' + '<p>' + description + '</p><br/>');
}