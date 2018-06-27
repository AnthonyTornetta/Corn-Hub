let url = "https://www.checkiday.com/api.php?d=";
$(() =>
{
	updateHolidays(url);

  function updateHolidays(url)
	{
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
