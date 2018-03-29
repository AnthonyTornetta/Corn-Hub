$(function()
{
  var monthNames = [ "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December" ];

  let d = new Date();

  let month = monthNames[d.getMonth()];
  let day = d.getDate();

  let url = `https://en.wikipedia.org/w/api.php?action=parse&page=${month}_${day}&format=json&origin=*`;

	updateEvents(url);

  // Main function for updating data based on url which is generated based on city or current place
  function updateEvents(url)
  {
    // Data will hold all requested data(typically object or array) in JSON format
    $.getJSON(url, function(data)
    {
	    var wallOfText = data.parse.text['*'];
      wallOfText = replaceAll(wallOfText, '/wiki', 'https://www.wikipedia.org/wiki')
      wallOfText = replaceAll(wallOfText, '<a', '<a target="_blank"');
      let findText = 'title="Edit section: Events">edit</a><span class="mw-editsection-bracket">]</span></span></h2>';
      let pStart = wallOfText.indexOf(findText) + findText.length;
      wallOfText = wallOfText.slice(pStart);

      let h2Index = wallOfText.indexOf('<h2>');
      let births = wallOfText;
      wallOfText = wallOfText.slice(0, h2Index);

      findText = '</h2>';
      births = births.substring(wallOfText.length);
      births = births.substring(births.indexOf(findText) + findText.length);
      let deaths = births;

      findText = '<h2>';
      let deathsIndex = births.indexOf(findText);
      births = births.slice(0, deathsIndex);

      deaths = deaths.substring(deathsIndex + findText.length);
      findText = ']</span></span>';
      deaths = deaths.substring(deaths.indexOf(findText) + findText.length);

      deaths = deaths.slice(0, deaths.indexOf('<h2>'));

      document.getElementById('events').innerHTML = wallOfText;
      document.getElementById('births').innerHTML = births;
      document.getElementById('deaths').innerHTML = deaths;
    });
  }
});

// https://stackoverflow.com/questions/1144783/how-to-replace-all-occurrences-of-a-string-in-javascript - Sean Bright's Answer
function replaceAll(str, find, replace)
{
  return str.replace(new RegExp(find, 'g'), replace);
}
