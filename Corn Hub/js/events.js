$.getJSON('http://www.whateverorigin.org/get?url=' + encodeURIComponent('http://www.clsd.k12.pa.us/Page/2') + '&callback=?', function(data){
	console.log(data.contents);
});
