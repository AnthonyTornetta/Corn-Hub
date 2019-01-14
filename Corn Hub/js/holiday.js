let url = "https://www.checkiday.com/api.php?d=";
$(() =>
{
	let customHolidays = {};
	let today = new Date();

	function index(d)
	{
		return d.getMonth() * 100 + d.getDate();
	}

	function addHoliday(month, day, name)
	{
		let holidayIndex = month * 100 + day;
		if(!customHolidays[holidayIndex])
			customHolidays[holidayIndex] = [];
		
		customHolidays[holidayIndex].push(name);
	}
	
	// Month starts at 0 index, date at 1 index because JS is smart
	addHoliday(5, 30, "National search engine that plants trees day");

	function appendHoliday(holiday)
	{
		let ul = document.getElementById('checkiday-list');
		let li = document.createElement('li');
		li.appendChild(document.createTextNode(holiday));
		ul.appendChild(li);
	}

	$.getJSON(url, function(holidayData)
	{
		let container = document.getElementById('checkiday');

		container.innerHTML = '<ul class="checkiday" id="checkiday-list"></ul>';
		for(let i = 0; i < holidayData.length; i++)
		{
			appendHoliday(holidayData[i]);
		}

		if(customHolidays[index(today)])
		{
			customHolidays[index(today)].forEach(holiday =>
			{
				appendHoliday(holiday);
			});
		}
	});
});
