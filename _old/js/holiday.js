let url = "https://www.checkiday.com/api.php?d=";
$(function()
{
	updateHolidays(url);

  // Main function for updating weather based on url which is generated based on city or current place
  function updateHolidays(url)
	{
    // WeatherData will hold all requested data(typically object or array) in JSON format
		$.getJSON(url, function(holidayData)
		{
			let container = document.getElementById('checkiday');

			container.innerHTML = '<ul class="checkiday" id="checkiday-list"></ul>';
			for(let i = 0; i < holidayData.length; i++)
			{
				let ul = document.getElementById('checkiday-list');
				let li = document.createElement('li');
				li.appendChild(document.createTextNode(holidayData[i]));
				ul.appendChild(li);
			}
		});
	}
});
