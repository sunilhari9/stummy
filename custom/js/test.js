/* Thanks to CSS Tricks for pointing out this bit of jQuery
http://css-tricks.com/equal-height-blocks-in-rows/
It's been modified into a function called at page load and then each time the page is resized. One large modification was to remove the set height before each new calculation. */

equalheight = function(container){
	var divone = jQuery(".categories ").height();
	var divtwo = jQuery(".itemList").height();
	var maxdiv = Math.max(divone, divtwo);
	jQuery(".categories").height(maxdiv);
	jQuery(".itemList").height(maxdiv);
}

$(window).load(function() {
  equalheight();
});


$(window).resize(function(){
  equalheight();
});
