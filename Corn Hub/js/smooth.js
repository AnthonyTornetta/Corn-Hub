/* Guide for: Smooth Scroll
 * ------------------------
 * Nothing special is needed;
 * Just add the a href="#..." and make sure it has an id="..." to link to.
 * Simple.
 */

$(function() {
	$('a[href*="#"]:not([href="#"])').click(function() {
	  if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
			var target = $(this.hash);
			target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
			if (target.length) {
			  $('html, body').animate({
				scrollTop: target.offset().top
			  }, 1000);
			  return false;
			}
    }
  });
});
