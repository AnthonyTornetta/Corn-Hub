$(() =>
{
	const container = document.getElementById("news");
	const source = "wired";
	const API = 'ba7c0aede1d140d7b36a2cccd893e665';
	const url = `https://newsapi.org/v2/top-headlines?sources=${source}&apiKey=${API}`;
	const request = new XMLHttpRequest();
	request.open("GET", url);

	request.onload = () =>
	{
		container.innerHTML = '';
	  const data = JSON.parse(request.responseText);

	  for(let i = 0; i < data.articles.length; i++)
		{
	    publish(data.articles[i].title, data.articles[i].author, data.articles[i].url, data.articles[i].description);
		}
	};
	request.send();

	function publish(title, author, url, description)
	{
		// Just in case the source put their URL in the text (not all do, but just in case)
	  description = description.replace(`<a href="${url}"`, '');
	  description = description.replace('</a>', '');

		if(author === null)
			author = 'Unknown Author';

		// Add the HTML to the page
	  container.insertAdjacentHTML(`beforeend`,
		`<div class="news-box">\
			<a href="${url}" target="_blank">\
				<h4 class="news-title">${title}</h4>\
			</a><p class="byline">${author}</p>\
			<p class="description">${description}</p>\
		</div>
		`);
	}
});
