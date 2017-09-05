$(document).ready(function()
{
	var url = 'http://kayaposoft.com/enrico/json/v1.0/index.php?action=getPublicHolidaysForYear&year=[year]&country=usa';

	var supportedHolidays = Array(10);
	
	supportedHolidays =
	{
		"New Year's Day",
		"Birthday of Martin Luther King, Jr.",
		"Washington's Birthday",
		"Memorial Day",
		"Independence Day",
		"Labor Day",
		"Columbus Day",
		"Veterans' Day",
		"Thanksgiving Day",
		"Christmas Day"
	};
	
	var today = new Date();
	url = url.replace('[year]', today.getFullYear());
	//alert(url);
	$.getJSON(url, function(data)
	{
		for(var i = 0; i < data.length; i++)
		{
			var day = data[i].date.day;
			var month = data[i].date.month;
			
			if(today.getDate() == day)
			{
				if(today.getMonth + 1 == month)
				{
					// Happy data[i].englishName!
					switch(data[i].localName.toLowerCase())
					{
						case supportedHolidays[0]:
						{
							alert("Happy New Year");
							break;
						}
						case supportedHolidays[1]:
						{
							alert("I have a dream...");
							break;
						}
						case supportedHolidays[2]:
						{
							alert("I once cut a tree down");
							break;
						}
						case supportedHolidays[3]:
						{
							alert("I haf cripplin depression");
							break;
						}
						case supportedHolidays[4]:
						{
							alert("MURRRICAA");
							break;
						}
						case supportedHolidays[5]:
						{
							alert("*Intense Keyboard Hammering*");
							break;
						}
						case supportedHolidays[6]:
						{
							alert("Im going on a ship to a place called India");
							break;
						}
						case supportedHolidays[7]:
						{
							alert("Thanks Vets!");
							break;
						}
						case supportedHolidays[8]:
						{
							alert("Thanks folks");
							break;
						}
						case supportedHolidays[9]:
						{
							alert("Merrrrryyy Chriiistmass ho ho ho");
							break;
						}
					}
				}
			}
			
			console.log(data[i].localName);
		}
		// This API doesn't include New Year's Eve so i included it because it's a fixed date
		if(today.getDate() == 31 && today.getMonth() == 11)
		{
			
		}
	});
});
alert($(document).ready);