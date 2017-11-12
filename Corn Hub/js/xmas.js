$(function()
{
  var curr = new Date();
  var xmasDay = new Date(curr.getFullYear(), 11, 25, 0, 0); // Dec 25, of the year

	updateBitcoin(url);

    // Main function for updating weather based on url which is generated based on city or current place
  function updateBitcoin(url)
  {
    // WeatherData will hold all requested data(typically object or array) in JSON format
    $.getJSON(url, function(bitcoinData)
    {
	      var container = document.getElementById('countdown');
        var days = Math.ceil(Math.abs(xmasDay - curr) / (1000*60*60*24));
        var html = Math.abs(days) + ' days until Christmas!';
        if(days <= 0)
          html = 'Merry Christmas!';

			  container.innerHTML = html;
    });
  }
});
