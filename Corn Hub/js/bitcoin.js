$(function()
{
  var url = "https://api.coindesk.com/v1/bpi/currentprice.json";

	updateBitcoin(url);

  // Main function for updating bitcoin data based on url which is generated based on city or current place
  function updateBitcoin(url)
  {
    // bitcoinData will hold all requested data(typically object or array) in JSON format
    $.getJSON(url, function(bitcoinData)
    {
	      var container = document.getElementById('bitcoin');
			  container.innerHTML = bitcoinData.bpi.USD.rate;
    });
  }
});
