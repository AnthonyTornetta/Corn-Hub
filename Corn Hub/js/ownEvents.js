// The events js (woot)!
var url = "https://raw.githubusercontent.com/Cornchipss/Corn-Hub/master/Corn%20Hub/events/events.json";
var list = document.getElementById('events-list');

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
		// Clear everything
		list.innerHTML = "";
		list.insertAdjacentHTML('beforeend', '<ul>');
		for(var i = 0; i < data.events.length; i++)
		{
			list.insertAdjacentHTML('beforeend', '<li>' + capitalizeFirstLetter(data.events[i].title) + ' - ' + data.events[i].month + '/' + data.events[i].day + '</li>');
		}
		list.insertAdjacentHTML('beforeend', '</ul>');
    };
    request.send();
}

// For displaying some JSON text nicely
function capitalizeFirstLetter(string) 
{
    return string.charAt(0).toUpperCase() + string.slice(1);
}

// When the window loads...
window.onload = function()
{
    // Assign everything
	sendRequest(url);
}