/* List Ticker by Alex Fish 
// www.alexefish.com
//
// options:
//
// effect: fade/slide
// speed: milliseconds
*/

(function($){
  $.fn.list_ticker = function(options){
      //var options;
      var defaults = {
          speed:4000,
	        effect:'slide'
      };
    
      options = $.extend(defaults, options);
      
      return this.each(function(){
      
          var obj = $(this);
          var list = obj.children();
          list.not(':first').hide();
          
          setInterval(function(){
              list = obj.children();
              list.not(':first').hide();
              
              var first_li = list.eq(0);
              var second_li = list.eq(1);
		          
		          if(options.effect == 'slide'){
			            first_li.slideUp();
			            second_li.slideDown(function(){
				              first_li.remove().appendTo(obj);
			            });
		          } else if(options.effect == 'fade'){
			            first_li.fadeOut(function(){
				              second_li.fadeIn();
				              first_li.remove().appendTo(obj);
			            });
		          }
          }, options.speed);
      });
  };
})(jQuery);

// random array sort from
function randOrd() { return(Math.round(Math.random())-0.5); }

$(document).ready(function() {
    historyData.load(function(d) {

        // randomly sort our data just for variety
        d.Births.sort(randOrd);
        d.Events.sort(randOrd);
        d.Deaths.sort(randOrd);
        
        $("#today").html("Today in History: " + historyData.date);
        $("#learn-more").
            html(historyData.date + " on Wikipedia").
            attr("href", historyData.url);

        var entryText = function(e) {
            return e.html;
        };

        $(d.Births).each(function(i, b) {
            $("#births").append("<li>" + entryText(b) + "</li>");
        });
        $(d.Deaths).each(function(i, d) {
            $("#deaths").append("<li>" + entryText(d) + "</li>");
        });
        $(d.Events).each(function(i, e) {
            $("#events").append("<li>" + entryText(e) + "</li>");
        });
        $("#ticker ul").list_ticker({ speed:8000, effect:'fade' });
        
        $("#ticker").fadeIn();
        $("#ticker a").attr("target", "_blank");
  });
});
