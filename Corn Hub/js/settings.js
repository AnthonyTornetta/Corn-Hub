$(document).ready(function()
{
	/* This is the super slick and sexy animation you get when you click the settigns gear. */
	$("#gear").on('click', function()
	{
		$(this).toggleClass('gear-pressed'); // Adds some extra sexyness
		$("#settings-bar").toggleClass('settings-expanded'); // Adds slickness
	});
});